'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useBootcampAuth } from '@/context/BootcampAuthContext';
import { COURSES } from '@/data/coursesData';
import styles from './page.module.css';

export default function DashboardPage() {
  const { student, login, logout, loading } = useBootcampAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeCourseId, setActiveCourseId] = useState(null);

  // Simulated Checkout states
  const [checkoutCourse, setCheckoutCourse] = useState(null);
  const [ccName, setCcName] = useState('');
  const [ccNumber, setCcNumber] = useState('');
  const [ccExpiry, setCcExpiry] = useState('');
  const [ccCvc, setCcCvc] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('idle'); // 'idle' | 'processing' | 'success'

  useEffect(() => {
    if (!loading && !student) {
      router.replace('/bootcamp/login');
    }
  }, [student, loading, router]);

  // Load last active course from localStorage if available
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

  // Fetch active course object
  const activeCourse = COURSES.find((c) => c.id === activeCourseId) || null;
  const isCurrentlyPaid = activeCourse ? isPaid(activeCourse.id) : false;

  // Course Specific Progress Calculator
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
    // 1. Sync React context & localStorage
    const updatedStudent = { ...student, progress: newProgress };
    login(updatedStudent);

    // 2. Persist to Supabase
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
      // Add enrolled tag if not already there
      if (!newProgress.includes(`enrolled-${checkoutCourse.id}`)) {
        newProgress.push(`enrolled-${checkoutCourse.id}`);
      }
      // Add paid tag
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
            <span className={styles.logoIcon}>✧</span>
            <span className={styles.logoText}>Kingshima Hub</span>
          </div>

          {/* Course Selector Dropdown in Sidebar */}
          <div className={styles.sidebarCourseSelector}>
            <span className={styles.courseSelectLabel}>My Learning Tracks</span>
            <select
              value={activeCourseId || ''}
              onChange={(e) => handleSelectCourse(e.target.value || null)}
              className={styles.courseDropdown}
              id="sidebar-course-selector"
            >
              <option value="">🏫 Courses Catalog</option>
              {COURSES.map((c) => (
                <option key={c.id} value={c.id}>
                  {isPaid(c.id) ? '✓ ' : isEnrolled(c.id) ? '💳 ' : '🔒 '}
                  {c.title}
                </option>
              ))}
            </select>
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
                          style={{ background: weekDone ? '#34d399' : weekActive ? week.color : 'var(--border)' }}
                        />
                        <span className={styles.weekNavTitle}>Week {week.week} — {week.title}</span>
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
                                <span className={styles.lessonCheck}>{done ? '✓' : '○'}</span>
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
              <div style={{ padding: '0 0.5rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Select a paid active course to view your syllabus outline.
              </div>
            )}
          </nav>

          <button className={styles.logoutBtn} onClick={logout} id="dashboard-logout">
            Logout
          </button>
        </div>
      </aside>

      {/* Sidebar overlay (mobile) */}
      {sidebarOpen && (
        <div
          className={styles.overlay}
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── Main Panel ────────────────────────── */}
      <div className={styles.main}>

        {/* Top bar */}
        <header className={styles.topbar}>
          <button
            className={styles.menuBtn}
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
            id="dashboard-menu-btn"
          >
            <span /><span /><span />
          </button>
          <div className={styles.topbarRight}>
            <span className={styles.topbarName}>👋 {student.username}</span>
            <button className={styles.logoutBtnInline} onClick={logout}>Logout</button>
          </div>
        </header>

        <main className={styles.content}>

          {/* 1. COURSES HUB VIEW */}
          {activeCourseId === null ? (
            <>
              <section className={styles.welcomeSection}>
                <div className={styles.welcomeText}>
                  <h1 className={styles.welcomeTitle}>
                    Welcome back, <span className={styles.accent}>{student.username}</span> 👋
                  </h1>
                  <p className={styles.welcomeDesc}>
                    This is your learning dashboard. Enroll in tracks, complete simulated checkout payments, and manage your skill progress.
                  </p>
                </div>
              </section>

              <section className={styles.courseSection}>
                <h2 className={styles.courseTitle}>Your Available Learning Tracks</h2>
                
                <div className={styles.courseCatalogGrid}>
                  {COURSES.map((course) => {
                    const enrolled = isEnrolled(course.id);
                    const paid = isPaid(course.id);
                    const stats = getCourseStats(course);

                    return (
                      <div key={course.id} className={styles.catalogCard}>
                        <div 
                          className={styles.catalogCardImage} 
                          style={{ backgroundImage: `url(${course.imageUrl})` }}
                        >
                          <span style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                            {paid ? (
                              <span className={`${styles.paymentBadge} ${styles.badgePaid}`}>✓ Active</span>
                            ) : enrolled ? (
                              <span className={`${styles.paymentBadge} ${styles.badgeEnrolled}`}>💳 Enrolled</span>
                            ) : (
                              <span className={`${styles.paymentBadge} ${styles.badgeUnenrolled}`}>🔒 Locked</span>
                            )}
                          </span>
                        </div>
                        <div className={styles.catalogCardContent}>
                          <h3 className={styles.catalogCardTitle}>{course.title}</h3>
                          <p className={styles.catalogCardDesc}>{course.description}</p>
                          {paid && (
                            <div style={{ marginTop: '0.5rem' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
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
                          <span style={{ fontSize: '0.85rem' }}>Price: <strong>${course.price}</strong></span>
                          
                          {!enrolled && !paid && (
                            <button 
                              onClick={() => handleEnroll(course.id)}
                              className={`${styles.catalogActionBtn} ${styles.btnEnroll}`}
                            >
                              Enroll in Course
                            </button>
                          )}
                          {enrolled && !paid && (
                            <button 
                              onClick={() => handleOpenCheckout(course)}
                              className={`${styles.catalogActionBtn} ${styles.btnPay}`}
                            >
                              Unlock Course
                            </button>
                          )}
                          {paid && (
                            <button 
                              onClick={() => handleSelectCourse(course.id)}
                              className={`${styles.catalogActionBtn} ${styles.btnEnter}`}
                            >
                              Enter Syllabus →
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            </>
          ) : (
            
            /* 2. SPECIFIC ACTIVE COURSE VIEW */
            <>
              <button 
                onClick={() => handleSelectCourse(null)} 
                className={styles.backBtn}
              >
                ← Back to Courses Hub
              </button>

              <section className={styles.welcomeSection}>
                <div className={styles.welcomeText}>
                  <span className={styles.paymentBadge} style={{ borderColor: 'var(--accent-primary)', color: 'var(--accent-primary)', marginBottom: '0.5rem', display: 'inline-block' }}>
                    {activeCourse.category}
                  </span>
                  <h1 className={styles.welcomeTitle}>{activeCourse.title}</h1>
                  <p className={styles.welcomeDesc}>
                    Learn directly from <strong>{activeCourse.instructor}</strong> • Course duration: <strong>{activeCourse.duration}</strong>
                  </p>
                </div>
              </section>

              {/* Locked Screen overlay if Course is Unpaid */}
              {!isCurrentlyPaid ? (
                <div className={styles.lockedOverlay}>
                  <span className={styles.lockIcon}>🔒</span>
                  <h2 className={styles.lockTitle}>Course Curriculum Locked</h2>
                  <p className={styles.lockDesc}>
                    You have enrolled in this course, but must unlock full database access by completing payment registration.
                  </p>
                  <button 
                    onClick={() => handleOpenCheckout(activeCourse)}
                    className={`${styles.catalogActionBtn} ${styles.btnPay}`}
                    style={{ fontSize: '1rem', padding: '0.75rem 2rem' }}
                  >
                    Pay & Unlock Course (${activeCourse.price})
                  </button>
                </div>
              ) : (
                <>
                  {/* Stats Row */}
                  <div className={styles.statsRow}>
                    <div className={styles.statCard}>
                      <span className={styles.statNum}>{activeStats.completedCount}</span>
                      <span className={styles.statCaption}>Lessons Completed</span>
                    </div>
                    <div className={styles.statCard}>
                      <span className={styles.statNum}>{activeStats.total - activeStats.completedCount}</span>
                      <span className={styles.statCaption}>Remaining</span>
                    </div>
                    <div className={styles.statCard}>
                      <span className={styles.statNum}>{activeStats.pct}%</span>
                      <span className={styles.statCaption}>Complete</span>
                    </div>
                    <div className={styles.statCard}>
                      <span className={styles.statNum}>{activeCourse.duration}</span>
                      <span className={styles.statCaption}>Duration</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className={styles.progressCard}>
                    <div className={styles.progressHeader}>
                      <span className={styles.progressLabel}>Overall Course Progress</span>
                      <span className={styles.progressPct}>{activeStats.pct}%</span>
                    </div>
                    <div className={styles.progressTrack}>
                      <div
                        className={styles.progressFill}
                        style={{ width: `${activeStats.pct}%` }}
                      />
                    </div>
                    <div className={styles.progressWeeks}>
                      {activeCourse.curriculum.map((w) => {
                        const done = w.lessons.filter((l) => progress.includes(l.id)).length;
                        return (
                          <div key={w.week} className={styles.progressWeekItem}>
                            <span style={{ color: w.color, fontWeight: 700 }}>W{w.week}</span>
                            <span className={styles.progressWeekFrac}>{done}/{w.lessons.length}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Curriculum weeks accordion cards */}
                  <section className={styles.courseSection}>
                    <h2 className={styles.courseTitle}>Curriculum syllabus weeks</h2>
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
                              {pct === 100 && <span className={styles.completedBadge}>✓ Complete</span>}
                              {isActive && pct < 100 && <span className={styles.activeBadge}>In Progress</span>}
                            </div>
                            <h3 className={styles.weekCardTitle}>{week.title}</h3>
                            <p className={styles.weekCardTheme}>{week.theme}</p>
                            <div className={styles.weekProgressBar}>
                              <div className={styles.weekProgressFill} style={{ width: `${pct}%`, background: week.color }} />
                            </div>
                            <p className={styles.weekProgressText}>{done}/{total} lessons completed</p>
                            <ul className={styles.weekLessonList}>
                              {week.lessons.map((lesson) => {
                                const lessonDone = progress.includes(lesson.id);
                                return (
                                  <li key={lesson.id} className={styles.weekLessonItem}>
                                    <Link
                                      href={`/bootcamp/dashboard/lesson/${lesson.id}`}
                                      className={`${styles.lessonLink} ${lessonDone ? styles.lessonLinkDone : ''}`}
                                    >
                                      <span className={styles.lessonCheckIcon}>{lessonDone ? '✓' : '▶'}</span>
                                      {lesson.title}
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                            <div className={styles.weekAssignment}>
                              <span className={styles.assignIcon}>📋</span>
                              <span>{week.assignment}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                </>
              )}
            </>
          )}

        </main>
      </div>

      {/* ── SIMULATED CHECKOUT MODAL OVERLAY ────── */}
      {checkoutCourse && (
        <div className={styles.checkoutOverlay}>
          <div className={styles.checkoutCard}>
            
            <header className={styles.checkoutHeader}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Simulated Checkout</h3>
              <button 
                onClick={() => setCheckoutCourse(null)}
                style={{ cursor: 'pointer', background: 'none', border: 'none', color: '#fff', fontSize: '1.2rem' }}
                disabled={paymentStatus === 'processing'}
              >
                ✕
              </button>
            </header>

            <div className={styles.checkoutBody}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Unlock Course</span>
                  <p style={{ fontWeight: 700, fontSize: '0.95rem' }}>{checkoutCourse.title}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Amount</span>
                  <p style={{ fontWeight: 800, color: 'var(--accent-primary)', fontSize: '1.1rem' }}>${checkoutCourse.price}</p>
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
                      <label className={styles.label}>Expiration (MM/YY)</label>
                      <input 
                        type="text" 
                        placeholder="12/28" 
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
                    style={{ marginTop: '0.5rem' }}
                  >
                    Simulate Payment (${checkoutCourse.price}) →
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
                <div className={styles.checkoutStatus}>
                  <span className={styles.successCheck}>✓</span>
                  <p style={{ fontWeight: 700, color: '#34d399', fontSize: '1.2rem' }}>Payment Successful!</p>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Course has been unlocked on your student account.</span>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
