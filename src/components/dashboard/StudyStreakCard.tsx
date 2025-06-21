
import React from 'react';
import { Flame, Calendar, Target, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface StudyStreakCardProps {
  currentStreak: number;
  bestStreak: number;
}

const StudyStreakCard: React.FC<StudyStreakCardProps> = ({ currentStreak, bestStreak }) => {
  const streakPercentage = (currentStreak / bestStreak) * 100;
  const nextMilestone = Math.ceil(currentStreak / 5) * 5; // Next multiple of 5
  const daysToMilestone = nextMilestone - currentStreak;

  return (
    <Card className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-red-500/10"></div>
      
      <CardContent className="p-4 relative z-10">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-white font-changa flex items-center gap-2">
            <Flame className="h-4 w-4 text-[#FF4800]" />
            سلسلة الدراسة
          </h3>
          
          <div className="flex items-center gap-1 bg-[#FF4800]/10 rounded-full px-2 py-1">
            <Flame className="h-3 w-3 text-[#FF4800] animate-pulse" />
            <span className="text-xs text-[#FF4800] font-['Share_Tech_Mono']">{currentStreak} يوم</span>
          </div>
        </div>

        {/* Current Streak Display */}
        <div className="text-center mb-4">
          <div className="relative inline-block">
            <div className="text-3xl font-bold text-[#FF4800] font-['Share_Tech_Mono']">
              {currentStreak}
            </div>
            <div className="text-xs text-gray-400 font-noto">يوم متتالي</div>
            
            {/* Flame animation for high streaks */}
            {currentStreak >= 7 && (
              <div className="absolute -top-2 -right-2">
                <Flame className="h-5 w-5 text-orange-400 animate-bounce" />
              </div>
            )}
          </div>
        </div>

        {/* Progress to next milestone */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-gray-400 font-noto">التقدم نحو {nextMilestone} يوم</span>
            <span className="text-xs text-[#FF4800] font-['Share_Tech_Mono']">
              {daysToMilestone} يوم متبقي
            </span>
          </div>
          <Progress value={(currentStreak / nextMilestone) * 100} className="h-2" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white/5 rounded-lg p-2 text-center">
            <Calendar className="h-3 w-3 text-blue-400 mx-auto mb-1" />
            <div className="text-sm font-bold text-white font-['Share_Tech_Mono']">{bestStreak}</div>
            <div className="text-xs text-gray-400 font-noto">أفضل سلسلة</div>
          </div>
          
          <div className="bg-white/5 rounded-lg p-2 text-center">
            <Target className="h-3 w-3 text-green-400 mx-auto mb-1" />
            <div className="text-sm font-bold text-white font-['Share_Tech_Mono']">{nextMilestone}</div>
            <div className="text-xs text-gray-400 font-noto">الهدف القادم</div>
          </div>
          
          <div className="bg-white/5 rounded-lg p-2 text-center">
            <TrendingUp className="h-3 w-3 text-yellow-400 mx-auto mb-1" />
            <div className="text-sm font-bold text-white font-['Share_Tech_Mono']">{streakPercentage.toFixed(0)}%</div>
            <div className="text-xs text-gray-400 font-noto">من الأفضل</div>
          </div>
        </div>

        {/* Motivational message */}
        <div className="mt-3 text-center">
          {currentStreak >= 7 ? (
            <p className="text-xs text-green-400 font-noto">🔥 أداء رائع! استمر هكذا!</p>
          ) : currentStreak >= 3 ? (
            <p className="text-xs text-yellow-400 font-noto">⭐ بداية قوية! لا تتوقف!</p>
          ) : (
            <p className="text-xs text-gray-400 font-noto">💪 ابدأ سلسلتك اليوم!</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StudyStreakCard;
