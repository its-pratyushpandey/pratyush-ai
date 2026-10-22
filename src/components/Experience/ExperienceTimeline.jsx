"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import {
  FiArrowLeft,
  FiArrowRight,
  FiChevronRight,
} from "react-icons/fi";
import styles from "./ExperienceTimeline.module.scss";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const JOURNEY_STATION_COLORS = {
  0: "#eef3f8", // Intro: Ice Platinum Slate
  1: "#e1effe", // Calibo: Cool Azure Ice Blue
  2: "#daf5ed", // EtharaAI: Refreshing Seafoam Aqua Mint
  3: "#fef5d6", // MERN Hackathon: Luminous Warm Solar Pearl / Champagne Amber
  4: "#e2ebfc", // FSAD Hackathon: Electric Indigo Frost
  5: "#dbf3f6", // PFSD Hackathon: Nordic Glacial Sky Teal
  6: "#eff2f7", // Outro: Platinum Frost Silver
};

export default function ExperienceTimeline({ experience = [] }) {
  // activeStation: 0 = Intro, 1..5 = Milestones 01..05, 6 = Outro
  const [activeStation, setActiveStation] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);
  const [ropePathD, setRopePathD] = useState("");
  const [svgDimensions, setSvgDimensions] = useState({ width: 7000, height: 750 });
  const [reachedNodes, setReachedNodes] = useState([]);

  // Mobile vertical timeline state
  const [mobileRopePathD, setMobileRopePathD] = useState("");
  const [mobileSvgHeight, setMobileSvgHeight] = useState(2400);
  const [mobileReachedNodes, setMobileReachedNodes] = useState([]);
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);

  const [reducedMotion, setReducedMotion] = useState(false);

  const containerRef = useRef(null);
  const pinContainerRef = useRef(null);
  const desktopTrackRef = useRef(null);
  const desktopRopeActivePathRef = useRef(null);
  const desktopTravelingSparkRef = useRef(null);
  const watermarkRef = useRef(null);
  const scrollTriggerInstance = useRef(null);

  const mobileContainerRef = useRef(null);
  const mobileRopeActivePathRef = useRef(null);
  const mobileTravelingSparkRef = useRef(null);

  const lastStationRef = useRef(-1);
  const lastMobileStationRef = useRef(-1);

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);

    const handleMotionChange = (e) => setReducedMotion(e.matches);
    mq.addEventListener?.("change", handleMotionChange);
    return () => mq.removeEventListener?.("change", handleMotionChange);
  }, []);

  // 1. Desktop: Compute continuous curvy rope path passing through every milestone anchor grommet
  const calculateDesktopRopePath = useCallback(() => {
    const track = desktopTrackRef.current;
    if (!track) return;

    const grommets = track.querySelectorAll(`.${styles.ropeGrommet}`);
    if (!grommets.length) return;

    const trackRect = track.getBoundingClientRect();
    const points = [];

    // Lead-in point before the first station
    const firstRect = grommets[0].getBoundingClientRect();
    const leadInX = Math.max(10, firstRect.left - trackRect.left - 120);
    const leadInY = firstRect.top - trackRect.top + firstRect.height / 2 + 10;
    points.push({ x: leadInX, y: leadInY });

    // Center coordinates of each station grommet
    grommets.forEach((grommet) => {
      const rect = grommet.getBoundingClientRect();
      const x = rect.left - trackRect.left + rect.width / 2;
      const y = rect.top - trackRect.top + rect.height / 2;
      points.push({ x, y });
    });

    // Lead-out point after the last station
    const lastRect = grommets[grommets.length - 1].getBoundingClientRect();
    const leadOutX = lastRect.left - trackRect.left + lastRect.width + 140;
    const leadOutY = lastRect.top - trackRect.top + lastRect.height / 2 - 10;
    points.push({ x: leadOutX, y: leadOutY });

    // Construct smooth organic cubic Bezier spline with natural catenary gravity sag across wide distance
    let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const dx = p1.x - p0.x;

      const sag = Math.min(Math.max(dx * 0.04, 25), 55);
      const cp1x = (p0.x + dx * 0.42).toFixed(1);
      const cp1y = (p0.y + sag).toFixed(1);
      const cp2x = (p1.x - dx * 0.42).toFixed(1);
      const cp2y = (p1.y + sag).toFixed(1);

      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p1.x.toFixed(1)} ${p1.y.toFixed(1)}`;
    }

    setRopePathD(d);
    const actualWidth = Math.max(track.scrollWidth, track.offsetWidth, points[points.length - 1].x + 200);
    const actualHeight = Math.max(track.scrollHeight, track.offsetHeight, 720);
    setSvgDimensions({
      width: Math.ceil(actualWidth),
      height: Math.ceil(actualHeight),
    });
  }, []);

  // 2. Mobile: Compute vertical curvy SVG path flowing through vertical grommets
  const calculateMobileRopePath = useCallback(() => {
    const container = mobileContainerRef.current;
    if (!container) return;

    const grommets = container.querySelectorAll(`.${styles.mobileGrommet}`);
    if (!grommets.length) return;

    const containerRect = container.getBoundingClientRect();
    const points = [];

    grommets.forEach((grommet) => {
      const rect = grommet.getBoundingClientRect();
      const x = rect.left - containerRect.left + rect.width / 2;
      const y = rect.top - containerRect.top + rect.height / 2;
      points.push({ x, y });
    });

    if (points.length < 2) return;

    // Build vertical organic curvy spline threading through each node
    let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const dy = p1.y - p0.y;
      const weave = i % 2 === 0 ? 16 : -16;
      const cp1x = (p0.x + weave).toFixed(1);
      const cp1y = (p0.y + dy * 0.42).toFixed(1);
      const cp2x = (p1.x + weave).toFixed(1);
      const cp2y = (p1.y - dy * 0.42).toFixed(1);

      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p1.x.toFixed(1)} ${p1.y.toFixed(1)}`;
    }

    setMobileRopePathD(d);
    setMobileSvgHeight(container.scrollHeight);
  }, []);

  // Resize and layout watchers (throttled)
  useEffect(() => {
    if (typeof window === "undefined") return;

    let resizeTimer = null;
    const runCalcs = () => {
      if (window.innerWidth > 860) {
        calculateDesktopRopePath();
      } else {
        calculateMobileRopePath();
      }
    };

    const debouncedRunCalcs = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(runCalcs, 100);
    };

    runCalcs();
    const timer1 = setTimeout(runCalcs, 250);

    let ro;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => debouncedRunCalcs());
      if (desktopTrackRef.current) ro.observe(desktopTrackRef.current);
      if (mobileContainerRef.current) ro.observe(mobileContainerRef.current);
    }

    window.addEventListener("resize", debouncedRunCalcs);
    return () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      clearTimeout(timer1);
      if (ro) ro.disconnect();
      window.removeEventListener("resize", debouncedRunCalcs);
    };
  }, [calculateDesktopRopePath, calculateMobileRopePath, experience]);

  // Synchronize desktop rope stroke immediately when ropePathD changes
  useEffect(() => {
    const activePath = desktopRopeActivePathRef.current;
    if (activePath && ropePathD) {
      try {
        const pathLength = activePath.getTotalLength();
        if (pathLength > 0) {
          activePath.style.strokeDasharray = `${pathLength}`;
          const currentProgress = progressPercent / 100;
          activePath.style.strokeDashoffset = `${pathLength * (1 - currentProgress)}px`;

          if (desktopTravelingSparkRef.current) {
            const currentDist = pathLength * currentProgress;
            const point = activePath.getPointAtLength(currentDist);
            desktopTravelingSparkRef.current.setAttribute("cx", point.x);
            desktopTravelingSparkRef.current.setAttribute("cy", point.y);
          }
        }
      } catch (e) {}
    }
  }, [ropePathD, progressPercent]);

  // Synchronize mobile vertical rope stroke immediately
  useEffect(() => {
    const activePath = mobileRopeActivePathRef.current;
    if (activePath && mobileRopePathD) {
      try {
        const pathLength = activePath.getTotalLength();
        if (pathLength > 0) {
          activePath.style.strokeDasharray = `${pathLength}`;
          activePath.style.strokeDashoffset = `${pathLength}px`;

          if (mobileTravelingSparkRef.current) {
            const point = activePath.getPointAtLength(0);
            mobileTravelingSparkRef.current.setAttribute("cx", point.x);
            mobileTravelingSparkRef.current.setAttribute("cy", point.y);
          }
        }
      } catch (e) {}
    }
  }, [mobileRopePathD]);

  // GSAP Responsive matchMedia Setup
  useEffect(() => {
    if (typeof window === "undefined" || !experience.length) return;

    const mm = gsap.matchMedia();

    // 1. Desktop (> 860px): Controlled pinning, expansive 100vw station scrub, rope draw
    mm.add("(min-width: 861px)", () => {
      const track = desktopTrackRef.current;
      const pinContainer = pinContainerRef.current;
      if (!track || !pinContainer) return;

      const getScrollAmount = () => Math.max(track.scrollWidth - window.innerWidth, 1200);

      const horizontalTween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
      });

      // Subtle parallax drift on the ghost watermark word
      if (watermarkRef.current) {
        gsap.to(watermarkRef.current, {
          x: 140,
          ease: "none",
          scrollTrigger: {
            trigger: pinContainer,
            start: "top top",
            end: () => `+=${getScrollAmount()}`,
            scrub: 1.5,
          },
        });
      }

      scrollTriggerInstance.current = ScrollTrigger.create({
        trigger: pinContainer,
        start: "top top",
        end: () => `+=${getScrollAmount()}`,
        pin: true,
        animation: horizontalTween,
        scrub: reducedMotion ? false : 1,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const p = self.progress;
          setProgressPercent(Math.round(p * 100));

          // A. Scrub horizontal curvy active rope's strokeDashoffset
          const activePath = desktopRopeActivePathRef.current;
          let sparkX = 0;
          if (activePath) {
            try {
              const pathLength = activePath.getTotalLength();
              activePath.style.strokeDasharray = `${pathLength}`;
              const drawOffset = pathLength * (1 - p);
              activePath.style.strokeDashoffset = `${drawOffset}px`;

              if (desktopTravelingSparkRef.current && pathLength > 0) {
                const currentDist = Math.max(0, Math.min(pathLength * p, pathLength));
                const point = activePath.getPointAtLength(currentDist);
                desktopTravelingSparkRef.current.setAttribute("cx", point.x);
                desktopTravelingSparkRef.current.setAttribute("cy", point.y);
                sparkX = point.x;
              }
            } catch (e) {}
          }

          // B. Screen-center proximity detection: precisely which single station is currently active
          const center = window.innerWidth / 2;
          const stations = track.querySelectorAll(`.${styles.stationWrapper}`);
          let closestIdx = 0;
          let minDiff = Infinity;
          stations.forEach((st, i) => {
            const rect = st.getBoundingClientRect();
            const stCenter = rect.left + rect.width / 2;
            const diff = Math.abs(center - stCenter);
            if (diff < minDiff) {
              minDiff = diff;
              closestIdx = i;
            }
          });

          if (closestIdx !== lastStationRef.current) {
            lastStationRef.current = closestIdx;
            setActiveStation(closestIdx);
            if (typeof document !== "undefined") {
              const snapZone = document.querySelector("[data-snap-theme]");
              if (snapZone) {
                snapZone.setAttribute("data-snap-theme", "journey");
                snapZone.setAttribute("data-journey-station", String(closestIdx));
                const targetColor = JOURNEY_STATION_COLORS[closestIdx] || "#eef3f8";
                snapZone.style.setProperty("--snap-canvas-bg", targetColor);
                gsap.to(snapZone, {
                  backgroundColor: targetColor,
                  duration: 0.65,
                  ease: "power2.out",
                  overwrite: "auto",
                });
              }
            }
          }

          // C. Precise node activation: check which grommets the flowing rope has reached
          const grommets = track.querySelectorAll(`.${styles.ropeGrommet}`);
          const trackRect = track.getBoundingClientRect();
          const reached = [];
          grommets.forEach((g) => {
            const gRect = g.getBoundingClientRect();
            const gX = gRect.left - trackRect.left + gRect.width / 2;
            reached.push(sparkX >= gX - 18);
          });
          setReachedNodes(reached);
        },
      });
    });

    // 2. Mobile (<= 860px): Vertical timeline with progressive vertical SVG connector
    mm.add("(max-width: 860px)", () => {
      const container = mobileContainerRef.current;
      const activePath = mobileRopeActivePathRef.current;
      if (!container || !activePath) return;

      ScrollTrigger.create({
        trigger: container,
        start: "top 75%",
        end: "bottom 75%",
        scrub: reducedMotion ? false : 0.8,
        onUpdate: (self) => {
          const p = self.progress;

          try {
            const pathLength = activePath.getTotalLength();
            activePath.style.strokeDasharray = `${pathLength}`;
            const drawOffset = pathLength * (1 - p);
            activePath.style.strokeDashoffset = `${drawOffset}px`;

            if (mobileTravelingSparkRef.current && pathLength > 0) {
              const currentDist = Math.max(0, Math.min(pathLength * p, pathLength));
              const point = activePath.getPointAtLength(currentDist);
              mobileTravelingSparkRef.current.setAttribute("cx", point.x);
              mobileTravelingSparkRef.current.setAttribute("cy", point.y);

              // Check which vertical nodes spark has reached
              const grommets = container.querySelectorAll(`.${styles.mobileGrommet}`);
              const cRect = container.getBoundingClientRect();
              const reached = [];
              let closestMobile = 0;
              let minMobileDiff = Infinity;

              grommets.forEach((g, i) => {
                const gRect = g.getBoundingClientRect();
                const gY = gRect.top - cRect.top + gRect.height / 2;
                reached.push(point.y >= gY - 16);

                const diff = Math.abs(window.innerHeight / 2 - (gRect.top + gRect.height / 2));
                if (diff < minMobileDiff) {
                  minMobileDiff = diff;
                  closestMobile = i;
                }
              });

              setMobileReachedNodes(reached);

              if (closestMobile !== lastMobileStationRef.current) {
                lastMobileStationRef.current = closestMobile;
                setActiveMobileIndex(closestMobile);
                if (typeof document !== "undefined") {
                  const snapZone = document.querySelector("[data-snap-theme]");
                  if (snapZone) {
                    snapZone.setAttribute("data-snap-theme", "journey");
                    snapZone.setAttribute("data-journey-station", String(closestMobile));
                    const targetColor = JOURNEY_STATION_COLORS[closestMobile] || "#eef3f8";
                    snapZone.style.setProperty("--snap-canvas-bg", targetColor);
                    gsap.to(snapZone, {
                      backgroundColor: targetColor,
                      duration: 0.65,
                      ease: "power2.out",
                      overwrite: "auto",
                    });
                  }
                }
              }
            }
          } catch (e) {}
        },
      });
    });

    return () => {
      mm.revert();
    };
  }, [experience, ropePathD, mobileRopePathD, reducedMotion]);

  // Jump smoothly to a specific station on desktop
  const scrollToStation = useCallback((stationIdx) => {
    const isDesktop = window.matchMedia("(min-width: 861px)").matches;
    if (isDesktop && scrollTriggerInstance.current && desktopTrackRef.current) {
      const trigger = scrollTriggerInstance.current;
      const totalDistance = trigger.end - trigger.start;
      const stations = desktopTrackRef.current.querySelectorAll(`.${styles.stationWrapper}`);
      if (stations[stationIdx]) {
        const trackRect = desktopTrackRef.current.getBoundingClientRect();
        const stationRect = stations[stationIdx].getBoundingClientRect();
        const stationCenterFromTrackLeft = stationRect.left - trackRect.left + stationRect.width / 2;
        const targetX = stationCenterFromTrackLeft - window.innerWidth / 2;
        const maxScrollX = Math.max(desktopTrackRef.current.scrollWidth - window.innerWidth, 1200);
        const targetFraction = Math.max(0, Math.min(targetX / maxScrollX, 1));
        const targetScrollY = trigger.start + targetFraction * totalDistance;
        window.scrollTo({ top: targetScrollY, behavior: "smooth" });
      }
    }
  }, []);

  // Determine single-card appearance state (Active, Upcoming from Right, Passed to Left)
  const getCardAppearanceClass = (stationIdx) => {
    if (stationIdx === activeStation) return styles.cardActive;
    if (stationIdx < activeStation) return styles.cardPassed;
    return styles.cardUpcoming;
  };

  const currentExperienceItem =
    activeStation >= 1 && activeStation <= experience.length
      ? experience[activeStation - 1]
      : null;

  return (
    <div ref={containerRef} className={styles.timelineRoot}>
      {/* ====================================================================
          DESKTOP VIEWPORT (> 860px): Single-Focus Pinned Horizontal Timeline
          Only ONE journey appears at a time, next one appears unexpectedly
          from the right on scroll down!
          ==================================================================== */}
      <div ref={pinContainerRef} className={styles.desktopTimelineWrap}>
        {/* Top Pinned Editorial Header */}
        <header className={styles.pinnedHeader}>
          {/* Low-opacity ghost watermark word behind headline */}
          <div ref={watermarkRef} className={styles.ghostWatermark} aria-hidden="true">
            EXPERIENCE
          </div>

          <div className={styles.headerContentWrap}>
            <div className={styles.headerTitleGroup}>
              {/* Animated Eyebrow Badge */}
              <motion.div
                className={styles.eyebrow}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className={styles.eyebrowDot} />
                <span>04 / MY JOURNEY</span>
                <span className={styles.eyebrowSep}>//</span>
                <span className={styles.eyebrowMeta}>CHRONOLOGICAL ARCHITECTURE</span>
              </motion.div>

              {/* Masked Upward Line-by-Line Headline */}
              <h2 className={styles.headline}>
                <span className={styles.maskLine}>
                  <motion.span
                    className={styles.maskInner}
                    initial={{ y: "115%", opacity: 0 }}
                    whileInView={{ y: "0%", opacity: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                  >
                    Where I&apos;ve
                  </motion.span>
                </span>
                <span className={styles.maskLine}>
                  <motion.span
                    className={`${styles.maskInner} ${styles.headlineGradient}`}
                    initial={{ y: "115%", opacity: 0 }}
                    whileInView={{ y: "0%", opacity: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                  >
                    learned and grown.
                  </motion.span>
                </span>
              </h2>

              {/* Decorative Tech Rule Line */}
              <motion.div
                className={styles.techRuleLine}
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>

            {/* Desktop Scroll Hint Box */}
            <motion.div
              className={styles.scrollHintBox}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              aria-hidden="true"
            >
              <span className={styles.scrollHintDot} />
              <span className={styles.scrollHintText}>
                Scroll down to travel timeline
              </span>
              <span className={styles.scrollHintArrow}>→</span>
            </motion.div>
          </div>
        </header>

        {/* Horizontal Track Viewport: Each Station takes 100vw so only ONE appears at a time */}
        <div className={styles.trackViewport}>
          <div
            ref={desktopTrackRef}
            className={styles.horizontalTrack}
            role="region"
            aria-label="Chronological experience cards connected by rope"
          >
            {/* The Curvy SVG Rope Layer */}
            {ropePathD && (
              <svg
                className={styles.ropeSvgCanvas}
                width={svgDimensions.width}
                height={svgDimensions.height}
                viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="ropeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ff6848" />
                    <stop offset="25%" stopColor="#8c7bff" />
                    <stop offset="50%" stopColor="#6366f1" />
                    <stop offset="75%" stopColor="#43e8b3" />
                    <stop offset="100%" stopColor="#6b5ee8" />
                  </linearGradient>

                  <filter id="ropeGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="4" result="glow" />
                    <feComposite in="SourceGraphic" in2="glow" operator="over" />
                  </filter>

                  <radialGradient id="sparkLight">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                    <stop offset="45%" stopColor="#80e8e0" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#6b5ee8" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Layer 1: Soft Depth Drop Shadow */}
                <path
                  d={ropePathD}
                  className={styles.ropeShadow}
                  fill="none"
                  stroke="rgba(32, 29, 102, 0.08)"
                  strokeWidth="8"
                  strokeLinecap="round"
                />

                {/* Layer 2: Inactive Braided Cord Guide */}
                <path
                  d={ropePathD}
                  className={styles.ropeBaseTrack}
                  fill="none"
                  stroke="rgba(107, 94, 232, 0.18)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Layer 3: Active Glowing Energy Rope */}
                <path
                  ref={desktopRopeActivePathRef}
                  d={ropePathD}
                  className={styles.ropeActivePath}
                  fill="none"
                  stroke="url(#ropeGradient)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  filter="url(#ropeGlowFilter)"
                />

                {/* Layer 4: Traveling Spark */}
                <circle
                  ref={desktopTravelingSparkRef}
                  r="7"
                  fill="url(#sparkLight)"
                  className={styles.ropeTravelingSpark}
                />
              </svg>
            )}

            {/* Station 00 (Intro Stage) */}
            <div className={`${styles.stationWrapper} ${styles.waveOffset0}`}>
              <div className={styles.anchorHookWrap}>
                <button
                  type="button"
                  className={`${styles.ropeGrommet} ${
                    reachedNodes[0] ? styles.grommetReached : ""
                  } ${activeStation === 0 ? styles.grommetActive : ""}`}
                  onClick={() => scrollToStation(0)}
                  aria-label="Intro Station"
                >
                  <span className={styles.grommetNumber}>00</span>
                  {activeStation === 0 && !reducedMotion && (
                    <span className={styles.grommetPulseRing} aria-hidden="true" />
                  )}
                </button>
                <div className={styles.umbilicalCord}>
                  <span className={styles.cordLine} />
                  <span className={styles.cordDot} />
                </div>
              </div>

              <article
                className={`${styles.introStationCard} ${getCardAppearanceClass(0)}`}
              >
                <div>
                  <span className={styles.stationKicker}>00 // CHRONOLOGY</span>
                  <h3 className={styles.stationTitle}>Where Ideas Met Execution</h3>
                  <div className={styles.stationPeriod}>2024 — 2026 Journey</div>
                  <p className={styles.stationDesc}>
                    5 engineering milestones connected along an evolving path. From
                    hackathon architectures to production AI pipelines and distributed
                    cloud microservices.
                  </p>
                </div>

                <div className={styles.stationFooter}>
                  <span className={styles.pulseGuideDot} />
                  <span>Scroll down to travel timeline →</span>
                </div>
              </article>
            </div>

            {/* Five Milestone Stations (01 — 05) Each in its own 100vw Viewport */}
            {experience.map((item, idx) => {
              const stationIdx = idx + 1;
              const isCurrent = stationIdx === activeStation;
              const isReached = reachedNodes[stationIdx];
              const waveClass = styles[`waveOffset${stationIdx}`] || "";

              return (
                <div
                  key={item.company}
                  className={`${styles.stationWrapper} ${waveClass} ${
                    isCurrent ? styles.stationActive : ""
                  }`}
                >
                  {/* Anchor Grommet on the Rope */}
                  <div className={styles.anchorHookWrap}>
                    <button
                      type="button"
                      className={`${styles.ropeGrommet} ${
                        isReached ? styles.grommetReached : ""
                      } ${isCurrent ? styles.grommetActive : ""}`}
                      onClick={() => scrollToStation(stationIdx)}
                      aria-label={`Jump to milestone 0${idx + 1}: ${item.company}`}
                    >
                      <span className={styles.grommetNumber}>0{idx + 1}</span>
                      {isCurrent && !reducedMotion && (
                        <span className={styles.grommetPulseRing} aria-hidden="true" />
                      )}
                    </button>
                    <div className={styles.umbilicalCord} aria-hidden="true">
                      <span className={styles.cordLine} />
                      <span className={styles.cordDot} />
                    </div>
                  </div>

                  {/* Single Unified Milestone Card: Appears unexpectedly from right on scroll */}
                  <article
                    id={`milestone-${idx}`}
                    tabIndex={0}
                    className={`${styles.milestoneCard} ${getCardAppearanceClass(stationIdx)}`}
                    aria-label={`${item.company} — ${item.role}`}
                  >
                    <div>
                      {/* Top Meta: Period + Domain badge + Location */}
                      <div className={styles.cardTopMeta}>
                        <div className={styles.cardMetaLeft}>
                          <span className={styles.cardPeriodBadge}>{item.period}</span>
                          {item.type && (
                            <span className={styles.cardTypeBadge}>{item.type}</span>
                          )}
                        </div>

                        <div className={styles.cardLocationBadge}>
                          <span>{item.countryCode || item.location}</span>
                          <span className={styles.locationPulseDot}>
                            <span className={styles.pulseRing} />
                            <span className={styles.pulseCore} />
                          </span>
                        </div>
                      </div>

                      {/* Company & Role */}
                      <div className={styles.cardTitles}>
                        <h3 className={styles.cardCompanyTitle}>{item.company}</h3>
                        <h4 className={styles.cardRoleSubtitle}>{item.role}</h4>
                      </div>

                      {/* Tech Stack Chips with Animated Stagger */}
                      {item.tech && item.tech.length > 0 && (
                        <div className={styles.cardTechList}>
                          {item.tech.slice(0, 5).map((tech, tIdx) => (
                            <motion.span
                              key={tech}
                              className={styles.cardTechPill}
                              initial={{ opacity: 0, y: 8, scale: 0.9 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              transition={{
                                delay: 0.05 + tIdx * 0.04,
                                duration: 0.3,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      )}

                      {/* Narrative Overview */}
                      {item.overview && (
                        <p className={styles.cardOverview}>{item.overview}</p>
                      )}

                      {/* Key Highlights */}
                      <ul className={styles.cardHighlightsList}>
                        {item.achievements?.slice(0, 2).map((ach, aIdx) => (
                          <li key={aIdx} className={styles.highlightItem}>
                            <span className={styles.achievementArrow} aria-hidden="true">
                              →
                            </span>
                            <span className={styles.highlightText}>{ach}</span>
                          </li>
                        ))}

                        {item.bullets?.slice(0, 1).map((b, bIdx) => (
                          <li key={bIdx} className={styles.highlightItem}>
                            <span className={styles.bulletDot} aria-hidden="true">
                              •
                            </span>
                            <span className={styles.highlightText}>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Card Footer Meta */}
                    <div className={styles.cardFooterMeta}>
                      <span className={styles.cardStatusBadge}>
                        {item.type?.split("//")[0]?.trim() || "Milestone"}
                      </span>
                      <span className={styles.cardOrderNum}>
                        0{idx + 1} of 0{experience.length}
                      </span>
                    </div>
                  </article>
                </div>
              );
            })}

            {/* Station 06 (Outro Stage) */}
            <div className={`${styles.stationWrapper} ${styles.waveOffset6}`}>
              <div className={styles.anchorHookWrap}>
                <button
                  type="button"
                  className={`${styles.ropeGrommet} ${
                    reachedNodes[experience.length + 1] ? styles.grommetReached : ""
                  } ${activeStation === 6 ? styles.grommetActive : ""}`}
                  onClick={() => scrollToStation(6)}
                  aria-label="Next Section: Credentials"
                >
                  <span className={styles.grommetNumber}>06</span>
                  {activeStation === 6 && !reducedMotion && (
                    <span className={styles.grommetPulseRing} aria-hidden="true" />
                  )}
                </button>
                <div className={styles.umbilicalCord}>
                  <span className={styles.cordLine} />
                  <span className={styles.cordDot} />
                </div>
              </div>

              <article
                className={`${styles.outroStationCard} ${getCardAppearanceClass(6)}`}
              >
                <div>
                  <span className={styles.stationKicker}>05 // UP NEXT</span>
                  <h3 className={styles.stationTitle}>Verified Credentials</h3>
                  <div className={styles.stationPeriod}>Certifications &amp; Standards</div>
                  <p className={styles.stationDesc}>
                    Deep-dive into verified industry credentials spanning MongoDB developer
                    certifications, Oracle Cloud Infrastructure, Cambridge English, and GitHub Foundations.
                  </p>
                </div>

                <a
                  href="#credentials"
                  className={styles.credentialsButton}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("credentials")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <span>View Credentials</span>
                  <FiChevronRight aria-hidden="true" />
                </a>
              </article>
            </div>
          </div>
        </div>

        {/* Desktop Bottom Status Bar */}
        <footer className={styles.pinnedBottomBar}>
          <div className={styles.bottomStatusLeft}>
            <span className={styles.activeCompanyKicker}>
              {activeStation === 0
                ? "Intro: Chronology"
                : activeStation === 6
                ? "Next: Credentials"
                : `Active: ${currentExperienceItem?.company}`}
            </span>
            <span className={styles.activeRoleText}>
              // {activeStation === 0
                ? "2024 — 2026 Journey"
                : activeStation === 6
                ? "Certifications & Standards"
                : currentExperienceItem?.role}
            </span>
          </div>

          <div className={styles.bottomProgressIndicator}>
            <span className={styles.stageIndicator}>
              {activeStation === 0
                ? "00 // Start"
                : activeStation === 6
                ? "06 // End"
                : `0${activeStation} of 05`}
            </span>
            <span className={styles.progressPct}>
              {progressPercent}% Explored
            </span>
            <div className={styles.navPillWrap}>
              <button
                type="button"
                className={styles.navPillBtn}
                onClick={() => scrollToStation(Math.max(activeStation - 1, 0))}
                aria-label="Previous milestone"
              >
                <FiArrowLeft size={14} />
              </button>
              <button
                type="button"
                className={styles.navPillBtn}
                onClick={() => scrollToStation(Math.min(activeStation + 1, 6))}
                aria-label="Next milestone"
              >
                <FiArrowRight size={14} />
              </button>
            </div>
          </div>
        </footer>
      </div>

      {/* ====================================================================
          MOBILE VERTICAL TIMELINE (<= 860px)
          One journey focused at a time with lightweight entrance from right
          Zero horizontal overflow
          ==================================================================== */}
      <div className={styles.mobileVerticalTimelineWrap}>
        {/* Mobile Header with Ghost Watermark */}
        <header className={styles.mobileHeader}>
          <div className={styles.ghostWatermarkMobile} aria-hidden="true">
            EXPERIENCE
          </div>

          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            <span>04 / MY JOURNEY</span>
          </div>

          <h2 className={styles.headline}>
            <span className={styles.maskLine}>
              <span className={styles.maskInner}>Where I&apos;ve</span>
            </span>
            <span className={styles.maskLine}>
              <span className={`${styles.maskInner} ${styles.headlineGradient}`}>
                learned and grown.
              </span>
            </span>
          </h2>

          <div className={styles.techRuleLine} />
        </header>

        {/* Vertical Track with Progressive Curvy SVG Connector */}
        <div ref={mobileContainerRef} className={styles.mobileVerticalTrack}>
          {mobileRopePathD && (
            <svg
              className={styles.mobileSvgCanvas}
              width="50"
              height={mobileSvgHeight}
              viewBox={`0 0 50 ${mobileSvgHeight}`}
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="mobileRopeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ff6848" />
                  <stop offset="30%" stopColor="#6b5ee8" />
                  <stop offset="70%" stopColor="#43e8b3" />
                  <stop offset="100%" stopColor="#3949ab" />
                </linearGradient>

                <filter id="mobileRopeGlow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="2.5" result="glow" />
                  <feComposite in="SourceGraphic" in2="glow" operator="over" />
                </filter>
              </defs>

              {/* Inactive Vertical Cord Track */}
              <path
                d={mobileRopePathD}
                fill="none"
                stroke="rgba(107, 94, 232, 0.2)"
                strokeWidth="3"
                strokeDasharray="5 4"
                strokeLinecap="round"
              />

              {/* Active Glowing Vertical Energy Rope */}
              <path
                ref={mobileRopeActivePathRef}
                d={mobileRopePathD}
                fill="none"
                stroke="url(#mobileRopeGradient)"
                strokeWidth="3.5"
                strokeLinecap="round"
                filter="url(#mobileRopeGlow)"
              />

              {/* Traveling Spark along the vertical curve */}
              <circle
                ref={mobileTravelingSparkRef}
                r="6"
                fill="#ffffff"
                stroke="#6b5ee8"
                strokeWidth="2"
              />
            </svg>
          )}

          {/* Mobile Station 00 (Intro) */}
          <div className={styles.mobileStationRow}>
            <div className={styles.mobileGrommetWrap}>
              <div
                className={`${styles.mobileGrommet} ${
                  mobileReachedNodes[0] ? styles.mobileGrommetActive : ""
                }`}
              >
                <span className={styles.grommetNumber}>00</span>
              </div>
            </div>

            <div className={styles.mobileCardWrap}>
              <motion.article
                className={styles.mobileIntroCard}
                initial={{ opacity: 0, x: 30, scale: 0.96 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className={styles.stationKicker}>00 // CHRONOLOGY</span>
                <h3 className={styles.cardCompanyTitle}>Where Ideas Met Execution</h3>
                <div className={styles.stationPeriod}>2024 — 2026 Journey</div>
                <p className={styles.cardOverview}>
                  5 engineering milestones connected along an evolving path. From
                  hackathon architectures to production AI pipelines and distributed
                  cloud microservices.
                </p>
              </motion.article>
            </div>
          </div>

          {/* Mobile Milestones 01 — 05 (Each entering unexpectedly from right on scroll) */}
          {experience.map((item, idx) => {
            const isNodeReached = mobileReachedNodes[idx + 1];
            const isCurrentMobile = idx + 1 === activeMobileIndex;

            return (
              <div key={item.company} className={styles.mobileStationRow}>
                <div className={styles.mobileGrommetWrap}>
                  <div
                    className={`${styles.mobileGrommet} ${
                      isNodeReached ? styles.mobileGrommetActive : ""
                    }`}
                  >
                    <span className={styles.grommetNumber}>0{idx + 1}</span>
                  </div>
                </div>

                <div className={styles.mobileCardWrap}>
                  <motion.article
                    className={`${styles.mobileCard} ${
                      isCurrentMobile ? styles.mobileCardActive : ""
                    }`}
                    initial={{ opacity: 0, x: 30, scale: 0.96 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {/* Top Meta */}
                    <div className={styles.cardTopMeta}>
                      <span className={styles.cardPeriodBadge}>{item.period}</span>
                      <div className={styles.cardLocationBadge}>
                        <span>{item.countryCode || item.location}</span>
                        <span className={styles.locationPulseDot}>
                          <span className={styles.pulseRing} />
                          <span className={styles.pulseCore} />
                        </span>
                      </div>
                    </div>

                    {/* Company & Role */}
                    <div className={styles.cardTitles}>
                      <h3 className={styles.cardCompanyTitle}>{item.company}</h3>
                      <h4 className={styles.cardRoleSubtitle}>{item.role}</h4>
                    </div>

                    {/* Tech Stack */}
                    {item.tech && item.tech.length > 0 && (
                      <div className={styles.cardTechList}>
                        {item.tech.slice(0, 5).map((tech) => (
                          <span key={tech} className={styles.cardTechPill}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Narrative Overview */}
                    {item.overview && (
                      <p className={styles.cardOverview}>{item.overview}</p>
                    )}

                    {/* Highlights */}
                    <ul className={styles.cardHighlightsList}>
                      {item.achievements?.slice(0, 2).map((ach, aIdx) => (
                        <li key={aIdx} className={styles.highlightItem}>
                          <span className={styles.achievementArrow} aria-hidden="true">
                            →
                          </span>
                          <span className={styles.highlightText}>{ach}</span>
                        </li>
                      ))}

                      {item.bullets?.slice(0, 1).map((b, bIdx) => (
                        <li key={bIdx} className={styles.highlightItem}>
                          <span className={styles.bulletDot} aria-hidden="true">
                            •
                          </span>
                          <span className={styles.highlightText}>{b}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Footer */}
                    <div className={styles.cardFooterMeta}>
                      <span className={styles.cardStatusBadge}>
                        {item.type?.split("//")[0]?.trim() || "Milestone"}
                      </span>
                      <span className={styles.cardOrderNum}>
                        0{idx + 1} of 0{experience.length}
                      </span>
                    </div>
                  </motion.article>
                </div>
              </div>
            );
          })}

          {/* Mobile Station 06 (Outro) */}
          <div className={styles.mobileStationRow}>
            <div className={styles.mobileGrommetWrap}>
              <div
                className={`${styles.mobileGrommet} ${
                  mobileReachedNodes[experience.length + 1] ? styles.mobileGrommetActive : ""
                }`}
              >
                <span className={styles.grommetNumber}>06</span>
              </div>
            </div>

            <div className={styles.mobileCardWrap}>
              <motion.article
                className={styles.mobileOutroCard}
                initial={{ opacity: 0, x: 30, scale: 0.96 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className={styles.stationKicker}>05 // UP NEXT</span>
                <h3 className={styles.cardCompanyTitle}>Verified Credentials</h3>
                <div className={styles.stationPeriod}>Certifications &amp; Standards</div>
                <p className={styles.cardOverview}>
                  Deep-dive into verified industry credentials spanning MongoDB developer certifications, Oracle Cloud Infrastructure, Cambridge English, and GitHub Foundations.
                </p>
                <a
                  href="#credentials"
                  className={styles.credentialsButton}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("credentials")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <span>View Credentials</span>
                  <FiChevronRight aria-hidden="true" />
                </a>
              </motion.article>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
