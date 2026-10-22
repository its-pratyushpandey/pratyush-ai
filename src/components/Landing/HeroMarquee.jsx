'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from './HeroMarquee.module.scss';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const phraseSequence = [
  'Software Developer',
  'Full Stack Developer',
  'AI Builder',
  'Software Developer',
  'Full Stack Developer',
  'AI Builder',
];

function PhraseBlock({ blockRef }) {
  return (
    <div ref={blockRef} className={styles.phraseBlock}>
      {phraseSequence.map((phrase, index) => (
        <span key={index} className={styles.phraseItem}>
          <span className={styles.marqueeText}>{phrase}</span>
          <span className={styles.dashSeparator} aria-hidden="true">
            —
          </span>
        </span>
      ))}
    </div>
  );
}

const entranceVariants = {
  hidden: {
    y: 110,
    opacity: 0,
    scale: 0.95,
    filter: 'blur(12px)',
  },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 1.25,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.25,
    },
  },
};

export default function HeroMarquee({ isLoading = false }) {
  const containerRef = useRef(null);
  const sliderRef = useRef(null);
  const block1Ref = useRef(null);
  const block2Ref = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let xPercent = 0;
    let direction = -1; // -1 = moves leftwards (natural reading flow)
    const verySlowSpeed = 0.45; // Very slow, calm, elegant ambient drift (% per second)
    let animId = null;
    let isVisible = true;
    let lastTime = performance.now();

    // Pause RAF loop when hero is scrolled out of view to preserve resources
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          lastTime = performance.now();
        }
      },
      { threshold: 0 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const render = (now) => {
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      if (isVisible && block1Ref.current && block2Ref.current) {
        if (xPercent <= -100) {
          xPercent = 0;
        } else if (xPercent > 0) {
          xPercent = -100;
        }

        gsap.set(block1Ref.current, { xPercent });
        gsap.set(block2Ref.current, { xPercent });

        xPercent += verySlowSpeed * delta * direction;
      }
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    // GSAP ScrollTrigger for responsive scroll interaction
    const ctx = gsap.context(() => {
      // 1. Horizontal scrub driven by scrolling down or up
      gsap.to(sliderRef.current, {
        scrollTrigger: {
          trigger: document.documentElement,
          start: 0,
          end: () => window.innerHeight * 1.5,
          scrub: 1.2, // Silk-smooth scrub response
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Respect scroll direction:
            // scrolling down (self.direction === 1) -> moves left (-1)
            // scrolling up (self.direction === -1) -> moves right (1)
            direction = self.direction === 1 ? -1 : 1;
          },
        },
        x: () => (window.innerWidth < 768 ? '-250px' : '-650px'),
        ease: 'none',
      });

      // 2. Parallax depth & smooth exit as user approaches the About section
      gsap.to(containerRef.current, {
        scrollTrigger: {
          trigger: document.documentElement,
          start: () => window.innerHeight * 0.45,
          end: () => window.innerHeight * 1.2,
          scrub: 0.8,
        },
        y: 70,
        opacity: 0.08,
        scale: 0.96,
        ease: 'power2.out',
      });
    }, containerRef);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      observer.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className={styles.heroMarqueeContainer}
      variants={entranceVariants}
      initial="hidden"
      animate={isLoading ? 'hidden' : 'visible'}
      aria-label="Software Developer — Full Stack Developer — AI Builder"
    >
      <div ref={sliderRef} className={styles.sliderTrack}>
        <PhraseBlock blockRef={block1Ref} />
        <PhraseBlock blockRef={block2Ref} />
      </div>
    </motion.div>
  );
}
