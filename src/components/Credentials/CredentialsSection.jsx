"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { FiArrowUpRight, FiCheckCircle } from "react-icons/fi";
import styles from "./CredentialsSection.module.scss";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CREDENTIALS = [
  {
    id: "mongodb",
    name: "MongoDB Associate Developer",
    issuer: "MongoDB",
    issueDate: "2024",
    credentialType: "Developer Certification",
    verificationStatus: "Verified Credential",
    image: "/mongodb.svg",
    href: "/presume.pdf",
    description:
      "Certified competence in document data modeling, ACID transactions, aggregation pipelines, and high-throughput NoSQL database architecture.",
    competencies: ["Document Modeling", "Aggregations", "Query Optimization", "NoSQL Architecture"],
  },
  {
    id: "aviatrix",
    name: "Aviatrix Certified Engineer (ACE)",
    issuer: "Aviatrix",
    issueDate: "2024",
    credentialType: "Multicloud Network Associate",
    verificationStatus: "Verified Certificate",
    image: "/aviatrix-mark.png",
    href: "/Aviatrix.pdf",
    description:
      "Certified multi-cloud network design, enterprise transit routing, egress filtering, and secure hybrid cloud architecture across AWS, Azure, and GCP.",
    competencies: ["Multi-Cloud Networking", "Transit Routing", "Cloud Security", "Hybrid Infrastructure"],
  },
  {
    id: "salesforce",
    name: "Salesforce Developer Virtual Internship",
    issuer: "Salesforce",
    issueDate: "2024",
    credentialType: "Virtual Internship",
    verificationStatus: "Verified Credential",
    image: "/salesforce.png",
    href: "/Salesforce.pdf",
    description:
      "Architected enterprise cloud workflows, Apex triggers, Lightning Web Components, automated business processes, and secure role-based data models.",
    competencies: ["Apex Programming", "Lightning Components", "Process Automation", "Enterprise Cloud"],
  },
];

export default function CredentialsSection() {
  const containerRef = useRef(null);
  const topLineRef = useRef(null);
  const cardsRef = useRef([]);

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
        {CREDENTIALS.map((cert, index) => (
          <motion.a
            key={cert.id}
            ref={(el) => (cardsRef.current[index] = el)}
            href={cert.href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
            role="listitem"
            aria-label={`View ${cert.name} certificate issued by ${cert.issuer} (opens in new tab)`}
            whileTap={{ scale: 0.985 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
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
        ))}
      </div>
    </div>
  );
}
