'use client';

import { usePathname } from 'next/navigation';
import { ThemeProvider } from '@/context/ThemeContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import '@/styles/globals.css';

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // Hide global chrome on private bootcamp pages
  const hideShell =
    pathname?.startsWith('/bootcamp/dashboard') ||
    pathname?.startsWith('/bootcamp/admin');

  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <div className="app-container">
            <CustomCursor />
            {!hideShell && <Navbar />}
            <main>{children}</main>
            {!hideShell && <Footer />}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
