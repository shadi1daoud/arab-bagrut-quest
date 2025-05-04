
import React from 'react';
import { Brain } from 'lucide-react';
import { SectionHeader } from './ui/section-header';

interface IntelligenceScoreProps {
  score: number;
  weeklyGain: number;
  percentile: number;
  showHeader?: boolean;
}

export const IntelligenceScore: React.FC<IntelligenceScoreProps> = ({
  score = 8.9,
  weeklyGain = 0.9,
  percentile = 85,
  showHeader = true
}) => {
  return (
    <div className="flex flex-col">
      <div className="p-4 flex flex-col items-center">
        <div className="relative mb-3">
          <svg width="90" height="90" viewBox="0 0 120 120">
            <circle 
              cx="60" 
              cy="60" 
              r="54" 
              fill="none" 
              stroke="rgba(255,255,255,0.07)" 
              strokeWidth="6" 
            />
            <circle 
              cx="60" 
              cy="60" 
              r="54" 
              fill="none" 
              stroke="#FF4800" 
              strokeWidth="6" 
              strokeLinecap="round"
              strokeDasharray="339.3" 
              strokeDashoffset={339.3 - (339.3 * score / 10)} 
              className="progress-ring"
            />
            <text x="60" y="55" textAnchor="middle" dominantBaseline="middle" fontSize="24" fill="white" className="font-['Share_Tech_Mono']">{score}</text>
            <text x="60" y="75" textAnchor="middle" dominantBaseline="middle" fontSize="10" fill="#a0a0a0" className="font-noto">مستوى</text>
          </svg>
        </div>
        
        <div className="text-center">
          <div className="py-1 px-2 bg-[#FF4800]/10 rounded-full text-[#FF4800] border border-[#FF4800]/20 font-['Share_Tech_Mono'] text-xs mb-2">
            +{weeklyGain} هذا الأسبوع
          </div>
          <p className="text-xs text-gray-400 font-noto">أعلى من {percentile}% من الطلاب</p>
        </div>
      </div>
      
      {showHeader && (
        <SectionHeader 
          title="الذكاء الاصطناعي"
          icon={<Brain className="h-4 w-4 text-[#FF4800]" strokeWidth={2} />}
        />
      )}
    </div>
  );
};

export default IntelligenceScore;
