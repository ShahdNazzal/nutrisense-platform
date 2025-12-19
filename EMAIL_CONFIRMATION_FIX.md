# Fix "Email not confirmed" Error

If you're getting the "Email not confirmed" error, here are the solutions:

## Solution 1: Run the SQL Script (Recommended)

I've created a script that automatically confirms all user emails:

1. The script `scripts/004_confirm_all_emails.sql` will run automatically on next deployment
2. Or you can run it manually using the Supabase SQL Editor

## Solution 2: Disable Email Confirmation in Supabase (Permanent Fix)

To permanently disable email confirmation for new users:

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Go to **Authentication** → **Providers** → **Email**
4. Under "Email Settings", toggle **OFF** the option "Confirm email"
5. Click **Save**

After this, all new signups will be able to login immediately without email verification.

## Solution 3: Manual Database Fix

If you prefer to fix it manually in the Supabase SQL Editor:

```sql
UPDATE auth.users
SET email_confirmed_at = NOW(),
    confirmed_at = NOW()
WHERE email = 'your-email@example.com';
```

Replace `your-email@example.com` with your actual email address.

## Why This Happens

By default, Supabase requires email confirmation for security. However, for development or internal applications, you may want to disable this feature.
