import React, { useState, useEffect } from 'react';
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

const IconMap = {
  Trophy,
  Award,
  Star,
  Target,
  Flame,
  ShieldCheck,
  Zap
};

const Badge = ({ icon, title, description, isLocked, delay }) => {
  const IconComponent = IconMap[icon] || Award;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
      className="glass"
      style={{ padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border)', textAlign: 'center', opacity: isLocked ? 0.4 : 1, position: 'relative' }}
    >
      <div style={{ width: '64px', height: '64px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', color: isLocked ? 'var(--text-muted)' : 'var(--accent-primary)', boxShadow: isLocked ? 'none' : '0 0 20px var(--accent-glow)' }}>
        {isLocked ? <Lock size={24} /> : <IconComponent size={32} />}
      </div>
      <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{title}</h4>
      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>{description}</p>
    </motion.div>
  );
};

const AchievementsPage = () => {
  const [achievements, setAchievements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAchievements = async () => {
      const token = localStorage.getItem('auth_token');
      try {
        const res = await fetch('/api/achievements', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setAchievements(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div style={{ width: '100%' }}>
          <h1 className={styles.title}>Your Achievements</h1>
          <p className={styles.subtitle}>Celebrating every milestone and breakthrough in your journey.</p>
        </div>
      </div>

      {isLoading ? (
        <p>Loading your milestones...</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1.5rem' }}>
          {achievements.map((badge, i) => (
            <Badge key={badge._id} {...badge} delay={i * 0.1} />
          ))}
        </div>
      )}

      <div className="glass" style={{ padding: '2rem', borderRadius: '16px', border: '1px solid var(--border)', marginTop: '3rem', textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Coming Soon: Certificates</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>We are working on a blockchain-verified certification system to validate your learning and achievements globally.</p>
      </div>
    </div>
  );
};

export default AchievementsPage;
