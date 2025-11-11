import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Star, Award } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const testimonials = isArabic ? [
    {
      quote: 'صرت أراجع كل يوم بدون ما أحس',
      author: 'مريم',
      level: 'مستوى 14',
      avatar: '👩‍🎓',
      badge: '🏆'
    },
    {
      quote: 'بتحسسني إني بتعلم عاللابتوب زي لعبة!',
      author: 'أحمد',
      level: 'مستوى 18',
      avatar: '👨‍🎓',
      badge: '⚡'
    },
    {
      quote: 'صرت أستمتع وأنا بحل امتحانات',
      author: 'ليان',
      level: 'مستوى 12',
      avatar: '👩‍💻',
      badge: '🌟'
    },
    {
      quote: 'المجتمع هون بيحفزني أدرس أكتر',
      author: 'كريم',
      level: 'مستوى 22',
      avatar: '👨‍💼',
      badge: '🔥'
    }
  ] : [
    {
      quote: 'I review every day without even realizing it',
      author: 'Mariam',
      level: 'Level 14',
      avatar: '👩‍🎓',
      badge: '🏆'
    },
    {
      quote: 'Makes me feel like I\'m learning through a game!',
      author: 'Ahmad',
      level: 'Level 18',
      avatar: '👨‍🎓',
      badge: '⚡'
    },
    {
      quote: 'I actually enjoy solving exams now',
      author: 'Layan',
      level: 'Level 12',
      avatar: '👩‍💻',
      badge: '🌟'
    },
    {
      quote: 'The community here motivates me to study more',
      author: 'Karim',
      level: 'Level 22',
      avatar: '👨‍💼',
      badge: '🔥'
    }
  ];

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-indigo-950/20 to-gray-950" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-changa font-bold text-white mb-4">
              {isArabic 
                ? 'آلاف الطلاب رح يغيروا طريقة دراستهم.'
                : 'Thousands of students will change their study method.'
              }
            </h2>
            <p className="text-2xl md:text-3xl font-changa font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              {isArabic ? 'إنت واحد منهم؟' : 'Are you one of them?'}
            </p>
          </motion.div>

          {/* Testimonials grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotate: -5 }}
                animate={isInView ? { opacity: 1, y: 0, rotate: 0 } : {}}
                transition={{ 
                  duration: 0.6,
                  delay: 0.1 + index * 0.1,
                  type: "spring"
                }}
                whileHover={{ scale: 1.03, rotate: 1 }}
                className="group relative"
              >
                <div className="relative p-8 rounded-3xl bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border border-indigo-500/30 backdrop-blur-sm hover:border-indigo-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/20">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/10 group-hover:to-purple-500/10 rounded-3xl transition-all duration-300" />

                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ 
                          duration: 0.3,
                          delay: 0.5 + index * 0.1 + i * 0.05
                        }}
                      >
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-xl md:text-2xl text-white font-lexend mb-6 leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>

                  {/* Author info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Avatar */}
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-3xl shadow-lg">
                        {testimonial.avatar}
                      </div>
                      
                      <div>
                        <p className="font-changa font-bold text-white text-lg">
                          {testimonial.author}
                        </p>
                        <p className="text-indigo-300 text-sm font-outfit flex items-center gap-1">
                          <Award className="w-4 h-4" />
                          {testimonial.level}
                        </p>
                      </div>
                    </div>

                    {/* Badge */}
                    <motion.div
                      animate={{ 
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.2
                      }}
                      className="text-4xl"
                    >
                      {testimonial.badge}
                    </motion.div>
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
