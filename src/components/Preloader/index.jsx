'use client';
import styles from './style.module.scss';
import { useEffect, useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { opacity, slideUp } from './anim';

const words = [
    { text: "Namaste", tag: "WELCOME" },
    { text: "Code", tag: "ARCHITECTURE" },
    { text: "Build", tag: "FULL-STACK" },
    { text: "Intelligence", tag: "AI & AGENTS" },
    { text: "Design", tag: "INTERACTION" },
    { text: "Deploy", tag: "CLOUD SCALE" },
    { text: "Innovate", tag: "CRAFT" },
    { text: "Pratyush.", tag: "PORTFOLIO '26" }
];

// Tailored reading delays per word (ms)
const wordDelays = [380, 300, 300, 340, 300, 300, 300, 580];

export default function Preloader({ onFinish }) {
    const [index, setIndex] = useState(0);
    const [dimension, setDimension] = useState({ width: 0, height: 0 });
    const finishedRef = useRef(false);

    const handleSkip = useCallback(() => {
        if (!finishedRef.current) {
            finishedRef.current = true;
            if (onFinish) onFinish();
        }
    }, [onFinish]);

    useEffect(() => {
        const updateDimension = () => {
            setDimension({ width: window.innerWidth, height: window.innerHeight });
        };
        updateDimension();
        window.addEventListener('resize', updateDimension);
        return () => window.removeEventListener('resize', updateDimension);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.code === 'Space' || e.key === 'Escape' || e.key === 'Enter') {
                handleSkip();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleSkip]);

    useEffect(() => {
        if (index === words.length - 1) {
            const finishTimer = setTimeout(() => {
                handleSkip();
            }, 360);
            return () => clearTimeout(finishTimer);
        }

        const delay = wordDelays[index] || 300;
        const timeout = setTimeout(() => {
            setIndex((prev) => prev + 1);
        }, delay);
        return () => clearTimeout(timeout);
    }, [index, handleSkip]);

    const progress = Math.min(100, Math.round(((index + 1) / words.length) * 100));

    const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height} L0 0`;
    const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height} L0 0`;

    const curve = {
        initial: {
            d: initialPath,
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] }
        },
        exit: {
            d: targetPath,
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.15 }
        }
    };

    return (
        <motion.div
            variants={slideUp}
            initial="initial"
            exit="exit"
            className={styles.introduction}
            onClick={handleSkip}
            title="Click anywhere to skip"
            role="button"
            tabIndex={0}
            aria-label="Skip introduction animation"
        >
            <div className={styles.ambientGlow} aria-hidden="true" />
            <div className={styles.ambientVignette} aria-hidden="true" />
            <div className={styles.gridOverlay} aria-hidden="true" />

            {dimension.width > 0 && (
                <>
                    <motion.div
                        variants={opacity}
                        initial="initial"
                        animate="enter"
                        exit="exit"
                        className={styles.topBar}
                    >
                        <div className={styles.topIdentity}>
                            <span className={styles.topStatusDot} />
                            <span className={styles.topNameDesktop}>PRATYUSH KUMAR PANDEY</span>
                            <span className={styles.topNameMobile}>PRATYUSH PANDEY</span>
                        </div>
                        <div className={styles.topMeta}>
                            <span className={styles.topMetaInit}>SYS.INIT</span>
                            <span className={styles.topDivider}>//</span>
                            <span>EDITION 2026</span>
                        </div>
                    </motion.div>

                    <motion.div
                        variants={opacity}
                        initial="initial"
                        animate="enter"
                        exit="exit"
                        className={styles.centerStage}
                    >
                        <div className={styles.tagPill}>
                            <span className={styles.pulseDot} />
                            <motion.span
                                key={`tag-${index}`}
                                initial={{ opacity: 0, y: 3 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.14, ease: 'easeOut' }}
                                className={styles.tagText}
                            >
                                {words[index].tag}
                            </motion.span>
                        </div>

                        <div className={styles.wordWrapper}>
                            <span className={styles.bullet} />
                            <motion.span
                                key={`word-${index}`}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
                                className={styles.wordText}
                            >
                                {words[index].text}
                            </motion.span>
                        </div>
                    </motion.div>

                    <motion.div
                        variants={opacity}
                        initial="initial"
                        animate="enter"
                        exit="exit"
                        className={styles.bottomBar}
                    >
                        <div className={styles.progressTrack}>
                            <motion.div
                                className={styles.progressFill}
                                initial={{ width: "0%" }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                            />
                        </div>
                        <div className={styles.bottomMeta}>
                            <div className={styles.metaStatus}>
                                <span>INITIALIZING EXPERIENCE</span>
                                <span className={styles.skipPrompt}>[ CLICK ANYWHERE TO SKIP ]</span>
                            </div>
                            <strong className={styles.percentage}>
                                {String(progress).padStart(3, '0')}%
                            </strong>
                        </div>
                    </motion.div>

                    <svg>
                        <motion.path variants={curve} initial="initial" exit="exit"></motion.path>
                    </svg>
                </>
            )}
        </motion.div>
    );
}
