import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, role }) => {
  const token = localStorage.getItem('jwtToken');
  const decodedToken = token ? JSON.parse(atob(token.split('.')[1])) : null;

  // Verifica se il token esiste e se l'utente ha il ruolo giusto
  if (!token || (role && decodedToken.role !== role)) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
