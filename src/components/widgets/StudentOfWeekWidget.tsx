
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, Star } from 'lucide-react';

const StudentOfWeekWidget: React.FC = () => {
  const student = {
    name: 'سارة أحمد',
    avatar: '👧',
    reason: 'تفوق في الرياضيات وحل 50 مسألة',
    xp: 2450,
    level: 15
  };

  return (
    <Card className="bg-gradient-to-br from-[#FF4800]/20 to-[#FF4800]/5 border-[#FF4800]/30">
      <CardContent className="p-3">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-12 w-12 rounded-full bg-[#FF4800]/20 flex items-center justify-center text-2xl ring-2 ring-[#FF4800]/50">
            {student.avatar}
          </div>
          <div className="flex-1">
            <h4 className="text-white font-bold text-sm font-changa">{student.name}</h4>
            <p className="text-xs text-gray-300 font-noto line-clamp-1">{student.reason}</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Badge className="bg-[#FF4800]/20 text-[#FF4800] text-xs">
            المستوى {student.level}
          </Badge>
          <div className="flex items-center gap-1 text-xs text-gray-300">
            <Star className="h-3 w-3 text-yellow-400" />
            {student.xp.toLocaleString()} XP
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
