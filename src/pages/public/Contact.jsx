import React from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  MapPin,
  Phone,
  Globe,
  Send,
  Share2,
  Link,
  MessageCircle
} from 'lucide-react';
import Section from '../../components/Section';
import GlassCard from '../../components/GlassCard';
import ContactForm from '../../components/Contact';
import styles from './Contact.module.css';

const ContactItem = ({ icon: Icon, title, content, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className={styles.contactItem}
  >
    <div className={styles.itemIcon}><Icon size={20} /></div>
    <div className={styles.itemText}>
      <h4>{title}</h4>
      <p>{content}</p>
    </div>
  </motion.div>
);

const AdvancedContactPage = () => {
  const contactDetails = [
    { icon: Mail, title: "Signal", content: "kingshima001@gmail.com" },
    { icon: Phone, title: "Comm-Link", content: "+234 903 9556 992" },
    { icon: MapPin, title: "HQ", content: "" },
    { icon: Globe, title: "Timezone", content: "" },
  ];

  const socialLinks = [
    { icon: Send, url: "#" },
    { icon: Share2, url: "#" },
    { icon: Link, url: "#" },
    { icon: MessageCircle, url: "#" },
  ];

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.hero}>
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className={styles.title}
        >
          Signal the <span className={styles.highlight}>Nexus</span>
        </motion.h1>
        <p className={styles.subtitle}>
          Have a vision requiring elite engineering? Our team is ready to prioritize your inquiry and join your mission.
        </p>
      </header>

      <div className={styles.mainGrid}>
        <div className={styles.infoSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Global HQ</h2>
            <p className={styles.sectionDesc}>Our operations are Hybrid.</p>
          </div>

          <div className={styles.detailsGrid}>
            {contactDetails.map((detail, i) => (
              <ContactItem key={i} {...detail} delay={i * 0.1} />
            ))}
          </div>

          <div className={styles.socials}>
            {socialLinks.map((link, i) => (
              <motion.a
                key={i}
                href={link.url}
                className={styles.socialIcon}
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(59, 130, 246, 0.2)' }}
                whileTap={{ scale: 0.95 }}
              >
                <link.icon size={20} />
              </motion.a>
            ))}
          </div>
        </div>

        <div className={styles.formSection}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard className={styles.contactCard}>
              <ContactForm />
            </GlassCard>
          </motion.div>
        </div>
      </div>

      <Section id="map" className={styles.mapSection}>
        <div className={`${styles.mapPlaceholder} glass`}>
          <div className={styles.mapTexture}></div>
          <div className={styles.mapPulse}></div>
          <p>Interactive Nexus Map Coming Soon...</p>
        </div>
      </Section>
    </div>
  );
};

export default AdvancedContactPage;
