import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Puzzle, Gamepad2, Flame, Trophy, MessageCircle, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const SolutionSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const features = isArabic ? [
    { 
      icon: <Puzzle className="w-8 h-8" />,
      title: 'دروس قصيرة وممتعة',
      description: 'فِهم سريع بدل ملل طويل',
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: <Gamepad2 className="w-8 h-8" />,
      title: 'نظام XP ومستويات',
      description: 'كل إنجاز = نقاط وتقدم',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      icon: <Flame className="w-8 h-8" />,
      title: 'ستريك يومي',
      description: 'التزام بيخليك متفوق',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: 'تحديات وجوائز',
      description: 'منافسة بتحفزك تتعلم أكتر',
      color: 'from-yellow-500 to-amber-500'
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: 'مجتمع الطلاب العرب',
      description: 'ما بتدرس لحالك بعد اليوم',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'تجربة ذكية',
      description: 'ذكاء اصطناعي يساعدك تفهم أسرع',
      color: 'from-green-500 to-emerald-500'
    }
  ] : [
    { 
      icon: <Puzzle className="w-8 h-8" />,
      title: 'Short & Fun Lessons',
      description: 'Quick understanding instead of long boredom',
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: <Gamepad2 className="w-8 h-8" />,
      title: 'XP System & Levels',
      description: 'Every achievement = points and progress',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      icon: <Flame className="w-8 h-8" />,
      title: 'Daily Streak',
      description: 'Commitment that makes you excel',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: 'Challenges & Rewards',
      description: 'Competition that motivates you to learn more',
      color: 'from-yellow-500 to-amber-500'
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: 'Arab Students Community',
      description: "You're not studying alone anymore",
      color: 'from-cyan-500 to-blue-500'
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Smart Experience',
      description: 'AI helps you understand faster',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950/30 via-gray-950 to-cyan-950/30" />
      
      {/* Animated circles */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-500 rounded-full blur-3xl"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute bottom-1/4 -right-32 w-96 h-96 bg-cyan-500 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-7xl font-changa font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                {isArabic ? 'هون بيبدأ التغيير' : 'Here the change begins'}
              </span>
              <span className="ml-3">🎯</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 font-lexend max-w-3xl mx-auto leading-relaxed">
              {isArabic 
                ? 'Darsni بتخلي الدراسة مثل لعبة فيها نقاط، مستويات، تحديات، ومجتمع كامل من طلاب مثلك. كل مرة بتتعلم، بتفوز. وكل يوم بترجع تكمل لأنك متحمّس تشوف حالك تتقدّم.'
                : 'Darsni makes studying like a game with points, levels, challenges, and a whole community of students like you. Every time you learn, you win. And every day you come back because you\'re excited to see yourself progress.'
              }
            </p>
          </motion.div>

          {/* Features grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.6,
                  delay: 0.1 + index * 0.1,
                  type: "spring"
                }}
                whileHover={{ 
                  scale: 1.05,
                  rotate: 2
                }}
                className="group relative"
              >
                <div className="relative h-full p-8 rounded-3xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/20">
                  {/* Glow effect on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white shadow-lg`}
                  >
                    {feature.icon}
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-2xl font-changa font-bold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 font-lexend leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Shine effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
