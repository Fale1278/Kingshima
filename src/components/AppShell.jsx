'use client';

import { usePathname } from 'next/navigation';
import { ThemeProvider } from '@/context/ThemeContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';

export default function AppShell({ children }) {
  const pathname = usePathname();

  // Hide global chrome on private bootcamp pages
  const hideShell =
    pathname?.startsWith('/bootcamp/dashboard') ||
    pathname?.startsWith('/bootcamp/admin');

  return (
    <ThemeProvider>
      <div className="app-container">
        <CustomCursor />
        {!hideShell && <Navbar />}
        <main>{children}</main>
        {!hideShell && <Footer />}
      </div>
    </ThemeProvider>
  );
}
