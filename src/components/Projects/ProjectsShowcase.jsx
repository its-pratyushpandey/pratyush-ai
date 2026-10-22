'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  FiArrowUpRight,
  FiGithub,
  FiTerminal,
  FiMessageCircle,
  FiCheckCircle,
  FiActivity,
  FiZap,
} from 'react-icons/fi';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from './ProjectsShowcase.module.scss';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ==========================================================================
   StaggeredWordReveal Component
   Exact signature typography & animation system from 05 / CREDENTIALS:
   - Word-by-word mask (overflow: hidden)
   - Vertical upward slide (y: "120%" -> "0%")
   - Lens optical blur wipe (blur(8px) -> blur(0px))
   - Refined cubic-bezier easing [0.22, 1, 0.36, 1]
   - Restrained gradient emphasis per project theme
   ========================================================================== */
function StaggeredWordReveal({
  text,
  className = '',
  delay = 0,
  highlightWords = [],
  gradientWords = [],
  gradientTheme = 'default',
}) {
  const words = text.split(' ');
  return (
    <motion.span
      className={`${styles.staggeredWordWrapper} ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.045,
            delayChildren: delay,
          },
        },
      }}
    >
      {words.map((word, i) => {
        const cleanWord = word.replace(/[^a-zA-Z0-9]/g, '');
        const isHighlight =
          highlightWords.some((h) => h.toLowerCase() === cleanWord.toLowerCase()) ||
          highlightWords.includes(word);
        const isGradient =
          gradientWords.some((g) => g.toLowerCase() === cleanWord.toLowerCase()) ||
          gradientWords.includes(word);

        const gradientClass =
          gradientTheme === 'orange'
            ? styles.wordGradientOrange
            : gradientTheme === 'violet'
            ? styles.wordGradientViolet
            : gradientTheme === 'cyan'
            ? styles.wordGradientCyan
            : styles.wordGradient;

        return (
          <span key={`${word}-${i}`} className={styles.wordMask}>
            <motion.span
              className={`${styles.wordInner} ${isHighlight ? styles.wordHighlight : ''} ${
                isGradient ? gradientClass : ''
              }`}
              variants={{
                hidden: { y: '120%', opacity: 0, filter: 'blur(8px)' },
                visible: {
                  y: '0%',
                  opacity: 1,
                  filter: 'blur(0px)',
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

const cogniviewProject = {
  number: '01.',
  name: 'Cogniview',
  titleLine1: 'Cogniview:',
  titleLine2: 'AI Voice Interview & Evaluation Platform',
  gradientWords: ['Voice', 'Interview', 'Evaluation', 'Platform', 'AI'],
  kicker: 'Voice AI • Intelligent Systems',
  subtitle: 'Speech AI • AST Code Evaluation • Real-Time Telemetry • Microservices',
  description:
    'An enterprise-grade voice-enabled interview simulator that conducts real-time technical conversations, evaluates algorithmic reasoning with Gemini 1.5, audits GitHub portfolios, and provides comprehensive performance analytics.',
  year: '2026',
  tags: ['Next.js 14', 'TypeScript', 'Gemini 1.5 Pro', 'Firebase', 'Web Audio API', 'Tailwind CSS'],
  accent: '#80e8e0',
  backdropImage: '/images/background.jpg',
  liveUrl: 'mailto:pratyush.me.ai@gmail.com?subject=Cogniview%20Demo%20Request',
  githubUrl: 'https://github.com/its-pratyushpandey',
  urlBar: 'app.cogniview.ai/live/interview',
  prompt: 'Analyze the architectural tradeoffs of Kafka vs RabbitMQ in event-driven microservices.',
  scores: [
    { label: 'Problem Solving', value: '96%', pct: 96 },
    { label: 'System Design', value: '94%', pct: 94 },
    { label: 'Voice Clarity', value: '95%', pct: 95 },
  ],
};

const nexthireProject = {
  number: '02.',
  name: 'NextHire',
  titleLine1: 'NextHire:',
  titleLine2: 'AI Job Portal & Talent Hub',
  gradientWords: ['Job', 'Portal', 'Talent', 'Hub', 'AI'],
  kicker: 'WebSockets • Real-Time Systems',
  subtitle: '1st Prize Winner // MERN Hackathon • Sub-50ms Sockets • Vector ATS',
  description:
    'Award-winning intelligent recruitment ecosystem connecting candidates with vector ATS resume parsing, sub-50ms live chat rooms, automated matching, and video screening.',
  year: '2025',
  tags: ['React', 'Node.js', 'Express', 'MongoDB', 'WebSockets', 'Redux'],
  accent: '#9b8cff',
  backdropImage: '/images/background2.jpg',
  liveUrl: 'mailto:pratyush.me.ai@gmail.com?subject=NextHire%20Demo%20Request',
  githubUrl: 'https://github.com/its-pratyushpandey',
  urlBar: 'nexthire.ai/recruiter/pipeline',
  candidate: {
    name: 'Eren Yeager',
    role: 'Senior Full-Stack Engineer',
    location: 'Berlin, DE • Remote',
    score: '98% MATCH',
    badge: 'VERIFIED TALENT',
  },
  chat: 'Recruiter: "Your distributed systems architecture test was exceptional! Let\'s schedule the interview."',
  graphHeights: [38, 70, 52, 94, 76, 98, 82, 88],
};

const ariseProject = {
  number: '03.',
  name: 'Arise',
  titleLine1: 'Arise:',
  titleLine2: 'AI Career Platform & Resume Studio',
  gradientWords: ['Career', 'Platform', 'Resume', 'Studio', 'AI'],
  kicker: 'Career Intelligence • LLM Architecture',
  subtitle: 'Dynamic ATS Engine • Prisma ORM • Next.js 14 • Gemini AI • Full Stack Development',
  description:
    'All-in-one career workspace featuring real-time ATS resume keyword optimization, multi-shot tailored cover letter drafting, and behavioral interview simulation.',
  year: '2025',
  tags: ['Next.js 14', 'MongoDB', 'Prisma ORM', 'Gemini AI', 'Clerk'],
  accent: '#ff9671',
  backdropImage: '/images/myprofile.png',
  liveUrl: 'mailto:pratyush.me.ai@gmail.com?subject=Arise%20Demo%20Request',
  githubUrl: 'https://github.com/its-pratyushpandey',
  urlBar: 'arise.careers/studio/optimizer',
  score: '95',
  scoreLabel: 'ATS Readiness',
  targetRole: 'Senior / Staff Software Engineer',
  benchmark: 'Top 2% ATS Benchmark',
  keywords: ['Vector DB', 'Distributed Systems', 'Next.js 14', 'FastAPI & Docker'],
  aiTip: 'Quantified metrics detected in 4/5 bullet points (+24% estimated ATS pass rate).',
};

export default function ProjectsShowcase() {
  const sectionRef = useRef(null);
  const watermarkRef = useRef(null);

  // Cogniview (Project 01) refs
  const cogniviewCardRef = useRef(null);
  const cogniviewViewportWrapRef = useRef(null);
  const cogniviewViewportRef = useRef(null);
  const cogniviewBackdropImgRef = useRef(null);
  const desktopWindowRef = useRef(null);
  const dashboardWindowRef = useRef(null);
  const mobileMockupRef = useRef(null);

  // NextHire (Project 02) refs
  const nexthireCardRef = useRef(null);
  const nexthireViewportWrapRef = useRef(null);
  const nexthireViewportRef = useRef(null);
  const nexthireBackdropImgRef = useRef(null);
  const nexthireNumberRef = useRef(null);

  // Arise (Project 03) refs
  const ariseCardRef = useRef(null);
  const ariseViewportWrapRef = useRef(null);
  const ariseViewportRef = useRef(null);
  const ariseBackdropImgRef = useRef(null);
  const ariseNumberRef = useRef(null);

  // Footer CTA ref
  const viewMoreRef = useRef(null);

  // 3D Tilt handlers (CSS Variables only - does not collide with GSAP)
  const handleMouseMove = (ref) => (e) => {
    if (!ref.current || (typeof window !== 'undefined' && window.matchMedia('(max-width: 900px)').matches)) return;
    const rect = ref.current.getBoundingClientRect();
    const rotX = (0.5 - (e.clientY - rect.top) / rect.height) * 8;
    const rotY = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    ref.current.style.setProperty('--tilt-x', `${rotX.toFixed(2)}deg`);
    ref.current.style.setProperty('--tilt-y', `${rotY.toFixed(2)}deg`);
  };

  const handleMouseLeave = (ref) => () => {
    if (!ref.current) return;
    ref.current.style.setProperty('--tilt-x', '0deg');
    ref.current.style.setProperty('--tilt-y', '0deg');
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Watermark subtle scroll-linked parallax
      if (watermarkRef.current && sectionRef.current) {
        gsap.to(watermarkRef.current, {
          yPercent: 24,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
          },
        });
      }

      // 2. Featured Project 01 — Cogniview
      if (cogniviewCardRef.current) {
        // Coordinated clip-path & scale reveal on viewport wrap
        const cogniviewTl = gsap.timeline({
          scrollTrigger: {
            trigger: cogniviewViewportWrapRef.current || cogniviewCardRef.current,
            start: 'top 82%',
            once: true,
          },
        });

        cogniviewTl
          .fromTo(
            cogniviewViewportWrapRef.current,
            { clipPath: 'inset(10% 0% 10% 0% round 24px)', opacity: 0.8 },
            { clipPath: 'inset(0% 0% 0% 0% round 32px)', opacity: 1, duration: 1.1, ease: 'power3.out' }
          )
          .fromTo(
            cogniviewBackdropImgRef.current,
            { scale: 1.05 },
            { scale: 1.0, duration: 1.25, ease: 'power2.out' },
            '<'
          );

        // Independent layered depth parallax across scroll
        if (desktopWindowRef.current && dashboardWindowRef.current && mobileMockupRef.current) {
          gsap.to(desktopWindowRef.current, {
            y: -18,
            ease: 'none',
            scrollTrigger: {
              trigger: cogniviewCardRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          });

          gsap.to(dashboardWindowRef.current, {
            y: -38,
            ease: 'none',
            scrollTrigger: {
              trigger: cogniviewCardRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          });

          gsap.to(mobileMockupRef.current, {
            y: -54,
            ease: 'none',
            scrollTrigger: {
              trigger: cogniviewCardRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.4,
            },
          });
        }
      }

      // 3. Project 02 — NextHire
      if (nexthireCardRef.current) {
        gsap.fromTo(
          nexthireViewportWrapRef.current,
          { clipPath: 'inset(10% 0% 10% 0% round 20px)', opacity: 0.8 },
          {
            clipPath: 'inset(0% 0% 0% 0% round 26px)',
            opacity: 1,
            duration: 1.05,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: nexthireViewportWrapRef.current,
              start: 'top 82%',
              once: true,
            },
          }
        );

        gsap.fromTo(
          nexthireBackdropImgRef.current,
          { scale: 1.05 },
          {
            scale: 1.0,
            duration: 1.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: nexthireViewportWrapRef.current,
              start: 'top 82%',
              once: true,
            },
          }
        );

        // Project number parallax scrub
        if (nexthireNumberRef.current) {
          gsap.to(nexthireNumberRef.current, {
            y: 32,
            ease: 'none',
            scrollTrigger: {
              trigger: nexthireCardRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.8,
            },
          });
        }
      }

      // 4. Project 03 — Arise (Warm Orange Identity)
      if (ariseCardRef.current) {
        gsap.fromTo(
          ariseViewportWrapRef.current,
          { clipPath: 'inset(10% 0% 10% 0% round 20px)', opacity: 0.8 },
          {
            clipPath: 'inset(0% 0% 0% 0% round 26px)',
            opacity: 1,
            duration: 1.05,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: ariseViewportWrapRef.current,
              start: 'top 82%',
              once: true,
            },
          }
        );

        gsap.fromTo(
          ariseBackdropImgRef.current,
          { scale: 1.05 },
          {
            scale: 1.0,
            duration: 1.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: ariseViewportWrapRef.current,
              start: 'top 82%',
              once: true,
            },
          }
        );

        // Project number parallax scrub
        if (ariseNumberRef.current) {
          gsap.to(ariseNumberRef.current, {
            y: 32,
            ease: 'none',
            scrollTrigger: {
              trigger: ariseCardRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.8,
            },
          });
        }
      }

      // 5. Centered "View More Projects" CTA Reveal
      if (viewMoreRef.current) {
        gsap.fromTo(
          viewMoreRef.current,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: viewMoreRef.current,
              start: 'top 92%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className={styles.projectsContainer}
      aria-label="Selected Production Projects Showcase"
    >
      {/* Ambient Lighting Spheres */}
      <div className={styles.ambientOrbTop} aria-hidden="true" />
      <div className={styles.ambientOrbBottom} aria-hidden="true" />

      {/* ====================================================================
          SECTION INTRODUCTION (EXACT SAME STYLE AS 05 / CREDENTIALS)
          - Giant Watermark: PROJECTS
          - Eyebrow: 03 / SELECTED WORK with pulsing dot
          - Multi-line headline with StaggeredWordReveal & gradient emphasis
          - Supporting Intro paragraph
          ==================================================================== */}
      <div className={styles.editorialHeaderWrap}>
        {/* Background Ghost Watermark Title */}
        <div ref={watermarkRef} className={styles.sectionWatermark} aria-hidden="true">
          PROJECTS
        </div>

        {/* Eyebrow Badge with Glowing Dot */}
        <motion.div
          className={styles.editorialEyebrow}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.editorialEyebrowDot} />
          <span>03 / SELECTED WORK</span>
        </motion.div>

        {/* Staggered Multi-Line Animated Headline */}
        <h2 className={styles.editorialHeadline}>
          <span className={styles.editorialHeadlineLine1}>
            <StaggeredWordReveal text="Selected Work" />
          </span>
          <span className={styles.editorialHeadlineLine2}>
            <StaggeredWordReveal
              text="Products I've built to solve real problems."
              delay={0.15}
              gradientWords={['solve', 'real', 'problems.']}
            />
          </span>
        </h2>

        {/* Subtitle / Intro paragraph */}
        <motion.p
          className={styles.editorialIntro}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, delay: 0.2 }}
        >
          A selection of production systems where product thinking meets engineering craft.
        </motion.p>

        {/* Scope & Category Badges */}
        <motion.div
          className={styles.sectionChipsRow}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, delay: 0.28 }}
        >
          <span className={styles.categoryChip}>
            <span className={styles.chipDot} /> 03 Production Deployments
          </span>
          <span className={styles.categoryChip}>
            <span className={styles.chipDot} /> Speech AI &amp; LLM Systems
          </span>
          <span className={styles.categoryChip}>
            <span className={styles.chipDot} /> Sub-50ms Real-Time Sockets
          </span>
          <span className={styles.categoryChip}>
            <span className={styles.chipDot} /> 2025 — 2026
          </span>
        </motion.div>
      </div>

      {/* ====================================================================
          STAGE LIST (PROJECTS 01, 02, 03)
          ==================================================================== */}
      <div className={styles.stageList}>
        {/* ------------------------------------------------------------------
            PROJECT 01 — COGNIVIEW (Big Screen Multi-Layered Showcase)
            ------------------------------------------------------------------ */}
        <article
          ref={cogniviewCardRef}
          className={styles.bigScreenProject}
          style={{ '--stage-accent': cogniviewProject.accent }}
        >
          {/* Big Screen Viewport with Clip-Path Wrap */}
          <div ref={cogniviewViewportWrapRef} className={styles.bigScreenViewportWrap}>
            <div
              ref={cogniviewViewportRef}
              className={styles.bigScreenViewport}
              onMouseMove={handleMouseMove(cogniviewViewportRef)}
              onMouseLeave={handleMouseLeave(cogniviewViewportRef)}
            >
              {/* Photorealistic Backdrop */}
              <div ref={cogniviewBackdropImgRef} className={styles.bigScreenBackdrop}>
                <Image
                  src={cogniviewProject.backdropImage}
                  alt=""
                  fill
                  sizes="100vw"
                  priority
                />
              </div>
              <div className={styles.bigScreenLighting} aria-hidden="true" />
              <div className={styles.studioAuraCyan} aria-hidden="true" />
              <div className={styles.studioAuraViolet} aria-hidden="true" />

              {/* Floating Top-Right Circular Arrow Button */}
              <a
                href={cogniviewProject.liveUrl}
                className={styles.bigScreenArrowBtn}
                aria-label={`Open ${cogniviewProject.name} live project`}
                title={`Open ${cogniviewProject.name} live project`}
              >
                <FiArrowUpRight />
              </a>

              {/* Multi-Layered 3D Stage */}
              <div className={styles.multiLayerStage}>
                {/* Layer 1: Dark Mode Desktop Window (Top-Left) */}
                <div ref={desktopWindowRef} className={styles.masterDesktopWindow}>
                  <div className={styles.windowTopBar}>
                    <div className={styles.windowDots}>
                      <span />
                      <span />
                      <span />
                    </div>
                    <div className={styles.windowUrlPill}>
                      <FiTerminal />
                      <span>https://{cogniviewProject.urlBar}</span>
                    </div>
                    <div className={styles.windowRightActions}>
                      <span className={styles.activePillDot}>
                        <span className={styles.recDot} />
                        <span>Streaming Active</span>
                      </span>
                    </div>
                  </div>

                  <div className={styles.windowCanvas}>
                    <div className={styles.heroHudHeader}>
                      <span className={styles.liveRecIndicator}>
                        <span className={styles.recDot} /> LIVE SESSION #0482
                      </span>
                      <span className={styles.telemetryTag}>
                        <FiZap style={{ marginRight: 4 }} /> GEMINI 1.5 PRO STREAM • 42ms
                      </span>
                    </div>

                    <div className={styles.activePromptBox}>
                      <div className={styles.promptKicker}>
                        AI Technical Prompter // Event-Driven Microservices
                      </div>
                      <div className={styles.promptText}>
                        &ldquo;{cogniviewProject.prompt}&rdquo;
                      </div>
                    </div>

                    {/* Dynamic Equalizer Waveform */}
                    <div className={styles.audioWaveform}>
                      {[14, 28, 18, 36, 22, 42, 28, 48, 34, 52, 38, 46, 30, 44, 24, 38, 20, 32, 18, 12].map(
                        (height, i) => (
                          <span
                            key={i}
                            className={styles.waveBar}
                            style={{
                              height: `${height}px`,
                              animationDelay: `${i * 0.06}s`,
                              animationDuration: `${0.75 + (i % 5) * 0.18}s`,
                            }}
                          />
                        )
                      )}
                    </div>

                    {/* Performance Score Cards with mini progress indicators */}
                    <div className={styles.scorePillsRow}>
                      {cogniviewProject.scores.map((sc) => (
                        <div key={sc.label} className={styles.scoreCard}>
                          <div className={styles.scoreTopRow}>
                            <span className={styles.scoreLabel}>{sc.label}</span>
                            <span className={styles.scoreValue}>{sc.value}</span>
                          </div>
                          <div className={styles.miniProgressBar}>
                            <span
                              className={styles.miniProgressFill}
                              style={{ width: `${sc.pct}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Layer 2: Light Mode Analytics Dashboard (Overlapping Right) */}
                <div ref={dashboardWindowRef} className={styles.masterDashboardWindow} aria-hidden="true">
                  <div className={styles.dashTopBar}>
                    <span>Discover Candidates &amp; Rubrics</span>
                    <span className={styles.dashBadge}>● Evaluated: 34</span>
                  </div>
                  <div className={styles.dashBody}>
                    <div className={styles.dashSearchRow}>
                      <span>Search competencies, AST logs...</span>
                      <span>All Categories ▾</span>
                    </div>
                    <div className={styles.dashStatGrid}>
                      <div className={styles.dashStatBox}>
                        <b>96.4%</b>
                        <span>Clarity Index</span>
                      </div>
                      <div className={styles.dashStatBox}>
                        <b>&lt;95ms</b>
                        <span>Voice Latency</span>
                      </div>
                      <div className={styles.dashStatBox}>
                        <b>100%</b>
                        <span>AST Validated</span>
                      </div>
                    </div>
                    <div className={styles.dashMiniCandidateRow}>
                      <div className={styles.miniCandidateBadge}>
                        <span className={styles.miniDotGreen} />
                        <span>Distributed Architecture • 98% Match</span>
                      </div>
                      <div className={styles.miniCandidateBadge}>
                        <span className={styles.miniDotBlue} />
                        <span>AST Execution Engine • 96% Match</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Layer 3: Floating Dark Mobile Mockup (Foreground Center-Left) */}
                <div ref={mobileMockupRef} className={styles.masterMobileMockup} aria-hidden="true">
                  <div className={styles.mobileSpeakerBar} />
                  <div className={styles.mobileInner}>
                    <div className={styles.mobileStatusBar}>
                      <span>09:41</span>
                      <span className={styles.mobileDynamicIsland} />
                      <span>5G 100%</span>
                    </div>
                    <div className={styles.mobileHeader}>
                      <span className={styles.recDot} /> Live Voice Feed
                    </div>
                    <div className={styles.mobileCardSnippet}>
                      <b>Interviewee:</b> Active speech detected.
                    </div>
                    <div className={styles.mobileCardSnippet}>
                      <b>Confidence:</b> 98.2% semantic match.
                    </div>
                    <div className={styles.mobileMiniWave}>
                      {[12, 24, 18, 30, 16, 26, 14, 20].map((h, i) => (
                        <span
                          key={i}
                          className={styles.mobileWaveBar}
                          style={{
                            height: `${h}px`,
                            animationDelay: `${i * 0.08}s`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Details Below Viewport — With Rich Text Animations */}
          <div className={styles.bigScreenMeta}>
            <div className={styles.metaTopCapsuleRow}>
              <span className={styles.yearPillFilled}>{cogniviewProject.year}</span>
              <span className={styles.projectCategoryPill}>
                <span className={styles.projectCategoryDot} />
                {cogniviewProject.kicker}
              </span>
              <motion.div
                className={styles.pillsRow}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.04 } },
                }}
              >
                {cogniviewProject.tags.map((tag) => (
                  <motion.span
                    key={tag}
                    className={styles.tagPill}
                    variants={{
                      hidden: { opacity: 0, scale: 0.9, y: 10 },
                      visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.35 } },
                    }}
                    whileHover={{ y: -3, scale: 1.05 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </motion.div>
            </div>

            {/* Editorial Project Title with StaggeredWordReveal & Gradient Emphasis */}
            <h3 className={styles.stageTitle}>
              <span className={styles.stageTitleLine1}>
                <StaggeredWordReveal text={cogniviewProject.titleLine1} />
              </span>
              <span className={styles.stageTitleLine2}>
                <StaggeredWordReveal
                  text={cogniviewProject.titleLine2}
                  delay={0.1}
                  gradientWords={cogniviewProject.gradientWords}
                  gradientTheme="cyan"
                />
              </span>
            </h3>

            {/* Subtitle with Masked Words */}
            <p className={styles.stageSubtitle}>
              <StaggeredWordReveal text={cogniviewProject.subtitle} delay={0.16} />
            </p>

            {/* Description Paragraph with Motion Fade */}
            <motion.p
              className={styles.stageDesc}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, delay: 0.2 }}
            >
              {cogniviewProject.description}
            </motion.p>

            <motion.div
              className={styles.stageActions}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: 0.25 }}
            >
              <motion.a
                href={cogniviewProject.liveUrl}
                className={styles.actionBtnPrimary}
                aria-label={`Discuss ${cogniviewProject.name}`}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Discuss Project</span>
                <FiArrowUpRight />
              </motion.a>
              <motion.a
                href={cogniviewProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.actionBtnOutline}
                aria-label={`GitHub source for ${cogniviewProject.name}`}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FiGithub />
                <span>GitHub Profile</span>
              </motion.a>
            </motion.div>
          </div>
        </article>

        {/* ------------------------------------------------------------------
            PROJECT 02 — NEXTHIRE (Split: Preview Left, Details Right)
            ------------------------------------------------------------------ */}
        <article
          ref={nexthireCardRef}
          className={styles.splitProject}
          style={{ '--stage-accent': nexthireProject.accent }}
        >
          <div className={styles.splitGrid}>
            {/* Visual Column (Left) */}
            <div className={styles.splitVisualCol}>
              <div ref={nexthireViewportWrapRef} className={styles.splitViewportWrap}>
                <div
                  ref={nexthireViewportRef}
                  className={styles.splitViewport}
                  onMouseMove={handleMouseMove(nexthireViewportRef)}
                  onMouseLeave={handleMouseLeave(nexthireViewportRef)}
                >
                  <div ref={nexthireBackdropImgRef} className={styles.splitBackdrop}>
                    <Image
                      src={nexthireProject.backdropImage}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 100vw, 55vw"
                    />
                  </div>
                  <div className={styles.splitLighting} aria-hidden="true" />
                  <div className={styles.splitStudioOrb} aria-hidden="true" />

                  {/* Glassmorphic App Window */}
                  <div className={styles.splitAppWindow}>
                    <div className={styles.windowTopBar}>
                      <div className={styles.windowDots}>
                        <span />
                        <span />
                        <span />
                      </div>
                      <div className={styles.windowUrlPill}>
                        <FiTerminal />
                        <span>https://{nexthireProject.urlBar}</span>
                      </div>
                    </div>

                    <div className={styles.nexthireCanvas}>
                      <div className={styles.nexthireHeaderRow}>
                        <span className={styles.pipelineStatusBadge}>
                          <span className={styles.eyebrowPulseDot} />
                          <span>Live WebSocket Connected • 32ms</span>
                        </span>
                        <span className={styles.pipelineCountBadge}>
                          48 Candidates In Review
                        </span>
                      </div>

                      <div className={styles.candidateTile}>
                        <div className={styles.candidateLeft}>
                          <div className={styles.candidateAvatar}>
                            EY
                            <span className={styles.onlineBadge} />
                          </div>
                          <div className={styles.candidateBio}>
                            <span className={styles.candidateName}>{nexthireProject.candidate.name}</span>
                            <span className={styles.candidateRole}>
                              {nexthireProject.candidate.role} • {nexthireProject.candidate.location}
                            </span>
                          </div>
                        </div>
                        <div className={styles.matchGaugePill}>
                          <span className={styles.matchGaugeValue}>{nexthireProject.candidate.score}</span>
                          <span className={styles.matchGaugeLabel}>{nexthireProject.candidate.badge}</span>
                        </div>
                      </div>

                      <div className={styles.liveChatToast}>
                        <FiMessageCircle className={styles.chatIcon} />
                        <div className={styles.chatBubbleContent}>
                          <span className={styles.chatSender}>Recruiter Pipeline Chat:</span>
                          <p className={styles.chatMessageText}>
                            &ldquo;Your distributed systems architecture test was exceptional! Let&apos;s schedule the final round.&rdquo;
                          </p>
                        </div>
                      </div>

                      <div className={styles.hiringGraphSection}>
                        <div className={styles.graphHeader}>
                          <span><FiActivity style={{ marginRight: 4 }} /> WebSocket Real-Time Activity</span>
                          <span className={styles.graphSubLabel}>Sub-50ms Event Sync</span>
                        </div>
                        <div className={styles.hiringBarGraph}>
                          {nexthireProject.graphHeights.map((h, i) => (
                            <div
                              key={i}
                              className={styles.graphBar}
                              style={{
                                height: `${h}%`,
                                animationDelay: `${i * 0.08}s`,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Interactive "View ↗" Badge */}
                  <a
                    href={nexthireProject.liveUrl}
                    className={styles.floatingViewBadge}
                    aria-label={`View ${nexthireProject.name} live`}
                    title={`View ${nexthireProject.name} live`}
                  >
                    View ↗
                  </a>
                </div>
              </div>
            </div>

            {/* Details Column (Right) */}
            <div className={styles.splitInfoCol}>
              <div ref={nexthireNumberRef} className={styles.splitNumber}>
                {nexthireProject.number}
              </div>

              <div className={styles.metaTopCapsuleRow}>
                <span className={styles.yearPillFilled}>{nexthireProject.year}</span>
                <span className={styles.projectCategoryPill}>
                  <span className={styles.projectCategoryDot} />
                  {nexthireProject.kicker}
                </span>
                <motion.div
                  className={styles.pillsRow}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.04 } },
                  }}
                >
                  {nexthireProject.tags.map((tag) => (
                    <motion.span
                      key={tag}
                      className={styles.tagPill}
                      variants={{
                        hidden: { opacity: 0, scale: 0.9, y: 10 },
                        visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.35 } },
                      }}
                      whileHover={{ y: -3, scale: 1.05 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </motion.div>
              </div>

              {/* Editorial Project Title with StaggeredWordReveal & Gradient Emphasis */}
              <h3 className={styles.stageTitle}>
                <span className={styles.stageTitleLine1}>
                  <StaggeredWordReveal text={nexthireProject.titleLine1} />
                </span>
                <span className={styles.stageTitleLine2}>
                  <StaggeredWordReveal
                    text={nexthireProject.titleLine2}
                    delay={0.1}
                    gradientWords={nexthireProject.gradientWords}
                    gradientTheme="violet"
                  />
                </span>
              </h3>

              {/* Subtitle with Masked Words */}
              <p className={styles.stageSubtitle}>
                <StaggeredWordReveal text={nexthireProject.subtitle} delay={0.16} />
              </p>

              {/* Description Paragraph with Motion Fade */}
              <motion.p
                className={styles.stageDesc}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.65, delay: 0.2 }}
              >
                {nexthireProject.description}
              </motion.p>

              <motion.div
                className={styles.stageActions}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: 0.25 }}
              >
                <motion.a
                  href={nexthireProject.liveUrl}
                  className={styles.actionBtnPrimary}
                  aria-label={`Discuss ${nexthireProject.name}`}
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Discuss Project</span>
                  <FiArrowUpRight />
                </motion.a>
                <motion.a
                  href={nexthireProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.actionBtnOutline}
                  aria-label={`GitHub source for ${nexthireProject.name}`}
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FiGithub />
                  <span>GitHub Profile</span>
                </motion.a>
              </motion.div>
            </div>
          </div>
        </article>

        {/* ------------------------------------------------------------------
            PROJECT 03 — ARISE (Split: Details Left, Preview Right - Warm Orange)
            ------------------------------------------------------------------ */}
        <article
          ref={ariseCardRef}
          className={styles.splitProject}
          style={{ '--stage-accent': ariseProject.accent }}
        >
          <div className={`${styles.splitGrid} ${styles.splitGridReversed}`}>
            {/* Visual Column (Right on desktop) */}
            <div className={styles.splitVisualCol}>
              <div ref={ariseViewportWrapRef} className={styles.splitViewportWrap}>
                <div
                  ref={ariseViewportRef}
                  className={styles.splitViewport}
                  onMouseMove={handleMouseMove(ariseViewportRef)}
                  onMouseLeave={handleMouseLeave(ariseViewportRef)}
                >
                  <div ref={ariseBackdropImgRef} className={styles.splitBackdrop}>
                    <Image
                      src={ariseProject.backdropImage}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 100vw, 55vw"
                    />
                  </div>
                  <div className={styles.splitLighting} aria-hidden="true" />
                  <div className={styles.splitStudioOrb} aria-hidden="true" />

                  {/* Glassmorphic App Window */}
                  <div className={styles.splitAppWindow}>
                    <div className={styles.windowTopBar}>
                      <div className={styles.windowDots}>
                        <span />
                        <span />
                        <span />
                      </div>
                      <div className={styles.windowUrlPill}>
                        <FiTerminal />
                        <span>https://{ariseProject.urlBar}</span>
                      </div>
                    </div>

                    <div className={styles.ariseCanvas}>
                      <div className={styles.ariseHeaderRow}>
                        <span className={styles.atsStatusBadge}>
                          <span className={styles.livePulseDotCoral} />
                          <span>AI Resume Engine v2.4 • Analysis Complete</span>
                        </span>
                        <span className={styles.atsVerifiedTag}>
                          <FiCheckCircle style={{ marginRight: 4 }} /> ATS Optimal
                        </span>
                      </div>

                      <div className={styles.atsScoreBox}>
                        <div className={styles.atsLeftBlock}>
                          <div className={styles.circleGaugeWrap}>
                            <div className={styles.circleGauge}>
                              <span className={styles.circleGaugeNum}>{ariseProject.score}</span>
                              <span className={styles.circleGaugeSub}>/100</span>
                            </div>
                          </div>
                          <div className={styles.atsBio}>
                            <span className={styles.atsBioTitle}>{ariseProject.scoreLabel}: 95/100</span>
                            <span className={styles.atsBioRole}>{ariseProject.targetRole}</span>
                            <span className={styles.atsBioBench}>{ariseProject.benchmark}</span>
                          </div>
                        </div>
                      </div>

                      <div className={styles.keywordSection}>
                        <div className={styles.keywordSectionLabel}>Semantic Keyword Matches:</div>
                        <div className={styles.keywordChips}>
                          {ariseProject.keywords.map((kw) => (
                            <span key={kw} className={styles.kwPill}>
                              <FiCheckCircle className={styles.kwIcon} /> {kw}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className={styles.aiTipBox}>
                        <span className={styles.aiTipSparkle}>✦ AI Insight:</span>
                        <span>{ariseProject.aiTip}</span>
                      </div>
                    </div>
                  </div>

                  {/* Floating Interactive "View ↗" Badge */}
                  <a
                    href={ariseProject.liveUrl}
                    className={styles.floatingViewBadge}
                    aria-label={`View ${ariseProject.name} live`}
                    title={`View ${ariseProject.name} live`}
                  >
                    View ↗
                  </a>
                </div>
              </div>
            </div>

            {/* Details Column (Left on desktop) */}
            <div className={styles.splitInfoCol}>
              <div ref={ariseNumberRef} className={styles.splitNumber}>
                {ariseProject.number}
              </div>

              <div className={styles.metaTopCapsuleRow}>
                <span className={styles.yearPillFilled}>{ariseProject.year}</span>
                <span className={styles.projectCategoryPill}>
                  <span className={styles.projectCategoryDot} />
                  {ariseProject.kicker}
                </span>
                <motion.div
                  className={styles.pillsRow}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.04 } },
                  }}
                >
                  {ariseProject.tags.map((tag) => (
                    <motion.span
                      key={tag}
                      className={styles.tagPill}
                      variants={{
                        hidden: { opacity: 0, scale: 0.9, y: 10 },
                        visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.35 } },
                      }}
                      whileHover={{ y: -3, scale: 1.05 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </motion.div>
              </div>

              {/* Editorial Project Title with StaggeredWordReveal & Warm Orange Gradient */}
              <h3 className={styles.stageTitle}>
                <span className={styles.stageTitleLine1}>
                  <StaggeredWordReveal text={ariseProject.titleLine1} />
                </span>
                <span className={styles.stageTitleLine2}>
                  <StaggeredWordReveal
                    text={ariseProject.titleLine2}
                    delay={0.1}
                    gradientWords={ariseProject.gradientWords}
                    gradientTheme="orange"
                  />
                </span>
              </h3>

              {/* Subtitle with Masked Words */}
              <p className={styles.stageSubtitle}>
                <StaggeredWordReveal text={ariseProject.subtitle} delay={0.16} />
              </p>

              {/* Description Paragraph with Motion Fade */}
              <motion.p
                className={styles.stageDesc}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.65, delay: 0.2 }}
              >
                {ariseProject.description}
              </motion.p>

              <motion.div
                className={styles.stageActions}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: 0.25 }}
              >
                <motion.a
                  href={ariseProject.liveUrl}
                  className={styles.actionBtnPrimary}
                  aria-label={`Discuss ${ariseProject.name}`}
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Discuss Project</span>
                  <FiArrowUpRight />
                </motion.a>
                <motion.a
                  href={ariseProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.actionBtnOutline}
                  aria-label={`GitHub source for ${ariseProject.name}`}
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FiGithub />
                  <span>GitHub Profile</span>
                </motion.a>
              </motion.div>
            </div>
          </div>
        </article>
      </div>

      {/* ====================================================================
          CENTERED "VIEW MORE PROJECTS" PILL BUTTON
          ==================================================================== */}
      <div ref={viewMoreRef} className={styles.viewMoreContainer}>
        <motion.a
          href="https://github.com/its-pratyushpandey"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.viewMoreBtn}
          aria-label="View more projects on GitHub"
          whileHover={{ y: -3, scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>View More Projects</span>
          <FiArrowUpRight />
        </motion.a>
      </div>
    </div>
  );
}
