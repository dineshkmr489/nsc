// src/App.jsx
import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import SuperAdminLogin from './pages/SuperAdminLogin';
import AdminLogin from './pages/AdminLogin';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import AdminIDCreation from './pages/AdminIDCreation';
import ContentUpload from './pages/ContentUpload';
import UniqueIDCreation from './pages/UniqueIDCreation';
import MonitoringTool from './pages/MonitoringTool';
import JourneySelection from './pages/JourneySelection';
import { useSelector } from 'react-redux';
import './App.css';

function App() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  
  return (
    <ThemeProvider>
      <div className="App">
        <Routes>
          {/* Redirect root path based on authentication status */}
          <Route 
            path="/" 
            element={
              isAuthenticated ? 
                <Navigate to="/admin" replace /> : 
                <Navigate to="/admin-login" replace />
            } 
          />
          <Route path="/super-admin-login" element={<SuperAdminLogin />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="admin-id-creation" element={<AdminIDCreation />} />
            <Route path="content-upload" element={<ContentUpload />} />
            <Route path="unique-id-creation" element={<UniqueIDCreation />} />
            <Route path="monitoring-tool" element={<MonitoringTool />} />
            <Route path="journey-selection" element={<JourneySelection />} />
          </Route>
          
          {/* Fallback route for 404 errors */}
          <Route 
            path="*" 
            element={
              <div style={{ padding: '20px', textAlign: 'center' }}>
                <h1>404 - Page Not Found</h1>
                <p>The page you're looking for doesn't exist.</p>
              </div>
            } 
          />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;