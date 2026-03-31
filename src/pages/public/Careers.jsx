import React from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  Coffee, 
  Monitor, 
  Heart 
} from 'lucide-react';
import Section from '../../components/Section';
import GlassCard from '../../components/GlassCard';
import styles from './Careers.module.css';

const JobCard = ({ title, department, location, type, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
  >
    <GlassCard className={styles.jobCard}>
      <div className={styles.jobMain}>
        <h3 className={styles.jobTitle}>{title}</h3>
        <div className={styles.jobMeta}>
          <span className={styles.metaItem}><MapPin size={14} /> {location}</span>
          <span className={styles.metaItem}><Clock size={14} /> {type}</span>
          <span className={styles.department}>{department}</span>
        </div>
      </div>
      <button className={styles.applyBtn}>
        Apply Now <ArrowRight size={16} />
      </button>
    </GlassCard>
  </motion.div>
);

const CareersPage = () => {
  const jobs = [
    { title: "Senior AI Engineer", department: "Engineering", location: "Remote / SF", type: "Full-time" },
    { title: "Lead Product Designer", department: "Design", location: "London / Hybrid", type: "Full-time" },
    { title: "Blockchain Architect", department: "Web3", location: "Remote", type: "Contract" },
    { title: "Growth Marketing Manager", department: "Marketing", location: "New York", type: "Full-time" },
  ];

  const perks = [
    { icon: Monitor, title: "Work Anywhere", desc: "Truly remote-first culture with global hub access." },
    { icon: Coffee, title: "Deep Work Flow", desc: "Flexible hours designed for peak cognitive performance." },
    { icon: Sparkles, title: "Elite Tech", desc: "The best hardware and software budget for your setup." },
    { icon: Heart, title: "Holistic Health", desc: "Premium health, mental wellness, and fitness coverage." },
  ];

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.hero}>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={styles.title}
        >
          Build the <span className={styles.highlight}>Untethered</span> Future
        </motion.h1>
        <p className={styles.subtitle}>
          We are looking for the outliers, the polymaths, and the dreamers who believe technology is a tool for human empowerment.
        </p>
      </header>

      <Section id="perks" className={styles.perksSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Why Aetheris?</h2>
        </div>
        <div className={styles.perksGrid}>
          {perks.map((perk, i) => (
            <div key={i} className={styles.perkItem}>
              <div className={styles.perkIcon}><perk.icon size={24} /></div>
              <h4>{perk.title}</h4>
              <p>{perk.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="open-positions">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Current Vacancies</h2>
          <p className={styles.sectionSubtitle}>Join us in shaping the next digital epoch.</p>
        </div>
        <div className={styles.jobsList}>
          {jobs.map((job, i) => (
            <JobCard key={i} {...job} delay={i * 0.1} />
          ))}
        </div>
      </Section>

      <Section id="culture" className={styles.cultureSection}>
        <div className={`${styles.cultureBox} glass`}>
          <h2>Don't see a fit?</h2>
          <p>We are always looking for exceptional talent. If you have a unique vision, we want to hear it.</p>
          <button className={styles.generalApplyBtn}>Open Application</button>
        </div>
      </Section>
    </div>
  );
};

export default CareersPage;
