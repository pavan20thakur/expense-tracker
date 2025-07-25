-- Add salary field to profiles table
ALTER TABLE public.profiles 
ADD COLUMN monthly_salary NUMERIC(12,2) DEFAULT 0;

-- Add currency preference to profiles table (default to INR for Indian Rupees)
ALTER TABLE public.profiles 
ADD COLUMN currency TEXT DEFAULT 'INR';

-- Update existing profiles to have default values
UPDATE public.profiles 
SET monthly_salary = 0, currency = 'INR' 
WHERE monthly_salary IS NULL OR currency IS NULL;
