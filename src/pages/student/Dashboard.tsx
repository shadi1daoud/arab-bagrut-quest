
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ChevronLeft, Trophy, Star, CheckCircle, Clock, Flame, Activity, Award, Brain, Target, Calendar } from 'lucide-react';

// Dummy activity data for the chart
const weeklyActivity = [
  { day: 'St', hours: 1.2, color: '#3B82F6' },
  { day: 'Su', hours: 2.5, color: '#3B82F6' },
  { day: 'Mo', hours: 1.0, color: '#7122E3' },
  { day: 'Tu', hours: 2.8, color: '#00E5FF' },
  { day: 'We', hours: 0.6, color: '#3B82F6' },
  { day: 'Th', hours: 1.8, color: '#7122E3' },
  { day: 'Fr', hours: 3.0, color: '#00E5FF' },
];

const leaderboardData = [
  { id: 1, name: 'أحمد', avatar: '👦', level: 4, levelNum: 18, xp: 14520 },
  { id: 2, name: 'سارة', avatar: '👧', level: 13, levelNum: 16, xp: 14550 },
  { id: 3, name: 'محمد', avatar: '👨', level: 15, levelNum: 15, xp: 14650 },
  { id: 4, name: 'ليلى', avatar: '👩', level: 14, levelNum: 14, xp: 14530 },
];

// Upcoming exams
const upcomingExams = [
  { id: 1, subject: 'رياضيات', date: 'الأحد، 12 مايو', icon: '🧮', color: 'from-blue-600 to-blue-400' },
  { id: 2, subject: 'فيزياء', date: 'الثلاثاء، 14 مايو', icon: '⚛️', color: 'from-purple-600 to-purple-400' },
];

const Dashboard = () => {
  const { user } = useAuth();
  const maxActivityHours = Math.max(...weeklyActivity.map(day => day.hours));
  
  // Counter animation for stats
  const [countDone, setCountDone] = useState(false);
  
  useEffect(() => {
    // Trigger counter animation after component mounts
    setCountDone(true);
  }, []);
  
  // Create particles for XP ring
  const createXpParticles = () => {
    const particles = [];
    for (let i = 0; i < 3; i++) {
      particles.push(
        <div key={i} className="orbit-particle" style={{
          animationDelay: `${i * 1.3}s`,
        }}></div>
      );
    }
    return particles;
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* User Profile Card - 3 cols */}
        <div className="lg:col-span-3">
          <div className="game-panel hover:border-game-primary hover:shadow-lg hover:shadow-game-primary/10 transition-all">
            <div className="flex flex-col items-center relative">
              <div className="relative mb-4 orbit-container">
                <div className="h-28 w-28 rounded-full overflow-hidden border-2 border-game-primary/20 shadow-lg bg-gradient-to-br from-game-card-bg-alt to-game-card-bg flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-game-primary/10 to-transparent"></div>
                  <span className="text-white text-4xl font-bold">{user?.name?.charAt(0) || 'S'}</span>
                </div>
                {createXpParticles()}
                <div className="absolute -top-1 -right-1 h-7 w-7 bg-game-primary rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-game-primary/20 font-share-tech">5</div>
              </div>
              
              <h2 className="text-white font-bold text-xl font-changa">{user?.name || 'Shadi Daoud'}</h2>
              <p className="text-game-text-secondary text-sm mb-4">{user?.grade || 'الصف الثاني عشر'}</p>
              
              <div className="w-full mt-2">
                <div className="flex justify-between items-center text-sm mb-1">
                  <div className="text-game-highlight font-medium font-share-tech bg-game-highlight/10 px-2 py-0.5 rounded-lg">Lv 5</div>
                  <span className="text-xs text-blue-300 font-share-tech">2450 / 3000</span>
                </div>
                
                <div className="level-bar">
                  <div className="level-bar-fill" style={{ width: "60%" }}></div>
                </div>
              </div>
              
              <div className="flex justify-center gap-4 mt-6 w-full">
                <div className="flex flex-col items-center">
                  <div className="text-game-accent text-xs mb-1">المستوى</div>
                  <div className="text-white font-bold font-share-tech">5</div>
                </div>
                
                <div className="h-10 w-px bg-white/10"></div>
                
                <div className="flex flex-col items-center">
                  <div className="text-game-accent text-xs mb-1">المرتبة</div>
                  <div className="text-white font-bold font-share-tech">#3</div>
                </div>
                
                <div className="h-10 w-px bg-white/10"></div>
                
                <div className="flex flex-col items-center">
                  <div className="text-game-accent text-xs mb-1">الجهد</div>
                  <div className="text-white font-bold font-share-tech flex items-center">
                    <Flame className="h-3 w-3 text-orange-400 mr-1" />
                    12
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Content - 5 cols */}
        <div className="lg:col-span-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Streak Counter */}
          <div className="game-panel hover:border-orange-500/30 hover:shadow-lg hover:shadow-orange-500/10 transition-all h-full flex flex-col items-center justify-center py-6">
            <div className="mb-3">
              <div className="h-14 w-14 rounded-full bg-gradient-to-br from-orange-500/20 to-orange-500/5 flex items-center justify-center border border-orange-500/20">
                <Flame className="h-8 w-8 text-orange-400 animate-pulse" />
              </div>
            </div>
            <h3 className="text-white font-medium font-lexend">الجهد اليومي</h3>
            <div className={`text-4xl font-bold text-white mt-2 mb-1 font-share-tech ${countDone ? 'animate-counter' : ''}`}>12</div>
            <p className="text-sm text-orange-400">أيام متتالية</p>
            
            <div className="mt-4 flex gap-2">
              {[1, 2, 3, 4, 5, 6, 7].map(day => (
                <div 
                  key={day} 
                  className={`h-2 w-2 rounded-full ${day <= 5 ? 'bg-orange-400' : 'bg-gray-600'}`}
                ></div>
              ))}
            </div>
          </div>
          
          {/* XP Counter */}
          <div className="game-panel hover:border-game-accent/30 hover:shadow-lg hover:shadow-game-accent/10 transition-all h-full flex flex-col items-center justify-center py-6">
            <div className="mb-3">
              <div className="h-14 w-14 rounded-full bg-gradient-to-br from-game-accent/20 to-game-accent/5 flex items-center justify-center border border-game-accent/20">
                <Award className="h-8 w-8 text-game-accent animate-glow" />
              </div>
            </div>
            <h3 className="text-white font-medium font-lexend">مجموع النقاط</h3>
            <div className={`text-4xl font-bold text-white mt-2 mb-1 font-share-tech ${countDone ? 'animate-counter' : ''}`}>8,965</div>
            <p className="text-sm text-game-accent">XP مكتسبة</p>
            
            <div className="mt-4 flex items-center gap-1 text-xs">
              <Star className="h-3 w-3 text-game-highlight" />
              <span className="text-game-highlight">+250</span>
              <span className="text-gray-400">هذا الأسبوع</span>
            </div>
          </div>
        </div>
        
        {/* Intelligence Panel - 4 cols */}
        <div className="lg:col-span-4 game-panel hover:border-green-500/30 hover:shadow-lg hover:shadow-green-500/10 transition-all flex flex-col items-center justify-center py-6 h-full">
          <h3 className="text-white font-medium font-lexend flex items-center gap-2 mb-4">
            <Brain className="h-5 w-5 text-game-highlight" />
            الذكاء الاصطناعي
          </h3>
          
          <div className="xp-progress-ring">
            <svg width="140" height="140" viewBox="0 0 120 120">
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00FFE1" />
                  <stop offset="100%" stopColor="#32FF88" />
                </linearGradient>
              </defs>
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
                stroke="url(#progressGradient)" 
                strokeWidth="8" 
                strokeLinecap="round"
                strokeDasharray="339.3" 
                strokeDashoffset="85" 
                className="animate-pulse"
              />
              <text x="60" y="55" textAnchor="middle" dominantBaseline="middle" fontSize="32" fill="white" className="font-share-tech">8.96</text>
              <text x="60" y="80" textAnchor="middle" dominantBaseline="middle" fontSize="12" fill="#B8B8FF" className="font-lexend">تعلم</text>
            </svg>
          </div>
          
          <div className="flex items-center mt-3 text-sm">
            <span className="py-1 px-3 bg-gradient-to-r from-game-highlight/20 to-game-highlight/10 rounded-full text-game-highlight border border-game-highlight/20 font-share-tech">
              +0.96
            </span>
            <span className="text-gray-400 ml-2">هذا الشهر</span>
          </div>
        </div>
      </div>
      
      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Today's Quest - 3 cols */}
        <div className="lg:col-span-3 game-panel hover:border-game-primary/30 hover:shadow-lg hover:shadow-game-primary/10 transition-all h-full">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-xl font-bold text-white font-changa flex items-center gap-2">
              <Target className="h-5 w-5 text-game-primary" />
              مهمة اليوم
            </h3>
            <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-game-primary/10 text-game-primary">
              <Flame className="h-5 w-5" />
            </div>
          </div>
          
          <div className="py-6 flex flex-col items-center">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-game-primary/20 to-game-primary/5 flex items-center justify-center border border-game-primary/20 mb-4">
              <span className="text-3xl">🧮</span>
            </div>
            
            <h4 className="text-white font-lexend text-lg mb-2">أكمل تحصيلي الرياضيات</h4>
            <p className="text-gray-400 text-sm mb-6 text-center">اختبر معلوماتك في جميع مواضيع الرياضيات</p>
            
            <div className="flex items-center gap-3 text-sm text-game-accent mb-6">
              <Award className="h-4 w-4" />
              <span className="font-share-tech">+150 XP</span>
            </div>
            
            <button className="game-btn w-full py-3 mt-auto">ابدأ المهمة</button>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mt-4">
            <div className="text-center py-2 px-3 bg-game-card-bg-alt rounded-lg backdrop-blur-sm border border-white/5 hover:border-white/10 transition-all cursor-pointer">
              <p className="text-sm text-white">أتعلم</p>
            </div>
            <div className="text-center py-2 px-3 bg-game-card-bg-alt rounded-lg backdrop-blur-sm border border-white/5 hover:border-white/10 transition-all cursor-pointer">
              <p className="text-sm text-white">أبحث</p>
            </div>
          </div>
        </div>
        
        {/* Activity Chart - 5 cols */}
        <div className="lg:col-span-5 game-panel hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10 transition-all">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-white font-changa flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-400" />
              إنجاز أسبوعي
            </h3>
            <div className="flex items-center text-xs">
              <span className="text-gray-400">إجمالي:</span>
              <span className="text-white font-share-tech ml-1">12.9 ساعة</span>
            </div>
          </div>
          
          <div className="relative h-60 mt-6">
            <div className="absolute inset-0 flex items-end justify-between">
              {weeklyActivity.map((day, index) => (
                <div key={day.day} className="flex flex-col items-center group w-1/7">
                  <div className="relative w-full px-1.5">
                    <div 
                      className="w-full rounded-md transition-all duration-300 group-hover:shadow-lg relative overflow-hidden mx-auto"
                      style={{ 
                        height: `${(day.hours / maxActivityHours) * 100}%`, 
                        maxWidth: '24px',
                        background: `linear-gradient(to bottom, ${day.color}70, ${day.color}40)`
                      }}
                    >
                      {/* Top glow effect */}
                      <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-md" style={{ background: day.color }}></div>
                      
                      {/* Hover effect */}
                      <div 
                        className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      ></div>
                      
                      {/* Hover tooltip */}
                      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-game-card-bg px-2 py-1 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap border border-white/10">
                        {day.hours} ساعة
                      </div>
                    </div>
                  </div>
                  <span className="text-gray-400 text-xs mt-2 font-share-tech">{day.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Leaderboard & Upcoming - 4 cols */}
        <div className="lg:col-span-4 space-y-4">
          {/* Leaderboard */}
          <div className="game-panel hover:border-yellow-500/30 hover:shadow-lg hover:shadow-yellow-500/10 transition-all">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white font-changa flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-400" />
                المتصدرون
              </h3>
              <Link to="/community" className="text-xs text-blue-400 hover:underline">
                عرض الكل
              </Link>
            </div>
            
            <div className="space-y-2 mt-4">
              {leaderboardData.map((user, index) => (
                <div 
                  key={user.id} 
                  className={`flex items-center gap-3 p-2 rounded-lg transition-all duration-200 hover:bg-white/5 border ${
                    index === 0 ? 'border-yellow-500/20 bg-yellow-500/5' : 
                    index === 1 ? 'border-gray-300/20 bg-gray-300/5' : 
                    index === 2 ? 'border-orange-500/20 bg-orange-500/5' : 
                    'border-white/5'
                  }`}
                >
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center border ${
                    index === 0 ? 'border-yellow-500/30 text-yellow-400' : 
                    index === 1 ? 'border-gray-300/30 text-gray-300' : 
                    index === 2 ? 'border-orange-500/30 text-orange-400' : 
                    'border-white/10 text-white/70'
                  }`}>
                    <span className="text-xs font-share-tech">{index + 1}</span>
                  </div>
                  
                  <div className="h-8 w-8 rounded-full flex items-center justify-center bg-game-card-bg-alt text-lg border border-white/10">
                    {user.avatar}
                  </div>
                  
                  <div className="flex-1 flex justify-between items-center">
                    <span className="text-white font-medium">{user.name}</span>
                    <span className="text-xs text-game-accent font-share-tech">{user.xp.toLocaleString()} XP</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Upcoming Exams */}
          <div className="game-panel hover:border-red-500/30 hover:shadow-lg hover:shadow-red-500/10 transition-all">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white font-changa flex items-center gap-2">
                <Calendar className="h-5 w-5 text-red-400" />
                امتحانات قادمة
              </h3>
            </div>
            
            <div className="space-y-3 mt-4">
              {upcomingExams.map((exam) => (
                <div 
                  key={exam.id} 
                  className="flex items-center gap-3 p-3 rounded-lg bg-game-card-bg-alt border border-white/5 hover:border-red-500/20 transition-all"
                >
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center bg-gradient-to-br ${exam.color} text-white text-xl`}>
                    {exam.icon}
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="text-white font-medium">{exam.subject}</h4>
                    <div className="flex items-center text-xs text-gray-400">
                      <Clock className="h-3 w-3 mr-1" />
                      {exam.date}
                    </div>
                  </div>
                  
                  <button className="px-3 py-1 rounded-md text-xs bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors border border-red-500/20">
                    تذكير
                  </button>
                </div>
              ))}
              
              <Link to="/courses" className="text-center block w-full text-sm text-blue-400 mt-2 py-2 hover:underline">
                عرض كل الامتحانات
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
