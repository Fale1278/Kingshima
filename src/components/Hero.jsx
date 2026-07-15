'use client';

import React from 'react';
import Link from 'next/link';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section id="hero" className={styles.hero} style={{ position: 'relative' }}>
      <div className={styles.content} style={{ position: 'relative', zIndex: 10 }}>
        <h1 className={styles.title}>
          <span className={styles.highlight}>Faith + Tech</span><br />
          Innovation
        </h1>
        <p className={styles.subtitle}>
          The Kingshima Foundation is a faith-driven, youth-focused initiative dedicated to
          equipping young people with technical skills, creative tools, and Godly values to help
          them thrive in a fast-changing world.
        </p>

        <div className={styles.ctaGroup}>
          <Link href="/explore" className={styles.primaryBtn}>Explore Our Mission</Link>
          <Link href="/community" className={styles.secondaryBtn}>Join the Community</Link>
        </div>
      </div>

      <div className={styles.scrollIndicator}>
        <div className={styles.mouse}>
          <div className={styles.wheel}></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
