-- Insert sample doctors (these would be real doctors in production)
-- Note: These are dummy UUIDs for seeding purposes

INSERT INTO public.doctors (id, specialization, license_number, years_of_experience, bio, consultation_fee, available_days, available_hours, rating, total_reviews, verified)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'Nutrition & Dietetics', 'ND12345', 10, 'Specialized in clinical nutrition with focus on metabolic health and weight management.', 150.00, ARRAY['Monday', 'Wednesday', 'Friday'], '09:00-17:00', 4.8, 245, TRUE),
  ('22222222-2222-2222-2222-222222222222', 'Maternal-Fetal Medicine', 'MFM67890', 15, 'Expert in high-risk pregnancy care and prenatal nutrition planning.', 200.00, ARRAY['Tuesday', 'Thursday'], '08:00-16:00', 4.9, 189, TRUE),
  ('33333333-3333-3333-3333-333333333333', 'Sports Medicine', 'SM24680', 8, 'Specialized in athlete nutrition, performance optimization, and injury recovery.', 175.00, ARRAY['Monday', 'Tuesday', 'Thursday', 'Friday'], '10:00-18:00', 4.7, 312, TRUE),
  ('44444444-4444-4444-4444-444444444444', 'Endocrinology', 'END13579', 12, 'Focus on diabetes management, thyroid disorders, and hormonal imbalances.', 180.00, ARRAY['Wednesday', 'Friday'], '09:00-17:00', 4.6, 167, TRUE)
ON CONFLICT (id) DO NOTHING;
