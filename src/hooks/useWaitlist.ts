import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;

interface WaitlistData {
  name: string;
  email: string;
  userType: 'student' | 'parent';
  school?: string;
}

export const useWaitlist = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const submitToWaitlist = async (data: WaitlistData) => {
    setIsSubmitting(true);
    try {
      // If env variables are missing, gracefully fallback to local storage
      if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
        console.warn('Supabase env missing; using local fallback for waitlist.');
        const key = 'waitlist_fallback';
        const existing = JSON.parse(localStorage.getItem(key) || '[]');
        existing.push({ ...data, created_at: new Date().toISOString() });
        localStorage.setItem(key, JSON.stringify(existing));

        toast({
          title: "🎉 Welcome to Darsni! / مرحباً بك في درسني!",
          description: "We'll notify you when we launch. / سنخبرك عند الإطلاق.",
        });
        return true;
      }

      const { supabase } = await import('@/lib/supabaseClient');

      const { error } = await supabase
        .from('waitlist')
        .insert({
          name: data.name.trim(),
          email: data.email.trim().toLowerCase(),
          user_type: data.userType,
          school: data.school?.trim() || null
        });

      if (error) {
        if ((error as any).code === '23505') { // Unique constraint violation
          toast({
            title: "Already registered! / مسجل مسبقاً!",
            description: "This email is already on the waitlist. / هذا البريد الإلكتروني مسجل في القائمة.",
            variant: "default"
          });
          return false;
        }
        throw error;
      }

      toast({
        title: "🎉 Welcome to Darsni! / مرحباً بك في درسني!",
        description: "We'll notify you when we launch. / سنخبرك عند الإطلاق.",
      });
      
      return true;
    } catch (error) {
      console.error('Waitlist submission error:', error);
      toast({
        title: "Something went wrong / حدث خطأ ما",
        description: "Please try again later. / يرجى المحاولة لاحقاً.",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitToWaitlist, isSubmitting };
};
