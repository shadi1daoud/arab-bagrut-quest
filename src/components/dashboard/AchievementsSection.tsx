
import React from 'react';
import { Trophy, Medal, Star, Target, Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface Achievement {
  id: string;
  title: string;
  description: string;
  progress: number;
  maxProgress: number;
  completed: boolean;
  icon: string;
  rarity: 'bronze' | 'silver' | 'gold' | 'platinum';
  xpReward: number;
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  requiredValue: number;
  currentValue: number;
  completed: boolean;
  locked: boolean;
}

interface AchievementsSectionProps {
  recentAchievements: Achievement[];
  nextMilestone: Milestone;
}

const AchievementsSection: React.FC<AchievementsSectionProps> = ({ 
  recentAchievements, 
  nextMilestone 
}) => {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'platinum': return '#E5E7EB';
      case 'gold': return '#FFD700';
      case 'silver': return '#C0C0C0';
      default: return '#CD7F32';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-white font-changa">
          <Trophy className="w-5 h-5 text-[#FF4800]" />
          الإنجازات والأهداف
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Recent Achievements */}
        <div>
          <h4 className="text-sm font-medium text-gray-300 mb-3 font-changa">
            إنجازات حديثة
          </h4>
          <div className="space-y-2">
            {recentAchievements.slice(0, 2).map((achievement) => (
              <div 
                key={achievement.id}
                className={`p-3 rounded-xl border transition-all duration-300 ${
                  achievement.completed 
                    ? 'bg-gradient-to-r from-[#FFD700]/10 to-transparent border-[#FFD700]/30' 
                    : 'bg-black/20 border-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                    style={{ 
                      backgroundColor: achievement.completed 
                        ? `${getRarityColor(achievement.rarity)}20` 
                        : 'rgba(255, 255, 255, 0.05)'
                    }}
                  >
                    {achievement.completed ? (
                      <Medal 
                        className="w-5 h-5" 
                        style={{ color: getRarityColor(achievement.rarity) }}
                        fill="currentColor"
                      />
                    ) : (
                      <Target className="w-5 h-5 text-gray-400" />
                    )}
                  </div>

                  <div className="flex-1">
                    <h5 className={`font-medium text-sm font-changa ${
                      achievement.completed ? 'text-[#FFD700]' : 'text-white'
                    }`}>
                      {achievement.title}
                    </h5>
                    <p className="text-xs text-gray-400 mb-2 font-noto">
                      {achievement.description}
                    </p>

                    {!achievement.completed && (
                      <div className="mb-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-gray-400 font-noto">التقدم</span>
                          <span className="text-xs text-[#FF4800] font-['Share_Tech_Mono']">
                            {achievement.progress}/{achievement.maxProgress}
                          </span>
                        </div>
                        <Progress value={(achievement.progress / achievement.maxProgress) * 100} className="h-1" />
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-400 font-noto">
                        +{achievement.xpReward} XP
                      </div>
                      {achievement.completed && (
                        <div className="flex items-center gap-1 text-xs text-[#FFD700]">
                          <Star className="w-3 h-3" fill="currentColor" />
                          مكتمل
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Milestone */}
        <div>
          <h4 className="text-sm font-medium text-gray-300 mb-3 font-changa">
            الهدف التالي
          </h4>
          <div className="p-4 rounded-xl bg-gradient-to-r from-[#FF4800]/10 to-transparent border border-[#FF4800]/30">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#FF4800]/20 rounded-xl flex items-center justify-center">
                {nextMilestone.locked ? (
                  <Lock className="w-6 h-6 text-gray-400" />
                ) : (
                  <Target className="w-6 h-6 text-[#FF4800]" />
                )}
              </div>

              <div className="flex-1">
                <h5 className="text-white font-medium font-changa mb-1">
                  {nextMilestone.title}
                </h5>
                <p className="text-xs text-gray-400 mb-3 font-noto">
                  {nextMilestone.description}
                </p>

                {!nextMilestone.locked && (
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-gray-400 font-noto">التقدم</span>
                      <span className="text-xs text-[#FF4800] font-['Share_Tech_Mono']">
                        {nextMilestone.currentValue}/{nextMilestone.requiredValue}
                      </span>
                    </div>
                    <Progress 
                      value={(nextMilestone.currentValue / nextMilestone.requiredValue) * 100} 
                      className="h-2" 
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AchievementsSection;
