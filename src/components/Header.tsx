import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Calendar, Menu, X, User, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Book Appointment', path: '/book' },
    { name: 'My Appointments', path: '/my-appointments' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="p-2 bg-primary-500 rounded-lg">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-semibold text-primary-500">
              SmartBook
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition-all duration-200 hover:text-primary-500 ${
                  isActive(item.path)
                    ? 'text-primary-500 border-b-2 border-primary-500 pb-1'
                    : 'text-secondary-600 hover:text-primary-500'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-secondary-500" />
                  <span className="text-sm text-secondary-700">{user.name}</span>
                </div>
                {user.role === 'admin' && (
                  <Link
                    to="/admin/dashboard"
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive('/admin/dashboard')
                        ? 'bg-primary-600 text-white'
                        : 'bg-primary-500 text-white hover:bg-primary-600'
                    }`}
                  >
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-secondary-500 hover:text-accent-500 transition-colors"
                  title="Logout"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/admin/login"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive('/admin/login')
                    ? 'bg-primary-600 text-white'
                    : 'bg-primary-500 text-white hover:bg-primary-600'
                }`}
              >
                Admin Login
              </Link>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-secondary-600 hover:text-primary-500 hover:bg-secondary-50 transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden py-4 border-t border-secondary-100"
          >
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    isActive(item.path)
                      ? 'text-primary-500'
                      : 'text-secondary-600 hover:text-primary-500'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              {user ? (
                <div className="pt-4 border-t border-secondary-100">
                  <div className="flex items-center space-x-2 mb-4">
                    <User className="h-4 w-4 text-secondary-500" />
                    <span className="text-sm text-secondary-700">{user.name}</span>
                  </div>
                  {user.role === 'admin' && (
                    <Link
                      to="/admin/dashboard"
                      onClick={() => setIsMenuOpen(false)}
                      className="block bg-primary-500 text-white px-4 py-2 rounded-lg text-sm font-medium text-center mb-2 hover:bg-primary-600 transition-colors"
                    >
                      Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 text-secondary-500 hover:text-accent-500 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="text-sm">Logout</span>
                  </button>
                </div>
              ) : (
                <Link
                  to="/admin/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="bg-primary-500 text-white px-4 py-2 rounded-lg text-sm font-medium text-center hover:bg-primary-600 transition-colors"
                >
                  Admin Login
                </Link>
              )}
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;