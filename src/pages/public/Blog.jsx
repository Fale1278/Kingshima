import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Calendar, 
  Clock, 
  User, 
  Tag, 
  TrendingUp 
} from 'lucide-react';
import Section from '../../components/Section';
import GlassCard from '../../components/GlassCard';
import styles from './Blog.module.css';

const BlogCard = ({ title, excerpt, date, author, readTime, category, image, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6 }}
  >
    <GlassCard className={styles.blogCard}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={title} className={styles.image} />
        <span className={styles.category}>{category}</span>
      </div>
      <div className={styles.blogContent}>
        <div className={styles.blogMeta}>
          <span className={styles.metaItem}><Calendar size={14} /> {date}</span>
          <span className={styles.metaItem}><Clock size={14} /> {readTime}</span>
        </div>
        <h3 className={styles.blogTitle}>{title}</h3>
        <p className={styles.blogExcerpt}>{excerpt}</p>
        <button className={styles.readBtn}>
          Read Article <ArrowRight size={18} />
        </button>
      </div>
    </GlassCard>
  </motion.div>
);

const BlogPage = () => {
  const posts = [
    {
      title: "The Rise of Autonomous AI Agents",
      excerpt: "Exploring how decentralized AI systems are reshaping the enterprise landscape and automating critical decision-maling.",
      date: "Mar 28, 2026",
      author: "Dr. Elena Vostova",
      readTime: "8 min read",
      category: "Artificial Intelligence",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    },
    {
      title: "Blockchain Beyond the Hype",
      excerpt: "Moving from speculation to utility: building secure, scalable infrastructure for the real world.",
      date: "Mar 15, 2026",
      author: "Marcus Chen",
      readTime: "12 min read",
      category: "Web3",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
    },
    {
      title: "Quantum Computing: 2026 Outlook",
      excerpt: "What leading engineers need to know about the transition to quantum-resistant encryption and processing.",
      date: "Feb 28, 2026",
      author: "Sarah Jenkins",
      readTime: "15 min read",
      category: "Engineering",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80",
    },
  ];

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.hero}>
        <h1 className={styles.title}>Digital <span className={styles.highlight}>Insights</span></h1>
        <p className={styles.subtitle}>
          Deep dives into engineering, design philosophy, and the future of technology from the Aetheris team.
        </p>
      </header>

      <div className={styles.featuredSection}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className={`${styles.featuredCard} glass`}
        >
          <div className={styles.featuredGrid}>
            <div className={styles.featuredImage}>
              <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80" alt="Featured" />
            </div>
            <div className={styles.featuredContent}>
              <span className={styles.trending}><TrendingUp size={16} /> Featured Insight</span>
              <h2 className={styles.featuredTitle}>The Architecture of Zero-Knowledge Proofs</h2>
              <p className={styles.featuredExcerpt}>
                How we solved for extreme privacy without compromising on real-time system performance in our latest enterprise implementation.
              </p>
              <button className={styles.featuredBtn}>Continue Reading</button>
            </div>
          </div>
        </motion.div>
      </div>

      <Section id="blog-grid">
        <div className={styles.grid}>
          {posts.map((post, i) => (
            <BlogCard key={i} {...post} delay={i * 0.1} />
          ))}
        </div>
      </Section>

      <Section id="newsletter" className={styles.newsletter}>
        <div className={`${styles.newsletterBox} glass`}>
          <h2>Join the Vision</h2>
          <p>Subscribe to receive our monthly deep dives and system updates.</p>
          <form className={styles.form}>
            <input type="email" placeholder="Email Address" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </Section>
    </div>
  );
};

export default BlogPage;
