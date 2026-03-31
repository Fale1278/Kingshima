import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  MapPin, 
  Link as LinkIcon, 
  Edit3, 
  Target, 
  Lightbulb, 
  Briefcase 
} from 'lucide-react';
import styles from './Overview.module.css';

const ProfilePage = () => {
  const user = {
    name: "John David",
    role: "Fullstack Engineering Lead",
    location: "Lagos, Nigeria",
    website: "kingshima.foundation/johndavid",
    bio: "Passionate about building scalable digital solutions that drive social impact and honor God through technical excellence.",
    skills: ["React.js", "Node.js", "Cloud Infrastructure", "Product Strategy"],
    goals: ["Become a Senior Mentor", "Contribute to 5 Community Projects", "Master AI/ML Integration"],
    interests: ["Creative Arts", "Social Entrepreneurship", "Faith & Technology"]
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <h1 className={styles.title}>My Profile</h1>
          <button className={styles.ctaBtn} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Edit3 size={18} /> Edit Profile
          </button>
        </div>
      </div>

      <div className={styles.mainGrid}>
        <div className="profile-left">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass"
            style={{ padding: '2.5rem', borderRadius: '16px', border: '1px solid var(--border)', textAlign: 'center', marginBottom: '2rem' }}
          >
            <div style={{ width: '100px', height: '100px', background: 'var(--surface)', border: '2px solid var(--accent-primary)', borderRadius: '50%', margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', fontWeight: '800', color: 'var(--accent-primary)' }}>
              JD
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '0.5rem' }}>{user.name}</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>{user.role}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MapPin size={16} /> {user.location}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><LinkIcon size={16} /> {user.website}</div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="glass"
            style={{ padding: '2rem', borderRadius: '16px', border: '1px solid var(--border)' }}
          >
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Target size={18} className={styles.highlight} /> My Goals
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {user.goals.map((goal, i) => (
                <li key={i} style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'start', gap: '0.5rem' }}>
                  <div style={{ width: '6px', height: '6px', background: 'var(--accent-primary)', borderRadius: '50%', marginTop: '0.4rem' }} />
                  {goal}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="profile-right">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass"
            style={{ padding: '2rem', borderRadius: '16px', border: '1px solid var(--border)', marginBottom: '2rem' }}
          >
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1rem' }}>About Me</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '1rem' }}>{user.bio}</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="glass"
            style={{ padding: '2rem', borderRadius: '16px', border: '1px solid var(--border)' }}
          >
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1.5rem' }}>Skills & Interests</h3>
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Core Skills</h4>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {user.skills.map((skill, i) => (
                  <span key={i} style={{ padding: '0.4rem 0.8rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '0.85rem', color: 'var(--text-primary)' }}>{skill}</span>
                ))}
              </div>
            </div>
            <div>
              <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Personal Interests</h4>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {user.interests.map((interest, i) => (
                  <span key={i} style={{ padding: '0.4rem 0.8rem', background: 'transparent', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{interest}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
