
import React from 'react';
import { Award, Star, Trophy, Zap, Target, BookOpen } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const RecentAchievements = () => {
  const achievements = [
    {
      id: 1,
      title: 'عالم الرياضيات',
      description: 'أكمل 50 تمرين رياضيات',
      icon: Target,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
      rarity: 'نادر',
      xpReward: 200,
      dateEarned: 'اليوم',
      isNew: true
    },
    {
      id: 2,
      title: 'سلسلة الانتصارات',
      description: 'حافظ على نشاطك لمدة 7 أيام',
      icon: Zap,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/20',
      rarity: 'شائع',
      xpReward: 150,
      dateEarned: 'أمس',
      isNew: false
    },
    {
      id: 3,
      title: 'قارئ نهم',
      description: 'أكمل 10 دروس في الأدب',
      icon: BookOpen,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20',
      rarity: 'عادي',
      xpReward: 100,
      dateEarned: 'منذ يومين',
      isNew: false
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch(rarity) {
      case 'نادر': return 'text-purple-400 bg-purple-500/20';
      case 'شائع': return 'text-yellow-400 bg-yellow-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  return (
    <Card className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-purple-500/5"></div>
      
      <CardContent className="p-4 relative z-10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-white font-changa flex items-center gap-2">
            <Trophy className="h-5 w-5 text-[#FF4800]" />
            إنجازات حديثة
          </h3>
          
          <div className="flex items-center gap-1 bg-[#FF4800]/10 rounded-full px-2 py-1">
            <Star className="h-3 w-3 text-[#FF4800]" />
            <span className="text-xs text-[#FF4800] font-['Share_Tech_Mono']">+450 XP</span>
          </div>
        </div>

        <div className="space-y-3">
          {achievements.map((achievement) => {
            const Icon = achievement.icon;
            return (
              <div 
                key={achievement.id}
                className="relative flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all group"
              >
                {achievement.isNew && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#FF4800] rounded-full animate-pulse border-2 border-[#0C0E1A]"></div>
                )}
                
                {/* Achievement Icon */}
                <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${achievement.bgColor} group-hover:scale-110 transition-transform`}>
                  <Icon className={`h-6 w-6 ${achievement.color}`} />
                </div>
                
                {/* Achievement Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-bold text-white font-changa truncate">
                      {achievement.title}
                    </h4>
                    <span className="text-xs text-[#FF4800] font-['Share_Tech_Mono']">
                      +{achievement.xpReward} XP
                    </span>
                  </div>
                  
                  <p className="text-xs text-gray-400 font-noto mb-2 truncate">
                    {achievement.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-noto ${getRarityColor(achievement.rarity)}`}>
                      {achievement.rarity}
                    </span>
                    <span className="text-xs text-gray-500 font-noto">
                      {achievement.dateEarned}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
      
      <CardFooter className="bg-white/5 border-t border-white/10">
        <Button variant="ghost" className="w-full text-[#FF4800] hover:text-[#FF4800] hover:bg-[#FF4800]/10 font-changa">
          عرض جميع الإنجازات
          <Award className="h-4 w-4 mr-2" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecentAchievements;
