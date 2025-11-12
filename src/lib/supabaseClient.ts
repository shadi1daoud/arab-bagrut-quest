import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';

// Fallbacks are safe because the URL and anon key are public/publishable
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://yjouellpbzxtdstgbiuf.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlqb3VlbGxwYnp4dGRzdGdiaXVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzNTg3MTMsImV4cCI6MjA3NTkzNDcxM30.Q6vhanXGH4NVKQIYfXlkVpeKjbTMh3vq5duRFjiZC08';

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
