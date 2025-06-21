
import React from 'react';
import { TrendingUp, Clock, Target, Award, Flame, Star } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface WeeklyProgressProps {
  weeklyData: { day: string; xp: number }[];
  totalWeeklyXP: number;
  weeklyGoal: number;
  studyHours: number;
  streak: number;
}

const WeeklyProgress: React.FC<WeeklyProgressProps> = ({ 
  weeklyData = [],
  totalWeeklyXP = 51,
  weeklyGoal = 100,
  studyHours = 8.7,
  streak = 5
}) => {
  const progressPercentage = Math.min((totalWeeklyXP / weeklyGoal) * 100, 100);
  const bestDay = weeklyData.reduce((best, current) => current.xp > best.xp ? current : best, weeklyData[0] || { day: 'الأحد', xp: 0 });
  const completedDays = weeklyData.filter(day => day.xp > 0).length;
  
  // Motivational message based on progress
  const getMotivationalMessage = () => {
    if (progressPercentage >= 100) return "ممتاز! لقد حققت هدفك الأسبوعي! 🎉";
    if (progressPercentage >= 75) return "أداء رائع! أنت قريب من تحقيق هدفك";
    if (progressPercentage >= 50) return "استمر! أنت في منتصف الطريق";
    if (progressPercentage >= 25) return "بداية جيدة، واصل التقدم";
    return "ابدأ رحلتك التعليمية اليوم!";
  };

  return (
    <div className="flex flex-col">
      {/* Weekly Goal Progress */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-gray-400 font-noto">الهدف الأسبوعي</span>
          <span className="text-xs text-[#FF4800] font-['Share_Tech_Mono']">{totalWeeklyXP}/{weeklyGoal} XP</span>
        </div>
        <Progress value={progressPercentage} className="h-2 mb-2" />
        <p className="text-xs text-gray-300 font-noto text-center">{getMotivationalMessage()}</p>
      </div>
      
      {/* Weekly Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="p-2 rounded-lg bg-[rgba(255,255,255,0.03)] text-center">
          <Clock className="h-4 w-4 text-[#FF4800] mx-auto mb-1" />
          <div className="text-sm font-bold text-white font-['Share_Tech_Mono']">{studyHours}h</div>
          <div className="text-[10px] text-gray-400 font-noto">ساعات الدراسة</div>
        </div>
        
        <div className="p-2 rounded-lg bg-[rgba(255,255,255,0.03)] text-center">
          <Flame className="h-4 w-4 text-[#FF4800] mx-auto mb-1" />
          <div className="text-sm font-bold text-white font-['Share_Tech_Mono']">{streak}</div>
          <div className="text-[10px] text-gray-400 font-noto">أيام متتالية</div>
        </div>
      </div>
      
      {/* Mini Weekly Chart */}
      <div className="mb-3">
        <div className="flex items-end justify-between gap-1 h-12 mb-2">
          {weeklyData.map((day, index) => (
            <div key={day.day} className="flex-1 flex flex-col items-center">
              <div 
                className={`w-full rounded-t-sm transition-all duration-500 ${
                  day.xp > 0 ? 'bg-[#FF4800]' : 'bg-gray-700'
                } ${day.day === bestDay.day ? 'shadow-[0_0_8px_rgba(255,72,0,0.5)]' : ''}`}
                style={{ height: `${Math.max((day.xp / 15) * 100, 8)}%` }}
              >
                {day.day === bestDay.day && day.xp > 0 && (
                  <Star className="h-2 w-2 text-white mx-auto mt-0.5" fill="white" />
                )}
              </div>
              <span className="text-[9px] text-gray-400 mt-1 font-noto">{day.day.charAt(0)}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Achievement Badges */}
      <div className="flex flex-wrap gap-1 justify-center mb-3">
        {progressPercentage >= 25 && (
          <div className="py-1 px-2 bg-[#FF4800]/10 rounded-full text-[9px] text-[#FF4800] border border-[#FF4800]/20 font-noto flex items-center gap-1">
            <Target className="h-2 w-2" />
            25% مُكمل
          </div>
        )}
        
        {streak >= 3 && (
          <div className="py-1 px-2 bg-[#FF4800]/10 rounded-full text-[9px] text-[#FF4800] border border-[#FF4800]/20 font-noto flex items-center gap-1">
            <Flame className="h-2 w-2" />
            نار متقدة
          </div>
        )}
        
        {completedDays >= 5 && (
          <div className="py-1 px-2 bg-[#FF4800]/10 rounded-full text-[9px] text-[#FF4800] border border-[#FF4800]/20 font-noto flex items-center gap-1">
            <Award className="h-2 w-2" />
            أسبوع نشط
          </div>
        )}
      </div>
      
      {/* Best Day Highlight */}
      {bestDay.xp > 0 && (
        <div className="text-center">
          <p className="text-xs text-gray-400 font-noto">أفضل يوم: <span className="text-[#FF4800] font-medium">{bestDay.day}</span></p>
          <p className="text-[10px] text-gray-500 font-['Share_Tech_Mono']">{bestDay.xp} XP</p>
        </div>
      )}
    </div>
  );
};

// Export component with title and footer info for consistent usage
export const WeeklyProgressWithFooter = ({ ...props }) => ({
  component: <WeeklyProgress {...props} />,
  title: "التقدم الأسبوعي",
  icon: TrendingUp
});

export default WeeklyProgress;
