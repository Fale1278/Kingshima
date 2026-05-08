'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './About.module.css';

const TermsPage = () => {
  return (
    <div className={styles.pageWrapper}>
      <header className={styles.hero}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.heroContent}
        >
          <h1 className={styles.title}>Terms of <span className={styles.highlight}>Service</span></h1>
          <p className={styles.subtitle}>
            Please read these terms carefully before engaging with the Kingshima Foundation ecosystem.
          </p>
        </motion.div>
      </header>

      <section style={{ padding: '4rem 5%', maxWidth: '800px', margin: '0 auto', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
        <h2 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '1.5rem', fontWeight: '700' }}>1. Agreement to Terms</h2>
        <p style={{ marginBottom: '2rem' }}>
          By accessing the Kingshima Foundation platform, enrolling in courses, or joining our community, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access the service.
        </p>

        <h2 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '1.5rem', fontWeight: '700' }}>2. Intellectual Property</h2>
        <p style={{ marginBottom: '2rem' }}>
          All original educational content, curriculum designs, code snippets, and platform architectures provided by the Kingshima Foundation remain the intellectual property of the organization. They are designated for your personal learning and may not be redistributed.
        </p>

        <h2 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '1.5rem', fontWeight: '700' }}>3. Code of Conduct</h2>
        <p style={{ marginBottom: '2rem' }}>
          We hold our community to a high standard of faith-driven ethics. Any form of harassment, unethical technical practices, or disruptive behavior in the forums or mentorship pairings will result in immediate termination of an account. 
        </p>

        <h2 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '1.5rem', fontWeight: '700' }}>4. Termination</h2>
        <p style={{ marginBottom: '2rem' }}>
          We may terminate or suspend access to our service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
        </p>
        
        <div style={{ marginTop: '3rem', padding: '1.5rem', background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)', textAlign: 'center' }}>
          <p>For clarifications on any specific terms, consult our <Link href="/contact" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>support team</Link>.</p>
        </div>
      </section>
    </div>
  );
};

export default TermsPage;
