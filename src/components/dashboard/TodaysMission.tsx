
import React from 'react';
import { Target, Clock, Award, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface Mission {
  id: string;
  title: string;
  description: string;
  progress: number;
  maxProgress: number;
  xpReward: number;
  timeEstimate: string;
  completed: boolean;
}

interface TodaysMissionProps {
  missions: Mission[];
}

const TodaysMission: React.FC<TodaysMissionProps> = ({ missions }) => {
  const completedMissions = missions.filter(m => m.completed).length;
  const totalMissions = missions.length;
  const overallProgress = (completedMissions / totalMissions) * 100;

  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-white font-changa">
            <Target className="w-5 h-5 text-[#FF4800]" />
            مهام اليوم
          </CardTitle>
          <div className="text-sm text-[#FF4800] font-['Share_Tech_Mono']">
            {completedMissions}/{totalMissions}
          </div>
        </div>
        <Progress value={overallProgress} className="h-2" />
      </CardHeader>

      <CardContent className="space-y-3">
        {missions.map((mission) => (
          <div 
            key={mission.id}
            className={`p-4 rounded-xl border transition-all duration-300 ${
              mission.completed 
                ? 'bg-green-900/20 border-green-500/30' 
                : 'bg-black/20 border-white/5 hover:border-[#FF4800]/30'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                mission.completed ? 'bg-green-500' : 'bg-[#FF4800]/10'
              }`}>
                {mission.completed ? (
                  <CheckCircle className="w-4 h-4 text-white" fill="currentColor" />
                ) : (
                  <Target className="w-4 h-4 text-[#FF4800]" />
                )}
              </div>

              <div className="flex-1">
                <h4 className={`font-medium font-changa text-sm ${
                  mission.completed ? 'text-green-400' : 'text-white'
                }`}>
                  {mission.title}
                </h4>
                <p className="text-xs text-gray-400 mb-2 font-noto">
                  {mission.description}
                </p>

                {!mission.completed && (
                  <div className="mb-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-400 font-noto">التقدم</span>
                      <span className="text-xs text-[#FF4800] font-['Share_Tech_Mono']">
                        {mission.progress}/{mission.maxProgress}
                      </span>
                    </div>
                    <Progress value={(mission.progress / mission.maxProgress) * 100} className="h-1" />
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {mission.timeEstimate}
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      +{mission.xpReward} XP
                    </div>
                  </div>

                  {!mission.completed && (
                    <Button 
                      size="sm" 
                      className="h-7 px-3 text-xs bg-[#FF4800] hover:bg-[#CC3900]"
                    >
                      ابدأ
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default TodaysMission;
