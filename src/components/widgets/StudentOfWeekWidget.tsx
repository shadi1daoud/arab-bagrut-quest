
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, Star } from 'lucide-react';

interface StudentOfWeekWidgetProps {
  leaderboardData?: Array<{
    userId: string;
    rank: number;
    score: number;
    name: string;
    avatar?: string;
  }>;
}

const StudentOfWeekWidget: React.FC<StudentOfWeekWidgetProps> = ({ leaderboardData = [] }) => {
  // Get the top student from leaderboard, or use default if no data
  const topStudent = leaderboardData.length > 0 ? leaderboardData[0] : {
    name: 'لا يوجد طالب الأسبوع',
    avatar: '👤',
    score: 0,
    rank: 0
  };

  return (
    <Card className="bg-gradient-to-br from-[#FF4800]/20 to-[#FF4800]/5 border-[#FF4800]/30">
      <CardContent className="p-3">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-12 w-12 rounded-full bg-[#FF4800]/20 flex items-center justify-center text-2xl ring-2 ring-[#FF4800]/50">
            {topStudent.avatar || '👤'}
          </div>
          <div className="flex-1">
            <h4 className="text-white font-bold text-sm font-changa">{topStudent.name}</h4>
            <p className="text-xs text-gray-300 font-noto line-clamp-1">
              {leaderboardData.length > 0 ? `المركز الأول - ${topStudent.score} نقطة` : 'لا توجد بيانات متاحة'}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Badge className="bg-[#FF4800]/20 text-[#FF4800] text-xs">
            المركز {topStudent.rank || 1}
          </Badge>
          <div className="flex items-center gap-1 text-xs text-gray-300">
            <Star className="h-3 w-3 text-yellow-400" />
            {topStudent.score.toLocaleString()} XP
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <h3 className="text-sm font-bold text-white font-changa flex items-center gap-2">
          <Award className="h-4 w-4 text-[#FF4800]" strokeWidth={2} />
          طالب الأسبوع
        </h3>
      </CardFooter>
    </Card>
  );
};

export default StudentOfWeekWidget;
