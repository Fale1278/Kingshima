'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useBootcampAuth } from '@/context/BootcampAuthContext';
import styles from './page.module.css';

export default function BootcampLoginPage() {
  const router = useRouter();
  const { login } = useBootcampAuth();

  const [form, setForm] = useState({ email: '', username: '', login_code: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const { email, username, login_code } = form;
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
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
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

        <div className={styles.header}>
          <h1 className={styles.title}>Student Login</h1>
          <p className={styles.subtitle}>
            Enter your credentials to access the AI Productivity Bootcamp.
          </p>
        </div>

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

          <div className={styles.field}>
            <label htmlFor="login_code" className={styles.label}>Login Code</label>
            <input
              id="login_code"
              name="login_code"
              type="text"
              placeholder="Provided after payment"
              value={form.login_code}
              onChange={handleChange}
              className={styles.input}
              disabled={loading}
            />
            <span className={styles.hint}>
              Your unique login code is sent by email after payment confirmation.
            </span>
          </div>

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
            ) : (
              'Access Dashboard →'
            )}
          </button>
        </form>

        <p className={styles.footer}>
          Not enrolled yet?{' '}
          <Link href="/bootcamp#register" className={styles.footerLink}>
            Apply for the bootcamp
          </Link>
        </p>
      </div>
    </div>
  );
}
