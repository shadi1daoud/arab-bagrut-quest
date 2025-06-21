
import React from 'react';
import { Flame } from 'lucide-react';

interface DailyStreakIndicatorProps {
  streak: number;
}

const DailyStreakIndicator: React.FC<DailyStreakIndicatorProps> = ({ streak }) => {
  return (
    <div className="flex items-center gap-2 glass-card py-2 px-4 rounded-full border border-white/5 h-9 hover:bg-white/10 transition-all duration-200">
      <Flame className="h-4 w-4 text-[#FF4800] animate-pulse" />
      <span className="text-white font-['Share_Tech_Mono'] text-sm font-medium">
        {streak}
      </span>
      <span className="text-gray-400 font-['Share_Tech_Mono'] text-xs hidden sm:inline">
        يوم
      </span>
    </div>
  );
};

export default DailyStreakIndicator;
