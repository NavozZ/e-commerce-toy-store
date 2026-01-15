import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check LocalStorage on initial load (Persistence)
  useEffect(() => {
    const storedUser = localStorage.getItem('userInfo');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Login Action
  const login = (userData) => {
    localStorage.setItem('userInfo', JSON.stringify(userData)); // Save session
    localStorage.setItem('token', userData.token); // Save token for requests
    setUser(userData); // Update State immediately
  };

  // Logout Action
  const logout = () => {
    localStorage.removeItem('userInfo'); // Destroy session
    localStorage.removeItem('token');
    localStorage.removeItem('bunny_cart'); // Optional: Clear cart on logout
    setUser(null); // Update State immediately
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};