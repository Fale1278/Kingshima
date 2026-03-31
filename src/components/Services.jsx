import React from 'react';
import { 
  ShieldCheck, 
  Cpu, 
  Palette, 
  Users 
} from 'lucide-react';
import Section from './Section';
import GlassCard from './GlassCard';
import styles from './Services.module.css';

const pillars = [
  {
    title: "Spiritual Excellence",
    description: "Rooted in faith, leading with purpose. We cultivate identity and character for lasting impact.",
    icon: <ShieldCheck size={32} />
  },
  {
    title: "Digital Mastery",
    description: "High-level technical training in Cloud, AI, and Software Engineering for the global market.",
    icon: <Cpu size={32} />
  },
  {
    title: "Creative Innovation",
    description: "Mastering the arts of digital storytelling, media production, and futuristic design.",
    icon: <Palette size={32} />
  },
  {
    title: "Servant Leadership",
    description: "Mentorship and community-centered growth to transform society from the inside out.",
    icon: <Users size={32} />
  }
];

const Services = () => {
  return (
    <Section id="pillars">
      <div className={styles.header}>
        <h2 className={styles.title}>Our Core Pillars</h2>
        <p className={styles.subtitle}>Built on a foundation of faith and driven by a passion for technical excellence.</p>
      </div>

      <div className={styles.grid}>
        {pillars.map((item, index) => (
          <GlassCard key={index} delay={index * 100}>
            <div className={styles.icon}>{item.icon}</div>
            <h3 className={styles.cardTitle}>{item.title}</h3>
            <p className={styles.cardText}>{item.description}</p>
          </GlassCard>
        ))}
      </div>
    </Section>
  );
};

export default Services;
