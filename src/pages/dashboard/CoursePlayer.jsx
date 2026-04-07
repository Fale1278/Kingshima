import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  CheckCircle, 
  Lock, 
  Menu, 
  X,
  FileText,
  Video,
  ExternalLink,
  Award
} from 'lucide-react';
import styles from './Overview.module.css'; // Utilizing common dashboard styles

const CoursePlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [program, setProgram] = useState(null);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // Mock lessons for the player logic
  const mockLessons = [
    { title: "Introduction to Spiritual Leadership", type: "video", duration: "12:45", completed: true },
    { title: "The Heart of an Innovator", type: "reading", duration: "10 min", completed: true },
    { title: "Modern Technical Architectures", type: "video", duration: "24:30", completed: false },
    { title: "Building with Purpose: A Case Study", type: "video", duration: "18:20", completed: false },
    { title: "Leadership Ethics in Crisis", type: "reading", duration: "15 min", completed: false },
    { title: "Final Capstone Project", type: "assignment", duration: "Project", completed: false },
  ];

  useEffect(() => {
    const fetchProgram = async () => {
      const token = localStorage.getItem('auth_token');
      try {
        const res = await fetch(`/api/programs`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const all = await res.json();
          const found = all.find(p => p._id === id);
          setProgram(found);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProgram();
  }, [id]);

  const activeLesson = mockLessons[activeLessonIndex];

  if (isLoading) return <div style={{ color: 'white', padding: '2rem' }}>Loading Learning Environment...</div>;

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 120px)', background: 'var(--bg-primary)', borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--border)' }}>
      {/* Sidebar Navigation */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: '320px', opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="glass"
            style={{ borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column' }}
          >
            <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '800' }}>Curriculum</h3>
              <button onClick={() => setSidebarOpen(false)} style={{ color: 'var(--text-muted)' }}><X size={18} /></button>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
              {mockLessons.map((lesson, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveLessonIndex(idx)}
                  style={{ 
                    width: '100%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.75rem', 
                    padding: '1rem', 
                    borderRadius: '12px', 
                    marginBottom: '0.5rem',
                    background: activeLessonIndex === idx ? 'var(--surface)' : 'transparent',
                    border: activeLessonIndex === idx ? '1px solid var(--accent-primary)' : '1px solid transparent',
                    color: activeLessonIndex === idx ? 'var(--text-primary)' : 'var(--text-muted)',
                    textAlign: 'left',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ color: lesson.completed ? 'var(--accent-success)' : 'inherit' }}>
                    {lesson.completed ? <CheckCircle size={18} /> : (idx > activeLessonIndex + 1 ? <Lock size={18} /> : <Play size={18} />)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: '700' }}>{lesson.title}</div>
                    <div style={{ fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      {lesson.type === 'video' ? <Video size={10} /> : <FileText size={10} />}
                      {lesson.duration}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Player */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
        {!sidebarOpen && (
          <button 
            onClick={() => setSidebarOpen(true)}
            style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', zIndex: 10, background: 'var(--surface)', padding: '0.5rem', borderRadius: '10px', color: 'white', border: '1px solid var(--border)' }}
          >
            <Menu size={20} />
          </button>
        )}

        <div style={{ flex: 1, padding: '2.5rem', overflowY: 'auto' }}>
          <header style={{ marginBottom: '2rem' }}>
            <button onClick={() => navigate('/dashboard/programs')} style={{ color: 'var(--accent-primary)', fontSize: '0.8rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <ChevronLeft size={16} /> BACK TO PATH
            </button>
            <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem' }}>{activeLesson.title}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              <span>{program?.title}</span>
              <span style={{ width: '4px', height: '4px', background: 'var(--border)', borderRadius: '50%' }} />
              <span>Module {activeLessonIndex + 1}</span>
            </div>
          </header>

          <div 
            className="glass" 
            style={{ 
              aspectRatio: '16/9', 
              width: '100%', 
              borderRadius: '24px', 
              display: 'flex', 
              alignItems: 'center', 
              justifySelf: 'center',
              justifyContent: 'center',
              background: '#0a0a0b',
              border: '1px solid var(--border)',
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            {activeLesson.type === 'video' ? (
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: '80px', height: '80px', background: 'var(--accent-primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', boxShadow: '0 0 30px var(--accent-glow)' }}>
                  <Play fill="white" size={32} />
                </div>
                <p style={{ fontWeight: '700', letterSpacing: '1px' }}>STREAMING VIDEO CONTENT</p>
              </div>
            ) : (
              <div style={{ padding: '4rem', maxWidth: '800px', textAlign: 'center' }}>
                <FileText size={48} style={{ color: 'var(--accent-primary)', marginBottom: '1.5rem' }} />
                <h2 style={{ marginBottom: '1rem' }}>Lecture Notes & Documentation</h2>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                  This lesson focuses on the theoretical frameworks of leadership. Please review the attached PDF documents and prepare your notes for the weekly seminar.
                </p>
                <button className={styles.ctaBtn} style={{ marginTop: '2rem' }}><ExternalLink size={16} /> Open Resource</button>
              </div>
            )}
          </div>

          <div style={{ marginTop: '3rem', maxWidth: '900px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '1rem' }}>About this lesson</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '1rem' }}>
              In this segment, we explore the intersection of technical excellence and visionary leadership. 
              Dr. Arinze discusses how to maintain spiritual grounding while managing complex engineering 
              schedules and stakeholder expectations. You'll learn how to cast a vision that inspires teams 
              beyond simple code delivery.
            </p>
          </div>
        </div>

        {/* Footer Controls */}
        <div style={{ padding: '1.5rem 2.5rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-secondary)' }}>
          <button 
            disabled={activeLessonIndex === 0}
            onClick={() => setActiveLessonIndex(prev => prev - 1)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700', color: activeLessonIndex === 0 ? 'var(--text-muted)' : 'var(--text-primary)' }}
          >
            <ChevronLeft size={18} /> Previous
          </button>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
             <button style={{ color: 'var(--accent-primary)', fontWeight: '700', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
               <Award size={18} /> View Certificate
             </button>
             <button className={styles.ctaBtn} onClick={() => setActiveLessonIndex(prev => Math.min(prev + 1, mockLessons.length - 1))}>
               {activeLessonIndex === mockLessons.length - 1 ? 'Complete Program' : 'Complete & Next'} <ChevronRight size={18} />
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePlayer;
