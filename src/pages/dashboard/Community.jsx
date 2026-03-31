import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  MessageSquare, 
  Heart, 
  Share2, 
  MoreHorizontal,
  Plus
} from 'lucide-react';
import styles from './Overview.module.css';

const CommunityUpdate = ({ user, time, content, likes, comments, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="glass"
    style={{ padding: '1.5rem', marginBottom: '1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
        <div style={{ width: '40px', height: '40px', background: 'var(--surface)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', border: '1px solid var(--border)' }}>{user[0]}</div>
        <div>
          <h4 style={{ fontSize: '0.9rem', fontWeight: '600' }}>{user}</h4>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{time}</span>
        </div>
      </div>
      <button style={{ color: 'var(--text-muted)' }}><MoreHorizontal size={18} /></button>
    </div>
    <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '1.5rem' }}>{content}</p>
    <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
      <button style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Heart size={16} /> {likes}</button>
      <button style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><MessageSquare size={16} /> {comments}</button>
      <button style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Share2 size={16} /> Share</button>
    </div>
  </motion.div>
);

const CommunityPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <div>
            <h1 className={styles.title}>Community Space</h1>
            <p className={styles.subtitle}>Connect, share, and grow with your fellow innovators.</p>
          </div>
          <button className={styles.ctaBtn} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Plus size={18} /> New Post
          </button>
        </div>
      </div>

      <div className={styles.mainGrid}>
        <div className="feed">
          {[
            { user: "Sarah Johnson", time: "2 hours ago", content: "Just finished the first module of Kingdom Tech Leadership. The section on servant leadership really changed my perspective on team management!", likes: 24, comments: 8 },
            { user: "Marcus Chen", time: "5 hours ago", content: "Is anyone attending the Media Workshop this Saturday? Looking forward to learning some new cinematography techniques.", likes: 12, comments: 4 },
            { user: "Elena Rodriguez", time: "Yesterday", content: "Blessed to be part of such an inspiring community. Let's keep building solutions that honor God!", likes: 45, comments: 12 }
          ].map((post, i) => (
            <CommunityUpdate key={i} {...post} delay={i * 0.1} />
          ))}
        </div>

        <div className="sidebar" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="glass" style={{ padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>Trending Topics</h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li style={{ fontSize: '0.9rem', color: 'var(--accent-primary)' }}>#KingdomInnovation</li>
              <li style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>#TechServantShip</li>
              <li style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>#CreativeWorship</li>
            </ul>
          </div>
          <div className="glass" style={{ padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>Active Mentors</h3>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {['A', 'B', 'C', 'D'].map(m => (
                <div key={m} style={{ width: '32px', height: '32px', background: 'var(--surface)', borderRadius: '50%', border: '1px solid var(--border)' }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
