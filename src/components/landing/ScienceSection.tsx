import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { landingContent } from '@/lib/landing-content';
import { Brain, TrendingUp, Award } from 'lucide-react';

export const ScienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { science } = landingContent;

  const icons = [Brain, TrendingUp, Award];

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      {/* Clean Background for Credibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] to-[#0F0F0F]">
        <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0yOS41IDMwaC0xdjFoMXYtMXptMCAtMS45NWgtMXYxaDF2LTF6bS0xIDUuOTVoMXYxaC0xdi0xeiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIwLjAzIj48L3BhdGg+PC9nPjwvc3ZnPg==')]"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-['Changa'] font-bold mb-4">
            <span className="text-white">{science.headline.en}</span>
            <span className="block text-[#FF4800] mt-2 font-['Noto_Sans_Arabic']">
              {science.headline.ar}
            </span>
          </h2>
          <p className="text-white/60 text-lg mt-6">
            {science.subheadline.en}
          </p>
          <p className="text-white/50 font-['Noto_Sans_Arabic'] mt-2">
            {science.subheadline.ar}
          </p>
        </motion.div>

        {/* Process Flow */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            {science.steps.map((step, i) => {
              const Icon = icons[i];
              return (
                <div key={i} className="flex items-center gap-8">
                  <motion.div
                    className="flex-1"
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.2, duration: 0.6 }}
                  >
                    <div className="glass-card p-6 rounded-2xl border border-white/10 text-center hover-scale">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#FF4800]/20 to-[#FFD700]/10 flex items-center justify-center">
                        <Icon className="w-8 h-8 text-[#FF4800]" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2 font-['Changa']">
                        {step.title.en}
                      </h3>
                      <p className="text-sm text-white/60">
                        {step.description.en}
                      </p>
                      <p className="text-xs text-white/40 font-['Noto_Sans_Arabic'] mt-2">
                        {step.title.ar}
                      </p>
                    </div>
                  </motion.div>

                  {/* Arrow between steps */}
                  {i < science.steps.length - 1 && (
                    <motion.div
                      className="hidden md:block text-[#FF4800]/40"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.5 + i * 0.2, duration: 0.4 }}
                    >
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <path d="M10 20 L30 20 M30 20 L25 15 M30 20 L25 25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          {science.stats.map((stat, i) => (
            <motion.div
              key={i}
              className="text-center glass-card p-8 rounded-2xl border border-[#FF4800]/20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1 + i * 0.1, duration: 0.6 }}
            >
              <motion.div
                className="text-5xl font-bold text-[#FF4800] mb-2 font-['Share_Tech_Mono']"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: 1.2 + i * 0.1, type: 'spring', stiffness: 200 }}
              >
                {stat.value}
              </motion.div>
              <p className="text-white/70">{stat.label.en}</p>
              <p className="text-white/50 text-sm font-['Noto_Sans_Arabic']">{stat.label.ar}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Expert Quote */}
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <div className="glass-card p-8 md:p-12 rounded-3xl border-2 border-white/10 relative">
            {/* Quote Mark */}
            <div className="absolute top-6 left-6 text-6xl text-[#FF4800]/20 font-serif">"</div>
            
            <div className="relative">
              <p className="text-lg md:text-xl text-white/80 mb-6 italic pl-8">
                {science.quote.text.en}
              </p>
              <p className="text-base text-white/60 font-['Noto_Sans_Arabic'] mb-6 italic pl-8">
                {science.quote.text.ar}
              </p>
              <div className="flex items-center gap-4 pl-8">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF4800] to-[#FFD700] flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white font-bold">{science.quote.author.en}</p>
                  <p className="text-white/50 text-sm font-['Noto_Sans_Arabic']">{science.quote.author.ar}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
