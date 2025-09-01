
import React from 'react';
import { Award, Star, Trophy, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface StudentOfWeekProps {
  student: {
    name: string;
    avatar: string;
    reason: string;
    xp: number;
    level: number;
    badge: string;
    badgeIcon: string;
  };
}

export const StudentOfWeek: React.FC<StudentOfWeekProps> = ({ student }) => {
  return (
    <Card rarity="legendary" className="bg-gradient-to-br from-[#FF4B1A]/20 to-[#FFA56E]/10 border-[#FF4B1A]/30 overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row justify-between items-center p-4">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <div className="relative">
              <div className="h-16 w-16 rounded-full bg-[#FF4B1A]/30 flex items-center justify-center text-3xl ring-2 ring-[#FF4B1A]/50 shadow-[0_0_15px_rgba(255,75,26,0.4)]">
                {student.avatar}
                <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-[#FF4B1A] flex items-center justify-center text-white text-xs">
                  {student.badgeIcon}
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-[#FF4B1A]" />
                <h2 className="text-xl font-changa text-white">طالب الأسبوع</h2>
              </div>
              <h3 className="text-lg font-bold text-white">{student.name}</h3>
              <p className="text-sm text-gray-300">{student.reason}</p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex flex-col items-center md:items-end">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-[#FF4B1A]" />
                <span className="text-white font-share-tech text-lg">{student.xp.toLocaleString()} XP</span>
              </div>
              <div className="flex items-center gap-1">
                <Trophy className="h-4 w-4 text-yellow-400" />
                <span className="text-white font-share-tech">Lv {student.level}</span>
              </div>
            </div>
            
            <Button className="text-sm">
              عرض الملف
              <ExternalLink className="h-4 w-4 mr-1" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentOfWeek;
