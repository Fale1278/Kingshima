'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, 
  Code, 
  PenTool, 
  Layout, 
  HelpCircle,
  Smartphone,
  Zap,
  Globe,
  TrendingUp,
  Award
} from 'lucide-react';
import Section from '@/components/Section';
import GlassCard from '@/components/GlassCard';
import styles from './Pricing.module.css';

const EXCHANGE_RATE = 1600;

const PriceCard = ({ tier, price, duration, description, features, isPopular, delay, icon: Icon, currency }) => {
  const formatPrice = (p) => {
    if (p === "Custom") return p;
    const numericPrice = parseInt(p.replace(/,/g, ''));
    if (currency === 'NGN') {
      return (numericPrice * EXCHANGE_RATE).toLocaleString();
    }
    return numericPrice.toLocaleString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      className={`${styles.priceCardWrapper} ${isPopular ? styles.popularWrapper : ''}`}
    >
      <GlassCard className={`${styles.priceCard} ${isPopular ? styles.popular : ''}`}>
        {isPopular && (
          <div className={styles.popularBadge}>
            <TrendingUp size={14} /> Most Popular
          </div>
        )}
        
        <div className={styles.tierHeader}>
          <div className={styles.iconContainer}>
            {Icon && <Icon size={28} />}
          </div>
          <h3 className={styles.tierName}>{tier}</h3>
          <div className={styles.priceContainer}>
            <span className={styles.currencySymbol}>{currency === 'USD' ? '$' : '₦'}</span>
            <span className={styles.amount}>{formatPrice(price)}</span>
            <span className={styles.duration}>{duration}</span>
          </div>
          {currency === 'NGN' && price !== "Custom" && (
            <span className={styles.originalPrice}>(${price} USD)</span>
          )}
          <p className={styles.tierDesc}>{description}</p>
        </div>

        <div className={styles.divider}></div>

        <ul className={styles.featureList}>
          {features.map((f, i) => (
            <li key={i}>
              <div className={styles.checkIcon}>
                <Check size={14} />
              </div>
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <button className={`${styles.planBtn} ${isPopular ? styles.popularBtn : ''}`}>
          {tier === "Enterprise SaaS" ? "Contact Agency" : "Start Building"}
        </button>
      </GlassCard>
    </motion.div>
  );
};

const PricingPage = () => {
  const [activeTab, setActiveTab] = useState('web');
  const [currency, setCurrency] = useState('USD');

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
      description: "Advanced solutions for growing companies needing logic and dashboards.",
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
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className={styles.badge}
        >
          <Award size={16} /> Premium Engineering Agency
        </motion.div>
        
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

        <div className={styles.controls}>
          <div className={styles.tabSwitcher}>
            <button 
              onClick={() => setActiveTab('web')}
              className={activeTab === 'web' ? styles.activeTab : ''}
            >
              Web Engineering
            </button>
            <button 
              onClick={() => setActiveTab('graphics')}
              className={activeTab === 'graphics' ? styles.activeTab : ''}
            >
              Design & Identity
            </button>
          </div>

          <div className={styles.currencyToggle}>
            <span className={currency === 'USD' ? styles.activeCurrency : ''}>USD</span>
            <button 
              className={styles.toggleBtn} 
              onClick={() => setCurrency(currency === 'USD' ? 'NGN' : 'USD')}
            >
              <div className={`${styles.toggleCircle} ${currency === 'NGN' ? styles.toggleRight : ''}`}></div>
            </button>
            <span className={currency === 'NGN' ? styles.activeCurrency : ''}>NGN</span>
          </div>
        </div>
      </header>

      <Section id="pricing-grid">
        <div className={styles.grid}>
          <AnimatePresence mode="wait">
            {currentPlans.map((p, i) => (
              <PriceCard 
                key={`${activeTab}-${i}`} 
                {...p} 
                delay={i * 0.1} 
                currency={currency} 
              />
            ))}
          </AnimatePresence>
        </div>
      </Section>

      <Section id="faqs" className={styles.faqSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
          <p className={styles.sectionDesc}>Everything you need to know about our process and pricing.</p>
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
