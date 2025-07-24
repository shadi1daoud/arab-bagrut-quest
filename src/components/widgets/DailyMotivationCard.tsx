
import React, { useState, useEffect } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { getDailyQuote } from '@/lib/firebaseUtils';

const DailyMotivationCard = () => {
  const [currentQuote, setCurrentQuote] = useState<{
    text: string;
    author: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDailyQuote = async () => {
      try {
        const quote = await getDailyQuote();
        if (quote) {
          setCurrentQuote({
            text: quote.text,
            author: quote.author
          });
        }
      } catch (error) {
        console.error('Error fetching daily quote:', error);
        // Fallback to default quote
        setCurrentQuote({
          text: "النجاح هو نتيجة التحضير والعمل الجاد والتعلم من الفشل",
          author: "نابليون هيل"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDailyQuote();
  }, []);

  if (loading) {
    return (
      <div className="relative overflow-hidden rounded-xl p-4 bg-gradient-to-br from-[#FF4800]/10 via-purple-500/5 to-blue-500/10 border border-white/10">
        <div className="animate-pulse">
          <div className="h-4 bg-white/10 rounded mb-2"></div>
          <div className="h-6 bg-white/10 rounded mb-2"></div>
          <div className="h-4 bg-white/10 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-xl p-4 bg-gradient-to-br from-[#FF4800]/10 via-purple-500/5 to-blue-500/10 border border-white/10">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#FF4800]/20 to-transparent rounded-full blur-xl"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-purple-500/20 to-transparent rounded-full blur-lg"></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#FF4800]/20">
            <Heart className="h-4 w-4 text-[#FF4800]" />
          </div>
          <h3 className="text-sm font-bold text-white font-changa">جملة اليوم المحفزة</h3>
          <Sparkles className="h-4 w-4 text-yellow-400 animate-pulse" />
        </div>
        
        <blockquote className="text-white text-base font-medium leading-relaxed font-noto text-right border-r-2 border-[#FF4800]/40 pr-3">
          "{currentQuote?.text || 'جاري التحميل...'}"
        </blockquote>
        
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
          <span className="text-xs text-gray-400 font-mono">
            {currentQuote?.author || 'مجهول'}
          </span>
          <div className="flex items-center gap-1">
            <div className="w-1 h-1 rounded-full bg-[#FF4800] animate-pulse"></div>
            <span className="text-xs text-[#FF4800] font-semibold">جديد كل يوم</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyMotivationCard;
