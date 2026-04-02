import React from 'react';
import Section from './Section';
import GlassCard from './GlassCard';
import styles from './Contact.module.css';

const Contact = () => {
  return (
    <Section id="contact">
      <div className={styles.header}>
        <h2 className={styles.title}>Join the Mission</h2>
        <p className={styles.subtitle}>Be a part of the movement that is transforming the lives of the next generation.</p>
      </div>

      <div className={styles.container}>
        <GlassCard className={styles.formCard}>
          <form className={styles.form}>
            <div className={styles.inputGroup}>
              <label>Full Name</label>
              <input type="text" placeholder="Your name" />
            </div>
            <div className={styles.inputGroup}>
              <label>Email Address</label>
              <input type="email" placeholder="yourname@example.com" />
            </div>
            <div className={styles.inputGroup}>
              <label>How would you like to get involved?</label>
              <select className={styles.select}>
                <option>Mentorship</option>
                <option>Skill Training</option>
                <option>Donation & Support</option>
                <option>General Inquiry</option>
              </select>
            </div>
            <div className={styles.inputGroup}>
              <label>Tell us your vision</label>
              <textarea placeholder="How do you see yourself contributing..."></textarea>
            </div>
            <button type="submit" className={styles.submitBtn}>Connect Now</button>
          </form>
        </GlassCard>

        <div className={styles.info}>
          <div className={styles.infoItem}>
            <h4>Foundation Hub</h4>
            {/* <p>12 Foundation Way<br />Digital Impact Center</p> */}
          </div>
          <div className={styles.infoItem}>
            <h4>Contact Info</h4>
            <p>kingshima@gmail.com<br />+234 903 9556 992 KINGSHIMA</p>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Contact;
