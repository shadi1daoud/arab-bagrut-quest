
import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';

const AdCard: React.FC = () => {
  const [adCode, setAdCode] = useState('');
  
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-[10px] text-gray-400 font-changa flex items-center gap-1">
          <ExternalLink className="h-2.5 w-2.5 text-[#FF4800]" />
          إعلان
        </span>
      </div>
      
      <div className="bg-[rgba(255,255,255,0.03)] border border-dashed border-[rgba(255,255,255,0.1)] rounded-lg p-2 flex items-center justify-center h-[120px] w-full relative overflow-hidden group">
        {adCode ? (
          <div dangerouslySetInnerHTML={{ __html: adCode }} className="w-full h-full" />
        ) : (
          <div className="text-center">
            <div className="h-10 w-10 rounded-full bg-[#FF4800]/10 flex items-center justify-center mx-auto mb-2">
              <ExternalLink className="h-5 w-5 text-[#FF4800]" />
            </div>
            <p className="text-xs text-gray-400 font-noto">مساحة إعلانية</p>
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 animate-shine" />
      </div>
    </div>
  );
};

export default AdCard;
