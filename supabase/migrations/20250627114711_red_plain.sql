/*
  # Create business settings table

  1. New Tables
    - `business_settings`
      - `id` (uuid, primary key)
      - `business_hours_start` (text)
      - `business_hours_end` (text)
      - `break_start` (text, nullable)
      - `break_end` (text, nullable)
      - `off_days` (text array)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `business_settings` table
    - Add policies for public read access and authenticated write access
*/

CREATE TABLE IF NOT EXISTS business_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_hours_start text NOT NULL DEFAULT '09:00',
  business_hours_end text NOT NULL DEFAULT '17:00',
  break_start text,
  break_end text,
  off_days text[] DEFAULT ARRAY['0', '6'],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE business_settings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view business settings"
  ON business_settings
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can insert business settings"
  ON business_settings
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can update business settings"
  ON business_settings
  FOR UPDATE
  TO anon, authenticated
  USING (true);

-- Create trigger to update updated_at timestamp
CREATE TRIGGER update_business_settings_updated_at
  BEFORE UPDATE ON business_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert default business settings
INSERT INTO business_settings (id, business_hours_start, business_hours_end, break_start, break_end, off_days)
VALUES ('1', '09:00', '17:00', '12:00', '13:00', ARRAY['0', '6'])
ON CONFLICT (id) DO NOTHING;