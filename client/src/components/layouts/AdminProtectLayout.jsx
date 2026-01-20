import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const AdminProtectLayout = () => {
  const { user } = useContext(AuthContext);

  // Requirement: Only users with isAdmin: true can enter
  if (!user || !user.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminProtectLayout;