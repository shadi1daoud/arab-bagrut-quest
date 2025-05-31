
import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

const motivationalSentences = [
  "النجاح هو نتيجة التحضير والعمل الجاد والتعلم من الفشل",
  "كل يوم فرصة جديدة للتعلم والنمو",
  "الثقة بالنفس هي أول سر من أسرار النجاح",
  "التعليم هو أقوى سلاح يمكنك استخدامه لتغيير العالم",
  "لا تخف من النمو ببطء، خف فقط من البقاء واقفاً",
  "العقل مثل العضلة، كلما استخدمته أكثر كلما أصبح أقوى",
  "الحلم بدون خطة مجرد أمنية، والخطة بدون حلم مجرد عمل"
];

const DailyMotivationCard = () => {
  // Get the current day of year to determine which sentence to show
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  const currentSentence = motivationalSentences[dayOfYear % motivationalSentences.length];

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
          "{currentSentence}"
        </blockquote>
        
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
          <span className="text-xs text-gray-400 font-mono">
            يوم {dayOfYear % motivationalSentences.length + 1} من {motivationalSentences.length}
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
