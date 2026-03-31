import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Search, 
  Filter, 
  MoreVertical, 
  Calendar, 
  User, 
  CheckCircle2, 
  Clock,
  BookOpen
} from 'lucide-react';
import styles from './Projects.module.css'; // Reusing styles for now

const StatusBadge = ({ status }) => {
  const styles_map = {
    'In Progress': styles.statusInProgress,
    'Review': styles.statusReview,
    'Enrolled': styles.statusPlanning,
    'Completed': styles.statusCompleted,
  };
  return <span className={`${styles.statusBadge} ${styles_map[status] || styles.statusPlanning}`}>{status}</span>;
};

const ProgramRow = ({ program, index }) => (
  <motion.tr 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05 }}
    className={styles.row}
  >
    <td className={styles.nameCell}>
      <div className={styles.projectIcon}><BookOpen size={16} /></div>
      <div className={styles.projectInfo}>
        <span className={styles.projectName}>{program.name}</span>
        <span className={styles.projectClient}>{program.category}</span>
      </div>
    </td>
    <td><StatusBadge status={program.status} /></td>
    <td>
      <div className={styles.progressWrapper}>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${program.progress}%` }} />
        </div>
        <span className={styles.progressText}>{program.progress}%</span>
      </div>
    </td>
    <td>
      <div className={styles.teamAvatars}>
        {program.mentors.map((m, i) => (
          <div key={i} className={styles.avatar} title={m}>{m[0]}</div>
        ))}
      </div>
    </td>
    <td className={styles.dateCell}>
      <Calendar size={14} /> {program.nextSession}
    </td>
    <td className={styles.actionCell}>
      <button className={styles.continueBtn}>
        <Play size={14} fill="currentColor" /> Continue
      </button>
    </td>
  </motion.tr>
);

const ProgramsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const programs = [
    { name: "Kingdom Tech Leadership", category: "Leadership", status: "In Progress", progress: 65, mentors: ["Dr. Arinze", "Sarah"], nextSession: "Oct 15, 2026" },
    { name: "Fullstack Engineering", category: "Tech", status: "In Progress", progress: 40, mentors: ["Engr. Sarah"], nextSession: "Oct 18, 2026" },
    { name: "Media & Digital Arts", category: "Creative", status: "Enrolled", progress: 0, mentors: ["James"], nextSession: "Oct 20, 2026" },
    { name: "Foundation Fundamentals", category: "Ethics", status: "Completed", progress: 100, mentors: ["Foundation"], nextSession: "Completed" },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>My Programs</h1>
          <p className={styles.subtitle}>Track your learning journey and upcoming live sessions.</p>
        </div>
        <button className={styles.addBtn}>
          <Search size={18} /> Browse Catalog
        </button>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.searchWrapper}>
          <Search size={18} className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Search programs..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className={styles.filterGroup}>
          <button className={styles.filterBtn}><Filter size={16} /> Filters</button>
        </div>
      </div>

      <div className={`${styles.tableWrapper} glass`}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Program</th>
              <th>Status</th>
              <th>Progress</th>
              <th>Mentors</th>
              <th>Next Session</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {programs.map((p, i) => <ProgramRow key={p.name} program={p} index={i} />)}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProgramsPage;
