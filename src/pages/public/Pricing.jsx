import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Check, 
  Zap, 
  Shield, 
  Globe, 
  HelpCircle 
} from 'lucide-react';
import Section from '../../components/Section';
import GlassCard from '../../components/GlassCard';
import styles from './Pricing.module.css';

const PriceCard = ({ tier, price, duration, description, features, isPopular, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6 }}
    className={isPopular ? styles.popularWrapper : ''}
  >
    <GlassCard className={`${styles.priceCard} ${isPopular ? styles.popular : ''}`}>
      {isPopular && <div className={styles.popularBadge}>Most Scalable</div>}
      <div className={styles.tierHeader}>
        <h3 className={styles.tierName}>{tier}</h3>
        <div className={styles.priceContainer}>
          <span className={styles.currency}>$</span>
          <span className={styles.amount}>{price}</span>
          <span className={styles.duration}>{duration}</span>
        </div>
        <p className={styles.tierDesc}>{description}</p>
      </div>
      <ul className={styles.featureList}>
        {features.map((f, i) => (
          <li key={i}><Check size={16} className={styles.check} /> {f}</li>
        ))}
      </ul>
      <button className={styles.planBtn}>
        {tier === "Enterprise" ? "Contact Sales" : "Get Started"}
      </button>
    </GlassCard>
  </motion.div>
);

const PricingPage = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      tier: "Starter",
      price: isAnnual ? "99" : "129",
      duration: "/mo",
      description: "Perfect for early-stage startups needing a premium digital presence.",
      features: ["Custom Landing Page", "Basic SEO Optimization", "Mobile Responsive", "5GB Storage", "e-mail Support"],
      isPopular: false,
    },
    {
      tier: "Professional",
      price: isAnnual ? "299" : "349",
      duration: "/mo",
      description: "Advanced solutions for growing tech companies and scale-ups.",
      features: ["Up to 5 Pages", "Advanced Animations", "Custom Dashboard", "50GB Storage", "Priority Support", "Basic AI Integration"],
      isPopular: true,
    },
    {
      tier: "Enterprise",
      price: "Custom",
      duration: "",
      description: "Bespoke engineering for large-scale operations and complex systems.",
      features: ["Unlimited Pages", "Custom OS Design", "White-Glove Support", "Full AI Suite", "Dedicated Engineer", "24/7 Security Ops"],
      isPopular: false,
    },
  ];

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.hero}>
        <h1 className={styles.title}>Scalable <span className={styles.highlight}>Success</span></h1>
        <p className={styles.subtitle}>
          Transparent, performance-driven pricing for every stage of your company's growth.
        </p>

        <div className={styles.toggleContainer}>
          <span className={!isAnnual ? styles.activeLabel : ''}>Monthly</span>
          <button 
            className={styles.toggle} 
            onClick={() => setIsAnnual(!isAnnual)}
          >
            <div className={`${styles.toggleCircle} ${isAnnual ? styles.right : ''}`} />
          </button>
          <span className={isAnnual ? styles.activeLabel : ''}>Annual <span className={styles.save}>(Save 20%)</span></span>
        </div>
      </header>

      <Section id="pricing-grid">
        <div className={styles.grid}>
          {plans.map((p, i) => (
            <PriceCard key={i} {...p} delay={i * 0.15} />
          ))}
        </div>
      </Section>

      <Section id="faqs" className={styles.faqSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
        </div>
        <div className={styles.faqGrid}>
          {[1, 2, 3, 4].map((_, i) => (
            <div key={i} className={styles.faqItem}>
              <h4><HelpCircle size={18} /> Can I upgrade my plan at any time?</h4>
              <p>Yes, you can upgrade or downgrade your plan instantly through your client dashboard. All changes are prorated.</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
};

export default PricingPage;
