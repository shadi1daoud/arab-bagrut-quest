
import React from 'react';
import { formatXP } from '@/lib/helpers';

interface TotalXPIndicatorProps {
  xp: number;
}

const TotalXPIndicator: React.FC<TotalXPIndicatorProps> = ({ xp }) => {
  return (
    <div className="relative flex items-center gap-2 glass-card py-2 px-6 rounded-full border-2 border-[#FF4800]/30 bg-[#FF4800]/10 h-10 hover:bg-[#FF4800]/15 transition-all duration-200 shadow-lg shadow-[#FF4800]/20 group">
      {/* Animated border effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-[#FF4800]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
      
      {/* XP Icon - Modern geometric design */}
      <div className="relative z-10 flex items-center justify-center w-6 h-6 rounded-full bg-[#FF4800] text-white shadow-md">
        <svg 
          className="w-4 h-4" 
          viewBox="0 0 24 24" 
          fill="currentColor"
        >
          <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" />
        </svg>
      </div>
      
      <div className="relative z-10 flex items-center gap-1">
        <span className="text-[#FF4800] font-['Share_Tech_Mono'] text-base font-bold tracking-wide">
          {formatXP(xp)}
        </span>
      </div>
      
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-full bg-[#FF4800]/5 blur-xl group-hover:bg-[#FF4800]/10 transition-all duration-300"></div>
    </div>
  );
};

export default TotalXPIndicator;
