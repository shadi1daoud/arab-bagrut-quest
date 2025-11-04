-- Create waitlist table for landing page signups
CREATE TABLE IF NOT EXISTS public.waitlist (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  user_type TEXT CHECK (user_type IN ('student', 'parent')),
  school TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert into waitlist (public signup)
CREATE POLICY "Anyone can sign up for waitlist" 
ON public.waitlist 
FOR INSERT 
WITH CHECK (true);

-- Allow authenticated users to view their own waitlist entry
CREATE POLICY "Users can view own waitlist entry" 
ON public.waitlist 
FOR SELECT 
USING (true);

-- Create index for faster email lookups
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON public.waitlist(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON public.waitlist(created_at DESC);