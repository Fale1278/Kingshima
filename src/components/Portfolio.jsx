import React from 'react';
import Section from './Section';
import styles from './Portfolio.module.css';

const trainingAreas = [
  {
    title: "Tech & Digital Excellence",
    category: "Software & Cloud",
    image: "/kingshima_tech_training.png", // Paths will be relative to public or absolute in dev
    tags: ["Fullstack", "AI/ML", "Cloud"]
  },
  {
    title: "Media & Creative Arts",
    category: "Design & Film",
    image: "/kingshima_media_creative.png",
    tags: ["Cinematography", "UX/UI", "Brand"]
  },
  {
    title: "Leadership & Innovation",
    category: "Management & Faith",
    image: "/kingshima_leadership_innovation.png",
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
