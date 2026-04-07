import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  CalendarDays, 
  MapPin, 
  Clock, 
  Users, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import styles from './Overview.module.css';
import { useAuth } from '../../context/AuthContext';

const EventCard = ({ event, onRSVP, delay }) => {
  const { user } = useAuth();
  const isRegistered = event.registeredUsers?.includes(user?._id);

  return (
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
          <CalendarDays size={16} /> {new Date(event.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
        </div>
        <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--text-primary)' }}>{event.title}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}><MapPin size={16} /> {event.location}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}><Clock size={16} /> {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}><Users size={16} /> {event.registeredUsers?.length || 0} Attending</div>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          {isRegistered ? (
            <button className={styles.ctaBtn} style={{ background: 'var(--accent-success)', cursor: 'default' }} disabled>
               <CheckCircle2 size={16} style={{ marginRight: '0.5rem' }} /> Registered
            </button>
          ) : (
            <button onClick={() => onRSVP(event._id)} className={styles.ctaBtn}>RSVP Now</button>
          )}
          <button style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>View Details <ArrowRight size={16} /></button>
        </div>
      </div>
    </motion.div>
  );
};

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const token = localStorage.getItem('auth_token');
    try {
      const res = await fetch('/api/events', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) setEvents(await res.json());
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRSVP = async (id) => {
    const token = localStorage.getItem('auth_token');
    try {
      const res = await fetch(`/api/events/${id}/register`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div style={{ width: '100%' }}>
          <h1 className={styles.title}>Upcoming Events</h1>
          <p className={styles.subtitle}>Workshops, prayer sessions, and community gatherings.</p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {isLoading ? <p>Loading events...</p> : events.map((ev, i) => (
          <EventCard key={ev._id} event={ev} onRSVP={handleRSVP} delay={i * 0.15} />
        ))}
        {!isLoading && events.length === 0 && <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No upcoming events currently scheduled.</p>}
      </div>
    </div>
  );
};

export default EventsPage;
