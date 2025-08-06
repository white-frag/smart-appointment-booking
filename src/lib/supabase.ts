import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

// Check if we have valid Supabase credentials
const hasValidCredentials = supabaseUrl !== 'https://placeholder.supabase.co' && supabaseAnonKey !== 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Export a flag to check if Supabase is properly configured
export const isSupabaseConfigured = hasValidCredentials;

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