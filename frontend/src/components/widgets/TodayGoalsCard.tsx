
import React from 'react';
import { Target, CheckCircle, Circle, Star } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface TodayGoalsCardProps {
  completedGoals: number; // This will be current week XP
  totalGoals: number; // This will be weekly goal XP
}

const TodayGoalsCard: React.FC<TodayGoalsCardProps> = ({ completedGoals, totalGoals }) => {
  const progressPercentage = Math.min((completedGoals / totalGoals) * 100, 100);
  
  return (
    <div className="text-center">
      <div className="h-10 w-10 mx-auto rounded-full bg-[#FF4800]/20 flex items-center justify-center mb-2">
        <Star className="h-5 w-5 text-[#FF4800]" />
      </div>
      
      <div className="text-lg font-bold text-white font-['Share_Tech_Mono'] mb-1">
        {completedGoals}/{totalGoals}
      </div>
      
      <div className="text-xs text-gray-400 font-noto mb-2">
        هدف الأسبوع
      </div>
      
      <Progress value={progressPercentage} className="h-1.5" />
      
      {progressPercentage >= 100 && (
        <div className="mt-2 text-xs text-green-400 font-bold animate-pulse">
          مكتمل! ✨
        </div>
      )}
      
      {progressPercentage >= 50 && progressPercentage < 100 && (
        <div className="mt-2 text-xs text-[#FF4800] font-bold">
          {Math.round(progressPercentage)}% مكتمل
        </div>
      )}
    </div>
  );
};

export default TodayGoalsCard;
