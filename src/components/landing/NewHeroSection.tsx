import { motion } from 'framer-motion';
import { Gamepad2, Zap, Trophy, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface NewHeroSectionProps {
  onJoinWaitlist: () => void;
}

export const NewHeroSection = ({ onJoinWaitlist }: NewHeroSectionProps) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-32">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-cyan-900/20 to-blue-900/20" />
      
      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      {/* Floating XP particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 360],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        >
          +{10 + i * 5} XP
        </motion.div>
      ))}

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 backdrop-blur-sm mb-8"
          >
            <Gamepad2 className="w-5 h-5 text-cyan-400" />
            <span className="text-sm font-outfit text-purple-300">
              {isArabic ? 'الجيل الجديد من التعليم' : 'Next-Gen Education'}
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-changa font-bold mb-6 leading-tight"
          >
            <span className="block bg-gradient-to-r from-purple-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent animate-pulse">
              {isArabic ? 'مش منصة تعليمية...' : "Not a learning platform..."}
            </span>
            <span className="block text-white mt-2">
              {isArabic ? 'لعبة بتخليك تدرس وتفوز 🎮' : 'A game that makes you study and win 🎮'}
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 font-lexend max-w-3xl mx-auto"
          >
            {isArabic 
              ? 'حول الدراسة من وجع رأس لتجربة ممتعة فيها XP، تحديات، وإنجازات 🔥'
              : 'Turn studying from a headache into a fun experience with XP, challenges, and achievements 🔥'
            }
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col items-center gap-4"
          >
            <Button
              onClick={onJoinWaitlist}
              size="lg"
              className="relative px-12 py-8 text-xl font-changa font-bold bg-gradient-to-r from-purple-600 via-cyan-600 to-blue-600 hover:from-purple-500 hover:via-cyan-500 hover:to-blue-500 rounded-2xl shadow-2xl shadow-purple-500/50 border-2 border-purple-400/50 transition-all duration-300 hover:scale-105 overflow-hidden group"
            >
              <span className="relative z-10 flex items-center gap-3">
                <Zap className="w-6 h-6" />
                {isArabic ? 'ابدأ مغامرتك التعليمية الآن' : 'Start Your Learning Adventure Now'}
                <TrendingUp className="w-6 h-6" />
              </span>
              
              {/* Animated glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </Button>

            <p className="text-gray-400 text-sm font-lexend">
              {isArabic ? 'أول 7 أيام مجانًا — بدون بطاقة اعتماد' : 'First 7 days free — no credit card required'}
            </p>
          </motion.div>

          {/* Animated dashboard preview */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-20 relative"
          >
            <div className="relative rounded-3xl overflow-hidden border-2 border-purple-500/30 shadow-2xl shadow-purple-500/20 backdrop-blur-sm bg-gradient-to-br from-purple-900/20 to-cyan-900/20 p-8">
              {/* Glowing avatar */}
              <motion.div
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: [0, 360],
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                  type: "tween"
                }}
                className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 p-1 shadow-lg shadow-purple-500/50"
              >
                <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center text-5xl">
                  🎓
                </div>
              </motion.div>

              {/* Floating badges */}
              <div className="flex justify-center gap-4 flex-wrap">
                {[
                  { icon: <Trophy className="w-6 h-6" />, label: isArabic ? 'مستوى 12' : 'Level 12', color: 'from-yellow-500 to-orange-500' },
                  { icon: <Zap className="w-6 h-6" />, label: '+850 XP', color: 'from-cyan-500 to-blue-500' },
                  { icon: '🔥', label: isArabic ? '15 يوم' : '15 days', color: 'from-red-500 to-orange-500' },
                ].map((badge, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      duration: 0.5,
                      delay: 1 + i * 0.2,
                      type: "spring"
                    }}
                    className={`px-6 py-3 rounded-2xl bg-gradient-to-r ${badge.color} text-white font-bold flex items-center gap-2 shadow-lg`}
                  >
                    {typeof badge.icon === 'string' ? (
                      <span className="text-2xl">{badge.icon}</span>
                    ) : badge.icon}
                    <span className="font-outfit">{badge.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
