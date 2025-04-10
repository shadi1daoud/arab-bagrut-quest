import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { ChevronLeft, Trophy, Star, CheckCircle, Clock, Flame, Activity, Award, Brain, Target, Calendar, ChevronDown, ExternalLink, BookOpen, Lock, Bell } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';

// Sample data
const weeklyActivity = [
  { day: 'الأحد', hours: 1.2, xp: 120 },
  { day: 'الإثنين', hours: 0.8, xp: 80 },
  { day: 'الثلاثاء', hours: 1.5, xp: 150 },
  { day: 'الأربعاء', hours: 0.4, xp: 40 },
  { day: 'الخميس', hours: 1.8, xp: 180 },
  { day: 'الجمعة', hours: 1.3, xp: 130 },
  { day: 'السبت', hours: 0.9, xp: 90 },
];

const leaderboardData = [
  { id: 1, name: 'أحمد', avatar: '👦', level: 18, xp: 14520 },
  { id: 2, name: 'سارة', avatar: '👧', level: 16, xp: 14250 },
  { id: 3, name: 'محمد', avatar: '👨', level: 15, xp: 13950 },
];

const courseProgress = [
  { id: 1, name: 'رياضيات', progress: 75, icon: '🧮', color: 'blue' },
  { id: 2, name: 'إنجليزي', progress: 45, icon: '🔤', color: 'green' },
  { id: 3, name: 'فيزياء', progress: 60, icon: '⚛️', color: 'purple' },
  { id: 4, name: 'كيمياء', progress: 30, icon: '🧪', color: 'yellow' },
];

const upcomingExams = [
  { id: 1, subject: 'رياضيات', date: 'الأحد، 12 مايو', icon: '🧮', color: 'from-blue-600 to-blue-400' },
  { id: 2, subject: 'فيزياء', date: 'الثلاثاء، 14 مايو', icon: '⚛️', color: 'from-purple-600 to-purple-400' },
];

const Dashboard = () => {
  const { user } = useAuth();
  const [adCode, setAdCode] = useState('');
  const [leaderboardFilter, setLeaderboardFilter] = useState('week');
  
  // Calculate total hours
  const totalWeeklyHours = weeklyActivity.reduce((acc, day) => acc + day.hours, 0).toFixed(1);
  
  const handleAdCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdCode(e.target.value);
  };
  
  return (
    <div className="h-full grid grid-cols-3 gap-4">
      {/* LEFT COLUMN - 1/3 Width */}
      <div className="flex flex-col gap-4">
        {/* Leaderboard */}
        <Card className="game-panel overflow-hidden">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-base font-bold text-white font-changa flex items-center gap-2">
                <Trophy className="h-4 w-4 text-yellow-400" />
                المتصدرون
              </h3>
              
              <div className="flex items-center gap-1 text-xs p-1 bg-game-card-bg-alt rounded-lg">
                <button 
                  onClick={() => setLeaderboardFilter('week')}
                  className={`px-2 py-0.5 rounded ${leaderboardFilter === 'week' 
                    ? 'bg-game-primary text-white' 
                    : 'text-gray-400'}`}
                >
                  أسبوعي
                </button>
                <button 
                  onClick={() => setLeaderboardFilter('month')}
                  className={`px-2 py-0.5 rounded ${leaderboardFilter === 'month' 
                    ? 'bg-game-primary text-white' 
                    : 'text-gray-400'}`}
                >
                  شهري
                </button>
                <button 
                  onClick={() => setLeaderboardFilter('all')}
                  className={`px-2 py-0.5 rounded ${leaderboardFilter === 'all' 
                    ? 'bg-game-primary text-white' 
                    : 'text-gray-400'}`}
                >
                  الكل
                </button>
              </div>
            </div>
            
            <div className="space-y-3">
              {leaderboardData.map((user, index) => (
                <div 
                  key={user.id} 
                  className={`flex items-center gap-3 p-2.5 rounded-2xl transition-all ${
                    index === 0 ? 'bg-yellow-500/10 border border-yellow-500/20' : 
                    index === 1 ? 'bg-gray-300/10 border border-gray-300/20' : 
                    'bg-orange-500/10 border border-orange-500/20'
                  } hover:brightness-110 cursor-pointer group`}
                >
                  <div className={`h-7 w-7 rounded-full flex items-center justify-center ${
                    index === 0 ? 'bg-gradient-to-br from-yellow-500/80 to-yellow-600/80 text-white' : 
                    index === 1 ? 'bg-gradient-to-br from-gray-300/80 to-gray-400/80 text-gray-800' : 
                    'bg-gradient-to-br from-orange-500/80 to-orange-600/80 text-white'
                  } font-bold text-sm`}>
                    {index + 1}
                  </div>
                  
                  <div className="h-9 w-9 rounded-full flex items-center justify-center bg-game-card-bg-alt border border-white/10 text-lg">
                    {user.avatar}
                  </div>
                  
                  <div className="flex-1">
                    <div className="text-white text-sm font-medium">{user.name}</div>
                    <div className="text-xs text-gray-400">Level {user.level}</div>
                  </div>
                  
                  <div className="text-base font-bold font-share-tech text-game-accent group-hover:scale-110 transition-transform">
                    {user.xp.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Course Progress */}
        <Card className="game-panel flex-grow overflow-hidden">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-base font-bold text-white font-changa flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-blue-400" />
                تقدم الكورسات
              </h3>
            </div>
            
            <div className="space-y-3">
              {courseProgress.map(course => (
                <div key={course.id} className="group hover:scale-[1.02] transition-transform">
                  <div className="flex justify-between items-center mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className={`h-6 w-6 rounded-md flex items-center justify-center bg-${course.color}-500/20 text-${course.color}-400`}>
                        <span className="text-sm">{course.icon}</span>
                      </div>
                      <span className="text-white text-sm">{course.name}</span>
                    </div>
                    <span className="text-xs text-game-accent font-share-tech">{course.progress}%</span>
                  </div>
                  
                  <div className="h-2 bg-game-card-bg-alt rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full bg-${course.color}-500 group-hover:bg-${course.color}-400 transition-colors`}
                      style={{ width: `${course.progress}%` }}
                    >
                      <div className="w-full h-full opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNiAzTDEyIDNNMTggM0wyNCAxIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9zdmc+')]"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Upcoming Exams */}
        <Card className="game-panel overflow-hidden">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-base font-bold text-white font-changa flex items-center gap-2">
                <Clock className="h-4 w-4 text-red-400" />
                الامتحانات القادمة
              </h3>
            </div>
            
            <div className="space-y-3">
              {upcomingExams.map(exam => (
                <div 
                  key={exam.id}
                  className="p-3 rounded-2xl bg-game-card-bg-alt border border-white/5 group hover:border-white/10 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-lg flex items-center justify-center bg-gradient-to-br ${exam.color}`}>
                      <span className="text-lg">{exam.icon}</span>
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="text-white font-medium">{exam.subject}</h4>
                      <div className="flex items-center text-xs text-gray-400">
                        <Calendar className="h-3 w-3 inline mr-1" />
                        {exam.date}
                      </div>
                    </div>
                    
                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors group-hover:scale-110">
                      <Bell className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* MIDDLE COLUMN - 1/3 Width */}
      <div className="flex flex-col gap-4">
        {/* Weekly Performance Chart */}
        <Card className="game-panel flex-grow overflow-hidden">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-base font-bold text-white font-changa flex items-center gap-2">
                <Activity className="h-4 w-4 text-blue-400" />
                إنجاز أسبوعي
              </h3>
              
              <div className="flex items-center gap-2 py-1 px-3 bg-blue-500/20 rounded-full">
                <Clock className="h-3.5 w-3.5 text-blue-400" />
                <span className="text-sm text-blue-300 font-share-tech">{totalWeeklyHours} ساعة</span>
              </div>
            </div>
            
            <div className="h-64 w-full">
              <ChartContainer config={{
                xp: { color: "#3B82F6", label: "XP المكتسبة" }
              }} className="h-full text-xs">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyActivity} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
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
                      tick={{ fill: '#9ca3af', fontSize: 12 }}
                    />
                    <YAxis 
                      hide={true}
                      axisLine={false}
                      tickLine={false}
                    />
                    <ChartTooltip
                      content={<ChartTooltipContent formatter={(value) => [`${value} XP`, 'نقاط اليوم']} />}
                    />
                    <Bar 
                      dataKey="xp" 
                      fill="url(#barGradient)" 
                      radius={[4, 4, 0, 0]}
                      barSize={24}
                      animationDuration={1500}
                      className="hover:opacity-80 transition-opacity cursor-pointer"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Today's Quest */}
        <Card className="game-panel overflow-hidden">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-base font-bold text-white font-changa flex items-center gap-2">
                <Target className="h-4 w-4 text-game-primary" />
                مهمة اليوم
              </h3>
            </div>
            
            <div className="flex items-center gap-4 p-2">
              <div className="h-14 w-14 rounded-lg bg-gradient-to-br from-game-primary/30 to-game-primary/5 flex items-center justify-center border border-game-primary/20 relative group hover:from-game-primary/40 hover:to-game-primary/10 transition-all">
                <span className="text-2xl transform group-hover:scale-110 transition-transform">🧮</span>
                <div className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center border border-white/10">
                  <Flame className="h-3 w-3" />
                </div>
              </div>
              
              <div className="flex-1">
                <h4 className="text-white font-medium font-lexend">أكمل تحصيلي الرياضيات</h4>
                <p className="text-xs text-gray-400 mb-1">حل 10 مسائل جديدة من كتاب التحصيلي</p>
                
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center gap-1 text-sm text-game-accent">
                    <Award className="h-4 w-4" />
                    <span className="font-share-tech">+150 XP</span>
                  </div>
                  
                  <button className="bg-gradient-to-r from-game-primary to-game-primary/90 hover:brightness-110 transition-all text-white py-1 px-4 rounded-lg text-sm font-medium flex items-center gap-1 hover:scale-105 active:scale-95">
                    <span>ابدأ المهمة</span>
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Coming Soon */}
        <Card className="game-panel overflow-hidden">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-base font-bold text-white font-changa flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-purple-400" />
                كورسات قريباً
              </h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-game-card-bg-alt border border-white/5 hover:border-white/10 transition-all cursor-not-allowed opacity-60">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-cyan-500 to-cyan-700">
                    <span className="text-lg">📊</span>
                  </div>
                  
                  <div>
                    <h4 className="text-gray-300 font-medium text-sm">علم البيانات</h4>
                    <div className="flex items-center gap-1 mt-1">
                      <div className="flex items-center text-xs text-gray-500">
                        <Lock className="h-3 w-3 mr-1" />
                        قريباً
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-3 rounded-lg bg-game-card-bg-alt border border-white/5 hover:border-white/10 transition-all cursor-not-allowed opacity-60">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-indigo-500 to-indigo-700">
                    <span className="text-lg">💻</span>
                  </div>
                  
                  <div>
                    <h4 className="text-gray-300 font-medium text-sm">علوم الحاسب</h4>
                    <div className="flex items-center gap-1 mt-1">
                      <div className="flex items-center text-xs text-gray-500">
                        <Lock className="h-3 w-3 mr-1" />
                        قريباً
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* RIGHT COLUMN - 1/3 Width */}
      <div className="flex flex-col gap-4">
        {/* User Profile Summary */}
        <Card className="game-panel overflow-hidden">
          <CardContent className="p-4">
            <div className="flex flex-col items-center">
              <div className="relative mb-3">
                <Avatar className="h-16 w-16 border-2 border-game-primary/30">
                  {user?.avatar ? (
                    <AvatarImage src={user.avatar} alt={user.name} />
                  ) : (
                    <AvatarFallback className="bg-gradient-to-br from-game-card-bg to-game-card-bg-alt text-xl font-bold">
                      {user?.name?.charAt(0) || 'ش'}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="absolute -top-1 -right-1 h-5 w-5 bg-game-primary rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-game-primary/20 font-share-tech">5</div>
              </div>
              
              <h2 className="text-white font-bold text-lg mb-0.5 font-changa">{user?.name || 'شادي داود'}</h2>
              <p className="text-game-text-secondary text-sm mb-3">{user?.grade || 'الثاني عشر - دار الأرقم'}</p>
              
              <div className="w-full">
                <div className="flex justify-between items-center mb-1">
                  <div className="text-game-highlight text-sm px-2 py-0.5 bg-game-highlight/10 rounded-md font-bold font-share-tech">Lv 5</div>
                  <span className="text-sm text-blue-300 font-share-tech">2450/3000</span>
                </div>
                
                <div className="h-2.5 bg-game-card-bg-alt rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full relative animate-pulse"
                    style={{ width: '70%' }}
                  >
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="w-full h-full opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNiAzTDEyIDNNMTggM0wyNCAxIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9zdmc+')]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Stat Cards */}
        <div className="grid grid-cols-3 gap-3">
          <div className="game-panel p-3 flex flex-col items-center hover:scale-105 transition-transform">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-orange-500/20 to-orange-500/5 flex items-center justify-center mb-1">
              <Flame className="h-4 w-4 text-orange-400" />
            </div>
            <h3 className="text-white font-medium text-xs">الجهد اليومي</h3>
            <div className="text-xl font-bold text-white font-share-tech">12</div>
          </div>
          
          <div className="game-panel p-3 flex flex-col items-center hover:scale-105 transition-transform">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-game-accent/20 to-game-accent/5 flex items-center justify-center mb-1">
              <Award className="h-4 w-4 text-game-accent" />
            </div>
            <h3 className="text-white font-medium text-xs">النقاط</h3>
            <div className="text-xl font-bold text-white font-share-tech">8.9K</div>
          </div>
          
          <div className="game-panel p-3 flex flex-col items-center hover:scale-105 transition-transform">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-500/5 flex items-center justify-center mb-1">
              <Brain className="h-4 w-4 text-blue-400" />
            </div>
            <h3 className="text-white font-medium text-xs">الذكاء</h3>
            <div className="text-xl font-bold text-white font-share-tech">8.9</div>
          </div>
        </div>
        
        {/* AI Smartness Score */}
        <Card className="game-panel overflow-hidden">
          <CardContent className="p-4 flex flex-col items-center">
            <h3 className="text-base font-bold text-white font-changa flex items-center gap-2 mb-3">
              <Brain className="h-4 w-4 text-game-highlight" />
              الذكاء الاصطناعي
            </h3>
            
            <div className="xp-progress-ring mb-2">
              <svg width="120" height="120" viewBox="0 0 120 120">
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
                  className="animate-pulse"
                />
                <text x="60" y="55" textAnchor="middle" dominantBaseline="middle" fontSize="28" fill="white" className="font-share-tech">8.9</text>
                <text x="60" y="75" textAnchor="middle" dominantBaseline="middle" fontSize="12" fill="#B8B8FF" className="font-lexend">تعلم</text>
              </svg>
            </div>
            
            <div className="text-center">
              <div className="py-1 px-3 bg-gradient-to-r from-game-highlight/20 to-game-highlight/10 rounded-full text-game-highlight border border-game-highlight/20 font-share-tech text-sm mb-2">
                +0.9 هذا الأسبوع
              </div>
              <p className="text-xs text-gray-400">معدل ذكائك اعلى من 85% من الطلاب!</p>
            </div>
          </CardContent>
        </Card>
        
        {/* Google Ad Section */}
        <Card className="game-panel overflow-hidden">
          <CardContent className="p-3">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-bold text-white font-changa flex items-center gap-1.5">
                <ExternalLink className="h-3 w-3 text-green-400" />
                إعلان
              </h3>
            </div>
            
            <div className="bg-gray-800/50 border border-white/5 rounded-lg p-2 flex-1 flex items-center justify-center overflow-hidden" style={{minHeight: '80px'}}>
              {adCode ? (
                <div dangerouslySetInnerHTML={{ __html: adCode }} className="w-full h-full" />
              ) : (
                <div className="text-center">
                  <Award className="h-4 w-4 text-gray-500 mx-auto mb-1" />
                  <p className="text-xs text-gray-400">مساحة للإعلانات</p>
                </div>
              )}
            </div>
            
            <div className="mt-2">
              <Input 
                value={adCode}
                onChange={handleAdCodeChange}
                placeholder="كود Google Ad"
                className="text-xs h-7 bg-gray-800/50 border-gray-700"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
