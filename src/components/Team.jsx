'use client';

import React from 'react';
import Section from './Section';
import GlassCard from './GlassCard';
import { teamMembers } from '@/data/teamMembers';
import styles from './Team.module.css';

const Team = () => {
  return (
    <Section id="team">
      <div className={styles.header}>
        <h2 className={styles.title}>Leadership & Mentorship</h2>
        <p className={styles.subtitle}>Guided by experience and deeply committed to your growth and purpose.</p>
      </div>
      <div className={styles.grid}>
        {teamMembers.map((member, index) => (
          <GlassCard key={index} delay={index * 150} className={styles.memberCard}>
            <div className={styles.imageWrapper}>
              <img src={member.image} alt={member.name} className={styles.image} />
            </div>
            <h3 className={styles.name}>{member.name}</h3>
            <p className={styles.role}>{member.role}</p>
          </GlassCard>
        ))}
      </div>
    </Section>
  );
};

export default Team;
