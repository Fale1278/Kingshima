'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useBootcampAuth } from '@/context/BootcampAuthContext';
import { COURSE_WEEKS } from '@/data/bootcampData';
import styles from './page.module.css';

const TOTAL_LESSONS = COURSE_WEEKS.reduce((acc, w) => acc + w.lessons.length, 0);

// Live session placeholder — update this from Supabase / admin panel
const NEXT_SESSION = {
  title: 'Week 1 Live Q&A — Foundations',
  date: 'Friday, 30 May 2025',
  time: '7:00 PM WAT',
  link: '#', // replace with actual Google Meet / Zoom link
};

export default function DashboardPage() {
  const { student, logout, loading } = useBootcampAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !student) {
      router.replace('/bootcamp/login');
    }
  }, [student, loading, router]);

  if (loading || !student) {
    return (
      <div className={styles.loadingScreen}>
        <span className={styles.loadingSpinner} />
      </div>
    );
  }

  const progress = student.progress || [];
  const completedCount = progress.length;
  const progressPct = Math.round((completedCount / TOTAL_LESSONS) * 100);

  // Determine current week (first week with incomplete lessons)
  const currentWeek = COURSE_WEEKS.find((w) =>
    w.lessons.some((l) => !progress.includes(l.id))
  ) || COURSE_WEEKS[COURSE_WEEKS.length - 1];

  return (
    <div className={styles.shell}>

      {/* ── Sidebar ───────────────────────────── */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarInner}>
          <div className={styles.sidebarLogo}>
            <span className={styles.logoIcon}>✧</span>
            <span className={styles.logoText}>Kingshima</span>
          </div>

          <nav className={styles.sidebarNav}>
            <p className={styles.navLabel}>Course Weeks</p>
            {COURSE_WEEKS.map((week) => {
              const weekDone = week.lessons.every((l) => progress.includes(l.id));
              const weekActive = currentWeek.week === week.week;
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

      {/* ── Main ──────────────────────────────── */}
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

          {/* Welcome */}
          <section className={styles.welcomeSection}>
            <div className={styles.welcomeText}>
              <h1 className={styles.welcomeTitle}>
                Welcome back, <span className={styles.accent}>{student.username}</span> 👋
              </h1>
              <p className={styles.welcomeDesc}>
                You&apos;re on <strong>Week {currentWeek.week} — {currentWeek.title}</strong>. Keep going!
              </p>
            </div>
          </section>

          {/* Stats row */}
          <div className={styles.statsRow}>
            <div className={styles.statCard}>
              <span className={styles.statNum}>{completedCount}</span>
              <span className={styles.statCaption}>Lessons done</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNum}>{TOTAL_LESSONS - completedCount}</span>
              <span className={styles.statCaption}>Remaining</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNum}>{progressPct}%</span>
              <span className={styles.statCaption}>Complete</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNum}>Week {currentWeek.week}</span>
              <span className={styles.statCaption}>Current week</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className={styles.progressCard}>
            <div className={styles.progressHeader}>
              <span className={styles.progressLabel}>Overall Progress</span>
              <span className={styles.progressPct}>{progressPct}%</span>
            </div>
            <div className={styles.progressTrack}>
              <div
                className={styles.progressFill}
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <div className={styles.progressWeeks}>
              {COURSE_WEEKS.map((w) => {
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

          {/* Live session */}
          <div className={styles.liveCard}>
            <div className={styles.liveBadge}>
              <span className={styles.liveDot} />
              Upcoming Session
            </div>
            <h2 className={styles.liveTitle}>{NEXT_SESSION.title}</h2>
            <div className={styles.liveMeta}>
              <span>📅 {NEXT_SESSION.date}</span>
              <span>🕖 {NEXT_SESSION.time}</span>
            </div>
            <a
              href={NEXT_SESSION.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.joinBtn}
              id="dashboard-join-session"
            >
              Join Session →
            </a>
          </div>

          {/* Course weeks */}
          <section className={styles.courseSection}>
            <h2 className={styles.courseTitle}>Course Weeks</h2>
            <div className={styles.weekGrid}>
              {COURSE_WEEKS.map((week) => {
                const done = week.lessons.filter((l) => progress.includes(l.id)).length;
                const total = week.lessons.length;
                const pct = Math.round((done / total) * 100);
                const isActive = currentWeek.week === week.week;
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
                    <p className={styles.weekProgressText}>{done}/{total} lessons</p>
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

          {/* Resources */}
          <section className={styles.resourcesSection}>
            <h2 className={styles.courseTitle}>Resources</h2>
            <div className={styles.resourceGrid}>
              {[
                { icon: '📁', label: 'Shared Drive', desc: 'All templates, worksheets, and downloads.', href: '#' },
                { icon: '💬', label: 'Community Chat', desc: 'Connect with your cohort and ask questions.', href: '/community' },
                { icon: '📧', label: 'Email Support', desc: 'Reach the team for any bootcamp questions.', href: 'mailto:hello@kingshima.org' },
              ].map((r) => (
                <a key={r.label} href={r.href} className={styles.resourceCard} id={`dashboard-resource-${r.label.toLowerCase().replace(' ', '-')}`}>
                  <span className={styles.resourceIcon}>{r.icon}</span>
                  <div>
                    <p className={styles.resourceLabel}>{r.label}</p>
                    <p className={styles.resourceDesc}>{r.desc}</p>
                  </div>
                </a>
              ))}
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}
