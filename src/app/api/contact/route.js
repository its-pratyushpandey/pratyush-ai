import { NextResponse } from "next/server";

// In-memory rate limiting map: ip -> { count, expiresAt }
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

function checkRateLimit(ip) {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.expiresAt) {
    rateLimitMap.set(ip, { count: 1, expiresAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true };
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return { allowed: false, retryAfter: Math.ceil((record.expiresAt - now) / 1000) };
  }

  record.count += 1;
  return { allowed: true };
}

// Clean up stale rate limit entries periodically
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [ip, record] of rateLimitMap.entries()) {
      if (now > record.expiresAt) {
        rateLimitMap.delete(ip);
      }
    }
  }, 5 * 60 * 1000);
}

export async function POST(request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    const rateCheck = checkRateLimit(ip);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          ok: false,
          error: "Too many submissions from your connection. Please wait a few minutes before trying again.",
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, message, hp_company } = body || {};

    // 1. Honeypot check for spam bots
    if (hp_company) {
      return NextResponse.json({ ok: true, message: "Message received." });
    }

    // 2. Strict Input Validation
    const cleanName = typeof name === "string" ? name.trim() : "";
    const cleanEmail = typeof email === "string" ? email.trim() : "";
    const cleanMessage = typeof message === "string" ? message.trim() : "";

    if (!cleanName || cleanName.length < 2 || cleanName.length > 100) {
      return NextResponse.json(
        { ok: false, error: "Please enter your name (at least 2 characters)." },
        { status: 400 }
      );
    }

    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    if (!cleanEmail || !emailRegex.test(cleanEmail) || cleanEmail.length > 150) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!cleanMessage || cleanMessage.length < 10 || cleanMessage.length > 3000) {
      return NextResponse.json(
        { ok: false, error: "Please provide a message with at least 10 characters." },
        { status: 400 }
      );
    }

    // 3. Email Delivery Provider Handling
    const resendApiKey = process.env.RESEND_API_KEY;
    const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
    const toEmail = process.env.CONTACT_TO_EMAIL || "pratyush.me.ai@gmail.com";
    const fromEmail = process.env.RESEND_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";

    // Option A: Resend API integration (no extra SDK required)
    if (resendApiKey) {
      const resendResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [toEmail],
          reply_to: cleanEmail,
          subject: `Portfolio Inquiry from ${cleanName}`,
          text: `Name: ${cleanName}\nEmail: ${cleanEmail}\n\nMessage:\n${cleanMessage}`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px;">
              <h2 style="color: #6b5ee8; margin-top: 0;">New Project Inquiry</h2>
              <p><strong>From:</strong> ${cleanName} &lt;<a href="mailto:${cleanEmail}">${cleanEmail}</a>&gt;</p>
              <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
              <div style="background: #f8fafc; padding: 16px; border-radius: 8px; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${cleanMessage
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")}</div>
              <p style="margin-top: 24px; font-size: 12px; color: #64748b;">Delivered via portfolio contact endpoint.</p>
            </div>
          `,
        }),
      });

      if (!resendResponse.ok) {
        const errorData = await resendResponse.json().catch(() => ({}));
        console.error("Resend API delivery error:", errorData);
        return NextResponse.json(
          {
            ok: false,
            error: "Failed to dispatch email through the email provider. Please try again or email directly.",
          },
          { status: 502 }
        );
      }

      return NextResponse.json({ ok: true, message: "Message sent successfully!" });
    }

    // Option B: Webhook integration (Slack / Discord / Formspree)
    if (webhookUrl) {
      const webhookRes = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: cleanName,
          email: cleanEmail,
          message: cleanMessage,
          source: "Portfolio Contact Form",
          timestamp: new Date().toISOString(),
        }),
      });

      if (!webhookRes.ok) {
        return NextResponse.json(
          { ok: false, error: "Failed to deliver message via webhook endpoint." },
          { status: 502 }
        );
      }

      return NextResponse.json({ ok: true, message: "Message sent successfully!" });
    }

    // If neither provider is configured:
    return NextResponse.json(
      {
        ok: false,
        configured: false,
        error:
          "Email service provider credentials (RESEND_API_KEY) are not configured in this environment.",
        recipientEmail: toEmail,
      },
      { status: 503 }
    );
  } catch (err) {
    console.error("Contact API route error:", err);
    return NextResponse.json(
      { ok: false, error: "An unexpected error occurred while processing your message." },
      { status: 500 }
    );
  }
}
