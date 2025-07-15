import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';

// Import components
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import BookAppointment from './pages/BookAppointment';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import MyAppointments from './pages/MyAppointments';
import { AuthProvider } from './contexts/AuthContext';
import { AppointmentProvider } from './contexts/AppointmentContext';

function App() {
  return (
    <AuthProvider>
      <AppointmentProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#ffffff',
                  color: '#191970',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontFamily: 'Poppins, sans-serif',
                },
              }}
            />
            
            <Header />
            
            <motion.main 
              className="flex-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/book" element={<BookAppointment />} />
                <Route path="/my-appointments" element={<MyAppointments />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
              </Routes>
            </motion.main>
            
            <Footer />
          </div>
        </Router>
      </AppointmentProvider>
    </AuthProvider>
  );
}

export default App;