import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import LandingPage from './pages/LandingPage';
import AdminLogin from './pages/AdminLogin';
import MemberLogin from './pages/MemberLogin';
import Dashboard from './pages/Dashboard';
import MembersList from './pages/MembersList';
import AddMember from './pages/AddMember';
import EditMember from './pages/EditMember';
import MemberDetails from './pages/MemberDetails';
import SystemSettings from './pages/SystemSettings';

// Components
import Navbar from './components/Navbar';

import MemberDashboard from './pages/MemberDashboard';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-black text-slate-100">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/member/login" element={<MemberLogin />} />
              <Route path="/login" element={<MemberLogin />} /> {/* Default to member login */}
              
              <Route path="/dashboard" element={
                <ProtectedRoute role="admin">
                  <Dashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/member-dashboard" element={
                <ProtectedRoute role="member">
                  <MemberDashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/members" element={
                <ProtectedRoute role="admin">
                  <MembersList />
                </ProtectedRoute>
              } />
              
              <Route path="/members/add" element={
                <ProtectedRoute role="admin">
                  <AddMember />
                </ProtectedRoute>
              } />
              
              <Route path="/members/edit/:id" element={
                <ProtectedRoute role="admin">
                  <EditMember />
                </ProtectedRoute>
              } />
              
              <Route path="/members/:id" element={
                <ProtectedRoute role="admin">
                  <MemberDetails />
                </ProtectedRoute>
              } />

              <Route path="/settings" element={
                <ProtectedRoute role="admin">
                  <SystemSettings />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          <Toaster position="top-right" />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
