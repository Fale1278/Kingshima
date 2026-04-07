import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('auth_token');
      if (storedToken) {
        try {
          const res = await fetch('/api/auth/me', {
            headers: { 'Authorization': `Bearer ${storedToken}` }
          });
          if (res.ok) {
            const data = await res.json();
            setUser(data);
          } else {
            localStorage.removeItem('auth_token');
          }
        } catch (err) {
          console.error('Auth verification failed', err);
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      
      const { token, ...userInfo } = data;
      setUser(userInfo);
      localStorage.setItem('auth_token', token);
      return userInfo;
    } catch (err) {
      if (err.name === 'TypeError') {
        throw new Error('Backend server unreachable. Make sure the Node.js server is running on port 5000.');
      }
      throw err;
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');
      
      const { token, ...userInfo } = data;
      setUser(userInfo);
      localStorage.setItem('auth_token', token);
      return userInfo;
    } catch (err) {
      if (err.name === 'TypeError') {
        throw new Error('Backend server unreachable. Make sure the Node.js server is running on port 5000.');
      }
      throw err;
    }
  };

  const updateProfile = async (profileData) => {
    try {
      const storedToken = localStorage.getItem('auth_token');
      const res = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${storedToken}`
        },
        body: JSON.stringify(profileData)
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to update profile');
      
      const { token, ...userInfo } = data;
      setUser(userInfo);
      if (token) localStorage.setItem('auth_token', token);
      return userInfo;
    } catch (err) {
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_token');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    updateProfile,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
