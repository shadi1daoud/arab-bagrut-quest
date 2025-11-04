import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { landingContent } from '@/lib/landing-content';
import { Sparkles } from 'lucide-react';

export const VisionSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { vision } = landingContent;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const leftX = useTransform(scrollYProgress, [0, 1], ['-20%', '0%']);
  const rightX = useTransform(scrollYProgress, [0, 1], ['20%', '0%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      {/* Cinematic Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0F0505] to-[#0A0A0A]">
        <motion.div 
          className="absolute inset-0"
          style={{ opacity }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,72,0,0.2),transparent_70%)]"></div>
        </motion.div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF4800]/10 border border-[#FF4800]/30 mb-6"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-4 h-4 text-[#FF4800]" />
            <span className="text-[#FF4800] text-sm font-['Share_Tech_Mono']">
              Our Vision
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-['Changa'] font-bold mb-6">
            <span className="text-white">{vision.headline.en}</span>
            <span className="block text-[#FF4800] mt-2 font-['Noto_Sans_Arabic']">
              {vision.headline.ar}
            </span>
          </h2>

          <motion.p
            className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {vision.description.en}
          </motion.p>
          <motion.p
            className="text-lg text-white/60 max-w-3xl mx-auto mt-4 font-['Noto_Sans_Arabic']"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {vision.description.ar}
          </motion.p>
        </motion.div>

        {/* Before/After Transformation */}
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* BEFORE - Bored Student */}
            <motion.div
              style={{ x: leftX }}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div className="relative rounded-3xl overflow-hidden border-2 border-white/10 group">
                {/* Grayscale Filter */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-black/40 z-10"></div>
                
                <div className="relative aspect-[4/5] bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center p-8">
                  <div className="relative z-20 text-center">
                    <div className="text-8xl mb-6 grayscale opacity-40">😴</div>
                    <h3 className="text-2xl font-bold text-white/40 mb-3 font-['Changa']">
                      {vision.beforeLabel.en}
                    </h3>
                    <p className="text-white/30 font-['Noto_Sans_Arabic']">
                      {vision.beforeLabel.ar}
                    </p>
                    <ul className="mt-6 space-y-2 text-white/30 text-sm">
                      <li>❌ No motivation</li>
                      <li>❌ Boring lessons</li>
                      <li>❌ Studying alone</li>
                      <li>❌ No progress tracking</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* AFTER - Engaged Student */}
            <motion.div
              style={{ x: rightX }}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative rounded-3xl overflow-hidden border-2 border-[#FF4800]/30 group">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF4800]/20 to-[#FFD700]/10 z-10"></div>
                
                <div className="relative aspect-[4/5] bg-gradient-to-br from-[#1A0A00] to-[#0A0500] flex items-center justify-center p-8">
                  {/* Floating XP particles */}
                  <div className="absolute inset-0 overflow-hidden">
                    {[...Array(10)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-4 h-4 rounded-full bg-[#FF4800]"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                          y: [-20, -60],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 2 + Math.random(),
                          repeat: Infinity,
                          delay: Math.random() * 2,
                        }}
                      />
                    ))}
                  </div>

                  <div className="relative z-20 text-center">
                    <motion.div
                      className="text-8xl mb-6"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      🚀
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-3 font-['Changa']">
                      {vision.afterLabel.en}
                    </h3>
                    <p className="text-[#FF4800] font-['Noto_Sans_Arabic']">
                      {vision.afterLabel.ar}
                    </p>
                    <ul className="mt-6 space-y-2 text-white/80 text-sm">
                      <li>✅ Game-like motivation</li>
                      <li>✅ Engaging content</li>
                      <li>✅ Learn with friends</li>
                      <li>✅ Track every win</li>
                    </ul>
                  </div>
                </div>

                {/* Pulsing border effect */}
                <motion.div
                  className="absolute inset-0 rounded-3xl border-2 border-[#FF4800]"
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Tagline */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Join us in revolutionizing education for Arab students
          </p>
          <p className="text-lg text-white/50 font-['Noto_Sans_Arabic'] mt-2">
            انضم إلينا في إحداث ثورة في التعليم للطلاب العرب
          </p>
        </motion.div>
      </div>
    </section>
  );
};
