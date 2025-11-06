import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { landingContent } from '@/lib/landing-content';
import { XCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const ProblemSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { language } = useLanguage();
  const { problem } = landingContent;

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      {/* Dark Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] to-[#1A0A00]">
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Title */}
          <motion.h2
            className={`text-4xl md:text-6xl font-['Changa'] font-bold mb-16 ${language === 'ar' ? 'font-[\'Noto_Sans_Arabic\']' : ''}`}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className="text-white/40 line-through">{problem.headline[language]}</span>
          </motion.h2>

          {/* Problem Points - Grayscale/Boring */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {problem.points.map((point, i) => (
              <motion.div
                key={i}
                className="relative p-8 rounded-2xl bg-white/5 border border-white/10"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
              >
                <XCircle className="w-12 h-12 mx-auto mb-4 text-white/20" />
                <p className={`text-xl font-bold text-white/40 ${language === 'ar' ? 'font-[\'Noto_Sans_Arabic\']' : ''}`}>{point[language]}</p>
              </motion.div>
            ))}
          </div>

          {/* Transition Effect */}
          <motion.div
            className="relative h-32 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <motion.div
              className="w-24 h-24 rounded-full border-4 border-[#FF4800]/30"
              animate={isInView ? {
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3],
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute text-6xl"
              animate={isInView ? {
                rotate: [0, 360],
              } : {}}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              ⚡
            </motion.div>
          </motion.div>

          {/* Transition Text */}
          <motion.p
            className={`text-2xl md:text-3xl font-['Changa'] font-bold text-[#FF4800] mb-8 ${language === 'ar' ? 'font-[\'Noto_Sans_Arabic\']' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1, duration: 0.8 }}
          >
            {problem.transition[language]}
          </motion.p>
        </motion.div>
      </div>

      {/* Gradient Transition to Next Section */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-b from-transparent to-[#0A0A0A]"></div>
    </section>
  );
};
