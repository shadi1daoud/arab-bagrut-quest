
import React from 'react';
import { Flame, Calendar } from 'lucide-react';

interface StreakCounterProps {
  streak: number;
}

const StreakCounter: React.FC<StreakCounterProps> = ({ streak }) => {
  console.log('StreakCounter: Received streak value:', streak);
  return (
    <div className="text-center">
      <div className="relative mb-2">
        <div className="h-10 w-10 mx-auto rounded-full bg-gradient-to-br from-[#FF4800] to-[#FF6B35] flex items-center justify-center shadow-lg shadow-[#FF4800]/30">
          <Flame className="h-5 w-5 text-white animate-pulse" />
        </div>
        {streak >= 7 && (
          <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-yellow-500 flex items-center justify-center">
            <span className="text-xs">🔥</span>
          </div>
        )}
      </div>
      
      <div className="text-lg font-bold text-white font-['Share_Tech_Mono'] mb-1">
        {streak}
      </div>
      
      <div className="text-xs text-gray-400 font-noto">
        {streak === 1 ? 'يوم متتالي' : 'أيام متتالية'}
      </div>
      
      {streak >= 7 && (
        <div className="mt-2 text-xs text-[#FF4800] font-bold animate-pulse">
          أسبوع كامل! 🎉
        </div>
      )}
    </div>
  );
};

export default StreakCounter;
