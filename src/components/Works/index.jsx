'use client';
import React, { useEffect, useRef, forwardRef } from 'react';
import styles from './style.module.scss';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import Rounded from '../../common/RoundedButton';
import Magnetic from '../../common/Magnetic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

const ForwardedMotionSection = React.forwardRef((props, ref) => (
  <motion.section ref={ref} {...props} />
));

export default function Works() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Animate section headers
    const sectionHeaders = document.querySelectorAll('.sectionHeader');
    if (sectionHeaders.length > 0) {
      gsap.fromTo(
        sectionHeaders,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.sectionHeader',
            start: 'top 80%',
          },
        }
      );
    }

    // Animate project cards
    const projectCards = document.querySelectorAll('.projectCard');
    if (projectCards.length > 0) {
      gsap.fromTo(
        projectCards,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: '.projectsGrid',
            start: 'top 80%',
          },
        }
      );
    }

    // Background color animation for all sections
    const sections = document.querySelectorAll('section');
    if (sections.length > 0) {
      const colors = [
        { background: '#1a1a1a', color: '#ffffff' },
        { background: '#ffffff', color: '#000000' },
        { background: '#f5f5f5', color: '#333333' },
        { background: '#e3f2fd', color: '#201d66' },
        { background: '#d1c4e9', color: '#4a148c' },
      ];

      sections.forEach((section, index) => {
        const colorIndex = index % colors.length;
        gsap.to(section, {
          backgroundColor: colors[colorIndex].background,
          color: colors[colorIndex].color,
          scrollTrigger: {
            trigger: section,
            start: 'top center',
          },
        });
      });
    }
  }, []);

  // Section titles data
  const sectionTitles = {
    selectedWorks: ["SELECTED", "WORKS"],
    howICanHelp: ["HOW I CAN", "HELP YOU"],
    aboutMe: ["DESIGNER,", "DEVELOPER,", "CREATOR"]
  };

  // Services data
  const services = [
    {
      id: "01",
      title: "Web Development",
      description: [
        "A website developed to captivate and convert can elevate",
        "your brand to new heights. My custom-coded sites",
        "are meticulously crafted to reflect your unique identity,",
        "delivering seamless experiences with a focus on animation."
      ],
      offerings: [
        { id: "01", name: "CMS Integration" },
        { id: "02", name: "Motion & Animations" },
        { id: "03", name: "3D Development" }
      ]
    },
    {
      id: "02", 
      title: "Web Design",
      description: [
        "Amplify your online presence with a website that truly",
        "connects with your audience's feelings and desires. I",
        "design stunning, high-converting sites that align with your",
        "business goals, helping you stand out and scale effectively."
      ],
      offerings: [
        { id: "01", name: "Responsive Design" },
        { id: "02", name: "Wireframing" },
        { id: "03", name: "UX Writing" }
      ]
    },
    {
      id: "03",
      title: "SEO & Optimization", 
      description: [
        "Your website deserves to be seen. I optimize your",
        "online presence to elevate your visibility in search",
        "results, helping your business attract the right",
        "audience and stand out in the digital landscape."
      ],
      offerings: [
        { id: "01", name: "Technical SEO" },
        { id: "02", name: "On-Page Optimization" },
        { id: "03", name: "SEO Audits & Analysis" }
      ]
    }
  ];

  // Projects data
  const projects = [
    {
      id: "01",
      category: "Architecture & Engineering", 
      title: "C2 Montreal",
      year: "2024",
      tags: ["DESIGN", "DEVELOPMENT"],
      image: "/images/c2montreal.png"
    },
    {
      id: "02",
      category: "Technology & Creative",
      title: "Office Studio", 
      year: "2024",
      tags: ["DESIGN", "DEVELOPMENT"],
      image: "/images/officestudio.png"
    },
    {
      id: "03",
      category: "Motion & Interactive",
      title: "Locomotive",
      year: "2024", 
      tags: ["DESIGN", "DEVELOPMENT"],
      image: "/images/locomotive.png"
    },
    {
      id: "04",
      category: "Creative & Digital",
      title: "Silencio",
      year: "2023",
      tags: ["DESIGN", "DEVELOPMENT"], 
      image: "/images/silencio.png"
    }
  ];

  // About me content
  const aboutMeContent = [
    "I am a third-year B.Tech student in Computer Science and Engineering at KL University, India, with a strong interest in full-stack and cross-platform development. I have hands-on experience in modern technologies including React, React Native, Next.js, Express.js, TypeScript, Django, and Spring Boot.",
    "",
    "I specialize in web and app development, supported by a strong foundation in data structures, algorithms, and system design, with a focus on building efficient and user-centric solutions.",
    "",
    "Outside of academics and technology, I pursue creative and recreational interests that contribute to a balanced lifestyle. I’m passionate about cricket and running, which help build discipline and focus, while music serves as a source of relaxation and inspiration in my day-to-day routine."
  ];

  // Intro paragraphs
  const introParagraphs = {
    services: [
      "Frustrated with websites that don't reflect your brand or",
      "drive growth? I craft premium web experiences that captivate and", 
      "help you focus on growing your business."
    ],
    projects: [
      "Featured projects that have been meticulously crafted with",
      "passion to drive results and create lasting impact."
    ],
    about: [
      "With a passion for design and development, I take projects", 
      "from ideation to launch, ensuring a seamless journey that leaves a",
      "lasting positive impact on the digital landscape and your business."
    ]
  };

  const slideUp = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }
  };

  const staggerContainer = {
    animate: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <ForwardedMotionSection
      ref={containerRef}
      className={styles.works}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      variants={staggerContainer}
      style={{ position: 'relative' }} // Ensure non-static position for ScrollTrigger container
    >
      {/* How Can I Help You Section */}
      <div className={styles.servicesSection}>
        <motion.div className={styles.sectionHeader} variants={slideUp}>
          <div className={styles.titleContainer}>
            {sectionTitles.howICanHelp.map((word, index) => (
              <h1 key={`service-title-${index}`} className={styles.mainTitle}>
                {word}
                {index === sectionTitles.howICanHelp.length - 1 && "/"}
              </h1>
            ))}
          </div>
          
          <div className={styles.introContent}>
            <div className={styles.sectionLabel}>(SERVICES)</div>
            <div className={styles.introText}>
              {introParagraphs.services.map((line, index) => (
                <p key={`service-intro-${index}`}>{line}</p>
              ))}
            </div>
          </div>
        </motion.div>

        <div className={styles.servicesGrid}>
          {services.map((service, index) => (
            <motion.div 
              key={`service-${index}`} 
              className={styles.serviceCard}
              variants={slideUp}
            >
              <div className={styles.serviceHeader}>
                <span className={styles.serviceNumber}>({service.id})</span>
                <h2 className={styles.serviceTitle}>{service.title}</h2>
              </div>
              
              <div className={styles.serviceContent}>
                <div className={styles.serviceDescription}>
                  {service.description.map((line, i) => (
                    <p key={`service-desc-${index}-${i}`}>{line}</p>
                  ))}
                </div>
                
                <div className={styles.serviceOfferings}>
                  {service.offerings.map((offering, i) => (
                    <div key={`offering-${index}-${i}`} className={styles.offering}>
                      <span className={styles.offeringNumber}>{offering.id}</span>
                      <span className={styles.offeringName}>{offering.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Work Section */}
      <div className={styles.projectsSection}>
        <motion.div className={styles.sectionHeader} variants={slideUp}>
          <div className={styles.titleContainer}>
            {sectionTitles.selectedWorks.map((word, index) => (
              <h1 key={`project-title-${index}`} className={styles.mainTitle}>
                {word}
                {index === sectionTitles.selectedWorks.length - 1 && "/"}
              </h1>
            ))}
            <span className={styles.projectCount}>({projects.length})</span>
          </div>
          
          <div className={styles.introContent}>
            <div className={styles.sectionLabel}>(PROJECTS)</div>
            <div className={styles.introText}>
              {introParagraphs.projects.map((line, index) => (
                <p key={`project-intro-${index}`}>{line}</p>
              ))}
            </div>
          </div>
        </motion.div>

        <div className={styles.projectsGrid}>
          <div className={styles.projectNumbers}>
            <div className={styles.zeroNumber}>0</div>
            {projects.map((project) => (
              <div key={`project-num-${project.id}`} className={styles.projectNumber}>
                {project.id}.
              </div>
            ))}
          </div>

          <div className={styles.projectsList}>
            {projects.map((project, index) => (
              <motion.div 
                key={`project-${index}`} 
                className={styles.projectCard}
                variants={slideUp}
              >
                <div className={styles.projectImage}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                    quality={85}
                  />
                </div>
                
                <div className={styles.projectInfo}>
                  <div className={styles.projectMeta}>
                    <p className={styles.projectCategory}>{project.category}</p>
                    <h3 className={styles.projectTitle}>{project.title}</h3>
                  </div>
                  
                  <div className={styles.projectTags}>
                    {project.tags.map((tag, i) => (
                      <span key={`tag-${index}-${i}`} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                    <span className={styles.yearTag}>{project.year}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className={styles.aboutSection}>
        <motion.div className={styles.sectionHeader} variants={slideUp}>
          <div className={styles.titleContainer}>
            {sectionTitles.aboutMe.map((word, index) => (
              <h1 key={`about-title-${index}`} className={styles.mainTitle}>
                {word}
                {index === sectionTitles.aboutMe.length - 1 && "/"}
              </h1>
            ))}
          </div>
        </motion.div>

        <motion.div className={styles.aboutContent} variants={slideUp}>
          <div className={styles.aboutImageContainer}>
            <Image
              src="/images/myprofile.png"
              alt="Professional profile"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: 'cover' }}
              quality={90}
            />
          </div>
          
          <div className={styles.aboutText}>
            <div className={styles.aboutIntro}>
              {introParagraphs.about.map((line, index) => (
                <p key={`about-intro-${index}`}>{line}</p>
              ))}
            </div>
            
            <div className={styles.aboutDetails}>
              <div className={styles.sectionLabel}>(ABOUT ME)</div>
              <div className={styles.aboutDescription}>
                {aboutMeContent.map((line, index) =>
                  line ? (
                    <p key={`about-${index}`}>{line}</p>
                  ) : (
                    <div key={`separator-${index}`} className={styles.separator} />
                  )
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* CTA Section */}
      <motion.div className={styles.ctaSection} variants={slideUp}>
        <Magnetic>
          <Rounded>
            <p>Let's Work Together</p>
          </Rounded>
        </Magnetic>
      </motion.div>
    </ForwardedMotionSection>
  );
}
