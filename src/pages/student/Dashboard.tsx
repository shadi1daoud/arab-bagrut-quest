
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { 
  Activity, Award, Bell, Brain, Calendar, CheckCircle, 
  Clock, ExternalLink, Flame, Lock, Target, Trophy, Zap,
  BookOpen, ChevronRight, Star 
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from 'recharts';
import { Progress } from '@/components/ui/progress';
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

const Dashboard = () => {
  const { user } = useAuth();
  const [adCode, setAdCode] = useState('');
  const [leaderboardFilter, setLeaderboardFilter] = useState('week');
  
  // Calculate total weekly hours
  const totalWeeklyHours = weeklyActivity.reduce((acc, day) => acc + day.hours, 0).toFixed(1);
  const totalWeeklyXP = weeklyActivity.reduce((acc, day) => acc + day.xp, 0);
  
  return (
    <div className="h-full grid grid-cols-12 gap-2 select-none">
      {/* LEFT COLUMN - Profile & Stats (3 cols) */}
      <div className="col-span-3 flex flex-col gap-2">
        {/* Profile Card */}
        <div className="game-panel p-3 flex flex-col items-center">
          <div className="relative mb-2">
            <Avatar className="h-14 w-14 border-2 border-game-primary/30">
              {user?.avatar ? (
                <AvatarImage src={user.avatar} />
              ) : (
                <AvatarFallback className="bg-gradient-to-br from-game-card-bg to-game-card-bg-alt text-xl font-bold">
                  {user?.name?.charAt(0) || 'ش'}
                </AvatarFallback>
              )}
            </Avatar>
            <div 
              className="absolute -top-1 -right-1 h-5 w-5 bg-game-primary rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-game-primary/20 font-share-tech"
            >
              {user?.level || 5}
            </div>
          </div>
          
          <h2 className="text-white font-bold text-base mb-0.5 font-changa">{user?.name || 'شادي داود'}</h2>
          <p className="text-game-text-secondary text-xs mb-2">{user?.grade || 'الثاني عشر - دار الأرقم'}</p>
          
          <div className="w-full">
            <div className="flex justify-between items-center mb-1">
              <div className="text-game-highlight text-xs px-2 py-0.5 bg-game-highlight/10 rounded-md font-bold font-share-tech">
                Lv {user?.level || 5}
              </div>
              <span className="text-xs text-blue-300 font-share-tech">2450/3000</span>
            </div>
            
            <Progress value={70} variant="xp" className="h-1.5" />
          </div>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2">
          <div className="game-panel p-2 flex flex-col items-center">
            <div className="h-6 w-6 rounded-full bg-gradient-to-br from-orange-500/20 to-orange-500/5 flex items-center justify-center mb-1">
              <Flame className="h-3.5 w-3.5 text-orange-400" />
            </div>
            <span className="text-white font-medium text-[10px] mb-0.5">الجهد</span>
            <div className="text-base font-bold text-white font-share-tech">12</div>
          </div>
          
          <div className="game-panel p-2 flex flex-col items-center">
            <div className="h-6 w-6 rounded-full bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 flex items-center justify-center mb-1">
              <Award className="h-3.5 w-3.5 text-cyan-400" />
            </div>
            <span className="text-white font-medium text-[10px] mb-0.5">النقاط</span>
            <div className="text-base font-bold text-white font-share-tech">8.9K</div>
          </div>
          
          <div className="game-panel p-2 flex flex-col items-center">
            <div className="h-6 w-6 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-500/5 flex items-center justify-center mb-1">
              <Brain className="h-3.5 w-3.5 text-blue-400" />
            </div>
            <span className="text-white font-medium text-[10px] mb-0.5">الذكاء</span>
            <div className="text-base font-bold text-white font-share-tech">8.9</div>
          </div>
        </div>
        
        {/* AI Intelligence Score */}
        <div className="game-panel p-3 flex-1 flex flex-col items-center">
          <h3 className="text-sm font-bold text-white font-changa flex items-center gap-1.5 mb-2">
            <Brain className="h-4 w-4 text-game-highlight" />
            الذكاء الاصطناعي
          </h3>
          
          <div className="xp-progress-ring mb-2">
            <svg width="100" height="100" viewBox="0 0 120 120">
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
        </div>
      </div>
      
      {/* MIDDLE COLUMN - Main Content (6 cols) */}
      <div className="col-span-6 flex flex-col gap-2">
        {/* Weekly Activity Chart */}
        <div className="game-panel p-3">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-bold text-white font-changa flex items-center gap-1.5">
              <Activity className="h-4 w-4 text-blue-400" />
              إنجاز أسبوعي
            </h3>
            
            <div className="flex items-center gap-2">
              <div className="py-1 px-2 bg-blue-500/20 rounded-full flex items-center gap-1">
                <Clock className="h-3 w-3 text-blue-400" />
                <span className="text-xs text-blue-300 font-share-tech">{totalWeeklyHours} ساعة</span>
              </div>
              
              <div className="py-1 px-2 bg-cyan-500/20 rounded-full flex items-center gap-1">
                <Award className="h-3 w-3 text-cyan-400" />
                <span className="text-xs text-cyan-300 font-share-tech">{totalWeeklyXP} XP</span>
              </div>
            </div>
          </div>
          
          <div className="h-32 w-full">
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
                    backgroundColor: '#171532', 
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
                  barSize={16}
                  animationDuration={1500}
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Today's Quest */}
        <div className="game-panel p-3">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-bold text-white font-changa flex items-center gap-1.5">
              <Target className="h-4 w-4 text-game-primary" />
              مهمة اليوم
            </h3>
            
            <div className="py-1 px-2 bg-red-500/10 rounded-full flex items-center gap-1">
              <Flame className="h-3 w-3 text-red-400" />
              <span className="text-xs text-red-300 font-share-tech">يوم 7 🔥</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-2 bg-game-card-bg-alt/40 rounded-lg">
            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-game-primary/30 to-game-primary/5 flex items-center justify-center border border-game-primary/20 relative">
              <span className="text-xl">🧮</span>
              <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-white text-[8px] font-bold flex items-center justify-center border border-white/10">
                <Flame className="h-2.5 w-2.5" />
              </div>
            </div>
            
            <div className="flex-1">
              <h4 className="text-white font-medium font-lexend text-sm">أكمل تحصيلي الرياضيات</h4>
              <p className="text-xs text-gray-400 mb-2">حل 10 مسائل جديدة من كتاب التحصيلي</p>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1 text-xs text-cyan-400">
                  <Award className="h-3 w-3" />
                  <span className="font-share-tech">+150 XP</span>
                </div>
                
                <button className="bg-gradient-to-r from-game-primary to-game-primary/90 hover:brightness-110 text-white py-1 px-3 rounded-md text-xs h-6 hover:scale-105 transition-all">
                  ابدأ المهمة
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Upcoming Exams */}
        <div className="game-panel p-3 flex-1">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-bold text-white font-changa flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-yellow-400" />
              الامتحانات القادمة
            </h3>
          </div>
          
          <div className="space-y-2 h-[calc(100%-32px)] flex flex-col">
            {upcomingExams.map(exam => (
              <div 
                key={exam.id}
                className="flex items-center gap-2 p-2 rounded-lg bg-game-card-bg-alt/40 hover:bg-game-card-bg-alt/60 transition-colors cursor-pointer"
              >
                <div className="h-8 w-8 rounded-md flex items-center justify-center bg-yellow-500/20 text-yellow-400">
                  <span className="text-base">{exam.icon}</span>
                </div>
                
                <div className="flex-1">
                  <h5 className="text-white font-medium text-xs">{exam.subject}</h5>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="text-[10px] text-gray-400">{exam.date} - {exam.time}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-1 bg-yellow-500/10 px-2 py-0.5 rounded text-yellow-400 text-xs font-share-tech">
                  <Zap className="h-3 w-3" />
                  {exam.xp} XP
                </div>
              </div>
            ))}
            
            {/* Coming Soon Courses */}
            <div className="mt-auto pt-2">
              <div className="flex justify-between items-center mb-1.5">
                <h3 className="text-sm text-gray-300 font-changa flex items-center gap-1.5">
                  <BookOpen className="h-3.5 w-3.5 text-purple-400" />
                  كورسات قريباً
                </h3>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                {comingSoonCourses.map(course => (
                  <div 
                    key={course.id}
                    className="p-2 rounded-lg bg-game-card-bg-alt/30 border border-white/5 cursor-not-allowed opacity-70 flex items-center gap-2"
                  >
                    <div className="h-7 w-7 rounded-md flex items-center justify-center bg-gray-700/50">
                      <span className="text-sm">{course.icon}</span>
                    </div>
                    
                    <div className="flex flex-col">
                      <h5 className="text-gray-300 font-medium text-xs">{course.name}</h5>
                      <div className="flex items-center text-[10px] text-gray-500">
                        <Lock className="h-2.5 w-2.5 mr-0.5" />
                        قريباً
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* RIGHT COLUMN - Leaderboard & Progress (3 cols) */}
      <div className="col-span-3 flex flex-col gap-2">
        {/* Leaderboard */}
        <div className="game-panel p-3">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-bold text-white font-changa flex items-center gap-1.5">
              <Trophy className="h-4 w-4 text-yellow-400" />
              المتصدرون
            </h3>
            
            <div className="flex text-[10px] p-0.5 bg-game-card-bg-alt/50 rounded">
              <button 
                onClick={() => setLeaderboardFilter('week')}
                className={`px-1.5 py-0.5 rounded ${
                  leaderboardFilter === 'week' 
                    ? 'bg-game-primary text-white' 
                    : 'text-gray-400'
                }`}
              >
                أسبوعي
              </button>
              <button 
                onClick={() => setLeaderboardFilter('month')}
                className={`px-1.5 py-0.5 rounded ${
                  leaderboardFilter === 'month' 
                    ? 'bg-game-primary text-white' 
                    : 'text-gray-400'
                }`}
              >
                شهري
              </button>
            </div>
          </div>
          
          <div className="space-y-1.5">
            {leaderboardData.map((user, index) => (
              <div 
                key={user.id} 
                className={`flex items-center gap-2 p-1.5 rounded transition-all ${
                  index === 0 ? 'bg-yellow-500/10 border border-yellow-500/20' : 
                  index === 1 ? 'bg-gray-300/10 border border-gray-300/20' : 
                  'bg-orange-500/10 border border-orange-500/20'
                } hover:brightness-110 cursor-pointer`}
              >
                <div className={`h-5 w-5 rounded-full flex items-center justify-center ${
                  index === 0 ? 'bg-gradient-to-br from-yellow-500/80 to-yellow-600/80 text-white' : 
                  index === 1 ? 'bg-gradient-to-br from-gray-300/80 to-gray-400/80 text-gray-800' : 
                  'bg-gradient-to-br from-orange-500/80 to-orange-600/80 text-white'
                } font-bold text-[10px]`}>
                  {index + 1}
                </div>
                
                <div className="h-6 w-6 rounded-full flex items-center justify-center bg-game-card-bg text-base">
                  {user.avatar}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="text-white text-xs font-medium truncate">{user.name}</div>
                  <div className="text-[10px] text-gray-400">Lv {user.level}</div>
                </div>
                
                <div className="text-xs font-bold font-share-tech text-cyan-400">
                  {user.xp}
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-1 text-[10px] text-blue-400 hover:text-blue-300 hover:underline py-0.5 flex items-center justify-center gap-1">
            عرض الكل
            <ChevronRight className="h-3 w-3" />
          </button>
        </div>
        
        {/* Course Progress */}
        <div className="game-panel p-3 flex-1">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-bold text-white font-changa flex items-center gap-1.5">
              <BookOpen className="h-4 w-4 text-blue-400" />
              تقدم الكورسات
            </h3>
          </div>
          
          <div className="space-y-2">
            {courseProgress.map(course => (
              <div key={course.id} className="group hover:scale-[1.01] transition-transform">
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center gap-1.5">
                    <div className="h-5 w-5 rounded-md flex items-center justify-center bg-blue-500/20 text-blue-400">
                      <span className="text-xs">{course.icon}</span>
                    </div>
                    <span className="text-white text-xs">{course.name}</span>
                  </div>
                  <span className="text-xs text-cyan-400 font-share-tech">{course.progress}%</span>
                </div>
                
                <Progress 
                  value={course.progress} 
                  variant={course.color as any} 
                  className="h-1.5"
                />
              </div>
            ))}
          </div>
          
          <button className="w-full mt-2 text-[10px] text-blue-400 hover:text-blue-300 hover:underline py-0.5 flex items-center justify-center gap-1">
            عرض جميع الكورسات
            <ChevronRight className="h-3 w-3" />
          </button>
        </div>
        
        {/* Google Ad Slot */}
        <div className="game-panel p-2">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[10px] text-gray-400 font-changa flex items-center gap-1">
              <ExternalLink className="h-2.5 w-2.5 text-green-400" />
              إعلان
            </span>
          </div>
          
          <div className="bg-gray-800/50 border border-white/5 rounded h-16 flex items-center justify-center overflow-hidden">
            {adCode ? (
              <div dangerouslySetInnerHTML={{ __html: adCode }} className="w-full h-full" />
            ) : (
              <div className="text-center">
                <Award className="h-3 w-3 text-gray-500 mx-auto mb-0.5" />
                <p className="text-[10px] text-gray-400">مساحة للإعلانات</p>
              </div>
            )}
          </div>
          
          <input 
            value={adCode}
            onChange={(e) => setAdCode(e.target.value)}
            placeholder="كود الإعلان"
            className="mt-1 w-full text-[9px] h-5 bg-gray-800/50 border-gray-700 rounded px-1.5"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
