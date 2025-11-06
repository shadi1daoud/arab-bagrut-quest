import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { landingContent } from '@/lib/landing-content';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { language } = useLanguage();
  const { howItWorks } = landingContent;

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0F0F0F] to-[#0A0A0A]">
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0yOS41IDMwaC0xdjFoMXYtMXptMCAtMS45NWgtMXYxaDF2LTF6bS0xIDUuOTVoMXYxaC0xdi0xeiIgZmlsbD0iI0ZGNDgwMCIgZmlsbC1vcGFjaXR5PSIwLjEiPjwvcGF0aD48L2c+PC9zdmc+')]"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-['Changa'] font-bold mb-4">
            <span className="text-white">{howItWorks.headline.en}</span>
            <span className="block text-[#FF4800] mt-2 font-['Noto_Sans_Arabic']">
              {howItWorks.headline.ar}
            </span>
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="max-w-6xl mx-auto">
          {howItWorks.steps.map((step, i) => (
            <motion.div
              key={i}
              className="relative mb-12 last:mb-0"
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.2, duration: 0.8 }}
            >
              <div className={`flex flex-col md:flex-row items-center gap-8 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                {/* Step Number & Icon */}
                <motion.div
                  className="flex-shrink-0 w-32 h-32 relative"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="absolute inset-0 glass-card rounded-3xl border-2 border-[#FF4800]/30 bg-gradient-to-br from-[#FF4800]/20 to-transparent"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-2">{step.icon}</div>
                      <div className="text-xs text-[#FF4800]/60 font-['Share_Tech_Mono']">
                        {step.number}
                      </div>
                    </div>
                  </div>
                  
                  {/* Glow Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl bg-[#FF4800]/20 blur-xl"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>

                {/* Step Content */}
                <div className="flex-1 glass-card p-8 rounded-2xl border border-[#FF4800]/20 hover:border-[#FF4800]/50 transition-all group">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 font-['Changa'] group-hover:text-[#FF4800] transition-colors">
                    {step.title.en}
                  </h3>
                  <p className="text-white/70 mb-3">
                    {step.description.en}
                  </p>
                  <p className="text-white/50 font-['Noto_Sans_Arabic']">
                    {step.title.ar} • {step.description.ar}
                  </p>
                </div>

                {/* Connector Arrow (only between steps) */}
                {i < howItWorks.steps.length - 1 && (
                  <motion.div
                    className="hidden md:block absolute left-1/2 -translate-x-1/2 -bottom-8 text-[#FF4800]/40"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <ArrowRight className="w-8 h-8 rotate-90" />
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Hint */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <p className="text-white/50 text-lg">
            Ready to start your journey? • جاهز لبدء رحلتك؟
          </p>
        </motion.div>
      </div>
    </section>
  );
};
