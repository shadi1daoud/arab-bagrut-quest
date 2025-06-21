
import React from 'react';
import { Target, CheckCircle, Circle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface TodayGoalsCardProps {
  completedGoals: number;
  totalGoals: number;
}

const TodayGoalsCard: React.FC<TodayGoalsCardProps> = ({ completedGoals, totalGoals }) => {
  const progressPercentage = (completedGoals / totalGoals) * 100;
  
  return (
    <div className="text-center">
      <div className="h-10 w-10 mx-auto rounded-full bg-[#FF4800]/20 flex items-center justify-center mb-2">
        <Target className="h-5 w-5 text-[#FF4800]" />
      </div>
      
      <div className="text-lg font-bold text-white font-['Share_Tech_Mono'] mb-1">
        {completedGoals}/{totalGoals}
      </div>
      
      <div className="text-xs text-gray-400 font-noto mb-2">
        أهداف اليوم
      </div>
      
      <Progress value={progressPercentage} className="h-1.5" />
      
      {completedGoals === totalGoals && (
        <div className="mt-2 text-xs text-green-400 font-bold animate-pulse">
          مكتمل! ✨
        </div>
      )}
    </div>
  );
};

export default TodayGoalsCard;
