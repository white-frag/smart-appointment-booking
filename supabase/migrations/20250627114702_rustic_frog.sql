/*
  # Create appointments table

  1. New Tables
    - `appointments`
      - `id` (uuid, primary key)
      - `customer_name` (text)
      - `customer_email` (text)
      - `customer_phone` (text)
      - `appointment_date` (date)
      - `appointment_time` (text)
      - `service` (text)
      - `message` (text, nullable)
      - `status` (text, enum: pending, confirmed, cancelled)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `appointments` table
    - Add policies for public access (since this is a booking system)
*/

CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  appointment_date date NOT NULL,
  appointment_time text NOT NULL,
  service text NOT NULL,
  message text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (booking system needs to be accessible)
CREATE POLICY "Anyone can insert appointments"
  ON appointments
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can view appointments"
  ON appointments
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can update appointments"
  ON appointments
  FOR UPDATE
  TO anon, authenticated
  USING (true);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_appointments_date_time 
  ON appointments(appointment_date, appointment_time);

CREATE INDEX IF NOT EXISTS idx_appointments_status 
  ON appointments(status);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_appointments_updated_at
  BEFORE UPDATE ON appointments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();