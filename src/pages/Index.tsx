
import { useState } from 'react';
import { 
  BarChart2, Award, Calendar, CheckCircle, Clock, 
  ExternalLink, Flame, Target, Brain, Activity, BookOpen,
  ChevronRight, Star, User
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from 'recharts';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Sample data for the weekly activity chart
const weeklyActivity = [
  { day: 'الأحد', hours: 1.2, xp: 120 },
  { day: 'الإثنين', hours: 0.5, xp: 50 },
  { day: 'الثلاثاء', hours: 1.8, xp: 180 },
  { day: 'الأربعاء', hours: 0.9, xp: 90 },
  { day: 'الخميس', hours: 2.1, xp: 210 },
  { day: 'الجمعة', hours: 1.5, xp: 150 },
  { day: 'السبت', hours: 0.7, xp: 70 },
];

// Leaderboard data
const leaderboardData = [
  { id: 1, name: 'سارة', avatar: 'S', level: 15, xp: 8450 },
  { id: 2, name: 'محمد', avatar: 'م', level: 14, xp: 7920 },
  { id: 3, name: 'أحمد', avatar: 'أ', level: 12, xp: 6540 }
];

// Course progress data
const courseProgress = [
  { id: 1, name: 'رياضيات', progress: 75 },
  { id: 2, name: 'إنجليزي', progress: 45 },
  { id: 3, name: 'فيزياء', progress: 60 },
];

// Upcoming exams
const upcomingExams = [
  { id: 1, subject: 'رياضيات', date: '١٢ مايو', time: '١٠:٠٠ ص', xp: 200 },
  { id: 2, subject: 'فيزياء', date: '١٤ مايو', time: '١١:٣٠ ص', xp: 250 },
];

// Coming soon courses
const comingSoonCourses = [
  { id: 1, name: 'علم البيانات' },
  { id: 2, name: 'علوم الحاسب' },
];

const studyTips = [
  "تعلم لمدة 25 دقيقة ثم استرح لمدة 5 دقائق.",
  "النوم الجيد يساعد على تثبيت المعلومات في الذاكرة طويلة المدى.",
  "استخدم خرائط ذهنية لربط المفاهيم الجديدة بالمعلومات السابقة.",
];

const Index = () => {
  const [adCode, setAdCode] = useState('');
  const [leaderboardFilter, setLeaderboardFilter] = useState('week');
  const [randomTip] = useState(() => studyTips[Math.floor(Math.random() * studyTips.length)]);
  
  // Calculate total weekly hours and XP
  const totalWeeklyHours = weeklyActivity.reduce((acc, day) => acc + day.hours, 0).toFixed(1);
  const totalWeeklyXP = weeklyActivity.reduce((acc, day) => acc + day.xp, 0);
  
  return (
    <div className="h-full grid grid-cols-12 gap-6 p-6 max-h-screen overflow-hidden">
      {/* LEFT COLUMN - 3 cols */}
      <div className="col-span-3 flex flex-col gap-6">
        {/* Profile Card with Stats */}
        <Card className="overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 border border-neutral-800">
                <AvatarImage src="/assets/avatars/student.png" />
                <AvatarFallback className="bg-neutral-800 text-neutral-200">
                  ش
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <h2 className="text-neutral-100 font-bold text-base font-changa">شادي داود</h2>
                <p className="text-neutral-500 text-xs">الثاني عشر - دار الأرقم</p>
                
                <div className="w-full mt-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-indigo-400 font-share-tech">2450/3000</span>
                  </div>
                  
                  <Progress value={70} className="h-1" />
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="py-3 border-t border-neutral-800/40">
            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center">
                <Flame className="h-4 w-4 text-indigo-400 mb-1.5" />
                <span className="text-neutral-300 font-medium text-xs mb-0.5">الجهد</span>
                <div className="text-sm font-bold text-white font-share-tech">12</div>
              </div>
              
              <div className="flex flex-col items-center">
                <Award className="h-4 w-4 text-indigo-400 mb-1.5" />
                <span className="text-neutral-300 font-medium text-xs mb-0.5">النقاط</span>
                <div className="text-sm font-bold text-white font-share-tech">8.9K</div>
              </div>
              
              <div className="flex flex-col items-center">
                <Brain className="h-4 w-4 text-indigo-400 mb-1.5" />
                <span className="text-neutral-300 font-medium text-xs mb-0.5">الذكاء</span>
                <div className="text-sm font-bold text-white font-share-tech">8.9</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Leaderboard - compact */}
        <Card className="flex-1">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2 text-base">
                <Award className="h-4 w-4 text-indigo-400" />
                المتصدرون
              </CardTitle>
              
              <div className="flex bg-neutral-800 rounded-md p-0.5 text-xs">
                <button 
                  onClick={() => setLeaderboardFilter('week')}
                  className={`px-2 py-0.5 rounded ${leaderboardFilter === 'week' ? 'bg-indigo-600 text-white' : 'text-neutral-400'}`}
                >
                  أسبوعي
                </button>
                <button 
                  onClick={() => setLeaderboardFilter('month')}
                  className={`px-2 py-0.5 rounded ${leaderboardFilter === 'month' ? 'bg-indigo-600 text-white' : 'text-neutral-400'}`}
                >
                  شهري
                </button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-3 py-3">
            {leaderboardData.map((user, index) => (
              <div 
                key={user.id} 
                className="flex items-center gap-3 p-2 rounded-lg transition-all hover:bg-neutral-800/50"
              >
                <div className="h-5 w-5 flex items-center justify-center text-xs font-medium">
                  {index + 1}
                </div>
                
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-neutral-800 text-neutral-300 text-sm">
                    {user.avatar}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="text-neutral-100 text-xs font-medium truncate">{user.name}</div>
                  <div className="text-[10px] text-neutral-500">Lv {user.level}</div>
                </div>
                
                <div className="text-xs font-share-tech text-indigo-400">
                  {user.xp.toLocaleString()}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        
        {/* Course Progress */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <BookOpen className="h-4 w-4 text-indigo-400" />
              تقدم الكورسات
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-4 py-3">
            {courseProgress.map(course => (
              <div key={course.id}>
                <div className="flex justify-between items-center mb-1.5">
                  <div className="text-neutral-300 font-medium text-sm">{course.name}</div>
                  <span className="text-xs text-indigo-400 font-share-tech">{course.progress}%</span>
                </div>
                
                <Progress 
                  value={course.progress} 
                  className="h-1.5"
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      
      {/* MIDDLE COLUMN - 6 cols */}
      <div className="col-span-6 flex flex-col gap-6">
        {/* Weekly Activity Chart */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2 text-base">
                <Activity className="h-4 w-4 text-indigo-400" />
                إنجاز أسبوعي
              </CardTitle>
              
              <div className="flex items-center gap-2">
                <div className="py-1 px-2 bg-neutral-800 rounded-md text-xs text-neutral-300 flex items-center gap-1.5">
                  <Clock className="h-3 w-3" />
                  <span className="font-share-tech">{totalWeeklyHours} ساعة</span>
                </div>
                
                <div className="py-1 px-2 bg-neutral-800 rounded-md text-xs text-indigo-400 flex items-center gap-1.5">
                  <Award className="h-3 w-3" />
                  <span className="font-share-tech">{totalWeeklyXP} XP</span>
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="py-3">
            <div className="h-40 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyActivity} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <XAxis 
                    dataKey="day" 
                    axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                    tickLine={false}
                    tick={{ fill: '#9ca3af', fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{ 
                      backgroundColor: 'rgba(26, 26, 36, 0.95)', 
                      border: '1px solid rgba(99, 102, 241, 0.2)',
                      borderRadius: '8px',
                    }}
                    labelStyle={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}
                    itemStyle={{ color: '#a5b4fc' }}
                    formatter={(value) => [`${value} XP`, 'نقاط اليوم']}
                  />
                  <Bar 
                    dataKey="xp" 
                    fill="#4f46e5"
                    radius={[4, 4, 0, 0]}
                    barSize={26}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Today's Quest */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2 text-base">
                <Target className="h-4 w-4 text-indigo-400" />
                مهمة اليوم
              </CardTitle>
              
              <div className="py-1 px-2 bg-neutral-800 rounded-md flex items-center gap-1.5 text-xs text-indigo-400">
                <Flame className="h-3 w-3" />
                <span className="font-share-tech">يوم 7</span>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="py-4">
            <div className="flex items-start gap-5 p-4 bg-neutral-800/30 rounded-lg border border-neutral-800/60">
              <div className="h-12 w-12 rounded-md bg-neutral-800 flex items-center justify-center text-xl text-indigo-400">
                ∑
              </div>
              
              <div className="flex-1">
                <h4 className="text-neutral-100 font-medium font-lexend text-lg mb-1">أكمل تحصيلي الرياضيات</h4>
                <p className="text-sm text-neutral-400 mb-4">حل 10 مسائل جديدة من كتاب التحصيلي</p>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1.5 py-1 px-2.5 bg-neutral-800 rounded-md text-sm text-indigo-400">
                    <Award className="h-3.5 w-3.5" />
                    <span className="font-share-tech">+150 XP</span>
                  </div>
                  
                  <Button variant="accent" className="gap-1.5">
                    ابدأ المهمة
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Exams and Coming Soon Courses (Tabbed) */}
        <Card className="flex-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">المواعيد والكورسات</CardTitle>
          </CardHeader>
          
          <CardContent>
            <Tabs defaultValue="exams" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-neutral-800">
                <TabsTrigger value="exams" className="text-sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  الامتحانات القادمة
                </TabsTrigger>
                <TabsTrigger value="courses" className="text-sm">
                  <BookOpen className="h-4 w-4 mr-2" />
                  كورسات قريباً
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="exams" className="mt-0 space-y-4">
                {upcomingExams.map(exam => (
                  <div 
                    key={exam.id}
                    className="flex items-center gap-4 p-3 rounded-lg bg-neutral-800/30 hover:bg-neutral-800/50 transition-colors border border-neutral-800/60"
                  >
                    <div className="h-10 w-10 rounded-md flex items-center justify-center bg-neutral-800 text-indigo-400">
                      <Calendar className="h-5 w-5" />
                    </div>
                    
                    <div className="flex-1">
                      <h5 className="text-neutral-100 font-medium">{exam.subject}</h5>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-neutral-400">{exam.date} - {exam.time}</span>
                        <span className="text-xs py-0.5 px-2 bg-neutral-800 rounded text-indigo-400 font-share-tech">
                          {exam.xp} XP
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>
              
              <TabsContent value="courses" className="mt-0 space-y-4">
                {comingSoonCourses.map(course => (
                  <div 
                    key={course.id}
                    className="flex items-center gap-4 p-3 rounded-lg bg-neutral-800/30 hover:bg-neutral-800/50 transition-colors border border-neutral-800/60"
                  >
                    <div className="h-10 w-10 rounded-md flex items-center justify-center bg-neutral-800 text-indigo-400">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h5 className="text-neutral-100 font-medium">{course.name}</h5>
                      </div>
                      <span className="text-sm text-neutral-400">كورس جديد - قريباً</span>
                    </div>
                    
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      
      {/* RIGHT COLUMN - 3 cols */}
      <div className="col-span-3 flex flex-col gap-6">
        {/* AI Intelligence Score */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Brain className="h-4 w-4 text-indigo-400" />
              الذكاء الاصطناعي
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="relative mb-2 h-28 w-28">
              <svg width="112" height="112" viewBox="0 0 120 120">
                <circle 
                  cx="60" 
                  cy="60" 
                  r="54" 
                  fill="none" 
                  stroke="rgba(255,255,255,0.1)" 
                  strokeWidth="6" 
                />
                <circle 
                  cx="60" 
                  cy="60" 
                  r="54" 
                  fill="none" 
                  stroke="#4f46e5" 
                  strokeWidth="6" 
                  strokeLinecap="round"
                  strokeDasharray="339.3" 
                  strokeDashoffset="85" 
                  className="transition-all duration-1000"
                />
                <text x="60" y="55" textAnchor="middle" dominantBaseline="middle" fontSize="24" fill="white" className="font-share-tech">8.9</text>
                <text x="60" y="75" textAnchor="middle" dominantBaseline="middle" fontSize="10" fill="#a5b4fc" className="font-lexend">مستوى</text>
              </svg>
            </div>
            
            <div className="text-center">
              <div className="py-1 px-3 bg-neutral-800 rounded-md text-indigo-400 text-xs mb-2">
                +0.9 هذا الأسبوع
              </div>
              <p className="text-xs text-neutral-400">أعلى من 85% من الطلاب</p>
            </div>
          </CardContent>
        </Card>
        
        {/* Daily Achievements */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2 text-base">
                <Star className="h-4 w-4 text-indigo-400" />
                إنجازات اليوم
              </CardTitle>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-3 py-3">
            <div className="p-3 rounded-lg bg-neutral-800/30 flex items-center gap-3">
              <div className="h-9 w-9 rounded-md flex items-center justify-center bg-neutral-800 text-indigo-400">
                <CheckCircle className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-neutral-100 text-sm">أكملت 2 اختبار</h4>
                <div className="text-xs text-neutral-500 font-share-tech">+50 XP</div>
              </div>
            </div>
            
            <div className="p-3 rounded-lg bg-neutral-800/30 flex items-center gap-3">
              <div className="h-9 w-9 rounded-md flex items-center justify-center bg-neutral-800 text-indigo-400">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-neutral-100 text-sm">درست 1.5 ساعة</h4>
                <div className="text-xs text-neutral-500 font-share-tech">+30 XP</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Ad Block */}
        <Card className="flex-1">
          <CardHeader className="pb-1 pt-4">
            <div className="text-xs text-neutral-500 flex items-center gap-1">
              <ExternalLink className="h-3 w-3" />
              اعلان
            </div>
          </CardHeader>
          
          <CardContent className="py-3">
            <div className="bg-neutral-800/30 border border-neutral-800/60 rounded-lg p-3 flex items-center justify-center h-28">
              {adCode ? (
                <div dangerouslySetInnerHTML={{ __html: adCode }} className="w-full h-full" />
              ) : (
                <div className="text-center">
                  <p className="text-sm text-neutral-400">{randomTip}</p>
                </div>
              )}
            </div>
          </CardContent>
          
          <CardFooter className="pt-0 opacity-50 hover:opacity-100 transition-opacity">
            <input 
              value={adCode}
              onChange={(e) => setAdCode(e.target.value)}
              placeholder="كود Google Ad"
              className="w-full text-xs h-6 bg-neutral-800/50 border border-neutral-800/60 rounded px-2"
            />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Index;
