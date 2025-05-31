
import React from 'react';
import { Flame, Target, Star, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface HeroZoneProps {
  userName: string;
  level: number;
  xp: number;
  maxXp: number;
  streak: number;
  nextLevelReward: string;
}

const HeroZone: React.FC<HeroZoneProps> = ({ 
  userName, 
  level, 
  xp, 
  maxXp, 
  streak, 
  nextLevelReward 
}) => {
  const xpProgress = (xp / maxXp) * 100;

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-[#1A1D2F] via-[#2A2D4A] to-[#1A1D2F] border-[#FF4800]/20">
      <CardContent className="p-6">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-4 w-32 h-32 bg-[#FF4800] rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-4 left-4 w-24 h-24 bg-[#00FFE1] rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10">
          {/* Welcome Message */}
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-white font-changa mb-1">
              أهلاً بعودتك، {userName}! 👋
            </h1>
            <p className="text-gray-400 text-sm font-noto">
              مستعد لتحقيق إنجازات جديدة اليوم؟
            </p>
          </div>

          {/* Level Progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#FF4800] rounded-lg flex items-center justify-center">
                  <Star className="w-4 h-4 text-white" fill="currentColor" />
                </div>
                <span className="text-white font-bold font-changa">المستوى {level}</span>
              </div>
              <span className="text-sm text-[#FF4800] font-['Share_Tech_Mono']">
                {xp.toLocaleString()}/{maxXp.toLocaleString()} XP
              </span>
            </div>
            <Progress value={xpProgress} className="h-3 mb-2" />
            <p className="text-xs text-gray-400 font-noto">
              {(maxXp - xp).toLocaleString()} XP للمستوى التالي • المكافأة: {nextLevelReward}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            {/* Streak */}
            <div className="bg-black/20 rounded-xl p-4 border border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#FF4800]/10 rounded-lg flex items-center justify-center">
                  <Flame className="w-5 h-5 text-[#FF4800]" />
                </div>
                <div>
                  <div className="text-xl font-bold text-white font-['Share_Tech_Mono']">{streak}</div>
                  <div className="text-xs text-gray-400 font-noto">أيام متتالية</div>
                </div>
              </div>
            </div>

            {/* Today's Target */}
            <div className="bg-black/20 rounded-xl p-4 border border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#00FFE1]/10 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-[#00FFE1]" />
                </div>
                <div>
                  <div className="text-xl font-bold text-white font-['Share_Tech_Mono']">3/5</div>
                  <div className="text-xs text-gray-400 font-noto">مهام اليوم</div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-6">
            <Button className="w-full bg-gradient-to-r from-[#FF4800] to-[#CC3900] hover:from-[#CC3900] hover:to-[#FF4800] transition-all duration-300 text-white font-changa text-sm h-12">
              ابدأ التعلم الآن
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HeroZone;
