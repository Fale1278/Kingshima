import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Search, 
  Filter, 
  Calendar, 
  BookOpen,
  ArrowRight,
  User,
  Clock,
  LayoutGrid,
  List as ListIcon
} from 'lucide-react';
import styles from './Projects.module.css';

const StatusBadge = ({ status }) => {
  const styles_map = {
    'In Progress': styles.statusInProgress,
    'Review': styles.statusReview,
    'Enrolled': styles.statusPlanning,
    'Completed': styles.statusCompleted,
  };
  return <span className={`${styles.statusBadge} ${styles_map[status] || styles.statusPlanning}`}>{status}</span>;
};

const ProgramCard = ({ program, onStart, delay }) => {
  const status = program.isCompleted ? 'Completed' : (program.progress > 0 ? 'In Progress' : 'Available');
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.4 }}
      className="glass"
      style={{ padding: '1.5rem', borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: '1rem', border: '1px solid var(--border)' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div className={styles.projectIcon}><BookOpen size={20} /></div>
        <StatusBadge status={status} />
      </div>
      
      <div>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '0.25rem', color: 'var(--text-primary)' }}>{program.title}</h3>
        <span style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{program.category}</span>
      </div>
      
      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5', margin: '0.5rem 0' }}>{program.description}</p>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <User size={14} /> {program.instructor}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <Clock size={14} /> {program.duration}
        </div>
      </div>
      
      <div style={{ marginTop: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.8rem', fontWeight: '700' }}>
          <span style={{ color: 'var(--text-muted)' }}>Course Progress</span>
          <span style={{ color: 'var(--accent-primary)' }}>{program.progress || 0}%</span>
        </div>
        <div className={styles.progressBar} style={{ height: '6px' }}>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${program.progress || 0}%` }}
            className={styles.progressFill} 
          />
        </div>
      </div>
      
      <div style={{ marginTop: '1rem' }}>
        {program.hasStarted ? (
          <button onClick={() => onStart(program._id)} className={styles.addBtn} style={{ width: '100%', justifyContent: 'center', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-primary)', boxShadow: 'none' }}>
            <Play size={16} fill="currentColor" /> Resume Learning
          </button>
        ) : (
          <button className={styles.addBtn} onClick={() => onStart(program._id)} style={{ width: '100%', justifyContent: 'center' }}>
            Start Course <ArrowRight size={16} />
          </button>
        )}
      </div>
    </motion.div>
  );
};

const ProgramsPage = () => {
  const navigate = useNavigate();
  const [programs, setPrograms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Leadership', 'Engineering', 'Media', 'Business', 'Spirituality'];

  const fetchData = async () => {
    setIsLoading(true);
    const token = localStorage.getItem('auth_token');
    const headers = { 'Authorization': `Bearer ${token}` };

    try {
      const [allRes, myRes] = await Promise.all([
        fetch('/api/programs', { headers }),
        fetch('/api/programs/my-programs', { headers })
      ]);

      const all = await allRes.json();
      const my = await myRes.json();

      const merged = (Array.isArray(all) ? all : []).map(p => {
        const userProg = (Array.isArray(my) ? my : []).find(m => m.program?._id === p._id);
        return {
          ...p,
          hasStarted: !!userProg,
          progress: userProg?.progress || 0,
          isCompleted: userProg?.isCompleted || false
        };
      });

      setPrograms(merged);
    } catch (err) {
      console.error('Failed to fetch programs', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStart = async (id) => {
    const token = localStorage.getItem('auth_token');
    
    // Check if it's already started
    const prog = programs.find(p => p._id === id);
    if (prog?.hasStarted) {
      navigate(`/dashboard/programs/${id}`);
      return;
    }

    try {
      const res = await fetch(`/api/programs/${id}/start`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        navigate(`/dashboard/programs/${id}`);
      }
    } catch (err) {
      console.error('Failed to start program', err);
    }
  };

  const filteredPrograms = programs.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>Learning Path</h1>
          <p className={styles.subtitle}>Browse our curated curriculum and track your professional evolution.</p>
        </div>
        <div className={styles.viewToggle}>
          <button 
            className={viewMode === 'grid' ? styles.activeView : ''} 
            onClick={() => setViewMode('grid')}
          >
            <LayoutGrid size={18} />
          </button>
          <button 
            className={viewMode === 'list' ? styles.activeView : ''} 
            onClick={() => setViewMode('list')}
          >
            <ListIcon size={18} />
          </button>
        </div>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.searchWrapper}>
          <Search size={18} className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Search curricula..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={styles.filterBtn}
              style={{ 
                whiteSpace: 'nowrap',
                background: activeCategory === cat ? 'var(--accent-primary)' : 'transparent',
                borderColor: activeCategory === cat ? 'var(--accent-primary)' : 'var(--border)',
                color: activeCategory === cat ? 'white' : 'var(--text-muted)'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div 
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.loading}
            style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}
          >
            <BookOpen size={48} style={{ margin: '0 auto 1rem', display: 'block', opacity: 0.2 }} />
            Initializing Catalog...
          </motion.div>
        ) : (
          <motion.div
            key={viewMode}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {viewMode === 'grid' ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
                {filteredPrograms.map((p, i) => (
                  <ProgramCard key={p._id} program={p} onStart={handleStart} delay={i * 0.05} />
                ))}
              </div>
            ) : (
              <div className={`${styles.tableWrapper} glass`}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Program</th>
                      <th>Status</th>
                      <th>Progress</th>
                      <th>Mentor</th>
                      <th>Duration</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPrograms.map((p, i) => (
                      <tr key={p._id} className={styles.row}>
                        <td className={styles.nameCell}>
                          <div className={styles.projectIcon}><BookOpen size={16} /></div>
                          <div className={styles.projectInfo}>
                            <span className={styles.projectName}>{p.title}</span>
                            <span className={styles.projectClient}>{p.category}</span>
                          </div>
                        </td>
                        <td><StatusBadge status={p.isCompleted ? 'Completed' : (p.progress > 0 ? 'In Progress' : 'Available')} /></td>
                        <td>
                          <div className={styles.progressWrapper}>
                            <div className={styles.progressBar}>
                              <div className={styles.progressFill} style={{ width: `${p.progress || 0}%` }} />
                            </div>
                            <span className={styles.progressText}>{p.progress || 0}%</span>
                          </div>
                        </td>
                        <td><div className={styles.avatar} title={p.instructor}>{p.instructor?.[0] || 'M'}</div></td>
                        <td className={styles.dateCell}><Clock size={14} /> {p.duration}</td>
                        <td className={styles.actionCell}>
                          {p.hasStarted ? (
                            <button onClick={() => handleStart(p._id)} className={styles.continueBtn}><Play size={14} fill="currentColor" /> Continue</button>
                          ) : (
                            <button className={styles.addBtn} onClick={() => handleStart(p._id)} style={{ padding: '0.4rem 1rem' }}>Start <ArrowRight size={14} /></button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            
            {!isLoading && filteredPrograms.length === 0 && (
              <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                No programs found matching your criteria.
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProgramsPage;
