-- Add salary and currency columns to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS monthly_salary NUMERIC(12,2) DEFAULT 0;

ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS currency TEXT DEFAULT 'INR';

-- Update existing profiles to have default values
UPDATE public.profiles 
SET monthly_salary = COALESCE(monthly_salary, 0), 
    currency = COALESCE(currency, 'INR') 
WHERE monthly_salary IS NULL OR currency IS NULL;
