import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  MapPin, 
  Link as LinkIcon, 
  Edit3, 
  Target, 
  Lightbulb, 
  Briefcase,
  Save,
  X,
  Plus,
  Trash2
} from 'lucide-react';
import styles from './Overview.module.css';
import { useAuth } from '../../context/AuthContext';

const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Form State initialized with user data or defaults
  const [formData, setFormData] = useState({
    name: '',
    jobTitle: '',
    location: '',
    website: '',
    bio: '',
    skills: [],
    goals: [],
    interests: []
  });

  // Track inputs for string array fields when adding new items
  const [newSkill, setNewSkill] = useState('');
  const [newGoal, setNewGoal] = useState('');
  const [newInterest, setNewInterest] = useState('');

  // Sync state when user changes
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        jobTitle: user.jobTitle || '',
        location: user.location || '',
        website: user.website || '',
        bio: user.bio || '',
        skills: user.skills || [],
        goals: user.goals || [],
        interests: user.interests || []
      });
    }
  }, [user]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateProfile(formData);
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update profile:', err);
      // Could add a toast notification here
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    // Revert to user original data
    if (user) {
      setFormData({
        name: user.name || '',
        jobTitle: user.jobTitle || '',
        location: user.location || '',
        website: user.website || '',
        bio: user.bio || '',
        skills: user.skills || [],
        goals: user.goals || [],
        interests: user.interests || []
      });
    }
    setIsEditing(false);
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.split(' ');
    if (parts.length > 1) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    return parts[0][0].toUpperCase();
  };

  const addItem = (field, value, setter) => {
    if (value.trim()) {
      setFormData(prev => ({ ...prev, [field]: [...prev[field], value.trim()] }));
      setter('');
    }
  };

  const removeItem = (field, indexToRemove) => {
    setFormData(prev => ({ 
      ...prev, 
      [field]: prev[field].filter((_, index) => index !== indexToRemove) 
    }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <h1 className={styles.title}>My Profile</h1>
          {!isEditing ? (
            <button 
              className={styles.ctaBtn} 
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              onClick={() => setIsEditing(true)}
            >
              <Edit3 size={18} /> Edit Profile
            </button>
          ) : (
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button 
                onClick={handleCancel}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px', color: 'var(--text-primary)' }}
              >
                <X size={18} /> Cancel
              </button>
              <button 
                className={styles.ctaBtn} 
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                onClick={handleSave}
                disabled={isSaving}
              >
                <Save size={18} /> {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className={styles.mainGrid}>
        <div className="profile-left">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass"
            style={{ padding: '2.5rem', borderRadius: '16px', border: '1px solid var(--border)', textAlign: 'center', marginBottom: '2rem' }}
          >
            <div style={{ width: '100px', height: '100px', background: 'var(--surface)', border: '2px solid var(--accent-primary)', borderRadius: '50%', margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', fontWeight: '800', color: 'var(--accent-primary)' }}>
              {getInitials(formData.name)}
            </div>
            
            {isEditing ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
                <input 
                  type="text" 
                  value={formData.name} 
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Full Name"
                  style={{ width: '100%', padding: '0.5rem', background: 'var(--bg-primary)', border: '1px solid var(--border)', color: 'white', borderRadius: '4px', textAlign: 'center' }}
                />
                <input 
                  type="text" 
                  value={formData.jobTitle} 
                  onChange={(e) => setFormData({...formData, jobTitle: e.target.value})}
                  placeholder="Role / Job Title"
                  style={{ width: '100%', padding: '0.5rem', background: 'var(--bg-primary)', border: '1px solid var(--border)', color: 'white', borderRadius: '4px', textAlign: 'center' }}
                />
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-primary)', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border)' }}>
                  <MapPin size={16} color="var(--text-muted)" />
                  <input 
                    type="text" 
                    value={formData.location} 
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="Location"
                    style={{ flex: 1, background: 'transparent', border: 'none', color: 'white', outline: 'none' }}
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-primary)', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border)' }}>
                  <LinkIcon size={16} color="var(--text-muted)" />
                  <input 
                    type="text" 
                    value={formData.website} 
                    onChange={(e) => setFormData({...formData, website: e.target.value})}
                    placeholder="Website or Portfolio"
                    style={{ flex: 1, background: 'transparent', border: 'none', color: 'white', outline: 'none' }}
                  />
                </div>
              </div>
            ) : (
              <>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '0.5rem' }}>{formData.name || 'Anonymous User'}</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>{formData.jobTitle || 'No title specified'}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  {formData.location && <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MapPin size={16} /> {formData.location}</div>}
                  {formData.website && <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><LinkIcon size={16} /> {formData.website}</div>}
                </div>
              </>
            )}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="glass"
            style={{ padding: '2rem', borderRadius: '16px', border: '1px solid var(--border)' }}
          >
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Target size={18} className={styles.highlight} /> My Goals
            </h3>
            
            {isEditing && (
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                <input 
                  type="text" 
                  value={newGoal} 
                  onChange={(e) => setNewGoal(e.target.value)}
                  placeholder="Add a new goal..."
                  onKeyPress={(e) => e.key === 'Enter' && addItem('goals', newGoal, setNewGoal)}
                  style={{ flex: 1, padding: '0.5rem', background: 'var(--bg-primary)', border: '1px solid var(--border)', color: 'white', borderRadius: '4px' }}
                />
                <button 
                  onClick={() => addItem('goals', newGoal, setNewGoal)}
                  style={{ background: 'var(--accent-primary)', color: 'white', padding: '0 0.75rem', borderRadius: '4px' }}
                >
                  <Plus size={18} />
                </button>
              </div>
            )}

            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {formData.goals.length > 0 ? formData.goals.map((goal, i) => (
                <li key={i} style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'start', justifyContent: 'space-between', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'start' }}>
                    <div style={{ width: '6px', height: '6px', background: 'var(--accent-primary)', borderRadius: '50%', marginTop: '0.4rem', flexShrink: 0 }} />
                    <span>{goal}</span>
                  </div>
                  {isEditing && (
                    <button onClick={() => removeItem('goals', i)} style={{ color: 'var(--text-muted)' }}>
                      <Trash2 size={14} />
                    </button>
                  )}
                </li>
              )) : (
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontStyle: 'italic' }}>No goals set yet.</p>
              )}
            </ul>
          </motion.div>
        </div>

        <div className="profile-right">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass"
            style={{ padding: '2rem', borderRadius: '16px', border: '1px solid var(--border)', marginBottom: '2rem' }}
          >
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1rem' }}>About Me</h3>
            {isEditing ? (
              <textarea 
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                placeholder="Write a brief bio about yourself..."
                rows={5}
                style={{ width: '100%', padding: '1rem', background: 'var(--bg-primary)', border: '1px solid var(--border)', color: 'var(--text-secondary)', borderRadius: '8px', lineHeight: '1.7', resize: 'vertical' }}
              />
            ) : (
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '1rem' }}>
                {formData.bio ? formData.bio : <span style={{ fontStyle: 'italic', opacity: 0.6 }}>Bio has not been set.</span>}
              </p>
            )}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="glass"
            style={{ padding: '2rem', borderRadius: '16px', border: '1px solid var(--border)' }}
          >
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1.5rem' }}>Skills & Interests</h3>
            
            {/* Skills Section */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Core Skills</h4>
              </div>
              
              {isEditing && (
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                  <input 
                    type="text" 
                    value={newSkill} 
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a new skill..."
                    onKeyPress={(e) => e.key === 'Enter' && addItem('skills', newSkill, setNewSkill)}
                    style={{ flex: 1, padding: '0.5rem', background: 'var(--bg-primary)', border: '1px solid var(--border)', color: 'white', borderRadius: '4px' }}
                  />
                  <button 
                    onClick={() => addItem('skills', newSkill, setNewSkill)}
                    style={{ background: 'var(--accent-primary)', color: 'white', padding: '0 0.75rem', borderRadius: '4px' }}
                  >
                    <Plus size={18} />
                  </button>
                </div>
              )}

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {formData.skills.length > 0 ? formData.skills.map((skill, i) => (
                  <span key={i} style={{ padding: '0.4rem 0.8rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '0.85rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {skill}
                    {isEditing && <button onClick={() => removeItem('skills', i)} style={{ color: 'var(--text-muted)', display: 'flex' }}><X size={14} /></button>}
                  </span>
                )) : (
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontStyle: 'italic', width: '100%' }}>No skills added.</p>
                )}
              </div>
            </div>

            {/* Interests Section */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Personal Interests</h4>
              </div>

              {isEditing && (
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                  <input 
                    type="text" 
                    value={newInterest} 
                    onChange={(e) => setNewInterest(e.target.value)}
                    placeholder="Add an interest..."
                    onKeyPress={(e) => e.key === 'Enter' && addItem('interests', newInterest, setNewInterest)}
                    style={{ flex: 1, padding: '0.5rem', background: 'var(--bg-primary)', border: '1px solid var(--border)', color: 'white', borderRadius: '4px' }}
                  />
                  <button 
                    onClick={() => addItem('interests', newInterest, setNewInterest)}
                    style={{ background: 'var(--accent-primary)', color: 'white', padding: '0 0.75rem', borderRadius: '4px' }}
                  >
                    <Plus size={18} />
                  </button>
                </div>
              )}

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {formData.interests.length > 0 ? formData.interests.map((interest, i) => (
                  <span key={i} style={{ padding: '0.4rem 0.8rem', background: 'transparent', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    {interest}
                    {isEditing && <button onClick={() => removeItem('interests', i)} style={{ color: 'var(--text-muted)', display: 'flex' }}><X size={14} /></button>}
                  </span>
                )) : (
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontStyle: 'italic', width: '100%' }}>No interests added.</p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
