
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ChevronLeft, Trophy, Star, CheckCircle, Clock, Flame, Activity, Award, Brain, Target, Calendar } from 'lucide-react';
import { Tab } from '@headlessui/react';

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
    <div className="h-full grid grid-cols-12 gap-2 animate-fade-in">
      {/* Left Column - Profile & Stats - 3 cols */}
      <div className="col-span-3 flex flex-col gap-2 h-full">
        {/* User Profile */}
        <div className="game-panel p-3 hover:border-game-primary hover:shadow-lg hover:shadow-game-primary/10 transition-all flex-shrink-0">
          <div className="flex flex-col items-center">
            <div className="relative mb-2 orbit-container">
              <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-game-primary/20 shadow-lg bg-gradient-to-br from-game-card-bg-alt to-game-card-bg flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-t from-game-primary/10 to-transparent"></div>
                <span className="text-white text-2xl font-bold">{user?.name?.charAt(0) || 'S'}</span>
              </div>
              {createXpParticles()}
              <div className="absolute -top-1 -right-1 h-5 w-5 bg-game-primary rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-game-primary/20 font-share-tech">5</div>
            </div>
            
            <h2 className="text-white font-bold text-base font-changa mb-0.5">{user?.name || 'شادي'}</h2>
            <p className="text-game-text-secondary text-xs mb-2">{user?.grade || 'الثاني عشر'}</p>
            
            <div className="w-full">
              <div className="flex justify-between items-center text-sm mb-0.5">
                <div className="text-game-highlight font-medium font-share-tech bg-game-highlight/10 px-1.5 py-0.5 rounded text-xs">Lv 5</div>
                <span className="text-xs text-blue-300 font-share-tech">2450/3000</span>
              </div>
              
              <div className="level-bar">
                <div className="level-bar-fill" style={{ width: "60%" }}></div>
              </div>
            </div>
            
            <div className="flex justify-center gap-2 mt-2 w-full text-xs">
              <div className="flex flex-col items-center">
                <div className="text-game-accent mb-0.5">المستوى</div>
                <div className="text-white font-bold font-share-tech">5</div>
              </div>
              
              <div className="h-8 w-px bg-white/10 mx-1"></div>
              
              <div className="flex flex-col items-center">
                <div className="text-game-accent mb-0.5">المرتبة</div>
                <div className="text-white font-bold font-share-tech">#3</div>
              </div>
              
              <div className="h-8 w-px bg-white/10 mx-1"></div>
              
              <div className="flex flex-col items-center">
                <div className="text-game-accent mb-0.5">الجهد</div>
                <div className="text-white font-bold font-share-tech flex items-center">
                  <Flame className="h-3 w-3 text-orange-400 mr-0.5" />
                  12
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-2 flex-shrink-0">
          {/* Streak Counter */}
          <div className="game-panel p-3 hover:border-orange-500/30 hover:shadow-lg hover:shadow-orange-500/10 transition-all flex flex-col items-center justify-center">
            <div className="mb-1">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-500/20 to-orange-500/5 flex items-center justify-center border border-orange-500/20">
                <Flame className="h-6 w-6 text-orange-400 animate-pulse" />
              </div>
            </div>
            <h3 className="text-white font-medium text-sm font-lexend">الجهد اليومي</h3>
            <div className={`text-2xl font-bold text-white mt-1 font-share-tech ${countDone ? 'animate-counter' : ''}`}>12</div>
            <p className="text-xs text-orange-400">أيام متتالية</p>
          </div>
          
          {/* XP Counter */}
          <div className="game-panel p-3 hover:border-game-accent/30 hover:shadow-lg hover:shadow-game-accent/10 transition-all flex flex-col items-center justify-center">
            <div className="mb-1">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-game-accent/20 to-game-accent/5 flex items-center justify-center border border-game-accent/20">
                <Award className="h-6 w-6 text-game-accent animate-glow" />
              </div>
            </div>
            <h3 className="text-white font-medium text-sm font-lexend">النقاط</h3>
            <div className={`text-2xl font-bold text-white mt-1 font-share-tech ${countDone ? 'animate-counter' : ''}`}>8,965</div>
            <p className="text-xs text-game-accent">XP</p>
          </div>
        </div>
        
        {/* Intelligence Panel */}
        <div className="game-panel p-3 hover:border-green-500/30 hover:shadow-lg hover:shadow-green-500/10 transition-all flex flex-col items-center justify-center h-full">
          <h3 className="text-white font-medium font-lexend text-sm flex items-center gap-1.5 mb-2">
            <Brain className="h-4 w-4 text-game-highlight" />
            الذكاء الاصطناعي
          </h3>
          
          <div className="xp-progress-ring flex-1 flex items-center justify-center">
            <svg width="80" height="80" viewBox="0 0 120 120">
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
              <text x="60" y="55" textAnchor="middle" dominantBaseline="middle" fontSize="24" fill="white" className="font-share-tech">8.9</text>
              <text x="60" y="75" textAnchor="middle" dominantBaseline="middle" fontSize="10" fill="#B8B8FF" className="font-lexend">تعلم</text>
            </svg>
          </div>
          
          <div className="flex items-center mt-1 text-xs">
            <span className="py-0.5 px-2 bg-gradient-to-r from-game-highlight/20 to-game-highlight/10 rounded-full text-game-highlight border border-game-highlight/20 font-share-tech">
              +0.9
            </span>
          </div>
        </div>
      </div>
      
      {/* Middle Column - Activity & Quests - 5 cols */}
      <div className="col-span-5 flex flex-col gap-2 h-full">
        {/* Activity Chart */}
        <div className="game-panel p-3 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10 transition-all">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-base font-bold text-white font-changa flex items-center gap-1.5">
              <Activity className="h-4 w-4 text-blue-400" />
              إنجاز أسبوعي
            </h3>
            <div className="flex items-center text-xs">
              <span className="text-white font-share-tech">12.9 ساعة</span>
            </div>
          </div>
          
          <div className="relative h-28">
            <div className="absolute inset-0 flex items-end justify-between">
              {weeklyActivity.map((day, index) => (
                <div key={day.day} className="flex flex-col items-center group w-1/7">
                  <div className="relative w-full px-1">
                    <div 
                      className="w-full rounded-md transition-all duration-300 group-hover:shadow-lg relative overflow-hidden mx-auto"
                      style={{ 
                        height: `${(day.hours / maxActivityHours) * 100}%`, 
                        maxWidth: '16px',
                        background: `linear-gradient(to bottom, ${day.color}70, ${day.color}40)`
                      }}
                    >
                      {/* Top glow effect */}
                      <div className="absolute top-0 left-0 right-0 h-1 rounded-t-md" style={{ background: day.color }}></div>
                      
                      {/* Hover effect */}
                      <div 
                        className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      ></div>
                    </div>
                  </div>
                  <span className="text-gray-400 text-xs mt-1 font-share-tech">{day.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Today's Quest */}
        <div className="game-panel p-3 hover:border-game-primary/30 hover:shadow-lg hover:shadow-game-primary/10 transition-all flex-1">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-base font-bold text-white font-changa flex items-center gap-1.5">
              <Target className="h-4 w-4 text-game-primary" />
              مهمة اليوم
            </h3>
            <div className="h-7 w-7 rounded-lg flex items-center justify-center bg-game-primary/10 text-game-primary">
              <Flame className="h-4 w-4" />
            </div>
          </div>
          
          <div className="flex items-center gap-3 h-full">
            <div className="flex-shrink-0">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-game-primary/20 to-game-primary/5 flex items-center justify-center border border-game-primary/20">
                <span className="text-xl">🧮</span>
              </div>
            </div>
            
            <div className="flex-1">
              <h4 className="text-white font-lexend text-base">أكمل تحصيلي الرياضيات</h4>
              <p className="text-gray-400 text-xs mb-2">اختبر معلوماتك في جميع مواضيع الرياضيات</p>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5 text-xs text-game-accent">
                  <Award className="h-3 w-3" />
                  <span className="font-share-tech">+150 XP</span>
                </div>
                
                <button className="game-btn text-xs py-1 px-3">ابدأ المهمة</button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Upcoming Exams */}
        <div className="game-panel p-3 hover:border-red-500/30 hover:shadow-lg hover:shadow-red-500/10 transition-all">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-base font-bold text-white font-changa flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-red-400" />
              امتحانات قادمة
            </h3>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            {upcomingExams.map((exam) => (
              <div 
                key={exam.id} 
                className="flex items-center gap-2 p-2 rounded-lg bg-game-card-bg-alt border border-white/5 hover:border-red-500/20 transition-all"
              >
                <div className={`h-8 w-8 rounded-lg flex items-center justify-center bg-gradient-to-br ${exam.color} text-white text-lg`}>
                  {exam.icon}
                </div>
                
                <div className="flex-1">
                  <h4 className="text-white font-medium text-sm">{exam.subject}</h4>
                  <div className="flex items-center text-xs text-gray-400">
                    <Clock className="h-3 w-3 mr-0.5" />
                    {exam.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Right Column - Leaderboard - 4 cols */}
      <div className="col-span-4 flex flex-col gap-2 h-full">
        {/* Leaderboard */}
        <div className="game-panel p-3 hover:border-yellow-500/30 hover:shadow-lg hover:shadow-yellow-500/10 transition-all h-full">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-base font-bold text-white font-changa flex items-center gap-1.5">
              <Trophy className="h-4 w-4 text-yellow-400" />
              المتصدرون
            </h3>
            <Link to="/community" className="text-xs text-blue-400 hover:underline">
              عرض الكل
            </Link>
          </div>
          
          <Tab.Group>
            <Tab.List className="flex mb-3 bg-game-card-bg/50 rounded p-0.5 text-xs">
              <Tab 
                className={({ selected }) =>
                  `flex-1 py-1 px-3 rounded-md transition-all ${
                    selected ? 'bg-game-card-bg text-game-primary' : 'text-gray-400'
                  }`
                }
              >
                الأسبوع
              </Tab>
              <Tab
                className={({ selected }) =>
                  `flex-1 py-1 px-3 rounded-md transition-all ${
                    selected ? 'bg-game-card-bg text-game-primary' : 'text-gray-400'
                  }`
                }
              >
                الشهر
              </Tab>
              <Tab
                className={({ selected }) =>
                  `flex-1 py-1 px-3 rounded-md transition-all ${
                    selected ? 'bg-game-card-bg text-game-primary' : 'text-gray-400'
                  }`
                }
              >
                الكل
              </Tab>
            </Tab.List>
            
            <Tab.Panels>
              <Tab.Panel>
                <div className="space-y-1.5">
                  {leaderboardData.map((user, index) => (
                    <div 
                      key={user.id} 
                      className={`flex items-center gap-2 p-2 rounded-lg transition-all duration-200 hover:bg-white/5 border ${
                        index === 0 ? 'border-yellow-500/20 bg-yellow-500/5' : 
                        index === 1 ? 'border-gray-300/20 bg-gray-300/5' : 
                        index === 2 ? 'border-orange-500/20 bg-orange-500/5' : 
                        'border-white/5'
                      }`}
                    >
                      <div className={`h-6 w-6 rounded-full flex items-center justify-center border ${
                        index === 0 ? 'border-yellow-500/30 text-yellow-400' : 
                        index === 1 ? 'border-gray-300/30 text-gray-300' : 
                        index === 2 ? 'border-orange-500/30 text-orange-400' : 
                        'border-white/10 text-white/70'
                      }`}>
                        <span className="text-xs font-share-tech">{index + 1}</span>
                      </div>
                      
                      <div className="h-6 w-6 rounded-full flex items-center justify-center bg-game-card-bg-alt text-base border border-white/10">
                        {user.avatar}
                      </div>
                      
                      <div className="flex-1 flex justify-between items-center">
                        <span className="text-white font-medium text-sm">{user.name}</span>
                        <span className="text-xs text-game-accent font-share-tech">{user.xp.toLocaleString()} XP</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Tab.Panel>
              
              <Tab.Panel>
                <div className="flex items-center justify-center h-20 text-sm text-gray-400">
                  سيتم تحديث بيانات الشهر قريبًا
                </div>
              </Tab.Panel>
              
              <Tab.Panel>
                <div className="flex items-center justify-center h-20 text-sm text-gray-400">
                  سيتم تحديث البيانات الكلية قريبًا
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
