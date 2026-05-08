'use client';

import React, { useState } from 'react';
import Section from './Section';
import GlassCard from './GlassCard';
import styles from './Contact.module.css';
import { Send, Loader2, CheckCircle2 } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'Mentorship', message: '' });
  const [status, setStatus] = useState({ type: '', text: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'submitting', text: 'Sending your signal...' });
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      
      if (res.ok) {
        setStatus({ type: 'success', text: 'Message received! We will get back to you soon.' });
        setFormData({ name: '', email: '', subject: 'Mentorship', message: '' });
      } else {
        setStatus({ type: 'error', text: data.message || 'Failed to connect.' });
      }
    } catch (err) {
      setStatus({ type: 'error', text: 'Network error. Please try again.' });
    }
  };

  return (
    <Section id="contact">
      <div className={styles.header}>
        <h2 className={styles.title}>Join the Mission</h2>
        <p className={styles.subtitle}>Be a part of the movement that is transforming the lives of the next generation.</p>
      </div>

      <div className={styles.container}>
        <GlassCard className={styles.formCard}>
          {status.type === 'success' ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <CheckCircle2 color="var(--accent-success, #10b981)" size={48} style={{ margin: '0 auto 1rem' }} />
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Message Received</h3>
              <p style={{ color: 'var(--text-secondary)' }}>{status.text}</p>
              <button 
                onClick={() => setStatus({ type: '', text: '' })}
                style={{ marginTop: '2rem', padding: '0.75rem 1.5rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', color: 'white', fontWeight: '600' }}
              >
                Send Another
              </button>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <label>Full Name</label>
                <input required type="text" placeholder="Your name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className={styles.inputGroup}>
                <label>Email Address</label>
                <input required type="email" placeholder="yourname@example.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>
              <div className={styles.inputGroup}>
                <label>How would you like to get involved?</label>
                <select className={styles.select} value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})}>
                  <option value="Mentorship">Mentorship</option>
                  <option value="Skill Training">Skill Training</option>
                  <option value="Donation & Support">Donation & Support</option>
                  <option value="General Inquiry">General Inquiry</option>
                </select>
              </div>
              <div className={styles.inputGroup}>
                <label>Tell us your vision</label>
                <textarea required placeholder="How do you see yourself contributing..." value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
              </div>
              
              {status.type === 'error' && <p style={{ color: '#ef4444', fontSize: '0.9rem', marginBottom: '1rem' }}>{status.text}</p>}
              
              <button type="submit" disabled={status.type === 'submitting'} className={styles.submitBtn} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', opacity: status.type === 'submitting' ? 0.7 : 1 }}>
                {status.type === 'submitting' ? <><Loader2 size={18} className="spin" /> Transmitting...</> : <><Send size={18} /> Connect Now</>}
              </button>
            </form>
          )}
        </GlassCard>

        <div className={styles.info}>
          <div className={styles.infoItem}>
            <h4>Foundation Hub</h4>
            <p>Digital Hub<br />Kingshima Center</p>
          </div>
          <div className={styles.infoItem}>
            <h4>Contact Info</h4>
            <p>kingshima@gmail.com<br />+234 903 9556 992</p>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Contact;
