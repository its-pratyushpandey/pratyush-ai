import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const certificates = [
  {
    title: 'MongoDB Certified Developer – Associate',
    image: '/mongodb.svg',
    year: '2025',
    link: '/presume.pdf',
    type: 'Database',
    issuer: 'MongoDB',
  },
  {
    title: 'Oracle Cloud Infrastructure Certified Developer Professional',
    image: '/aviatrix-mark.png',
    year: '2025',
    link: '/presume.pdf',
    type: 'Cloud',
    issuer: 'Oracle',
  },
  {
    title: 'Cambridge Linguaskill English Certification',
    image: '/images/google.jpg',
    year: '2024',
    link: '/presume.pdf',
    type: 'Language',
    issuer: 'Cambridge Assessment English',
  },
  {
    title: 'GitHub Foundations',
    image: '/images/background.jpg',
    year: '2026',
    link: '/presume.pdf',
    type: 'DevOps',
    issuer: 'GitHub',
  },
];

const Certificates = () => {
  const [selectedType, setSelectedType] = useState('All');

  const types = ['All', 'Cloud', 'Database', 'DevOps', 'Language'];

  const filteredCertificates = certificates.filter(
    (cert) => selectedType === 'All' || cert.type === selectedType
  );

  return (
    <section className="certificates-section">
      <h2>Certificates</h2>
      <select
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
      >
        {types.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      <div className="certificates-grid">
        {filteredCertificates.map((cert, index) => (
          <motion.div
            key={index}
            className="certificate-card"
            whileHover={{ scale: 1.05 }}
          >
            <img src={cert.image} alt={cert.title} />
            <h3>{cert.title}</h3>
            <p>{cert.issuer}</p>
            <a href={cert.link} target="_blank" rel="noopener noreferrer">
              View Certificate
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Certificates;
