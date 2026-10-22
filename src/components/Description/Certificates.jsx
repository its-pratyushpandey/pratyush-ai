import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const certificates = [
  {
    title: 'Accenture Developer Virtual Experience',
    image: '/accenture.png',
    year: '2024',
    link: '/Accenture.pdf',
    type: 'Other',
    issuer: 'Accenture',
  },
  {
    title: 'Aviatrix Certified Engineer (ACE) Multicloud Network Associate',
    image: '/Aviatrix.png',
    year: '2024',
    link: '/Aviatrix.pdf',
    type: 'Cloud',
    issuer: 'Aviatrix',
  },
  {
    title: 'Salesforce Developer Virtual Internship',
    image: '/salesforce.png',
    year: '2024',
    link: '/Salesforce.pdf',
    type: 'Cloud',
    issuer: 'Salesforce',
  },
];

const Certificates = () => {
  const [selectedType, setSelectedType] = useState('All');

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
        <option value="All">All</option>
        <option value="Cloud">Cloud</option>
        <option value="Other">Other</option>
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
