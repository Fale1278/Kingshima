'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import styles from './page.module.css';

const ADMIN_CODE = 'kingshima-admin-2025'; // Change this to a secret you remember

function generateCode(length = 8) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

export default function AdminPage() {
  const [authed, setAuthed]         = useState(false);
  const [adminInput, setAdminInput] = useState('');
  const [adminError, setAdminError] = useState('');

  const [tab, setTab]           = useState('students'); // 'students' | 'codes' | 'lessons'
  const [students, setStudents] = useState([]);
  const [lessons, setLessons]   = useState([]);
  const [loading, setLoading]   = useState(false);
  const [msg, setMsg]           = useState('');

  // New student form
  const [newStudent, setNewStudent] = useState({ username: '', email: '', login_code: generateCode() });
  // New lesson form
  const [newLesson, setNewLesson]   = useState({ id: '', title: '', week: '', video_url: '', resources: '', assignment: '' });

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from('students').select('*').order('created_at', { ascending: false });
    setStudents(data || []);
    setLoading(false);
  }, []);

  const fetchLessons = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from('lessons').select('*').order('week');
    setLessons(data || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!authed) return;
    if (tab === 'students' || tab === 'codes') fetchStudents();
    if (tab === 'lessons') fetchLessons();
  }, [authed, tab, fetchStudents, fetchLessons]);

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminInput.trim() === ADMIN_CODE) {
      setAuthed(true);
      setAdminError('');
    } else {
      setAdminError('Incorrect admin code.');
    }
  };

  const addStudent = async (e) => {
    e.preventDefault();
    setMsg('');
    const { username, email, login_code } = newStudent;
    if (!username || !email || !login_code) return;
    const { error } = await supabase.from('students').insert({
      username: username.trim().toLowerCase(),
      email:    email.trim().toLowerCase(),
      login_code: login_code.trim(),
      progress: [],
    });
    if (error) { setMsg('Error: ' + error.message); return; }
    setMsg(`✓ Student "${username}" added with code ${login_code}`);
    setNewStudent({ username: '', email: '', login_code: generateCode() });
    fetchStudents();
  };

  const deleteStudent = async (id) => {
    if (!confirm('Delete this student?')) return;
    await supabase.from('students').delete().eq('id', id);
    fetchStudents();
  };

  const regenerateCode = (studentId) => async () => {
    const code = generateCode();
    await supabase.from('students').update({ login_code: code }).eq('id', studentId);
    setMsg(`✓ Code regenerated.`);
    fetchStudents();
  };

  const saveLesson = async (e) => {
    e.preventDefault();
    setMsg('');
    const { id, title, week, video_url, resources, assignment } = newLesson;
    if (!id || !title || !week) return;
    const { error } = await supabase.from('lessons').upsert({
      id: id.trim(),
      title,
      week: parseInt(week),
      video_url,
      resources: resources.split('\n').map((r) => r.trim()).filter(Boolean),
      assignment,
    });
    if (error) { setMsg('Error: ' + error.message); return; }
    setMsg('✓ Lesson saved.');
    setNewLesson({ id: '', title: '', week: '', video_url: '', resources: '', assignment: '' });
    fetchLessons();
  };

  // ── Admin gate ───────────────────────────
  if (!authed) {
    return (
      <div className={styles.gate}>
        <div className={styles.gateCard}>
          <Link href="/" className={styles.gateLogo}>
            <span style={{ color: 'var(--accent-primary)' }}>✧</span> Kingshima
          </Link>
          <h1 className={styles.gateTitle}>Admin Access</h1>
          <p className={styles.gateDesc}>Enter the admin code to continue.</p>
          <form onSubmit={handleAdminLogin} className={styles.gateForm}>
            <input
              type="password"
              className={styles.input}
              placeholder="Admin code"
              value={adminInput}
              onChange={(e) => { setAdminInput(e.target.value); setAdminError(''); }}
              id="admin-code-input"
            />
            {adminError && <p className={styles.gateError}>{adminError}</p>}
            <button type="submit" className={styles.primaryBtn} id="admin-login-btn">Enter →</button>
          </form>
        </div>
      </div>
    );
  }

  // ── Admin dashboard ───────────────────────
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <Link href="/" className={styles.logo}>
            <span style={{ color: 'var(--accent-primary)' }}>✧</span> Kingshima
          </Link>
          <span className={styles.adminBadge}>Admin Panel</span>
        </div>
        <Link href="/bootcamp" className={styles.backLink}>← Back to Bootcamp</Link>
      </header>

      <div className={styles.shell}>
        {/* Tabs */}
        <nav className={styles.tabs}>
          {[
            { key: 'students', label: '👥 Students' },
            { key: 'codes',    label: '🔑 Login Codes' },
            { key: 'lessons',  label: '📹 Lessons' },
          ].map((t) => (
            <button
              key={t.key}
              className={`${styles.tab} ${tab === t.key ? styles.tabActive : ''}`}
              onClick={() => { setTab(t.key); setMsg(''); }}
              id={`admin-tab-${t.key}`}
            >
              {t.label}
            </button>
          ))}
        </nav>

        {msg && <div className={styles.msgBox}>{msg}</div>}

        {/* ── Students & Codes tab ─── */}
        {(tab === 'students' || tab === 'codes') && (
          <div className={styles.tabContent}>
            {/* Add student */}
            <section className={styles.card}>
              <h2 className={styles.cardTitle}>Add New Student</h2>
              <form onSubmit={addStudent} className={styles.form}>
                <div className={styles.formRow}>
                  <div className={styles.field}>
                    <label className={styles.label}>Username</label>
                    <input
                      className={styles.input}
                      placeholder="username"
                      value={newStudent.username}
                      onChange={(e) => setNewStudent((p) => ({ ...p, username: e.target.value }))}
                      required
                      id="admin-new-username"
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Email</label>
                    <input
                      type="email"
                      className={styles.input}
                      placeholder="student@email.com"
                      value={newStudent.email}
                      onChange={(e) => setNewStudent((p) => ({ ...p, email: e.target.value }))}
                      required
                      id="admin-new-email"
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Login Code</label>
                    <div className={styles.codeRow}>
                      <input
                        className={styles.input}
                        value={newStudent.login_code}
                        onChange={(e) => setNewStudent((p) => ({ ...p, login_code: e.target.value }))}
                        required
                        id="admin-new-code"
                      />
                      <button
                        type="button"
                        className={styles.ghostBtn}
                        onClick={() => setNewStudent((p) => ({ ...p, login_code: generateCode() }))}
                        title="Generate new code"
                      >
                        ↻
                      </button>
                    </div>
                  </div>
                  <button type="submit" className={styles.primaryBtn} id="admin-add-student-btn">
                    Add Student
                  </button>
                </div>
              </form>
            </section>

            {/* Students table */}
            <section className={styles.card}>
              <h2 className={styles.cardTitle}>
                All Students{' '}
                <span className={styles.count}>{students.length}</span>
              </h2>
              {loading ? (
                <div className={styles.tableLoading}><span className={styles.spinner} /></div>
              ) : students.length === 0 ? (
                <p className={styles.empty}>No students yet.</p>
              ) : (
                <div className={styles.tableWrap}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Username</th>
                        <th>Email</th>
                        {tab === 'codes' && <th>Login Code</th>}
                        <th>Progress</th>
                        <th>Joined</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((s) => (
                        <tr key={s.id}>
                          <td className={styles.bold}>{s.username}</td>
                          <td className={styles.muted}>{s.email}</td>
                          {tab === 'codes' && (
                            <td>
                              <span className={styles.codeBadge}>{s.login_code}</span>
                            </td>
                          )}
                          <td>
                            <span className={styles.progressPill}>
                              {Array.isArray(s.progress) ? s.progress.length : 0} / 12
                            </span>
                          </td>
                          <td className={styles.muted}>
                            {s.created_at ? new Date(s.created_at).toLocaleDateString() : '—'}
                          </td>
                          <td>
                            <div className={styles.actionBtns}>
                              {tab === 'codes' && (
                                <button
                                  className={styles.ghostBtn}
                                  onClick={regenerateCode(s.id)}
                                  title="Regenerate code"
                                >
                                  ↻
                                </button>
                              )}
                              <button
                                className={styles.dangerBtn}
                                onClick={() => deleteStudent(s.id)}
                                title="Delete student"
                              >
                                ✕
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </div>
        )}

        {/* ── Lessons tab ─── */}
        {tab === 'lessons' && (
          <div className={styles.tabContent}>
            {/* Add/edit lesson */}
            <section className={styles.card}>
              <h2 className={styles.cardTitle}>Add / Update Lesson</h2>
              <form onSubmit={saveLesson} className={styles.form}>
                <div className={styles.formRow}>
                  <div className={styles.field}>
                    <label className={styles.label}>Lesson ID (e.g. 1-1)</label>
                    <input
                      className={styles.input}
                      placeholder="1-1"
                      value={newLesson.id}
                      onChange={(e) => setNewLesson((p) => ({ ...p, id: e.target.value }))}
                      required
                      id="admin-lesson-id"
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Week</label>
                    <select
                      className={styles.input}
                      value={newLesson.week}
                      onChange={(e) => setNewLesson((p) => ({ ...p, week: e.target.value }))}
                      required
                      id="admin-lesson-week"
                    >
                      <option value="">Select week</option>
                      {[1, 2, 3, 4].map((w) => <option key={w} value={w}>Week {w}</option>)}
                    </select>
                  </div>
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Lesson Title</label>
                  <input
                    className={styles.input}
                    placeholder="Title"
                    value={newLesson.title}
                    onChange={(e) => setNewLesson((p) => ({ ...p, title: e.target.value }))}
                    required
                    id="admin-lesson-title"
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Video URL (YouTube embed or Loom)</label>
                  <input
                    type="url"
                    className={styles.input}
                    placeholder="https://www.youtube.com/embed/…"
                    value={newLesson.video_url}
                    onChange={(e) => setNewLesson((p) => ({ ...p, video_url: e.target.value }))}
                    id="admin-lesson-video"
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Resources (one per line)</label>
                  <textarea
                    className={`${styles.input} ${styles.textarea}`}
                    rows={3}
                    placeholder="Worksheet PDF&#10;Prompt Template"
                    value={newLesson.resources}
                    onChange={(e) => setNewLesson((p) => ({ ...p, resources: e.target.value }))}
                    id="admin-lesson-resources"
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Assignment instructions</label>
                  <textarea
                    className={`${styles.input} ${styles.textarea}`}
                    rows={3}
                    placeholder="Write the assignment here…"
                    value={newLesson.assignment}
                    onChange={(e) => setNewLesson((p) => ({ ...p, assignment: e.target.value }))}
                    id="admin-lesson-assignment"
                  />
                </div>
                <button type="submit" className={styles.primaryBtn} id="admin-save-lesson-btn">
                  Save Lesson
                </button>
              </form>
            </section>

            {/* Lessons table */}
            <section className={styles.card}>
              <h2 className={styles.cardTitle}>
                All Lessons{' '}
                <span className={styles.count}>{lessons.length}</span>
              </h2>
              {loading ? (
                <div className={styles.tableLoading}><span className={styles.spinner} /></div>
              ) : lessons.length === 0 ? (
                <p className={styles.empty}>No lessons in database yet.</p>
              ) : (
                <div className={styles.tableWrap}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Week</th>
                        <th>Title</th>
                        <th>Video</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lessons.map((l) => (
                        <tr key={l.id}>
                          <td className={styles.codeBadge}>{l.id}</td>
                          <td>Week {l.week}</td>
                          <td>{l.title}</td>
                          <td>
                            {l.video_url
                              ? <span className={styles.greenDot}>✓</span>
                              : <span className={styles.redDot}>✕</span>
                            }
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
