import React from 'react';
import Section from './Section';
import styles from './TechStack.module.css';

const techs = [
  "React", "Node.js", "TypeScript", "Python", "AWS", "Docker", "GraphQL", "Figma", "Next.js", "Three.js"
];

const TechStack = () => {
  return (
    <Section id="tech-stack" className={styles.section}>
      <h2 className={styles.title}>Our Core Engine</h2>
      <div className={styles.container}>
        <div className={styles.grid}>
          {techs.map((tech, index) => (
            <div key={index} className={styles.techItem}>
              <span className={styles.techName}>{tech}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default TechStack;
