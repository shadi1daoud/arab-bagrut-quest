import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Rocket, Clock, Sparkles, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { useWaitlist } from '@/hooks/useWaitlist';
import { useToast } from '@/hooks/use-toast';
import confetti from 'canvas-confetti';

interface FinalCallToActionProps {
  onSubmit?: () => void;
}

export const FinalCallToAction = ({ onSubmit }: FinalCallToActionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const { submitToWaitlist, isSubmitting } = useWaitlist();
  const { toast } = useToast();
  
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !name) {
      toast({
        title: isArabic ? 'خطأ' : 'Error',
        description: isArabic ? 'الرجاء ملء جميع الحقول' : 'Please fill all fields',
        variant: 'destructive'
      });
      return;
    }

    try {
      await submitToWaitlist({
        email,
        name,
        userType: 'student'
      });

      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      setSubmitted(true);
      onSubmit?.();
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      {/* Gradient background with animation */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-pink-900/20 to-cyan-900/30" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Progress bar animation */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 2, ease: "easeOut" }}
            className="h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-full mb-16 origin-left shadow-lg shadow-purple-500/50"
          />

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="inline-block mb-4"
            >
              <Rocket className="w-16 h-16 text-cyan-400 mx-auto" />
            </motion.div>

            <h2 className="text-5xl md:text-7xl font-changa font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                {isArabic ? 'ابدأ اليوم...' : 'Start Today...'}
              </span>
            </h2>
            <p className="text-3xl md:text-4xl font-changa font-bold text-white mb-4">
              {isArabic ? 'وادخل عالم الدراسة الممتع' : 'And enter the fun world of studying'}
              <span className="ml-2">🎮</span>
            </p>

            {/* Urgency message */}
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="flex items-center justify-center gap-2 mt-6"
            >
              <Clock className="w-5 h-5 text-orange-400" />
              <p className="text-orange-400 font-lexend font-semibold">
                {isArabic ? 'العرض المجاني لفترة محدودة فقط' : 'Free offer for a limited time only'}
                <span className="ml-2">⏳</span>
              </p>
            </motion.div>
          </motion.div>

          {/* Form or success message */}
          {!submitted ? (
            <motion.form
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              onSubmit={handleSubmit}
              className="max-w-2xl mx-auto"
            >
              <div className="p-8 rounded-3xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-2 border-purple-500/30 backdrop-blur-sm shadow-2xl shadow-purple-500/20">
                <div className="space-y-4 mb-6">
                  <Input
                    type="text"
                    placeholder={isArabic ? 'اسمك' : 'Your Name'}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-14 text-lg bg-gray-900/50 border-gray-700 focus:border-purple-500 text-white placeholder:text-gray-500"
                    dir={isArabic ? 'rtl' : 'ltr'}
                  />
                  <Input
                    type="email"
                    placeholder={isArabic ? 'بريدك الإلكتروني' : 'Your Email'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-14 text-lg bg-gray-900/50 border-gray-700 focus:border-purple-500 text-white placeholder:text-gray-500"
                    dir={isArabic ? 'rtl' : 'ltr'}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  size="lg"
                  className="w-full h-16 text-xl font-changa font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 hover:from-purple-500 hover:via-pink-500 hover:to-cyan-500 rounded-2xl shadow-2xl shadow-purple-500/50 border-2 border-purple-400/50 transition-all duration-300 hover:scale-105 group"
                >
                  <span className="flex items-center gap-3">
                    <Sparkles className="w-6 h-6" />
                    {isArabic ? 'ابدأ الآن – أول أسبوع مجانًا' : 'Start Now – First Week Free'}
                    <TrendingUp className="w-6 h-6" />
                  </span>
                </Button>

                <p className="text-center text-gray-400 text-sm mt-4 font-lexend">
                  {isArabic ? 'بدون بطاقة ائتمان • إلغاء في أي وقت' : 'No credit card • Cancel anytime'}
                </p>
              </div>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="inline-block p-8 rounded-3xl bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-2 border-green-500/50 backdrop-blur-sm">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 360]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                  className="text-7xl mb-4"
                >
                  🎉
                </motion.div>
                <h3 className="text-3xl font-changa font-bold text-white mb-2">
                  {isArabic ? 'مبروك!' : 'Congratulations!'}
                </h3>
                <p className="text-xl text-green-300 font-lexend">
                  {isArabic 
                    ? 'أنت الآن في قائمة الانتظار! سنتواصل معك قريبًا 🚀'
                    : 'You\'re now on the waitlist! We\'ll contact you soon 🚀'
                  }
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
