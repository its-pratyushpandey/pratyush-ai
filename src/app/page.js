"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  FiArrowDown,
  FiArrowUp,
  FiArrowUpRight,
  FiAtSign,
  FiAward,
  FiBookOpen,
  FiCheck,
  FiCode,
  FiCopy,
  FiDownload,
  FiExternalLink,
  FiClock,
  FiGithub,
  FiLinkedin,
  FiLayers,
  FiMapPin,
  FiMenu,
  FiMessageCircle,
  FiMoon,
  FiRefreshCw,
  FiSend,
  FiSun,
  FiTarget,
  FiX,
  FiZap,
} from "react-icons/fi";
import { SiMongodb, SiNextdotjs, SiSpringboot, SiTypescript } from "react-icons/si";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import styles from "./page.module.scss";
import Preloader from "../components/Preloader";
import CinematicHero from "../components/Landing/CinematicHero";
import ProjectsShowcase from "../components/Projects/ProjectsShowcase";
import ExperienceTimeline from "../components/Experience/ExperienceTimeline";
import CredentialsSection from "../components/Credentials/CredentialsSection";
import ContactSection from "../components/Contact";
import KineticDropHeadline from "../components/Description/KineticDropHeadline";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const reveal = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const wordContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const wordChild = {
  hidden: {
    y: "120%",
    opacity: 0,
    filter: "blur(10px)",
  },
  visible: {
    y: "0%",
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

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
      className={`${styles.staggeredWordWrapper} ${className}`}
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
          <span key={`${word}-${i}`} className={styles.wordMask}>
            <motion.span
              className={`${styles.wordInner} ${isHighlight ? styles.wordHighlight : ""} ${isGradient ? styles.wordGradient : ""}`}
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

function AnimatedCounter({ target, prefix = "", suffix = "", duration = 1.8, className = "" }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!isInView) return;
    const numericTarget = typeof target === "number" ? target : parseInt(target, 10);
    if (isNaN(numericTarget)) {
      setDisplayValue(target);
      return;
    }

    const startTime = performance.now();
    const durationMs = duration * 1000;

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.round(numericTarget * ease);
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setDisplayValue(numericTarget);
      }
    };

    requestAnimationFrame(step);
  }, [isInView, target, duration]);

  const formattedNumber =
    prefix && displayValue < 10 && displayValue >= 0
      ? `${prefix}${displayValue}`
      : displayValue;

  return (
    <span ref={ref} className={`${styles.aboutStatNumber} ${className}`}>
      {isInView ? `${formattedNumber}${suffix}` : `${prefix}0${suffix}`}
    </span>
  );
}

function TextHighlightWipe({ children, className = "" }) {
  return (
    <span className={`${styles.textHighlightWipe} ${className}`}>
      {children}
    </span>
  );
}

function Reveal({ children, className, delay = 0 }) {
  return (
    <motion.div
      className={className}
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.16 }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

const profile = {
  name: "Pratyush Kumar Pandey",
  shortName: "Pratyush Pandey",
  email: "pratyush.me.ai@gmail.com",
  github: "https://github.com/its-pratyushpandey",
  linkedin: "https://www.linkedin.com/in/pratyush-pandey1/",
  resume: "https://dev.pratyushpandey.me/presume.pdf",
  location: "Vijayawada, India",
  maps: "https://maps.app.goo.gl/dPjAwKErtBJW6kRo9",
};

const skillGroups = [
  {
    id: "domain-build",
    label: "01 / Build",
    domain: "Domain 01 // Core Architecture",
    title: "Full-Stack Development",
    accent: "#55abf5",
    text: "Engineering scalable web applications from foundational schemas to production APIs and fluid, responsive interfaces with strict fault tolerance.",
    stats: [
      { label: "Architecture", value: "Microservices" },
      { label: "Target Uptime", value: "99.9%" },
      { label: "P95 Latency", value: "<85ms" },
    ],
    items: [
      {
        name: "MERN Stack Applications",
        desc: "Interactive React & Next.js SPAs powered by Node.js/Express backends and high-availability MongoDB databases.",
        badge: "Full-Stack",
      },
      {
        name: "Spring Boot + React Solutions",
        desc: "Robust enterprise services built with Spring Boot, Spring Security, JPA/Hibernate, and responsive TypeScript frontends.",
        badge: "Enterprise",
      },
      {
        name: "RESTful API & Microservices",
        desc: "Clean API design with standardized error models, rate limiting, JWT token security, and comprehensive test suites.",
        badge: "Backend",
      },
    ],
    skills: ["React", "Next.js", "TypeScript", "Node.js", "Java", "Spring Boot", "Tailwind CSS"],
    icon: "layers",
    console: {
      type: "code",
      title: "Production REST Controller // Spring Boot & Next.js",
      snippet: `@RestController
@RequestMapping("/api/v1/deliverables")
public class DeliverableController {
  @PostMapping("/deploy")
  public ResponseEntity<Status> ship(@RequestBody Spec spec) {
    return ResponseEntity.ok(Status.DEPLOYED); // Latency: 38ms
  }
}`,
    },
  },
  {
    id: "domain-think",
    label: "02 / Think",
    domain: "Domain 02 // Applied Intelligence",
    title: "AI & Intelligent Products",
    accent: "#9b8cff",
    text: "Building production-grade AI systems that convert Large Language Models, Retrieval-Augmented Generation, and agentic autonomy into practical business value.",
    stats: [
      { label: "LLM Pipeline", value: "RAG + Agents" },
      { label: "Inference Mode", value: "Streaming SSE" },
      { label: "Reasoning", value: "Multi-Step" },
    ],
    items: [
      {
        name: "AI-Powered Product Features",
        desc: "Voice synthesis, intelligent resume parsing, ATS scoring algorithms, and conversational UI workflows.",
        badge: "LLM Apps",
      },
      {
        name: "Interactive Animations & GSAP Workflows",
        desc: "Awwwards-grade motion choreography, scroll-driven storytelling, SVG morphing, and GPU-accelerated micro-interactions.",
        badge: "Motion UI",
      },
      {
        name: "Automation & Intelligent Agents",
        desc: "Autonomous multi-agent swarms with tool-calling, self-correction loops, and structured output parsing.",
        badge: "Agents",
      },
    ],
    skills: ["Python", "Machine Learning", "LLMs", "RAG", "AI Agents", "Prompt Engineering", "GSAP"],
    icon: "zap",
    console: {
      type: "flow",
      title: "Agentic RAG Execution Pipeline",
      steps: [
        { label: "01 Input Query", detail: "Semantic user prompt" },
        { label: "02 Vector Search", detail: "Cosine similarity top-k" },
        { label: "03 Context Injection", detail: "Dynamic prompt enrich" },
        { label: "04 LLM Generation", detail: "Gemini / GPT-4o stream" },
      ],
    },
  },
  {
    id: "domain-ship",
    label: "03 / Ship",
    domain: "Domain 03 // Production Delivery",
    title: "Data, Cloud & Architecture",
    accent: "#43e8b3",
    text: "Building scalable foundations with clean APIs, thoughtful relational/NoSQL data models, containerized pipelines, and disciplined delivery.",
    stats: [
      { label: "Containers", value: "Docker / CI/CD" },
      { label: "Cloud Infra", value: "AWS & Azure" },
      { label: "Data Integrity", value: "ACID Compliant" },
    ],
    items: [
      {
        name: "Algorithm Optimization",
        desc: "Algorithmic problem-solving with advanced graph traversals, dynamic programming, and memory-efficient data structures.",
        badge: "DSA",
      },
      {
        name: "Technical Architecture Design",
        desc: "Resilient system designs with decoupled microservices, database sharding, caching tiers, and clean separation of concerns.",
        badge: "Architecture",
      },
      {
        name: "Cloud, Docker & DevOps Pipelines",
        desc: "Automated GitHub Actions CI/CD workflows, Docker containerization, AWS cloud deployments, and live health monitors.",
        badge: "DevOps",
      },
    ],
    skills: ["MongoDB", "MySQL", "REST APIs", "AWS", "Azure", "Docker", "Git", "Linux"],
    icon: "target",
    console: {
      type: "pipeline",
      title: "Continuous Delivery Pipeline",
      stages: [
        { name: "Code Lint & TypeScript Verification", status: "PASSED" },
        { name: "Unit & Integration Test Suite", status: "100%" },
        { name: "Docker Container Build & Security Scan", status: "VERIFIED" },
        { name: "Cloud Production Deploy & Health Check", status: "LIVE" },
      ],
    },
  },
];

const projects = [
  {
    number: "01",
    name: "Cogniview",
    type: "AI interview platform",
    description:
      "A voice-enabled interview platform with AI-assisted conversations, interview management, GitHub profile evaluation, and progress dashboards.",
    tags: ["Next.js", "TypeScript", "Gemini", "Firebase", "Voice AI"],
    visual: "cogniview",
    image: "/images/background.jpg",
    year: "2026",
    accent: "#80e8e0",
    liveUrl: "mailto:pratyush.me.ai@gmail.com?subject=Cogniview%20project",
  },
  {
    number: "02",
    name: "NextHire",
    type: "AI job portal",
    description:
      "A full-stack hiring experience connecting job seekers and employers with smart recommendations, resume parsing, real-time chat, and video interviews.",
    tags: ["React", "Node.js", "MongoDB", "WebSockets", "AI"],
    visual: "nexthire",
    image: "/images/background2.jpg",
    year: "2025",
    accent: "#9b8cff",
    liveUrl: "mailto:pratyush.me.ai@gmail.com?subject=NextHire%20project",
  },
  {
    number: "03",
    name: "Arise",
    type: "AI career platform",
    description:
      "A focused career workspace for building optimized resumes, writing tailored cover letters, practicing interviews, and measuring ATS readiness.",
    tags: ["Next.js", "MongoDB", "Gemini AI", "Prisma", "Clerk"],
    visual: "arise",
    image: "/images/myprofile.png",
    year: "2025",
    accent: "#ff9671",
    liveUrl: "mailto:pratyush.me.ai@gmail.com?subject=Arise%20project",
  },
];

const certificates = [
  { name: "MongoDB Associate Developer", issuer: "MongoDB", image: "/mongodb.svg", href: "/presume.pdf" },
  { name: "Aviatrix Certified Engineer (ACE)", issuer: "Aviatrix", image: "/Aviatrix.png", href: "/Aviatrix.pdf" },
  { name: "Salesforce Developer Virtual Internship", issuer: "Salesforce", image: "/salesforce.png", href: "/Salesforce.pdf" },
];

const experience = [
  {
    id: "01",
    company: "Calibo",
    role: "AI Trainee",
    period: "2026",
    location: "India",
    countryCode: "INDIA",
    type: "AI & Systems Engineering",
    tech: ["Python", "Machine Learning", "Generative AI", "LLMs", "RAG", "Azure"],
    overview:
      "Developing and testing production-grade AI solutions, enterprise LLM pipelines, and automated agent workflows to solve critical business problems with high reliability.",
    bullets: [
      "Worked on practical software and AI use cases, building solutions for real-world business problems.",
      "Collaborated with mentors and teams to design scalable systems and ship meaningful product improvements.",
      "Strengthened engineering fundamentals through APIs, data, cloud tooling, and iterative delivery.",
    ],
    achievements: [
      "Spearheaded enterprise RAG pipeline development with vector retrieval reducing latency by 40%",
      "Implemented modular tool-calling agents for automated data analysis and schema verification",
      "Integrated continuous evaluation harnesses across Azure AI cloud infrastructure",
    ],
  },
  {
    id: "02",
    company: "EtharaAI",
    role: "AI Intern",
    period: "2026",
    location: "Remote",
    countryCode: "REMOTE",
    type: "Backend & Applied AI",
    tech: ["Java", "Spring Boot", "REST APIs", "Microservices", "Redis", "Docker", "Azure"],
    overview:
      "Architected backend microservices and resilient REST APIs to power real-time AI inference engines, distributed caching layers, and high-throughput data processing.",
    bullets: [
      "Designed decoupled Java Spring Boot microservices handling concurrent telemetry and user inference sessions.",
      "Engineered low-latency Redis caching layers to optimize vector lookups and token-heavy model responses.",
      "Containerized microservices using Docker and orchestrated CI/CD pipelines to Azure cloud targets.",
    ],
    achievements: [
      "Cut API response latency from 180ms to <65ms using Redis caching and connection pooling",
      "Built standardized JWT authentication and rate-limiting middleware for multi-tenant endpoints",
      "Maintained 99.9% uptime during load tests simulating 10k+ concurrent requests",
    ],
  },
  {
    id: "03",
    company: "MERN Hackathon",
    role: "Full Stack Developer",
    period: "2025",
    location: "K L University",
    countryCode: "K L UNIVERSITY",
    type: "First Place Winner // NextHire",
    tech: ["React", "Node.js", "Express", "MongoDB", "JWT", "Redux", "WebSockets"],
    overview:
      "Built NextHire — an end-to-end intelligent recruitment platform featuring AI resume parsing, live recruiter-candidate chat, automated candidate screening, and recruiter dashboards.",
    bullets: [
      "Engineered full-stack architecture using Next.js and Node.js with secure token-based authentication.",
      "Integrated real-time bidirectional WebSocket messaging for instant applicant-recruiter conversations.",
      "Implemented intelligent ATS resume parsing and automated job matching algorithms.",
    ],
    achievements: [
      "Awarded First Prize out of 80+ collegiate engineering teams for technical excellence and UX",
      "Engineered real-time chat supporting instant presence and typing indicators with 0 dropped frames",
      "Designed responsive mobile-first UI with Framer Motion transitions and accessible components",
    ],
  },
  {
    id: "04",
    company: "FSAD Hackathon",
    role: "Full Stack Developer",
    period: "2024",
    location: "K L University",
    countryCode: "K L UNIVERSITY",
    type: "Enterprise Video Architecture",
    tech: ["Java", "Spring Boot", "MySQL", "REST API", "Hibernate", "Cloudinary"],
    overview:
      "Created an enterprise video streaming and asset management platform with segmented media transcoding, role-based access control, and high-performance relational schemas.",
    bullets: [
      "Developed high-throughput Spring Boot REST APIs for multi-part video uploads and stream playback.",
      "Designed normalized MySQL schemas with indexed foreign keys for sub-10ms query execution.",
      "Implemented fine-grained role-based security using Spring Security and stateless JWT tokens.",
    ],
    achievements: [
      "Optimized video chunk buffering and relational queries, decreasing time-to-first-frame by 35%",
      "Engineered robust transactional rollback mechanisms preventing partial video upload corruptions",
      "Collaborated in a fast-paced sprint to ship full MVP within 36 consecutive hours",
    ],
  },
  {
    id: "05",
    company: "PFSD Hackathon",
    role: "Frontend Developer",
    period: "2024",
    location: "K L University",
    countryCode: "K L UNIVERSITY",
    type: "Collaborative CodeSync",
    tech: ["Python", "Django", "WebSockets", "SQL", "JavaScript", "Ace Editor"],
    overview:
      "Engineered CodeSync — a real-time collaborative code editor with synchronized multi-cursor editing, live in-browser compiler, audio channels, and group chat.",
    bullets: [
      "Built real-time collaborative canvas syncing keystrokes across multiple users via Django Channels.",
      "Integrated multi-language compiler sandbox executing Python, C++, and Java safely.",
      "Constructed fluid, distraction-free IDE user interface with dark mode and syntax highlighting.",
    ],
    achievements: [
      "Achieved sub-50ms keystroke synchronization between distributed peers using WebSocket broadcasting",
      "Implemented conflict-free replicated data structure handling concurrent typing smoothly",
      "Recognized with Best UI/UX Award for responsive, developer-friendly interface design",
    ],
  },
];

function ProjectVisual({ type, image, name, accent }) {
  return (
    <div className={`${styles.projectVisual} ${styles[type]}`} style={{ "--project-accent": accent }} aria-label={`${name} project preview`}>
      <Image className={styles.projectImage} src={image} alt="" fill sizes="(max-width: 800px) 100vw, 65vw" />
      <div className={styles.projectImageShade} />
      <div className={styles.windowBar}><span /><span /><span /></div>
      <div className={styles.visualContent}>
        <div className={styles.visualSidebar}><i /><i /><i /><i /><i /></div>
        <div className={styles.visualMain}>
          <div className={styles.visualHeading}><b>{type === "cogniview" ? "Welcome back, Eren" : type === "nexthire" ? "Find your next role" : "Accelerate your career"}</b><em /></div>
          <div className={styles.visualCards}><span /><span /><span /></div>
          <div className={styles.visualGraph}><i /><i /><i /><i /><i /></div>
        </div>
      </div>
    </div>
  );
}

function SkillIcon({ name }) {
  const icons = { layers: FiLayers, zap: FiZap, target: FiTarget };
  const Icon = icons[name] || FiLayers;
  return <Icon aria-hidden="true" />;
}

const skillMarquee = skillGroups.flatMap((group) => group.skills);

function DomainStage({ group, index, totalDomains = 3 }) {
  const [activeItem, setActiveItem] = useState(index === 1 ? 1 : 0);

  return (
    <article
      id={group.id}
      className={styles.domainStage}
      data-index={index}
      style={{
        "--domain-accent": group.accent,
      }}
    >
      {/* Technical Blueprint Coordinate Header Rule */}
      <div className={styles.domainBlueprintHeader}>
        <span className={styles.domainCoord}>+ [DOMAIN 0{index + 1} {"//"} {group.label.toUpperCase()}]</span>
        <span className={styles.domainRule} />
        <span className={styles.domainCoordEnd}>SYS.0{index + 1} {"//"} ACTIVE +</span>
      </div>

      <div className={styles.domainStageInner}>
        {/* Left Column: Domain Specs, Metrics, Narrative & Tech Badges */}
        <div className={styles.domainColLeft}>
          <div className={styles.domainHeaderGroup}>
            <div className={styles.domainNumberWrap}>
              <motion.span
                className={styles.domainNumber}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                (0{index + 1})
              </motion.span>
              <span className={styles.domainKicker}>
                <span className={styles.domainKickerDot} />
                {group.label}
              </span>
            </div>

            <motion.h3
              className={styles.domainTitle}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, delay: 0.12 }}
            >
              {group.title}
            </motion.h3>

            <motion.p
              className={styles.domainDesc}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.16 }}
            >
              {group.text}
            </motion.p>
          </div>

          {/* Domain Architecture Specs HUD */}
          {group.stats && (
            <div className={styles.domainStatsGrid}>
              {group.stats.map((stat, sIdx) => (
                <motion.div
                  key={stat.label}
                  className={styles.domainStatCard}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: 0.15 + sIdx * 0.05, duration: 0.4 }}
                >
                  <span className={styles.statValue}>{stat.value}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </motion.div>
              ))}
            </div>
          )}

          <div className={styles.domainPillWrap}>
            <div className={styles.domainPill}>
              <span className={styles.domainPillDot} />
              <span>{group.domain || `Domain 0${index + 1}`}</span>
            </div>
          </div>

          {/* Cascading Tech Stack Badges */}
          <div className={styles.domainTagList}>
            {group.skills.map((skill, sIdx) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: 0.15 + sIdx * 0.03, duration: 0.35 }}
                whileHover={{ y: -3, scale: 1.05 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Right Column: Deliverables & Live System Console */}
        <div className={styles.domainColRight}>
          <div className={styles.deliverablesHeader}>
            <span className={styles.deliverablesTag}>Core Deliverables &amp; Pipelines</span>
            <span className={styles.deliverablesIcon} aria-label={group.title}>
              <SkillIcon name={group.icon} />
            </span>
          </div>

          {/* Interactive Deliverables List */}
          <div className={styles.deliverablesBox}>
            {group.items.map((item, itemIdx) => {
              const isActive = activeItem === itemIdx;
              const itemName = typeof item === "string" ? item : item.name;
              const itemDesc = typeof item === "string" ? "" : item.desc;
              const itemBadge = typeof item === "string" ? "Service" : item.badge;

              return (
                <div
                  key={itemName}
                  className={`${styles.deliverableItem} ${isActive ? styles.deliverableItemActive : ""}`}
                  onMouseEnter={() => setActiveItem(itemIdx)}
                  onClick={() => setActiveItem(itemIdx)}
                >
                  <div className={styles.deliverableItemHeader}>
                    <span className={styles.deliverableIndex}>0{itemIdx + 1}</span>
                    <span className={styles.deliverableName}>{itemName}</span>
                    <span className={styles.deliverableBadge}>{itemBadge}</span>
                    <span className={styles.deliverablePulseIndicator}>
                      <span className={styles.pulseRing} />
                      <span className={styles.pulseCore} />
                    </span>
                  </div>
                  {itemDesc && (
                    <motion.p
                      className={styles.deliverableDesc}
                      initial={false}
                      animate={{ opacity: isActive ? 1 : 0.7 }}
                      transition={{ duration: 0.25 }}
                    >
                      {itemDesc}
                    </motion.p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Interactive Live Architecture & Execution Console */}
          {group.console && (
            <div className={styles.domainConsole}>
              <div className={styles.consoleHeader}>
                <div className={styles.consoleDots}>
                  <span />
                  <span />
                  <span />
                </div>
                <span className={styles.consoleTitle}>{group.console.title}</span>
                <span className={styles.consoleLive}>
                  <span className={styles.consoleLiveDot} /> LIVE
                </span>
              </div>
              <div className={styles.consoleBody}>
                {group.console.type === "code" && (
                  <pre className={styles.consoleCode}>
                    <code>{group.console.snippet}</code>
                  </pre>
                )}
                {group.console.type === "flow" && (
                  <div className={styles.consoleFlow}>
                    {group.console.steps.map((step, stepIdx) => (
                      <div key={step.label} className={styles.flowStep}>
                        <span className={styles.flowStepNum}>{step.label}</span>
                        <span className={styles.flowStepText}>{step.detail}</span>
                        {stepIdx < group.console.steps.length - 1 && (
                          <span className={styles.flowArrow}>→</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                {group.console.type === "pipeline" && (
                  <div className={styles.consolePipeline}>
                    {group.console.stages.map((stage) => (
                      <div key={stage.name} className={styles.pipelineStage}>
                        <span className={styles.stageName}>{stage.name}</span>
                        <span className={styles.stageStatus}>{stage.status}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

function AboutPortrait() {
  const cardRef = useRef(null);

  const resetTilt = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--tilt-x", "0deg");
    card.style.setProperty("--tilt-y", "0deg");
    card.style.setProperty("--spot-x", "50%");
    card.style.setProperty("--spot-y", "50%");
  };

  const handleMove = (event) => {
    const card = cardRef.current;
    if (!card || (typeof window !== "undefined" && window.matchMedia("(max-width: 900px)").matches)) return;
    const bounds = card.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    card.style.setProperty("--spot-x", `${x}%`);
    card.style.setProperty("--spot-y", `${y}%`);
    card.style.setProperty("--tilt-x", `${(0.5 - y / 100) * 7}deg`);
    card.style.setProperty("--tilt-y", `${(x / 100 - 0.5) * 8}deg`);
  };

  return (
    <div className={styles.aboutPortraitContainer}>
      <div className={styles.portraitBlueprintHeader}>
        <span className={styles.portraitCoord}>+ [PORTRAIT.01 // ARCHIVE]</span>
        <span className={styles.portraitRule} />
        <span className={styles.portraitCoordEnd}>KL UNIVERSITY // 2026 +</span>
      </div>

      <motion.div
        ref={cardRef}
        className={styles.aboutPortraitCard}
        onMouseMove={handleMove}
        onMouseLeave={resetTilt}
        initial={{ opacity: 0, scale: 0.94, y: 35 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={styles.aboutPortraitGlow} aria-hidden="true" />
        <div className={styles.aboutPortraitBackdrop} aria-hidden="true" />

        <div className={styles.aboutPortraitFrame}>
          <Image
            src="/images/pratyush-portrait.jpg"
            alt="Pratyush Kumar Pandey - Software Developer & AI Builder"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 560px"
            className={styles.aboutPortraitImg}
            priority
          />
          <div className={styles.aboutPortraitOverlay} aria-hidden="true" />

          {/* Precision Architectural Corner Brackets */}
          <span className={styles.cornerBracketTL} aria-hidden="true" />
          <span className={styles.cornerBracketTR} aria-hidden="true" />
          <span className={styles.cornerBracketBL} aria-hidden="true" />
          <span className={styles.cornerBracketBR} aria-hidden="true" />

          {/* Live Status Indicator Pill */}
          <div className={styles.aboutBadgeStatus}>
            <span className={styles.statusPulse}>
              <span className={styles.statusPulseDot} />
              <span className={styles.statusPulseRing} />
            </span>
            <span>Available for Roles</span>
          </div>

          {/* Bottom Floating Info Pill Badges */}
          <div className={styles.aboutPortraitFloatingMeta}>
            <div className={styles.aboutBadgeRole}>
              <FiCode className={styles.badgeIcon} />
              <span>Full-Stack &amp; AI Builder</span>
            </div>
            <div className={styles.aboutBadgeEdu}>
              <FiAward className={styles.badgeIcon} />
              <span>KL University &bull; &apos;26</span>
            </div>
          </div>
        </div>

        {/* Technical Coordinate Meta Bar */}
        <div className={styles.aboutPortraitMetaBar}>
          <span className={styles.metaBarItem}>
            <FiMapPin className={styles.metaIcon} /> Vijayawada, India
          </span>
          <span className={styles.metaBarDot}>&bull;</span>
          <span className={styles.metaBarItem}>
            <FiCheck className={styles.metaIcon} /> System Architecture &amp; LLMs
          </span>
        </div>
      </motion.div>
    </div>
  );
}

const heroTechPills = [
  { label: "React / Next.js", icon: "⚡" },
  { label: "Java / Spring Boot", icon: "☕" },
  { label: "AI & LLM Workflows", icon: "🤖" },
  { label: "Cloud & APIs", icon: "☁️" },
];

function SectionTitle({
  watermark,
  eyebrow,
  line1,
  line2,
  gradientWords = [],
  intro,
  theme = "dark",
  title,
  className = "",
  watermarkRef,
  interactiveDropHeadline = false,
  pinTriggerRef,
}) {
  return (
    <div className={`${styles.editorialHeaderWrap} ${styles[theme] || ""} ${className}`}>
      {/* Background Ghost Watermark Title */}
      {watermark && (
        <div ref={watermarkRef} className={styles.sectionWatermark} aria-hidden="true">
          {watermark}
        </div>
      )}

      {/* Eyebrow Badge with Glowing Dot */}
      {eyebrow && (
        <motion.div
          className={styles.editorialEyebrow}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.editorialEyebrowDot} />
          <span>{eyebrow}</span>
        </motion.div>
      )}

      {/* Staggered Multi-Line Animated Headline or Kinetic Drop-Down Headline */}
      {interactiveDropHeadline ? (
        <KineticDropHeadline
          line1={line1}
          line2={line2}
          gradientWords={gradientWords}
          pinTriggerRef={pinTriggerRef}
        />
      ) : (
        <h2 className={styles.editorialHeadline}>
          {line1 && (
            <span className={styles.editorialHeadlineLine1}>
              <StaggeredWordReveal text={line1} />
            </span>
          )}
          {line2 && (
            <span className={styles.editorialHeadlineLine2}>
              <StaggeredWordReveal
                text={line2}
                delay={0.15}
                gradientWords={gradientWords}
              />
            </span>
          )}
          {!line1 && !line2 && title}
        </h2>
      )}

      {/* Subtitle / Intro paragraph */}
      {intro && (
        <motion.p
          className={styles.editorialIntro}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, delay: 0.2 }}
        >
          {intro}
        </motion.p>
      )}
    </div>
  );
}

function CursorGlow() {
  const glowRef = useRef(null);

  useEffect(() => {
    // Disable on touch devices to conserve battery & eliminate touch lag
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const el = glowRef.current;
    if (!el) return;

    let rafId = null;
    let targetX = -300;
    let targetY = -300;
    let currentX = -300;
    let currentY = -300;
    let isVisible = false;

    const updatePosition = () => {
      currentX += (targetX - currentX) * 0.35;
      currentY += (targetY - currentY) * 0.35;
      el.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      rafId = requestAnimationFrame(updatePosition);
    };

    const handlePointerMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isVisible) {
        isVisible = true;
        el.style.opacity = "1";
        rafId = requestAnimationFrame(updatePosition);
      }
    };

    const handleMouseLeave = () => {
      isVisible = false;
      el.style.opacity = "0";
      if (rafId) cancelAnimationFrame(rafId);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return <div ref={glowRef} className={styles.cursorGlow} style={{ opacity: 0 }} aria-hidden="true" />;
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDomainIndex, setActiveDomainIndex] = useState(0);

  const mainRef = useRef(null);
  const snapZoneRef = useRef(null);
  const heroSectionRef = useRef(null);
  const aboutSectionRef = useRef(null);
  const aboutWatermarkRef = useRef(null);
  const aboutBridgePillRef = useRef(null);
  const aboutBridgeLineLeftRef = useRef(null);
  const aboutBridgeLineRightRef = useRef(null);
  const skillsSectionRef = useRef(null);
  const skillsIntroWrapRef = useRef(null);
  const workSectionRef = useRef(null);
  const experienceSectionRef = useRef(null);
  const credentialsSectionRef = useRef(null);
  const contactSectionRef = useRef(null);

  const closeMenu = () => setMenuOpen(false);

  // Fast preloader finish callback
  const handleFinishLoading = () => {
    setIsLoading(false);
    document.body.classList.remove("is-loading");
    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem("portfolio_visited", "true");
      } catch (e) {}
    }
  };

  useEffect(() => {
    document.body.classList.add("is-loading");

    // Safety fallback timer to prevent infinite loading state if interrupted
    const timer = window.setTimeout(() => {
      handleFinishLoading();
      window.scrollTo(0, 0);
    }, 4500);

    return () => {
      window.clearTimeout(timer);
      document.body.classList.remove("is-loading");
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Keyboard escape listener to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  // High-performance scroll progress updater (direct DOM property via RAF, 0 re-renders)
  useEffect(() => {
    let ticking = false;
    const updateProgress = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const main = mainRef.current;
          if (main) {
            const scrollable = document.documentElement.scrollHeight - window.innerHeight;
            const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
            main.style.setProperty("--scroll-progress", `${progress}%`);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  // Throttled domain tracker using RAF to eliminate synchronous layout-thrashing
  useEffect(() => {
    if (typeof window === "undefined") return;

    const domainIds = ["domain-build", "domain-think", "domain-ship"];
    let ticking = false;

    const handleDomainScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const viewportMid = scrollY + window.innerHeight * 0.45;

          for (let idx = 0; idx < domainIds.length; idx++) {
            const el = document.getElementById(domainIds[idx]);
            if (el) {
              const rect = el.getBoundingClientRect();
              const top = rect.top + scrollY;
              const bottom = top + rect.height;
              if (viewportMid >= top && viewportMid < bottom) {
                setActiveDomainIndex(idx);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleDomainScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleDomainScroll);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const snapZone = snapZoneRef.current;
    const heroEl = heroSectionRef.current;
    const aboutEl = aboutSectionRef.current;
    const skillsEl = skillsSectionRef.current;
    const workEl = workSectionRef.current;
    const experienceEl = experienceSectionRef.current;
    const credentialsEl = credentialsSectionRef.current;
    const contactEl = contactSectionRef.current;
    if (!snapZone || !heroEl || !aboutEl || !skillsEl || !workEl || !experienceEl || !credentialsEl || !contactEl) return;

    // Centralized theme colors mapping for hardware-accelerated GSAP background transitions (100% non-pink, distinct light palette)
    const THEME_COLORS = {
      hero: "#050507",
      about: "#eef3f9",
      skills: "#ebf3f7",
      work: "#08090b",
      journey: "#eef3f8",
      credentials: "#d8ecfe",
      contact: "#ebf3f7",
    };

    const applyTheme = (themeName, animate = false) => {
      if (!snapZone) return;
      snapZone.setAttribute("data-snap-theme", themeName);
      if (themeName !== "journey") {
        snapZone.removeAttribute("data-journey-station");
      }
      const targetColor = THEME_COLORS[themeName] || "#08090b";
      snapZone.style.setProperty("--snap-canvas-bg", targetColor);
      if (animate) {
        gsap.to(snapZone, {
          backgroundColor: targetColor,
          duration: 0.75,
          ease: "power2.out",
          overwrite: "auto",
        });
      } else {
        gsap.set(snapZone, { backgroundColor: targetColor });
      }
    };

    // Synchronize theme immediately based on current scroll position
    const syncTheme = () => {
      const contactRect = contactEl.getBoundingClientRect();
      const credentialsRect = credentialsEl.getBoundingClientRect();
      const experienceRect = experienceEl.getBoundingClientRect();
      const workRect = workEl.getBoundingClientRect();
      const skillsRect = skillsEl.getBoundingClientRect();
      const aboutRect = aboutEl.getBoundingClientRect();
      const triggerPoint = window.innerHeight * 0.55;

      if (contactRect.top <= triggerPoint) {
        applyTheme("contact", false);
      } else if (credentialsRect.top <= triggerPoint) {
        applyTheme("credentials", false);
      } else if (experienceRect.top <= triggerPoint) {
        applyTheme("journey", false);
      } else if (workRect.top <= triggerPoint) {
        applyTheme("work", false);
      } else if (skillsRect.top <= triggerPoint) {
        applyTheme("skills", false);
      } else if (aboutRect.top <= triggerPoint) {
        applyTheme("about", false);
      } else {
        applyTheme("hero", false);
      }
    };

    const ctx = gsap.context(() => {
      syncTheme();

      // 0 -> 1. Hero (Dark #050507) -> About (Light #eef3f9)
      ScrollTrigger.create({
        trigger: aboutEl,
        start: "top 85%",
        end: "top 25%",
        scrub: 0.6,
        onUpdate: (self) => {
          if (self.isActive) {
            const col = gsap.utils.interpolate(THEME_COLORS.hero, THEME_COLORS.about, self.progress);
            snapZone.style.backgroundColor = col;
            snapZone.style.setProperty("--snap-canvas-bg", col);
            if (self.progress >= 0.45 && snapZone.getAttribute("data-snap-theme") !== "about") {
              snapZone.setAttribute("data-snap-theme", "about");
            } else if (self.progress < 0.45 && snapZone.getAttribute("data-snap-theme") !== "hero") {
              snapZone.setAttribute("data-snap-theme", "hero");
            }
          }
        },
        onEnter: () => applyTheme("about", false),
        onEnterBack: () => applyTheme("about", false),
        onLeaveBack: () => applyTheme("hero", false),
      });

      // Subtle parallax on About section ghost watermark
      if (aboutWatermarkRef.current) {
        gsap.to(aboutWatermarkRef.current, {
          yPercent: 24,
          ease: "none",
          scrollTrigger: {
            trigger: aboutEl,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        });
      }

      // Architectural Transition Bridge expansion 00 -> 01
      if (aboutBridgePillRef.current && aboutBridgeLineLeftRef.current && aboutBridgeLineRightRef.current) {
        const aboutBridgeTl = gsap.timeline({
          scrollTrigger: {
            trigger: aboutEl,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        aboutBridgeTl
          .fromTo(
            aboutBridgePillRef.current,
            { opacity: 0, scale: 0.88 },
            { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
          )
          .fromTo(
            [aboutBridgeLineLeftRef.current, aboutBridgeLineRightRef.current],
            { scaleX: 0 },
            { scaleX: 1, duration: 0.65, ease: "power3.out", stagger: 0.08 },
            "-=0.25"
          );
      }

      // 1 -> 2. About (#eef3f9) -> Skills (#ebf3f7)
      ScrollTrigger.create({
        trigger: skillsEl,
        start: "top 80%",
        end: "top 30%",
        scrub: 0.6,
        onUpdate: (self) => {
          if (self.isActive) {
            const col = gsap.utils.interpolate(THEME_COLORS.about, THEME_COLORS.skills, self.progress);
            snapZone.style.backgroundColor = col;
            snapZone.style.setProperty("--snap-canvas-bg", col);
            if (self.progress >= 0.45 && snapZone.getAttribute("data-snap-theme") !== "skills") {
              snapZone.setAttribute("data-snap-theme", "skills");
            } else if (self.progress < 0.45 && snapZone.getAttribute("data-snap-theme") !== "about") {
              snapZone.setAttribute("data-snap-theme", "about");
            }
          }
        },
        onEnter: () => applyTheme("skills", false),
        onEnterBack: () => applyTheme("skills", false),
        onLeaveBack: () => applyTheme("about", false),
      });

      // 2 -> 3. Skills (#ebf3f7) -> Work (Dark #08090b)
      ScrollTrigger.create({
        trigger: workEl,
        start: "top 80%",
        end: "top 30%",
        scrub: 0.6,
        onUpdate: (self) => {
          if (self.isActive) {
            const col = gsap.utils.interpolate(THEME_COLORS.skills, THEME_COLORS.work, self.progress);
            snapZone.style.backgroundColor = col;
            snapZone.style.setProperty("--snap-canvas-bg", col);
            if (self.progress >= 0.45 && snapZone.getAttribute("data-snap-theme") !== "work") {
              snapZone.setAttribute("data-snap-theme", "work");
            } else if (self.progress < 0.45 && snapZone.getAttribute("data-snap-theme") !== "skills") {
              snapZone.setAttribute("data-snap-theme", "skills");
            }
          }
        },
        onEnter: () => applyTheme("work", false),
        onEnterBack: () => applyTheme("work", false),
        onLeaveBack: () => applyTheme("skills", false),
      });

      // 3 -> 4. Work (Dark #08090b) -> My Journey (#eef3f8)
      ScrollTrigger.create({
        trigger: experienceEl,
        start: "top 80%",
        end: "top 30%",
        scrub: 0.6,
        onUpdate: (self) => {
          if (self.isActive) {
            const col = gsap.utils.interpolate(THEME_COLORS.work, THEME_COLORS.journey, self.progress);
            snapZone.style.backgroundColor = col;
            snapZone.style.setProperty("--snap-canvas-bg", col);
            if (self.progress >= 0.45 && snapZone.getAttribute("data-snap-theme") !== "journey") {
              snapZone.setAttribute("data-snap-theme", "journey");
            } else if (self.progress < 0.45 && snapZone.getAttribute("data-snap-theme") !== "work") {
              snapZone.setAttribute("data-snap-theme", "work");
            }
          }
        },
        onEnter: () => {
          snapZone.setAttribute("data-snap-theme", "journey");
          snapZone.setAttribute("data-journey-station", "0");
          snapZone.style.backgroundColor = THEME_COLORS.journey;
          snapZone.style.setProperty("--snap-canvas-bg", THEME_COLORS.journey);
        },
        onEnterBack: () => {
          snapZone.setAttribute("data-snap-theme", "journey");
          snapZone.setAttribute("data-journey-station", "0");
          snapZone.style.backgroundColor = THEME_COLORS.journey;
          snapZone.style.setProperty("--snap-canvas-bg", THEME_COLORS.journey);
        },
        onLeaveBack: () => applyTheme("work", false),
      });

      // 4 -> 5. My Journey Outro (#eff2f7) -> Credentials (#d8ecfe)
      ScrollTrigger.create({
        trigger: credentialsEl,
        start: "top 80%",
        end: "top 30%",
        scrub: 0.6,
        onUpdate: (self) => {
          if (self.isActive) {
            const col = gsap.utils.interpolate("#eff2f7", THEME_COLORS.credentials, self.progress);
            snapZone.style.backgroundColor = col;
            snapZone.style.setProperty("--snap-canvas-bg", col);
          }
        },
        onEnter: () => {
          applyTheme("credentials", false);
        },
        onEnterBack: () => {
          applyTheme("credentials", false);
        },
        onLeaveBack: () => {
          snapZone.setAttribute("data-snap-theme", "journey");
          snapZone.setAttribute("data-journey-station", "6");
          snapZone.style.backgroundColor = "#eff2f7";
          snapZone.style.setProperty("--snap-canvas-bg", "#eff2f7");
        },
      });

      // 5 -> 6. Credentials (#d8ecfe) -> Get In Touch (#ebf3f7, matching 02 / WHAT I DO)
      ScrollTrigger.create({
        trigger: contactEl,
        start: "top 80%",
        end: "top 30%",
        scrub: 0.6,
        onUpdate: (self) => {
          if (self.isActive) {
            const col = gsap.utils.interpolate(THEME_COLORS.credentials, THEME_COLORS.contact, self.progress);
            snapZone.style.backgroundColor = col;
            snapZone.style.setProperty("--snap-canvas-bg", col);
          }
        },
        onEnter: () => {
          applyTheme("contact", false);
        },
        onEnterBack: () => {
          applyTheme("contact", false);
        },
        onLeaveBack: () => {
          applyTheme("credentials", false);
        },
      });
    }, snapZoneRef);

    return () => {
      ScrollTrigger.removeEventListener("refresh", syncTheme);
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    if (!isLoading && typeof window !== "undefined") {
      const t = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
      return () => clearTimeout(t);
    }
  }, [isLoading]);
  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onFinish={handleFinishLoading} />}
      </AnimatePresence>
    <main
      ref={mainRef}
      className={`${styles.site} ${isLoading ? styles.siteLoading : ""}`}
      style={{ "--scroll-progress": "0%" }}
    >
      <CursorGlow />
      <div className={styles.scrollProgress} aria-hidden="true" />

      {/* Header and Mobile Navigation Drawer */}
      <header className={`${styles.header} ${styles.heroHeader}`}>
        <a href="#home" className={styles.logo} onClick={closeMenu}>
          <span>PK</span> {profile.shortName}
        </a>
        <div className={styles.headerCenterTag} aria-hidden="true">
          <span>CO-</span>
        </div>
        <nav
          className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}
          aria-label="Main navigation"
        >
          {["About", "Skills", "Work", "Experience", "Credentials", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={closeMenu}
              className={styles.navLinkItem}
            >
              {item}
            </a>
          ))}
          <a
            className={styles.navResume}
            href={profile.resume}
            target="_blank"
            rel="noreferrer"
            onClick={closeMenu}
          >
            Resume <FiArrowUpRight />
          </a>
          <a
            className={styles.headerTalkBtn}
            href={`mailto:${profile.email}`}
            onClick={closeMenu}
          >
            Let&apos;s talk
          </a>
        </nav>
        <button
          className={`${styles.menuButton} ${menuOpen ? styles.menuButtonActive : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </header>

      {/* Mobile Drawer Backdrop */}
      {menuOpen && (
        <div
          className={styles.mobileBackdropOverlay}
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* ==========================================================================
          GSAP ScrollTrigger Instant Section-Triggered Color Snap
          Seamless, instant switch across:
          00 / HERO (#050507 - Cinematic Editorial Entrance) ->
          01 / ABOUT ME (#eef3f9 - Cool Ice Blueprint Canvas) ->
          02 / WHAT I DO (#ebf3f7 - Cool Slate-Cyan Blueprint) ->
          03 / SELECTED WORK (#08090b - Deep Midnight Dark) ->
          04 / MY JOURNEY (#eef3f8 - Warm Editorial Paper) ->
          05 / CREDENTIALS (#d8ecfe - Cool Azure Canvas) ->
          06 / GET IN TOUCH (#ebf3f7 - Cool Slate-Cyan Blueprint)
          using onEnter, onEnterBack, and onLeaveBack callbacks with zero scrub, fade, or wipe.
          ========================================================================== */}
      <div ref={snapZoneRef} className={styles.colorSnapZone} data-snap-theme="hero">
        <CinematicHero
          profile={profile}
          isLoading={isLoading}
          heroSectionRef={heroSectionRef}
        />

        <motion.section
          id="about"
          ref={aboutSectionRef}
          className={`${styles.section} ${styles.about}`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={reveal}
        >
          {/* Architectural Transition Bridge 00 -> 01 */}
          <div className={`${styles.sectionTransitionBridge} ${styles.bridgeHeroAbout}`}>
            <div className={styles.bridgeGlow} aria-hidden="true" />
            <div className={styles.bridgeLineWrap}>
              <span ref={aboutBridgeLineLeftRef} className={styles.bridgeLineLeft} />
              <div ref={aboutBridgePillRef} className={styles.bridgePill}>
                <span className={styles.bridgeDot} />
                <span>00 // CORE ARCHITECTURE → 01 // ABOUT ME</span>
              </div>
              <span ref={aboutBridgeLineRightRef} className={styles.bridgeLineRight} />
            </div>
          </div>

          <SectionTitle
            watermark="ABOUT"
            watermarkRef={aboutWatermarkRef}
            eyebrow="01 / ABOUT ME"
            line1="Engineering with intent."
            line2="Driven by curiosity."
            gradientWords={["Driven", "by", "curiosity."]}
            intro="Bridging the gap between beautiful user interfaces and high-scale resilient backends."
            theme="light"
          />

        <div className={styles.aboutGrid}>
          <AboutPortrait />

          <motion.div
            className={styles.aboutContent}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={reveal}
          >
            <div className={styles.aboutKicker}>
              <span className={styles.aboutKickerDot} />
              <span>ENGINEERING PROFILE &amp; PHILOSOPHY</span>
            </div>

            <p className={styles.aboutLead}>
              Hello! I&apos;m <strong>Pratyush Kumar Pandey</strong>, a final-year B.Tech student in Computer Science &amp; Engineering at KL University, India.
            </p>

            <p className={styles.aboutStory}>
              I specialize in designing and delivering production-ready full-stack systems and intuitive AI products. My technical foundation spans <strong>Java, Spring Boot, Node.js, React, Next.js, and TypeScript</strong>, enriched with hands-on experience in <strong>LLMs, RAG, vector databases, and cloud infrastructures</strong>.
            </p>

            <p className={styles.aboutStory}>
              Whether architecting robust REST APIs, optimizing relational and NoSQL databases, or engineering agentic AI workflows, I take pride in writing clean, scalable code that delivers measurable real-world impact.
            </p>

            <div className={styles.aboutStatsGrid}>
              <motion.div
                className={styles.aboutStatCard}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <AnimatedCounter target={4} prefix="0" suffix="+" duration={1.8} />
                <span className={styles.aboutStatLabel}>Years of coding craft &amp; architecture</span>
              </motion.div>

              <motion.div
                className={styles.aboutStatCard}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <AnimatedCounter target={12} suffix="+" duration={1.8} />
                <span className={styles.aboutStatLabel}>Full-stack &amp; AI projects built</span>
              </motion.div>

              <motion.div
                className={styles.aboutStatCard}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <AnimatedCounter target={3} prefix="0" suffix="+" duration={1.8} />
                <span className={styles.aboutStatLabel}>Industry credentials &amp; internships</span>
              </motion.div>

              <motion.div
                className={styles.aboutStatCard}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <AnimatedCounter target={100} suffix="%" duration={2.0} />
                <span className={styles.aboutStatLabel}>Dedication to performance &amp; UX</span>
              </motion.div>
            </div>

            <div className={styles.aboutChipsRow}>
              <span className={styles.aboutChip}>🏏 Cricket Enthusiast</span>
              <span className={styles.aboutChip}>🏃 Marathon Runner</span>
              <span className={styles.aboutChip}>🎧 Deep Focus Music</span>
              <span className={styles.aboutChip}>⚡ Lifelong Learner</span>
            </div>

            <div className={styles.aboutActions}>
              <motion.a
                href={profile.resume}
                target="_blank"
                rel="noreferrer"
                className={styles.aboutResumeButton}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <FiDownload /> Download résumé
              </motion.a>

              <motion.a
                href="#experience"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
                }}
                className={styles.aboutJourneyButton}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Explore journey <FiArrowDown />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <section id="skills" ref={skillsSectionRef} className={`${styles.section} ${styles.skills}`}>
        <div className={styles.skillsAura} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <div ref={skillsIntroWrapRef} className={styles.skillsIntroWrap}>
          <div className={styles.skillsIntro}>
            <SectionTitle
              watermark="CAPABILITIES"
              eyebrow="02 / WHAT I DO"
              line1="Architecting scalable systems,"
              line2="crafting intelligent products."
              gradientWords={["crafting", "intelligent", "products."]}
              intro="h"
              theme="light"
              interactiveDropHeadline={true}
              pinTriggerRef={skillsIntroWrapRef}
            />

            <div className={styles.skillsQuickTags}>
              {["MERN Stack", "Spring Boot", "React", "CI/CD", "UI/UX", "Web Development"].map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.skillsMarquee} aria-hidden="true">
          <div className={styles.skillsMarqueeTrack}>
            {[...skillMarquee, ...skillMarquee].map((skill, index) => (
              <span key={`${skill}-${index}`}>{skill}</span>
            ))}
          </div>
        </div>

        {/* Architectural Domain Navigation HUD */}
        <div className={styles.skillsProgressTrack} aria-label="Capability domains navigation">
          {skillGroups.map((group, idx) => {
            const isActive = activeDomainIndex === idx;
            return (
              <button
                key={group.id}
                type="button"
                className={`${styles.progressStep} ${isActive ? styles.progressStepActive : ""}`}
                onClick={() => {
                  setActiveDomainIndex(idx);
                  const el = document.getElementById(group.id);
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
              >
                <span className={styles.stepNum}>0{idx + 1}</span>
                <span className={styles.stepLabel}>{group.label.split("/")[1]?.trim() || group.label}</span>
                {idx < skillGroups.length - 1 && (
                  <span className={styles.progressLine} aria-hidden="true">
                    <span className={`${styles.progressLineFill} ${isActive ? styles.progressLineFillActive : ""}`} />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Expansive Full-Screen Domain Stages across Main Background Screen */}
        <div className={styles.skillsDomainContainer}>
          {skillGroups.map((group, index) => (
            <DomainStage
              group={group}
              index={index}
              totalDomains={skillGroups.length}
              key={group.label}
            />
          ))}
        </div>
      </section>

      <section id="work" ref={workSectionRef} className={`${styles.section} ${styles.work}`}>
        <ProjectsShowcase />
      </section>

      <section id="experience" ref={experienceSectionRef} className={`${styles.section} ${styles.experience}`}>
        {/* Ambient background glows */}
        <div className={styles.experienceAura} aria-hidden="true">
          <span className={styles.auraBlob1} />
          <span className={styles.auraBlob2} />
        </div>

        {/* Award-level Horizontal Experience Timeline */}
        <ExperienceTimeline experience={experience} />
      </section>

        <section id="credentials" ref={credentialsSectionRef} className={`${styles.section} ${styles.credentials}`}>
          {/* Ambient background glows matching 04 / MY JOURNEY */}
          <div className={styles.experienceAura} aria-hidden="true">
            <span className={styles.auraBlob1} />
            <span className={styles.auraBlob2} />
          </div>

          {/* Architectural Transition Bridge 04 -> 05 */}
          <div className={styles.sectionTransitionBridge}>
            <div className={styles.bridgeGlow} aria-hidden="true" />
            <div className={styles.bridgeLineWrap}>
              <span className={styles.bridgeLineLeft} />
              <div className={styles.bridgePill}>
                <span className={styles.bridgeDot} />
                <span>04 // JOURNEY ARCHITECTURE → 05 // CREDENTIALS</span>
              </div>
              <span className={styles.bridgeLineRight} />
            </div>
          </div>

          <SectionTitle
            watermark="CREDENTIALS"
            eyebrow="05 / CREDENTIALS"
            line1="Always learning,"
            line2="always leveling."
            gradientWords={["always", "leveling"]}
            intro="Industry-recognized certifications and verified credentials."
            theme="light"
          />

          <CredentialsSection />
        </section>

        <ContactSection ref={contactSectionRef} profile={profile} />
      </div>
    </main>
    </>
  );
}

