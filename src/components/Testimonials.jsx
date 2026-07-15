'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import Image from 'next/image';
import Section from './Section';
import GlassCard from './GlassCard';
import styles from './Testimonials.module.css';

const testimonials = [
  {
    name: "David Adeleke",
    role: "Senior Software Engineer",
    status: "Innovator",
    text: "The mentorship at Kingshima was a turning point in my career. I didn't just learn to code; I learned how to build systems that matter. The integration of faith and tech is truly unique.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80",
    rating: 5
  },
  {
    name: "Sarah Oladipo",
    role: "Visual Designer",
    status: "Student",
    text: "Working with the Kingshima team on my brand identity was an elite experience. They understood my vision perfectly and delivered a design system that stands out globally.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "SaaS Founder",
    status: "Partner",
    text: "I hired Kingshima to build our enterprise dashboard. Their engineering rigor is world-class. They solved complex data visualization challenges that others couldn't handle.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <Section id="testimonials">
      <div className={styles.container}>
        <div className={styles.header}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={styles.badge}
          >
            <Star size={14} fill="currentColor" /> Testimonials
          </motion.div>
          <h2 className={styles.title}>Voice of the <span className={styles.highlight}>Community</span></h2>
          <p className={styles.subtitle}>
            Hear from the innovators, students, and partners who have built their future with us.
          </p>
        </div>

        <div className={styles.grid}>
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <GlassCard className={styles.card}>
                <div className={styles.cardTop}>
                  <div className={styles.quoteIcon}>
                    <Quote size={24} fill="currentColor" />
                  </div>
                  <span className={`${styles.statusTag} ${styles[t.status.toLowerCase()]}`}>
                    {t.status}
                  </span>
                </div>
                
                <p className={styles.text}>"{t.text}"</p>
                
                <div className={styles.footer}>
                  <div className={styles.author}>
                    <div className={styles.avatarWrapper}>
                      <Image 
                        src={t.image} 
                        alt={`Avatar of ${t.name}`} 
                        width={48} 
                        height={48} 
                        className={styles.avatarImg} 
                      />
                    </div>
                    <div className={styles.info}>
                      <h4 className={styles.name}>{t.name}</h4>
                      <p className={styles.role}>{t.role}</p>
                    </div>
                  </div>
                  <div className={styles.stars}>
                    {[...Array(t.rating)].map((_, idx) => (
                      <Star key={idx} size={12} fill="var(--accent-primary)" color="var(--accent-primary)" />
                    ))}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Testimonials;
