import React from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, 
  Cpu, 
  Globe, 
  Layers, 
  Rocket, 
  ShieldCheck,
  Zap,
  MousePointer2
} from 'lucide-react';
import Section from '../../components/Section';
import GlassCard from '../../components/GlassCard';
import styles from './Services.module.css';

const ServiceDetail = ({ icon: Icon, title, description, features, delay }) => (
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
      <ul className={styles.featureList}>
        {features.map((f, i) => (
          <li key={i}><Zap size={14} className={styles.zap} /> {f}</li>
        ))}
      </ul>
      <button className={styles.learnMore}>
        Explore Solutions <MousePointer2 size={16} />
      </button>
    </GlassCard>
  </motion.div>
);

const ServicesPage = () => {
  const serviceList = [
    {
      icon: Code2,
      title: "Custom Software Engineering",
      description: "Scale your business with high-performance, custom-built software solutions tailored to your unique requirements.",
      features: ["Microservices Architecture", "Cloud-Native Scalability", "API-First Development"],
    },
    {
      icon: Cpu,
      title: "AI & Machine Learning",
      description: "Leverage the power of artificial intelligence to automate processes and unlock deep data insights.",
      features: ["Predictive Analytics", "NLP Solutions", "Computer Vision"],
    },
    {
      icon: Globe,
      title: "Web3 & Blockchain",
      description: "Secure, decentralized solutions for the next generation of the internet and digital finance.",
      features: ["Smart Contracts", "DeFi Protocols", "Tokenomics Design"],
    },
    {
      icon: Layers,
      title: "Cloud Infrastructure",
      description: "Engineered for 99.9% uptime and extreme performance under heavy enterprise loads.",
      features: ["AWS/Azure/GCP", "Kubernetes Management", "DevOps Automation"],
    },
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
          Engineering the <span className={styles.highlight}>Future</span>
        </motion.h1>
        <p className={styles.heroSubtitle}>
          We don't just build software. We architect the digital backbone of tomorrow's industry leaders.
        </p>
      </header>

      <Section id="detailed-services">
        <div className={styles.grid}>
          {serviceList.map((service, i) => (
            <ServiceDetail key={i} {...service} delay={i * 0.15} />
          ))}
        </div>
      </Section>

      <Section id="methodology" className={styles.methodology}>
        <div className={styles.methContent}>
          <h2 className={styles.methTitle}>Our Digital DNA</h2>
          <div className={styles.methGrid}>
            <div className={styles.methItem}>
              <div className={styles.methIcon}><Rocket /></div>
              <h4>Agile Velocity</h4>
              <p>Rapid deployment cycles without compromising on architectural integrity.</p>
            </div>
            <div className={styles.methItem}>
              <div className={styles.methIcon}><ShieldCheck /></div>
              <h4>Security First</h4>
              <p>Military-grade protocols embedded into every line of code we write.</p>
            </div>
          </div>
        </div>
      </Section>

      <Section id="cta" className={styles.ctaSection}>
        <div className={`${styles.ctaBox} glass`}>
          <h2>Ready to Evolve?</h2>
          <p>Join the ranks of the tech elite and transform your digital presence today.</p>
          <button className={styles.ctaBtn}>Book AI Audit</button>
        </div>
      </Section>
    </div>
  );
};

export default ServicesPage;
