-- Create enum types for user roles and status
CREATE TYPE user_role AS ENUM ('patient', 'doctor', 'admin');
CREATE TYPE user_type AS ENUM ('general', 'pregnant', 'athlete');
CREATE TYPE appointment_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled');
CREATE TYPE message_status AS ENUM ('unread', 'read');

-- Create profiles table that references auth.users
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  phone TEXT,
  date_of_birth DATE,
  gender TEXT,
  role user_role DEFAULT 'patient',
  user_type user_type DEFAULT 'general',
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create health_metrics table
CREATE TABLE IF NOT EXISTS public.health_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  weight DECIMAL(5,2),
  height DECIMAL(5,2),
  bmi DECIMAL(4,2),
  blood_pressure_systolic INTEGER,
  blood_pressure_diastolic INTEGER,
  heart_rate INTEGER,
  blood_sugar DECIMAL(5,2),
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create pregnancy_data table for pregnant users
CREATE TABLE IF NOT EXISTS public.pregnancy_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  due_date DATE NOT NULL,
  current_week INTEGER,
  trimester INTEGER,
  pregnancy_weight_gain DECIMAL(5,2),
  last_checkup_date DATE,
  complications TEXT,
  dietary_restrictions TEXT,
  prenatal_vitamins TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Create athlete_data table for athletes
CREATE TABLE IF NOT EXISTS public.athlete_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  sport TEXT,
  training_level TEXT,
  training_frequency INTEGER,
  performance_goals TEXT,
  body_fat_percentage DECIMAL(4,2),
  muscle_mass DECIMAL(5,2),
  vo2_max DECIMAL(5,2),
  resting_heart_rate INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Create meal_plans table
CREATE TABLE IF NOT EXISTS public.meal_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  start_date DATE NOT NULL,
  end_date DATE,
  daily_calories INTEGER,
  daily_protein DECIMAL(6,2),
  daily_carbs DECIMAL(6,2),
  daily_fats DECIMAL(6,2),
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create meals table
CREATE TABLE IF NOT EXISTS public.meals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  meal_plan_id UUID NOT NULL REFERENCES public.meal_plans(id) ON DELETE CASCADE,
  meal_type TEXT NOT NULL,
  meal_date DATE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  calories INTEGER,
  protein DECIMAL(6,2),
  carbs DECIMAL(6,2),
  fats DECIMAL(6,2),
  ingredients TEXT,
  instructions TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create food_log table
CREATE TABLE IF NOT EXISTS public.food_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  meal_type TEXT NOT NULL,
  food_name TEXT NOT NULL,
  quantity TEXT,
  calories INTEGER,
  protein DECIMAL(6,2),
  carbs DECIMAL(6,2),
  fats DECIMAL(6,2),
  consumed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create appointments table
CREATE TABLE IF NOT EXISTS public.appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  doctor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  appointment_date TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_minutes INTEGER DEFAULT 30,
  appointment_type TEXT NOT NULL,
  status appointment_status DEFAULT 'pending',
  notes TEXT,
  patient_notes TEXT,
  doctor_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create messages table for doctor-patient communication
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  receiver_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  subject TEXT,
  message TEXT NOT NULL,
  status message_status DEFAULT 'unread',
  parent_message_id UUID REFERENCES public.messages(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  read_at TIMESTAMP WITH TIME ZONE
);

-- Create nutritional_analysis table
CREATE TABLE IF NOT EXISTS public.nutritional_analysis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  analysis_date DATE NOT NULL,
  total_calories INTEGER,
  total_protein DECIMAL(6,2),
  total_carbs DECIMAL(6,2),
  total_fats DECIMAL(6,2),
  water_intake DECIMAL(5,2),
  vitamin_status JSONB,
  recommendations TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create doctors table for additional doctor information
CREATE TABLE IF NOT EXISTS public.doctors (
  id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  specialization TEXT NOT NULL,
  license_number TEXT,
  years_of_experience INTEGER,
  bio TEXT,
  consultation_fee DECIMAL(10,2),
  available_days TEXT[],
  available_hours TEXT,
  rating DECIMAL(3,2) DEFAULT 0.0,
  total_reviews INTEGER DEFAULT 0,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pregnancy_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.athlete_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meal_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.food_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nutritional_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles table
CREATE POLICY "Users can view their own profile" 
  ON public.profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
  ON public.profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view doctors profiles" 
  ON public.profiles FOR SELECT 
  USING (role = 'doctor');

-- RLS Policies for health_metrics
CREATE POLICY "Users can view their own health metrics" 
  ON public.health_metrics FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own health metrics" 
  ON public.health_metrics FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own health metrics" 
  ON public.health_metrics FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own health metrics" 
  ON public.health_metrics FOR DELETE 
  USING (auth.uid() = user_id);

-- RLS Policies for pregnancy_data
CREATE POLICY "Users can view their own pregnancy data" 
  ON public.pregnancy_data FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own pregnancy data" 
  ON public.pregnancy_data FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own pregnancy data" 
  ON public.pregnancy_data FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Doctors can view patient pregnancy data" 
  ON public.pregnancy_data FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'doctor'
    )
  );

-- RLS Policies for athlete_data
CREATE POLICY "Users can view their own athlete data" 
  ON public.athlete_data FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own athlete data" 
  ON public.athlete_data FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own athlete data" 
  ON public.athlete_data FOR UPDATE 
  USING (auth.uid() = user_id);

-- RLS Policies for meal_plans
CREATE POLICY "Users can view their own meal plans" 
  ON public.meal_plans FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own meal plans" 
  ON public.meal_plans FOR INSERT 
  WITH CHECK (auth.uid() = user_id OR auth.uid() = created_by);

CREATE POLICY "Doctors can insert meal plans for patients" 
  ON public.meal_plans FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'doctor'
    )
  );

-- RLS Policies for meals
CREATE POLICY "Users can view meals in their meal plans" 
  ON public.meals FOR SELECT 
  USING (
    meal_plan_id IN (
      SELECT id FROM public.meal_plans WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert meals in their meal plans" 
  ON public.meals FOR INSERT 
  WITH CHECK (
    meal_plan_id IN (
      SELECT id FROM public.meal_plans WHERE user_id = auth.uid() OR created_by = auth.uid()
    )
  );

-- RLS Policies for food_log
CREATE POLICY "Users can view their own food log" 
  ON public.food_log FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own food log" 
  ON public.food_log FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own food log" 
  ON public.food_log FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own food log" 
  ON public.food_log FOR DELETE 
  USING (auth.uid() = user_id);

-- RLS Policies for appointments
CREATE POLICY "Users can view their own appointments" 
  ON public.appointments FOR SELECT 
  USING (auth.uid() = patient_id OR auth.uid() = doctor_id);

CREATE POLICY "Patients can insert their own appointments" 
  ON public.appointments FOR INSERT 
  WITH CHECK (auth.uid() = patient_id);

CREATE POLICY "Users can update their own appointments" 
  ON public.appointments FOR UPDATE 
  USING (auth.uid() = patient_id OR auth.uid() = doctor_id);

-- RLS Policies for messages
CREATE POLICY "Users can view their own messages" 
  ON public.messages FOR SELECT 
  USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

CREATE POLICY "Users can send messages" 
  ON public.messages FOR INSERT 
  WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Users can update their received messages" 
  ON public.messages FOR UPDATE 
  USING (auth.uid() = receiver_id);

-- RLS Policies for nutritional_analysis
CREATE POLICY "Users can view their own nutritional analysis" 
  ON public.nutritional_analysis FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own nutritional analysis" 
  ON public.nutritional_analysis FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for doctors
CREATE POLICY "Everyone can view doctors" 
  ON public.doctors FOR SELECT 
  USING (TRUE);

CREATE POLICY "Doctors can update their own profile" 
  ON public.doctors FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Doctors can insert their own profile" 
  ON public.doctors FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Create indexes for better query performance
CREATE INDEX idx_health_metrics_user_id ON public.health_metrics(user_id);
CREATE INDEX idx_health_metrics_recorded_at ON public.health_metrics(recorded_at);
CREATE INDEX idx_pregnancy_data_user_id ON public.pregnancy_data(user_id);
CREATE INDEX idx_athlete_data_user_id ON public.athlete_data(user_id);
CREATE INDEX idx_meal_plans_user_id ON public.meal_plans(user_id);
CREATE INDEX idx_meals_meal_plan_id ON public.meals(meal_plan_id);
CREATE INDEX idx_food_log_user_id ON public.food_log(user_id);
CREATE INDEX idx_food_log_consumed_at ON public.food_log(consumed_at);
CREATE INDEX idx_appointments_patient_id ON public.appointments(patient_id);
CREATE INDEX idx_appointments_doctor_id ON public.appointments(doctor_id);
CREATE INDEX idx_appointments_date ON public.appointments(appointment_date);
CREATE INDEX idx_messages_sender_id ON public.messages(sender_id);
CREATE INDEX idx_messages_receiver_id ON public.messages(receiver_id);
CREATE INDEX idx_nutritional_analysis_user_id ON public.nutritional_analysis(user_id);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at columns
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pregnancy_data_updated_at BEFORE UPDATE ON public.pregnancy_data
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_athlete_data_updated_at BEFORE UPDATE ON public.athlete_data
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_meal_plans_updated_at BEFORE UPDATE ON public.meal_plans
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON public.appointments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
