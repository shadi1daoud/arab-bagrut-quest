
import React from 'react';
import { User } from '@/types/auth';
import DailyStreakIndicator from './DailyStreakIndicator';
import TotalXPIndicator from './TotalXPIndicator';
import WeeklyXPIndicator from './WeeklyXPIndicator';

interface XPIndicatorsProps {
  user: User;
}

const XPIndicators: React.FC<XPIndicatorsProps> = ({ user }) => {
  // Calculate weekly XP (mock calculation - could be from API)
  const weeklyXP = Math.floor((user?.xp || 0) * 0.15); // 15% of total XP as weekly

  return (
    <div className="flex items-center gap-3">
      <DailyStreakIndicator streak={user?.streak || 0} />
      
      {/* Separator */}
      <div className="hidden sm:block h-4 w-px bg-white/10"></div>
      
      <TotalXPIndicator xp={user?.xp || 0} />
      
      {/* Separator */}
      <div className="hidden sm:block h-4 w-px bg-white/10"></div>
      
      <WeeklyXPIndicator weeklyXP={weeklyXP} />
    </div>
  );
};

export default XPIndicators;
