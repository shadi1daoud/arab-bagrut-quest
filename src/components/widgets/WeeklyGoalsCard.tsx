
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Target, Check } from 'lucide-react';

interface WeeklyGoal {
  id: string;
  title: string;
  current: number;
  target: number;
  completed: boolean;
}

const WeeklyGoalsCard: React.FC = () => {
  const goals: WeeklyGoal[] = [
    {
      id: 'study-hours',
      title: 'ساعات الدراسة',
      current: 12,
      target: 20,
      completed: false
    },
    {
      id: 'exercises',
      title: 'التمارين المحلولة',
      current: 45,
      target: 50,
      completed: false
    },
    {
      id: 'quizzes',
      title: 'الاختبارات',
      current: 3,
      target: 3,
      completed: true
    }
  ];

  return (
    <Card>
      <CardContent className="p-3">
        <div className="space-y-3">
          {goals.map((goal) => {
            const progress = (goal.current / goal.target) * 100;
            return (
              <div key={goal.id} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white font-changa">
                    {goal.title}
                  </span>
                  <div className="flex items-center gap-1">
                    {goal.completed && (
                      <Check className="h-3 w-3 text-green-400" />
                    )}
                    <span className="text-xs text-gray-400 font-['Share_Tech_Mono']">
                      {goal.current}/{goal.target}
                    </span>
                  </div>
                </div>
                <Progress 
                  value={progress} 
                  className="h-2" 
                />
              </div>
            );
          })}
        </div>
      </CardContent>
      <CardFooter>
        <h3 className="text-sm font-bold text-white font-changa flex items-center gap-2">
          <Target className="h-4 w-4 text-[#FF4800]" strokeWidth={2} />
          أهداف الأسبوع
        </h3>
      </CardFooter>
    </Card>
  );
};

export default WeeklyGoalsCard;
