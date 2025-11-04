import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { landingContent } from '@/lib/landing-content';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';

export const RewardsCarousel = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { rewards } = landingContent;

  const [emblaRef] = useEmblaCarousel(
    { loop: true, dragFree: true },
    [AutoScroll({ playOnInit: true, speed: 1 })]
  );

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0F0A05] to-[#0A0A0A]">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,215,0,0.15),transparent_70%)]"></div>
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
            <span className="text-white">{rewards.headline.en}</span>
            <span className="block text-[#FF4800] mt-2 font-['Noto_Sans_Arabic']">
              {rewards.headline.ar}
            </span>
          </h2>
        </motion.div>

        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {[...rewards.items, ...rewards.items].map((reward, i) => (
              <motion.div
                key={i}
                className="flex-[0_0_300px] min-w-0"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.2 + (i % rewards.items.length) * 0.1, duration: 0.6 }}
              >
                <div className="glass-card p-8 rounded-3xl border-2 border-[#FF4800]/30 hover:border-[#FFD700]/50 transition-all hover-scale group h-full">
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FF4800]/10 to-[#FFD700]/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="relative">
                    {/* Icon */}
                    <motion.div
                      className="text-7xl mb-6 text-center"
                      whileHover={{ scale: 1.2, rotate: 15 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      {reward.icon}
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-white mb-3 text-center font-['Changa']">
                      {reward.title.en}
                    </h3>
                    <p className="text-white/50 text-center font-['Noto_Sans_Arabic'] mb-4">
                      {reward.title.ar}
                    </p>

                    {/* Description */}
                    <p className="text-white/60 text-center text-sm">
                      {reward.description.en}
                    </p>

                    {/* Shine Effect */}
                    <motion.div
                      className="absolute -inset-4 bg-gradient-to-r from-transparent via-[#FFD700]/20 to-transparent rounded-3xl"
                      animate={{ x: ['-200%', '200%'] }}
                      transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Hint */}
        <motion.p
          className="text-center text-white/40 mt-12 text-sm"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 0.8 }}
        >
          And many more rewards to unlock... • والمزيد من المكافآت لفتحها...
        </motion.p>
      </div>
    </section>
  );
};
