import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>✧</span>
            <span className={styles.logoText}>Kingshima</span>
          </div>
          <p className={styles.tagline}>Empowering the next generation of digital leaders and innovators.</p>
        </div>

        <div className={styles.linksGrid}>
          <div className={styles.linkCol}>
            <h4>Foundation</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/programs">Programs</Link></li>
              <li><Link to="/community">Community</Link></li>
            </ul>
          </div>
          <div className={styles.linkCol}>
            <h4>Resources</h4>
            <ul>
              <li><Link to="/explore">Explore Paths</Link></li>
              <li><Link to="/blog">Our Blog</Link></li>
              <li><Link to="/careers">Careers</Link></li>
            </ul>
          </div>
          <div className={styles.linkCol}>
            <h4>Legal & Outreach</h4>
            <ul>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} Kingshima Foundation. All Rights Reserved.</p>
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
