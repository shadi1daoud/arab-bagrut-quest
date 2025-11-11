import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface StickyMobileCTAProps {
  onJoinWaitlist: () => void;
}

export const StickyMobileCTA = ({ onJoinWaitlist }: StickyMobileCTAProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  useEffect(() => {
    const handleScroll = () => {
      // Show CTA after scrolling 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, type: "spring" }}
          className="fixed bottom-4 left-4 right-4 z-50 md:hidden"
        >
          <Button
            onClick={onJoinWaitlist}
            className="w-full h-14 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 hover:from-purple-500 hover:via-pink-500 hover:to-cyan-500 rounded-2xl shadow-2xl shadow-purple-500/50 border-2 border-purple-400/50 font-changa font-bold text-lg"
          >
            <span className="flex items-center justify-center gap-2">
              <Rocket className="w-5 h-5" />
              {isArabic ? 'ابدأ الآن' : 'Start Now'}
              <span className="text-2xl">🚀</span>
            </span>
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
