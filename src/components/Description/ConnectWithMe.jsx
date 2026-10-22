import React from 'react';
import { motion } from 'framer-motion';
import styles from './ConnectWithMe.module.scss';

const links = [
  { name: 'GitHub', url: 'https://github.com/Pratyush-2005', icon: '🐙' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/pratyush-pandey-', icon: '🔗' },
  { name: 'LeetCode', url: 'https://leetcode.com/u/pratyush_pandey/', icon: '📘' },
  { name: 'Email', url: 'mailto:pratyush.me.ai@gmail.com', icon: '✉️' },
  { name: 'Phone', url: 'tel:+917562920811', icon: '📞', description: '+91-7562920811' },
  { name: 'Location', url: '#', icon: '📍', description: 'Vijayawada, India' },
];

const ConnectWithMe = () => {
  return (
    <section className={styles.connectWithMe}>
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={styles.title}
      >
        Connect with Me
      </motion.h2>
      <motion.div
        className={styles.linksContainer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {links.map((link, index) => (
          <motion.a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className={styles.icon}>{link.icon}</span>
            <span className={styles.name}>{link.name}</span>
            {link.description && <span className={styles.description}>{link.description}</span>}
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
};

export default ConnectWithMe;
