import React from "react";
import { motion } from "framer-motion";
import {
  FaJava,
  FaJs,
  FaReact,
  FaNodeJs,
  FaAws,
  FaGitAlt,
  FaGithub,
  FaGitlab,
} from "react-icons/fa";
import {
  SiCplusplus,
  SiTypescript,
  SiRedux,
  SiMongodb,
  SiMysql,
  SiFirebase,
  SiNextdotjs,
  SiSpringboot,
  SiExpress,
  SiTailwindcss,
} from "react-icons/si";
import styles from "./SkillsSection.module.scss";

const skillCategories = [
  {
    title: "Languages I Code In",
    skills: [
      { name: "Java", icon: <FaJava className={styles.icon} /> },
      { name: "C++", icon: <SiCplusplus className={styles.icon} /> },
      { name: "JavaScript", icon: <FaJs className={styles.icon} /> },
    ],
  },
  {
    title: "Core Technologies",
    skills: [
      { name: "ReactJS", icon: <FaReact className={styles.icon} /> },
      { name: "NextJS", icon: <SiNextdotjs className={styles.icon} /> },
      { name: "Typescript", icon: <SiTypescript className={styles.icon} /> },
      { name: "NodeJS", icon: <FaNodeJs className={styles.icon} /> },
      { name: "ExpressJS", icon: <SiExpress className={styles.icon} /> },
      { name: "SpringBoot", icon: <SiSpringboot className={styles.icon} /> },
      { name: "MongoDB", icon: <SiMongodb className={styles.icon} /> },
      { name: "MySQL", icon: <SiMysql className={styles.icon} /> },
      { name: "Firebase", icon: <SiFirebase className={styles.icon} /> },
      { name: "AWS", icon: <FaAws className={styles.icon} /> },
      { name: "Redux", icon: <SiRedux className={styles.icon} /> },
      { name: "Git", icon: <FaGitAlt className={styles.icon} /> },
    ],
  },
  {
    title: "Developer Tools",
    skills: [
      { name: "GitHub", icon: <FaGithub className={styles.icon} /> },
      { name: "GitLab", icon: <FaGitlab className={styles.icon} /> },
      { name: "TailwindCSS", icon: <SiTailwindcss className={styles.icon} /> },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.2,
      duration: 0.6,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

export const SkillsSection = () => {
  return (
    <motion.section
      className={styles.skillsSection}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {skillCategories.map((category, index) => (
        <motion.div
          key={index}
          className={styles.category}
          variants={itemVariants}
        >
          <h2 className={styles.title}>{category.title}</h2>
          <div className={styles.skillsGrid}>
            {category.skills.map((skill, idx) => (
              <motion.div
                key={idx}
                className={styles.skillCard}
                whileHover={{ scale: 1.1 }}
              >
                {skill.icon}
                <span className={styles.skillName}>{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.section>
  );
};

export default SkillsSection;
