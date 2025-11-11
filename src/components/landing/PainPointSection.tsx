import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Smartphone, Users, TrendingDown, Zap } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const PainPointSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const painPoints = isArabic ? [
    { icon: <Smartphone className="w-8 h-8" />, text: 'بتحاول تدرس، بس الموبايل بسحبك كل خمس دقايق؟' },
    { icon: <Users className="w-8 h-8" />, text: 'بتحس حالك لحالك، والمواد مملة؟' },
    { icon: <TrendingDown className="w-8 h-8" />, text: 'بتبدأ اليوم الأول بحماس، واليوم الثالث بتختفي الطاقة؟' },
  ] : [
    { icon: <Smartphone className="w-8 h-8" />, text: 'You try to study, but your phone distracts you every five minutes?' },
    { icon: <Users className="w-8 h-8" />, text: 'You feel alone, and the material is boring?' },
    { icon: <TrendingDown className="w-8 h-8" />, text: 'You start the first day excited, and by day three the energy disappears?' },
  ];

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950" />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-changa font-bold text-white mb-4">
              {isArabic ? 'خلينا نكون صريحين...' : "Let's be honest..."}
            </h2>
            <p className="text-3xl md:text-5xl font-changa font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              {isArabic ? 'الدراسة صعبة 😩' : 'Studying is hard 😩'}
            </p>
          </motion.div>

          {/* Pain points */}
          <div className="space-y-6 mb-16">
            {painPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
                className="group"
              >
                <div className="flex items-start gap-6 p-6 rounded-2xl bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-gray-700/50 backdrop-blur-sm hover:border-red-500/30 transition-all duration-300 hover:scale-[1.02]">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center text-red-400 group-hover:scale-110 transition-transform duration-300">
                    {point.icon}
                  </div>
                  <p className="text-xl md:text-2xl text-gray-200 font-lexend leading-relaxed pt-2">
                    {point.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Animated tired student illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex justify-center mb-12"
          >
            <div className="relative">
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  opacity: [0.7, 0.4, 0.7]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-9xl grayscale"
              >
                😩
              </motion.div>
              
              {/* Floating "zzz" */}
              <motion.div
                animate={{ 
                  y: [0, -20, -40],
                  opacity: [0, 1, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
                className="absolute -top-8 -right-8 text-4xl"
              >
                💤
              </motion.div>
            </div>
          </motion.div>

          {/* Transition line with lightning */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
            className="relative"
          >
            <div className="flex items-center justify-center gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
              
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                }}
                className="p-4 rounded-full bg-gradient-to-br from-purple-600 to-cyan-600 shadow-lg shadow-purple-500/50"
              >
                <Zap className="w-8 h-8 text-white" />
              </motion.div>
              
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            </div>
            
            <p className="text-center mt-6 text-2xl md:text-3xl font-changa font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              {isArabic ? 'لهيك عملنا Darsni.' : "That's why we created Darsni."}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-950 to-transparent" />
    </section>
  );
};
