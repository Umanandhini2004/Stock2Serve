// frontend/src/routes.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import RoleDashboard from './pages/Dashboard/RoleDashboard';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/merchant/dashboard" element={<ProtectedRoute role="merchant"><RoleDashboard role="merchant" /></ProtectedRoute>} />
      <Route path="/consumer/feed" element={<ProtectedRoute role="consumer"><RoleDashboard role="consumer" /></ProtectedRoute>} />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
