import React from 'react';
import Section from './Section';
import GlassCard from './GlassCard';
import styles from './Team.module.css';

const team = [
  { name: "Rev. Dr. Kingshima", role: "Visionary Founder", image: "https://i.pravatar.cc/150?u=founder" },
  { name: "Olawale Sarah", role: "Lead Technical Mentor", image: "https://i.pravatar.cc/150?u=mentor1" },
  { name: "John David", role: "Community Growth Lead", image: "https://i.pravatar.cc/150?u=mentor2" }
];

const Team = () => {
  return (
    <Section id="team">
      <div className={styles.header}>
        <h2 className={styles.title}>Leadership & Mentorship</h2>
        <p className={styles.subtitle}>Guided by experience and deeply committed to your growth and purpose.</p>
      </div>
      <div className={styles.grid}>
        {team.map((member, index) => (
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
