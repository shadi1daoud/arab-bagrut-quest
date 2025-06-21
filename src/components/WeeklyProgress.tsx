
import React from 'react';
import { TrendingUp, Clock, Target, Award, Flame, Star, Calendar, Zap } from 'lucide-react';
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
  const activeDays = weeklyData.filter(day => day.xp > 0).length;
  
  // Motivational message based on progress
  const getMotivationalMessage = () => {
    if (progressPercentage >= 100) return { text: "ممتاز! لقد حققت هدفك الأسبوعي! 🎉", color: "text-green-400" };
    if (progressPercentage >= 75) return { text: "أداء رائع! أنت قريب من تحقيق هدفك", color: "text-[#FF4800]" };
    if (progressPercentage >= 50) return { text: "استمر! أنت في منتصف الطريق", color: "text-yellow-400" };
    if (progressPercentage >= 25) return { text: "بداية جيدة، واصل التقدم", color: "text-blue-400" };
    return { text: "ابدأ رحلتك التعليمية اليوم!", color: "text-gray-400" };
  };

  const motivation = getMotivationalMessage();

  return (
    <div className="space-y-4">
      {/* Main Progress Section */}
      <div className="text-center">
        <div className="flex justify-center items-center gap-2 mb-3">
          <Target className="h-5 w-5 text-[#FF4800]" />
          <h3 className="text-sm font-bold text-white font-changa">الهدف الأسبوعي</h3>
        </div>
        
        {/* Large Progress Ring */}
        <div className="relative mb-4">
          <svg width="120" height="120" viewBox="0 0 120 120" className="mx-auto">
            <circle 
              cx="60" 
              cy="60" 
              r="52" 
              fill="none" 
              stroke="rgba(255,255,255,0.08)" 
              strokeWidth="8" 
            />
            <circle 
              cx="60" 
              cy="60" 
              r="52" 
              fill="none" 
              stroke="#FF4800" 
              strokeWidth="8" 
              strokeLinecap="round"
              strokeDasharray="326.7" 
              strokeDashoffset={326.7 - (326.7 * progressPercentage) / 100}
              className="transition-all duration-1000 ease-out"
              style={{
                filter: progressPercentage > 75 ? 'drop-shadow(0 0 8px rgba(255,72,0,0.6))' : 'none'
              }}
            />
            <text x="60" y="50" textAnchor="middle" dominantBaseline="middle" fontSize="20" fill="white" className="font-['Share_Tech_Mono'] font-bold">
              {totalWeeklyXP}
            </text>
            <text x="60" y="70" textAnchor="middle" dominantBaseline="middle" fontSize="10" fill="#a0a0a0" className="font-noto">
              من {weeklyGoal} XP
            </text>
          </svg>
          
          {/* Achievement Badge */}
          {progressPercentage >= 100 && (
            <div className="absolute top-0 right-0 bg-yellow-500 rounded-full p-1.5 animate-pulse">
              <Star className="h-4 w-4 text-white" fill="white" />
            </div>
          )}
        </div>
        
        {/* Progress Percentage */}
        <div className="mb-3">
          <span className="text-2xl font-bold text-white font-['Share_Tech_Mono']">
            {Math.round(progressPercentage)}%
          </span>
          <p className="text-xs font-noto mt-1" style={{ color: motivation.color.replace('text-', '') }}>
            {motivation.text}
          </p>
        </div>
      </div>

      {/* Weekly Activity Visualization */}
      <div className="bg-[rgba(255,255,255,0.03)] rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-gray-400 font-noto">نشاط الأسبوع</span>
          <div className="flex items-center gap-1 text-xs text-[#FF4800] font-['Share_Tech_Mono']">
            <Calendar className="h-3 w-3" />
            {activeDays}/7 أيام
          </div>
        </div>
        
        <div className="flex items-end justify-between gap-2 h-16 mb-3">
          {weeklyData.map((day, index) => {
            const height = Math.max((day.xp / 15) * 100, 12);
            const isToday = index === 2; // Mock today as Wednesday
            const isBestDay = day.day === bestDay.day && day.xp > 0;
            
            return (
              <div key={day.day} className="flex-1 flex flex-col items-center">
                <div 
                  className={`w-full rounded-lg transition-all duration-700 relative group cursor-pointer ${
                    day.xp > 0 
                      ? isBestDay 
                        ? 'bg-gradient-to-t from-[#FF4800] to-[#FF6B35] shadow-lg shadow-[#FF4800]/30' 
                        : 'bg-[#FF4800]'
                      : 'bg-gray-700 hover:bg-gray-600'
                  } ${isToday ? 'ring-2 ring-white/30' : ''}`}
                  style={{ height: `${height}%` }}
                >
                  {isBestDay && (
                    <Star className="h-3 w-3 text-white absolute top-1 left-1/2 transform -translate-x-1/2" fill="white" />
                  )}
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity font-['Share_Tech_Mono'] whitespace-nowrap">
                    {day.xp} XP
                  </div>
                </div>
                
                <span className={`text-[10px] mt-2 font-noto ${
                  isToday ? 'text-white font-bold' : 'text-gray-400'
                }`}>
                  {day.day.slice(0, 2)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Key Stats Row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-[rgba(255,255,255,0.03)] rounded-lg p-3 text-center">
          <Clock className="h-4 w-4 text-[#FF4800] mx-auto mb-1" />
          <div className="text-sm font-bold text-white font-['Share_Tech_Mono']">{studyHours}h</div>
          <div className="text-[10px] text-gray-400 font-noto">ساعات الدراسة</div>
        </div>
        
        <div className="bg-[rgba(255,255,255,0.03)] rounded-lg p-3 text-center">
          <Flame className="h-4 w-4 text-[#FF4800] mx-auto mb-1" />
          <div className="text-sm font-bold text-white font-['Share_Tech_Mono']">{streak}</div>
          <div className="text-[10px] text-gray-400 font-noto">أيام متتالية</div>
        </div>
        
        <div className="bg-[rgba(255,255,255,0.03)] rounded-lg p-3 text-center">
          <Zap className="h-4 w-4 text-[#FF4800] mx-auto mb-1" />
          <div className="text-sm font-bold text-white font-['Share_Tech_Mono']">{bestDay.xp}</div>
          <div className="text-[10px] text-gray-400 font-noto">أفضل يوم</div>
        </div>
      </div>

      {/* Achievement Badges */}
      {(progressPercentage >= 25 || streak >= 3 || activeDays >= 5) && (
        <div className="flex flex-wrap gap-2 justify-center">
          {progressPercentage >= 25 && (
            <div className="flex items-center gap-1 py-1 px-2 bg-[#FF4800]/10 rounded-full text-[10px] text-[#FF4800] border border-[#FF4800]/20 font-noto">
              <Target className="h-2.5 w-2.5" />
              {Math.round(progressPercentage)}% مُكمل
            </div>
          )}
          
          {streak >= 3 && (
            <div className="flex items-center gap-1 py-1 px-2 bg-[#FF4800]/10 rounded-full text-[10px] text-[#FF4800] border border-[#FF4800]/20 font-noto">
              <Flame className="h-2.5 w-2.5" />
              نار متقدة
            </div>
          )}
          
          {activeDays >= 5 && (
            <div className="flex items-center gap-1 py-1 px-2 bg-[#FF4800]/10 rounded-full text-[10px] text-[#FF4800] border border-[#FF4800]/20 font-noto">
              <Award className="h-2.5 w-2.5" />
              أسبوع نشط
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WeeklyProgress;
