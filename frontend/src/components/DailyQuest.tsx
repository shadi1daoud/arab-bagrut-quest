
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
    <div className="p-2">
      <h4 className="text-white font-medium font-changa">{title}</h4>
      <p className="text-xs text-gray-400 mb-3 font-noto">{description}</p>
      
      <Button 
        className="w-full h-[40px] bg-gradient-to-r from-[#FF4800] to-[#CC3900] relative overflow-hidden" 
        size="sm"
      >
        <span className="relative z-10">ابدأ المهمة</span>
      </Button>
    </div>
  );
};

export default DailyQuest;
