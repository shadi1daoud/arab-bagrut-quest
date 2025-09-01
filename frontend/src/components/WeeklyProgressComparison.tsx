
import React from 'react';
import { TrendingUp, TrendingDown, Target, Clock, Flame, Star, ArrowUp, ArrowDown, Minus } from 'lucide-react';

interface WeeklyProgressComparisonProps {
  currentWeekXP: number;
  previousWeekXP: number;
  currentWeekHours: number;
  previousWeekHours: number;
  streak: number;
  weeklyGoal: number;
}

const WeeklyProgressComparison: React.FC<WeeklyProgressComparisonProps> = ({
  currentWeekXP,
  previousWeekXP,
  currentWeekHours,
  previousWeekHours,
  streak,
  weeklyGoal
}) => {
  console.log('WeeklyProgressComparison: Received props:', {
    currentWeekXP,
    previousWeekXP,
    currentWeekHours,
    previousWeekHours,
    streak,
    weeklyGoal
  });
  // Calculate percentage changes
  const xpChange = previousWeekXP > 0 ? ((currentWeekXP - previousWeekXP) / previousWeekXP) * 100 : 100;
  const hoursChange = previousWeekHours > 0 ? ((currentWeekHours - previousWeekHours) / previousWeekHours) * 100 : 100;
  const progressPercentage = Math.min((currentWeekXP / weeklyGoal) * 100, 100);

  // Determine trend direction and colors
  const getTrendInfo = (change: number) => {
    if (change > 5) return { 
      icon: ArrowUp, 
      color: 'text-green-400', 
      bgColor: 'bg-green-500/10',
      text: 'تحسن ممتاز' 
    };
    if (change > 0) return { 
      icon: ArrowUp, 
      color: 'text-[#FF4800]', 
      bgColor: 'bg-[#FF4800]/10',
      text: 'تقدم جيد' 
    };
    if (change < -5) return { 
      icon: ArrowDown, 
      color: 'text-red-400', 
      bgColor: 'bg-red-500/10',
      text: 'يحتاج تحسين' 
    };
    if (change < 0) return { 
      icon: ArrowDown, 
      color: 'text-yellow-400', 
      bgColor: 'bg-yellow-500/10',
      text: 'انخفاض طفيف' 
    };
    return { 
      icon: Minus, 
      color: 'text-gray-400', 
      bgColor: 'bg-gray-500/10',
      text: 'نفس المستوى' 
    };
  };

  const xpTrend = getTrendInfo(xpChange);
  const hoursTrend = getTrendInfo(hoursChange);

  // Get motivational message
  const getMotivationalMessage = () => {
    if (xpChange > 20) return "أداء استثنائي! استمر هكذا! 🚀";
    if (xpChange > 10) return "تحسن رائع من الأسبوع الماضي! 🌟";
    if (xpChange > 0) return "على الطريق الصحيح! واصل التقدم 💪";
    if (xpChange === 0) return "حافظ على وتيرتك المستقرة 📈";
    return "فرصة للعودة أقوى الأسبوع القادم! 💡";
  };

  return (
    <div className="space-y-4">
      {/* Main Comparison Section */}
      <div className="text-center">
        {/* Large Percentage Change */}
        <div className="relative mb-4">
          <div className="relative">
            {/* Animated Ring */}
            <svg width="140" height="140" viewBox="0 0 140 140" className="mx-auto">
              {/* Background ring */}
              <circle 
                cx="70" 
                cy="70" 
                r="60" 
                fill="none" 
                stroke="rgba(255,255,255,0.08)" 
                strokeWidth="6"
              />
              
              {/* Progress ring */}
              <circle 
                cx="70" 
                cy="70" 
                r="60" 
                fill="none" 
                stroke={xpChange >= 0 ? "#22c55e" : "#ef4444"}
                strokeWidth="6" 
                strokeLinecap="round"
                strokeDasharray="377"
                strokeDashoffset={377 - (377 * Math.abs(xpChange) / 100)}
                className="transition-all duration-1000 ease-out"
                style={{
                  filter: Math.abs(xpChange) > 15 ? 'drop-shadow(0 0 12px rgba(34,197,94,0.6))' : 'none'
                }}
              />
              
              {/* Center content */}
              <foreignObject x="20" y="35" width="100" height="70">
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="flex items-center gap-1 mb-1">
                    <xpTrend.icon className={`h-5 w-5 ${xpTrend.color}`} />
                    <span className={`text-2xl font-bold font-['Share_Tech_Mono'] ${xpTrend.color}`}>
                      {Math.abs(Math.round(xpChange))}%
                    </span>
                  </div>
                  <div className="text-xs text-gray-400 font-noto text-center">
                    من الأسبوع الماضي
                  </div>
                </div>
              </foreignObject>
            </svg>

            {/* Achievement badge for high improvement */}
            {xpChange > 25 && (
              <div className="absolute top-2 right-2 bg-yellow-500 rounded-full p-2 animate-pulse">
                <Star className="h-4 w-4 text-white" fill="white" />
              </div>
            )}
          </div>
        </div>

        {/* Motivational Message */}
        <div className="mb-4">
          <p className={`text-sm font-bold font-noto ${xpTrend.color}`}>
            {getMotivationalMessage()}
          </p>
        </div>
      </div>

      {/* Week Comparison Cards */}
      <div className="grid grid-cols-2 gap-3">
        {/* Current Week */}
        <div className="bg-[rgba(255,255,255,0.05)] rounded-xl p-3 border border-[#FF4800]/20">
          <div className="text-center">
            <div className="text-xs text-gray-400 font-noto mb-1">هذا الأسبوع</div>
            <div className="text-lg font-bold text-white font-['Share_Tech_Mono']">
              {currentWeekXP} XP
            </div>
            <div className="text-xs text-[#FF4800] font-['Share_Tech_Mono']">
              {currentWeekHours}h
            </div>
          </div>
        </div>

        {/* Previous Week */}
        <div className="bg-[rgba(255,255,255,0.03)] rounded-xl p-3 border border-gray-700">
          <div className="text-center">
            <div className="text-xs text-gray-400 font-noto mb-1">الأسبوع الماضي</div>
            <div className="text-lg font-bold text-gray-300 font-['Share_Tech_Mono']">
              {previousWeekXP} XP
            </div>
            <div className="text-xs text-gray-400 font-['Share_Tech_Mono']">
              {previousWeekHours}h
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Metrics */}
      <div className="bg-[rgba(255,255,255,0.03)] rounded-xl p-4">
        <div className="space-y-3">
          {/* XP Progress */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-[#FF4800]" />
              <span className="text-sm text-gray-300 font-noto">تقدم النقاط</span>
            </div>
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-['Share_Tech_Mono'] ${xpTrend.bgColor} ${xpTrend.color}`}>
              <xpTrend.icon className="h-3 w-3" />
              {Math.abs(Math.round(xpChange))}%
            </div>
          </div>

          {/* Hours Progress */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-[#FF4800]" />
              <span className="text-sm text-gray-300 font-noto">ساعات الدراسة</span>
            </div>
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-['Share_Tech_Mono'] ${hoursTrend.bgColor} ${hoursTrend.color}`}>
              <hoursTrend.icon className="h-3 w-3" />
              {Math.abs(Math.round(hoursChange))}%
            </div>
          </div>

          {/* Streak */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame className="h-4 w-4 text-[#FF4800]" />
              <span className="text-sm text-gray-300 font-noto">الأيام المتتالية</span>
            </div>
            <div className="flex items-center gap-1 px-2 py-1 bg-[#FF4800]/10 rounded-full text-xs text-[#FF4800] font-['Share_Tech_Mono']">
              {streak} أيام
            </div>
          </div>
        </div>
      </div>

      {/* Goal Progress Bar */}
      <div className="bg-[rgba(255,255,255,0.03)] rounded-xl p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-400 font-noto">هدف الأسبوع</span>
          <span className="text-xs text-[#FF4800] font-['Share_Tech_Mono']">
            {currentWeekXP}/{weeklyGoal} XP
          </span>
        </div>
        
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#FF4800] to-[#FF6B35] rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        
        <div className="mt-1 text-center">
          <span className="text-xs text-gray-400 font-noto">
            {Math.round(progressPercentage)}% مُكمل
          </span>
        </div>
      </div>

      {/* Achievement Indicators */}
      {(xpChange > 15 || hoursChange > 20 || streak >= 7) && (
        <div className="flex flex-wrap gap-2 justify-center">
          {xpChange > 15 && (
            <div className="flex items-center gap-1 py-1 px-2 bg-green-500/10 rounded-full text-[10px] text-green-400 border border-green-500/20 font-noto">
              <TrendingUp className="h-2.5 w-2.5" />
              تحسن ملحوظ
            </div>
          )}
          
          {hoursChange > 20 && (
            <div className="flex items-center gap-1 py-1 px-2 bg-blue-500/10 rounded-full text-[10px] text-blue-400 border border-blue-500/20 font-noto">
              <Clock className="h-2.5 w-2.5" />
              مجتهد
            </div>
          )}
          
          {streak >= 7 && (
            <div className="flex items-center gap-1 py-1 px-2 bg-[#FF4800]/10 rounded-full text-[10px] text-[#FF4800] border border-[#FF4800]/20 font-noto">
              <Flame className="h-2.5 w-2.5" />
              نار قوية
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WeeklyProgressComparison;
