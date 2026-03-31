import React from 'react';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.background}></div>
      
      <div className={styles.content}>
        <h1 className={styles.title}>
          <span className={styles.highlight}>Empowering</span> Kingdom-Minded<br />
          Innovators
        </h1>
        <p className={styles.subtitle}>
          The Kingshima Foundation bridges the gap between spiritual purpose and digital innovation, equipping the next generation to lead with integrity and excellence.
        </p>
        
        <div className={styles.ctaGroup}>
          <button className={styles.primaryBtn}>Explore Our Mission</button>
          <button className={styles.secondaryBtn}>Join the Community</button>
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
