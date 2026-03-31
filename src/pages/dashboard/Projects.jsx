import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Calendar, 
  User, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import styles from './Projects.module.css';

const StatusBadge = ({ status }) => {
  const styles_map = {
    'In Progress': styles.statusInProgress,
    'Review': styles.statusReview,
    'Planning': styles.statusPlanning,
    'Completed': styles.statusCompleted,
  };
  return <span className={`${styles.statusBadge} ${styles_map[status]}`}>{status}</span>;
};

const ProjectRow = ({ project, index }) => (
  <motion.tr 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05 }}
    className={styles.row}
  >
    <td className={styles.nameCell}>
      <div className={styles.projectIcon}>{project.name[0]}</div>
      <div className={styles.projectInfo}>
        <span className={styles.projectName}>{project.name}</span>
        <span className={styles.projectClient}>{project.client}</span>
      </div>
    </td>
    <td><StatusBadge status={project.status} /></td>
    <td>
      <div className={styles.healthWrapper}>
        <div className={`${styles.healthDot} ${project.health === 'On Track' ? styles.healthOnTrack : styles.healthAtRisk}`} />
        <span>{project.health}</span>
      </div>
    </td>
    <td>
      <div className={styles.teamAvatars}>
        {project.team.map((m, i) => (
          <div key={i} className={styles.avatar} title={m}>{m[0]}</div>
        ))}
      </div>
    </td>
    <td className={styles.dateCell}>
      <Calendar size={14} /> {project.deadline}
    </td>
    <td className={styles.actionCell}>
      <button className={styles.moreBtn}><MoreVertical size={18} /></button>
    </td>
  </motion.tr>
);

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const projects = [
    { name: "Quantum Nexus Alpha", client: "Nexus Labs", status: "In Progress", health: "On Track", team: ["Elena", "Marcus"], deadline: "Apr 12, 2026" },
    { name: "Aether OS Design", client: "Private Sector", status: "Review", health: "At Risk", team: ["Sarah", "Marcus"], deadline: "Apr 05, 2026" },
    { name: "Luminous Pay V2", client: "Global Finance", status: "Planning", health: "On Track", team: ["Elena", "Sarah"], deadline: "May 20, 2026" },
    { name: "Helix Media Node", client: "Helix Media", status: "Completed", health: "On Track", team: ["Marcus", "Sarah", "Elena"], deadline: "Mar 15, 2026" },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>Projects</h1>
          <p className={styles.subtitle}>Manage and track your active digital missions.</p>
        </div>
        <button className={styles.addBtn}>
          <Plus size={18} /> New Project
        </button>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.searchWrapper}>
          <Search size={18} className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Search projects..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className={styles.filterGroup}>
          <button className={styles.filterBtn}><Filter size={16} /> Filters</button>
          <div className={styles.viewToggle}>
            <button className={styles.activeView}>Table</button>
            <button>Board</button>
          </div>
        </div>
      </div>

      <div className={`${styles.tableWrapper} glass`}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Project</th>
              <th>Status</th>
              <th>Health</th>
              <th>Team</th>
              <th>Deadline</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p, i) => <ProjectRow key={p.name} project={p} index={i} />)}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Projects;
