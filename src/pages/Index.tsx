
import { useState, useEffect } from 'react';
import { 
  BarChart, Award, Calendar, Target, 
  Brain, Activity, BookOpen, ChevronRight, 
  Zap, Book, Clock, ExternalLink
} from 'lucide-react';
import { ResponsiveContainer, BarChart as RechartsBarChart, Bar, XAxis, Tooltip } from 'recharts';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
  { id: 4, name: 'كيمياء', progress: 30 },
];

// Upcoming exams
const upcomingExams = [
  { id: 1, subject: 'رياضيات', date: '١٢ مايو', time: '١٠:٠٠ ص', xp: 200 },
  { id: 2, subject: 'فيزياء', date: '١٤ مايو', time: '١١:٣٠ ص', xp: 250 },
  { id: 3, subject: 'كيمياء', date: '١٦ مايو', time: '٩:٠٠ ص', xp: 180 },
];

// Coming soon courses
const comingSoonCourses = [
  { id: 1, name: 'علم البيانات' },
  { id: 2, name: 'علوم الحاسب' },
];

const Index = () => {
  const [adCode, setAdCode] = useState('');
  const [progressBarWidth, setProgressBarWidth] = useState(0);
  
  // Calculate total weekly XP
  const totalWeeklyXP = weeklyActivity.reduce((acc, day) => acc + day.xp, 0);
  
  // Animate progress bars on load
  useEffect(() => {
    setTimeout(() => {
      setProgressBarWidth(70);
    }, 300);
  }, []);
  
  const getMedalIcon = (position: number) => {
    switch(position) {
      case 0:
        return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z" fill="#FFD700" stroke="#FFD700" strokeWidth="2"/>
          <path d="M19 8L23 8" stroke="#FFD700" strokeWidth="2" strokeLinecap="round"/>
          <path d="M1 8L5 8" stroke="#FFD700" strokeWidth="2" strokeLinecap="round"/>
          <path d="M16.5 15.5L17.6 22.2361L12 19.5L6.4 22.2361L7.5 15.5" stroke="#FFD700" strokeWidth="2"/>
        </svg>;
      case 1:
        return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z" fill="#C0C0C0" stroke="#C0C0C0" strokeWidth="2"/>
          <path d="M19 8L23 8" stroke="#C0C0C0" strokeWidth="2" strokeLinecap="round"/>
          <path d="M1 8L5 8" stroke="#C0C0C0" strokeWidth="2" strokeLinecap="round"/>
          <path d="M16.5 15.5L17.6 22.2361L12 19.5L6.4 22.2361L7.5 15.5" stroke="#C0C0C0" strokeWidth="2"/>
        </svg>;
      case 2:
        return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z" fill="#CD7F32" stroke="#CD7F32" strokeWidth="2"/>
          <path d="M19 8L23 8" stroke="#CD7F32" strokeWidth="2" strokeLinecap="round"/>
          <path d="M1 8L5 8" stroke="#CD7F32" strokeWidth="2" strokeLinecap="round"/>
          <path d="M16.5 15.5L17.6 22.2361L12 19.5L6.4 22.2361L7.5 15.5" stroke="#CD7F32" strokeWidth="2"/>
        </svg>;
      default:
        return null;
    }
  };
  
  return (
    <div className="h-full grid grid-cols-12 gap-6 p-6 overflow-hidden stars-bg">
      {/* LEFT COLUMN - 3 cols */}
      <div className="col-span-3 flex flex-col gap-6">
        {/* Student Snapshot */}
        <Card className="overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 border-2 border-cyan-400/20">
                <AvatarImage src="/assets/avatars/student.png" />
                <AvatarFallback className="bg-[#161827] text-white text-base font-changa">
                  ش
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <h2 className="text-white font-bold text-base font-changa">شادي داود</h2>
                <p className="text-gray-400 text-xs font-['Noto_Sans_Arabic']">الثاني عشر - دار الأرقم</p>
                
                <div className="w-full mt-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-cyan-400 font-['Share_Tech_Mono']">2450/3000</span>
                  </div>
                  
                  <Progress value={progressBarWidth} className="h-1.5" />
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="py-3 border-t border-white/5">
            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center">
                <Zap className="h-4 w-4 text-cyan-400 mb-1.5" />
                <span className="text-gray-300 font-medium text-xs mb-0.5 font-['Noto_Sans_Arabic']">الجهد</span>
                <div className="text-sm font-bold text-white font-['Share_Tech_Mono']">12</div>
              </div>
              
              <div className="flex flex-col items-center">
                <Award className="h-4 w-4 text-cyan-400 mb-1.5" />
                <span className="text-gray-300 font-medium text-xs mb-0.5 font-['Noto_Sans_Arabic']">النقاط</span>
                <div className="text-sm font-bold text-white font-['Share_Tech_Mono']">8.9K</div>
              </div>
              
              <div className="flex flex-col items-center">
                <Brain className="h-4 w-4 text-cyan-400 mb-1.5" />
                <span className="text-gray-300 font-medium text-xs mb-0.5 font-['Noto_Sans_Arabic']">الذكاء</span>
                <div className="text-sm font-bold text-white font-['Share_Tech_Mono']">8.9</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* AI Intelligence circular meter */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Brain className="h-4 w-4 text-cyan-400" />
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
                  stroke="#00D9FF" 
                  strokeWidth="6" 
                  strokeLinecap="round"
                  strokeDasharray="339.3" 
                  strokeDashoffset="85" 
                  className="transition-all duration-1000"
                />
                <text x="60" y="55" textAnchor="middle" dominantBaseline="middle" fontSize="24" fill="white" className="font-['Share_Tech_Mono']">8.9</text>
                <text x="60" y="75" textAnchor="middle" dominantBaseline="middle" fontSize="10" fill="#9CA3AF" className="font-['Noto_Sans_Arabic']">مستوى</text>
              </svg>
            </div>
            
            <div className="text-center">
              <div className="py-1 px-3 bg-cyan-400/10 rounded-full text-cyan-400 text-xs mb-2">
                +0.9 هذا الأسبوع
              </div>
              <p className="text-xs text-gray-400">أعلى من 85% من الطلاب</p>
            </div>
          </CardContent>
        </Card>
        
        {/* Ad Space */}
        <Card className="flex-1 h-36">
          <CardHeader className="pb-1 pt-4">
            <div className="text-xs text-gray-500 flex items-center gap-1">
              <ExternalLink className="h-3 w-3" />
              إعلان
            </div>
          </CardHeader>
          
          <CardContent className="py-3">
            <div className="border border-dashed border-white/10 rounded-lg p-3 flex items-center justify-center h-16">
              {adCode ? (
                <div dangerouslySetInnerHTML={{ __html: adCode }} className="w-full h-full" />
              ) : (
                <div className="text-center">
                  <p className="text-sm text-gray-400">Google AdSense</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* MIDDLE COLUMN - 6 cols */}
      <div className="col-span-6 flex flex-col gap-6">
        {/* Weekly Performance Chart */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2 text-base">
                <Activity className="h-4 w-4 text-cyan-400" />
                إنجاز أسبوعي
              </CardTitle>
              
              <div className="py-1 px-3 bg-cyan-400/10 rounded-full text-xs text-cyan-400 flex items-center gap-1.5">
                <Award className="h-3 w-3" />
                <span className="font-['Share_Tech_Mono']">Total XP {totalWeeklyXP}</span>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="py-3">
            <div className="h-36 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={weeklyActivity} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
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
                    tick={{ fill: '#9CA3AF', fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{ 
                      backgroundColor: '#161827', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '16px',
                    }}
                    labelStyle={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}
                    itemStyle={{ color: '#00D9FF' }}
                    formatter={(value) => [`${value} XP`, 'نقاط اليوم']}
                  />
                  <Bar 
                    dataKey="xp" 
                    fill="url(#barGradient)"
                    radius={[4, 4, 0, 0]}
                    barSize={30}
                  />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Daily Quest */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2 text-base">
                <Target className="h-4 w-4 text-cyan-400" />
                مهمة اليوم
              </CardTitle>
              
              <div className="py-1 px-3 bg-cyan-400/10 rounded-full flex items-center gap-1.5 text-xs text-cyan-400">
                <Clock className="h-3 w-3" />
                <span className="font-['Share_Tech_Mono']">يوم 7</span>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="py-3">
            <div className="flex items-center gap-5 p-4 bg-white/5 rounded-xl">
              <div className="h-12 w-12 rounded-xl bg-cyan-400/10 flex items-center justify-center text-cyan-400">
                <Target className="h-6 w-6" />
              </div>
              
              <div className="flex-1">
                <h4 className="text-white font-bold font-changa text-base mb-1">أكمل تحصيلي الرياضيات</h4>
                <p className="text-sm text-gray-400 mb-3 font-['Noto_Sans_Arabic']">حل 10 مسائل جديدة من كتاب التحصيلي</p>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1.5 py-1 px-3 bg-purple-500/10 rounded-full text-purple-500 text-xs">
                    <Award className="h-3.5 w-3.5" />
                    <span className="font-['Share_Tech_Mono']">+150 XP</span>
                  </div>
                  
                  <Button variant="accent" className="gap-1.5 h-9 w-28">
                    ابدأ المهمة
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Upcoming Exams */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Calendar className="h-4 w-4 text-cyan-400" />
              الامتحانات القادمة
            </CardTitle>
          </CardHeader>
          
          <CardContent className="py-3 space-y-3">
            {upcomingExams.map(exam => (
              <div 
                key={exam.id}
                className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border-l-2 border-purple-500/20 group hover:border-purple-500/70"
              >
                <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-white/5 text-cyan-400 group-hover:bg-purple-500/10">
                  <Book className="h-5 w-5" />
                </div>
                
                <div className="flex-1">
                  <h5 className="text-white font-medium font-changa">{exam.subject}</h5>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400 font-['Noto_Sans_Arabic']">{exam.date} - {exam.time}</span>
                    <span className="text-xs py-0.5 px-2 bg-cyan-400/10 rounded-full text-cyan-400 font-['Share_Tech_Mono']">
                      {exam.xp} XP
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        
        {/* Coming-Soon Courses */}
        <Card className="flex-1">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <BookOpen className="h-4 w-4 text-cyan-400" />
              كورسات قريباً
            </CardTitle>
          </CardHeader>
          
          <CardContent className="py-3">
            <div className="flex gap-4 overflow-x-auto pb-2">
              {comingSoonCourses.map(course => (
                <div 
                  key={course.id}
                  className="flex-shrink-0 w-[calc(50%-0.5rem)] p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="text-white font-medium font-changa">{course.name}</h5>
                    <div className="h-8 w-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500">
                      <BookOpen className="h-4 w-4" />
                    </div>
                  </div>
                  <span className="text-sm text-gray-400 font-['Noto_Sans_Arabic']">كورس جديد - قريباً</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* RIGHT COLUMN - 3 cols */}
      <div className="col-span-3 flex flex-col gap-6">
        {/* Leaderboard */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2 text-base">
                <Award className="h-4 w-4 text-cyan-400" />
                المتصدرون
              </CardTitle>
              
              <div className="flex bg-white/5 rounded-lg p-0.5 text-xs">
                <button 
                  className="px-2 py-0.5 rounded-md bg-cyan-400 text-white"
                >
                  أسبوعي
                </button>
                <button 
                  className="px-2 py-0.5 rounded-md text-gray-400"
                >
                  شهري
                </button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-2 py-3">
            {leaderboardData.map((user, index) => (
              <div 
                key={user.id} 
                className="flex items-center gap-3 p-2.5 rounded-lg transition-all hover:bg-white/5 border-l-2 border-transparent hover:border-cyan-400/50"
              >
                <div className="h-5 w-5 flex items-center justify-center">
                  {getMedalIcon(index)}
                </div>
                
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-[#161827] text-gray-300 text-sm">
                    {user.avatar}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="text-white text-xs font-medium truncate font-changa">{user.name}</div>
                  <div className="text-[10px] text-gray-500 font-['Noto_Sans_Arabic']">Lv {user.level}</div>
                </div>
                
                <div className="text-xs font-['Share_Tech_Mono'] text-cyan-400">
                  {user.xp.toLocaleString()}
                </div>
              </div>
            ))}
            
            <button className="w-full text-xs text-cyan-400 hover:underline py-1 flex items-center justify-center gap-1 mt-1">
              عرض الكل
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </CardContent>
        </Card>
        
        {/* Course Progress */}
        <Card className="flex-1">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <BookOpen className="h-4 w-4 text-cyan-400" />
              تقدم الكورسات
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-4 py-3">
            {courseProgress.map(course => (
              <div key={course.id}>
                <div className="flex justify-between items-center mb-1.5">
                  <div className="text-white font-medium text-sm font-changa">{course.name}</div>
                  <span className="text-xs text-cyan-400 font-['Share_Tech_Mono']">{course.progress}%</span>
                </div>
                
                <Progress 
                  value={course.progress} 
                  className="h-1.5"
                />
              </div>
            ))}
            
            <button className="w-full text-xs text-cyan-400 hover:underline py-1 flex items-center justify-center gap-1 mt-1">
              عرض جميع الكورسات
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
