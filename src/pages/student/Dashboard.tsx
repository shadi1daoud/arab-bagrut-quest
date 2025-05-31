
import React, { useState } from 'react';
import { Activity, Award, BookOpen, Calendar, Clock, Target, Trophy } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import StatsCard from '@/components/StatsCard';
import IntelligenceScore from '@/components/IntelligenceScore';
import AdCard from '@/components/AdCard';
import WeeklyChart from '@/components/WeeklyChart';
import DailyQuest from '@/components/DailyQuest';
import Leaderboard from '@/components/Leaderboard';
import CourseProgress from '@/components/CourseProgress';
import AnnouncementCard from '@/components/widgets/AnnouncementCard';
import QuickActionsCard from '@/components/widgets/QuickActionsCard';
import WeeklyGoalsCard from '@/components/widgets/WeeklyGoalsCard';
import NotificationsDropdown from '@/components/widgets/NotificationsDropdown';
import StudentOfWeekWidget from '@/components/widgets/StudentOfWeekWidget';

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

// Announcements data
const announcements = [
  {
    title: 'امتحان الرياضيات قريباً',
    content: 'سيكون امتحان الرياضيات يوم الأحد القادم في تمام الساعة 10 صباحاً',
    type: 'important' as const,
    timestamp: 'منذ ساعتين',
    isNew: true
  },
  {
    title: 'تحديث جديد للمنصة',
    content: 'تم إضافة ميزات جديدة لتحسين تجربة التعلم',
    type: 'info' as const,
    timestamp: 'منذ يوم',
    isNew: false
  }
];

const Dashboard = () => {
  const [leaderboardFilter, setLeaderboardFilter] = useState('week');

  // Calculate total weekly hours and XP
  const totalWeeklyHours = '8.7';
  const totalWeeklyXP = '870';
  
  return (
    <ScrollArea className="h-full w-full">
      {/* Header with notifications */}
      <div className="flex justify-between items-center mb-4 px-4 py-2">
        <div>
          <h1 className="text-2xl font-bold text-white font-changa">مرحباً شادي! 👋</h1>
          <p className="text-gray-400 text-sm font-noto">استمر في رحلة التعلم المميزة</p>
        </div>
        <NotificationsDropdown />
      </div>

      <div className="grid grid-cols-12 gap-4 pb-4 px-4">
        {/* LEFT COLUMN - 3 cols */}
        <div className="col-span-12 md:col-span-3 flex flex-col gap-4">
          {/* Profile Card with Stats */}
          <Card>
            <CardContent className="p-3">
              <StatsCard name="شادي داود" level={5} grade="الثاني عشر - دار الأرقم" xp={2450} maxXp={3000} effort={12} points={8900} iq={8.9} />
            </CardContent>
          </Card>
          
          {/* AI Intelligence Score */}
          <Card>
            <CardContent className="p-3">
              <IntelligenceScore score={8.9} weeklyGain={0.9} percentile={85} />
            </CardContent>
          </Card>
          
          {/* Quick Actions */}
          <QuickActionsCard />
          
          {/* Ad Space */}
          <Card>
            <CardContent className="p-3">
              <AdCard />
            </CardContent>
          </Card>
        </div>
        
        {/* MIDDLE COLUMN - 6 cols */}
        <div className="col-span-12 md:col-span-6 flex flex-col gap-4">
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
          
          {/* Today's Quest */}
          <Card>
            <CardContent className="p-3">
              <div className="flex items-center gap-4 relative">
                <div className="shrink-0 flex items-center justify-center h-16 w-16 rounded-xl bg-[#FF4800]/10">
                  <Target className="h-10 w-10 text-[#FF4800]" strokeWidth={2} />
                </div>
                
                <div className="flex-1">
                  <DailyQuest title="أكمل تحصيلي الرياضيات" description="حل 10 مسائل جديدة من كتاب التحصيلي" xpReward={150} day={7} />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <h3 className="text-sm font-bold text-white font-changa flex items-center gap-2">
                <Target className="h-4 w-4 text-[#FF4800]" strokeWidth={2} />
                مهمة اليوم
              </h3>
              <div className="flex items-center gap-1 py-1 px-3 bg-[#FF4800]/10 rounded-md text-xs text-[#FF4800] font-['Share_Tech_Mono']">
                <Award className="h-3 w-3" strokeWidth={2} />
                +150 XP
              </div>
            </CardFooter>
          </Card>
          
          {/* Announcements */}
          <Card className="flex-1">
            <CardContent className="p-3">
              <div className="space-y-3">
                {announcements.map((announcement, index) => (
                  <AnnouncementCard
                    key={index}
                    title={announcement.title}
                    content={announcement.content}
                    type={announcement.type}
                    timestamp={announcement.timestamp}
                    isNew={announcement.isNew}
                  />
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <h3 className="text-sm font-bold text-white font-changa flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[#FF4800]" strokeWidth={2} />
                الإعلانات
              </h3>
              <Button variant="link" className="text-xs text-[#FF4800] p-0 h-auto">عرض الكل</Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* RIGHT COLUMN - 3 cols */}
        <div className="col-span-12 md:col-span-3 flex flex-col gap-4">
          {/* Student of the Week */}
          <StudentOfWeekWidget />
          
          {/* Weekly Goals */}
          <WeeklyGoalsCard />
          
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
          
          {/* Course Progress */}
          <Card className="flex-col">
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
        </div>
      </div>
    </ScrollArea>
  );
};

export default Dashboard;
