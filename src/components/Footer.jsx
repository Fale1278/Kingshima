'use client';

import React from 'react';
import Link from 'next/link';
import { Github, Twitter, Linkedin, Instagram } from './BrandIcons';
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
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/programs">Programs</Link></li>
              <li><Link href="/community">Community</Link></li>
            </ul>
          </div>
          <div className={styles.linkCol}>
            <h4>Resources</h4>
            <ul>
              <li><Link href="/explore">Explore Paths</Link></li>
              <li><Link href="/blog">Our Blog</Link></li>
              <li><Link href="/careers">Careers</Link></li>
            </ul>
          </div>
          <div className={styles.linkCol}>
            <h4>Legal &amp; Outreach</h4>
            <ul>
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms of Service</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} Kingshima Foundation. All Rights Reserved.</p>
        <div className={styles.socials}>
          <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={18} /></a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter"><Twitter size={18} /></a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={18} /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
