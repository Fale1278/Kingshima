import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Calendar, 
  Flame, 
  Award,
  ChevronRight,
  Bell,
  TrendingUp
} from 'lucide-react';
import styles from './Overview.module.css';

const GrowthCard = ({ title, value, label, icon: Icon, delay, color }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className={`${styles.statCard} glass`}
  >
    <div className={styles.statHeader}>
      <div className={styles.iconWrapper} style={{ color: color }}>{Icon && <Icon size={20} />}</div>
      <span className={styles.label}>{label}</span>
    </div>
    <div className={styles.statContent}>
      <h3 className={styles.statTitle}>{title}</h3>
      <p className={styles.statValue}>{value}</p>
    </div>
  </motion.div>
);

const GrowthChart = ({ data = [], months = [] }) => {
  if (!data || data.length === 0) return <div className={styles.chartPlaceholder}>No data available</div>;
  
  const points = data.map((d, i) => `${(i * 100) / (data.length - 1)},${100 - d}`).join(' ');

  return (
    <div className={styles.chartWrapper}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={styles.svgChart}>
        {/* Grid Lines */}
        {[0, 25, 50, 75, 100].map(line => (
          <line 
            key={line} 
            x1="0" y1={line} x2="100" y2={line} 
            stroke="var(--border)" strokeWidth="0.5" 
          />
        ))}
        
        {/* Main Growth Path */}
        <motion.polyline
          fill="none"
          stroke="var(--accent-primary)"
          strokeWidth="2"
          points={points}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          style={{ filter: 'drop-shadow(0 0 5px var(--accent-glow))' }}
        />
        
        {/* Fill Area */}
        <motion.polyline
          fill="url(#gradient)"
          stroke="none"
          points={`${points} 100,100 0,100`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ delay: 1, duration: 1 }}
        />

        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--accent-primary)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>

        {/* Data Points */}
        {data.map((d, i) => (
          <motion.circle
            key={i}
            cx={(i * 100) / (data.length - 1)}
            cy={100 - d}
            r="1.5"
            fill="var(--bg-secondary)"
            stroke="var(--accent-primary)"
            strokeWidth="0.5"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.5 + i * 0.1 }}
          />
        ))}
      </svg>
      <div className={styles.chartLabels}>
        {months.map(m => (
          <span key={m}>{m}</span>
        ))}
      </div>
    </div>
  );
};

const Overview = () => {
  const [stats, setStats] = useState([]);
  const [growthData, setGrowthData] = useState({ data: [], months: [] });
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const icons = [GraduationCap, Calendar, Flame, Award];

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('auth_token');
      const headers = { 'Authorization': `Bearer ${token}` };

      try {
        const [statsRes, growthRes, newsRes] = await Promise.all([
          fetch('/api/dashboard/stats', { headers }),
          fetch('/api/dashboard/growth', { headers }),
          fetch('/api/dashboard/announcements', { headers })
        ]);

        if (statsRes.ok) setStats(await statsRes.json());
        if (growthRes.ok) setGrowthData(await growthRes.json());
        if (newsRes.ok) setAnnouncements(await newsRes.json());
      } catch (err) {
        console.error('Failed to fetch dashboard data', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${styles.welcomeCard} glass`}
      >
        <div className={styles.welcomeText}>
          <h1 className={styles.title}>Welcome Home, <span className={styles.highlight}>Innovator</span></h1>
          <p className={styles.subtitle}>
            "For I know the plans I have for you," declares the Lord. Your journey of growth and impact continues today.
          </p>
          <button className={styles.ctaBtn}>Continue Your Path</button>
        </div>
      </motion.div>

      <div className={styles.statsGrid}>
        {stats.map((stat, i) => (
          <GrowthCard 
            key={i} 
            {...stat} 
            icon={icons[i % icons.length]} 
            delay={i * 0.1} 
          />
        ))}
      </div>

      <div className={styles.mainGrid}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className={`${styles.chartPanel} glass`}
          >
            <div className={styles.panelHeader}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <TrendingUp size={20} className={styles.highlight} />
                <h3>Learning & Impact Growth</h3>
              </div>
              <span className={styles.panelAction}>Last 6 Months</span>
            </div>
            <GrowthChart data={growthData.data} months={growthData.months} />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className={`${styles.chartPanel} glass`}
          >
            <div className={styles.panelHeader}>
              <h3>Active Training</h3>
              <span className={styles.panelAction}>View All <ChevronRight size={14} /></span>
            </div>
            <div className={styles.courseList}>
              {[
                { name: "Kingdom-Minded Tech Leadership", progress: 65, instructor: "Dr. Arinze" },
                { name: "Fullstack Cloud Engineering", progress: 40, instructor: "Engr. Sarah" },
                { name: "Digital Storytelling & Media", progress: 85, instructor: "Direct. James" }
              ].map((course, i) => (
                <div key={i} className={styles.courseItem}>
                  <div className={styles.courseInfo}>
                    <h4>{course.name}</h4>
                    <span>Mentor: {course.instructor}</span>
                  </div>
                  <div className={styles.courseProgress}>
                    <div className={styles.progressBar}>
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${course.progress}%` }}
                        transition={{ delay: 0.8 + i * 0.1, duration: 1 }}
                        className={styles.progressFill}
                      />
                    </div>
                    <span>{course.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className={`${styles.recentPanel} glass`}
        >
          <div className={styles.panelHeader}>
            <h3>Announcements</h3>
            <Bell size={18} className={styles.bellIcon} />
          </div>
          <div className={styles.announcementList}>
            {announcements.map((news, i) => (
              <div key={i} className={styles.newsItem}>
                <span className={styles.newsDate}>{news.date}</span>
                <p className={styles.newsText}>{news.text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Overview;
