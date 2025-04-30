
import React from 'react';
import { ExternalLink } from 'lucide-react';

export const AdCard: React.FC = () => {
  return (
    <div className="h-[140px]">
      <div className="flex justify-between items-center mb-1">
        <span className="text-[10px] text-gray-400 font-changa flex items-center gap-1">
          <ExternalLink className="h-2.5 w-2.5 text-[#8E6DFF]" strokeWidth={2} />
          إعلان
        </span>
      </div>
      
      <div id="ad-slot" className="bg-[rgba(255,255,255,0.03)] border border-dashed border-[rgba(255,255,255,0.1)] rounded-lg p-2 flex items-center justify-center h-[120px] w-full">
        <div className="text-center">
          <p className="text-xs text-gray-400 font-noto">336×140</p>
        </div>
      </div>
    </div>
  );
};

export default AdCard;
