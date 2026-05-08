'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, 
  Layers, 
  Cpu, 
  Globe2, 
  ArrowRight 
} from 'lucide-react';
import Section from '@/components/Section';
import styles from './Projects.module.css';

const ProjectCard = ({ project, delay }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ delay, duration: 0.4 }}
    className={styles.projectCard}
  >
    <div className={styles.imageWrapper}>
      <img src={project.image} alt={project.title} className={styles.image} />
      <div className={styles.overlay}>
        <div className={styles.overlayContent}>
          <div className={styles.category}>{project.category}</div>
          <h3 className={styles.projectTitle}>{project.title}</h3>
          <p className={styles.projectSummary}>{project.summary}</p>
          <div className={styles.tags}>
            {project.tags.map(tag => <span key={tag} className={styles.tag}>{tag}</span>)}
          </div>
        </div>
      </div>
      <button className={styles.viewCaseStudy}>
        View Case Study <ArrowRight size={14} />
      </button>
    </div>
  </motion.div>
);

const ProjectsPage = () => {
  const [filter, setFilter] = useState('All');
  
  const projects = [
    {
      title: "Quantum Nexus Alpha",
      category: "AI",
      image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800&q=80",
      summary: "Next-gen AI processing unit for enterprise-scale machine learning and data synthesis.",
      tags: ["Python", "PyTorch", "Kubernetes"],
    },
    {
      title: "Aether OS",
      category: "Enterprise",
      image: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=800&q=80",
      summary: "A secure, decentralized operating system for modern business infrastructure and secure communications.",
      tags: ["Rust", "WASM", "Security"],
    },
    {
      title: "Luminous Pay",
      category: "Fintech",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
      summary: "Revolutionary fintech platform facilitating instant global settlement with near-zero transaction costs.",
      tags: ["React", "Go", "Ethereum"],
    },
    {
      title: "Helix Media",
      category: "Web3",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
      summary: "The future of content distribution. Decentralized media platform empowering creators through direct monetization.",
      tags: ["Solidity", "IPFS", "Next.js"],
    },
  ];

  const categories = ['All', 'AI', 'Enterprise', 'Fintech', 'Web3'];
  const filteredProjects = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.hero}>
        <h1 className={styles.title}>The <span className={styles.highlight}>Blueprint</span> of Innovation</h1>
        <p className={styles.subtitle}>
          Explore our collection of high-impact digital products and system architectures that are reshaping industries.
        </p>
      </header>

      <nav className={styles.filterBar}>
        {categories.map((cat) => (
          <button 
            key={cat}
            className={`${styles.filterBtn} ${filter === cat ? styles.active : ''}`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </nav>

      <Section id="projects-grid">
        <motion.div layout className={styles.grid}>
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <ProjectCard key={project.title} project={project} delay={i * 0.1} />
            ))}
          </AnimatePresence>
        </motion.div>
      </Section>

      <Section id="cta" className={styles.ctaSection}>
        <div className={`${styles.ctaBox} glass`}>
          <h2>Ready to Build the Future?</h2>
          <p>Bring your vision to life with our elite team of engineers and designers.</p>
          <button className={styles.ctaBtn}>Start a Partnership</button>
        </div>
      </Section>
    </div>
  );
};

export default ProjectsPage;
