import React from 'react';
import { motion } from 'framer-motion';
import { 
  CalendarDays, 
  MapPin, 
  Clock, 
  Users, 
  ArrowRight
} from 'lucide-react';
import styles from './Overview.module.css';

const EventCard = ({ title, date, location, time, attendees, delay, image }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6 }}
    className="glass"
    style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border)', background: 'var(--bg-secondary)', marginBottom: '1.5rem', display: 'flex', flexWrap: 'wrap' }}
  >
    <div style={{ padding: '2rem', flex: '1', minWidth: '300px' }}>
      <div style={{ display: 'flex', gap: '0.75rem', color: 'var(--accent-primary)', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '0.05em' }}>
        <CalendarDays size={16} /> {date}
      </div>
      <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--text-primary)' }}>{title}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}><MapPin size={16} /> {location}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}><Clock size={16} /> {time}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}><Users size={16} /> {attendees} Attending</div>
      </div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button className={styles.ctaBtn}>RSVP Now</button>
        <button style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>View Details <ArrowRight size={16} /></button>
      </div>
    </div>
  </motion.div>
);

const EventsPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div style={{ width: '100%' }}>
          <h1 className={styles.title}>Upcoming Events</h1>
          <p className={styles.subtitle}>Workshops, prayer sessions, and community gatherings.</p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {[
          { title: "Kingdom Media Workshop", date: "Sat, Oct 19", location: "Foundation Hub & Online", time: "10:00 AM - 4:00 PM", attendees: 48 },
          { title: "Monthly Community Impact Night", date: "Thu, Oct 24", location: "Main Hall", time: "6:00 PM - 8:30 PM", attendees: 120 },
          { title: "Tech Ethics & Spiritual Discernment", date: "Tue, Oct 29", location: "Zoom Webinar", time: "7:00 PM - 8:30 PM", attendees: 85 }
        ].map((ev, i) => (
          <EventCard key={i} {...ev} delay={i * 0.15} />
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
