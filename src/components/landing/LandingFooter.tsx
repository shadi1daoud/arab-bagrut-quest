import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

export const LandingFooter = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <footer className="relative py-16 border-t border-gray-800">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 to-black" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Logo and tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h3 className="text-4xl font-changa font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-3">
              Darsni
            </h3>
            <p className="text-gray-400 font-lexend">
              {isArabic 
                ? 'منصة تعليمية عربية حديثة – تعلم بذكاء، مش بصعوبة.'
                : 'A modern Arabic educational platform – learn smart, not hard.'
              }
            </p>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-8 mb-12"
          >
            <a 
              href="#" 
              className="text-gray-400 hover:text-purple-400 transition-colors font-lexend text-sm"
            >
              {isArabic ? 'سياسة الخصوصية' : 'Privacy Policy'}
            </a>
            <a 
              href="#" 
              className="text-gray-400 hover:text-cyan-400 transition-colors font-lexend text-sm"
            >
              {isArabic ? 'شروط الاستخدام' : 'Terms of Use'}
            </a>
            <a 
              href="#" 
              className="text-gray-400 hover:text-pink-400 transition-colors font-lexend text-sm"
            >
              {isArabic ? 'اتصل بنا' : 'Contact Us'}
            </a>
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <p className="text-gray-500 text-sm font-lexend">
              © 2025 Darsni. {isArabic ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};
