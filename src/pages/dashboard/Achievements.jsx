import React from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Award, 
  Star, 
  Target, 
  Flame, 
  ShieldCheck, 
  Zap,
  Lock
} from 'lucide-react';
import styles from './Overview.module.css';

const Badge = ({ icon: Icon, title, description, isLocked, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.5 }}
    className="glass"
    style={{ padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border)', textAlign: 'center', opacity: isLocked ? 0.4 : 1, position: 'relative' }}
  >
    <div style={{ width: '64px', height: '64px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', color: isLocked ? 'var(--text-muted)' : 'var(--accent-primary)', boxShadow: isLocked ? 'none' : '0 0 20px var(--accent-glow)' }}>
      {isLocked ? <Lock size={24} /> : <Icon size={32} />}
    </div>
    <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{title}</h4>
    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>{description}</p>
  </motion.div>
);

const AchievementsPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div style={{ width: '100%' }}>
          <h1 className={styles.title}>Your Achievements</h1>
          <p className={styles.subtitle}>Celebrating every milestone and breakthrough in your journey.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1.5rem' }}>
        {[
          { icon: Star, title: "Foundation Start", description: "Successfully completed orientation.", isLocked: false },
          { icon: Trophy, title: "Skill Master", description: "Mastered your first technical skill.", isLocked: false },
          { icon: Flame, title: "Growth Streak", description: "Learning for 15 days in a row.", isLocked: false },
          { icon: ShieldCheck, title: "Integrity Lead", description: "Completed leadership ethics module.", isLocked: false },
          { icon: Zap, title: "Innovator", description: "First project prototype launched.", isLocked: false },
          { icon: Target, title: "Visionary", description: "Reach Level 5 in Kingdom Tech.", isLocked: true },
          { icon: Award, title: "Mentor Star", description: "Successfully mentored 3 peers.", isLocked: true },
          { icon: Award, title: "Global Impact", description: "Contribute to a community project.", isLocked: true }
        ].map((badge, i) => (
          <Badge key={i} {...badge} delay={i * 0.1} />
        ))}
      </div>

      <div className="glass" style={{ padding: '2rem', borderRadius: '16px', border: '1px solid var(--border)', marginTop: '3rem', textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Coming Soon: Certificates</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>We are working on a blockchain-verified certification system to validate your learning and achievements globally.</p>
      </div>
    </div>
  );
};

export default AchievementsPage;
