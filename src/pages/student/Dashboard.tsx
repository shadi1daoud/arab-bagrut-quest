import React, { useState } from 'react';
import { Activity, Award, BookOpen, Clock, Trophy, TrendingUp, Target, Flame, Star } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import StatsCard from '@/components/StatsCard';
import WeeklyProgress from '@/components/WeeklyProgress';
import AdCard from '@/components/AdCard';
import WeeklyChart from '@/components/WeeklyChart';
import Leaderboard from '@/components/Leaderboard';
import CourseProgress from '@/components/CourseProgress';
import StudentOfWeekWidget from '@/components/widgets/StudentOfWeekWidget';
import DailyMotivationCard from '@/components/widgets/DailyMotivationCard';
import StreakCounter from '@/components/widgets/StreakCounter';
import TodayGoalsCard from '@/components/widgets/TodayGoalsCard';

// Weekly activity data
const weeklyActivity = [{
  day: 'الأحد',
  xp: 12
}, {
  day: 'الإثنين',
  xp: 8
}, {
  day: 'الثلاثاء',
  xp: 5
}, {
  day: 'الأربعاء',
  xp: 6
}, {
  day: 'الخميس',
  xp: 9
}, {
  day: 'الجمعة',
  xp: 4
}, {
  day: 'السبت',
  xp: 7
}];

// Leaderboard data
const leaderboardData = [{
  id: 1,
  name: 'سارة',
  level: 15,
  xp: 8450,
  avatar: '👧',
  rank: 1,
  streak: 5,
  badge: 'legendary'
}, {
  id: 2,
  name: 'محمد',
  level: 14,
  xp: 7920,
  avatar: '👦',
  rank: 2,
  streak: 3,
  badge: 'master'
}, {
  id: 3,
  name: 'أحمد',
  level: 12,
  xp: 6540,
  avatar: '👨',
  rank: 3,
  badge: 'expert'
}];

// Course progress data
const courseProgress = [{
  id: 1,
  name: 'رياضيات',
  progress: 75
}, {
  id: 2,
  name: 'إنجليزي',
  progress: 45
}, {
  id: 3,
  name: 'فيزياء',
  progress: 60
}, {
  id: 4,
  name: 'كيمياء',
  progress: 28
}];
const Dashboard = () => {
  const [leaderboardFilter, setLeaderboardFilter] = useState('week');

  // Calculate total weekly hours and XP
  const totalWeeklyHours = '8.7';
  const totalWeeklyXP = '870';
  return <ScrollArea className="h-full w-full">
      <div className="grid grid-cols-12 gap-4 pb-4 px-4">
        {/* LEFT COLUMN - 4 cols */}
        <div className="col-span-12 md:col-span-4 flex flex-col gap-4">
          {/* Profile Card with Stats */}
          <Card>
            <CardContent className="p-3">
              <StatsCard name="شادي داود" level={5} grade="الثاني عشر - دار الأرقم" xp={2450} maxXp={3000} effort={12} points={8900} iq={8.9} />
            </CardContent>
          </Card>
          
          {/* Daily Goals & Streak */}
          
          
          {/* Weekly Progress */}
          <Card>
            <CardContent className="p-3">
              <WeeklyProgress weeklyData={weeklyActivity} totalWeeklyXP={51} weeklyGoal={100} studyHours={8.7} streak={5} />
            </CardContent>
            <CardFooter>
              <h3 className="text-sm font-bold text-white font-changa flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-[#FF4800]" strokeWidth={2} />
                التقدم الأسبوعي
              </h3>
              <Button variant="link" className="text-xs text-[#FF4800] p-0 h-auto">عرض التفاصيل</Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* MIDDLE COLUMN - 4 cols */}
        <div className="col-span-12 md:col-span-4 flex flex-col gap-4">
          {/* Weekly Activity Chart */}
          <Card>
            <CardContent className="p-3">
              <div className="flex-1 flex flex-col">
                <div className="h-36 w-full">
                  <WeeklyChart data={weeklyActivity} />
                </div>
                
                <div className="flex items-center gap-2 mt-2">
                  <div className="py-1 px-2 bg-[#FF4800]/10 rounded-full text-xs text-[#FF4800] font-['Share_Tech_Mono'] flex items-center gap-1">
                    <Clock className="h-3 w-3 text-[#FF4800]" />
                    {totalWeeklyHours} ساعة
                  </div>
                  
                  <div className="py-1 px-2 bg-[#FF4800]/10 rounded-full text-xs text-[#FF4800] font-['Share_Tech_Mono'] flex items-center gap-1">
                    +{totalWeeklyXP} XP
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <h3 className="text-sm font-bold text-white font-changa flex items-center gap-2">
                <Activity className="h-4 w-4 text-[#FF4800]" strokeWidth={2} />
                إنجاز أسبوعي
              </h3>
              <Button variant="link" className="text-xs text-[#FF4800] p-0 h-auto">عرض التفاصيل</Button>
            </CardFooter>
          </Card>
          
          {/* Course Progress */}
          <Card>
            <CardContent className="p-3">
              <CourseProgress courses={courseProgress} />
            </CardContent>
            <CardFooter>
              <h3 className="text-sm font-bold text-white font-changa flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-[#FF4800]" strokeWidth={2} />
                تقدم الكورسات
              </h3>
              <Button variant="link" className="text-xs text-[#FF4800] p-0 h-auto">عرض الكل</Button>
            </CardFooter>
          </Card>

          {/* Daily Motivational Quote */}
          <Card>
            <CardContent className="p-3">
              <DailyMotivationCard />
            </CardContent>
          </Card>
        </div>
        
        {/* RIGHT COLUMN - 4 cols */}
        <div className="col-span-12 md:col-span-4 flex flex-col gap-4">
          {/* Student of the Week */}
          <StudentOfWeekWidget />
          
          {/* Leaderboard */}
          <Card>
            <CardContent className="p-3">
              <Leaderboard data={leaderboardData} filter={leaderboardFilter} onFilterChange={setLeaderboardFilter} />
            </CardContent>
            <CardFooter>
              <h3 className="text-sm font-bold text-white font-changa flex items-center gap-2">
                <Trophy className="h-4 w-4 text-[#FF4800]" strokeWidth={2} />
                المتصدرون
              </h3>
              <Button variant="link" className="text-xs text-[#FF4800] p-0 h-auto">عرض المزيد</Button>
            </CardFooter>
          </Card>
          
          {/* Ad Space */}
          <Card>
            <CardContent className="p-3">
              <AdCard />
            </CardContent>
          </Card>
        </div>
      </div>
    </ScrollArea>;
};
export default Dashboard;