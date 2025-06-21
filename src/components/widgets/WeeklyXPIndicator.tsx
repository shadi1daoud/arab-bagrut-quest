
import React from 'react';
import { TrendingUp } from 'lucide-react';
import { formatXP } from '@/lib/helpers';

interface WeeklyXPIndicatorProps {
  weeklyXP: number;
}

const WeeklyXPIndicator: React.FC<WeeklyXPIndicatorProps> = ({ weeklyXP }) => {
  return (
    <div className="flex items-center gap-2 glass-card py-2 px-4 rounded-full border border-white/5 h-9 hover:bg-white/10 transition-all duration-200">
      <TrendingUp className="h-4 w-4 text-green-400" />
      <span className="text-white font-['Share_Tech_Mono'] text-sm font-medium">
        {formatXP(weeklyXP)}
      </span>
      <span className="text-gray-400 font-['Share_Tech_Mono'] text-xs hidden sm:inline">
        أسبوعي
      </span>
    </div>
  );
};

export default WeeklyXPIndicator;
