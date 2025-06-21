
import React from 'react';
import { Calendar, Clock, Trophy, Zap, Star, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const WelcomeBanner = () => {
  const currentTime = new Date();
  const hour = currentTime.getHours();
  
  const getGreeting = () => {
    if (hour < 12) return 'صباح الخير';
    if (hour < 17) return 'مساء الخير';
    return 'مساء الخير';
  };

  const getMotivationalMessage = () => {
    if (hour < 12) return 'ابدأ يومك بقوة! لديك فرصة رائعة للتعلم اليوم.';
    if (hour < 17) return 'استمر في التقدم! أنت تحقق نتائج رائعة.';
    return 'أنهِ يومك بإنجاز! كل دقيقة تعلم تقربك من هدفك.';
  };

  return (
    <Card className="overflow-hidden relative bg-gradient-to-r from-[#FF4800]/20 via-purple-500/10 to-blue-500/10 border border-[#FF4800]/20">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#FF4800]/30 to-transparent rounded-full blur-2xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-500/30 to-transparent rounded-full blur-xl"></div>
      
      <CardContent className="p-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Welcome Content */}
          <div className="flex-1 text-center md:text-right">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <Star className="h-6 w-6 text-yellow-400 animate-pulse" />
              <h1 className="text-2xl font-bold text-white font-changa">
                {getGreeting()}، شادي! 👋
              </h1>
            </div>
            
            <p className="text-gray-300 text-lg mb-4 font-noto">
              {getMotivationalMessage()}
            </p>
            
            {/* Quick Stats Row */}
            <div className="flex items-center justify-center md:justify-start gap-4 flex-wrap">
              <div className="flex items-center gap-2 bg-white/10 rounded-full py-2 px-4">
                <Trophy className="h-4 w-4 text-[#FF4800]" />
                <span className="text-white text-sm font-['Share_Tech_Mono']">Level 5</span>
              </div>
              
              <div className="flex items-center gap-2 bg-white/10 rounded-full py-2 px-4">
                <Zap className="h-4 w-4 text-yellow-400" />
                <span className="text-white text-sm font-['Share_Tech_Mono']">2450 XP</span>
              </div>
              
              <div className="flex items-center gap-2 bg-white/10 rounded-full py-2 px-4">
                <TrendingUp className="h-4 w-4 text-green-400" />
                <span className="text-white text-sm font-['Share_Tech_Mono']">نمو +15%</span>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <Button className="shimmer-button bg-[#FF4800] hover:bg-[#FF4800]/90 text-white px-6 py-3 rounded-xl font-changa">
              <Calendar className="h-4 w-4 mr-2" />
              ابدأ الدراسة اليوم
            </Button>
            
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 px-6 py-2 rounded-xl font-changa">
              <Clock className="h-4 w-4 mr-2" />
              عرض الجدول
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WelcomeBanner;
