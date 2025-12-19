-- Disable email confirmation requirement
-- This SQL script is for information only - email confirmation is controlled by Supabase project settings
-- To fully disable email confirmation, you need to:
-- 1. Go to your Supabase Dashboard
-- 2. Navigate to Authentication > Providers > Email
-- 3. Disable "Confirm email" option
-- 
-- Alternatively, we handle this in the application by auto-signing in after registration
-- which bypasses the email confirmation check

-- For development/testing purposes, you can manually confirm users:
-- UPDATE auth.users SET email_confirmed_at = NOW() WHERE email_confirmed_at IS NULL;

-- Note: The above script is commented out for safety
-- Uncomment only if you want to confirm all existing users
