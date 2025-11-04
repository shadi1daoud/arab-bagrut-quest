import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { landingContent } from '@/lib/landing-content';
import { Users } from 'lucide-react';

export const CommunitySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { community } = landingContent;

  // Simulated town locations for visual effect
  const towns = [
    { name: 'Haifa', x: '30%', y: '25%' },
    { name: 'Nazareth', x: '45%', y: '35%' },
    { name: 'Acre', x: '25%', y: '20%' },
    { name: 'Tiberias', x: '55%', y: '40%' },
    { name: 'Ramallah', x: '40%', y: '50%' },
    { name: 'Bethlehem', x: '42%', y: '60%' },
    { name: 'Gaza', x: '20%', y: '80%' },
    { name: 'Jericho', x: '60%', y: '55%' },
  ];

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0505] via-[#0A0A0A] to-[#050A0A]">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,72,0,0.15),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,215,0,0.1),transparent_50%)]"></div>
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
            <span className="text-white">{community.headline.en}</span>
            <span className="block text-[#FF4800] mt-2 font-['Noto_Sans_Arabic']">
              {community.headline.ar}
            </span>
          </h2>
          <p className="text-xl text-white/60 mt-6 max-w-2xl mx-auto">
            {community.subheadline.en}
          </p>
          <p className="text-lg text-white/50 font-['Noto_Sans_Arabic'] mt-2">
            {community.subheadline.ar}
          </p>
        </motion.div>

        {/* Map Visualization */}
        <motion.div
          className="max-w-4xl mx-auto mb-20 relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="relative h-[500px] glass-card rounded-3xl border-2 border-[#FF4800]/30 overflow-hidden">
            {/* Background Gradient Map */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1A0A00]/50 to-[#0A0A0A]/50"></div>
            
            {/* Towns with Lights */}
            {towns.map((town, i) => (
              <motion.div
                key={town.name}
                className="absolute"
                style={{ left: town.x, top: town.y }}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
              >
                {/* Pulsing Dot */}
                <motion.div
                  className="relative w-4 h-4"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                >
                  <div className="w-full h-full rounded-full bg-[#FF4800]"></div>
                  <div className="absolute inset-0 rounded-full bg-[#FF4800] blur-md"></div>
                </motion.div>
                
                {/* Town Name */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-white/60 font-['Share_Tech_Mono']">
                  {town.name}
                </div>
              </motion.div>
            ))}

            {/* Connection Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {towns.map((town, i) => {
                if (i === 0) return null;
                const prevTown = towns[i - 1];
                return (
                  <motion.line
                    key={`line-${i}`}
                    x1={town.x}
                    y1={town.y}
                    x2={prevTown.x}
                    y2={prevTown.y}
                    stroke="#FF4800"
                    strokeWidth="1"
                    strokeOpacity="0.3"
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : {}}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                  />
                );
              })}
            </svg>

            {/* Floating Avatars */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-12 h-12 rounded-full bg-gradient-to-br from-[#FF4800] to-[#FFD700] border-2 border-white/20 flex items-center justify-center text-white font-bold"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? {
                  opacity: 1,
                  y: 0,
                } : {}}
                transition={{
                  delay: 1 + i * 0.1,
                  duration: 0.6,
                }}
              >
                <Users className="w-6 h-6" />
              </motion.div>
            ))}

            {/* Center Stats */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1.5, duration: 0.8, type: 'spring' }}
            >
              <div className="glass-card px-8 py-6 rounded-2xl border-2 border-[#FF4800]/50 backdrop-blur-xl">
                <div className="text-5xl font-bold text-[#FF4800] font-['Share_Tech_Mono'] mb-2">
                  2,547
                </div>
                <div className="text-white/70 text-sm">Students Playing</div>
                <div className="text-white/50 text-xs font-['Noto_Sans_Arabic']">طالب يلعب</div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Student Quotes */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {community.quotes.map((quote, i) => (
            <motion.div
              key={i}
              className="glass-card p-6 rounded-2xl border border-[#FF4800]/20 reveal-card hover-scale"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 + i * 0.1, duration: 0.6 }}
              style={{ animationDelay: `${0.8 + i * 0.1}s` }}
            >
              <div className="text-4xl mb-4">💬</div>
              <p className="text-white font-['Noto_Sans_Arabic'] mb-3 text-lg">
                "{quote.text}"
              </p>
              <p className="text-white/50 text-sm">
                — {quote.author}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
