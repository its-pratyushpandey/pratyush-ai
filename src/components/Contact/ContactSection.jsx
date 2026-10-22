"use client";

import React, { forwardRef, useEffect, useId, useImperativeHandle, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import {
  FiAlertCircle,
  FiArrowUp,
  FiArrowUpRight,
  FiAtSign,
  FiBookOpen,
  FiCheck,
  FiClock,
  FiCode,
  FiCopy,
  FiGithub,
  FiLinkedin,
  FiMapPin,
  FiMessageCircle,
  FiPhone,
  FiRefreshCw,
  FiSend,
} from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";
import styles from "./ContactSection.module.scss";
import pageStyles from "../../app/page.module.scss";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function StaggeredWordReveal({
  text,
  className = "",
  delay = 0,
  highlightWords = [],
  gradientWords = [],
}) {
  const words = text.split(" ");
  return (
    <motion.span
      className={`${pageStyles.staggeredWordWrapper} ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.05,
            delayChildren: delay,
          },
        },
      }}
    >
      {words.map((word, i) => {
        const cleanWord = word.replace(/[^a-zA-Z0-9]/g, "");
        const isHighlight = highlightWords.includes(cleanWord) || highlightWords.includes(word);
        const isGradient = gradientWords.includes(cleanWord) || gradientWords.includes(word);

        return (
          <span key={`${word}-${i}`} className={pageStyles.wordMask}>
            <motion.span
              className={`${pageStyles.wordInner} ${
                isHighlight ? pageStyles.wordHighlight : ""
              } ${isGradient ? pageStyles.wordGradient : ""}`}
              variants={{
                hidden: { y: "120%", opacity: 0, filter: "blur(8px)" },
                visible: {
                  y: "0%",
                  opacity: 1,
                  filter: "blur(0px)",
                  transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            >
              {word}
            </motion.span>
            <span> </span>
          </span>
        );
      })}
    </motion.span>
  );
}

const DEFAULT_PROFILE = {
  name: "Pratyush Kumar Pandey",
  shortName: "Pratyush Pandey",
  email: "pratyush.me.ai@gmail.com",
  phone: "+91-7562920811",
  github: "https://github.com/its-pratyushpandey",
  linkedin: "https://www.linkedin.com/in/pratyush-pandey-/",
  leetcode: "https://leetcode.com/u/pratyush_pandey/",
  resume: "https://dev.pratyushpandey.me/presume.pdf",
  location: "Vijayawada, India",
  maps: "https://maps.app.goo.gl/dPjAwKErtBJW6kRo9",
};

const ContactSection = forwardRef(function ContactSection({ profile = DEFAULT_PROFILE }, ref) {
  const sectionRef = useRef(null);
  useImperativeHandle(ref, () => sectionRef.current);

  // GSAP animation targets
  const watermarkRef = useRef(null);
  const bridgeLineLeftRef = useRef(null);
  const bridgeLineRightRef = useRef(null);
  const bridgePillRef = useRef(null);
  const cardsWrapRef = useRef(null);
  const formCardRef = useRef(null);
  const footerRef = useRef(null);

  // Accessible IDs
  const nameId = useId();
  const emailId = useId();
  const messageId = useId();
  const nameErrorId = useId();
  const emailErrorId = useId();
  const messageErrorId = useId();

  // Local Time State (Asia/Kolkata)
  const [localTime, setLocalTime] = useState("");

  // Copy Email State: 'idle' | 'copied' | 'error'
  const [copyStatus, setCopyStatus] = useState("idle");
  const copyTimerRef = useRef(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    hp_company: "",
  });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false,
  });
  const [submissionStatus, setSubmissionStatus] = useState("idle"); // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState("");
  const [isConfigured, setIsConfigured] = useState(true);

  // 1. Timezone Clock (Asia/Kolkata), updating every 60 seconds
  useEffect(() => {
    const updateTime = () => {
      try {
        const formatted = new Intl.DateTimeFormat("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "Asia/Kolkata",
        }).format(new Date());
        setLocalTime(formatted);
      } catch (err) {
        setLocalTime("--:--");
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Cleanup copy timer on unmount
  useEffect(() => {
    return () => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    };
  }, []);

  // 2. Coordinated GSAP Entrance Sequence
  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        // Immediate display without motion
        gsap.set(
          [
            bridgePillRef.current,
            bridgeLineLeftRef.current,
            bridgeLineRightRef.current,
            formCardRef.current,
            footerRef.current,
          ],
          { opacity: 1, y: 0, x: 0, scaleX: 1 }
        );
        if (cardsWrapRef.current) {
          gsap.set(cardsWrapRef.current.children, { opacity: 1, y: 0 });
        }
        return;
      }

      // Parallax scroll on ghost watermark
      if (watermarkRef.current) {
        gsap.fromTo(
          watermarkRef.current,
          { y: 30, opacity: 0.02 },
          {
            y: -40,
            opacity: 0.065,
            ease: "none",
            scrollTrigger: {
              trigger: sectionEl,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          }
        );
      }

      // Master section entrance timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionEl,
          start: "top 78%",
          toggleActions: "play none none none",
        },
      });

      // Transition bridge line expansion
      tl.fromTo(
        bridgePillRef.current,
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
      )
        .fromTo(
          [bridgeLineLeftRef.current, bridgeLineRightRef.current],
          { scaleX: 0 },
          { scaleX: 1, duration: 0.7, ease: "power3.out", stagger: 0.08 },
          "-=0.25"
        )
        // Staggered reveal of contact information cards
        .fromTo(
          cardsWrapRef.current ? cardsWrapRef.current.children : [],
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.2"
        )
        // Form card entrance
        .fromTo(
          formCardRef.current,
          { opacity: 0, y: 32 },
          { opacity: 1, y: 0, duration: 0.75, ease: "power3.out" },
          "-=0.35"
        )
        // Footer subtle reveal
        .fromTo(
          footerRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.2"
        );
    }, sectionEl);

    return () => ctx.revert();
  }, []);

  // 3. Email Copy Action
  const handleCopyEmail = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      if (typeof navigator !== "undefined" && navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(profile.email);
        setCopyStatus("copied");
        if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
        copyTimerRef.current = setTimeout(() => setCopyStatus("idle"), 2500);
      } else {
        throw new Error("Clipboard API unavailable");
      }
    } catch (err) {
      setCopyStatus("error");
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
      copyTimerRef.current = setTimeout(() => setCopyStatus("idle"), 3000);
    }
  };

  // 4. Form Validation & Submission
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

  const isNameValid = formData.name.trim().length >= 2;
  const isEmailValid = emailRegex.test(formData.email.trim());
  const isMessageValid = formData.message.trim().length >= 10;

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });

    if (!isNameValid || !isEmailValid || !isMessageValid) {
      return;
    }

    setSubmissionStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.ok) {
        setSubmissionStatus("success");
      } else {
        setSubmissionStatus("error");
        setIsConfigured(data.configured !== false);
        setErrorMessage(
          data.error ||
            "Unable to deliver your message at this time. Please try again or reach out directly via email."
        );
      }
    } catch (err) {
      setSubmissionStatus("error");
      setErrorMessage(
        "A network error occurred while sending your message. Please check your connection or reach out via direct email."
      );
    }
  };

  const handleResetForm = () => {
    setFormData({ name: "", email: "", message: "", hp_company: "" });
    setTouched({ name: false, email: false, message: false });
    setSubmissionStatus("idle");
    setErrorMessage("");
  };

  const scrollToTop = (e) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const mailtoHref = `mailto:${profile.email}?subject=${encodeURIComponent(
    `Project inquiry from ${formData.name || "Portfolio visitor"}`
  )}&body=${encodeURIComponent(formData.message || "")}`;

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={styles.contactSection}
      aria-labelledby="contact-heading"
    >
      {/* Subtle Atmospheric Grid & Light Orbs */}
      <div className={styles.bgGrid} aria-hidden="true" />
      <div className={styles.ambientOrbs} aria-hidden="true">
        <span className={styles.orbViolet} />
        <span className={styles.orbMint} />
        <span className={styles.orbGeometryRing} />
      </div>

      {/* Architectural Transition Bridge 05 -> 06 */}
      <div className={styles.transitionBridge} aria-hidden="true">
        <div className={styles.bridgeGlow} />
        <div className={styles.bridgeLineWrap}>
          <span ref={bridgeLineLeftRef} className={styles.bridgeLineLeft} />
          <div ref={bridgePillRef} className={styles.bridgePill}>
            <span className={styles.bridgeDot} />
            <span>05 // CREDENTIALS → 06 // GET IN TOUCH</span>
          </div>
          <span ref={bridgeLineRightRef} className={styles.bridgeLineRight} />
        </div>
      </div>

      {/* Main Section Header with SectionTitle Text Style (Exact matching 05 / CREDENTIALS) */}
      <div className={`${pageStyles.editorialHeaderWrap} ${pageStyles.light} ${pageStyles.contactHeadingWrap}`}>
        {/* Background Ghost Watermark Title */}
        <div ref={watermarkRef} className={pageStyles.sectionWatermark} aria-hidden="true">
          CONTACT
        </div>

        {/* Eyebrow Badge with Glowing Dot */}
        <motion.div
          className={pageStyles.editorialEyebrow}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <span className={pageStyles.editorialEyebrowDot} />
          <span>06 / GET IN TOUCH</span>
        </motion.div>

        {/* Staggered Multi-Line Animated Headline */}
        <h2 id="contact-heading" className={pageStyles.editorialHeadline}>
          <span className={pageStyles.editorialHeadlineLine1}>
            <StaggeredWordReveal text="Have an idea?" />
          </span>
          <span className={pageStyles.editorialHeadlineLine2}>
            <StaggeredWordReveal
              text="Let's make it real."
              delay={0.15}
              gradientWords={["make", "it", "real."]}
            />
          </span>
        </h2>

        {/* Subtitle / Intro paragraph */}
        <motion.p
          className={pageStyles.editorialIntro}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, delay: 0.2 }}
        >
          Whether it&apos;s a new opportunity, an engineering collaboration, or a chat about AI and
          full-stack systems — I&apos;d love to connect.
        </motion.p>

        {/* START A CONVERSATION Link */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ marginTop: "24px" }}
        >
          <a
            href={`mailto:${profile.email}`}
            className={pageStyles.contactCta}
            aria-label="Start a conversation via direct email"
          >
            Start a conversation <FiArrowUpRight />
          </a>
        </motion.div>
      </div>

      {/* Two-Column Grid: Contact Details (Left) & Form (Right) */}
      <div className={styles.contactGrid}>
        {/* Left Column: Information Cards & Socials */}
        <div className={styles.contactInfoCol}>
          <div className={styles.introCallout}>
            <span className={styles.introStepNum}>01</span>
            <p>
              Let&apos;s build something
              <br />
              <strong>useful, thoughtful, and memorable.</strong>
            </p>
          </div>

          <div ref={cardsWrapRef} className={styles.cardsStack}>
            {/* Email Card */}
            <div className={styles.contactCard}>
              <div className={styles.cardIcon}>
                <FiAtSign />
              </div>
              <div className={styles.cardBody}>
                <span className={styles.cardLabel}>Email Address</span>
                <strong className={styles.cardValue} title={profile.email}>
                  {profile.email}
                </strong>
                <span className={styles.cardSubtitle}>Direct inbox response</span>
              </div>
              <div className={styles.cardActions}>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className={`${styles.copyButton} ${
                    copyStatus === "copied"
                      ? styles.copySuccess
                      : copyStatus === "error"
                      ? styles.copyError
                      : ""
                  }`}
                  aria-label={
                    copyStatus === "copied"
                      ? "Email copied to clipboard"
                      : copyStatus === "error"
                      ? "Failed to copy email"
                      : "Copy email address"
                  }
                  title="Copy email to clipboard"
                >
                  {copyStatus === "copied" ? (
                    <>
                      <FiCheck /> Copied!
                    </>
                  ) : copyStatus === "error" ? (
                    <>
                      <FiAlertCircle /> Failed
                    </>
                  ) : (
                    <>
                      <FiCopy /> Copy
                    </>
                  )}
                </button>
                <a
                  href={`mailto:${profile.email}`}
                  className={styles.cardDirectLink}
                  aria-label="Open email client"
                  title="Open mail client"
                >
                  <FiArrowUpRight />
                </a>
              </div>
            </div>

            {/* Phone Card */}
            <a
              href={`tel:${profile.phone || "+917562920811"}`}
              className={styles.contactCard}
              aria-label={`Call or WhatsApp: ${profile.phone || "+91-7562920811"}`}
            >
              <div className={styles.cardIcon}>
                <FiPhone />
              </div>
              <div className={styles.cardBody}>
                <span className={styles.cardLabel}>Direct Phone</span>
                <strong className={styles.cardValue}>{profile.phone || "+91-7562920811"}</strong>
                
              </div>
              <FiArrowUpRight className={styles.cardArrow} aria-hidden="true" />
            </a>

            {/* Location Card */}
            <a
              href={profile.maps}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactCard}
              aria-label={`Location: ${profile.location} (opens Google Maps)`}
            >
              <div className={styles.cardIcon}>
                <FiMapPin />
              </div>
              <div className={styles.cardBody}>
                <span className={styles.cardLabel}>Based In</span>
                <strong className={styles.cardValue}>{profile.location}</strong>
                <span className={styles.cardSubtitle}>Andhra Pradesh, India</span>
              </div>
              <FiArrowUpRight className={styles.cardArrow} aria-hidden="true" />
            </a>

            {/* Local Time Card */}
            <div className={styles.contactCard} aria-label={`Current local time in Vijayawada, India: ${localTime || "15:30"} IST`}>
              <div className={styles.cardIcon}>
                <FiClock />
              </div>
              <div className={styles.cardBody}>
                <span className={styles.cardLabel}>Local Time</span>
                <strong className={styles.cardValue}>
                  <span className={styles.liveClockBadge}>
                    <span className={styles.liveClockDot} />
                    {localTime || "--:--"} IST
                  </span>
                </strong>
                <span className={styles.cardSubtitle}>Asia/Kolkata (UTC +05:30)</span>
              </div>
            </div>

            {/* Social Block */}
            <div className={styles.socialsBlock}>
              <span className={styles.socialsTitle}>Find Me Online</span>
              <div className={styles.socialsList}>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialButton}
                  aria-label="GitHub Profile (opens in new tab)"
                  title="GitHub"
                >
                  <FiGithub />
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialButton}
                  aria-label="LinkedIn Profile (opens in new tab)"
                  title="LinkedIn"
                >
                  <FiLinkedin />
                </a>
                <a
                  href={profile.leetcode || "https://leetcode.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialButton}
                  aria-label="LeetCode Profile (opens in new tab)"
                  title="LeetCode"
                >
                  <SiLeetcode />
                </a>
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialButton}
                  aria-label="View Resume PDF (opens in new tab)"
                  title="Resume"
                >
                  <FiBookOpen />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div ref={formCardRef} className={styles.formCard}>
          <AnimatePresence mode="wait">
            {submissionStatus === "success" ? (
              <motion.div
                key="success-card"
                className={styles.successCard}
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -15 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                role="status"
                aria-live="polite"
              >
                <div className={styles.successIconWrap}>
                  <FiCheck />
                </div>
                <h3 className={styles.successTitle}>Message received!</h3>
                <p className={styles.successDescription}>
                  Thank you, <strong>{formData.name || "friend"}</strong>! Your inquiry has been
                  received. I review incoming messages daily and will be in touch shortly.
                </p>
                <button
                  type="button"
                  onClick={handleResetForm}
                  className={styles.successResetButton}
                >
                  <FiRefreshCw /> Send another note
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="contact-form"
                className={styles.formBody}
                onSubmit={handleSubmit}
                noValidate
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className={styles.formHeader}>
                  <span className={styles.formStepNum}>02</span>
                  <div className={styles.formHeaderCopy}>
                    <h3>Tell me about your project</h3>
                    <p>I usually reply within 24 hours.</p>
                  </div>
                  <FiMessageCircle className={styles.formHeaderIcon} aria-hidden="true" />
                </div>

                {/* Honeypot field for anti-spam protection */}
                <input
                  type="text"
                  name="hp_company"
                  value={formData.hp_company}
                  onChange={(e) => handleChange("hp_company", e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  className={styles.hpField}
                  aria-hidden="true"
                />

                {/* Name Field */}
                <div className={styles.fieldGroup}>
                  <label htmlFor={nameId} className={styles.fieldLabel}>
                    <span>Your Name</span>
                  </label>
                  <div className={styles.inputWrapper}>
                    <input
                      id={nameId}
                      name="name"
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      onBlur={() => handleBlur("name")}
                      aria-invalid={touched.name && !isNameValid ? "true" : "false"}
                      aria-describedby={touched.name && !isNameValid ? nameErrorId : undefined}
                      className={`${styles.fieldInput} ${
                        touched.name && isNameValid
                          ? styles.inputValid
                          : touched.name && !isNameValid
                          ? styles.inputInvalid
                          : ""
                      }`}
                    />
                    {touched.name && (
                      <span
                        className={`${styles.fieldStatusIcon} ${
                          isNameValid ? styles.validIcon : styles.invalidIcon
                        }`}
                        aria-hidden="true"
                      >
                        {isNameValid ? <FiCheck /> : <FiAlertCircle />}
                      </span>
                    )}
                  </div>
                  {touched.name && !isNameValid && (
                    <span id={nameErrorId} className={styles.fieldErrorText} role="alert">
                      <FiAlertCircle /> Please enter your name (at least 2 characters).
                    </span>
                  )}
                </div>

                {/* Email Field */}
                <div className={styles.fieldGroup}>
                  <label htmlFor={emailId} className={styles.fieldLabel}>
                    <span>Email Address</span>
                  </label>
                  <div className={styles.inputWrapper}>
                    <input
                      id={emailId}
                      name="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      onBlur={() => handleBlur("email")}
                      aria-invalid={touched.email && !isEmailValid ? "true" : "false"}
                      aria-describedby={touched.email && !isEmailValid ? emailErrorId : undefined}
                      className={`${styles.fieldInput} ${
                        touched.email && isEmailValid
                          ? styles.inputValid
                          : touched.email && !isEmailValid
                          ? styles.inputInvalid
                          : ""
                      }`}
                    />
                    {touched.email && (
                      <span
                        className={`${styles.fieldStatusIcon} ${
                          isEmailValid ? styles.validIcon : styles.invalidIcon
                        }`}
                        aria-hidden="true"
                      >
                        {isEmailValid ? <FiCheck /> : <FiAlertCircle />}
                      </span>
                    )}
                  </div>
                  {touched.email && !isEmailValid && (
                    <span id={emailErrorId} className={styles.fieldErrorText} role="alert">
                      <FiAlertCircle /> Please enter a valid email address.
                    </span>
                  )}
                </div>

                {/* Message Field */}
                <div className={styles.fieldGroup}>
                  <div className={styles.fieldLabel}>
                    <label htmlFor={messageId}>Project Details</label>
                    <span className={styles.fieldCount}>
                      {formData.message.length}/3000 (min 10)
                    </span>
                  </div>
                  <div className={styles.inputWrapper}>
                    <textarea
                      id={messageId}
                      name="message"
                      rows={4}
                      required
                      placeholder="Tell me a little about your idea, timeline, or scope..."
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      onBlur={() => handleBlur("message")}
                      aria-invalid={touched.message && !isMessageValid ? "true" : "false"}
                      aria-describedby={touched.message && !isMessageValid ? messageErrorId : undefined}
                      className={`${styles.fieldTextarea} ${
                        touched.message && isMessageValid
                          ? styles.inputValid
                          : touched.message && !isMessageValid
                          ? styles.inputInvalid
                          : ""
                      }`}
                    />
                  </div>
                  {touched.message && !isMessageValid && (
                    <span id={messageErrorId} className={styles.fieldErrorText} role="alert">
                      <FiAlertCircle /> Message must be at least 10 characters long.
                    </span>
                  )}
                </div>

                {/* Submission Error Banner & Fallback Actions */}
                {submissionStatus === "error" && (
                  <div className={styles.alertBanner} role="alert">
                    <div className={styles.alertHeader}>
                      <FiAlertCircle />
                      <span>{isConfigured ? "Submission issue" : "Direct Email Service Notice"}</span>
                    </div>
                    <p className={styles.alertMessage}>{errorMessage}</p>
                    <div className={styles.alertActions}>
                      <button
                        type="submit"
                        disabled={submissionStatus === "submitting"}
                        className={styles.retryButton}
                      >
                        <FiRefreshCw /> Retry sending
                      </button>
                      <a href={mailtoHref} className={styles.mailFallbackButton}>
                        <FiSend /> Open in Mail App
                      </a>
                    </div>
                  </div>
                )}

                {/* Form Footer */}
                <div className={styles.formFooter}>
                  <span className={styles.formDisclaimer}>
                    Every good collaboration starts with a conversation.
                  </span>
                  <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={submissionStatus === "submitting"}
                    aria-label="Send project inquiry message"
                  >
                    {submissionStatus === "submitting" ? (
                      <>
                        <span className={styles.spinner}>
                          <FiRefreshCw />
                        </span>
                        Sending message...
                      </>
                    ) : (
                      <>
                        Send message <FiSend className={styles.submitArrow} />
                      </>
                    )}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer Component */}
      <footer ref={footerRef} className={styles.footer}>
        <div className={styles.footerLeft}>
          <span className={styles.copyrightText}>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <span className={styles.footerStatusBadge}>
            <span className={styles.footerStatusDot} />
            Available for select roles
          </span>
        </div>

        <div className={styles.footerCenter}>
          <span>Crafted with precision &amp; care</span>
          <FiCode aria-hidden="true" />
        </div>

        <button
          onClick={scrollToTop}
          type="button"
          className={styles.backToTopButton}
          aria-label="Scroll back to top of page"
        >
          Back to top <FiArrowUp className={styles.backToTopArrow} aria-hidden="true" />
        </button>
      </footer>
    </section>
  );
});

export default ContactSection;
