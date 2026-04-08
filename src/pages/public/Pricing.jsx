import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Check, 
  Code, 
  PenTool, 
  Layout, 
  HelpCircle,
  Smartphone,
  Zap,
  Globe
} from 'lucide-react';
import Section from '../../components/Section';
import GlassCard from '../../components/GlassCard';
import styles from './Pricing.module.css';

const PriceCard = ({ tier, price, duration, description, features, isPopular, delay, icon: Icon }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6 }}
    className={isPopular ? styles.popularWrapper : ''}
  >
    <GlassCard className={`${styles.priceCard} ${isPopular ? styles.popular : ''}`}>
      {isPopular && <div className={styles.popularBadge}>Most Popular</div>}
      <div className={styles.tierHeader}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
           {Icon && <Icon size={24} color={isPopular ? 'var(--accent-primary)' : 'var(--text-muted)'} />}
           <h3 className={styles.tierName}>{tier}</h3>
        </div>
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
      <button className={styles.planBtn} style={{ marginTop: 'auto' }}>
        {tier === "Enterprise" ? "Contact Agency" : "Start Building"}
      </button>
    </GlassCard>
  </motion.div>
);

const PricingPage = () => {
  const [activeTab, setActiveTab] = useState('web');

  const webPlans = [
    {
      tier: "Starter Site",
      price: "499",
      duration: " flat",
      icon: Layout,
      description: "Perfect for personal portfolios, small businesses, and landing pages.",
      features: ["Custom 1-3 Page Website", "Mobile Responsive Design", "Basic SEO Setup", "Contact Form Integration", "1 Month Support"],
      isPopular: false,
    },
    {
      tier: "Professional",
      price: "1,299",
      duration: " flat",
      icon: Code,
      description: "Advanced solutions for growing companies needing logic and dashbaords.",
      features: ["Up to 10 Pages", "Custom React/Node Architecture", "User Authentication", "Database Integration", "CMS Setup", "3 Months Support"],
      isPopular: true,
    },
    {
      tier: "Enterprise SaaS",
      price: "Custom",
      duration: "",
      icon: Globe,
      description: "Bespoke engineering for large-scale operations and complex web apps.",
      features: ["Unlimited Pages & Routing", "High-Performance Next.js", "Custom Dashboard UI/UX", "Cloud Server Architecture", "Dedicated Engineer", "24/7 Security Ops"],
      isPopular: false,
    },
  ];

  const graphicPlans = [
    {
      tier: "Brand Identity",
      price: "299",
      duration: " flat",
      icon: PenTool,
      description: "Establish a powerful visual identity for your new venture.",
      features: ["3 Logo Concepts", "Color Palette & Typography", "Brand Guidelines PDF", "Business Card Design", "Social Media Kit"],
      isPopular: true,
    },
    {
      tier: "UI/UX Modeling",
      price: "699",
      duration: " flat",
      icon: Smartphone,
      description: "High-fidelity Figma prototypes before writing a single line of code.",
      features: ["Full App Mockups (Up to 15 screens)", "Interactive Prototypes", "Wireframing", "User Flow Diagrams", "Design System Handoff"],
      isPopular: false,
    },
    {
      tier: "Full Creative Suite",
      price: "999",
      duration: " /mo",
      icon: Zap,
      description: "Retain our design team for continuous graphic and marketing assets.",
      features: ["Unlimited Graphic Requests", "Pitch Decks & Presentations", "Ad Creatives", "Blog Graphics", "Priority Delivery within 48hrs"],
      isPopular: false,
    },
  ];

  const currentPlans = activeTab === 'web' ? webPlans : graphicPlans;

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.hero}>
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.title}
        >
          Build Your <span className={styles.highlight}>Vision</span>
        </motion.h1>
        <p className={styles.subtitle}>
          From stunning graphic designs to fully engineered SaaS platforms. Choose the model that accelerates your growth.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2.5rem' }}>
          <button 
            onClick={() => setActiveTab('web')}
            style={{ 
              padding: '0.8rem 2rem', 
              borderRadius: '30px', 
              background: activeTab === 'web' ? 'var(--accent-primary)' : 'var(--surface)',
              border: '1px solid',
              borderColor: activeTab === 'web' ? 'var(--accent-primary)' : 'var(--border)',
              color: 'white',
              fontWeight: '700',
              transition: 'var(--transition-smooth)'
            }}
          >
             Web Engineering
          </button>
          <button 
            onClick={() => setActiveTab('graphics')}
            style={{ 
              padding: '0.8rem 2rem', 
              borderRadius: '30px', 
              background: activeTab === 'graphics' ? 'var(--accent-primary)' : 'var(--surface)',
              border: '1px solid',
              borderColor: activeTab === 'graphics' ? 'var(--accent-primary)' : 'var(--border)',
              color: 'white',
              fontWeight: '700',
              transition: 'var(--transition-smooth)'
            }}
          >
             Design & Identity
          </button>
        </div>
      </header>

      <Section id="pricing-grid">
        <div className={styles.grid}>
          {currentPlans.map((p, i) => (
            <PriceCard key={`${activeTab}-${i}`} {...p} delay={i * 0.15} />
          ))}
        </div>
      </Section>

      <Section id="faqs" className={styles.faqSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
        </div>
        <div className={styles.faqGrid}>
          <div className={styles.faqItem}>
            <h4><HelpCircle size={18} /> How do the design models work?</h4>
            <p>Our design models are tiered depending on what you need. A straight brand identity establishes your logo and look, while UI/UX Modeling delivers a fully interactive prototype of your software.</p>
          </div>
          <div className={styles.faqItem}>
            <h4><HelpCircle size={18} /> Do you offer hosting for web builds?</h4>
            <p>Yes. The Professional and Enterprise plans can include managed cloud hosting via AWS or Vercel depending on your architecture requirements.</p>
          </div>
          <div className={styles.faqItem}>
            <h4><HelpCircle size={18} /> What if I need both Design and Web Engineering?</h4>
            <p>We routinely build platforms from scratch. We recommend starting with a UI/UX Modeling package, and once approved, we roll that directly into a discounted Professional Web Engineering package.</p>
          </div>
          <div className={styles.faqItem}>
            <h4><HelpCircle size={18} /> Can I upgrade my retainer later?</h4>
            <p>Absolutely. You can shift from a fixed-fee contract to a monthly continuous Creative Suite or Engineering retainer as your company scales.</p>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default PricingPage;
