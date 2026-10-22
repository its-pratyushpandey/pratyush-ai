import React from "react";
import { motion } from "framer-motion";
import {
  FaJs,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaGithub,
  FaPython,
  FaDatabase,
  FaDocker,
} from "react-icons/fa";
import {
  SiTypescript,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiExpress,
  SiPostman,
  SiNumpy,
  SiPandas,
  SiJenkins,
} from "react-icons/si";
import styles from "./SkillsSection.module.scss";

const skillCategories = [
  {
    title: "Programming Languages",
    skills: [
      { name: "Python", icon: <FaPython className={styles.icon} /> },
      { name: "JavaScript", icon: <FaJs className={styles.icon} /> },
      { name: "TypeScript", icon: <SiTypescript className={styles.icon} /> },
      { name: "SQL", icon: <FaDatabase className={styles.icon} /> },
    ],
  },
  {
    title: "AI & Large Language Models",
    skills: [
      { name: "LLMs", icon: <span className={styles.icon}>🤖</span> },
      { name: "RAG Systems", icon: <span className={styles.icon}>⚡</span> },
      { name: "Prompt Engineering", icon: <span className={styles.icon}>✍️</span> },
      { name: "Hugging Face", icon: <span className={styles.icon}>🤗</span> },
      { name: "LLM APIs", icon: <span className={styles.icon}>🔌</span> },
    ],
  },
  {
    title: "Machine Learning & Evaluation",
    skills: [
      { name: "Model Evaluation", icon: <span className={styles.icon}>🎯</span> },
      { name: "Data Preparation", icon: <span className={styles.icon}>📊</span> },
      { name: "Data Quality", icon: <span className={styles.icon}>✓</span> },
      { name: "NumPy", icon: <SiNumpy className={styles.icon} /> },
      { name: "Pandas", icon: <SiPandas className={styles.icon} /> },
    ],
  },
  {
    title: "Full-Stack Development",
    skills: [
      { name: "React.js", icon: <FaReact className={styles.icon} /> },
      { name: "Next.js", icon: <SiNextdotjs className={styles.icon} /> },
      { name: "Node.js", icon: <FaNodeJs className={styles.icon} /> },
      { name: "Express.js", icon: <SiExpress className={styles.icon} /> },
      { name: "MongoDB", icon: <SiMongodb className={styles.icon} /> },
      { name: "REST APIs", icon: <span className={styles.icon}>🌐</span> },
    ],
  },
  {
    title: "Data Engineering & Analytics",
    skills: [
      { name: "Data Pipelines", icon: <span className={styles.icon}>🔄</span> },
      { name: "ETL / ELT", icon: <span className={styles.icon}>⚙️</span> },
      { name: "MySQL", icon: <SiMysql className={styles.icon} /> },
      { name: "Data Validation", icon: <span className={styles.icon}>🛡️</span> },
      { name: "Power BI", icon: <span className={styles.icon}>📈</span> },
    ],
  },
  {
    title: "DevOps & Developer Tools",
    skills: [
      { name: "Docker", icon: <FaDocker className={styles.icon} /> },
      { name: "Jenkins", icon: <SiJenkins className={styles.icon} /> },
      { name: "Git", icon: <FaGitAlt className={styles.icon} /> },
      { name: "GitHub", icon: <FaGithub className={styles.icon} /> },
      { name: "CI / CD", icon: <span className={styles.icon}>🚀</span> },
      { name: "Postman", icon: <SiPostman className={styles.icon} /> },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const categoryVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      when: "beforeChildren",
      staggerChildren: 0.05,
    },
  },
};

const skillVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

export const SkillsSection = () => {
  return (
    <motion.div
      className={styles.container}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className={styles.grid}>
        {skillCategories.map((category) => (
          <motion.div
            key={category.title}
            className={styles.category}
            variants={categoryVariants}
          >
            <h3 className={styles.categoryTitle}>{category.title}</h3>
            <div className={styles.skillsList}>
              {category.skills.map((skill) => (
                <motion.div
                  key={skill.name}
                  className={styles.skillItem}
                  variants={skillVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {skill.icon}
                  <span className={styles.skillName}>{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SkillsSection;
