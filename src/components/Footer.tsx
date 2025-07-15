import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4 hover:opacity-80 transition-opacity">
              <div className="p-2 bg-white rounded-lg">
                <Calendar className="h-6 w-6 text-primary-500" />
              </div>
              <span className="text-xl font-semibold">SmartBook</span>
            </Link>
            <p className="text-primary-100 mb-4 max-w-md">
              Professional appointment booking system designed for local businesses. 
              Streamline your scheduling and enhance customer experience.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span className="text-sm">hello@smartbook.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  className="text-primary-100 hover:text-white transition-colors hover:underline"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/book" 
                  className="text-primary-100 hover:text-white transition-colors hover:underline"
                >
                  Book Appointment
                </Link>
              </li>
              <li>
                <Link 
                  to="/my-appointments" 
                  className="text-primary-100 hover:text-white transition-colors hover:underline"
                >
                  My Appointments
                </Link>
              </li>
              <li>
                <Link 
                  to="/admin/login" 
                  className="text-primary-100 hover:text-white transition-colors hover:underline"
                >
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-primary-100">
              <li>Healthcare Appointments</li>
              <li>Salon & Beauty Services</li>
              <li>Consultation Booking</li>
              <li>Professional Services</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-600 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-primary-100 text-sm">
            © 2025 SmartBook. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-primary-100 hover:text-white text-sm transition-colors hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="text-primary-100 hover:text-white text-sm transition-colors hover:underline">
              Terms of Service
            </a>
            <a href="#" className="text-primary-100 hover:text-white text-sm transition-colors hover:underline">
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;