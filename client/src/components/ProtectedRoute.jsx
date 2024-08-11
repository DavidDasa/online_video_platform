import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext.jsx';

const ProtectedRoute = ({ element }) => {
  const { authUser } = useAuthContext();

  return authUser ? element : <Navigate to="/notfound" />;
};

export default ProtectedRoute;
