
import React from 'react';
import { Target } from 'lucide-react';
import { Award } from 'lucide-react';
import { Button } from './ui/button';

interface DailyQuestProps {
  title: string;
  description: string;
  xpReward: number;
  day: number;
}

export const DailyQuest: React.FC<DailyQuestProps> = ({ 
  title = "أكمل تحصيلي الرياضيات",
  description = "حل 10 مسائل جديدة من كتاب التحصيلي", 
  xpReward = 150,
  day = 7
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-bold text-white font-changa flex items-center gap-2">
          <Target className="h-4 w-4 text-[#8E6DFF]" />
          مهمة اليوم
        </h3>
        
        <div className="py-1 px-2 bg-[rgba(255,255,255,0.05)] rounded-full flex items-center gap-1">
          <Award className="h-3 w-3 text-[#8E6DFF]" strokeWidth={2} />
          <span className="text-xs text-[#8E6DFF] font-['Share_Tech_Mono']">يوم {day}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-4 p-4 bg-[rgba(255,255,255,0.03)] rounded-xl">
        <div className="shrink-0">
          <Target className="h-12 w-12 text-[#8E6DFF]" strokeWidth={2} />
        </div>
        
        <div className="flex-1">
          <h4 className="text-white font-medium font-changa">{title}</h4>
          <p className="text-xs text-gray-400 mb-3 font-noto">{description}</p>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1 py-1 px-3 bg-[#8E6DFF]/10 rounded-md text-xs text-[#8E6DFF] font-['Share_Tech_Mono']">
              <Award className="h-3 w-3" strokeWidth={2} />
              +{xpReward} XP
            </div>
            
            <Button 
              className="w-[130px] h-[40px] bg-gradient-to-r from-[#8E6DFF] to-[#5E5BFF] relative overflow-hidden shimmer-button" 
              size="sm"
            >
              <span className="relative z-10">ابدأ المهمة</span>
              <div className="absolute inset-0 shimmer"></div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyQuest;
