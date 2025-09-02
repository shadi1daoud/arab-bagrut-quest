
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Target, Star, Gift, Lightbulb } from 'lucide-react';

interface QuickAction {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  onClick: () => void;
}

const QuickActionsCard: React.FC = () => {
  const actions: QuickAction[] = [
    {
      id: 'daily-quest',
      title: 'مهمة اليوم',
      icon: <Target className="h-5 w-5" />,
      color: 'bg-[#FF4800]/10 text-[#FF4800]',
      onClick: () => console.log('Daily quest clicked')
    },
    {
      id: 'practice',
      title: 'تمارين سريعة',
      icon: <Star className="h-5 w-5" />,
      color: 'bg-blue-500/10 text-blue-400',
      onClick: () => console.log('Practice clicked')
    },
    {
      id: 'rewards',
      title: 'المكافآت',
      icon: <Gift className="h-5 w-5" />,
      color: 'bg-yellow-500/10 text-yellow-400',
      onClick: () => console.log('Rewards clicked')
    },
    {
      id: 'tips',
      title: 'نصائح ذكية',
      icon: <Lightbulb className="h-5 w-5" />,
      color: 'bg-green-500/10 text-green-400',
      onClick: () => console.log('Tips clicked')
    }
  ];

  return (
    <Card>
      <CardContent className="p-3">
        <div className="grid grid-cols-2 gap-2">
          {actions.map((action) => (
            <Button
              key={action.id}
              variant="ghost"
              className={`h-16 flex-col gap-1 ${action.color} hover:bg-opacity-20 transition-all`}
              onClick={action.onClick}
            >
              {action.icon}
              <span className="text-xs font-changa">{action.title}</span>
            </Button>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <h3 className="text-sm font-bold text-white font-changa">
          إجراءات سريعة
        </h3>
      </CardFooter>
    </Card>
  );
};

export default QuickActionsCard;
