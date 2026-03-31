import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>✧</span>
            <span className={styles.logoText}>Aetheris</span>
          </div>
          <p className={styles.tagline}>Crafting the future of digital experiences with precision and vision.</p>
        </div>

        <div className={styles.linksGrid}>
          <div className={styles.linkCol}>
            <h4>Platform</h4>
            <ul>
              <li><a href="#hero">Overview</a></li>
              <li><a href="#services">Features</a></li>
              <li><a href="#portfolio">Solutions</a></li>
            </ul>
          </div>
          <div className={styles.linkCol}>
            <h4>Company</h4>
            <ul>
              <li><a href="#about">About</a></li>
              <li><a href="#team">Team</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className={styles.linkCol}>
            <h4>Legal</h4>
            <ul>
              <li><a href="#">Privacy</a></li>
              <li><a href="#">Terms</a></li>
              <li><a href="#">Status</a></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className={styles.bottom}>
        <p>&copy; 2026 Aetheris Digital. All Rights Reserved.</p>
        <div className={styles.socials}>
          <a href="#">𝕏</a>
          <a href="#">In</a>
          <a href="#">Gh</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
