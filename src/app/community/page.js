'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users2, 
  Heart, 
  Globe2, 
  ShieldCheck, 
  Compass, 
  Zap,
  X, 
  Send, 
  Loader2, 
  CheckCircle2
} from 'lucide-react';
import Section from '@/components/Section';
import GlassCard from '@/components/GlassCard';
import styles from './About.module.css';

const ImpactCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6 }}
  >
    <GlassCard className={styles.valueCard}>
      <div className={styles.valueIcon}><Icon size={24} /></div>
      <h3 className={styles.valueTitle}>{title}</h3>
      <p className={styles.valueText}>{description}</p>
    </GlassCard>
  </motion.div>
);

export default function CommunityPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', linkedin: '', message: '' });
  const [status, setStatus] = useState({ type: '', text: '', url: '' });

  const handleApply = async (e) => {
    e.preventDefault();
    setStatus({ type: 'submitting', text: 'Sending your application...', url: '' });
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      
      if (res.ok) {
        setStatus({ type: 'success', text: data.message, url: data.previewUrl });
      } else {
        setStatus({ type: 'error', text: data.message || 'Application failed', url: '' });
      }
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', text: 'Network error. Please try again.', url: '' });
    }
  };

  const impacts = [
    {
      icon: Users2,
      title: "Youth Empowerment",
      description: "Directly mentoring over 500+ young innovators across tech and creative sectors.",
    },
    {
      icon: Heart,
      title: "Kingdom Values",
      description: "Infusing technology with spiritual purpose to build ethical, high-impact solutions.",
    },
    {
      icon: Globe2,
      title: "Global Network",
      description: "Connecting local talent with international opportunities and industry experts.",
    },
  ];

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.hero}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={styles.heroContent}
        >
          <h1 className={styles.title}>Our <span className={styles.highlight}>Community</span></h1>
          <p className={styles.subtitle}>
            The Kingshima Foundation is a family of innovators, artists, and leaders united by a single vision: to build a better future together.
          </p>
        </motion.div>
      </header>

      <Section id="impact-stories">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Impact and Purpose</h2>
          <p className={styles.sectionSubtitle}>Stories of transformation from our community of believers and builders.</p>
        </div>
        <div className={styles.valuesGrid}>
          {impacts.map((imp, i) => (
            <ImpactCard key={i} {...imp} delay={i * 0.15} />
          ))}
        </div>
      </Section>

      <Section id="mentorship" className={styles.teamVibe}>
        <div className={`${styles.vibeCard} glass`}>
          <h2 className={styles.vibeTitle}>Join the Mentorship Program</h2>
          <p className={styles.vibeText}>
            Our mentorship network is at the heart of everything we do. Whether you are looking to learn or give back, there is a place for you in the Kingshima family.
          </p>
          <div className={styles.vibeIcons}>
            <Compass size={40} />
            <ShieldCheck size={40} />
            <Zap size={40} />
          </div>
          <button className={styles.learnMore} style={{ marginTop: '2rem' }} onClick={() => setIsModalOpen(true)}>
            Apply as Mentor
          </button>
        </div>
      </Section>

      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass"
            style={{ width: '100%', maxWidth: '500px', backgroundColor: 'var(--bg-secondary)', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', borderBottom: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Apply as Mentor</h3>
              <button onClick={() => { setIsModalOpen(false); setStatus({ type: '', text: '', url: '' }); }} style={{ color: 'var(--text-muted)' }}><X size={20} /></button>
            </div>
            
            <div style={{ padding: '1.5rem' }}>
              {status.type === 'success' ? (
                <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                  <CheckCircle2 size={48} color="var(--accent-success, #10b981)" style={{ margin: '0 auto 1rem' }} />
                  <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', fontWeight: '700' }}>Application Received!</h4>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>{status.text}</p>
                  {status.url && (
                     <a href={status.url} target="_blank" rel="noreferrer" style={{ color: 'var(--accent-primary)', textDecoration: 'underline', fontSize: '0.9rem', fontWeight: '600' }}>
                       View generated test email (Ethereal)
                     </a>
                  )}
                  <button onClick={() => { setIsModalOpen(false); setStatus({ type: '', text: '', url: '' }); }} style={{ display: 'block', width: '100%', padding: '0.8rem', background: 'var(--surface)', color: 'white', borderRadius: '8px', marginTop: '2rem', fontWeight: '600' }}>Close</button>
                </div>
              ) : (
                <form onSubmit={handleApply} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>We're looking for experienced leaders to guide the next generation. Fill out the details below.</p>
                  
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.3rem', color: 'var(--text-secondary)' }}>Full Name</label>
                    <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-primary)', border: '1px solid var(--border)', borderRadius: '8px', color: 'white' }} placeholder="John Doe" />
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.3rem', color: 'var(--text-secondary)' }}>Email Address</label>
                    <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-primary)', border: '1px solid var(--border)', borderRadius: '8px', color: 'white' }} placeholder="john@example.com" />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.3rem', color: 'var(--text-secondary)' }}>LinkedIn Profile</label>
                    <input type="url" value={formData.linkedin} onChange={e => setFormData({...formData, linkedin: e.target.value})} style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-primary)', border: '1px solid var(--border)', borderRadius: '8px', color: 'white' }} placeholder="https://linkedin.com/in/johndoe" />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.3rem', color: 'var(--text-secondary)' }}>Why do you want to mentor?</label>
                    <textarea rows="4" required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-primary)', border: '1px solid var(--border)', borderRadius: '8px', color: 'white', resize: 'vertical' }} placeholder="Share your motivation..."></textarea>
                  </div>

                  {status.type === 'error' && <p style={{ color: '#ef4444', fontSize: '0.85rem' }}>{status.text}</p>}

                  <button type="submit" disabled={status.type === 'submitting'} style={{ marginTop: '0.5rem', width: '100%', padding: '0.9rem', background: 'var(--accent-primary)', color: 'white', borderRadius: '8px', fontWeight: '700', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', opacity: status.type === 'submitting' ? 0.7 : 1 }}>
                    {status.type === 'submitting' ? <><Loader2 size={18} className="spin" /> Sending...</> : <><Send size={18} /> Submit Application</>}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
