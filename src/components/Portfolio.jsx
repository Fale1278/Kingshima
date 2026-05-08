'use client';

import React from 'react';
import Section from './Section';
import styles from './Portfolio.module.css';

const trainingAreas = [
  {
    title: "Tech & Digital Excellence",
    category: "Software & Cloud",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
    tags: ["Fullstack", "AI/ML", "Cloud"]
  },
  {
    title: "Media & Creative Arts",
    category: "Design & Film",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
    tags: ["Cinematography", "UX/UI", "Brand"]
  },
  {
    title: "Leadership & Innovation",
    category: "Management & Faith",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
    tags: ["Strategy", "Mentorship", "Purpose"]
  }
];

const Portfolio = () => {
  return (
    <Section id="training">
      <div className={styles.header}>
        <h2 className={styles.title}>Training Areas</h2>
        <p className={styles.subtitle}>Equipping you with the skills to lead in a digital-first world, grounded in faith.</p>
      </div>

      <div className={styles.grid}>
        {trainingAreas.map((area, index) => (
          <div key={index} className={styles.projectCard}>
            <div className={styles.imageWrapper}>
              <img src={area.image} alt={area.title} className={styles.image} />
              <div className={styles.overlay}>
                <span className={styles.category}>{area.category}</span>
                <h3 className={styles.projectTitle}>{area.title}</h3>
                <div className={styles.tags}>
                  {area.tags.map((tag, tIndex) => (
                    <span key={tIndex} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Portfolio;
