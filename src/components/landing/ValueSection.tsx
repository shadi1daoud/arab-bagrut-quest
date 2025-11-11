import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check, X, Coffee, Zap } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const ValueSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const comparison = isArabic ? {
    headers: ['', 'درس خصوصي', 'Darsni'],
    rows: [
      { label: 'السعر', traditional: '150₪ / ساعة', darsni: 'أقل من 2₪ باليوم' },
      { label: 'الالتزام', traditional: 'مؤقت', darsni: 'متواصل' },
      { label: 'المتعة', traditional: 'مملة', darsni: 'ممتعة ومتحفزة' },
      { label: 'المجتمع', traditional: 'لحالك', darsni: 'آلاف الطلاب' },
      { label: 'التقدم', traditional: 'غير واضح', darsni: 'واضح ومرئي' },
    ]
  } : {
    headers: ['', 'Private Lesson', 'Darsni'],
    rows: [
      { label: 'Price', traditional: '150₪ / hour', darsni: 'Less than 2₪ per day' },
      { label: 'Commitment', traditional: 'Temporary', darsni: 'Continuous' },
      { label: 'Enjoyment', traditional: 'Boring', darsni: 'Fun & Motivating' },
      { label: 'Community', traditional: 'Alone', darsni: 'Thousands of students' },
      { label: 'Progress', traditional: 'Unclear', darsni: 'Clear & Visible' },
    ]
  };

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-950/20 via-gray-950 to-yellow-950/20" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Coffee className="w-10 h-10 text-orange-400" />
              <h2 className="text-4xl md:text-6xl font-changa font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                {isArabic ? 'أرخص من قهوة...' : 'Cheaper than coffee...'}
              </h2>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Zap className="w-10 h-10 text-yellow-400" />
              <p className="text-3xl md:text-5xl font-changa font-bold text-white">
                {isArabic ? 'وأقوى من درس خصوصي' : 'And stronger than a private lesson'}
              </p>
              <span className="text-4xl">💥</span>
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-300 font-lexend text-center mb-16 leading-relaxed max-w-3xl mx-auto"
          >
            {isArabic 
              ? 'بدال ما تدفع 150₪ على درس خصوصي، خُد كل المواد بواجهة ممتعة ومجتمع بيخليك تلتزم. ابدأ مجانًا وجرب بنفسك. ما رح ترجع للطريقة القديمة أبدًا.'
              : 'Instead of paying 150₪ for a private lesson, get all subjects with a fun interface and a community that keeps you committed. Start for free and try it yourself. You\'ll never go back to the old way.'
            }
          </motion.p>

          {/* Comparison table */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="rounded-3xl overflow-hidden border-2 border-orange-500/30 shadow-2xl shadow-orange-500/20"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-800 to-gray-900">
                    {comparison.headers.map((header, i) => (
                      <th 
                        key={i}
                        className={`px-6 py-4 text-lg font-changa font-bold ${
                          i === 0 ? 'text-gray-400' : 
                          i === 1 ? 'text-red-400' : 
                          'text-green-400'
                        }`}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparison.rows.map((row, rowIndex) => (
                    <motion.tr
                      key={rowIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ 
                        duration: 0.5,
                        delay: 0.6 + rowIndex * 0.1
                      }}
                      className="border-t border-gray-700/50 hover:bg-gray-800/30 transition-colors"
                    >
                      <td className="px-6 py-4 text-base font-lexend text-gray-300 font-semibold">
                        {row.label}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <X className="w-5 h-5 text-red-400 flex-shrink-0" />
                          <span className="text-gray-400 font-lexend">{row.traditional}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                          <span className="text-white font-lexend font-semibold">{row.darsni}</span>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Emphasis */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-12 text-center"
          >
            <p className="text-2xl md:text-3xl font-changa font-bold text-transparent bg-gradient-to-r from-orange-400 via-yellow-400 to-green-400 bg-clip-text">
              {isArabic 
                ? '🎯 استثمر بمستقبلك، مش بدرس واحد'
                : '🎯 Invest in your future, not in one lesson'
              }
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
