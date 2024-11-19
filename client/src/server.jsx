// Core imports
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Component imports
import Login from './components/auth/Login.jsx';
import Register from './components/auth/Register.jsx';

// Context import

import { AuthProvider } from './context/AuthContext.js';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = AuthProvider();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/schedule" 
          element={
            <ProtectedRoute>
              <Schedule />
            </ProtectedRoute>
          } 
        />
        
        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        
        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

// Dashboard Component
const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      {/* Add your dashboard content here */}
    </div>
  );
};

// Schedule Component
const Schedule = () => {
  return (
    <div className="schedule">
      <h1>Schedule</h1>
      {/* Add your schedule content here */}
    </div>
  );
};

// NotFound Component
const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
    </div>
  );
};

export default AppRouter;