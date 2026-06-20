'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useBootcampAuth } from '@/context/BootcampAuthContext';
import { COURSES } from '@/data/coursesData';
import styles from './page.module.css';

// ─── Build a flat list of all lessons from every course ──────────────────────
const ALL_LESSONS = COURSES.flatMap((course) =>
  course.curriculum.flatMap((week) =>
    week.lessons.map((lesson) => ({
      ...lesson,
      week: week.week,
      weekTitle: week.title,
      weekColor: week.color,
      courseId: course.id,
      courseTitle: course.title,
    }))
  )
);

function findLesson(id) {
  return ALL_LESSONS.find((l) => l.id === id) || null;
}

export default function LessonPage({ params }) {
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;
  const router = useRouter();
  const { student, logout, markComplete, loading } = useBootcampAuth();

  const lesson = findLesson(id);

  // Submission state
  const [submissionText, setSubmissionText] = useState('');
  const [docLink, setDocLink]               = useState('');
  const [file, setFile]                     = useState(null);
  const [submitting, setSubmitting]         = useState(false);
  const [submitStatus, setSubmitStatus]     = useState(null); // 'success' | 'error'
  const [completing, setCompleting]         = useState(false);
  const [dbLesson, setDbLesson]             = useState(null); // fetched from Supabase

  // Notes state with local storage
  const [notes, setNotes]                   = useState('');

  // Auth guard
  useEffect(() => {
    if (!loading && !student) router.replace('/bootcamp/login');
  }, [student, loading, router]);

  // Load notes from local storage when lesson changes
  useEffect(() => {
    if (student && lesson) {
      const savedNotes = localStorage.getItem(`notes_${student.id}_${lesson.id}`);
      if (savedNotes) setNotes(savedNotes);
    }
  }, [student, lesson]);

  const handleNotesChange = (e) => {
    const newNotes = e.target.value;
    setNotes(newNotes);
    if (student && lesson) {
      localStorage.setItem(`notes_${student.id}_${lesson.id}`, newNotes);
    }
  };

  // Optionally fetch richer lesson data (video_url, resources) from Supabase
  useEffect(() => {
    if (!lesson) return;
    async function fetchLesson() {
      const { data } = await supabase
        .from('lessons')
        .select('*')
        .eq('id', lesson.id)
        .maybeSingle();
      if (data) setDbLesson(data);
    }
    fetchLesson();
  }, [lesson]);

  if (loading || !student) {
    return (
      <div className={styles.loading}>
        <span className={styles.spinner} />
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className={styles.notFound}>
        <h1>Lesson not found</h1>
        <Link href="/bootcamp/dashboard" className={styles.backLink}>← Back to Dashboard</Link>
      </div>
    );
  }

  const progress    = student.progress || [];
  const isCompleted = progress.includes(lesson.id);

  // Next lesson within the same course
  const courseLessons = ALL_LESSONS.filter((l) => l.courseId === lesson.courseId);
  const lessonIndex   = courseLessons.findIndex((l) => l.id === id);
  const nextLesson    = courseLessons[lessonIndex + 1] || null;

  const videoUrl  = dbLesson?.video_url  || lesson.video_url  || '';
  const resources = dbLesson?.resources  || lesson.resources  || [];

  const handleMarkComplete = async () => {
    if (isCompleted) return;
    setCompleting(true);
    markComplete(lesson.id);
    // Persist progress to Supabase
    try {
      const newProgress = [...(student.progress || []), lesson.id];
      await supabase
        .from('students')
        .update({ progress: newProgress })
        .eq('id', student.id);
    } catch { /* non-blocking */ }
    setCompleting(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!submissionText && !docLink && !file) {
      setSubmitStatus('error');
      return;
    }
    setSubmitting(true);
    setSubmitStatus(null);
    try {
      let uploadedPath = null;

      // File upload to Supabase Storage (optional bucket: 'assignments')
      if (file) {
        const ext     = file.name.split('.').pop();
        const path    = `${student.id}/${lesson.id}-${Date.now()}.${ext}`;
        const { error: uploadErr } = await supabase.storage
          .from('assignments')
          .upload(path, file);
        if (!uploadErr) uploadedPath = path;
      }

      const { error: insertErr } = await supabase.from('submissions').insert({
        student_id:      student.id,
        lesson_id:       lesson.id,
        submission_link: docLink || null,
        uploaded_file:   uploadedPath,
        notes:           submissionText || null,
      });

      if (insertErr) throw insertErr;

      setSubmitStatus('success');
      setSubmissionText('');
      setDocLink('');
      setFile(null);
    } catch {
      setSubmitStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.shell}>

      {/* ── Top bar ──────────────────────── */}
      <header className={styles.topbar}>
        <Link href="/bootcamp/dashboard" className={styles.backBtn}>
          ← Dashboard
        </Link>
        <div className={styles.topbarMeta}>
          <span className={styles.courseTag}>
            {lesson.courseTitle}
          </span>
          <span className={styles.weekTag} style={{ color: lesson.weekColor, background: lesson.weekColor + '18' }}>
            Week {lesson.week} — {lesson.weekTitle}
          </span>
          <button className={styles.logoutBtn} onClick={logout}>Logout</button>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.container}>

          {/* ── Lesson header ─────────────── */}
          <div className={styles.lessonHeader}>
            <span className={styles.lessonMeta}>{lesson.duration}</span>
            <h1 className={styles.lessonTitle}>{lesson.title}</h1>
            <p className={styles.lessonDesc}>{lesson.description}</p>
          </div>

          {/* ── Video ─────────────────────── */}
          <div className={styles.videoSection}>
            {videoUrl ? (
              <iframe
                src={videoUrl}
                className={styles.videoEmbed}
                title={lesson.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className={styles.videoPlaceholder}>
                <span className={styles.videoIcon}>▶</span>
                <p>Video will be uploaded before the session starts.</p>
              </div>
            )}
          </div>

          <div className={styles.twoCol}>

            {/* ── Left column ───────────── */}
            <div className={styles.leftCol}>

              {/* Notes */}
              <section className={styles.card}>
                <h2 className={styles.cardTitle}>📝 Your Notes</h2>
                <textarea
                  className={styles.notesArea}
                  placeholder="Take notes as you watch the lesson…"
                  rows={8}
                  value={notes}
                  onChange={handleNotesChange}
                />
              </section>

              {/* Resources */}
              <section className={styles.card}>
                <h2 className={styles.cardTitle}>📁 Resources & Downloads</h2>
                {resources.length > 0 ? (
                  <ul className={styles.resourceList}>
                    {resources.map((r, i) => (
                      <li key={i} className={styles.resourceItem}>
                        <span className={styles.resourceIcon}>↓</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className={styles.emptyNote}>Resources will be added here.</p>
                )}
              </section>
            </div>

            {/* ── Right column ──────────── */}
            <div className={styles.rightCol}>

              {/* Assignment */}
              <section className={styles.card}>
                <h2 className={styles.cardTitle}>📋 Assignment</h2>
                <p className={styles.assignmentText}>{lesson.assignment}</p>
              </section>

              {/* Submission */}
              <section className={styles.card}>
                <h2 className={styles.cardTitle}>📤 Submit Your Work</h2>
                <form onSubmit={handleSubmit} className={styles.submitForm}>
                  <div className={styles.field}>
                    <label className={styles.label}>Your response / notes</label>
                    <textarea
                      className={styles.textarea}
                      rows={4}
                      placeholder="Describe what you did or write your response…"
                      value={submissionText}
                      onChange={(e) => setSubmissionText(e.target.value)}
                      disabled={submitting}
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Google Docs / external link</label>
                    <input
                      type="url"
                      className={styles.input}
                      placeholder="https://docs.google.com/…"
                      value={docLink}
                      onChange={(e) => setDocLink(e.target.value)}
                      disabled={submitting}
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Upload screenshot or file</label>
                    <label className={styles.fileLabel} htmlFor="lesson-file-upload">
                      {file ? `✓ ${file.name}` : '+ Choose file'}
                      <input
                        id="lesson-file-upload"
                        type="file"
                        className={styles.fileInput}
                        accept="image/*,.pdf,.docx"
                        onChange={(e) => setFile(e.target.files[0] || null)}
                        disabled={submitting}
                      />
                    </label>
                  </div>

                  {submitStatus === 'success' && (
                    <div className={styles.successBox}>✓ Submission received!</div>
                  )}
                  {submitStatus === 'error' && (
                    <div className={styles.errorBox}>Please add text, a link, or a file before submitting.</div>
                  )}

                  <button type="submit" className={styles.submitBtn} disabled={submitting} id="lesson-submit-btn">
                    {submitting ? <span className={styles.spinner} /> : 'Submit Assignment'}
                  </button>
                </form>
              </section>

              {/* Mark complete */}
              <button
                className={`${styles.completeBtn} ${isCompleted ? styles.completeBtnDone : ''}`}
                onClick={handleMarkComplete}
                disabled={isCompleted || completing}
                id="lesson-mark-complete"
              >
                {isCompleted ? '✓ Lesson Complete' : completing ? 'Saving…' : 'Mark as Complete'}
              </button>

              {/* Next lesson */}
              {nextLesson && (
                <Link href={`/bootcamp/dashboard/lesson/${nextLesson.id}`} className={styles.nextLesson}>
                  <span className={styles.nextLabel}>Up next →</span>
                  <span className={styles.nextTitle}>{nextLesson.title}</span>
                </Link>
              )}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
