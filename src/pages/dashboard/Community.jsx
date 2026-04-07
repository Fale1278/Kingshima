import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  Heart, 
  Share2, 
  MoreHorizontal,
  Plus
} from 'lucide-react';
import styles from './Overview.module.css';

const CommunityUpdate = ({ post, onLike, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="glass"
    style={{ padding: '1.5rem', marginBottom: '1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
        <div style={{ width: '40px', height: '40px', background: 'var(--surface)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', border: '1px solid var(--border)' }}>
          {post.user?.name ? post.user.name[0] : 'U'}
        </div>
        <div>
          <h4 style={{ fontSize: '0.9rem', fontWeight: '600' }}>{post.user?.name || 'Anonymous'}</h4>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
      <button style={{ color: 'var(--text-muted)' }}><MoreHorizontal size={18} /></button>
    </div>
    <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '1.5rem' }}>{post.text}</p>
    <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
      <button onClick={() => onLike(post._id)} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <Heart size={16} fill={post.isLiked ? 'currentColor' : 'none'} /> {post.likes?.length || 0}
      </button>
      <button style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><MessageSquare size={16} /> {post.comments?.length || 0}</button>
      <button style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Share2 size={16} /> Share</button>
    </div>
  </motion.div>
);

const CommunityPage = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const token = localStorage.getItem('auth_token');
    try {
      const res = await fetch('/api/community', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) setPosts(await res.json());
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePost = async () => {
    if (!newPost.trim()) return;
    const token = localStorage.getItem('auth_token');
    try {
      const res = await fetch('/api/community', {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ text: newPost })
      });
      if (res.ok) {
        setNewPost('');
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLike = async (id) => {
    const token = localStorage.getItem('auth_token');
    try {
      await fetch(`/api/community/${id}/like`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <div>
            <h1 className={styles.title}>Community Space</h1>
            <p className={styles.subtitle}>Connect, share, and grow with your fellow innovators.</p>
          </div>
        </div>
      </div>

      <div className={styles.mainGrid}>
        <div className="feed" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="glass" style={{ padding: '1.5rem', marginBottom: '2rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
             <textarea 
               value={newPost}
               onChange={(e) => setNewPost(e.target.value)}
               placeholder="What's on your mind?" 
               style={{ width: '100%', background: 'transparent', border: 'none', color: 'var(--text-primary)', resize: 'none', minHeight: '80px', outline: 'none' }}
             />
             <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
               <button onClick={handlePost} className={styles.ctaBtn} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.5rem' }}>
                  <Plus size={18} /> Post
               </button>
             </div>
          </div>

          {isLoading ? <p>Loading feed...</p> : posts.map((post, i) => (
            <CommunityUpdate key={post._id} post={post} onLike={handleLike} delay={i * 0.1} />
          ))}

          {!isLoading && posts.length === 0 && <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No posts yet. Be the first to share something!</p>}
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
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
