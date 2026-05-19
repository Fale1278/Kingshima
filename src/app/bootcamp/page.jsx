'use client';

import { useState } from 'react';
import Link from 'next/link';
import { COURSE_WEEKS, WHAT_YOU_LEARN, FAQ_ITEMS } from '@/data/bootcampData';
import styles from './page.module.css';

export default function BootcampPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [openWeek, setOpenWeek] = useState(0);

  return (
    <div className={styles.page}>

      {/* ── HERO ─────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} aria-hidden="true" />
        <div className={styles.heroContent}>
          <span className={styles.heroBadge}>✦ AI Productivity Bootcamp</span>
          <h1 className={styles.heroTitle}>
            Master AI.<br />
            <span className={styles.heroAccent}>Build Faster.</span><br />
            Work Smarter.
          </h1>
          <p className={styles.heroSubtitle}>
            A 4-week intensive bootcamp for creators, professionals, and learners
            who want to leverage AI for maximum productivity — no coding required.
          </p>
          <div className={styles.heroActions}>
            <a href="#register" className={styles.btnPrimary}>Enroll Now →</a>
            <Link href="/bootcamp/login" className={styles.btnOutline}>Student Login</Link>
          </div>
          <div className={styles.heroStats}>
            {[
              { value: '4', label: 'Weeks' },
              { value: '12', label: 'Lessons' },
              { value: '4', label: 'Live Sessions' },
              { value: '∞', label: 'Access' },
            ].map((s) => (
              <div key={s.label} className={styles.statItem}>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OVERVIEW ─────────────────────────────── */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.pill}>Overview</span>
            <h2 className={styles.sectionTitle}>What is this bootcamp?</h2>
            <p className={styles.sectionDesc}>
              A hands-on, structured 4-week programme that takes you from AI-curious to AI-empowered.
              Every week builds on the last — combining video lessons, live sessions, and real assignments.
            </p>
          </div>
          <div className={styles.overviewGrid}>
            {[
              { icon: '🎥', title: 'Pre-Recorded Lessons', desc: 'Watch 3 video lessons per week at your own pace, any time.' },
              { icon: '📡', title: 'Weekly Live Sessions', desc: 'Join live Q&A and workshop calls every week with the community.' },
              { icon: '📝', title: 'Weekly Assignments', desc: 'Apply what you learn with practical assignments designed to build real skills.' },
              { icon: '🏆', title: 'Capstone Project', desc: 'Ship a real AI-powered project by the end of Week 4.' },
            ].map((item) => (
              <div key={item.title} className={styles.overviewCard}>
                <span className={styles.overviewIcon}>{item.icon}</span>
                <h3 className={styles.overviewCardTitle}>{item.title}</h3>
                <p className={styles.overviewCardDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT YOU LEARN ───────────────────────── */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.pill}>Curriculum</span>
            <h2 className={styles.sectionTitle}>What you will learn</h2>
            <p className={styles.sectionDesc}>
              Six core skill areas, delivered across four focused weeks.
            </p>
          </div>
          <div className={styles.learnGrid}>
            {WHAT_YOU_LEARN.map((item) => (
              <div key={item.title} className={styles.learnCard}>
                <span className={styles.learnIcon}>{item.icon}</span>
                <h3 className={styles.learnTitle}>{item.title}</h3>
                <p className={styles.learnDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CURRICULUM OUTLINE ───────────────────── */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.pill}>Week by Week</span>
            <h2 className={styles.sectionTitle}>Curriculum outline</h2>
          </div>
          <div className={styles.curriculum}>
            {COURSE_WEEKS.map((week, i) => (
              <div key={week.week} className={`${styles.weekBlock} ${openWeek === i ? styles.weekBlockOpen : ''}`}>
                <button
                  className={styles.weekHeader}
                  onClick={() => setOpenWeek(openWeek === i ? -1 : i)}
                  aria-expanded={openWeek === i}
                >
                  <div className={styles.weekMeta}>
                    <span className={styles.weekBadge} style={{ background: week.color + '22', color: week.color }}>
                      Week {week.week}
                    </span>
                    <div>
                      <span className={styles.weekTitle}>{week.title}</span>
                      <span className={styles.weekTheme}>{week.theme}</span>
                    </div>
                  </div>
                  <span className={styles.weekChevron}>{openWeek === i ? '−' : '+'}</span>
                </button>
                {openWeek === i && (
                  <div className={styles.weekBody}>
                    <div className={styles.weekLessons}>
                      {week.lessons.map((lesson, li) => (
                        <div key={lesson.id} className={styles.lessonRow}>
                          <span className={styles.lessonNum}>{li + 1}</span>
                          <div>
                            <p className={styles.lessonName}>{lesson.title}</p>
                            <p className={styles.lessonDuration}>{lesson.duration}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className={styles.weekAssignment}>
                      <span className={styles.assignLabel}>📋 Week Assignment</span>
                      <p>{week.assignment}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WEEKLY STRUCTURE ─────────────────────── */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.pill}>Structure</span>
            <h2 className={styles.sectionTitle}>Your weekly rhythm</h2>
            <p className={styles.sectionDesc}>Every week follows the same flow so you always know what to expect.</p>
          </div>
          <div className={styles.timeline}>
            {[
              { day: 'Mon', label: 'Lesson 1 drops', icon: '📺' },
              { day: 'Wed', label: 'Lesson 2 & 3 drop', icon: '📺' },
              { day: 'Thu', label: 'Assignment opens', icon: '📝' },
              { day: 'Fri', label: 'Live Session (Q&A)', icon: '📡' },
              { day: 'Sun', label: 'Submit assignment', icon: '✅' },
            ].map((item, i) => (
              <div key={item.day} className={styles.timelineItem}>
                <div className={styles.timelineIcon}>{item.icon}</div>
                {i < 4 && <div className={styles.timelineLine} />}
                <span className={styles.timelineDay}>{item.day}</span>
                <span className={styles.timelineLabel}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REGISTER CTA ─────────────────────────── */}
      <section id="register" className={styles.ctaSection}>
        <div className={styles.ctaGlow} aria-hidden="true" />
        <div className={styles.container}>
          <div className={styles.ctaBox}>
            <span className={styles.pill}>Limited Spots</span>
            <h2 className={styles.ctaTitle}>Ready to transform how you work?</h2>
            <p className={styles.ctaDesc}>
              Enrolment is limited. Secure your spot and receive your login code within 24 hours of payment confirmation.
            </p>
            <div className={styles.ctaActions}>
              <a
                href="mailto:hello@kingshima.org?subject=Bootcamp%20Enrollment"
                className={styles.btnPrimary}
              >
                Apply for Next Cohort →
              </a>
              <Link href="/bootcamp/login" className={styles.btnOutline}>
                Already enrolled? Log in
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────── */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.pill}>Testimonials</span>
            <h2 className={styles.sectionTitle}>What students say</h2>
          </div>
          <div className={styles.testimonialsGrid}>
            {[1, 2, 3].map((n) => (
              <div key={n} className={styles.testimonialCard}>
                <div className={styles.testimonialComingSoon}>
                  <span>⏳</span>
                  <p>Testimonials from Cohort 1 coming soon</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────── */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.pill}>FAQ</span>
            <h2 className={styles.sectionTitle}>Frequently asked questions</h2>
          </div>
          <div className={styles.faqList}>
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className={`${styles.faqItem} ${openFaq === i ? styles.faqItemOpen : ''}`}>
                <button className={styles.faqQuestion} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{item.q}</span>
                  <span className={styles.faqChevron}>{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && (
                  <div className={styles.faqAnswer}>{item.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER CTA ───────────────────────────── */}
      <section className={styles.footerCta}>
        <div className={styles.container}>
          <p className={styles.footerCtaText}>
            Questions? Reach us at{' '}
            <a href="mailto:hello@kingshima.org" className={styles.footerCtaLink}>
              hello@kingshima.org
            </a>
          </p>
          <Link href="/bootcamp/login" className={styles.btnOutline}>Student Login</Link>
        </div>
      </section>

    </div>
  );
}
