import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      appointments: {
        Row: {
          id: string;
          customer_name: string;
          customer_email: string;
          customer_phone: string;
          appointment_date: string;
          appointment_time: string;
          service: string;
          message: string | null;
          status: 'pending' | 'confirmed' | 'cancelled';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          customer_name: string;
          customer_email: string;
          customer_phone: string;
          appointment_date: string;
          appointment_time: string;
          service: string;
          message?: string | null;
          status?: 'pending' | 'confirmed' | 'cancelled';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          customer_name?: string;
          customer_email?: string;
          customer_phone?: string;
          appointment_date?: string;
          appointment_time?: string;
          service?: string;
          message?: string | null;
          status?: 'pending' | 'confirmed' | 'cancelled';
          created_at?: string;
          updated_at?: string;
        };
      };
      business_settings: {
        Row: {
          id: string;
          business_hours_start: string;
          business_hours_end: string;
          break_start: string | null;
          break_end: string | null;
          off_days: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          business_hours_start: string;
          business_hours_end: string;
          break_start?: string | null;
          break_end?: string | null;
          off_days?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          business_hours_start?: string;
          business_hours_end?: string;
          break_start?: string | null;
          break_end?: string | null;
          off_days?: string[];
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};