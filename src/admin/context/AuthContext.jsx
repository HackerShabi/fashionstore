import React, { createContext, useState, useContext, useEffect } from 'react';

// Create auth context
const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const user = localStorage.getItem('adminUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = (email, password) => {
    // For now, we'll use a hardcoded admin user
    // In a real app, this would validate against Firebase Auth
    if (email === 'admin@example.com' && password === 'admin123') {
      const user = { 
        email: email,
        name: 'Admin User',
        role: 'admin',
        id: '1'
      };
      localStorage.setItem('adminUser', JSON.stringify(user));
      setCurrentUser(user);
      setError('');
      return Promise.resolve(user);
    } else {
      setError('Invalid email or password');
      return Promise.reject(new Error('Invalid email or password'));
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('adminUser');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    login,
    logout,
    error,
    setError
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 