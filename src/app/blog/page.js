'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowRight, 
  Calendar, 
  Clock, 
  TrendingUp,
  Rss
} from 'lucide-react';
import Section from '@/components/Section';
import GlassCard from '@/components/GlassCard';
import styles from './Blog.module.css';
import { blogPosts } from '@/data/blogPosts';

const BlogCard = ({ title, excerpt, date, readTime, category, image, slug, delay }) => (
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
        <Link href={`/blog/${slug}`} className={styles.readBtn}>
          Read Article <ArrowRight size={18} />
        </Link>
      </div>
    </GlassCard>
  </motion.div>
);

const BlogPage = () => {
  const featuredPost = {
    title: "The Architecture of Zero-Knowledge Proofs",
    excerpt: "How we solved for extreme privacy without compromising on real-time system performance in our latest enterprise implementation.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80",
    slug: "zero-knowledge-proofs-architecture" // Optional: we could add this to data too
  };

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.hero}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className={styles.heroBadge}
        >
          <Rss size={16} /> From the Blog
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className={styles.title}
        >
          Digital <span className={styles.highlight}>Insights</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={styles.subtitle}
        >
          Deep dives into engineering, design philosophy, and the future of technology from the Kingshima team.
        </motion.p>
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
              <img src={featuredPost.image} alt="Featured" />
            </div>
            <div className={styles.featuredContent}>
              <span className={styles.trending}><TrendingUp size={16} /> Featured Insight</span>
              <h2 className={styles.featuredTitle}>{featuredPost.title}</h2>
              <p className={styles.featuredExcerpt}>{featuredPost.excerpt}</p>
              <Link href={`/blog/${featuredPost.slug}`} className={styles.featuredBtn}>
                Continue Reading
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      <Section id="blog-grid">
        <div className={styles.grid}>
          {blogPosts.map((post, i) => (
            <BlogCard key={i} {...post} delay={i * 0.1} />
          ))}
        </div>
      </Section>

      <Section id="newsletter" className={styles.newsletter}>
        <div className={`${styles.newsletterBox} glass`}>
          <h2>Join the Vision</h2>
          <p>Subscribe to receive our monthly deep dives and system updates.</p>
          <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Email Address" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </Section>
    </div>
  );
};

export default BlogPage;
