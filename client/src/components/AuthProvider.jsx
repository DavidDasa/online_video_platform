import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Here you might want to validate the token with the server
      setAuthUser(true); // Set user as authenticated
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    setAuthUser(true);
    navigate('/degrees');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthUser(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ authUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => React.useContext(AuthContext);
