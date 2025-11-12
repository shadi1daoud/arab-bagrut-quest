import { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import confetti from 'canvas-confetti';
import { useWaitlist } from '@/hooks/useWaitlist';
import { z } from 'zod';
import { Rocket, Clock, Sparkles, TrendingUp } from 'lucide-react';

const waitlistSchema = z.object({
  name: z.string().trim().min(2, 'الاسم يجب أن يكون حرفين على الأقل').max(100, 'الاسم طويل جداً'),
  email: z.string().email('البريد الإلكتروني غير صحيح').max(255, 'البريد الإلكتروني طويل جداً'),
});

interface FinalCallToActionProps {
  onSubmit?: () => void;
}

export const FinalCallToAction = ({ onSubmit }: FinalCallToActionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const { submitToWaitlist, isSubmitting } = useWaitlist();
  
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    const validation = waitlistSchema.safeParse({ name, email });
    if (!validation.success) {
      const fieldErrors: { name?: string; email?: string } = {};
      validation.error.errors.forEach((err) => {
        if (err.path[0] === 'name') fieldErrors.name = err.message;
        if (err.path[0] === 'email') fieldErrors.email = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    const success = await submitToWaitlist({
      name,
      email,
      userType: 'student'
    });

    if (success) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      setSubmitted(true);
      onSubmit?.();
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
                ابدأ اليوم...
              </span>
            </h2>
            <p className="text-3xl md:text-4xl font-changa font-bold text-white mb-4">
              وادخل عالم الدراسة الممتع
              <span className="ml-2">🎮</span>
            </p>

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
                العرض المجاني لفترة محدودة فقط
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
                  <div>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="اسمك الكامل"
                      disabled={submitted}
                      className="w-full h-14 px-4 text-lg rounded-xl bg-gray-900/50 border border-gray-700 focus:border-purple-500 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all disabled:opacity-50"
                    />
                    {errors.name && (
                      <p className="mt-2 text-sm text-red-400">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="بريدك الإلكتروني"
                      disabled={submitted}
                      className="w-full h-14 px-4 text-lg rounded-xl bg-gray-900/50 border border-gray-700 focus:border-purple-500 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all disabled:opacity-50"
                    />
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-400">{errors.email}</p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-16 text-xl font-changa font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 hover:from-purple-500 hover:via-pink-500 hover:to-cyan-500 rounded-2xl shadow-2xl shadow-purple-500/50 border-2 border-purple-400/50 transition-all duration-300 hover:scale-105 group disabled:opacity-50 disabled:cursor-not-allowed text-white flex items-center justify-center gap-3"
                >
                  <Sparkles className="w-6 h-6" />
                  ابدأ الآن – أول أسبوع مجانًا
                  <TrendingUp className="w-6 h-6" />
                </button>

                <p className="text-center text-gray-400 text-sm mt-4 font-lexend">
                  بدون بطاقة ائتمان • إلغاء في أي وقت
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
                  مبروك!
                </h3>
                <p className="text-xl text-green-300 font-lexend">
                  أنت الآن في قائمة الانتظار! سنتواصل معك قريبًا 🚀
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
