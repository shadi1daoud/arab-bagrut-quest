import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { landingContent } from '@/lib/landing-content';
import { Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const HeroSection = ({ onJoinWaitlist }: { onJoinWaitlist: () => void }) => {
  const { language } = useLanguage();
  const { hero } = landingContent;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#1A0A00] to-[#0A0A0A]">
        <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0yOS41IDMwaC0xdjFoMXYtMXptMCAtMS45NWgtMXYxaDF2LTF6bS0xIDUuOTVoMXYxaC0xdi0xeiIgZmlsbD0iI0ZGNDgwMCIgZmlsbC1vcGFjaXR5PSIwLjEiPjwvcGF0aD48L2c+PC9zdmc+')]"></div>
      </div>

      {/* Floating XP Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-6 h-6 rounded-full bg-gradient-to-br from-[#FF4800] to-[#FFD700]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -100],
              x: [0, Math.random() * 50 - 25],
              opacity: [0, 1, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          >
            <div className="w-full h-full flex items-center justify-center text-white text-xs font-bold">
              XP
            </div>
          </motion.div>
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Icon Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF4800]/10 border border-[#FF4800]/30 mb-8"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-4 h-4 text-[#FF4800]" />
            <span className="text-[#FF4800] text-sm font-['Share_Tech_Mono']">
              The Game of Learning Begins
            </span>
          </motion.div>

          {/* Main Headline */}
          <h1 className={`text-5xl md:text-7xl lg:text-8xl font-['Changa'] font-bold mb-6 ${language === 'ar' ? 'font-[\'Noto_Sans_Arabic\']' : ''}`}>
            <motion.span
              className="block text-shimmer"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              {hero.headline[language]}
            </motion.span>
          </h1>

          {/* Subheadline */}
          <motion.p
            className={`text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-12 ${language === 'ar' ? 'font-[\'Noto_Sans_Arabic\']' : ''}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {hero.subheadline[language]}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <Button
              size="lg"
              onClick={onJoinWaitlist}
              className={`btn-hover-glow glow-pulse text-lg px-8 py-6 rounded-2xl ${language === 'ar' ? 'font-[\'Noto_Sans_Arabic\']' : ''}`}
            >
              {hero.ctaPrimary[language]}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className={`text-lg px-8 py-6 rounded-2xl ${language === 'ar' ? 'font-[\'Noto_Sans_Arabic\']' : ''}`}
            >
              {hero.ctaSecondary[language]}
            </Button>
          </motion.div>
        </motion.div>

        {/* Animated Dashboard Preview */}
        <motion.div
          className="mt-20 relative"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <div className="relative glass-card p-8 rounded-3xl border-2 border-[#FF4800]/30 max-w-4xl mx-auto overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF4800]/10 to-transparent"></div>
            <div className="relative">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF4800] to-[#FFD700] flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#FF4800] to-[#FFD700]"
                      initial={{ width: 0 }}
                      animate={{ width: '75%' }}
                      transition={{ delay: 1.5, duration: 1.5, ease: 'easeOut' }}
                    />
                  </div>
                  <p className="text-xs text-white/60 mt-1 font-['Share_Tech_Mono']">Level 8 • 7,500 XP</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: '🔥', label: '12 Day Streak', value: 'FIRE!' },
                  { icon: '⭐', label: 'Total XP', value: '7.5K' },
                  { icon: '🏆', label: 'Rank', value: '#23' },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    className="glass-card p-4 rounded-xl text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5 + i * 0.1, duration: 0.5 }}
                  >
                    <div className="text-2xl mb-2">{stat.icon}</div>
                    <div className="text-xl font-bold text-[#FF4800] font-['Share_Tech_Mono']">{stat.value}</div>
                    <div className="text-xs text-white/60">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
