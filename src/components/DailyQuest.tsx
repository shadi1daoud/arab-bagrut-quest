
import React from 'react';
import { Target, Award } from 'lucide-react';
import { Button } from './ui/button';
import { SectionHeader } from './ui/section-header';

interface DailyQuestProps {
  title: string;
  description: string;
  xpReward: number;
  day: number;
  showHeader?: boolean;
}

export const DailyQuest: React.FC<DailyQuestProps> = ({ 
  title = "أكمل تحصيلي الرياضيات",
  description = "حل 10 مسائل جديدة من كتاب التحصيلي", 
  xpReward = 150,
  day = 7,
  showHeader = true
}) => {
  return (
    <div className="flex flex-col">
      <div className="p-4 bg-black/30 rounded-t-xl">
        <div className="flex items-center gap-4 relative">
          <div className="shrink-0 flex items-center justify-center h-16 w-16 rounded-xl bg-[#FF4800]/10">
            <Target className="h-10 w-10 text-[#FF4800]" strokeWidth={2} />
          </div>
          
          <div className="flex-1">
            <h4 className="text-white font-medium font-changa mb-1">{title}</h4>
            <p className="text-xs text-gray-400 mb-3 font-noto">{description}</p>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1 py-1 px-3 bg-[#FF4800]/10 rounded-md text-xs text-[#FF4800] font-['Share_Tech_Mono']">
                <Award className="h-3 w-3" />
                +{xpReward} XP
              </div>
              
              <Button 
                className="bg-gradient-to-r from-[#FF4800] to-[#CC3900] relative overflow-hidden" 
                size="sm"
              >
                <span className="relative z-10">ابدأ المهمة</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {showHeader && (
        <SectionHeader 
          title="مهمة اليوم"
          icon={<Target className="h-4 w-4 text-[#FF4800]" strokeWidth={2} />}
          className="mt-auto"
        />
      )}
    </div>
  );
};

export default DailyQuest;
