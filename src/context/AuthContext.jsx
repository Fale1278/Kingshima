import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking local storage for an existing session
    const storedUser = localStorage.getItem('auth_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Simulate an API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password.length >= 6) {
          const fakeUser = { id: '1', email, name: email.split('@')[0] };
          setUser(fakeUser);
          localStorage.setItem('auth_user', JSON.stringify(fakeUser));
          resolve(fakeUser);
        } else {
          reject(new Error('Invalid email or password needs to be at least 6 characters.'));
        }
      }, 500);
    });
  };

  const register = async (name, email, password) => {
    // Simulate an API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (name && email && password.length >= 6) {
          const fakeUser = { id: '2', email, name };
          setUser(fakeUser);
          localStorage.setItem('auth_user', JSON.stringify(fakeUser));
          resolve(fakeUser);
        } else {
          reject(new Error('Please fill in all fields correctly.'));
        }
      }, 500);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
