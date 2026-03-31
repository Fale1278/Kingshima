import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users2, 
  Heart, 
  Globe2, 
  ShieldCheck, 
  Compass, 
  Zap 
} from 'lucide-react';
import Section from '../../components/Section';
import GlassCard from '../../components/GlassCard';
import styles from './About.module.css'; // Reusing styles for consistency

const ImpactCard = ({ icon: Icon, title, description, delay }) => (
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

const CommunityPage = () => {
  const impacts = [
    {
      icon: Users2,
      title: "Youth Empowerment",
      description: "Directly mentoring over 500+ young innovators across tech and creative sectors.",
    },
    {
      icon: Heart,
      title: "Kingdom Values",
      description: "Infusing technology with spiritual purpose to build ethical, high-impact solutions.",
    },
    {
      icon: Globe2,
      title: "Global Network",
      description: "Connecting local talent with international opportunities and industry experts.",
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
          <h1 className={styles.title}>Our <span className={styles.highlight}>Community</span></h1>
          <p className={styles.subtitle}>
            The Kingshima Foundation is a family of innovators, artists, and leaders united by a single vision: to build a better future together.
          </p>
        </motion.div>
      </header>

      <Section id="impact-stories">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Impact and Purpose</h2>
          <p className={styles.sectionSubtitle}>Stories of transformation from our community of believers and builders.</p>
        </div>
        <div className={styles.valuesGrid}>
          {impacts.map((imp, i) => (
            <ImpactCard key={i} {...imp} delay={i * 0.15} />
          ))}
        </div>
      </Section>

      <Section id="mentorship" className={styles.teamVibe}>
        <div className={`${styles.vibeCard} glass`}>
          <h2 className={styles.vibeTitle}>Join the Mentorship Program</h2>
          <p className={styles.vibeText}>
            Our mentorship network is at the heart of everything we do. Whether you are looking to learn or give back, there is a place for you in the Kingshima family.
          </p>
          <div className={styles.vibeIcons}>
            <Compass size={40} />
            <ShieldCheck size={40} />
            <Zap size={40} />
          </div>
          <button className={styles.learnMore} style={{ marginTop: '2rem' }}>Apply as Mentor</button>
        </div>
      </Section>
    </div>
  );
};

export default CommunityPage;
