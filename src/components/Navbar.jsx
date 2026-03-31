import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const isActive = (path) => location.pathname === path;

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''} glass`}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoIcon}>✧</span>
          <span className={styles.logoText}>Kingshima</span>
        </Link>
        
        <ul className={`${styles.links} ${mobileMenuOpen ? styles.mobileLinksOpen : ''}`}>
          <li><Link to="/" className={isActive('/') ? styles.active : ''}>Home</Link></li>
          <li><Link to="/about" className={isActive('/about') ? styles.active : ''}>About</Link></li>
          <li><Link to="/programs" className={isActive('/programs') ? styles.active : ''}>Programs</Link></li>
          <li><Link to="/community" className={isActive('/community') ? styles.active : ''}>Community</Link></li>
          <li><Link to="/contact" className={isActive('/contact') ? styles.active : ''}>Contact</Link></li>
        </ul>

        <div className={styles.actions}>
          <button className={styles.themeToggle} onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? '☼' : '☾'}
          </button>
          
          <button 
            className={styles.hamburger} 
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>

          <Link to="/pricing" className={`${styles.cta} ${styles.desktopOnly}`}>Plans</Link>

          {isAuthenticated ? (
            <Link to="/dashboard" className={`${styles.dashboardBtn} ${styles.desktopOnly}`}>Dashboard</Link>
          ) : (
            <Link to="/login" className={`${styles.dashboardBtn} ${styles.desktopOnly}`}>Login</Link>
          )}

          {/* Mobile Auth actions rendered inside the dropdown when open */}
          <div className={`${styles.mobileAuthActions} ${mobileMenuOpen ? styles.mobileAuthActionsOpen : ''}`}>
            <Link to="/pricing" className={styles.cta}>Plans</Link>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className={styles.dashboardBtn}>Dashboard</Link>
                <button onClick={logout} className={styles.logoutBtn}>Logout</button>
              </>
            ) : (
              <Link to="/login" className={styles.dashboardBtn}>Login</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
