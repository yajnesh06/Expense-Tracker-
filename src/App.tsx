import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import Settings from './pages/Settings';
import Welcome from './pages/Welcome';

function App() {
  const userPreferences = JSON.parse(localStorage.getItem('userPreferences') || '{}');

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        {userPreferences.name && <Navbar />}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 py-8"
        >
          <Routes>
            <Route path="/" element={
              userPreferences.name ? <Navigate to="/dashboard" replace /> : <Welcome />
            } />
            <Route path="/dashboard" element={
              userPreferences.name ? <Dashboard /> : <Navigate to="/" replace />
            } />
            <Route path="/history" element={
              userPreferences.name ? <History /> : <Navigate to="/" replace />
            } />
            <Route path="/settings" element={
              userPreferences.name ? <Settings /> : <Navigate to="/" replace />
            } />
          </Routes>
        </motion.div>
      </div>
    </BrowserRouter>
  );
}

export default App;