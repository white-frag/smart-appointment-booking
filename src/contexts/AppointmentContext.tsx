import React, { createContext, useContext, useState, useEffect } from 'react';
import { format, isAfter, startOfDay } from 'date-fns';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

export interface Appointment {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: Date;
  time: string;
  service: string;
  message?: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: Date;
}

interface BusinessHours {
  start: string;
  end: string;
  breakStart?: string;
  breakEnd?: string;
}

interface AppointmentContextType {
  appointments: Appointment[];
  businessHours: BusinessHours;
  offDays: string[];
  isLoading: boolean;
  addAppointment: (appointment: Omit<Appointment, 'id' | 'createdAt'>) => Promise<void>;
  updateAppointment: (id: string, updates: Partial<Appointment>) => Promise<void>;
  deleteAppointment: (id: string) => Promise<void>;
  getAvailableSlots: (date: Date) => string[];
  updateBusinessHours: (hours: BusinessHours) => Promise<void>;
  updateOffDays: (days: string[]) => Promise<void>;
  loadAppointments: () => Promise<void>;
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

export const AppointmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [businessHours, setBusinessHours] = useState<BusinessHours>({
    start: '09:00',
    end: '17:00',
    breakStart: '12:00',
    breakEnd: '13:00',
  });
  const [offDays, setOffDays] = useState<string[]>(['0', '6']); // Sunday and Saturday
  const [isLoading, setIsLoading] = useState(false);

  const loadAppointments = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .order('appointment_date', { ascending: true });

      if (error) throw error;

      const formattedAppointments: Appointment[] = data.map(apt => ({
        id: apt.id,
        customerName: apt.customer_name,
        customerEmail: apt.customer_email,
        customerPhone: apt.customer_phone,
        date: new Date(apt.appointment_date),
        time: apt.appointment_time,
        service: apt.service,
        message: apt.message || undefined,
        status: apt.status,
        createdAt: new Date(apt.created_at),
      }));

      setAppointments(formattedAppointments);
    } catch (error) {
      console.error('Error loading appointments:', error);
      toast.error('Failed to load appointments');
    } finally {
      setIsLoading(false);
    }
  };

  const loadBusinessSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('business_settings')
        .select('*')
        .single();

      if (error && error.code !== 'PGRST116') throw error;

      if (data) {
        setBusinessHours({
          start: data.business_hours_start,
          end: data.business_hours_end,
          breakStart: data.break_start || undefined,
          breakEnd: data.break_end || undefined,
        });
        setOffDays(data.off_days || ['0', '6']);
      }
    } catch (error) {
      console.error('Error loading business settings:', error);
    }
  };

  useEffect(() => {
    loadAppointments();
    loadBusinessSettings();
  }, []);

  const addAppointment = async (appointmentData: Omit<Appointment, 'id' | 'createdAt'>) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('appointments')
        .insert({
          customer_name: appointmentData.customerName,
          customer_email: appointmentData.customerEmail,
          customer_phone: appointmentData.customerPhone,
          appointment_date: format(appointmentData.date, 'yyyy-MM-dd'),
          appointment_time: appointmentData.time,
          service: appointmentData.service,
          message: appointmentData.message || null,
          status: appointmentData.status,
        })
        .select()
        .single();

      if (error) throw error;

      const newAppointment: Appointment = {
        id: data.id,
        customerName: data.customer_name,
        customerEmail: data.customer_email,
        customerPhone: data.customer_phone,
        date: new Date(data.appointment_date),
        time: data.appointment_time,
        service: data.service,
        message: data.message || undefined,
        status: data.status,
        createdAt: new Date(data.created_at),
      };

      setAppointments(prev => [...prev, newAppointment]);
      toast.success('Appointment booked successfully!');
    } catch (error) {
      console.error('Error adding appointment:', error);
      toast.error('Failed to book appointment');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateAppointment = async (id: string, updates: Partial<Appointment>) => {
    try {
      const updateData: any = {};
      
      if (updates.customerName) updateData.customer_name = updates.customerName;
      if (updates.customerEmail) updateData.customer_email = updates.customerEmail;
      if (updates.customerPhone) updateData.customer_phone = updates.customerPhone;
      if (updates.date) updateData.appointment_date = format(updates.date, 'yyyy-MM-dd');
      if (updates.time) updateData.appointment_time = updates.time;
      if (updates.service) updateData.service = updates.service;
      if (updates.message !== undefined) updateData.message = updates.message;
      if (updates.status) updateData.status = updates.status;

      const { error } = await supabase
        .from('appointments')
        .update(updateData)
        .eq('id', id);

      if (error) throw error;

      setAppointments(prev =>
        prev.map(apt => (apt.id === id ? { ...apt, ...updates } : apt))
      );
    } catch (error) {
      console.error('Error updating appointment:', error);
      toast.error('Failed to update appointment');
      throw error;
    }
  };

  const deleteAppointment = async (id: string) => {
    try {
      const { error } = await supabase
        .from('appointments')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setAppointments(prev => prev.filter(apt => apt.id !== id));
      toast.success('Appointment deleted successfully');
    } catch (error) {
      console.error('Error deleting appointment:', error);
      toast.error('Failed to delete appointment');
      throw error;
    }
  };

  const getAvailableSlots = (date: Date): string[] => {
    const dayOfWeek = date.getDay().toString();
    
    // Check if it's an off day
    if (offDays.includes(dayOfWeek)) {
      return [];
    }

    // Check if it's in the past
    if (!isAfter(date, startOfDay(new Date()))) {
      return [];
    }

    const slots: string[] = [];
    const startHour = parseInt(businessHours.start.split(':')[0]);
    const endHour = parseInt(businessHours.end.split(':')[0]);
    const breakStartHour = businessHours.breakStart ? parseInt(businessHours.breakStart.split(':')[0]) : null;
    const breakEndHour = businessHours.breakEnd ? parseInt(businessHours.breakEnd.split(':')[0]) : null;

    for (let hour = startHour; hour < endHour; hour++) {
      // Skip break time
      if (breakStartHour && breakEndHour && hour >= breakStartHour && hour < breakEndHour) {
        continue;
      }

      const timeSlot = `${hour.toString().padStart(2, '0')}:00`;
      
      // Check if slot is already booked
      const isBooked = appointments.some(apt => 
        format(apt.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd') && 
        apt.time === timeSlot &&
        apt.status !== 'cancelled'
      );

      if (!isBooked) {
        slots.push(timeSlot);
      }
    }

    return slots;
  };

  const updateBusinessHours = async (hours: BusinessHours) => {
    try {
      const { error } = await supabase
        .from('business_settings')
        .upsert({
          id: '1',
          business_hours_start: hours.start,
          business_hours_end: hours.end,
          break_start: hours.breakStart || null,
          break_end: hours.breakEnd || null,
          off_days: offDays,
        });

      if (error) throw error;

      setBusinessHours(hours);
      toast.success('Business hours updated successfully');
    } catch (error) {
      console.error('Error updating business hours:', error);
      toast.error('Failed to update business hours');
      throw error;
    }
  };

  const updateOffDays = async (days: string[]) => {
    try {
      const { error } = await supabase
        .from('business_settings')
        .upsert({
          id: '1',
          business_hours_start: businessHours.start,
          business_hours_end: businessHours.end,
          break_start: businessHours.breakStart || null,
          break_end: businessHours.breakEnd || null,
          off_days: days,
        });

      if (error) throw error;

      setOffDays(days);
      toast.success('Off days updated successfully');
    } catch (error) {
      console.error('Error updating off days:', error);
      toast.error('Failed to update off days');
      throw error;
    }
  };

  return (
    <AppointmentContext.Provider value={{
      appointments,
      businessHours,
      offDays,
      isLoading,
      addAppointment,
      updateAppointment,
      deleteAppointment,
      getAvailableSlots,
      updateBusinessHours,
      updateOffDays,
      loadAppointments,
    }}>
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointments = () => {
  const context = useContext(AppointmentContext);
  if (context === undefined) {
    throw new Error('useAppointments must be used within an AppointmentProvider');
  }
  return context;
};