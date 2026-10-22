import { useRef, useEffect } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import styles from './style.module.scss';
import Image from 'next/image';
import { SkillsSection } from '../Description/SkillsSection';
import Certificates from '../Description/Certificates';
import ExperienceSection from '../Description/ExperienceSection';
import ConnectWithMe from '../Description/ConnectWithMe';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const slider1 = [
    {
        color: "#e3e5e7",
        src: "c2.jpg"
    },
    {
        color: "#d6d7dc",
        src: "decimal.jpg"
    },
    {
        color: "#e3e3e3",
        src: "funny.jpg"
    },
    {
        color: "#21242b",
        src: "google.jpg"
    }
]

const slider2 = [
    {
        color: "#d4e3ec",
        src: "maven.jpg"
    },
    {
        color: "#e5e0e1",
        src: "panda.jpg"
    },
    {
        color: "#d7d4cf",
        src: "powell.jpg"
    },
    {
        color: "#e1dad6",
        src: "wix.jpg"
    }
]

export default function index() {

    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end start"]
    })

    const x1 = useTransform(scrollYProgress, [0, 1], [0, 150])
    const x2 = useTransform(scrollYProgress, [0, 1], [0, -150])
    const height = useTransform(scrollYProgress, [0, 0.9], [50, 0])

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Background color animation for SlidingImages
        const sections = document.querySelectorAll('section');
        sections.forEach((section, index) => {
          gsap.to(section, {
            backgroundColor: index % 2 === 0 ? '#1a1a1a' : '#ffffff',
            color: index % 2 === 0 ? '#ffffff' : '#000000',
            scrollTrigger: {
              trigger: section,
              start: 'top center',
              end: 'bottom center',
              scrub: true,
            },
          });
        });
      }, []);

    return (
        <>
            <SkillsSection />
            <Certificates />
            <ExperienceSection />
            <ConnectWithMe />
            <div ref={container} className={styles.slidingImages}>
                <motion.div style={{x: x1}} className={styles.slider}>
                        {
                            slider1.map( (project, index) => {
                                return <div key={index} className={styles.project} style={{backgroundColor: project.color}} >
                                    <div className={styles.imageContainer}>
                                        <Image 
                                        fill={true}
                                        alt={"image"}
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        src={`/images/${project.src}`}/>
                                    </div>
                                </div>
                            })
                        }
                    </motion.div>
                    <motion.div style={{x: x2}} className={styles.slider}>
                        {
                            slider2.map( (project, index) => {
                                return <div key={index} className={styles.project} style={{backgroundColor: project.color}} >
                                    <div key={index} className={styles.imageContainer}>
                                        <Image 
                                        fill={true}
                                        alt={"image"}
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        src={`/images/${project.src}`}/>
                                    </div>
                                </div>
                            })
                        }
                    </motion.div>
                    <motion.div style={{height}} className={styles.circleContainer}>
                        <div className={styles.circle}></div>
                    </motion.div>
            </div>
        </>
    )
}
