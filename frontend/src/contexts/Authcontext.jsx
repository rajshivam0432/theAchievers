import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin') === 'true');

  useEffect(() => {
    localStorage.setItem('token', token);
    localStorage.setItem('isAdmin', isAdmin);
  }, [token, isAdmin]);

  const login = (userToken, adminStatus) => {
    setToken(userToken);
    setIsAdmin(adminStatus);
  };

  const logout = () => {
    setToken('');
    setIsAdmin(false);
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
  };

  return (
    <AuthContext.Provider value={{ token, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
