import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context';

const ProtectedRoute = ({ children }) => {
  const { currentUser, userDetails, loading } = useAuth();
  
  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }
  
  // Redirect to login if not authenticated
  if (!currentUser) {
    return <Navigate to="/admin/login" />;
  }
  
  // Redirect to login if not an admin
  if (userDetails && userDetails.role !== 'admin') {
    return <Navigate to="/admin/login" />;
  }

  // Render the children or outlet
  return children || <Outlet />;
};

export default ProtectedRoute; 