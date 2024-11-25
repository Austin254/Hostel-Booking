import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import HostelDetailPage from './pages/HostelDetailPage';
import BookingPage from './pages/BookingPage';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import NotFoundPage from './pages/NotFoundPage';
import FloatingActions from './components/FloatingActions';
import AuthProvider from './context/AuthContext';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-gray-50">
            <Toaster position="top-right" />
            <Header />
            
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/hostel/:id" element={<HostelDetailPage />} />
              <Route path="/booking/:hostelId" element={<BookingPage />} />
              <Route path="/dashboard" element={<UserDashboard />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>

            <FloatingActions />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;