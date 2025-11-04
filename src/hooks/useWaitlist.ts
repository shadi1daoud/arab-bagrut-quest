import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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
      const { error } = await supabase
        .from('waitlist')
        .insert({
          name: data.name.trim(),
          email: data.email.trim().toLowerCase(),
          user_type: data.userType,
          school: data.school?.trim() || null
        });

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
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
