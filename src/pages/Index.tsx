
import { useState } from 'react';
import { 
  Activity, Award, Bell, BookOpen, Brain, Calendar, ChevronRight, 
  Clock, ExternalLink, Flame, Lock, Star, Target, Trophy, Users, Zap 
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from 'recharts';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Weekly activity data with consistent values
const weeklyActivity = [
  { day: 'الأحد', xp: 12 },
  { day: 'الإثنين', xp: 8 },
  { day: 'الثلاثاء', xp: 5 },
  { day: 'الأربعاء', xp: 6 },
  { day: 'الخميس', xp: 9 },
  { day: 'الجمعة', xp: 4 },
  { day: 'السبت', xp: 7 },
];

// Leaderboard data - top 3 only
const leaderboardData = [
  { id: 1, name: 'سارة', level: 15, xp: 8450 },
  { id: 2, name: 'محمد', level: 14, xp: 7920 },
  { id: 3, name: 'أحمد', level: 12, xp: 6540 }
];

// Course progress data - exactly 4 courses
const courseProgress = [
  { id: 1, name: 'رياضيات', progress: 75 },
  { id: 2, name: 'إنجليزي', progress: 45 },
  { id: 3, name: 'فيزياء', progress: 60 },
  { id: 4, name: 'كيمياء', progress: 28 },
];

// Upcoming exams
const upcomingExams = [
  { id: 1, subject: 'رياضيات', date: '١٢ مايو', time: '١٠:٠٠ ص', xp: 200 },
  { id: 2, subject: 'فيزياء', date: '١٤ مايو', time: '١١:٣٠ ص', xp: 250 },
  { id: 3, subject: 'كيمياء', date: '١٧ مايو', time: '٩:٠٠ ص', xp: 300 },
];

// Coming soon courses
const comingSoonCourses = [
  { id: 1, name: 'علم البيانات', color: 'cyan' },
  { id: 2, name: 'علوم الحاسب', color: 'indigo' },
];

const Index = () => {
  const [adCode, setAdCode] = useState('');
  const [leaderboardFilter, setLeaderboardFilter] = useState('week');
  
  // Calculate total weekly hours
  const totalWeeklyHours = '8.7';
  const totalWeeklyXP = '870';
  
  return (
    <div className="h-full grid grid-cols-12 gap-8 p-0 max-h-screen overflow-hidden">
      {/* LEFT COLUMN - 3 cols */}
      <div className="col-span-3 flex flex-col gap-8">
        {/* Profile Card with Stats */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="h-14 w-14 border-2 border-[#00D9FF]/20">
                  <AvatarImage src="/assets/avatars/student.png" />
                  <AvatarFallback className="bg-[#1A1D2F] text-xl font-bold">
                    ش
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -top-1 -right-1 h-5 w-5 bg-[#00D9FF] rounded-full flex items-center justify-center text-[#0C0E1A] text-xs font-bold shadow-lg shadow-[#00D9FF]/20 font-['Share_Tech_Mono']">5</div>
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between">
                  <h2 className="text-white font-bold text-base font-changa">شادي داود</h2>
                  <span className="text-xs py-0.5 px-2 bg-[#00D9FF]/10 rounded-md font-bold text-[#00D9FF] font-['Share_Tech_Mono']">Lv 5</span>
                </div>
                
                <p className="text-gray-400 text-xs mb-2 font-noto">الثاني عشر - دار الأرقم</p>
                
                <div className="w-full">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-[#00D9FF] font-['Share_Tech_Mono']">2450/3000</span>
                  </div>
                  
                  <Progress value={70} className="h-1.5" />
                </div>
              </div>
            </div>
            
            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-2 mt-4">
              <div className="p-2 rounded-xl bg-[rgba(255,255,255,0.03)] flex flex-col items-center">
                <Flame className="h-4 w-4 text-[#00D9FF] mb-1" />
                <span className="text-white font-medium text-[10px] mb-0.5 font-noto">الجهد</span>
                <div className="text-sm font-bold text-white font-['Share_Tech_Mono']">12</div>
              </div>
              
              <div className="p-2 rounded-xl bg-[rgba(255,255,255,0.03)] flex flex-col items-center">
                <Award className="h-4 w-4 text-[#00D9FF] mb-1" />
                <span className="text-white font-medium text-[10px] mb-0.5 font-noto">النقاط</span>
                <div className="text-sm font-bold text-white font-['Share_Tech_Mono']">8.9K</div>
              </div>
              
              <div className="p-2 rounded-xl bg-[rgba(255,255,255,0.03)] flex flex-col items-center">
                <Brain className="h-4 w-4 text-[#00D9FF] mb-1" />
                <span className="text-white font-medium text-[10px] mb-0.5 font-noto">الذكاء</span>
                <div className="text-sm font-bold text-white font-['Share_Tech_Mono']">8.9</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* AI Intelligence Score */}
        <Card>
          <CardContent className="p-6 flex flex-col items-center">
            <h3 className="text-sm font-bold text-white font-changa flex items-center gap-2 mb-3">
              <Brain className="h-4 w-4 text-[#00D9FF]" />
              الذكاء الاصطناعي
            </h3>
            
            <div className="relative mb-3">
              <svg width="90" height="90" viewBox="0 0 120 120">
                <circle 
                  cx="60" 
                  cy="60" 
                  r="54" 
                  fill="none" 
                  stroke="rgba(255,255,255,0.07)" 
                  strokeWidth="6" 
                />
                <circle 
                  cx="60" 
                  cy="60" 
                  r="54" 
                  fill="none" 
                  stroke="#00D9FF" 
                  strokeWidth="6" 
                  strokeLinecap="round"
                  strokeDasharray="339.3" 
                  strokeDashoffset="85" 
                  className="progress-ring"
                />
                <text x="60" y="55" textAnchor="middle" dominantBaseline="middle" fontSize="24" fill="white" className="font-['Share_Tech_Mono']">8.9</text>
                <text x="60" y="75" textAnchor="middle" dominantBaseline="middle" fontSize="10" fill="#a0a0a0" className="font-noto">مستوى</text>
              </svg>
            </div>
            
            <div className="text-center">
              <div className="py-1 px-2 bg-[#00D9FF]/10 rounded-full text-[#00D9FF] border border-[#00D9FF]/20 font-['Share_Tech_Mono'] text-xs mb-2">
                +0.9 هذا الأسبوع
              </div>
              <p className="text-xs text-gray-400 font-noto">أعلى من 85% من الطلاب</p>
            </div>
          </CardContent>
        </Card>
        
        {/* Ad Space */}
        <Card className="h-[140px]">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] text-gray-400 font-changa flex items-center gap-1">
                <ExternalLink className="h-2.5 w-2.5 text-[#00D9FF]" />
                إعلان
              </span>
            </div>
            
            <div className="bg-[rgba(255,255,255,0.03)] border border-dashed border-[rgba(255,255,255,0.1)] rounded-lg p-2 flex items-center justify-center h-[90px] w-full">
              {adCode ? (
                <div dangerouslySetInnerHTML={{ __html: adCode }} className="w-full h-full" />
              ) : (
                <div className="text-center">
                  <p className="text-xs text-gray-400 font-noto">Google AdSense</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* MIDDLE COLUMN - 6 cols */}
      <div className="col-span-6 flex flex-col gap-8">
        {/* Weekly Activity Chart */}
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-white font-changa flex items-center gap-2">
                <Activity className="h-4 w-4 text-[#00D9FF]" />
                إنجاز أسبوعي
              </h3>
              
              <div className="flex items-center gap-2">
                <div className="py-1 px-2 bg-[#00D9FF]/10 rounded-full text-xs text-[#00D9FF] font-['Share_Tech_Mono'] flex items-center gap-1">
                  <Clock className="h-3 w-3 text-[#00D9FF]" />
                  {totalWeeklyHours} ساعة
                </div>
                
                <div className="py-1 px-2 bg-[#00D9FF]/10 rounded-full text-xs text-[#00D9FF] font-['Share_Tech_Mono'] flex items-center gap-1">
                  <Award className="h-3 w-3 text-[#00D9FF]" />
                  +{totalWeeklyXP} XP
                </div>
              </div>
            </div>
            
            <div className="h-36 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyActivity} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00D9FF" stopOpacity={1} />
                      <stop offset="100%" stopColor="#00D9FF" stopOpacity={0.6} />
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="day" 
                    axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                    tickLine={false}
                    tick={{ fill: '#9ca3af', fontSize: 10 }}
                  />
                  <Tooltip
                    contentStyle={{ 
                      backgroundColor: 'rgba(26, 29, 47, 0.95)', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '16px',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
                    }}
                    labelStyle={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}
                    itemStyle={{ color: '#00D9FF' }}
                    formatter={(value) => [`${value} XP`, 'نقاط اليوم']}
                  />
                  <Bar 
                    dataKey="xp" 
                    fill="url(#barGradient)" 
                    radius={4}
                    barSize={20}
                    animationDuration={1500}
                    className="hover:opacity-80 transition-opacity cursor-pointer"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Today's Quest */}
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-bold text-white font-changa flex items-center gap-2">
                <Target className="h-4 w-4 text-[#00D9FF]" />
                مهمة اليوم
              </h3>
              
              <div className="py-1 px-2 bg-[rgba(255,255,255,0.05)] rounded-full flex items-center gap-1">
                <Flame className="h-3 w-3 text-[#00D9FF]" />
                <span className="text-xs text-[#00D9FF] font-['Share_Tech_Mono']">يوم 7</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 bg-[rgba(255,255,255,0.03)] rounded-xl">
              <div className="shrink-0">
                <Target className="h-12 w-12 text-[#00D9FF]" />
              </div>
              
              <div className="flex-1">
                <h4 className="text-white font-medium font-changa">أكمل تحصيلي الرياضيات</h4>
                <p className="text-xs text-gray-400 mb-3 font-noto">حل 10 مسائل جديدة من كتاب التحصيلي</p>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1 py-1 px-3 bg-[#00D9FF]/10 rounded-md text-xs text-[#00D9FF] font-['Share_Tech_Mono']">
                    <Award className="h-3 w-3" />
                    +150 XP
                  </div>
                  
                  <Button 
                    className="w-[130px] h-[40px] shimmer-button" 
                    size="sm"
                  >
                    ابدأ المهمة
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Exams and Coming Soon Courses (Tabbed) */}
        <Card className="flex-1">
          <CardContent className="p-6">
            <Tabs defaultValue="exams" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4 bg-[rgba(255,255,255,0.03)]">
                <TabsTrigger value="exams" className="text-xs font-noto">
                  <Calendar className="h-3.5 w-3.5 mr-1 text-[#00D9FF]" />
                  الامتحانات القادمة
                </TabsTrigger>
                <TabsTrigger value="courses" className="text-xs font-noto">
                  <BookOpen className="h-3.5 w-3.5 mr-1 text-[#00D9FF]" />
                  كورسات قريباً
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="exams" className="mt-0">
                <div className="space-y-2">
                  {upcomingExams.map(exam => (
                    <div 
                      key={exam.id}
                      className="flex items-center gap-3 p-3 rounded-xl bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.05)] transition-colors cursor-pointer"
                    >
                      <div className="h-10 w-10 rounded-lg flex items-center justify-center bg-[#00D9FF]/10 text-[#00D9FF]">
                        <Calendar className="h-5 w-5" />
                      </div>
                      
                      <div className="flex-1">
                        <h5 className="text-white font-medium text-sm font-changa">{exam.subject}</h5>
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] text-gray-400 font-noto">{exam.date} - {exam.time}</span>
                          <span className="text-[10px] bg-[#00D9FF]/10 px-2 py-0.5 rounded-md text-[#00D9FF] font-['Share_Tech_Mono']">
                            +{exam.xp} XP
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="courses" className="mt-0">
                <div className="grid grid-cols-2 gap-3">
                  {comingSoonCourses.map(course => (
                    <div 
                      key={course.id}
                      className="p-3 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] cursor-not-allowed hover:bg-[rgba(255,255,255,0.05)] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg flex items-center justify-center bg-[#00D9FF]/10">
                          <Lock className="h-4 w-4 text-[#00D9FF]" />
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
            </Tabs>
          </CardContent>
        </Card>
      </div>
      
      {/* RIGHT COLUMN - 3 cols */}
      <div className="col-span-3 flex flex-col gap-8">
        {/* Leaderboard - resized to 330px × 220px */}
        <Card className="w-[330px] h-[220px]">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-white font-changa flex items-center gap-2">
                <Trophy className="h-4 w-4 text-[#00D9FF]" />
                المتصدرون
              </h3>
              
              <div className="flex bg-[rgba(255,255,255,0.03)] rounded-lg p-0.5 text-[10px]">
                <button 
                  onClick={() => setLeaderboardFilter('week')}
                  className={`px-2 py-0.5 rounded-md ${leaderboardFilter === 'week' ? 'bg-[#00D9FF] text-[#0C0E1A]' : 'text-gray-400'}`}
                >
                  أسبوعي
                </button>
                <button 
                  onClick={() => setLeaderboardFilter('month')}
                  className={`px-2 py-0.5 rounded-md ${leaderboardFilter === 'month' ? 'bg-[#00D9FF] text-[#0C0E1A]' : 'text-gray-400'}`}
                >
                  شهري
                </button>
              </div>
            </div>
            
            <div className="space-y-3">
              {leaderboardData.map((user, index) => (
                <div 
                  key={user.id} 
                  className="flex items-center gap-3 p-2 rounded-xl transition-all hover:bg-[rgba(255,255,255,0.03)] border-l-4 border-transparent hover:border-l-4 hover:border-l-[#1A1D2F] group"
                >
                  <div className="h-6 w-6 flex items-center justify-center">
                    {index === 0 ? (
                      <img src="/lovable-uploads/1c2c3b5b-f76f-459a-94ed-22d2f3e35da0.png" alt="Gold" className="h-6 w-6" />
                    ) : index === 1 ? (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" fill="#C0C0C0" fillOpacity="0.8" />
                        <text x="12" y="16" textAnchor="middle" fontSize="12" fill="#0C0E1A" fontWeight="bold">2</text>
                      </svg>
                    ) : (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" fill="#CD7F32" fillOpacity="0.8" />
                        <text x="12" y="16" textAnchor="middle" fontSize="12" fill="#0C0E1A" fontWeight="bold">3</text>
                      </svg>
                    )}
                  </div>
                  
                  <Avatar className="h-8 w-8 border border-[rgba(255,255,255,0.1)]">
                    <AvatarFallback className="bg-[#1A1D2F] text-sm font-bold">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-xs font-medium truncate font-changa">{user.name}</div>
                    <div className="text-[10px] text-gray-400 font-noto">Lv {user.level}</div>
                  </div>
                  
                  <div className="text-xs font-bold text-[#00D9FF] font-['Share_Tech_Mono']">
                    {user.xp.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Course Progress - 4 bars */}
        <Card className="flex-1">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-white font-changa flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-[#00D9FF]" />
                تقدم الكورسات
              </h3>
            </div>
            
            <div className="space-y-4">
              {courseProgress.map(course => (
                <div key={course.id} className="group">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white text-xs font-changa">{course.name}</span>
                    <span className="text-xs text-[#00D9FF] font-['Share_Tech_Mono']">{course.progress}%</span>
                  </div>
                  
                  <Progress 
                    value={course.progress} 
                    className="h-1.5"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
