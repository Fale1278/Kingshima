'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useBootcampAuth } from '@/context/BootcampAuthContext';
import styles from './page.module.css';

function generateCode(length = 8) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

export default function BootcampLoginPage() {
  const router = useRouter();
  const { login } = useBootcampAuth();

  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [form, setForm] = useState({ email: '', username: '', login_code: '' });
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [registeredCode, setRegisteredCode] = useState('');
  const [loading, setLoading] = useState(false);
  // Store the full newStudent row (with real Supabase id) so handleAutoLogin
  // uses it instead of rebuilding from form fields (which have no id).
  const newStudentRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const m = params.get('mode');
      if (m === 'register' || m === 'login') {
        setMode(m);
      }
    }
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleToggleMode = (newMode) => {
    setMode(newMode);
    setError('');
    setSuccessMsg('');
    setRegisteredCode('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    const { email, username, login_code } = form;

    if (mode === 'login') {
      if (!email || !username || !login_code) {
        setError('Please fill in all fields.');
        return;
      }

      setLoading(true);
      try {
        const { data, error: dbError } = await supabase
          .from('students')
          .select('*')
          .eq('email', email.trim().toLowerCase())
          .eq('username', username.trim().toLowerCase())
          .eq('login_code', login_code.trim())
          .maybeSingle();

        if (dbError) throw dbError;

        if (!data) {
          setError('Invalid credentials. Please check your email, username, and login code.');
          return;
        }

        // Normalise progress field
        const student = {
          ...data,
          progress: Array.isArray(data.progress) ? data.progress : [],
        };

        login(student);
        router.push('/bootcamp/dashboard');
      } catch (err) {
        console.error(err);
        if (err?.code === 'PGRST125') {
          setError("Database table 'students' was not found in Supabase. Please run the SQL setup script in your Supabase SQL Editor.");
        } else {
          setError(err?.message || 'Something went wrong. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    } else {
      // Registration Mode
      if (!email || !username) {
        setError('Please fill in both email and username.');
        return;
      }

      setLoading(true);
      try {
        // 1. Check if email or username is already registered
        const { data: existing } = await supabase
          .from('students')
          .select('id')
          .or(`email.eq.${email.trim().toLowerCase()},username.eq.${username.trim().toLowerCase()}`)
          .maybeSingle();

        if (existing) {
          setError('A student with this email or username is already registered.');
          return;
        }

        // 2. Generate new login code
        const code = generateCode();

        // 3. Create the student
        const { data: newStudent, error: insertErr } = await supabase
          .from('students')
          .insert({
            username: username.trim().toLowerCase(),
            email:    email.trim().toLowerCase(),
            login_code: code,
            progress: [],
          })
          .select()
          .single();

        if (insertErr) throw insertErr;

        // Store the full row (with real Supabase id) for use in handleAutoLogin.
        newStudentRef.current = {
          ...newStudent,
          progress: Array.isArray(newStudent?.progress) ? newStudent.progress : [],
        };

        setRegisteredCode(code);
        setSuccessMsg('Registration successful! Save the code below to log in later.');
        
        // Auto update the login form's login_code so they can log in easily
        setForm((prev) => ({ ...prev, login_code: code }));
      } catch (err) {
        console.error(err);
        if (err?.code === 'PGRST125') {
          setError("Database table 'students' was not found in Supabase. Please run the SQL setup script in your Supabase SQL Editor.");
        } else {
          setError(err?.message || 'Failed to register. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const handleAutoLogin = () => {
    if (!registeredCode) return;
    // Prefer the full Supabase row (which contains the real id) so that
    // the verify-payment API can match the student correctly later.
    const student = newStudentRef.current || {
      username: form.username.trim().toLowerCase(),
      email: form.email.trim().toLowerCase(),
      login_code: registeredCode,
      progress: [],
    };
    login(student);
    router.push('/bootcamp/dashboard');
  };

  return (
    <div className={styles.page}>
      <div className={styles.bg} aria-hidden="true" />

      <div className={styles.card}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>✧</span>
          <span className={styles.logoText}>Kingshima</span>
        </Link>

        {/* Login / Register Toggle Tabs */}
        {!registeredCode && (
          <div className={styles.tabs}>
            <button
              type="button"
              className={`${styles.tab} ${mode === 'login' ? styles.tabActive : ''}`}
              onClick={() => handleToggleMode('login')}
            >
              Log In
            </button>
            <button
              type="button"
              className={`${styles.tab} ${mode === 'register' ? styles.tabActive : ''}`}
              onClick={() => handleToggleMode('register')}
            >
              Register
            </button>
          </div>
        )}

        <div className={styles.header}>
          <h1 className={styles.title}>
            {registeredCode 
              ? 'Registration Complete' 
              : mode === 'login' 
              ? 'Student Login' 
              : 'Student Registration'
            }
          </h1>
          <p className={styles.subtitle}>
            {registeredCode 
              ? 'Your account has been created. Save your login code below to log in.'
              : mode === 'login'
              ? 'Enter your credentials to access your student dashboard.'
              : 'Sign up to start taking courses and tracking your progress.'
            }
          </p>
        </div>

        {registeredCode ? (
          <div className={styles.form}>
            <div className={styles.codeReveal}>
              <span className={styles.label}>Your Unique Login Code</span>
              <span className={styles.codeVal}>{registeredCode}</span>
            </div>
            <p className={styles.hint} style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
              ⚠️ Make sure to copy this code. It is required to log in to your dashboard in the future.
            </p>
            <p className={styles.hint} style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
              Registration is free. A small one-time acceptance fee unlocks full access to every course — you&apos;ll be prompted for it on your dashboard.
            </p>
            <button
              type="button"
              onClick={handleAutoLogin}
              className={styles.submitBtn}
            >
              Enter Dashboard →
            </button>
            <button
              type="button"
              onClick={() => handleToggleMode('login')}
              className={styles.footerLink}
              style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'block', margin: '0 auto' }}
            >
              Back to Login Page
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form} noValidate>
            <div className={styles.field}>
              <label htmlFor="email" className={styles.label}>Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                className={styles.input}
                disabled={loading}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="username" className={styles.label}>Username</label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                placeholder="your_username"
                value={form.username}
                onChange={handleChange}
                className={styles.input}
                disabled={loading}
              />
            </div>

            {mode === 'login' && (
              <div className={styles.field}>
                <label htmlFor="login_code" className={styles.label}>Login Code</label>
                <input
                  id="login_code"
                  name="login_code"
                  type="text"
                  placeholder="Enter your login code"
                  value={form.login_code}
                  onChange={handleChange}
                  className={styles.input}
                  disabled={loading}
                />
                <span className={styles.hint}>
                  Your unique login code is provided after registration.
                </span>
              </div>
            )}

            {error && (
              <div className={styles.errorBox} role="alert">
                <span>⚠</span> {error}
              </div>
            )}

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
              id="bootcamp-login-submit"
            >
              {loading ? (
                <span className={styles.spinner} aria-hidden="true" />
              ) : mode === 'login' ? (
                'Access Dashboard →'
              ) : (
                'Register & Get Code →'
              )}
            </button>
          </form>
        )}

        {!registeredCode && (
          <p className={styles.footer}>
            {mode === 'login' ? (
              <>
                Not enrolled yet?{' '}
                <button
                  type="button"
                  onClick={() => handleToggleMode('register')}
                  className={styles.footerLink}
                >
                  Register here
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => handleToggleMode('login')}
                  className={styles.footerLink}
                >
                  Log in here
                </button>
              </>
            )}
          </p>
        )}
      </div>
    </div>
  );
}
