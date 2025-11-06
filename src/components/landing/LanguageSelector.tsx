import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';

export const LanguageSelector = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-6 right-6 z-50"
    >
      <button
        onClick={toggleLanguage}
        className="glass-card px-4 py-2 flex items-center gap-2 hover:bg-white/10 transition-all group"
      >
        <Globe className="w-4 h-4 text-[#FF4800] group-hover:rotate-12 transition-transform" />
        <span className="text-sm font-medium">
          {language === 'ar' ? 'العربية' : 'English'}
        </span>
      </button>
    </motion.div>
  );
};
