"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { FiArrowUpRight, FiCheckCircle, FiChevronDown, FiAward } from "react-icons/fi";
import styles from "./CredentialsSection.module.scss";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const INITIAL_COUNT = 3;

const CATEGORIES = [
  { id: "all", label: "All Certifications" },
  { id: "cloud", label: "Cloud & DevOps" },
  { id: "api-db", label: "APIs & Databases" },
  { id: "simulations", label: "Industry Simulations" },
];

const CREDENTIALS = [
  {
    id: "aviatrix",
    name: "Multicloud Network Associate",
    issuer: "Aviatrix",
    category: "cloud",
    issueDate: "2024",
    credentialType: "Cloud Networking",
    verificationStatus: "Verified Associate",
    image: "/images/credentials/aviatrix.png",
    href: "https://www.credly.com/badges/f1a55f3c-0870-415b-9430-487367668831/linked_in_profile",
    description:
      "Validated mastery of multicloud networking architectures across AWS, Azure, and GCP, enterprise transit networking, and zero-trust cloud security controls.",
    competencies: ["Multicloud Transit", "Cloud Security", "VPC Architecture", "Enterprise Routing"],
  },
  {
    id: "postman",
    name: "Postman API Fundamentals Student Expert",
    issuer: "Postman",
    category: "api-db",
    issueDate: "2024",
    credentialType: "API Engineering",
    verificationStatus: "Student Expert",
    image: "/images/credentials/postman.svg",
    href: "https://api.badgr.io/public/assertions/awo5KuqOTWyiTJAE2Ph1fg",
    description:
      "Certified expertise in REST API design, automated test collections, pre-request scripting, payload authorization flows, and CI/CD API quality governance.",
    competencies: ["REST APIs", "Test Automation", "Scripting", "Collection Runs"],
  },
  {
    id: "mongodb",
    name: "Associate Developer Exam Node.js",
    issuer: "MongoDB",
    category: "api-db",
    issueDate: "2025",
    credentialType: "Associate Developer",
    verificationStatus: "Verified Developer",
    image: "/images/credentials/mongodb.svg",
    href: "https://learn.mongodb.com/c/eZQppECFQrWvTg_kzoa8iQ",
    description:
      "Demonstrated proficiency in building production Node.js applications with MongoDB, complex aggregation pipelines, schema validation, and high-performance indexing.",
    competencies: ["Node.js Driver", "Aggregation Framework", "Schema Design", "Index Optimization"],
  },
  {
    id: "automation-anywhere",
    name: "Advanced Automation Certification - 2024",
    issuer: "Automation Anywhere",
    category: "cloud",
    issueDate: "2024",
    credentialType: "Intelligent Automation",
    verificationStatus: "Advanced Certified",
    image: "/images/credentials/automationanywhere.svg",
    href: "https://certificates.automationanywhere.com/d8550976-47e8-419c-a163-bbcd49fd017d",
    description:
      "Advanced certification in developing autonomous RPA bots, cognitive automation pipelines, resilient exception handling frameworks, and enterprise process orchestrations.",
    competencies: ["Robotic Process Automation", "Bot Architecture", "Cognitive Automation", "Process Flow"],
  },
  {
    id: "neo4j",
    name: "Neo4j Certified Professional",
    issuer: "Neo4j",
    category: "api-db",
    issueDate: "2024",
    credentialType: "Graph Database",
    verificationStatus: "Certified Professional",
    image: "/images/credentials/neo4j.svg",
    href: "https://graphacademy.neo4j.com/c/15cb5619-53dd-4bcb-81cd-4c3a93368e80/",
    description:
      "Certified competence in graph data modeling, high-performance Cypher querying, graph traversals, and connected data knowledge graph architectures.",
    competencies: ["Cypher Queries", "Graph Data Modeling", "Knowledge Graphs", "Graph Traversals"],
  },
  {
    id: "gravitee",
    name: "Gravitee Event-native API Management Professional",
    issuer: "Gravitee.io",
    category: "api-db",
    issueDate: "2024",
    credentialType: "Event-Driven APIs",
    verificationStatus: "Professional Certificate",
    image: "/images/credentials/gravitee.svg",
    href: "https://www.credential.net/a87597fe-a091-427f-bf9d-7eaafd268f0c",
    description:
      "Validated mastery of event-driven API gateways, streaming protocols (Kafka, WebSockets), real-time API policy enforcement, and asynchronous ecosystem governance.",
    competencies: ["Event-Driven APIs", "API Gateway", "Kafka Integration", "Traffic Governance"],
  },
  {
    id: "gremlin",
    name: "GCCEP (Chaos Engineering Practitioner)",
    issuer: "Gremlin",
    category: "cloud",
    issueDate: "2024",
    credentialType: "Reliability & Chaos",
    verificationStatus: "Certified Practitioner",
    image: "/images/credentials/gremlin.svg",
    href: "https://credsverse.com/credentials/54a20676-000e-43a0-ad9f-edf2f0f3bb3b",
    description:
      "Demonstrated expertise in chaos engineering principles, controlled fault injection, system blast radius minimization, and high-availability resilience verification.",
    competencies: ["Chaos Engineering", "Fault Injection", "System Resilience", "Reliability SLA"],
  },
  {
    id: "apollo",
    name: "Graph Developer - Associate",
    issuer: "Apollo GraphQL",
    category: "api-db",
    issueDate: "2024",
    credentialType: "GraphQL Engineering",
    verificationStatus: "Certified Associate",
    image: "/images/credentials/apollo.svg",
    href: "https://www.apollographql.com/tutorials/certifications/f1a6e7ea-2ac8-4d4c-8aca-f2594c7de706",
    description:
      "Certified skills in architecting GraphQL schemas, Apollo Client/Server integration, custom type resolvers, and federated data graph architectures.",
    competencies: ["GraphQL Schemas", "Apollo Server", "Resolvers", "Federated Graphs"],
  },
  {
    id: "github",
    name: "GitHub Foundations",
    issuer: "GitHub / Microsoft",
    category: "cloud",
    issueDate: "2026",
    credentialType: "DevOps & Governance",
    verificationStatus: "Verified Credential",
    image: "/images/credentials/github.svg",
    href: "https://learn.microsoft.com/api/credentials/share/en-us/PRATYUSHKUMARPANDEY-9241/3242AFB2C42EC897?sharingId",
    description:
      "Certified proficiency in enterprise Git workflows, GitHub Actions CI/CD automation, code security auditing, branch governance, and open-source collaboration.",
    competencies: ["Git Workflows", "GitHub Actions CI/CD", "Security Auditing", "Collaboration"],
  },
  {
    id: "walmart",
    name: "Walmart USA – Advanced Software Engineering",
    issuer: "Walmart USA (Forage)",
    category: "simulations",
    issueDate: "2024",
    credentialType: "Systems Simulation",
    verificationStatus: "Verified Simulation",
    image: "/images/credentials/walmart.svg",
    href: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/prBZoAihniNijyD6d/oX6f9BbCL9kJDJzfg_prBZoAihniNijyD6d_jjktg2TZTAXnonpSy_1755283154993_completion_certificate.pdf",
    description:
      "Engineered scalable backend solutions, optimized relational database queries, implemented advanced heap data structures, and designed fault-tolerant microservices.",
    competencies: ["Advanced Data Structures", "Systems Architecture", "Relational Databases", "Microservices"],
  },
  {
    id: "tata",
    name: "Tata – GenAI Powered Data Analytics",
    issuer: "Tata (Forage)",
    category: "simulations",
    issueDate: "2024",
    credentialType: "GenAI & Analytics",
    verificationStatus: "Verified Simulation",
    image: "/images/credentials/tata.svg",
    href: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/ifobHAoMjQs9s6bKS/gMTdCXwDdLYoXZ3wG_ifobHAoMjQs9s6bKS_jjktg2TZTAXnonpSy_1755284448284_completion_certificate.pdf",
    description:
      "Synthesized business intelligence workflows leveraging generative AI, automated exploratory data analysis, and created executive storytelling dashboards.",
    competencies: ["Generative AI", "Exploratory Analytics", "Business Dashboards", "Executive Reporting"],
  },
  {
    id: "aws",
    name: "AWS – Solutions Architecture Simulation",
    issuer: "AWS (Forage)",
    category: "simulations",
    issueDate: "2024",
    credentialType: "Cloud Architecture",
    verificationStatus: "Verified Simulation",
    image: "/images/credentials/aws.svg",
    href: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/pmnMSL4QiQ9JCgE3W/kkE9HyeNcw6rwCRGw_pmnMSL4QiQ9JCgE3W_jjktg2TZTAXnonpSy_1755285255115_completion_certificate.pdf",
    description:
      "Architected highly available cloud hosting topologies, configured multi-region disaster recovery strategies, and applied cost-optimization architectures on AWS.",
    competencies: ["AWS Well-Architected", "High Availability", "Disaster Recovery", "Cloud Security"],
  },
  {
    id: "skyscanner",
    name: "Skyscanner – Front-End Software Engineering",
    issuer: "Skyscanner (Forage)",
    category: "simulations",
    issueDate: "2024",
    credentialType: "Front-End Simulation",
    verificationStatus: "Verified Simulation",
    image: "/images/credentials/skyscanner.svg",
    href: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/skoQmxqhtgWmKv2pm/km4rw7dihDr3etqom_skoQmxqhtgWmKv2pm_jjktg2TZTAXnonpSy_1755285540037_completion_certificate.pdf",
    description:
      "Developed accessible, high-performance UI components using modern React and Backpack design system tokens with automated responsive test suites.",
    competencies: ["React.js", "Design Systems", "Web Performance", "Accessibility (a11y)"],
  },
  {
    id: "accenture",
    name: "Accenture Nordics – Software Engineering",
    issuer: "Accenture (Forage)",
    category: "simulations",
    issueDate: "2024",
    credentialType: "Software Engineering",
    verificationStatus: "Verified Simulation",
    image: "/images/credentials/accenture.png",
    href: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/xhih9yFWsf6AYfngd/HNpZwZcuYwona2d8Y_xhih9yFWsf6AYfngd_jjktg2TZTAXnonpSy_1750088435166_completion_certificate.pdf",
    description:
      "Executed end-to-end software development lifecycle phases, implemented secure architecture designs, and created enterprise test automation suites.",
    competencies: ["SDLC", "Agile Engineering", "Code Refactoring", "Test Automation"],
  },
];

export default function CredentialsSection() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showAll, setShowAll] = useState(false);
  const containerRef = useRef(null);
  const topLineRef = useRef(null);
  const cardsRef = useRef([]);

  // Filter credentials by category
  const filteredCredentials = CREDENTIALS.filter(
    (cert) => selectedCategory === "all" || cert.category === selectedCategory
  );

  // Show only INITIAL_COUNT (3) unless showAll is true
  const visibleCredentials = showAll
    ? filteredCredentials
    : filteredCredentials.slice(0, INITIAL_COUNT);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setShowAll(false);
    setTimeout(() => {
      if (typeof window !== "undefined" && ScrollTrigger) {
        ScrollTrigger.refresh();
      }
    }, 250);
  };

  const handleToggleShowAll = () => {
    setShowAll((prev) => {
      const next = !prev;
      if (!next && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        if (rect.top < 0) {
          containerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
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
          });
        }
      });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 82%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      if (topLineRef.current) {
        tl.fromTo(
          topLineRef.current,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 1.0, ease: "power3.inOut" }
        );
      }

      const validCards = cardsRef.current.filter(Boolean);
      if (validCards.length > 0) {
        tl.fromTo(
          validCards,
          {
            opacity: 0,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.4"
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={styles.credentialsContainer}>
      {/* Decorative gradient line */}
      <div ref={topLineRef} className={styles.topDividerLine} aria-hidden="true" />

      {/* Category Navigation Pills */}
      <div className={styles.categoryBar} role="tablist" aria-label="Filter credentials by category">
        {CATEGORIES.map((cat) => {
          const count =
            cat.id === "all"
              ? CREDENTIALS.length
              : CREDENTIALS.filter((c) => c.category === cat.id).length;
          const isActive = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`${styles.categoryTab} ${isActive ? styles.categoryTabActive : ""}`}
              onClick={() => handleCategorySelect(cat.id)}
            >
              <span>{cat.label}</span>
              <span className={styles.categoryCount}>{count}</span>
            </button>
          );
        })}
      </div>

      {/* Credential Cards Grid */}
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
                layout
                initial={isExpandable ? { opacity: 0, y: 25, scale: 0.97 } : false}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.97 }}
                transition={{
                  duration: 0.38,
                  ease: [0.22, 1, 0.36, 1],
                  delay: isExpandable ? Math.min((index - INITIAL_COUNT) * 0.04, 0.35) : 0,
                }}
                whileTap={{ scale: 0.985 }}
              >
                {/* Top gradient border highlight */}
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
                  <span className={styles.footerLinkText}>Verify Credential</span>
                  <span className={styles.footerLinkIconWrap} aria-hidden="true">
                    <FiArrowUpRight className={styles.cardActionIcon} />
                  </span>
                </div>
              </motion.a>
            );
          })}
        </AnimatePresence>
      </div>

      {/* View More / Show Less Toggle */}
      {filteredCredentials.length > INITIAL_COUNT && (
        <div className={styles.viewMoreContainer}>
          <div className={styles.viewMoreStatusPill} aria-live="polite">
            <span className={styles.statusPulseDot} aria-hidden="true" />
            <span>
              {showAll
                ? `Showing all ${filteredCredentials.length} verified credentials`
                : `Showing 3 of ${filteredCredentials.length} verified credentials`}
            </span>
          </div>

          <button
            type="button"
            className={`${styles.viewMoreButton} ${showAll ? styles.viewMoreButtonExpanded : ""}`}
            onClick={handleToggleShowAll}
            aria-expanded={showAll}
            aria-label={
              showAll
                ? "Show fewer certifications"
                : `View all ${filteredCredentials.length} certifications`
            }
          >
            <span className={styles.viewMoreDot} aria-hidden="true" />
            <span className={styles.viewMoreLabel}>
              {showAll
                ? "Show Fewer Certifications"
                : `View All Certifications (${filteredCredentials.length})`}
            </span>
            {!showAll && (
              <span className={styles.remainingBadge}>
                +{filteredCredentials.length - INITIAL_COUNT} more
              </span>
            )}
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
