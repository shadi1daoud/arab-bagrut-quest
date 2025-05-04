
import React, { useState } from 'react';
import { Activity, Award, BookOpen, Calendar, Clock, Lock, Target, Trophy } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import StarParticles from '@/components/StarParticles';
import StatsCard from '@/components/StatsCard';
import IntelligenceScore from '@/components/IntelligenceScore';
import AdCard from '@/components/AdCard';
import WeeklyChart from '@/components/WeeklyChart';
import DailyQuest from '@/components/DailyQuest';
import Leaderboard from '@/components/Leaderboard';
import CourseProgress from '@/components/CourseProgress';

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
  xp: 8450
}, {
  id: 2,
  name: 'محمد',
  level: 14,
  xp: 7920
}, {
  id: 3,
  name: 'أحمد',
  level: 12,
  xp: 6540
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

// Upcoming exams
const upcomingExams = [{
  id: 1,
  subject: 'رياضيات',
  date: '١٢ مايو',
  time: '١٠:٠٠ ص',
  xp: 200
}, {
  id: 2,
  subject: 'فيزياء',
  date: '١٣ مايو',
  time: '١١:٣٠ ص',
  xp: 250
}, {
  id: 3,
  subject: 'كيمياء',
  date: '١٧ مايو',
  time: '٩:٠٠ ص',
  xp: 300
}];

// Coming soon courses
const comingSoonCourses = [{
  id: 1,
  name: 'علم البيانات',
  color: 'cyan'
}, {
  id: 2,
  name: 'علوم الحاسب',
  color: 'indigo'
}];

const Dashboard = () => {
  const [leaderboardFilter, setLeaderboardFilter] = useState('week');

  // Calculate total weekly hours and XP
  const totalWeeklyHours = '8.7';
  const totalWeeklyXP = '870';
  
  return <>
      <StarParticles />
      <ScrollArea className="h-full w-full">
        <div className="grid grid-cols-12 gap-4 pb-4 py-[10px] my-0 px-0 mx-[9px]">
          {/* LEFT COLUMN - 3 cols */}
          <div className="col-span-3 flex flex-col gap-4">
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
            
            {/* Ad Space */}
            <Card>
              <CardContent className="p-3">
                <AdCard />
              </CardContent>
            </Card>
          </div>
          
          {/* MIDDLE COLUMN - 6 cols */}
          <div className="col-span-6 flex flex-col gap-4">
            {/* Weekly Activity Chart - Fortnite Style */}
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
            
            {/* Today's Quest - Fortnite Style */}
            <Card>
              <CardContent className="p-3">
                <div className="flex items-center gap-4 relative">
                  <div className="shrink-0 flex items-center justify-center h-16 w-16 rounded-xl bg-[#FF4800]/10">
                    <Target className="h-10 w-10 text-[#FF4800]" strokeWidth={2} />
                  </div>
                  
                  <div className="flex-1">
                    <DailyQuest 
                      title="أكمل تحصيلي الرياضيات" 
                      description="حل 10 مسائل جديدة من كتاب التحصيلي" 
                      xpReward={150} 
                      day={7} 
                    />
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
            
            {/* Exams and Coming Soon Courses (Tabbed) - Fortnite Style */}
            <Card className="flex-1">
              <Tabs defaultValue="exams" className="w-full">
                <div className="bg-black/40 rounded-t-xl p-1 border-b border-white/5">
                  <TabsList className="grid w-full grid-cols-2 bg-transparent">
                    <TabsTrigger value="exams" className="text-xs font-noto data-[state=active]:bg-[rgba(255,255,255,0.05)] data-[state=active]:text-white relative">
                      <Calendar className="h-3.5 w-3.5 mr-1 text-[#FF4800]" />
                      الامتحانات القادمة
                      {/* Active indicator */}
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF4800] transform scale-x-0 transition-transform data-[state=active]:scale-x-100"></div>
                    </TabsTrigger>
                    <TabsTrigger value="courses" className="text-xs font-noto data-[state=active]:bg-[rgba(255,255,255,0.05)] data-[state=active]:text-white relative">
                      <BookOpen className="h-3.5 w-3.5 mr-1 text-[#FF4800]" />
                      كورسات قريباً
                      {/* Active indicator */}
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF4800] transform scale-x-0 transition-transform data-[state=active]:scale-x-100"></div>
                    </TabsTrigger>
                  </TabsList>
                </div>
                
                <CardContent className="p-3">
                  <TabsContent value="exams" className="mt-0 space-y-2">
                    {upcomingExams.map(exam => (
                      <div key={exam.id} className="flex items-center gap-3 p-3 rounded-xl bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.05)] transition-colors cursor-pointer">
                        <div className="h-10 w-10 rounded-lg flex items-center justify-center bg-[#FF4800]/10 text-[#FF4800]">
                          <Calendar className="h-5 w-5" />
                        </div>
                        
                        <div className="flex-1">
                          <h5 className="text-white font-medium text-sm font-changa">{exam.subject}</h5>
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] text-gray-400 font-noto">{exam.date} - {exam.time}</span>
                            <span className="text-[10px] bg-[#FF4800]/10 px-2 py-0.5 rounded-md text-[#FF4800] font-['Share_Tech_Mono']">
                              +{exam.xp} XP
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="courses" className="mt-0">
                    <div className="grid grid-cols-2 gap-3">
                      {comingSoonCourses.map(course => (
                        <div key={course.id} className="p-3 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] cursor-not-allowed hover:bg-[rgba(255,255,255,0.05)] transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg flex items-center justify-center bg-[#FF4800]/10">
                              <Lock className="h-4 w-4 text-[#FF4800]" />
                            </div>
                            
                            <div>
                              <h5 className="text-white font-medium text-sm font-changa">{course.name}</h5>
                              <div className="flex items-center text-[11px] text-gray-500 font-noto">
                                <Lock className="h-2.5 w-2.5 mr-0.5 text-gray-500" />
                                قريباً
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </CardContent>
                <CardFooter>
                  <h3 className="text-sm font-bold text-white font-changa flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-[#FF4800]" strokeWidth={2} />
                    الأحداث القادمة
                  </h3>
                  <Button variant="link" className="text-xs text-[#FF4800] p-0 h-auto">عرض الكل</Button>
                </CardFooter>
              </Tabs>
            </Card>
          </div>
          
          {/* RIGHT COLUMN - 3 cols */}
          <div className="col-span-3 flex flex-col gap-4">
            {/* Leaderboard - Fortnite Style */}
            <Card>
              <CardContent className="p-3">
                <Leaderboard 
                  data={leaderboardData} 
                  filter={leaderboardFilter} 
                  onFilterChange={setLeaderboardFilter} 
                />
              </CardContent>
              <CardFooter>
                <h3 className="text-sm font-bold text-white font-changa flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-[#FF4800]" strokeWidth={2} />
                  المتصدرون
                </h3>
                <Button variant="link" className="text-xs text-[#FF4800] p-0 h-auto">عرض المزيد</Button>
              </CardFooter>
            </Card>
            
            {/* Course Progress - Fortnite Style */}
            <Card className="flex-1">
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
    </>;
};

export default Dashboard;
