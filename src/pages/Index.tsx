
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, LogOut, Trophy, BookOpen, Clock, Target, Brain, 
  Flame, Award, ChevronDown, ExternalLink, Calendar, Star
} from 'lucide-react';
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip
} from 'recharts';

// Sample data for the activity chart
const weeklyActivity = [
  { day: 'السبت', hours: 1.2, xp: 120 },
  { day: 'الأحد', hours: 0.5, xp: 50 },
  { day: 'الإثنين', hours: 1.8, xp: 180 },
  { day: 'الثلاثاء', hours: 0.9, xp: 90 },
  { day: 'الأربعاء', hours: 2.1, xp: 210 },
  { day: 'الخميس', hours: 1.5, xp: 150 },
  { day: 'الجمعة', hours: 0.7, xp: 70 },
];

// Leaderboard data
const leaderboardData = [
  { id: 1, name: 'سارة', avatar: '👧', level: 15, xp: 8450 },
  { id: 2, name: 'محمد', avatar: '👨', level: 14, xp: 7920 },
  { id: 3, name: 'أحمد', avatar: '👦', level: 12, xp: 6540 }
];

// Course progress data
const courseProgress = [
  { id: 1, name: 'رياضيات', progress: 75, icon: '🧮', color: 'from-blue-500 to-blue-600' },
  { id: 2, name: 'إنجليزي', progress: 45, icon: '🔤', color: 'from-green-500 to-green-600' },
  { id: 3, name: 'فيزياء', progress: 60, icon: '⚛️', color: 'from-purple-500 to-purple-600' },
  { id: 4, name: 'كيمياء', progress: 30, icon: '🧪', color: 'from-yellow-500 to-yellow-600' },
  { id: 5, name: 'عربي', progress: 85, icon: '📝', color: 'from-red-500 to-red-600' }
];

// Upcoming exams data
const upcomingExams = [
  { id: 1, subject: 'رياضيات', date: 'الأحد، 14 مايو', icon: '🧮', color: 'from-blue-600 to-blue-400' },
  { id: 2, subject: 'فيزياء', date: 'الثلاثاء، 16 مايو', icon: '⚛️', color: 'from-purple-600 to-purple-400' }
];

// Coming soon courses
const comingSoonCourses = [
  { id: 1, name: 'علم البيانات', icon: '📊', color: 'from-cyan-500 to-cyan-700' },
  { id: 2, name: 'علوم الحاسب', icon: '💻', color: 'from-indigo-500 to-indigo-700' }
];

const Index = () => {
  const navigate = useNavigate();
  const [adCode, setAdCode] = useState('');
  const [leaderboardFilter, setLeaderboardFilter] = useState('week');
  
  // Calculate total weekly hours
  const totalWeeklyHours = weeklyActivity.reduce((acc, day) => acc + day.hours, 0).toFixed(1);
  const totalWeeklyXP = weeklyActivity.reduce((acc, day) => acc + day.xp, 0);
  
  return (
    <div className="flex h-screen overflow-hidden bg-game-background text-game-text-primary">
      {/* Right Sidebar Navigation */}
      <div className="w-[70px] lg:w-[80px] border-l border-white/5 flex flex-col items-center p-3">
        <div className="mb-6 w-full flex justify-center">
          <div className="h-10 w-10 bg-gradient-to-br from-game-highlight to-game-primary rounded-xl flex items-center justify-center shadow-lg shadow-game-primary/20 font-bold text-white">
            D
          </div>
        </div>
        
        <div className="flex flex-col items-center space-y-6 mt-4 w-full">
          <button 
            className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-game-primary/30 to-game-primary/5 text-white hover:from-game-primary/50 hover:to-game-primary/10 transition-all duration-300 border border-game-primary/20"
            onClick={() => navigate('/')}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <button 
            className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-800/50 text-gray-400 hover:bg-gray-800/80 hover:text-white transition-all duration-300 border border-white/5"
            onClick={() => navigate('/courses')}
          >
            <BookOpen className="h-5 w-5" />
          </button>
          
          <button 
            className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-800/50 text-gray-400 hover:bg-gray-800/80 hover:text-white transition-all duration-300 border border-white/5"
            onClick={() => navigate('/shop')}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <button 
            className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-800/50 text-gray-400 hover:bg-gray-800/80 hover:text-white transition-all duration-300 border border-white/5"
            onClick={() => navigate('/community')}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        
        <div className="mt-auto mb-6">
          <button 
            className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-800/50 text-gray-400 hover:bg-red-500/20 hover:text-red-400 transition-all duration-300 border border-white/5"
            onClick={() => navigate('/login')}
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="h-16 flex items-center justify-between border-b border-white/5 px-6">
          <div className="flex items-center gap-1">
            <span className="text-2xl font-bold text-white font-changa">درسني</span>
            <span className="text-xs py-0.5 px-2 bg-game-primary/20 text-game-primary rounded-full ml-2">Beta</span>
          </div>
          
          <div className="flex-1 max-w-md mx-auto relative">
            <input
              type="text"
              placeholder="ابحث عن كورسات، مهام، أو مستخدمين"
              className="w-full bg-game-card-bg/50 border border-white/5 rounded-full py-2 px-4 pr-10 text-sm text-white focus:outline-none focus:ring-1 focus:ring-game-accent focus:border-game-accent"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex flex-col items-end">
                <div className="text-white text-sm font-medium">شادي داود</div>
                <div className="text-xs text-gray-400">الثاني عشر</div>
              </div>
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-game-card-bg to-game-card-bg-alt flex items-center justify-center border-2 border-game-primary/30 text-white font-bold">
                ش
              </div>
            </div>
          </div>
        </header>
        
        {/* Dashboard Grid */}
        <div className="flex-1 p-4 grid grid-cols-12 gap-4">
          {/* LEFT COLUMN - 3 cols */}
          <div className="col-span-3 flex flex-col gap-4">
            {/* Top Users Leaderboard */}
            <div className="game-panel">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-white font-changa flex items-center gap-1.5">
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
              
              <div className="space-y-2">
                {leaderboardData.map((user, index) => (
                  <div 
                    key={user.id} 
                    className={`flex items-center gap-2 p-2 rounded-lg transition-all ${
                      index === 0 ? 'bg-yellow-500/10 border border-yellow-500/20' : 
                      index === 1 ? 'bg-gray-300/10 border border-gray-300/20' : 
                      'bg-orange-500/10 border border-orange-500/20'
                    } hover:brightness-110 cursor-pointer group`}
                  >
                    <div className={`h-6 w-6 rounded-full flex items-center justify-center ${
                      index === 0 ? 'bg-gradient-to-br from-yellow-500/80 to-yellow-600/80' : 
                      index === 1 ? 'bg-gradient-to-br from-gray-300/80 to-gray-400/80' : 
                      'bg-gradient-to-br from-orange-500/80 to-orange-600/80'
                    } text-white font-bold text-sm`}>
                      {index + 1}
                    </div>
                    
                    <div className="h-8 w-8 rounded-full flex items-center justify-center bg-game-card-bg-alt border border-white/10 text-lg">
                      {user.avatar}
                    </div>
                    
                    <div className="flex-1">
                      <div className="text-white text-sm font-medium">{user.name}</div>
                      <div className="text-xs text-gray-400">مستوى {user.level}</div>
                    </div>
                    
                    <div className="text-sm font-bold font-share-tech text-game-accent group-hover:scale-110 transition-transform">
                      {user.xp.toLocaleString()}
                    </div>
                  </div>
                ))}
                
                <button className="w-full flex justify-center items-center gap-1 text-xs text-game-accent hover:text-game-accent/80 mt-1 transition-colors">
                  عرض المزيد
                  <ChevronDown className="h-3 w-3" />
                </button>
              </div>
            </div>
            
            {/* Course Progress */}
            <div className="game-panel flex-grow">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-white font-changa flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4 text-blue-400" />
                  تقدم الكورسات
                </h3>
              </div>
              
              <div className="space-y-3">
                {courseProgress.map(course => (
                  <div key={course.id}>
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center gap-1.5">
                        <div className={`h-5 w-5 rounded-md flex items-center justify-center bg-gradient-to-br ${course.color}`}>
                          <span className="text-xs">{course.icon}</span>
                        </div>
                        <span className="text-white text-sm">{course.name}</span>
                      </div>
                      <span className="text-xs text-game-accent font-share-tech">{course.progress}%</span>
                    </div>
                    
                    <div className="h-2 bg-game-card-bg-alt rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full bg-gradient-to-r ${course.color}`} 
                        style={{ width: `${course.progress}%` }}
                      >
                        <div className="w-full h-full opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNiAzTDEyIDNNMTggM0wyNCAxIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9zdmc+')]"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-3 pt-2 border-t border-white/5">
                <button className="text-xs text-game-accent hover:text-game-accent/80 transition-colors flex items-center gap-1">
                  استعراض جميع الكورسات
                  <ArrowUpRight className="h-3 w-3" />
                </button>
              </div>
            </div>
            
            {/* Upcoming Exams */}
            <div className="game-panel">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-white font-changa flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-red-400" />
                  الامتحانات القادمة
                </h3>
              </div>
              
              <div className="space-y-2">
                {upcomingExams.map(exam => (
                  <div 
                    key={exam.id}
                    className="p-3 rounded-lg bg-game-card-bg-alt border border-white/5 group hover:border-white/10 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
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
            </div>
          </div>
          
          {/* MIDDLE COLUMN - 6 cols */}
          <div className="col-span-6 flex flex-col gap-4">
            {/* Weekly Performance Chart */}
            <div className="game-panel flex-grow">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-white font-changa flex items-center gap-1.5">
                  <Activity className="h-4 w-4 text-blue-400" />
                  إنجاز أسبوعي
                </h3>
                
                <div className="flex items-center gap-1 py-1 px-2 bg-blue-500/20 rounded-full">
                  <Clock className="h-3.5 w-3.5 text-blue-400" />
                  <span className="text-xs text-blue-300 font-share-tech">{totalWeeklyHours} ساعة</span>
                </div>
              </div>
              
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyActivity} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                    <defs>
                      <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3B82F6" stopOpacity={1} />
                        <stop offset="100%" stopColor="#1D4ED8" stopOpacity={0.8} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
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
                    <Tooltip
                      contentStyle={{ 
                        backgroundColor: '#171532', 
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
                      }}
                      labelStyle={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}
                      itemStyle={{ color: '#3B82F6' }}
                      formatter={(value) => [`${value} XP`, 'اليوم']}
                    />
                    <Bar 
                      dataKey="xp" 
                      fill="url(#barGradient)" 
                      radius={[4, 4, 0, 0]}
                      barSize={30}
                      animationDuration={1500}
                      className="hover:opacity-80 transition-opacity cursor-pointer"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <div>
                  <Star className="h-3 w-3 text-yellow-400 inline mr-1" />
                  <span className="font-share-tech text-yellow-400">{totalWeeklyXP} XP</span> هذا الأسبوع
                </div>
                <div>
                  <span className="text-green-400">↑ 15%</span> مقارنة بالأسبوع الماضي
                </div>
              </div>
            </div>
            
            {/* Today's Quest */}
            <div className="game-panel">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-bold text-white font-changa flex items-center gap-1.5">
                  <Target className="h-4 w-4 text-game-primary" />
                  مهمة اليوم
                </h3>
              </div>
              
              <div className="flex items-center gap-4 p-2">
                <div className="h-14 w-14 rounded-lg bg-gradient-to-br from-game-primary/30 to-game-primary/5 flex items-center justify-center border border-game-primary/20 relative group hover:from-game-primary/40 hover:to-game-primary/10 transition-all">
                  <span className="text-2xl transform group-hover:scale-110 transition-transform">🧮</span>
                  <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center border border-white/10">
                    1
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
                    
                    <button className="bg-gradient-to-r from-game-primary to-game-primary/90 hover:brightness-110 transition-all text-white py-1 px-4 rounded-lg text-sm font-medium flex items-center gap-1">
                      <span>ابدأ</span>
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Coming Soon Courses */}
            <div className="game-panel">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-white font-changa flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4 text-purple-400" />
                  كورسات قريباً
                </h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {comingSoonCourses.map(course => (
                  <div 
                    key={course.id}
                    className="p-4 rounded-lg bg-game-card-bg-alt border border-white/5 hover:border-white/10 transition-all cursor-not-allowed"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`h-12 w-12 rounded-lg flex items-center justify-center bg-gradient-to-br ${course.color} opacity-50`}>
                        <span className="text-2xl">{course.icon}</span>
                      </div>
                      
                      <div>
                        <h4 className="text-gray-400 font-medium">{course.name}</h4>
                        <div className="flex items-center gap-1 mt-1">
                          <div className="flex items-center text-xs text-gray-500">
                            <Lock className="h-3 w-3 mr-1" />
                            قريباً
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* RIGHT COLUMN - 3 cols */}
          <div className="col-span-3 flex flex-col gap-4">
            {/* User Summary Panel */}
            <div className="game-panel">
              <div className="flex flex-col items-center">
                <div className="relative mb-2">
                  <div className="h-16 w-16 rounded-full border-2 border-game-primary/30 bg-gradient-to-br from-game-card-bg to-game-card-bg-alt flex items-center justify-center">
                    <span className="text-white text-xl font-bold">ش</span>
                  </div>
                  <div className="absolute -top-1 -right-1 h-5 w-5 bg-game-primary rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-game-primary/20 font-share-tech">5</div>
                </div>
                
                <h2 className="text-white font-bold text-lg mb-0.5">شادي داود</h2>
                <p className="text-game-text-secondary text-sm">الثاني عشر - دار الأرقم</p>
                
                <div className="w-full mt-4">
                  <div className="flex justify-between items-center mb-1">
                    <div className="text-game-highlight text-sm px-2 py-0.5 bg-game-highlight/10 rounded-md font-bold font-share-tech">Lv 5</div>
                    <span className="text-sm text-blue-300 font-share-tech">2450/3000</span>
                  </div>
                  
                  <div className="h-2.5 bg-game-card-bg-alt rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full relative"
                      style={{ width: '70%' }}
                    >
                      <div className="absolute inset-0 overflow-hidden">
                        <div className="w-full h-full opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNiAzTDEyIDNNMTggM0wyNCAxIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9zdmc+')]"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center gap-6 mt-4 w-full text-sm">
                  <div className="flex flex-col items-center">
                    <div className="text-game-accent mb-1">المستوى</div>
                    <div className="text-white font-bold font-share-tech text-lg">5</div>
                  </div>
                  
                  <div className="h-12 w-px bg-white/5"></div>
                  
                  <div className="flex flex-col items-center">
                    <div className="text-game-accent mb-1">المرتبة</div>
                    <div className="text-white font-bold font-share-tech text-lg">#3</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Smartness Meter */}
            <div className="game-panel">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-bold text-white font-changa flex items-center gap-1.5">
                  <Brain className="h-4 w-4 text-game-highlight" />
                  الذكاء الاصطناعي
                </h3>
              </div>
              
              <div className="flex flex-col items-center py-2">
                <div className="relative w-28 h-28">
                  <svg width="100%" height="100%" viewBox="0 0 120 120">
                    {/* Background circle */}
                    <circle 
                      cx="60" 
                      cy="60" 
                      r="54" 
                      fill="none" 
                      stroke="rgba(255,255,255,0.1)" 
                      strokeWidth="8" 
                    />
                    {/* Progress circle */}
                    <circle 
                      cx="60" 
                      cy="60" 
                      r="54" 
                      fill="none" 
                      stroke="url(#smartnessGradient)" 
                      strokeWidth="8" 
                      strokeLinecap="round"
                      strokeDasharray="339.3" 
                      strokeDashoffset="68" // 339.3 - (339.3 * 0.8) for 80% completion
                      transform="rotate(-90 60 60)"
                    />
                    <defs>
                      <linearGradient id="smartnessGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#00FFE1" />
                        <stop offset="100%" stopColor="#32FF88" />
                      </linearGradient>
                    </defs>
                    {/* Center content */}
                    <text x="60" y="55" textAnchor="middle" dominantBaseline="middle" fontSize="28" fill="white" className="font-share-tech">8.9</text>
                    <text x="60" y="75" textAnchor="middle" dominantBaseline="middle" fontSize="12" fill="#00FFE1" className="font-lexend">تعلم</text>
                  </svg>
                </div>
                
                <div className="flex items-center mt-2 bg-game-highlight/10 py-1 px-3 rounded-full">
                  <span className="text-sm font-share-tech text-game-highlight">+0.9</span>
                  <span className="text-xs text-game-highlight/80 mr-1">منذ الأسبوع الماضي</span>
                </div>
              </div>
            </div>
            
            {/* Points & Daily Effort Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="game-panel p-3">
                <div className="flex flex-col items-center">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-orange-500/20 to-orange-500/5 flex items-center justify-center mb-1 border border-orange-500/20">
                    <Flame className="h-4 w-4 text-orange-400" />
                  </div>
                  <h3 className="text-white font-medium text-xs mb-1">الجهد اليومي</h3>
                  <div className="text-xl font-bold text-orange-400 font-share-tech">12</div>
                </div>
              </div>
              
              <div className="game-panel p-3">
                <div className="flex flex-col items-center">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-game-accent/20 to-game-accent/5 flex items-center justify-center mb-1 border border-game-accent/20">
                    <Award className="h-4 w-4 text-game-accent" />
                  </div>
                  <h3 className="text-white font-medium text-xs mb-1">النقاط</h3>
                  <div className="text-xl font-bold text-game-accent font-share-tech">8.9K</div>
                </div>
              </div>
            </div>
            
            {/* Google Ad Section */}
            <div className="game-panel flex-grow">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xs font-bold text-white font-changa flex items-center gap-1">
                  <ExternalLink className="h-3.5 w-3.5 text-green-400" />
                  إعلان
                </h3>
              </div>
              
              <div className="bg-game-card-bg-alt border border-white/5 rounded-lg p-3 flex-1 flex items-center justify-center overflow-hidden">
                {adCode ? (
                  <div dangerouslySetInnerHTML={{ __html: adCode }} className="w-full h-full" />
                ) : (
                  <div className="text-center p-8">
                    <div className="h-10 w-10 rounded-full bg-gray-800/50 flex items-center justify-center mx-auto mb-2">
                      <ExternalLink className="h-5 w-5 text-gray-500" />
                    </div>
                    <p className="text-gray-400 text-sm">مساحة للإعلانات</p>
                    <p className="text-gray-500 text-xs mt-1">Google Ads</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Missing import components
const Bell = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
);

const Lock = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const Activity = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);

export default Index;
