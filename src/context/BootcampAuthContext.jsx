'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const BootcampAuthContext = createContext(null);

export function BootcampAuthProvider({ children }) {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const saved = localStorage.getItem('bootcamp_student');
      if (saved) setStudent(JSON.parse(saved));
    } catch {
      // ignore
    }
    setLoading(false);
  }, []);

  const login = (studentData) => {
    setStudent(studentData);
    localStorage.setItem('bootcamp_student', JSON.stringify(studentData));
  };

  const logout = () => {
    setStudent(null);
    localStorage.removeItem('bootcamp_student');
    router.push('/bootcamp/login');
  };

  const markComplete = (lessonId) => {
    if (!student) return;
    const progress = student.progress || [];
    if (progress.includes(lessonId)) return;
    const updated = { ...student, progress: [...progress, lessonId] };
    setStudent(updated);
    localStorage.setItem('bootcamp_student', JSON.stringify(updated));
  };

  return (
    <BootcampAuthContext.Provider value={{ student, login, logout, loading, markComplete }}>
      {children}
    </BootcampAuthContext.Provider>
  );
}

export function useBootcampAuth() {
  const ctx = useContext(BootcampAuthContext);
  if (!ctx) throw new Error('useBootcampAuth must be used within BootcampAuthProvider');
  return ctx;
}
