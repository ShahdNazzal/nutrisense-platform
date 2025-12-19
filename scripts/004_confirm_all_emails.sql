-- Force confirm all user emails to bypass email verification
-- This allows users to sign in immediately without email verification

-- Update all users to have their email confirmed
UPDATE auth.users
SET email_confirmed_at = NOW()
WHERE email_confirmed_at IS NULL;

-- Also ensure they are not waiting for confirmation
UPDATE auth.users
SET confirmation_sent_at = NOW(),
    confirmed_at = NOW()
WHERE confirmed_at IS NULL;
