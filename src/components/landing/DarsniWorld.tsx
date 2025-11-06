import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { landingContent } from '@/lib/landing-content';
import confetti from 'canvas-confetti';
import { useLanguage } from '@/contexts/LanguageContext';

export const DarsniWorld = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { language } = useLanguage();
  const { darsniWorld } = landingContent;

  const triggerLevelUp = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF4800', '#FFD700', '#FF6B35']
    });
  };

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      {/* Vibrant Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A0A00] via-[#0A0A0A] to-[#1A0500]">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,72,0,0.1),transparent_50%)]"></div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-['Changa'] font-bold mb-4">
            <span className="text-white">{darsniWorld.headline.en}</span>
            <span className="block text-[#FF4800] mt-2 font-['Noto_Sans_Arabic']">
              {darsniWorld.headline.ar}
            </span>
          </h2>
        </motion.div>

        {/* Main Dashboard Showcase */}
        <motion.div
          className="max-w-5xl mx-auto mb-20"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="relative glass-card p-8 md:p-12 rounded-3xl border-2 border-[#FF4800]/30">
            {/* Glowing Background Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF4800]/20 via-transparent to-[#FFD700]/10 rounded-3xl"></div>
            
            <div className="relative">
              {/* XP Progress Bar */}
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-white/60 text-sm font-['Share_Tech_Mono']">Level 8</span>
                  <span className="text-[#FF4800] text-sm font-bold font-['Share_Tech_Mono']">7,500 / 10,000 XP</span>
                </div>
                <div className="h-6 bg-white/10 rounded-full overflow-hidden border border-[#FF4800]/30">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#FF4800] to-[#FFD700] relative overflow-hidden"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: '75%' } : {}}
                    transition={{ delay: 0.8, duration: 1.5, ease: 'easeOut' }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{ x: ['-200%', '200%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    />
                  </motion.div>
                </div>
              </motion.div>

              {/* Level Up Button Demo */}
              <motion.div
                className="text-center mb-8"
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1.2, duration: 0.6, type: 'spring' }}
              >
                <button
                  onClick={triggerLevelUp}
                  className="px-6 py-3 bg-gradient-to-r from-[#FF4800] to-[#FFD700] rounded-xl font-bold text-white hover:scale-105 transition-transform pulse-glow"
                >
                  🎉 Level Up!
                </button>
              </motion.div>

              {/* Glowing Badges */}
              <div className="flex justify-center gap-4 mb-8">
                {['🏆', '⭐', '🔥', '💎', '👑'].map((emoji, i) => (
                  <motion.div
                    key={i}
                    className="w-16 h-16 rounded-full glass-card border-2 border-[#FF4800]/30 flex items-center justify-center text-2xl badge-pop"
                    initial={{ opacity: 0, scale: 0, rotate: -180 }}
                    animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                    transition={{ delay: 1.5 + i * 0.1, duration: 0.6, type: 'spring' }}
                    style={{ animationDelay: `${1.5 + i * 0.1}s` }}
                  >
                    {emoji}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {darsniWorld.features.map((feature, i) => (
            <motion.div
              key={i}
              className="glass-card p-8 rounded-2xl border border-[#FF4800]/20 hover:border-[#FF4800]/50 transition-all hover-scale group"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 + i * 0.2, duration: 0.6 }}
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 font-['Changa']">
                {feature.title.en}
              </h3>
              <p className="text-white/60 mb-2">
                {feature.description.en}
              </p>
              <p className="text-white/50 text-sm font-['Noto_Sans_Arabic']">
                {feature.title.ar}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
