"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import styles from "./KineticDropHeadline.module.scss";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Interactive Word component with magnetic cursor following & active wave floating on hold
 */
function KineticWord({
  word,
  wordIndex,
  isGradient,
  letterRefs,
  letterIndexStart,
}) {
  const wordRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const quickX = useRef(null);
  const quickY = useRef(null);
  const quickRot = useRef(null);

  useEffect(() => {
    if (!wordRef.current) return;
    quickX.current = gsap.quickTo(wordRef.current, "x", { duration: 0.38, ease: "power2.out" });
    quickY.current = gsap.quickTo(wordRef.current, "y", { duration: 0.38, ease: "power2.out" });
    quickRot.current = gsap.quickTo(wordRef.current, "rotate", { duration: 0.38, ease: "power2.out" });
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseMove = (e) => {
    if (!wordRef.current || !quickX.current) return;
    const rect = wordRef.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);

    quickX.current(relX * 0.22);
    quickY.current(relY * 0.22);
    quickRot.current(relX * 0.035);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (quickX.current) quickX.current(0);
    if (quickY.current) quickY.current(0);
    if (quickRot.current) quickRot.current(0);
  };

  const handleLetterHover = (el) => {
    if (!el) return;
    gsap.fromTo(
      el,
      { scale: 1.12, y: -5 },
      { scale: 1, y: 0, duration: 0.45, ease: "elastic.out(1.2, 0.35)" }
    );
  };

  const chars = word.split("");

  return (
    <span
      ref={wordRef}
      className={styles.wordBlock}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <span className={`${styles.wordFloatWrap} ${isHovered ? styles.wordHovered : ""}`}>
        {chars.map((char, cIdx) => {
          const globalIdx = letterIndexStart + cIdx;
          return (
            <span
              key={`${char}-${cIdx}`}
              ref={(el) => {
                if (letterRefs.current) {
                  letterRefs.current[globalIdx] = el;
                }
              }}
              className={styles.letterWrapper}
            >
              <span
                className={`${styles.letterInner} ${
                  isGradient ? styles.letterGradient : styles.letterSolid
                }`}
                style={{
                  animationDelay: `${cIdx * 0.08}s`,
                }}
                onMouseEnter={(e) => handleLetterHover(e.currentTarget)}
              >
                {char}
              </span>
            </span>
          );
        })}
      </span>
    </span>
  );
}

export default function KineticDropHeadline({
  line1 = "Architecting scalable systems,",
  line2 = "crafting intelligent products.",
  gradientWords = ["crafting", "intelligent", "products."],
  className = "",
  pinTriggerRef,
  groundLineRef,
}) {
  const containerRef = useRef(null);
  const internalGroundRef = useRef(null);
  const letterRefs = useRef([]);
  const spotlightRef = useRef(null);

  const line1Words = useMemo(() => line1.split(" ").filter(Boolean), [line1]);
  const line2Words = useMemo(() => line2.split(" ").filter(Boolean), [line2]);

  // Compute character offset indices
  const wordMeta = useMemo(() => {
    let count = 0;
    const l1 = line1Words.map((w) => {
      const start = count;
      count += w.length;
      return { word: w, start, isLine2: false };
    });
    const l2 = line2Words.map((w) => {
      const start = count;
      count += w.length;
      return { word: w, start, isLine2: true };
    });
    return { l1, l2, totalLetters: count };
  }, [line1Words, line2Words]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const triggerEl = pinTriggerRef?.current || containerRef.current;
    if (!triggerEl) return;

    const isMobile = window.innerWidth <= 768 || (window.matchMedia && window.matchMedia('(pointer: coarse)').matches);
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let refreshTimer;

    const ctx = gsap.context(() => {
      const letterEls = letterRefs.current.filter(Boolean);
      const groundShelvesEl = groundLineRef?.current || internalGroundRef.current;
      const containerEl = containerRef.current;
      if (!letterEls.length || !containerEl) return;

      // On mobile / reduced motion, keep letters cleanly legible in place with no 1100px pin trap
      if (isMobile || prefersReducedMotion) {
        gsap.set(letterEls, {
          opacity: 1,
          y: 0,
          x: 0,
          rotateX: 0,
          rotateY: 0,
          rotateZ: 0,
          scale: 1,
        });
        return;
      }

      if (!groundShelvesEl) return;

      const containerRect = containerEl.getBoundingClientRect();
      const groundRect = groundShelvesEl.getBoundingClientRect();
      const groundBaseY = groundRect.top - containerRect.top;
      const containerW = containerRect.width;

      // Letters start 100% visible in home position (y: 0, opacity: 1)
      gsap.set(letterEls, {
        opacity: 1,
        y: 0,
        x: 0,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        scale: 1,
        transformOrigin: "50% 80%",
      });

      // Calculate 3 architectural ground tiers
      // Distribute all 56 letters across 3 tiers with generous horizontal spacing!
      const rowsCount = 3;
      const rowHeight = 44; // Vertical tier spacing matching CSS shelfTracks gap
      const hPadding = Math.min(24, containerW * 0.03);
      const usableW = Math.max(containerW - hPadding * 2, 320);

      const totalLetters = letterEls.length; // 56
      const colsPerRow = Math.ceil(totalLetters / rowsCount); // 19

      const landingSlots = [];
      for (let i = 0; i < totalLetters; i++) {
        const row = i % rowsCount; // 0, 1, 2
        const col = Math.floor(i / rowsCount); // 0 to 18
        const colStep = usableW / Math.max(colsPerRow - 1, 1);

        // Stagger alternate rows horizontally for clean architectural brick spacing
        const staggerX = (row % 2) * (colStep * 0.35);
        const targetX = hPadding + col * colStep + staggerX;
        // Tier 0 is upper, Tier 1 is mid, Tier 2 is bottom base
        const targetY = groundBaseY + row * rowHeight + 14;

        landingSlots.push({ x: targetX, y: targetY });
      }

      // Generate deterministic coprime departure order so letters drop individually
      // (NO combos of 2 or 3 letters dropping together!)
      const departureOrder = [];
      const step = 29; // 29 is coprime to 56
      let curr = 17;
      for (let k = 0; k < totalLetters; k++) {
        departureOrder.push(curr);
        curr = (curr + step) % totalLetters;
      }

      // Map each letter index to its unique departure rank (0 to 55)
      const departureRank = {};
      departureOrder.forEach((letterIdx, rank) => {
        departureRank[letterIdx] = rank;
      });

      // Pinned ScrollTrigger timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerEl,
          start: "top 8%", // Pinned cleanly when top of intro reaches near top of screen
          end: "+=1100", // Pinned for 1100px of scroll
          pin: true,
          pinSpacing: true,
          scrub: 0.75,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // 1. Plateau interval (Time 0.0 to 1.0)
      // Letters remain assembled, readable, and 100% visible immediately.
      // User can hover and interact with words.

      // 2. Individual Letter Drops (Time 1.0 to 8.4)
      // Every single letter drops with its own unique departure time & unique animation style!
      letterEls.forEach((el, i) => {
        const elRect = el.getBoundingClientRect();
        const startX = elRect.left - containerRect.left;
        const startY = elRect.top - containerRect.top;

        const targetSlot = landingSlots[i];
        // Exact delta to place letter in its dedicated shelf slot (no overlapping!)
        const deltaX = targetSlot.x - startX;
        const deltaY = targetSlot.y - startY;

        // Individualized departure rank (strictly one-by-one, no combos!)
        const rank = departureRank[i] ?? i;
        const startTime = 1.0 + rank * 0.11; // Staggered from 1.0s to 7.05s

        // 6 distinct drop personality styles assigned deterministically
        const style = (i * 7 + 3) % 6;
        let rotZ = 0;
        let rotX = 14;
        let ease = "power2.inOut";
        let duration = 2.0;

        if (style === 0) {
          // Style 0: Heavy gravity plunge
          rotZ = -12;
          rotX = 22;
          ease = "power3.in";
          duration = 1.7;
        } else if (style === 1) {
          // Style 1: Clockwise tumble
          rotZ = 16;
          rotX = 18;
          ease = "power2.inOut";
          duration = 2.0;
        } else if (style === 2) {
          // Style 2: Counter-clockwise tumble
          rotZ = -16;
          rotX = 16;
          ease = "power2.inOut";
          duration = 2.0;
        } else if (style === 3) {
          // Style 3: Floating leaf flutter
          rotZ = 0;
          rotX = 10;
          ease = "sine.inOut";
          duration = 2.3;
        } else if (style === 4) {
          // Style 4: Spring pop and drop
          rotZ = 10;
          rotX = 20;
          ease = "back.in(1.2)";
          duration = 1.9;
        } else {
          // Style 5: Diagonal glider
          rotZ = -8;
          rotX = 15;
          ease = "power2.in";
          duration = 1.8;
        }

        tl.to(
          el,
          {
            x: deltaX,
            y: deltaY,
            rotateZ: rotZ,
            rotateX: rotX,
            scale: 0.44, // Perfectly sized for ample spacing across shelves
            opacity: 0.95, // Clearly visible on shelf
            ease,
            duration,
          },
          startTime
        );
      });

      // 3. Settled on Ground Interval (Time 8.4 to 10.4)
      // All 56 letters sit beautifully separated in their assigned tier slots!
      // User scrolls through this interval and clearly admires the organized, attractive layout.

      // 4. Pin Releases at 11.0
      // Page resumes normal scrolling down into the rest of the section (marquee, domain 1, etc.)!
      // When scrolling back UP, every letter reverses its unique path and joins back into the words!

      refreshTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
    }, triggerEl);

    return () => {
      if (refreshTimer) clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, [wordMeta, pinTriggerRef, groundLineRef]);

  // Ambient spotlight following cursor via direct DOM ref (0 React re-renders)
  const handleMouseMove = (e) => {
    if (!containerRef.current || !spotlightRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    spotlightRef.current.style.background = `radial-gradient(420px circle at ${x}px ${y}px, rgba(79, 86, 214, 0.12), transparent 70%)`;
    spotlightRef.current.style.opacity = '1';
  };

  const handleMouseLeave = () => {
    if (spotlightRef.current) {
      spotlightRef.current.style.opacity = '0';
    }
  };

  return (
    <div
      ref={containerRef}
      className={`${styles.kineticHeadlineWrap} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Ambient electric blueprint cursor spotlight */}
      <div
        ref={spotlightRef}
        className={styles.ambientSpotlight}
        aria-hidden="true"
      />

      {/* Kinetic Headline */}
      <h2
        className={styles.kineticHeadline}
        aria-label={`${line1} ${line2}`}
      >
        {/* Line 1: Architecting scalable systems, */}
        <span className={styles.line} aria-hidden="true">
          {wordMeta.l1.map((item, idx) => (
            <KineticWord
              key={`l1-${item.word}-${idx}`}
              word={item.word}
              wordIndex={idx}
              isGradient={false}
              letterRefs={letterRefs}
              letterIndexStart={item.start}
            />
          ))}
        </span>

        {/* Line 2: crafting intelligent products. */}
        <span className={styles.line} aria-hidden="true">
          {wordMeta.l2.map((item, idx) => (
            <KineticWord
              key={`l2-${item.word}-${idx}`}
              word={item.word}
              wordIndex={idx}
              isGradient={true}
              letterRefs={letterRefs}
              letterIndexStart={item.start}
            />
          ))}
        </span>
      </h2>

      {/* 3-Tier Architectural Ground Shelves (Where letters land with generous spacing) */}
      <div
        ref={internalGroundRef}
        className={styles.groundShelves}
        aria-hidden="true"
      >
        <div className={styles.shelfHeader}>
          <div className={styles.shelfDatum}>
            <span className={styles.datumIndicator} />
            <span>ELEVATION 0.00m // ARCHITECTURAL GLYPH BASELINES</span>
          </div>
          <div className={styles.shelfMeta}>
            <span className={styles.shelfBadge}>56 INDEPENDENT BLOCKS</span>
            <span>[3 DATUM TIERS]</span>
          </div>
        </div>

        <div className={styles.shelfTracks}>
        </div>
      </div>
    </div>
  );
}
