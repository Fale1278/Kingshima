'use client';

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
    title: "Faith & Godly Values",
    description: "Guiding every youth with Biblical principles that shape character and purpose.",
    icon: <ShieldCheck size={32} />
  },
  {
    title: "Technology & Innovation",
    description: "Equipping youths with in-demand tech skills for the digital world.",
    icon: <Cpu size={32} />
  },
  {
    title: "Youth Empowerment",
    description: "Building confidence, leadership, and self-worth in every young person.",
    icon: <ShieldCheck size={32} />
  },
  {
    title: "Creativity & Expression",
    description: "Encouraging self-discovery and creative problem-solving through design, content, and storytelling.",
    icon: <Palette size={32} />
  },
  {
    title: "Community & Collaboration",
    description: "Fostering teamwork, mentorship, and shared growth within a supportive environment.",
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
