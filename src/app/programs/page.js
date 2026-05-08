'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Code2, 
  Palette, 
  Users, 
  Lightbulb, 
  BookOpen, 
  Rocket 
} from 'lucide-react';
import Section from '@/components/Section';
import GlassCard from '@/components/GlassCard';
import styles from './Services.module.css';

const ProgramCategory = ({ title, description, skills, icon: Icon, delay }) => {
  const router = useRouter();
  return (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6 }}
  >
    <GlassCard className={styles.serviceCard}>
      <div className={styles.cardHeader}>
        <div className={styles.iconWrapper}><Icon size={24} /></div>
        <h3 className={styles.cardTitle}>{title}</h3>
      </div>
      <p className={styles.cardDescription}>{description}</p>
      <div className={styles.skillTags}>
        {skills.map((skill, i) => (
          <span key={i} className={styles.skillTag}>{skill}</span>
        ))}
      </div>
      <button className={styles.learnMore} onClick={() => router.push('/curriculum')}>View Curriculum</button>
    </GlassCard>
  </motion.div>
  );
};

const ProgramsPage = () => {
  const categories = [
    {
      title: "Tech & Digital Skills",
      description: "Master the tools of the modern age. From software development to cloud infrastructure.",
      skills: ["Fullstack Development", "Cloud Computing", "AI & Data Science"],
      icon: Code2
    },
    {
      title: "Creative & Media Skills",
      description: "Harness the power of digital storytelling, cinematography, and futuristic design.",
      skills: ["Digital Arts", "Video Production", "Brand Identity"],
      icon: Palette
    },
    {
      title: "Leadership & Soft Skills",
      description: "Leadership rooted in faith. Developing character, emotional intelligence, and purpose.",
      skills: ["Public Speaking", "Biblical Leadership", "Social Ethics"],
      icon: Users
    },
    {
      title: "Innovation & Entrepreneurship",
      description: "Building sustainable solutions and Kingdom-minded enterprises for global impact.",
      skills: ["Startup Fundamentals", "Digital Marketing", "Social Innovation"],
      icon: Lightbulb
    }
  ];

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.hero}>
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className={styles.pageTitle}
        >
          Training the <span className={styles.highlight}>Future</span>
        </motion.h1>
        <p className={styles.heroSubtitle}>
          Building skills for a digital world, anchored in spiritual purpose and excellence.
        </p>
      </header>

      <Section id="categories">
        <div className={styles.grid}>
          {categories.map((cat, i) => (
            <ProgramCategory key={i} {...cat} delay={i * 0.1} />
          ))}
        </div>
      </Section>

      <Section id="impact" className={styles.methodology}>
        <div className={styles.methContent}>
          <h2 className={styles.methTitle}>The Kingshima Way</h2>
          <div className={styles.methGrid}>
            <div className={styles.methItem}>
              <div className={styles.methIcon}><BookOpen /></div>
              <h4>Holistic Learning</h4>
              <p>We combine technical rigor with spiritual depth to create well-rounded innovators.</p>
            </div>
            <div className={styles.methItem}>
              <div className={styles.methIcon}><Rocket /></div>
              <h4>Direct Mentorship</h4>
              <p>Every student is paired with an industry leader to guide their journey.</p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default ProgramsPage;
