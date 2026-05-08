'use client';

import React from 'react';
import Section from './Section';
import GlassCard from './GlassCard';
import styles from './About.module.css';

const About = () => {
  return (
    <Section id="about">
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>Defying the Ordinary</h2>
          <p className={styles.description}>
            The Kingshima Foundation isn't just about building skills—we are cultivating the leaders of tomorrow. Our mission is to bridge the gap between imagination and spiritual purpose by leveraging the most advanced technologies available.
          </p>
          <div className={styles.stats}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>500+</span>
              <span className={styles.statLabel}>Youth Empowered</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>15</span>
              <span className={styles.statLabel}>Mentors Enlisted</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>2025</span>
              <span className={styles.statLabel}>Founded</span>
            </div>
          </div>
        </div>

        <GlassCard className={styles.card}>
          <h3 className={styles.cardTitle}>Our Vision</h3>
          <p className={styles.cardText}>
            To raise a generation of Godly youths who are technically empowered, purpose-
            driven, and who — through innovation — become agents of positive change in their
            communities and beyond.
          </p>
        </GlassCard>
      </div>
    </Section>
  );
};

export default About;
