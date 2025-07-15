import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import { Calendar, Clock, User, Mail, Phone, MessageSquare } from 'lucide-react';
import { useAppointments } from '../contexts/AppointmentContext';
import LoadingSpinner from '../components/LoadingSpinner';
import 'react-datepicker/dist/react-datepicker.css';

interface BookingFormData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  service: string;
  message: string;
}

const BookAppointment: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [step, setStep] = useState(1);

  const { addAppointment, getAvailableSlots, isLoading } = useAppointments();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<BookingFormData>();

  const services = [
    'General Consultation',
    'Haircut & Styling',
    'Medical Checkup',
    'Dental Cleaning',
    'Massage Therapy',
    'Legal Consultation',
    'Other'
  ];

  const availableSlots = selectedDate ? getAvailableSlots(selectedDate) : [];

  const onSubmit = async (data: BookingFormData) => {
    if (!selectedDate || !selectedTime) {
      toast.error('Please select date and time');
      return;
    }

    try {
      await addAppointment({
        ...data,
        date: selectedDate,
        time: selectedTime,
        status: 'pending'
      });

      // Reset form
      reset();
      setSelectedDate(null);
      setSelectedTime('');
      setStep(1);
    } catch (error) {
      // Error is handled in the context
    }
  };

  const nextStep = () => {
    if (step === 1 && (!selectedDate || !selectedTime)) {
      toast.error('Please select date and time');
      return;
    }
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-secondary-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl lg:text-4xl font-bold text-secondary-900 mb-4">
            Book Your Appointment
          </h1>
          <p className="text-lg text-secondary-600">
            Choose your preferred date and time, then fill in your details
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-primary-500' : 'text-secondary-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium transition-colors ${
                step >= 1 ? 'bg-primary-500 text-white' : 'bg-secondary-200 text-secondary-600'
              }`}>
                1
              </div>
              <span className="hidden sm:block">Date & Time</span>
            </div>
            <div className="w-12 h-px bg-secondary-300"></div>
            <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-primary-500' : 'text-secondary-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium transition-colors ${
                step >= 2 ? 'bg-primary-500 text-white' : 'bg-secondary-200 text-secondary-600'
              }`}>
                2
              </div>
              <span className="hidden sm:block">Your Details</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8">
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold text-secondary-900 mb-6 flex items-center">
                <Calendar className="h-6 w-6 mr-2 text-primary-500" />
                Select Date & Time
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Date Picker */}
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Choose Date
                  </label>
                  <DatePicker
                    selected={selectedDate}
                    onChange={setSelectedDate}
                    minDate={new Date()}
                    inline
                    className="w-full"
                  />
                </div>

                {/* Time Slots */}
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Available Time Slots
                  </label>
                  {selectedDate ? (
                    <div className="grid grid-cols-3 gap-2">
                      {availableSlots.length > 0 ? (
                        availableSlots.map((slot) => (
                          <button
                            key={slot}
                            onClick={() => setSelectedTime(slot)}
                            className={`p-3 text-sm font-medium rounded-lg border transition-all duration-200 ${
                              selectedTime === slot
                                ? 'bg-primary-500 text-white border-primary-500 shadow-md'
                                : 'bg-white text-secondary-700 border-secondary-300 hover:border-primary-500 hover:text-primary-500'
                            }`}
                          >
                            {slot}
                          </button>
                        ))
                      ) : (
                        <div className="col-span-3 text-center py-8 text-secondary-500">
                          No available slots for this date
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-secondary-500">
                      Please select a date to see available time slots
                    </div>
                  )}
                </div>
              </div>

              {selectedDate && selectedTime && (
                <div className="mt-6 p-4 bg-primary-50 rounded-lg">
                  <div className="flex items-center text-primary-700">
                    <Clock className="h-5 w-5 mr-2" />
                    <span className="font-medium">
                      Selected: {format(selectedDate, 'EEEE, MMMM d, yyyy')} at {selectedTime}
                    </span>
                  </div>
                </div>
              )}

              <div className="flex justify-end mt-8">
                <button
                  onClick={nextStep}
                  className="bg-primary-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors shadow-md hover:shadow-lg"
                >
                  Continue
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold text-secondary-900 mb-6 flex items-center">
                <User className="h-6 w-6 mr-2 text-primary-500" />
                Your Details
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="h-5 w-5 text-secondary-400 absolute left-3 top-3" />
                      <input
                        {...register('customerName', { required: 'Name is required' })}
                        type="text"
                        className="w-full pl-10 pr-4 py-3 border border-secondary-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 transition-colors"
                        placeholder="Enter your full name"
                      />
                    </div>
                    {errors.customerName && (
                      <p className="mt-1 text-sm text-accent-600">{errors.customerName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="h-5 w-5 text-secondary-400 absolute left-3 top-3" />
                      <input
                        {...register('customerEmail', {
                          required: 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address'
                          }
                        })}
                        type="email"
                        className="w-full pl-10 pr-4 py-3 border border-secondary-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 transition-colors"
                        placeholder="Enter your email"
                      />
                    </div>
                    {errors.customerEmail && (
                      <p className="mt-1 text-sm text-accent-600">{errors.customerEmail.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="h-5 w-5 text-secondary-400 absolute left-3 top-3" />
                      <input
                        {...register('customerPhone', { required: 'Phone number is required' })}
                        type="tel"
                        className="w-full pl-10 pr-4 py-3 border border-secondary-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 transition-colors"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    {errors.customerPhone && (
                      <p className="mt-1 text-sm text-accent-600">{errors.customerPhone.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Service Type *
                    </label>
                    <select
                      {...register('service', { required: 'Please select a service' })}
                      className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    >
                      <option value="">Select a service</option>
                      {services.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                    {errors.service && (
                      <p className="mt-1 text-sm text-accent-600">{errors.service.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Additional Message
                  </label>
                  <div className="relative">
                    <MessageSquare className="h-5 w-5 text-secondary-400 absolute left-3 top-3" />
                    <textarea
                      {...register('message')}
                      rows={4}
                      className="w-full pl-10 pr-4 py-3 border border-secondary-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      placeholder="Any additional information or special requests..."
                    />
                  </div>
                </div>

                {/* Appointment Summary */}
                <div className="bg-secondary-50 p-4 rounded-lg">
                  <h3 className="font-medium text-secondary-900 mb-2">Appointment Summary</h3>
                  <div className="text-sm text-secondary-600 space-y-1">
                    <div>Date: {selectedDate && format(selectedDate, 'EEEE, MMMM d, yyyy')}</div>
                    <div>Time: {selectedTime}</div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="bg-secondary-300 text-secondary-700 px-6 py-3 rounded-lg font-medium hover:bg-secondary-400 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-primary-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center shadow-md hover:shadow-lg"
                  >
                    {isLoading ? (
                      <>
                        <LoadingSpinner size="sm" color="white" />
                        <span className="ml-2">Booking...</span>
                      </>
                    ) : (
                      'Confirm Booking'
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;