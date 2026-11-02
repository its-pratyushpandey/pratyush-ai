"use client";

import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import {
  FiAlertCircle,
  FiArrowUp,
  FiArrowUpRight,
  FiAtSign,
  FiCheck,
  FiClock,
  FiCode,
  FiCopy,
  FiMapPin,
  FiPhone,
  FiSend,
} from "react-icons/fi";
import styles from "./ContactSection.module.scss";
import pageStyles from "../../app/page.module.scss";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const footerGroups = [
  {
    label: "Professional",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/pratyush-pandey1/" },
      { label: "GitHub", href: "https://github.com/its-pratyushpandey" },
      { label: "Peerlist", href: "https://peerlist.io/pratyushmeai" },
      { label: "Product Hunt", href: "https://www.producthunt.com/@pratyush_kumar_pandey" },
    ],
  },
  {
    label: "Writing",
    links: [
      { label: "Medium", href: "https://medium.com/@pratyush.me.ai" },
      { label: "DEV Community", href: "https://dev.to/pratyush_kumarpandey_0f5" },
      { label: "Hashnode", href: "https://hashnode.com/@pratyushpandey" },
      { label: "In Plain English", href: "https://plainenglish.io/author/pratyush-kumar-pandey" },
      { label: "Substack", href: "https://substack.com/@pratyushkumarpandey" },
    ],
  },
  {
    label: "Build & Learn",
    links: [
      { label: "LeetCode", href: "https://leetcode.com/u/mNJTujizno3/" },
      { label: "CodeChef", href: "https://www.codechef.com/users/rayomensukuna1" },
      { label: "GeeksforGeeks", href: "https://www.geeksforgeeks.org/profile/pratyuscruz" },
      { label: "Kaggle", href: "https://www.kaggle.com/pratyushkumarpandeyy" },
      { label: "Devpost", href: "https://devpost.com/pratyush-me-ai" },
    ],
  },
  {
    label: "Elsewhere",
    links: [
      { label: "X / Twitter", href: "https://x.com/prat86517" },
      { label: "YouTube", href: "https://www.youtube.com/@PratyushKumarPandey-j1n" },
      { label: "Reddit", href: "https://www.reddit.com/user/Pandey_Pratyush/" },
       { label: "Instagram", href: "https://www.instagram.com/its.pratyush_pandey" },
    ],
  },
];

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
  linkedin: "https://www.linkedin.com/in/pratyush-pandey1/",
  leetcode: "https://leetcode.com/u/mNJTujizno3/",
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
  const formRef = useRef(null);
  const directoryRef = useRef(null);
  const bottomBarRef = useRef(null);

  // Local Time State (Asia/Kolkata)
  const [localTime, setLocalTime] = useState("");

  // Copy Email State: 'idle' | 'copied' | 'error'
  const [copyStatus, setCopyStatus] = useState("idle");
  const copyTimerRef = useRef(null);

  // Form State
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
    hp_company: "",
  });
  const [formStatus, setFormStatus] = useState({ type: "idle", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Timezone Clock (Asia/Kolkata), updating every 30 seconds
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
    const interval = setInterval(updateTime, 30000);
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
        gsap.set(
          [
            bridgePillRef.current,
            bridgeLineLeftRef.current,
            bridgeLineRightRef.current,
            formRef.current,
            directoryRef.current,
            bottomBarRef.current,
          ],
          { opacity: 1, y: 0, scaleX: 1 }
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
        { opacity: 0, scale: 0.88 },
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
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.09,
            ease: "power3.out",
          },
          "-=0.2"
        )
        // Form panel reveal
        .fromTo(
          formRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
          "-=0.2"
        )
        // Directory grid reveal
        .fromTo(
          directoryRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
          "-=0.25"
        )
        // Bottom bar reveal
        .fromTo(
          bottomBarRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" },
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
      const emailToCopy = profile.email || DEFAULT_PROFILE.email;
      if (typeof navigator !== "undefined" && navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(emailToCopy);
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

  const scrollToTop = (e) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormState((current) => ({ ...current, [name]: value }));
    if (formStatus.type !== "idle") {
      setFormStatus({ type: "idle", message: "" });
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setFormStatus({ type: "idle", message: "" });

    try {
      const response = await fetch("/api/contact", {
        body: JSON.stringify(formState),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });
      const result = await response.json();

      if (!response.ok || !result.ok) {
        throw new Error(result.error || "Unable to send your message right now.");
      }

      setFormStatus({
        type: "success",
        message: result.message || "Message sent successfully. I’ll be in touch soon.",
      });
      setFormState({ name: "", email: "", message: "", hp_company: "" });
    } catch (error) {
      setFormStatus({
        type: "error",
        message: error.message || "Unable to send your message right now.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const userEmail = profile.email || DEFAULT_PROFILE.email;
  const userPhone = profile.phone || DEFAULT_PROFILE.phone;
  const userLocation = profile.location || DEFAULT_PROFILE.location;
  const userMaps = profile.maps || DEFAULT_PROFILE.maps;
  const userName = profile.name || DEFAULT_PROFILE.name;

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

      <div className={styles.container}>
        {/* Main Section Editorial Header (Exact match to screenshot) */}
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
                gradientWords={["Let's", "make", "it", "real.", "real", "Lets"]}
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
              href={`mailto:${userEmail}`}
              className={pageStyles.contactCta}
              aria-label="Start a conversation via direct email"
            >
              Start a conversation <FiArrowUpRight />
            </a>
          </motion.div>
        </div>

        {/* Contact Information Cards Hub (4-card balanced dashboard) */}
        <div ref={cardsWrapRef} className={styles.cardsGrid}>
          {/* Email Card */}
          <div className={styles.contactCard}>
            <div className={styles.cardIcon}>
              <FiAtSign aria-hidden="true" />
            </div>
            <div className={styles.cardBody}>
              <span className={styles.cardLabel}>Email Address</span>
              <strong className={styles.cardValue} title={userEmail}>
                {userEmail}
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
                    <FiCheck aria-hidden="true" /> Copied!
                  </>
                ) : copyStatus === "error" ? (
                  <>
                    <FiAlertCircle aria-hidden="true" /> Failed
                  </>
                ) : (
                  <>
                    <FiCopy aria-hidden="true" /> Copy
                  </>
                )}
              </button>
              <a
                href={`mailto:${userEmail}`}
                className={styles.cardDirectLink}
                aria-label="Open email client"
                title="Open mail client"
              >
                <FiArrowUpRight aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Phone Card */}
          <a
            href={`tel:${userPhone}`}
            className={styles.contactCard}
            aria-label={`Call or WhatsApp: ${userPhone}`}
          >
            <div className={styles.cardIcon}>
              <FiPhone aria-hidden="true" />
            </div>
            <div className={styles.cardBody}>
              <span className={styles.cardLabel}>Direct Phone</span>
              <strong className={styles.cardValue}>{userPhone}</strong>
              <span className={styles.cardSubtitle}>Call or WhatsApp</span>
            </div>
            <FiArrowUpRight className={styles.cardArrow} aria-hidden="true" />
          </a>

          {/* Location Card */}
          <a
            href={userMaps}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactCard}
            aria-label={`Location: ${userLocation} (opens Google Maps)`}
          >
            <div className={styles.cardIcon}>
              <FiMapPin aria-hidden="true" />
            </div>
            <div className={styles.cardBody}>
              <span className={styles.cardLabel}>Based In</span>
              <strong className={styles.cardValue}>{userLocation}</strong>
              <span className={styles.cardSubtitle}>Andhra Pradesh, India</span>
            </div>
            <FiArrowUpRight className={styles.cardArrow} aria-hidden="true" />
          </a>

          {/* Local Time Card */}
          <div
            className={styles.contactCard}
            aria-label={`Current local time in Vijayawada, India: ${localTime || "16:30"} IST`}
          >
            <div className={styles.cardIcon}>
              <FiClock aria-hidden="true" />
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
        </div>

        {/* Project Inquiry Form Panel */}
        <div ref={formRef} className={styles.contactFormPanel}>
          <div className={styles.formIntro}>
            <span className={styles.formEyebrow}>Let&apos;s collaborate</span>
            <h3>Tell me what you&apos;re working on.</h3>
            <p>
              Share a little context and I&apos;ll get back to you with thoughtful next steps,
              usually within 24 hours.
            </p>
            <div className={styles.formMeta}>
              <span><span className={styles.formMetaDot} /> Open to select roles &amp; projects</span>
              <span>Full-Stack · AI · Product Engineering</span>
            </div>
          </div>

          <form className={styles.contactForm} onSubmit={handleFormSubmit}>
            <div className={styles.formFields}>
              <label>
                <span>Your name</span>
                <input
                  type="text"
                  name="name"
                  value={formState.name}
                  onChange={handleFormChange}
                  placeholder="Jane Smith"
                  autoComplete="name"
                  minLength={2}
                  maxLength={100}
                  required
                />
              </label>
              <label>
                <span>Email address</span>
                <input
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleFormChange}
                  placeholder="jane@company.com"
                  autoComplete="email"
                  maxLength={150}
                  required
                />
              </label>
              <label className={styles.formMessageField}>
                <span>Project Details</span>
                <textarea
                  name="message"
                  value={formState.message}
                  onChange={handleFormChange}
                  placeholder="Tell me about your idea, timeline, or scope..."
                  minLength={10}
                  maxLength={3000}
                  rows={5}
                  required
                />
                <small>{formState.message.length}/3000 (min 10)</small>
              </label>
            </div>
            <input
              className={styles.honeypot}
              type="text"
              name="hp_company"
              value={formState.hp_company}
              onChange={handleFormChange}
              tabIndex="-1"
              autoComplete="off"
              aria-hidden="true"
            />
            <div className={styles.formFooter}>
              <span className={`${styles.formStatus} ${styles[`formStatus${formStatus.type}`]}`} role="status">
                {formStatus.message}
              </span>
              <button type="submit" className={styles.formSubmit} disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send message"}
                {isSubmitting ? <span className={styles.submitSpinner} /> : <FiSend aria-hidden="true" />}
              </button>
            </div>
          </form>
        </div>

        {/* Section Architectural Divider */}
        <div className={styles.sectionDivider} aria-hidden="true" />

        {/* 4-Column Directory Links */}
        <div ref={directoryRef} className={styles.directoryGrid}>
          {footerGroups.map((group) => (
            <div className={styles.directoryCol} key={group.label}>
              <span className={styles.directoryColLabel}>{group.label}</span>
              <div className={styles.directoryLinksList}>
                {group.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.directoryLink}
                  >
                    <span>{link.label}</span>
                    <FiArrowUpRight className={styles.linkArrow} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Bar: Copyright, Status, Credits, Back to Top */}
        <footer ref={bottomBarRef} className={styles.bottomBar}>
          <div className={styles.bottomLeft}>
            <span className={styles.copyrightText}>
              © {new Date().getFullYear()} {userName}
            </span>
           
          </div>

          <div className={styles.bottomCenter}>
            <span>Crafted with precision &amp; care</span>
            <FiCode className={styles.codeIcon} aria-hidden="true" />
          </div>

          <button
            onClick={scrollToTop}
            type="button"
            className={styles.backToTopButton}
            aria-label="Scroll back to top of page"
          >
            <span>Back to top</span>
            <FiArrowUp className={styles.backToTopArrow} aria-hidden="true" />
          </button>
        </footer>
      </div>
    </section>
  );
});

export default ContactSection;
