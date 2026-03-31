import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '../components/dashboard/Sidebar';
import styles from './DashboardLayout.module.css';
import CustomCursor from '../components/CustomCursor';

const DashboardLayout = () => {
  return (
    <div className={styles.wrapper}>
      <CustomCursor />
      <Sidebar />
      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.breadcrumb}>Dashboard / Overview</div>
          <div className={styles.userProfile}>
            <div className={styles.userAvatar}>JD</div>
          </div>
        </header>

        <section className={styles.content}>
          <AnimatePresence mode="wait">
            <motion.div
              key={window.location.pathname}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className={styles.canvas}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </section>
      </main>
    </div>
  );
};

export default DashboardLayout;
