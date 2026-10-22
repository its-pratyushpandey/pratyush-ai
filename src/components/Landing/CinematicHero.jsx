'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import {
  FiActivity,
  FiArrowDown,
  FiArrowUpRight,
  FiCheckCircle,
  FiCode,
  FiCompass,
  FiCpu,
  FiDatabase,
  FiDownload,
  FiExternalLink,
  FiEye,
  FiFastForward,
  FiGithub,
  FiHardDrive,
  FiLayers,
  FiLinkedin,
  FiMaximize2,
  FiPlay,
  FiRadio,
  FiRefreshCw,
  FiSend,
  FiServer,
  FiShield,
  FiTerminal,
  FiTrendingUp,
  FiZap,
} from 'react-icons/fi';
import { SiNextdotjs, SiReact, SiSpringboot, SiTypescript } from 'react-icons/si';
import Magnetic from '../../common/Magnetic';
import styles from './CinematicHero.module.scss';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ROLES = [
  'FULL-STACK ARCHITECT',
  'AI SYSTEMS & RAG ENGINEER',
  'SPRING BOOT SPECIALIST',
  'AUTONOMOUS AGENT BUILDER',
  'DISTRIBUTED APIS ENGINEER',
];

const CODE_SNIPPETS = {
  spring: {
    filename: 'DeliverableController.java',
    lang: 'java',
    desc: 'High-Throughput Spring Boot 3 REST Gateway',
    code: `@RestController
@RequestMapping("/api/v1/systems")
public class DeliverableController {

  @PostMapping("/deploy")
  public ResponseEntity<ShipmentStatus> release(
      @AuthenticationPrincipal User user,
      @Valid @RequestBody PipelineSpec spec
  ) {
    Metrics.recordLatency("p95", 38 /* ms */);
    return ResponseEntity.ok(ShipmentStatus.DEPLOYED);
  }
}`,
  },
  ai: {
    filename: 'AgenticRAGPipeline.ts',
    lang: 'typescript',
    desc: 'Multi-Agent Semantic Vector Retrieval Swarm',
    code: `import { GeminiPro, VectorStore } from '@enterprise/ai';

export async function executeAgentWorkflow(query: string) {
  const embedding = await VectorStore.embed(query);
  const context = await VectorStore.search(embedding, { topK: 5 });
  
  const swarm = new AgentSwarm({
    tools: [schemaValidator, restExecutor, testAuditor],
    inference: 'stream-sse'
  });
  
  return swarm.streamResponse(query, context); // Latency: <38ms
}`,
  },
  cluster: {
    filename: 'ClusterTopology.yml',
    lang: 'yaml',
    desc: 'Docker & Kubernetes Multi-Tier Orchestration',
    code: `version: '3.8'
services:
  gateway:
    image: pratyush/api-gateway:latest
    ports: ["8080:8080"]
    deploy:
      replicas: 4
      resources:
        limits: { cpus: '2.0', memory: '4G' }
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/actuator/health"]
      interval: 10s`,
  },
};

const ARCHITECTURE_NODES = [
  {
    id: 'client',
    title: 'Client Tier',
    tech: 'Next.js 14 / React 18',
    meta: 'SSR + Streaming SSE • Port :3000',
    latency: '12ms',
    throughput: '3.4k req/s',
    status: 'OPTIMAL',
    icon: SiNextdotjs,
    color: '#55abf5',
  },
  {
    id: 'gateway',
    title: 'API Gateway',
    tech: 'Spring Boot 3.3 / Java 21',
    meta: 'JWT Auth & Circuit Breaker • Port :8080',
    latency: '24ms',
    throughput: '8.2k req/s',
    status: 'ACTIVE',
    icon: SiSpringboot,
    color: '#43e8b3',
  },
  {
    id: 'ai',
    title: 'AI Swarm',
    tech: 'Gemini 1.5 & Agentic RAG',
    meta: 'Tool-Calling Multi-Agent Swarm',
    latency: '38ms',
    throughput: '1.1k tokens/s',
    status: 'STREAMING',
    icon: FiCpu,
    color: '#9b8cff',
  },
  {
    id: 'data',
    title: 'Data Tier',
    tech: 'MongoDB Atlas & Redis 7',
    meta: 'ACID Sharded + Cache Layer • Port :6379',
    latency: '3.8ms',
    throughput: '14.5k ops/s',
    status: 'SYNCHRONIZED',
    icon: FiDatabase,
    color: '#ff9671',
  },
];

const METRICS_HUD = [
  { value: '04+', label: 'Years Dev Craft', sub: 'Java, TypeScript, Python', icon: FiCode },
  { value: '12+', label: 'Production Apps', sub: 'Full-Stack & Applied AI', icon: FiLayers },
  { value: '<38ms', label: 'P95 API Latency', sub: 'Spring & Next.js Endpoints', icon: FiZap },
  { value: '99.9%', label: 'Uptime Standard', sub: 'Fault-Tolerant Architectures', icon: FiShield },
];

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_#@%&*+=~/';

const entranceVariants = {
  hidden: { opacity: 0, y: 32, filter: 'blur(8px)' },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.85,
      delay: 0.15 + i * 0.1,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function CinematicHero({
  profile = {},
  isLoading = false,
  heroSectionRef,
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const gyroCanvasRef = useRef(null);
  const cardRef = useRef(null);
  const track1Ref = useRef(null);
  const track2Ref = useRef(null);
  const atmosphereRef = useRef(null);
  const stageGridRef = useRef(null);
  const ribbonContainerRef = useRef(null);
  const footerBarRef = useRef(null);
  const isInViewportRef = useRef(true);

  // Dynamic UI States
  const [roleText, setRoleText] = useState(ROLES[0]);
  const [roleIndex, setRoleIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('topology'); // 'topology' | 'code' | 'core' | 'metrics'
  const [activeCodeKey, setActiveCodeKey] = useState('spring');
  const [activeNode, setActiveNode] = useState(ARCHITECTURE_NODES[0]);
  const [liveClock, setLiveClock] = useState('');
  const [packetBurst, setPacketBurst] = useState(false);
  const [benchmarkStatus, setBenchmarkStatus] = useState('idle'); // 'idle' | 'running' | 'success'
  const [terminalLogs, setTerminalLogs] = useState([]);
  const [mouseNorm, setMouseNorm] = useState({ x: 0, y: 0 });

  // Bind external hero ref
  const setContainerRef = (el) => {
    containerRef.current = el;
    if (heroSectionRef) {
      if (typeof heroSectionRef === 'function') {
        heroSectionRef(el);
      } else {
        heroSectionRef.current = el;
      }
    }
  };

  // Viewport intersection observer to pause animations when Hero is off-screen
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewportRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // 1. Live Indian Standard Time (IST) Ticker
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        });
        setLiveClock(`${timeStr} IST`);
      } catch (e) {
        setLiveClock('00:00:00 IST');
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // 2. High-Tech Matrix Scramble Effect for Roles
  const scrambleTo = useCallback((targetText) => {
    let iteration = 0;
    const maxIterations = targetText.length * 2.5;

    const timer = setInterval(() => {
      setRoleText(() =>
        targetText
          .split('')
          .map((letter, index) => {
            if (index < iteration / 2.5) {
              return targetText[index];
            }
            if (letter === ' ' || letter === '/' || letter === '&') return letter;
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          })
          .join('')
      );

      iteration += 1;
      if (iteration >= maxIterations) {
        clearInterval(timer);
        setRoleText(targetText);
      }
    }, 28);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => {
        const nextIdx = (prev + 1) % ROLES.length;
        scrambleTo(ROLES[nextIdx]);
        return nextIdx;
      });
    }, 4200);
    return () => clearInterval(interval);
  }, [scrambleTo]);

  // 3. 3D Card Interactive Perspective Tilt
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card || (typeof window !== 'undefined' && window.matchMedia('(max-width: 992px)').matches)) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setMouseNorm({ x: (x - 0.5) * 2, y: (y - 0.5) * 2 });

    const tiltX = (0.5 - y) * 14;
    const tiltY = (x - 0.5) * 16;

    card.style.setProperty('--card-tilt-x', `${tiltX}deg`);
    card.style.setProperty('--card-tilt-y', `${tiltY}deg`);
    card.style.setProperty('--card-spot-x', `${x * 100}%`);
    card.style.setProperty('--card-spot-y', `${y * 100}%`);
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty('--card-tilt-x', '0deg');
    card.style.setProperty('--card-tilt-y', '0deg');
    card.style.setProperty('--card-spot-x', '50%');
    card.style.setProperty('--card-spot-y', '50%');
    setMouseNorm({ x: 0, y: 0 });
  };

  // 4. Interactive Code Execution Simulator
  const runCodeBenchmark = () => {
    if (benchmarkStatus === 'running') return;
    setBenchmarkStatus('running');
    setTerminalLogs([
      '⚡ [SYS.INIT] Initializing JVM 21 and Node.js v20 runtime...',
      '🚀 [COMPILE] Binding REST endpoints & security filter chains...',
      '📡 [DISPATCH] Broadcasting 1,000 synthetic HTTP/2 load packets...',
    ]);

    setTimeout(() => {
      setTerminalLogs((prev) => [
        ...prev,
        '⚡ [CACHE] Redis hit ratio: 99.4% (Latency: 2.1ms)',
        '🤖 [AI_RAG] Vector similarity score: 0.982 (Gemini 1.5 Pro)',
        '✔ [RESULT] Status: 200 OK | P95 Latency: 38ms | 0 packet drop [OPTIMAL]',
      ]);
      setBenchmarkStatus('success');

      setTimeout(() => {
        setBenchmarkStatus('idle');
      }, 5000);
    }, 1200);
  };

  // 5. Trigger Packet Burst in Topology
  const triggerPacketBurst = () => {
    setPacketBurst(true);
    setTimeout(() => setPacketBurst(false), 2400);
  };

  // 6. Interactive Background Particle Mesh (Canvas)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = null;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const isMobile = window.innerWidth < 768;
    const isCoarse = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
    const particleCount = isMobile || isCoarse ? 18 : 65;
    const particles = [];

    let mouseX = -1000;
    let mouseY = -1000;

    const onPointerMove = (e) => {
      if (isCoarse) return; // Skip mouse attraction on touch devices
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    if (!isCoarse) {
      window.addEventListener('pointermove', onPointerMove, { passive: true });
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.6 + 0.8,
        color:
          i % 3 === 0
            ? 'rgba(99, 102, 241, '
            : i % 3 === 1
            ? 'rgba(67, 232, 179, '
            : 'rgba(85, 171, 245, ',
        baseAlpha: Math.random() * 0.35 + 0.2,
      });
    }

    const render = () => {
      if (!isInViewportRef.current) {
        animId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Mouse gravity / magnetic attraction (desktop only)
        if (!isCoarse) {
          const dx = mouseX - p.x;
          const dy = mouseY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 190 && dist > 0) {
            const force = (190 - dist) / 190;
            p.x += (dx / dist) * force * 0.9;
            p.y += (dy / dist) * force * 0.9;
          }
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.baseAlpha})`;
        ctx.fill();

        // Connect nearby particles on desktop only to eliminate O(N^2) overhead on mobile
        if (!isCoarse && !isMobile) {
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const distBetween = Math.hypot(p.x - p2.x, p.y - p2.y);
            if (distBetween < 115) {
              const lineAlpha = (1 - distBetween / 115) * 0.15;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(165, 180, 252, ${lineAlpha})`;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, []);

  // 7. 3D Kinetic Gyroscope / Orbital Core Canvas (Tab 3)
  useEffect(() => {
    if (activeTab !== 'core') return;
    const canvas = gyroCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = null;
    let angle = 0;

    const renderGyro = () => {
      if (!isInViewportRef.current) {
        animId = requestAnimationFrame(renderGyro);
        return;
      }

      const w = (canvas.width = canvas.offsetWidth || 400);
      const h = (canvas.height = canvas.offsetHeight || 380);
      const cx = w / 2;
      const cy = h / 2;

      ctx.clearRect(0, 0, w, h);
      angle += 0.018;

      const rings = [
        { radius: 125, rotSpeed: angle * 1.0, color: '#55abf5', tilt: 0.55 },
        { radius: 95, rotSpeed: -angle * 1.35, color: '#9b8cff', tilt: -0.45 },
        { radius: 65, rotSpeed: angle * 1.8, color: '#43e8b3', tilt: 0.8 },
      ];

      rings.forEach((ring) => {
        ctx.save();
        ctx.translate(cx, cy);

        ctx.beginPath();
        const steps = 60;
        for (let i = 0; i <= steps; i++) {
          const theta = (i / steps) * Math.PI * 2;
          const x = ring.radius * Math.cos(theta + ring.rotSpeed);
          const y = ring.radius * Math.sin(theta + ring.rotSpeed) * Math.cos(ring.tilt);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = ring.color;
        ctx.lineWidth = 1.5;
        ctx.shadowColor = ring.color;
        ctx.shadowBlur = 14;
        ctx.stroke();

        // Data node traveling on ring
        const nodeTheta = ring.rotSpeed * 2.2;
        const nx = ring.radius * Math.cos(nodeTheta);
        const ny = ring.radius * Math.sin(nodeTheta) * Math.cos(ring.tilt);
        ctx.beginPath();
        ctx.arc(nx, ny, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();

        ctx.restore();
      });

      // Core pulsing center
      ctx.beginPath();
      ctx.arc(cx, cy, 14 + Math.sin(angle * 4) * 3, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#6366f1';
      ctx.shadowBlur = 28;
      ctx.fill();

      animId = requestAnimationFrame(renderGyro);
    };

    renderGyro();

    return () => cancelAnimationFrame(animId);
  }, [activeTab]);

  // 8. Kinetic Opposing Typography Ribbons with Scroll Momentum
  useEffect(() => {
    let animId = null;
    let offset1 = 0;
    let offset2 = 0;
    let lastScroll = window.scrollY;

    const loop = () => {
      if (!isInViewportRef.current) {
        animId = requestAnimationFrame(loop);
        return;
      }

      const currentScroll = window.scrollY;
      const scrollDiff = currentScroll - lastScroll;
      lastScroll = currentScroll;

      offset1 -= 0.65 + scrollDiff * 0.15;
      offset2 += 0.85 + scrollDiff * 0.2;

      if (track1Ref.current) {
        track1Ref.current.style.transform = `translateX(${offset1 % 2000}px)`;
      }
      if (track2Ref.current) {
        track2Ref.current.style.transform = `translateX(${offset2 % 2000}px)`;
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  // 9. Coordinated Cinematic Parallax & Fade Exit into Section 01 / ABOUT ME
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const heroEl = containerRef.current;
    if (!heroEl) return;

    const prefersReducedMotion =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const exitTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroEl,
          start: 'top top',
          end: 'bottom 20%',
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      // Atmospheric canvas & glows smoothly dissolve into the light canvas
      if (atmosphereRef.current) {
        exitTl.to(atmosphereRef.current, { opacity: 0.12, ease: 'none' }, 0);
      }

      // Parallax upward drift with subtle scale & depth for the stage content
      if (stageGridRef.current) {
        exitTl.to(
          stageGridRef.current,
          { y: 55, opacity: 0.22, scale: 0.985, ease: 'none' },
          0
        );
      }

      // Kinetic typography ribbons parallax separation
      if (ribbonContainerRef.current) {
        exitTl.to(
          ribbonContainerRef.current,
          { y: 35, opacity: 0.15, ease: 'none' },
          0
        );
      }

      // Bottom footer telemetry bar fades smoothly early
      if (footerBarRef.current) {
        exitTl.to(footerBarRef.current, { y: 20, opacity: 0, ease: 'none' }, 0);
      }
    }, heroEl);

    return () => ctx.revert();
  }, []);

  const animationState = isLoading ? 'hidden' : 'visible';

  return (
    <section
      id="home"
      ref={setContainerRef}
      className={styles.cinematicHero}
      aria-label="Developer Portfolio Hero — Pratyush Kumar Pandey"
    >
      {/* 1. Atmospheric Canvas, Ambient Glow & Noise */}
      <div ref={atmosphereRef} className={styles.heroAtmosphere} aria-hidden="true">
        <canvas ref={canvasRef} className={styles.particleCanvas} />
        <div className={styles.radialAuraIndigo} />
        <div className={styles.radialAuraCyan} />
        <div className={styles.filmGrainOverlay} />
        <div className={styles.viewportVignette} />
      </div>

      {/* 2. Precision Blueprint Coordinate Header Line */}
      <motion.div
        className={styles.blueprintCoordBar}
        aria-hidden="true"
        variants={entranceVariants}
        initial="hidden"
        animate={animationState}
        custom={0}
      >
        
      
      
      </motion.div>

      {/* 3. Dual Kinetic Typographic Velocity Ribbons (BEHIND ALL CONTENT) */}
      <div ref={ribbonContainerRef} className={styles.kineticRibbonContainer} aria-hidden="true">
        <div ref={track1Ref} className={styles.kineticTrackTop}>
          <span>FULL-STACK ARCHITECT &bull; DISTRIBUTED MICROSERVICES &bull; NEXT.JS 14 &bull; SPRING BOOT &bull; AGENTIC RAG &bull; HIGH-THROUGHPUT SYSTEMS &bull; FULL-STACK ARCHITECT &bull; NEXT.JS 14 &bull; SPRING BOOT &bull; </span>
        </div>
        <div ref={track2Ref} className={styles.kineticTrackBottom}>
          <span>REACTIVE INTERFACES &bull; MULTI-AGENT SWARMS &bull; SUB-50MS APIS &bull; FAULT TOLERANCE &bull; CLOUD DEVOPS &bull; DOCKER CI/CD &bull; REACTIVE INTERFACES &bull; MULTI-AGENT SWARMS &bull; </span>
        </div>
      </div>

      {/* 4. Two-Column Architectural Stage */}
      <div ref={stageGridRef} className={styles.mainStageGrid}>
        {/* =========================================================================
            LEFT COLUMN: Editorial Typography, Matrix Scramble Role, Telemetry, CTAs
            ========================================================================= */}
        <div className={styles.leftContentCol}>
          {/* Status Eyebrow Badge */}
          

          {/* Grand Staggered Master Headline with Interactive Letters */}
          <div className={styles.headlineBlock}>
            <motion.div
              className={styles.headlineIndex}
              variants={entranceVariants}
              initial="hidden"
              animate={animationState}
              custom={2}
            >
              <span>+ [00]</span>
              <span>ENGINEERING PORTFOLIO</span>
            </motion.div>

            <motion.h1
              className={styles.grandHeadline}
              variants={entranceVariants}
              initial="hidden"
              animate={animationState}
              custom={3}
            >
              <span className={styles.firstName}>
                {'Pratyush'.split('').map((char, cIdx) => (
                  <motion.span
                    key={`fn-${cIdx}`}
                    className={styles.interactiveChar}
                    whileHover={{ y: -6, color: '#c7d2fe', scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
              <span className={styles.lastName}>
                {'Pandey'.split('').map((char, cIdx) => (
                  <motion.span
                    key={`ln-${cIdx}`}
                    className={styles.interactiveChar}
                    whileHover={{ y: -6, scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            </motion.h1>

            {/* Matrix Decoding Role Badge & Interactive Audio Equalizer */}
            <motion.div
              className={styles.scrambleRoleWrapper}
              variants={entranceVariants}
              initial="hidden"
              animate={animationState}
              custom={4}
            >
              <div className={styles.scrambleTerminalTag}>
                <span className={styles.scramblePrompt}>&gt;</span>
                <span className={styles.scrambleRole}>{roleText}</span>
                <span className={styles.cursorBlink}>_</span>
              </div>

              {/* Dynamic Soundwave Equalizer */}
              <div className={styles.audioFrequencyMeter} aria-hidden="true">
                {[40, 75, 55, 90, 60, 85, 45, 95, 70, 50, 80, 65].map((h, i) => (
                  <span
                    key={i}
                    className={styles.eqBar}
                    style={{
                      '--eq-height': `${h}%`,
                      animationDelay: `${i * 0.08}s`,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Editorial Philosophy Narrative */}
          <motion.p
            className={styles.editorialNarrative}
            variants={entranceVariants}
            initial="hidden"
            animate={animationState}
            custom={5}
          >
            Specializing in resilient distributed architectures, sub-50ms REST microservices,
            and production-grade intelligent AI systems from foundational relational schemas
            to fluid reactive frontends with <strong>Java, Spring Boot, React, Next.js, and LLMs</strong>.
          </motion.p>

          {/* Live Telemetry Metrics HUD Strip */}
          <motion.div
            className={styles.telemetryHUDGrid}
            variants={entranceVariants}
            initial="hidden"
            animate={animationState}
            custom={6}
          >
            {METRICS_HUD.map((m) => {
              const Icon = m.icon;
              return (
                <motion.div
                  key={m.label}
                  className={styles.telemetryCard}
                  whileHover={{ y: -5, scale: 1.04 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                >
                  <div className={styles.telemetryTop}>
                    <span className={styles.telemetryVal}>{m.value}</span>
                    <span className={styles.telemetryIcon}>
                      <Icon />
                    </span>
                  </div>
                  <span className={styles.telemetryLabel}>{m.label}</span>
                  <span className={styles.telemetrySub}>{m.sub}</span>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Magnetic Action Controls */}
          <motion.div
            className={styles.actionControlsGroup}
            variants={entranceVariants}
            initial="hidden"
            animate={animationState}
            custom={7}
          >
            <Magnetic>
              <a
                href="#work"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={styles.primaryPillCTA}
              >
                <span>Explore Selected Work</span>
                <FiArrowUpRight className={styles.ctaArrow} aria-hidden="true" />
              </a>
            </Magnetic>

            <Magnetic>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={styles.secondaryPillCTA}
              >
                <span>Initialize Conversation</span>
                <span className={styles.ctaDot} />
              </a>
            </Magnetic>

            <Magnetic>
              <a
                href={profile.resume || 'https://dev.pratyushpandey.me/presume.pdf'}
                target="_blank"
                rel="noreferrer"
                className={styles.tertiaryPillCTA}
                aria-label="Download Technical Résumé"
              >
                <FiDownload aria-hidden="true" />
                <span>Résumé</span>
              </a>
            </Magnetic>
          </motion.div>
        </div>

        {/* =========================================================================
            RIGHT COLUMN: Interactive Architecture Cockpit & Live System Console
            (100% IMAGE-FREE • PURE VECTOR, CODE & MOTION ENGINE)
            ========================================================================= */}
        <motion.div
          className={styles.rightCockpitCol}
          variants={entranceVariants}
          initial="hidden"
          animate={animationState}
          custom={4}
        >
          <div
            ref={cardRef}
            className={styles.cockpitCard}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Dynamic Glass Specular Light Flare */}
            <div className={styles.cockpitGlare} aria-hidden="true" />
            <div className={styles.cockpitAuraBackdrop} aria-hidden="true" />

            {/* Corner Precision Crosshairs */}
            <span className={styles.crossTL}>+</span>
            <span className={styles.crossTR}>+</span>
            <span className={styles.crossBL}>+</span>
            <span className={styles.crossBR}>+</span>

            {/* Cockpit Terminal Header */}
            <div className={styles.cockpitHeader}>
              <div className={styles.cockpitStatus}>
                <span className={styles.statusLiveOrb} />
                <span className={styles.cockpitTitle}>SYS.COCKPIT // LIVE RUNTIME</span>
                <span className={styles.cockpitLatency}>&lt;38ms P95</span>
              </div>

              {/* View Selector Tabs */}
              <div className={styles.cockpitTabs}>
                <button
                  type="button"
                  className={`${styles.cockpitTabBtn} ${activeTab === 'topology' ? styles.tabActive : ''}`}
                  onClick={() => setActiveTab('topology')}
                >
                  <FiLayers className={styles.tabIcon} />
                  <span>Architecture</span>
                </button>
                <button
                  type="button"
                  className={`${styles.cockpitTabBtn} ${activeTab === 'code' ? styles.tabActive : ''}`}
                  onClick={() => setActiveTab('code')}
                >
                  <FiCode className={styles.tabIcon} />
                  <span>Code Runtime</span>
                </button>
                <button
                  type="button"
                  className={`${styles.cockpitTabBtn} ${activeTab === 'core' ? styles.tabActive : ''}`}
                  onClick={() => setActiveTab('core')}
                >
                  <FiCpu className={styles.tabIcon} />
                  <span>Digital Core</span>
                </button>
                <button
                  type="button"
                  className={`${styles.cockpitTabBtn} ${activeTab === 'metrics' ? styles.tabActive : ''}`}
                  onClick={() => setActiveTab('metrics')}
                >
                  <FiTrendingUp className={styles.tabIcon} />
                  <span>Telemetry</span>
                </button>
              </div>
            </div>

            {/* Cockpit Interactive Viewport */}
            <div className={styles.cockpitViewport}>
              <AnimatePresence mode="wait">
                {activeTab === 'topology' && (
                  /* ========================================================
                     VIEW 1: Interactive System Architecture Topology Graph
                     ======================================================== */
                  <motion.div
                    key="view-topology"
                    className={styles.topologyWrapper}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={styles.topologySubHeader}>
                      <span>END-TO-END DISTRIBUTED PIPELINE</span>
                      <button
                        type="button"
                        className={styles.packetBurstBtn}
                        onClick={triggerPacketBurst}
                        aria-label="Trigger Data Packet Surge"
                      >
                        <FiZap />
                        <span>Inject Load Packet</span>
                      </button>
                    </div>

                    {/* Interactive Node Cards */}
                    <div className={styles.topologyNodeGrid}>
                      {ARCHITECTURE_NODES.map((node) => {
                        const Icon = node.icon;
                        const isSelected = activeNode.id === node.id;
                        return (
                          <div
                            key={node.id}
                            className={`${styles.topologyNodeCard} ${isSelected ? styles.nodeCardSelected : ''}`}
                            onClick={() => setActiveNode(node)}
                            style={{ '--node-accent': node.color }}
                          >
                            <div className={styles.nodeCardHeader}>
                              <span className={styles.nodeIcon}>
                                <Icon />
                              </span>
                              <span className={styles.nodeLatencyBadge}>{node.latency}</span>
                            </div>
                            <strong className={styles.nodeTitle}>{node.title}</strong>
                            <span className={styles.nodeTech}>{node.tech}</span>
                            <span className={styles.nodeMeta}>{node.meta}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Animated Data Bus Connector Graphic */}
                    <div className={styles.busConnector}>
                      <span className={styles.busLine} />
                      <span className={`${styles.busTravelingPacket} ${packetBurst ? styles.busBurstActive : ''}`} />
                      <div className={styles.busLabels}>
                        <span>01 CLIENT</span>
                        <span>02 GATEWAY</span>
                        <span>03 AI SWARM</span>
                        <span>04 STORAGE</span>
                      </div>
                    </div>

                    {/* Selected Node Inspector Detail Banner */}
                    <div className={styles.nodeInspectorBanner} style={{ '--inspector-accent': activeNode.color }}>
                      <div className={styles.inspectorLeft}>
                        <span className={styles.inspectorStatusDot} />
                        <div>
                          <strong>{activeNode.title} &bull; {activeNode.tech}</strong>
                          <p>{activeNode.meta} &bull; Throughput: {activeNode.throughput}</p>
                        </div>
                      </div>
                      <span className={styles.inspectorLatencyTag}>{activeNode.latency} P95</span>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'code' && (
                  /* ========================================================
                     VIEW 2: Interactive Code Benchmark & Execution Runtime
                     ======================================================== */
                  <motion.div
                    key="view-code"
                    className={styles.codeViewWrapper}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* File Selector Ribbon */}
                    <div className={styles.codeFileRibbon}>
                      {Object.keys(CODE_SNIPPETS).map((key) => {
                        const file = CODE_SNIPPETS[key];
                        const isSelected = activeCodeKey === key;
                        return (
                          <button
                            key={key}
                            type="button"
                            className={`${styles.fileTab} ${isSelected ? styles.fileTabActive : ''}`}
                            onClick={() => setActiveCodeKey(key)}
                          >
                            <span className={styles.fileDot} />
                            <span>{file.filename}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Syntax Highlighted Code Viewer */}
                    <div className={styles.codeContainer}>
                      <pre className={styles.codePre}>
                        <code>{CODE_SNIPPETS[activeCodeKey].code}</code>
                      </pre>
                    </div>

                    {/* Terminal Execution Trigger & Log Display */}
                    <div className={styles.codeFooterBar}>
                      <button
                        type="button"
                        className={`${styles.runBenchmarkBtn} ${benchmarkStatus === 'success' ? styles.btnSuccess : ''}`}
                        onClick={runCodeBenchmark}
                        disabled={benchmarkStatus === 'running'}
                      >
                        {benchmarkStatus === 'running' ? (
                          <>
                            <FiRefreshCw className={styles.spinIcon} />
                            <span>Dispatching Load Test...</span>
                          </>
                        ) : benchmarkStatus === 'success' ? (
                          <>
                            <FiCheckCircle />
                            <span>38ms Verified (100% OK)</span>
                          </>
                        ) : (
                          <>
                            <FiPlay />
                            <span>Execute Benchmark</span>
                          </>
                        )}
                      </button>

                      <span className={styles.codeDescTag}>
                        {CODE_SNIPPETS[activeCodeKey].desc}
                      </span>
                    </div>

                    {/* Live Output Log Dropdown when executed */}
                    {terminalLogs.length > 0 && (
                      <div className={styles.liveStdoutConsole}>
                        {terminalLogs.map((log, idx) => (
                          <div key={idx} className={styles.stdoutLine}>
                            {log}
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === 'core' && (
                  /* ========================================================
                     VIEW 3: Kinetic 3D Gyroscope Digital Core (Canvas)
                     ======================================================== */
                  <motion.div
                    key="view-core"
                    className={styles.coreViewWrapper}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={styles.coreHeader}>
                      <span>KINETIC COMPUTATION MATRIX // 60 FPS</span>
                      <span>ORBITAL DATA CORE</span>
                    </div>

                    <div className={styles.gyroCanvasWrap}>
                      <canvas ref={gyroCanvasRef} className={styles.gyroCanvas} />
                    </div>

                    <div className={styles.coreFooterSpecs}>
                      <div className={styles.coreSpecItem}>
                        <span>THREAD POOL</span>
                        <strong>16 CORES ACTIVE</strong>
                      </div>
                      <div className={styles.coreSpecItem}>
                        <span>EVENT LOOP</span>
                        <strong>0.4ms LAG</strong>
                      </div>
                      <div className={styles.coreSpecItem}>
                        <span>INTEGRITY</span>
                        <strong>100% SYNCHRONIZED</strong>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'metrics' && (
                  /* ========================================================
                     VIEW 4: Real-Time Cluster Telemetry Gauges
                     ======================================================== */
                  <motion.div
                    key="view-metrics"
                    className={styles.metricsViewWrapper}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={styles.metricsHeader}>
                      <span>CLUSTER HEALTH MONITOR</span>
                      <span className={styles.liveTag}>LIVE TELEMETRY</span>
                    </div>

                    <div className={styles.metricsDetailGrid}>
                      <div className={styles.metricGaugeCard}>
                        <span className={styles.gaugeLabel}>Redis Cache Hit Rate</span>
                        <strong className={styles.gaugeVal}>99.4%</strong>
                        <div className={styles.gaugeBar}><span style={{ width: '99.4%' }} /></div>
                      </div>
                      <div className={styles.metricGaugeCard}>
                        <span className={styles.gaugeLabel}>JVM Heap Utilization</span>
                        <strong className={styles.gaugeVal}>34.8%</strong>
                        <div className={styles.gaugeBar}><span style={{ width: '34.8%' }} /></div>
                      </div>
                      <div className={styles.metricGaugeCard}>
                        <span className={styles.gaugeLabel}>HTTP/2 P95 Latency</span>
                        <strong className={styles.gaugeVal}>38ms</strong>
                        <div className={styles.gaugeBar}><span style={{ width: '85%' }} /></div>
                      </div>
                      <div className={styles.metricGaugeCard}>
                        <span className={styles.gaugeLabel}>Service Availability</span>
                        <strong className={styles.gaugeVal}>99.98%</strong>
                        <div className={styles.gaugeBar}><span style={{ width: '99.98%' }} /></div>
                      </div>
                    </div>

                    <div className={styles.clusterLiveLogs}>
                      <span>&bull; [AUTOSCALER] 4 pods active across availability zones</span>
                      <span>&bull; [SECURITY] TLS 1.3 mutual handshake verified</span>
                      <span>&bull; [AI_ROUTER] Gemini 1.5 streaming pipeline ready</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Cockpit Footer Status Coordinates */}
            <div className={styles.cockpitFooter}>
              <div className={styles.cockpitFooterLeft}>
                <span className={styles.footDot} />
                <span>ENVIRONMENT: PRODUCTION // MULTI-CLOUD</span>
              </div>
              <div className={styles.cockpitFooterRight}>
                <span>SECURED HTTP/2 &bull; TLS 1.3</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 5. Bottom Architectural Navigation & Telemetry Bar */}
      <motion.div
        ref={footerBarRef}
        className={styles.heroFooterBar}
        aria-label="Hero status and navigation"
        variants={entranceVariants}
        initial="hidden"
        animate={animationState}
        custom={8}
      >
        <div className={styles.footerLeft}>
          <div className={styles.footerClockWrap}>
            <span className={styles.clockPulseDot} />
            <span className={styles.footerLocation}>Vijayawada, India</span>
            <span className={styles.footerDivider}>&bull;</span>
            <span className={styles.footerTime}>{liveClock}</span>
          </div>
        </div>

        {/* Center Animated Scroll Cue */}
        <div className={styles.footerCenter}>
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={styles.scrollIndicatorLink}
            aria-label="Scroll to explore About section"
          >
            <span className={styles.scrollText}>SCROLL TO INITIALIZE ARCHITECTURE</span>
            <motion.span
              className={styles.scrollArrow}
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            >
              <FiArrowDown aria-hidden="true" />
            </motion.span>
          </a>
        </div>

        {/* Right Quick Social Badges */}
        <div className={styles.footerRight}>
          <a
            href={profile.github || 'https://github.com/its-pratyushpandey'}
            target="_blank"
            rel="noreferrer"
            className={styles.socialQuickLink}
            aria-label="GitHub Profile"
          >
            <FiGithub aria-hidden="true" />
            <span>GitHub</span>
          </a>
          <a
            href={profile.linkedin || 'https://www.linkedin.com/in/pratyush-pandey1/'}
            target="_blank"
            rel="noreferrer"
            className={styles.socialQuickLink}
            aria-label="LinkedIn Profile"
          >
            <FiLinkedin aria-hidden="true" />
            <span>LinkedIn</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
