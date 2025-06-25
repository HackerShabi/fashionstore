import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    // Redirect to login if not authenticated
    return <Navigate to="/admin/login" />;
  }

  // Render the children or outlet
  return children || <Outlet />;
};

export default ProtectedRoute; 