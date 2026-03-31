import React from 'react';
import { motion } from 'framer-motion';
import { 
  Target, 
  Lightbulb, 
  Compass, 
  Users2, 
  Globe2, 
  ShieldCheck 
} from 'lucide-react';
import Section from '../../components/Section';
import GlassCard from '../../components/GlassCard';
import styles from './About.module.css';

const ValueCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6 }}
  >
    <GlassCard className={styles.valueCard}>
      <div className={styles.valueIcon}><Icon size={24} /></div>
      <h3 className={styles.valueTitle}>{title}</h3>
      <p className={styles.valueText}>{description}</p>
    </GlassCard>
  </motion.div>
);

const AboutPage = () => {
  const pillars = [
    {
      icon: ShieldCheck,
      title: "Spiritual Excellence",
      description: "We believe that true innovation starts with a strong spiritual foundation. Our programs integrate faith-based principles with technical mastery.",
    },
    {
      icon: Lightbulb,
      title: "Creative Innovation",
      description: "Empowering youth to tell stories that matter. We provide the tools and mentorship to master digital arts, film, and design.",
    },
    {
      icon: Compass,
      title: "Visionary Leadership",
      description: "Leadership is about service. We equip the next generation with the character and skills to lead with integrity in the digital age.",
    },
  ];

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.hero}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={styles.heroContent}
        >
          <h1 className={styles.title}>Who <span className={styles.highlight}>We Are</span></h1>
          <p className={styles.subtitle}>
            The Kingshima Foundation is a non-profit organization dedicated to empowering youth through technology, creativity, and faith. We serve as a bridge between potential and purpose.
          </p>
        </motion.div>
      </header>

      <Section id="mission-vision" className={styles.visionSection}>
        <div className={styles.visionGrid}>
          <div className={styles.visionText}>
            <h2 className={styles.sectionTitle}>Mission & Vision</h2>
            <div className={styles.statement}>
              <h3>Our Mission</h3>
              <p>To empower the next generation of leaders through technology, creativity, and faith, bridging the gap between spiritual purpose and digital innovation.</p>
            </div>
            <div className={styles.statement} style={{ marginTop: '2rem' }}>
              <h3>Our Vision</h3>
              <p>A world where every young person is equipped with the skills and spiritual foundation to lead with integrity, innovation, and impact.</p>
            </div>
          </div>
          <div className={styles.visionStat}>
            <div className={`${styles.statBox} glass`}>
              <span className={styles.statNum}>500+</span>
              <span className={styles.statLabel}>Lives Transformed</span>
            </div>
          </div>
        </div>
      </Section>

      <Section id="pillars">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Our Core Pillars</h2>
          <p className={styles.sectionSubtitle}>The foundations upon which we build the future of our community.</p>
        </div>
        <div className={styles.valuesGrid}>
          {pillars.map((p, i) => (
            <ValueCard key={i} {...p} delay={i * 0.15} />
          ))}
        </div>
      </Section>

      <Section id="management" className={styles.teamVibe}>
        <div className={`${styles.vibeCard} glass`}>
          <h2 className={styles.vibeTitle}>A Message from Leadership</h2>
          <p className={styles.vibeText}>
            "Our commitment is to ensure that no dream is too big and no background is too small. We are here to provide the platform, the tools, and the spiritual guidance to help you reach your full potential in Christ."
          </p>
          <div className={styles.signatureSection}>
            <div className={styles.signature}>
              <span className={styles.sigText}>Management</span>
            </div>
            <p className={styles.sigTitle}>The Kingshima Foundation Board</p>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default AboutPage;
