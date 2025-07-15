import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  Users, 
  Star, 
  ArrowRight,
  Smartphone,
  Mail,
  Shield
} from 'lucide-react';

const Home: React.FC = () => {
  const features = [
    {
      icon: Calendar,
      title: 'Easy Booking',
      description: 'Book appointments in just a few clicks with our intuitive interface.'
    },
    {
      icon: Clock,
      title: 'Real-time Availability',
      description: 'See available time slots instantly and avoid scheduling conflicts.'
    },
    {
      icon: CheckCircle,
      title: 'Instant Confirmation',
      description: 'Get immediate confirmation via email and SMS notifications.'
    },
    {
      icon: Smartphone,
      title: 'Mobile Friendly',
      description: 'Book and manage appointments from any device, anywhere.'
    },
    {
      icon: Mail,
      title: 'Email Reminders',
      description: 'Never miss an appointment with automated email reminders.'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your personal information is protected with enterprise-grade security.'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Happy Customers' },
    { number: '50K+', label: 'Appointments Booked' },
    { number: '99.9%', label: 'Uptime' },
    { number: '4.9/5', label: 'Customer Rating' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Smart Appointment Booking
                <span className="block text-primary-100">Made Simple</span>
              </h1>
              <p className="text-xl text-primary-50 mb-8 leading-relaxed">
                Streamline your business scheduling with our professional appointment 
                booking system. Perfect for clinics, salons, consultants, and more.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/book"
                  className="bg-white text-primary-500 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-all duration-200 inline-flex items-center justify-center group shadow-lg hover:shadow-xl"
                >
                  Book Appointment
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/admin/login"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-500 transition-all duration-200 inline-flex items-center justify-center"
                >
                  Admin Portal
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white p-8 rounded-2xl shadow-2xl">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-primary-500 rounded-lg">
                    <Calendar className="h-8 w-8 text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-secondary-800">Quick Booking</h3>
                    <p className="text-secondary-600">Schedule in 3 easy steps</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-medium">1</div>
                    <span className="ml-3 text-secondary-700">Choose your service</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-medium">2</div>
                    <span className="ml-3 text-secondary-700">Select date & time</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-medium">3</div>
                    <span className="ml-3 text-secondary-700">Confirm booking</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl lg:text-4xl font-bold text-primary-500 mb-2">
                  {stat.number}
                </div>
                <div className="text-secondary-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-secondary-900 mb-4">
              Why Choose SmartBook?
            </h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              Our comprehensive appointment booking system is designed to make scheduling 
              effortless for both businesses and customers.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1"
              >
                <div className="p-3 bg-primary-50 rounded-lg w-fit mb-4">
                  <feature.icon className="h-8 w-8 text-primary-500" />
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-secondary-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-primary-50 mb-8">
              Join thousands of satisfied customers who trust SmartBook for their scheduling needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/book"
                className="bg-white text-primary-500 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-all duration-200 inline-flex items-center justify-center group shadow-lg hover:shadow-xl"
              >
                Book Your First Appointment
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/my-appointments"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-500 transition-all duration-200 inline-flex items-center justify-center"
              >
                View My Appointments
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;