
import React from 'react';
import { User } from '@/types/auth';
import DailyStreakIndicator from './DailyStreakIndicator';
import TotalXPIndicator from './TotalXPIndicator';

interface XPIndicatorsProps {
  user: User;
}

const XPIndicators: React.FC<XPIndicatorsProps> = ({ user }) => {
  return (
    <div className="flex items-center gap-3">
      <DailyStreakIndicator streak={user?.streak || 0} />
      
      {/* Separator */}
      <div className="hidden sm:block h-4 w-px bg-white/10"></div>
      
      <TotalXPIndicator xp={user?.xp || 0} />
    </div>
  );
};

export default XPIndicators;
