
import { useState } from 'react';
import { 
  Activity, Award, Bell, BookOpen, Brain, Calendar, CheckCircle, 
  ChevronRight, ExternalLink, Flame, Lock, Star, Target, Trophy, Users, Zap 
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from 'recharts';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
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
  { id: 1, name: 'سارة', avatar: '👧', level: 15, xp: 8450 },
  { id: 2, name: 'محمد', avatar: '👨', level: 14, xp: 7920 },
  { id: 3, name: 'أحمد', avatar: '👦', level: 12, xp: 6540 }
];

// Course progress data
const courseProgress = [
  { id: 1, name: 'رياضيات', progress: 75, icon: '🧮', color: 'blue' },
  { id: 2, name: 'إنجليزي', progress: 45, icon: '🔤', color: 'green' },
  { id: 3, name: 'فيزياء', progress: 60, icon: '⚛️', color: 'purple' },
];

// Upcoming exams
const upcomingExams = [
  { id: 1, subject: 'رياضيات', date: '١٢ مايو', icon: '🧮', time: '١٠:٠٠ ص', xp: 200 },
  { id: 2, subject: 'فيزياء', date: '١٤ مايو', icon: '⚛️', time: '١١:٣٠ ص', xp: 250 },
];

// Coming soon courses
const comingSoonCourses = [
  { id: 1, name: 'علم البيانات', icon: '📊', color: 'cyan' },
  { id: 2, name: 'علوم الحاسب', icon: '💻', color: 'indigo' },
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
    <div className="h-full grid grid-cols-12 gap-3 p-0 max-h-screen overflow-hidden">
      {/* LEFT COLUMN - 3 cols */}
      <div className="col-span-3 flex flex-col gap-3">
        {/* Profile Card with Stats */}
        <Card className="backdrop-blur-md bg-opacity-60 border-gradient hover:shadow-sm transition-shadow">
          <CardContent className="p-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="h-12 w-12 border-2 border-game-primary/20">
                  <AvatarImage src="/assets/avatars/student.png" />
                  <AvatarFallback className="bg-gradient-to-br from-black/50 to-black/30 text-xl font-bold">
                    ش
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -top-1 -right-1 h-5 w-5 bg-game-primary rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-game-primary/20 font-share-tech">5</div>
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between">
                  <h2 className="text-white font-bold text-base font-changa">شادي داود</h2>
                  <span className="text-xs py-0.5 px-2 bg-game-highlight/10 rounded-md font-bold text-game-highlight font-share-tech">Lv 5</span>
                </div>
                
                <p className="text-game-text-secondary text-xs mb-1">الثاني عشر - دار الأرقم</p>
                
                <div className="w-full">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-blue-300 font-share-tech">2450/3000</span>
                  </div>
                  
                  <Progress value={70} variant="xp" className="h-1.5" />
                </div>
              </div>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-2 mt-3">
              <div className="p-2 rounded-lg bg-black/20 flex flex-col items-center">
                <Flame className="h-3.5 w-3.5 text-orange-400 mb-1" />
                <span className="text-white font-medium text-[10px] mb-0.5">الجهد</span>
                <div className="text-sm font-bold text-white font-share-tech">12</div>
              </div>
              
              <div className="p-2 rounded-lg bg-black/20 flex flex-col items-center">
                <Award className="h-3.5 w-3.5 text-cyan-400 mb-1" />
                <span className="text-white font-medium text-[10px] mb-0.5">النقاط</span>
                <div className="text-sm font-bold text-white font-share-tech">8.9K</div>
              </div>
              
              <div className="p-2 rounded-lg bg-black/20 flex flex-col items-center">
                <Brain className="h-3.5 w-3.5 text-blue-400 mb-1" />
                <span className="text-white font-medium text-[10px] mb-0.5">الذكاء</span>
                <div className="text-sm font-bold text-white font-share-tech">8.9</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* AI Intelligence Score */}
        <Card className="backdrop-blur-md bg-opacity-60 border-gradient hover:shadow-sm transition-shadow">
          <CardContent className="p-3 flex flex-col items-center">
            <h3 className="text-sm font-bold text-white font-changa flex items-center gap-2 mb-2">
              <Brain className="h-4 w-4 text-game-highlight" />
              الذكاء الاصطناعي
            </h3>
            
            <div className="relative mb-2">
              <svg width="90" height="90" viewBox="0 0 120 120">
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
                  stroke="#00FFE1" 
                  strokeWidth="6" 
                  strokeLinecap="round"
                  strokeDasharray="339.3" 
                  strokeDashoffset="85" 
                  className="transition-all duration-1000"
                />
                <text x="60" y="55" textAnchor="middle" dominantBaseline="middle" fontSize="24" fill="white" className="font-share-tech">8.9</text>
                <text x="60" y="75" textAnchor="middle" dominantBaseline="middle" fontSize="10" fill="#B8B8FF" className="font-lexend">مستوى</text>
              </svg>
            </div>
            
            <div className="text-center">
              <div className="py-1 px-2 bg-gradient-to-r from-game-highlight/20 to-game-highlight/10 rounded-full text-game-highlight border border-game-highlight/20 font-share-tech text-xs mb-2">
                +0.9 هذا الأسبوع
              </div>
              <p className="text-xs text-gray-400">أعلى من 85% من الطلاب</p>
            </div>
          </CardContent>
        </Card>
        
        {/* Leaderboard - compact */}
        <Card className="backdrop-blur-md bg-opacity-60 border-gradient flex-1 overflow-hidden hover:shadow-sm transition-shadow">
          <CardContent className="p-3">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-bold text-white font-changa flex items-center gap-2">
                <Trophy className="h-4 w-4 text-yellow-400" />
                المتصدرون
              </h3>
              
              <div className="flex bg-black/20 rounded-md p-0.5 text-[10px]">
                <button 
                  onClick={() => setLeaderboardFilter('week')}
                  className={`px-1.5 py-0.5 rounded ${leaderboardFilter === 'week' ? 'bg-game-primary text-white' : 'text-gray-400'}`}
                >
                  أسبوعي
                </button>
                <button 
                  onClick={() => setLeaderboardFilter('month')}
                  className={`px-1.5 py-0.5 rounded ${leaderboardFilter === 'month' ? 'bg-game-primary text-white' : 'text-gray-400'}`}
                >
                  شهري
                </button>
              </div>
            </div>
            
            <div className="space-y-1.5">
              {leaderboardData.map((user, index) => (
                <div 
                  key={user.id} 
                  className="flex items-center gap-2 p-1.5 rounded-lg transition-all hover:bg-white/5 group"
                >
                  <div className="h-5 w-5 flex items-center justify-center text-sm">
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                  </div>
                  
                  <Avatar className="h-7 w-7 border border-white/10">
                    <AvatarFallback className="bg-black/30 text-base">
                      {user.avatar}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-xs font-medium truncate">{user.name}</div>
                    <div className="text-[10px] text-gray-400">Lv {user.level}</div>
                  </div>
                  
                  <div className="text-xs font-bold font-share-tech text-cyan-400">
                    {user.xp.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* MIDDLE COLUMN - 6 cols */}
      <div className="col-span-6 flex flex-col gap-3">
        {/* Weekly Activity Chart */}
        <Card className="backdrop-blur-md bg-opacity-60 border-gradient hover:shadow-sm transition-shadow">
          <CardContent className="p-3">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-bold text-white font-changa flex items-center gap-2">
                <Activity className="h-4 w-4 text-blue-400" />
                إنجاز أسبوعي
              </h3>
              
              <div className="flex items-center gap-2">
                <div className="py-1 px-2 bg-blue-500/20 rounded-full text-xs text-blue-300 font-share-tech">
                  {totalWeeklyHours} ساعة
                </div>
                
                <div className="py-1 px-2 bg-cyan-500/20 rounded-full text-xs text-cyan-300 font-share-tech">
                  {totalWeeklyXP} XP
                </div>
              </div>
            </div>
            
            <div className="h-36 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyActivity} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3B82F6" stopOpacity={1} />
                      <stop offset="100%" stopColor="#1D4ED8" stopOpacity={0.8} />
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
                      backgroundColor: 'rgba(23, 21, 50, 0.95)', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
                    }}
                    labelStyle={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}
                    itemStyle={{ color: '#3B82F6' }}
                    formatter={(value) => [`${value} XP`, 'نقاط اليوم']}
                  />
                  <Bar 
                    dataKey="xp" 
                    fill="url(#barGradient)" 
                    radius={[4, 4, 0, 0]}
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
        <Card className="backdrop-blur-md bg-opacity-60 border-gradient hover:shadow-glow transition-all">
          <CardContent className="p-3">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-bold text-white font-changa flex items-center gap-2">
                <Target className="h-4 w-4 text-game-primary" />
                مهمة اليوم
              </h3>
              
              <div className="py-1 px-2 bg-red-500/10 rounded-full flex items-center gap-1">
                <Flame className="h-3 w-3 text-red-400" />
                <span className="text-xs text-red-300 font-share-tech">يوم 7 🔥</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-black/20 rounded-lg border border-game-primary/20">
              <div className="h-14 w-14 rounded-lg bg-gradient-to-br from-game-primary/30 to-game-primary/5 flex items-center justify-center relative">
                <span className="text-2xl">🧮</span>
                <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500/80 text-white text-[8px] font-bold flex items-center justify-center">
                  <Flame className="h-2.5 w-2.5" />
                </div>
              </div>
              
              <div className="flex-1">
                <h4 className="text-white font-medium font-lexend">أكمل تحصيلي الرياضيات</h4>
                <p className="text-xs text-gray-400 mb-2">حل 10 مسائل جديدة من كتاب التحصيلي</p>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1 py-1 px-2 bg-cyan-500/10 rounded-md text-xs text-cyan-400">
                    <Award className="h-3 w-3" />
                    <span className="font-share-tech">+150 XP</span>
                  </div>
                  
                  <Button size="sm" className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 hover:shadow-md hover:shadow-pink-500/20 transition-all">
                    ابدأ المهمة
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Exams and Coming Soon Courses (Tabbed) */}
        <Card className="backdrop-blur-md bg-opacity-60 border-gradient flex-1 overflow-hidden hover:shadow-sm transition-shadow">
          <CardContent className="p-3">
            <Tabs defaultValue="exams" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-3 bg-black/20">
                <TabsTrigger value="exams" className="text-xs">
                  <Calendar className="h-3.5 w-3.5 mr-1" />
                  الامتحانات القادمة
                </TabsTrigger>
                <TabsTrigger value="courses" className="text-xs">
                  <BookOpen className="h-3.5 w-3.5 mr-1" />
                  كورسات قريباً
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="exams" className="mt-0">
                <div className="grid grid-cols-2 gap-2">
                  {upcomingExams.map(exam => (
                    <div 
                      key={exam.id}
                      className="flex items-center gap-2 p-2 rounded-lg bg-black/20 hover:bg-black/30 transition-colors cursor-pointer"
                    >
                      <div className="h-8 w-8 rounded-md flex items-center justify-center bg-yellow-500/20 text-yellow-400">
                        <span className="text-base">{exam.icon}</span>
                      </div>
                      
                      <div className="flex-1">
                        <h5 className="text-white font-medium text-xs">{exam.subject}</h5>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-gray-400">{exam.date} - {exam.time}</span>
                          <span className="text-[10px] bg-yellow-500/10 px-1.5 py-0.5 rounded text-yellow-400">
                            {exam.xp} XP
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="courses" className="mt-0">
                <div className="grid grid-cols-2 gap-2">
                  {comingSoonCourses.map(course => (
                    <div 
                      key={course.id}
                      className="p-2 rounded-lg bg-black/20 border border-white/5 cursor-not-allowed hover:bg-black/30 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-md flex items-center justify-center bg-gradient-to-br from-purple-500/20 to-purple-500/5">
                          <span className="text-base">{course.icon}</span>
                        </div>
                        
                        <div>
                          <h5 className="text-gray-300 font-medium text-xs">{course.name}</h5>
                          <div className="flex items-center text-[10px] text-gray-500">
                            <Lock className="h-2.5 w-2.5 mr-0.5" />
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
      <div className="col-span-3 flex flex-col gap-3">
        {/* Course Progress */}
        <Card className="backdrop-blur-md bg-opacity-60 border-gradient overflow-hidden hover:shadow-sm transition-shadow">
          <CardContent className="p-3">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-bold text-white font-changa flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-blue-400" />
                تقدم الكورسات
              </h3>
            </div>
            
            <div className="space-y-3">
              {courseProgress.map(course => (
                <div key={course.id} className="group hover:scale-[1.01] transition-transform">
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-white text-xs">{course.name}</span>
                    </div>
                    <span className="text-xs text-game-accent font-share-tech">{course.progress}%</span>
                  </div>
                  
                  <Progress 
                    value={course.progress} 
                    variant={course.color as any} 
                    className="h-1.5"
                  />
                </div>
              ))}
            </div>
            
            <Button variant="ghost" size="sm" className="w-full mt-3 text-xs text-blue-400 hover:text-blue-300 hover:bg-white/5">
              <ChevronRight className="h-3.5 w-3.5" />
              عرض جميع الكورسات
            </Button>
          </CardContent>
        </Card>
        
        {/* Ad Block */}
        <Card className="backdrop-blur-md bg-opacity-60 border-gradient overflow-hidden hover:shadow-sm transition-shadow">
          <CardContent className="p-3">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[10px] text-gray-400 font-changa flex items-center gap-1">
                <ExternalLink className="h-2.5 w-2.5 text-green-400" />
                إعلان
              </span>
            </div>
            
            <div className="bg-black/30 border border-white/5 rounded-lg p-2.5 flex items-center justify-center overflow-hidden h-24">
              {adCode ? (
                <div dangerouslySetInnerHTML={{ __html: adCode }} className="w-full h-full" />
              ) : (
                <div className="text-center">
                  <p className="text-xs text-gray-400">🎓 {randomTip}</p>
                </div>
              )}
            </div>
            
            <div className="mt-1.5 opacity-50 hover:opacity-100 transition-opacity">
              <input 
                value={adCode}
                onChange={(e) => setAdCode(e.target.value)}
                placeholder="كود Google Ad"
                className="w-full text-[10px] h-5 bg-black/20 border border-white/10 rounded px-1.5"
              />
            </div>
          </CardContent>
        </Card>
        
        {/* Additional Section - Can be used for any future feature */}
        <Card className="backdrop-blur-md bg-opacity-60 border-gradient overflow-hidden flex-1 hover:shadow-sm transition-shadow">
          <CardContent className="p-3">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-bold text-white font-changa flex items-center gap-2">
                <Zap className="h-4 w-4 text-yellow-400" />
                إنجازات اليوم
              </h3>
            </div>
            
            <div className="space-y-2">
              <div className="p-2 rounded-lg bg-black/20 flex items-center gap-2">
                <div className="h-8 w-8 rounded-md flex items-center justify-center bg-green-500/20 text-green-400">
                  <CheckCircle className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-white text-xs">أكملت 2 اختبار</h4>
                  <div className="text-[10px] text-gray-400">+50 XP</div>
                </div>
              </div>
              
              <div className="p-2 rounded-lg bg-black/20 flex items-center gap-2">
                <div className="h-8 w-8 rounded-md flex items-center justify-center bg-blue-500/20 text-blue-400">
                  <Star className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-white text-xs">درست 1.5 ساعة</h4>
                  <div className="text-[10px] text-gray-400">+30 XP</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
