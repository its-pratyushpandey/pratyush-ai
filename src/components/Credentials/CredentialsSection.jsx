"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { FiArrowUpRight, FiCheckCircle, FiChevronDown } from "react-icons/fi";
import styles from "./CredentialsSection.module.scss";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const INITIAL_COUNT = 3;

const CREDENTIALS = [
  {
    id: "mongodb",
    name: "MongoDB Certified Developer – Associate",
    issuer: "MongoDB",
    issueDate: "2025",
    credentialType: "Associate Developer",
    verificationStatus: "Verified Credential",
    image: "/mongodb.svg",
    href: "/presume.pdf",
    description:
      "Certified competence in document data modeling, ACID transactions, aggregation pipelines, and high-throughput NoSQL database architecture.",
    competencies: ["Document Modeling", "Aggregations", "Query Optimization", "NoSQL Architecture"],
  },
  {
    id: "oracle",
    name: "Oracle Cloud Infrastructure Certified Developer Professional",
    issuer: "Oracle",
    issueDate: "2025",
    credentialType: "Cloud Professional",
    verificationStatus: "Verified Professional",
    image: "/aviatrix-mark.png",
    href: "/presume.pdf",
    description:
      "Certified in cloud-native development, containerized microservices, serverless functions, CI/CD automation, and secure enterprise infrastructure.",
    competencies: ["Cloud Architecture", "Containerization", "Microservices", "Cloud Security"],
  },
  {
    id: "cambridge",
    name: "Cambridge Linguaskill English Certification",
    issuer: "Cambridge",
    issueDate: "2024",
    credentialType: "Language Proficiency",
    verificationStatus: "Verified Certification",
    image: "/images/background.jpg",
    href: "/presume.pdf",
    description:
      "Certified professional English communication proficiency with top-tier technical writing, global team coordination, and executive presentation fluency.",
    competencies: ["Technical Writing", "Global Communication", "Executive Presentations", "Collaboration"],
  },
  {
    id: "github",
    name: "GitHub Foundations",
    issuer: "GitHub",
    issueDate: "2026",
    credentialType: "Developer Certification",
    verificationStatus: "Verified Credential",
    image: "/images/background2.jpg",
    href: "/presume.pdf",
    description:
      "Certified proficiency in modern Git workflows, GitHub Actions CI/CD pipelines, repository governance, pull-request architectures, and open-source collaboration.",
    competencies: ["Git Workflows", "GitHub Actions CI/CD", "Security & Auditing", "Collaboration"],
  },
];

export default function CredentialsSection() {
  const [showAll, setShowAll] = useState(false);
  const containerRef = useRef(null);
  const topLineRef = useRef(null);
  const cardsRef = useRef([]);

  const visibleCredentials = showAll ? CREDENTIALS : CREDENTIALS.slice(0, INITIAL_COUNT);

  const handleToggleShowAll = () => {
    setShowAll((prev) => {
      const next = !prev;
      setTimeout(() => {
        if (typeof window !== "undefined" && ScrollTrigger) {
          ScrollTrigger.refresh();
        }
      }, 350);
      return next;
    });
  };

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      if (topLineRef.current) gsap.set(topLineRef.current, { scaleX: 1, opacity: 1 });
      cardsRef.current.forEach((card) => {
        if (card) {
          gsap.set(card, {
            opacity: 1,
            y: 0,
            clipPath: "inset(0% 0% 0% 0% round 20px)",
          });
        }
      });
      return;
    }

    const ctx = gsap.context(() => {
      // Coordinated section-level ScrollTrigger reveal for cards
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 82%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      // 1. Thin decorative gradient line across the top
      if (topLineRef.current) {
        tl.fromTo(
          topLineRef.current,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 1.0, ease: "power3.inOut" }
        );
      }

      // 2. Staggered credential cards entrance (opacity, upward motion, clipping)
      const validCards = cardsRef.current.filter(Boolean);
      if (validCards.length > 0) {
        tl.fromTo(
          validCards,
          {
            opacity: 0,
            y: 45,
            clipPath: "inset(12% 0% 0% 0% round 20px)",
          },
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0% 0% 0% 0% round 20px)",
            duration: 0.85,
            stagger: 0.14,
            ease: "power3.out",
            clearProps: "clipPath",
          },
          "-=0.5"
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={styles.credentialsContainer}>
      {/* Thin decorative gradient line across the top of the cards */}
      <div ref={topLineRef} className={styles.topDividerLine} aria-hidden="true" />

      {/* Staggered Credential Cards Grid */}
      <div className={styles.cardsGrid} role="list">
        <AnimatePresence mode="sync">
          {visibleCredentials.map((cert, index) => {
            const isExpandable = index >= INITIAL_COUNT;
            return (
              <motion.a
                key={cert.id}
                ref={(el) => (cardsRef.current[index] = el)}
                href={cert.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.card}
                role="listitem"
                aria-label={`View ${cert.name} certificate issued by ${cert.issuer} (opens in new tab)`}
                initial={isExpandable ? { opacity: 0, y: 30, scale: 0.96 } : false}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.96 }}
                transition={{
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                  delay: isExpandable ? (index - INITIAL_COUNT) * 0.08 : 0,
                }}
                whileTap={{ scale: 0.985 }}
              >
                {/* Top gradient border highlight (animates on hover) */}
                <span className={styles.cardTopBorder} aria-hidden="true" />

                {/* Card Header: Brand Logo + Verified Badge */}
                <div className={styles.cardHeader}>
                  <div className={styles.logoContainer}>
                    <img
                      src={cert.image}
                      alt={`${cert.issuer} logo`}
                      className={styles.logoImg}
                      loading="lazy"
                    />
                  </div>

                  {/* Verified Status Pill */}
                  <div className={styles.badgePill}>
                    <FiCheckCircle className={styles.badgeIcon} aria-hidden="true" />
                    <span>{cert.verificationStatus}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className={styles.cardContent}>
                  <div className={styles.cardMetaRow}>
                    <span className={styles.issuerTag}>
                      {cert.issuer} {"//"} {cert.issueDate}
                    </span>
                    <span className={styles.typeTag}>{cert.credentialType}</span>
                  </div>

                  <h3 className={styles.cardTitle}>{cert.name}</h3>

                  <p className={styles.cardDescription}>{cert.description}</p>

                  {/* Technical Competency Tags */}
                  <div className={styles.tagList} aria-label="Core competencies">
                    {cert.competencies.map((tag) => (
                      <span key={tag} className={styles.competencyTag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer Action Bar */}
                <div className={styles.cardFooter}>
                  <span className={styles.footerLinkText}>View Certificate Document</span>
                  <span className={styles.footerLinkIconWrap} aria-hidden="true">
                    <FiArrowUpRight className={styles.cardActionIcon} />
                  </span>
                </div>
              </motion.a>
            );
          })}
        </AnimatePresence>
      </div>

      {/* View More / Show Less Action Control (if more than 3 certifications) */}
      {CREDENTIALS.length > INITIAL_COUNT && (
        <div className={styles.viewMoreContainer}>
          <button
            type="button"
            className={styles.viewMoreButton}
            onClick={handleToggleShowAll}
            aria-expanded={showAll}
            aria-label={
              showAll
                ? "Show fewer certifications"
                : `View ${CREDENTIALS.length - INITIAL_COUNT} more certifications`
            }
          >
            <span className={styles.viewMoreDot} aria-hidden="true" />
            <span>
              {showAll
                ? "Show Less"
                : `View More Certifications (+${CREDENTIALS.length - INITIAL_COUNT})`}
            </span>
            <FiChevronDown
              className={`${styles.viewMoreChevron} ${showAll ? styles.viewMoreChevronOpen : ""}`}
              aria-hidden="true"
            />
          </button>
        </div>
      )}
    </div>
  );
}
