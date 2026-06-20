'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, Lock, GraduationCap, LayoutDashboard,
  LogOut, Menu, PlayCircle, BookOpen, Clock, X, CreditCard, ChevronDown
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useBootcampAuth } from '@/context/BootcampAuthContext';
import { COURSES } from '@/data/coursesData';
import styles from './page.module.css';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

export default function DashboardPage() {
  const { student, login, logout, loading } = useBootcampAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeCourseId, setActiveCourseId] = useState(null);

  // Simulated Checkout states
  const [checkoutCourse, setCheckoutCourse] = useState(null);
  const [ccName, setCcName] = useState('');
  const [ccNumber, setCcNumber] = useState('');
  const [ccExpiry, setCcExpiry] = useState('');
  const [ccCvc, setCcCvc] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('idle');

  useEffect(() => {
    if (!loading && !student) {
      router.replace('/bootcamp/login');
    }
  }, [student, loading, router]);

  useEffect(() => {
    if (student) {
      const saved = localStorage.getItem('active_course_id');
      if (saved && COURSES.some((c) => c.id === saved)) {
        setActiveCourseId(saved);
      }
    }
  }, [student]);

  if (loading || !student) {
    return (
      <div className={styles.loadingScreen}>
        <span className={styles.loadingSpinner} />
      </div>
    );
  }

  const progress = student.progress || [];

  const isEnrolled = (courseId) => progress.includes(`enrolled-${courseId}`);
  const isPaid = (courseId) => progress.includes(`paid-${courseId}`);

  const activeCourse = COURSES.find((c) => c.id === activeCourseId) || null;
  const isCurrentlyPaid = activeCourse ? isPaid(activeCourse.id) : false;

  const getCourseStats = (course) => {
    if (!course) return { completedCount: 0, total: 0, pct: 0 };
    const allLessonIds = course.curriculum.flatMap((w) => w.lessons.map((l) => l.id));
    const completedList = allLessonIds.filter((id) => progress.includes(id));
    const completedCount = completedList.length;
    const total = allLessonIds.length;
    const pct = total > 0 ? Math.round((completedCount / total) * 100) : 0;
    return { completedCount, total, pct };
  };

  const activeStats = activeCourse ? getCourseStats(activeCourse) : { completedCount: 0, total: 0, pct: 0 };

  const currentWeek = activeCourse && isCurrentlyPaid
    ? activeCourse.curriculum.find((w) =>
        w.lessons.some((l) => !progress.includes(l.id))
      ) || activeCourse.curriculum[activeCourse.curriculum.length - 1]
    : null;

  const updateProgressInDb = async (newProgress) => {
    const updatedStudent = { ...student, progress: newProgress };
    login(updatedStudent);

    try {
      await supabase
        .from('students')
        .update({ progress: newProgress })
        .eq('id', student.id);
    } catch (err) {
      console.error('Failed to sync progress with Supabase:', err);
    }
  };

  const handleEnroll = async (courseId) => {
    if (isEnrolled(courseId)) return;
    const newProgress = [...progress, `enrolled-${courseId}`];
    await updateProgressInDb(newProgress);
  };

  const handleOpenCheckout = (course) => {
    setCheckoutCourse(course);
    setCcName('');
    setCcNumber('');
    setCcExpiry('');
    setCcCvc('');
    setPaymentStatus('idle');
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (!ccName || !ccNumber || !ccExpiry || !ccCvc) return;

    setPaymentStatus('processing');
    setTimeout(async () => {
      setPaymentStatus('success');
      
      const newProgress = [...progress];
      if (!newProgress.includes(`enrolled-${checkoutCourse.id}`)) {
        newProgress.push(`enrolled-${checkoutCourse.id}`);
      }
      if (!newProgress.includes(`paid-${checkoutCourse.id}`)) {
        newProgress.push(`paid-${checkoutCourse.id}`);
      }

      await updateProgressInDb(newProgress);

      setTimeout(() => {
        setCheckoutCourse(null);
        setActiveCourseId(checkoutCourse.id);
        localStorage.setItem('active_course_id', checkoutCourse.id);
      }, 1500);
    }, 2000);
  };

  const handleSelectCourse = (courseId) => {
    setActiveCourseId(courseId);
    if (courseId) {
      localStorage.setItem('active_course_id', courseId);
    } else {
      localStorage.removeItem('active_course_id');
    }
    setSidebarOpen(false);
  };

  return (
    <div className={styles.shell}>

      {/* ── Sidebar ───────────────────────────── */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarInner}>
          <div className={styles.sidebarLogo}>
            <LayoutDashboard className={styles.logoIcon} />
            <span className={styles.logoText}>Kingshima Hub</span>
          </div>

          <div className={styles.sidebarCourseSelector}>
            <span className={styles.courseSelectLabel}>My Learning Tracks</span>
            <div className={styles.customDropdownContainer}>
              <button 
                className={styles.customDropdownBtn} 
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className={styles.customDropdownText}>
                  {activeCourse ? activeCourse.title : 'Course Catalog'}
                </span>
                <ChevronDown size={16} className={`${styles.dropdownIcon} ${dropdownOpen ? styles.dropdownIconOpen : ''}`} />
              </button>
              
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.15 }}
                    className={styles.customDropdownMenu}
                  >
                    <button 
                      className={`${styles.dropdownItem} ${!activeCourseId ? styles.dropdownItemActive : ''}`}
                      onClick={() => { handleSelectCourse(null); setDropdownOpen(false); }}
                    >
                      <LayoutDashboard size={14} /> Course Catalog
                    </button>
                    {COURSES.map((c) => (
                      <button 
                        key={c.id} 
                        className={`${styles.dropdownItem} ${activeCourseId === c.id ? styles.dropdownItemActive : ''}`}
                        onClick={() => { handleSelectCourse(c.id); setDropdownOpen(false); }}
                      >
                        <BookOpen size={14} /> {c.title}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <nav className={styles.sidebarNav}>
            {activeCourse && isCurrentlyPaid ? (
              <>
                <p className={styles.navLabel}>Course Syllabus</p>
                {activeCourse.curriculum.map((week) => {
                  const weekDone = week.lessons.every((l) => progress.includes(l.id));
                  const weekActive = currentWeek && currentWeek.week === week.week;
                  return (
                    <div
                      key={week.week}
                      className={`${styles.weekNav} ${weekActive ? styles.weekNavActive : ''}`}
                    >
                      <div className={styles.weekNavHeader}>
                        <span
                          className={styles.weekDot}
                          style={{ background: weekDone ? '#34d399' : weekActive ? week.color : 'rgba(255,255,255,0.1)' }}
                        />
                        <span className={styles.weekNavTitle}>Week {week.week}</span>
                      </div>
                      <ul className={styles.lessonNav}>
                        {week.lessons.map((lesson) => {
                          const done = progress.includes(lesson.id);
                          return (
                            <li key={lesson.id}>
                              <Link
                                href={`/bootcamp/dashboard/lesson/${lesson.id}`}
                                className={`${styles.lessonNavLink} ${done ? styles.lessonDone : ''}`}
                                onClick={() => setSidebarOpen(false)}
                              >
                                {done ? (
                                  <CheckCircle2 className={styles.lessonIcon} size={14} />
                                ) : (
                                  <PlayCircle className={styles.lessonIcon} size={14} />
                                )}
                                {lesson.title}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
              </>
            ) : (
              <div style={{ padding: '0 0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Select an unlocked course to view your syllabus outline.
              </div>
            )}
          </nav>

          <button className={styles.logoutBtn} onClick={logout}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className={styles.overlay}
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── Main Panel ────────────────────────── */}
      <div className={styles.main}>

        <header className={styles.topbar}>
          <button
            className={styles.menuBtn}
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
          <div className={styles.topbarRight}>
            <div className={styles.userProfile}>
              <div className={styles.userAvatar}>
                {student.username.charAt(0).toUpperCase()}
              </div>
              <span className={styles.topbarName}>{student.username}</span>
            </div>
          </div>
        </header>

        <main className={styles.content}>

          {activeCourseId === null ? (
            <motion.div variants={containerVariants} initial="hidden" animate="show">
              <motion.section variants={itemVariants} className={styles.welcomeSection}>
                <div className={styles.welcomeText}>
                  <h1 className={styles.welcomeTitle}>
                    Welcome back, <span className={styles.accent}>{student.username}</span>
                  </h1>
                  <p className={styles.welcomeDesc}>
                    Your learning hub. Select a track, continue your progress, or enroll in a new skill.
                  </p>
                </div>
              </motion.section>

              <motion.section variants={itemVariants} className={styles.courseSection}>
                <div className={styles.courseCatalogGrid}>
                  {COURSES.map((course) => {
                    const enrolled = isEnrolled(course.id);
                    const paid = isPaid(course.id);
                    const stats = getCourseStats(course);

                    return (
                      <motion.div key={course.id} variants={itemVariants} className={styles.catalogCard}>
                        <div 
                          className={styles.catalogCardImage} 
                          style={{ backgroundImage: `url(${course.imageUrl})` }}
                        >
                          <div className={styles.catalogBadgeContainer}>
                            {paid ? (
                              <span className={`${styles.badge} ${styles.badgePaid}`}><CheckCircle2 size={12}/> Active</span>
                            ) : enrolled ? (
                              <span className={`${styles.badge} ${styles.badgeEnrolled}`}><CreditCard size={12}/> Enrolled</span>
                            ) : (
                              <span className={`${styles.badge} ${styles.badgeUnenrolled}`}><Lock size={12}/> Locked</span>
                            )}
                          </div>
                        </div>
                        <div className={styles.catalogCardContent}>
                          <h3 className={styles.catalogCardTitle}>{course.title}</h3>
                          <p className={styles.catalogCardDesc}>{course.description}</p>
                          {paid && (
                            <div style={{ marginTop: '0.5rem' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                                <span>Progress</span>
                                <span>{stats.pct}%</span>
                              </div>
                              <div className={styles.weekProgressBar}>
                                <div className={styles.weekProgressFill} style={{ width: `${stats.pct}%`, background: 'var(--accent-primary)' }} />
                              </div>
                            </div>
                          )}
                        </div>
                        <div className={styles.catalogCardFooter}>
                          <span className={styles.catalogPrice}>${course.price}</span>
                          
                          {!enrolled && !paid && (
                            <button 
                              onClick={() => handleEnroll(course.id)}
                              className={`${styles.catalogActionBtn} ${styles.btnEnroll}`}
                            >
                              Enroll Now
                            </button>
                          )}
                          {enrolled && !paid && (
                            <button 
                              onClick={() => handleOpenCheckout(course)}
                              className={`${styles.catalogActionBtn} ${styles.btnPay}`}
                            >
                              Unlock Access
                            </button>
                          )}
                          {paid && (
                            <button 
                              onClick={() => handleSelectCourse(course.id)}
                              className={`${styles.catalogActionBtn} ${styles.btnEnter}`}
                            >
                              Syllabus <PlayCircle size={16}/>
                            </button>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.section>
            </motion.div>
          ) : (
            <motion.div variants={containerVariants} initial="hidden" animate="show">
              <motion.button 
                variants={itemVariants}
                onClick={() => handleSelectCourse(null)} 
                className={styles.backBtn}
              >
                ← Back to Hub
              </motion.button>

              <motion.section variants={itemVariants} className={styles.welcomeSection} style={{ marginBottom: '1rem' }}>
                <span className={`${styles.badge} ${styles.badgeCategory}`}>
                  {activeCourse.category}
                </span>
                <h1 className={styles.welcomeTitle}>{activeCourse.title}</h1>
                <p className={styles.welcomeDesc}>
                  Learn directly from <strong>{activeCourse.instructor}</strong> • Course duration: <strong>{activeCourse.duration}</strong>
                </p>
              </motion.section>

              {!isCurrentlyPaid ? (
                <motion.div variants={itemVariants} className={styles.lockedOverlay}>
                  <div className={styles.lockIcon}><Lock size={32}/></div>
                  <h2 className={styles.lockTitle}>Curriculum Locked</h2>
                  <p className={styles.lockDesc}>
                    You have enrolled in this course, but must unlock full access by completing payment registration.
                  </p>
                  <button 
                    onClick={() => handleOpenCheckout(activeCourse)}
                    className={`${styles.catalogActionBtn} ${styles.btnPay}`}
                    style={{ fontSize: '1rem', padding: '0.8rem 2.5rem', marginTop: '1rem' }}
                  >
                    Unlock Course (${activeCourse.price})
                  </button>
                </motion.div>
              ) : (
                <>
                  <motion.div variants={itemVariants} className={styles.statsRow}>
                    <div className={styles.statCard}>
                      <div className={`${styles.statIconWrapper} ${styles.success}`}>
                        <CheckCircle2 size={24}/>
                      </div>
                      <span className={styles.statNum}>{activeStats.completedCount}</span>
                      <span className={styles.statCaption}>Completed</span>
                    </div>
                    <div className={styles.statCard}>
                      <div className={`${styles.statIconWrapper} ${styles.warning}`}>
                        <BookOpen size={24}/>
                      </div>
                      <span className={styles.statNum}>{activeStats.total - activeStats.completedCount}</span>
                      <span className={styles.statCaption}>Remaining</span>
                    </div>
                    <div className={styles.statCard}>
                      <div className={`${styles.statIconWrapper} ${styles.info}`}>
                        <GraduationCap size={24}/>
                      </div>
                      <span className={styles.statNum}>{activeStats.pct}%</span>
                      <span className={styles.statCaption}>Success Rate</span>
                    </div>
                    <div className={styles.statCard}>
                      <div className={`${styles.statIconWrapper} ${styles.primary}`}>
                        <Clock size={24}/>
                      </div>
                      <span className={styles.statNum} style={{ fontSize: '1.2rem', marginTop: '0.5rem' }}>{activeCourse.duration}</span>
                      <span className={styles.statCaption}>Duration</span>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className={styles.progressCard}>
                    <div className={styles.progressHeader}>
                      <span className={styles.progressLabel}>Overall Mastery</span>
                      <span className={styles.progressPct}>{activeStats.pct}%</span>
                    </div>
                    <div className={styles.progressTrack}>
                      <div
                        className={styles.progressFill}
                        style={{ width: `${activeStats.pct}%` }}
                      />
                    </div>
                  </motion.div>

                  <motion.section variants={itemVariants} className={styles.courseSection}>
                    <div className={styles.sectionHeader}>
                      <h2 className={styles.courseTitle}>Course Curriculum</h2>
                    </div>
                    <div className={styles.weekGrid}>
                      {activeCourse.curriculum.map((week) => {
                        const done = week.lessons.filter((l) => progress.includes(l.id)).length;
                        const total = week.lessons.length;
                        const pct = Math.round((done / total) * 100);
                        const isActive = currentWeek && currentWeek.week === week.week;
                        return (
                          <div
                            key={week.week}
                            className={`${styles.weekCard} ${isActive ? styles.weekCardActive : ''}`}
                            style={{ '--week-color': week.color }}
                          >
                            <div className={styles.weekCardTop}>
                              <span className={styles.weekCardBadge} style={{ color: week.color, background: week.color + '18' }}>
                                Week {week.week}
                              </span>
                            </div>
                            <div>
                              <h3 className={styles.weekCardTitle}>{week.title}</h3>
                              <p className={styles.weekCardTheme}>{week.theme}</p>
                            </div>
                            
                            <div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                <span>{done}/{total} lessons</span>
                                <span>{pct}%</span>
                              </div>
                              <div className={styles.weekProgressBar}>
                                <div className={styles.weekProgressFill} style={{ width: `${pct}%`, background: week.color }} />
                              </div>
                            </div>

                            <ul className={styles.weekLessonList}>
                              {week.lessons.map((lesson) => {
                                const lessonDone = progress.includes(lesson.id);
                                return (
                                  <li key={lesson.id}>
                                    <Link
                                      href={`/bootcamp/dashboard/lesson/${lesson.id}`}
                                      className={`${styles.lessonLink} ${lessonDone ? styles.lessonLinkDone : ''}`}
                                    >
                                      {lessonDone ? <CheckCircle2 className={styles.lessonCheckIcon} /> : <PlayCircle className={styles.lessonCheckIcon} />}
                                      {lesson.title}
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                            <div className={styles.weekAssignment}>
                              <BookOpen className={styles.assignIcon} size={16} />
                              <span>{week.assignment}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.section>
                </>
              )}
            </motion.div>
          )}

        </main>
      </div>

      {/* ── SIMULATED CHECKOUT MODAL OVERLAY ────── */}
      <AnimatePresence>
        {checkoutCourse && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className={styles.checkoutOverlay}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className={styles.checkoutCard}
            >
              
              <header className={styles.checkoutHeader}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Secure Checkout</h3>
                <button 
                  onClick={() => setCheckoutCourse(null)}
                  style={{ cursor: 'pointer', background: 'none', border: 'none', color: 'var(--text-secondary)' }}
                  disabled={paymentStatus === 'processing'}
                >
                  <X size={20} />
                </button>
              </header>

              <div className={styles.checkoutBody}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1rem' }}>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Unlock Course</span>
                    <p style={{ fontWeight: 700, fontSize: '0.95rem' }}>{checkoutCourse.title}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Amount</span>
                    <p style={{ fontWeight: 800, color: 'var(--accent-primary)', fontSize: '1.2rem' }}>${checkoutCourse.price}</p>
                  </div>
                </div>

                {paymentStatus === 'idle' && (
                  <form onSubmit={handleCheckoutSubmit} className={styles.checkoutForm}>
                    <div className={styles.field}>
                      <label className={styles.label}>Cardholder Name</label>
                      <input 
                        type="text" 
                        placeholder="Jane Doe" 
                        className={styles.input}
                        value={ccName}
                        onChange={(e) => setCcName(e.target.value)}
                        required
                      />
                    </div>

                    <div className={styles.field}>
                      <label className={styles.label}>Card Number</label>
                      <input 
                        type="text" 
                        placeholder="4000 1234 5678 9010" 
                        maxLength="19"
                        className={styles.input}
                        value={ccNumber}
                        onChange={(e) => setCcNumber(e.target.value)}
                        required
                      />
                    </div>

                    <div className={styles.checkoutRow}>
                      <div className={styles.field}>
                        <label className={styles.label}>Expiration</label>
                        <input 
                          type="text" 
                          placeholder="MM/YY" 
                          maxLength="5"
                          className={styles.input}
                          value={ccExpiry}
                          onChange={(e) => setCcExpiry(e.target.value)}
                          required
                        />
                      </div>
                      <div className={styles.field}>
                        <label className={styles.label}>CVC</label>
                        <input 
                          type="text" 
                          placeholder="123" 
                          maxLength="3"
                          className={styles.input}
                          value={ccCvc}
                          onChange={(e) => setCcCvc(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      className={styles.submitBtn}
                    >
                      <Lock size={16} /> Pay ${checkoutCourse.price}
                    </button>
                  </form>
                )}

                {paymentStatus === 'processing' && (
                  <div className={styles.checkoutStatus}>
                    <span className={styles.loadingSpinner} />
                    <p style={{ fontWeight: 600 }}>Processing simulated transaction...</p>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Securing network authentication</span>
                  </div>
                )}

                {paymentStatus === 'success' && (
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }} 
                    animate={{ scale: 1, opacity: 1 }} 
                    className={styles.checkoutStatus}
                  >
                    <div className={styles.successCheck}><CheckCircle2 size={32} /></div>
                    <p style={{ fontWeight: 700, color: '#34d399', fontSize: '1.2rem' }}>Payment Successful!</p>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Course has been unlocked on your student account.</span>
                  </motion.div>
                )}

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
