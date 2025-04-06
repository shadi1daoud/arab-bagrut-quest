
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ChevronLeft, Trophy, Star, CheckCircle, Clock, Flame, Activity, Award } from 'lucide-react';

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
  { id: 1, name: 'أحمد', level: 4, levelNum: 18, xp: 14520 },
  { id: 2, name: 'سارة', level: 13, levelNum: 16, xp: 14550 },
  { id: 3, name: 'محمد', level: 15, levelNum: 15, xp: 14650 },
  { id: 4, name: 'ليلى', level: 14, levelNum: 14, xp: 14530 },
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
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* User Profile Card - 3 cols */}
        <div className="lg:col-span-3 xp-card hover-scale">
          <div className="flex flex-col items-center relative">
            <div className="relative mb-3 orbit-container">
              <div className="h-24 w-24 rounded-full overflow-hidden border-2 border-white/10 shadow-lg">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-game-secondary/30 to-game-secondary/10 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">{user?.name?.charAt(0) || 'S'}</span>
                  </div>
                )}
              </div>
              {createXpParticles()}
              <div className="absolute -top-1 -right-1 h-6 w-6 bg-game-primary rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-game-primary/20 font-share-tech">5</div>
            </div>
            
            <h2 className="text-white font-bold text-xl font-changa">{user?.name || 'Shadi Daoud'}</h2>
            <p className="text-game-text-secondary text-sm mb-4">{user?.grade || 'المحطة'}</p>
            
            <div className="w-full mt-2">
              <div className="flex justify-between items-center text-sm mb-1">
                <span className="text-game-highlight font-medium font-share-tech">Lv 5</span>
                <span className="text-xs text-blue-300 font-share-tech">2450 / 3000</span>
              </div>
              
              <div className="level-bar">
                <div className="level-bar-fill" style={{ width: "60%" }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Content - 5 cols */}
        <div className="lg:col-span-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Streak Counter */}
          <div className="stats-card flex flex-col items-center py-5 hover-scale">
            <div className="mb-2">
              <Flame className="h-8 w-8 text-orange-400" />
            </div>
            <h3 className="stat-label">الجهد</h3>
            <div className={`stat-value primary ${countDone ? 'animate-counter' : ''}`}>12</div>
            <p className="text-xs text-gray-400 mt-1">أيام متتالية</p>
          </div>
          
          {/* XP Counter */}
          <div className="stats-card flex flex-col items-center py-5 hover-scale">
            <div className="mb-2">
              <Award className="h-8 w-8 text-game-accent" />
            </div>
            <h3 className="stat-label">النقاط</h3>
            <div className={`stat-value accent ${countDone ? 'animate-counter' : ''}`}>8,965</div>
            <p className="text-xs text-gray-400 mt-1">المجموع الكلي</p>
          </div>
        </div>
        
        {/* Intelligence Panel - 4 cols */}
        <div className="lg:col-span-4 stats-card flex flex-col items-center justify-center py-6 hover-scale">
          <h3 className="text-2xl font-bold text-white mb-4 font-changa">الذكاء</h3>
          
          <div className="xp-progress-ring">
            <svg width="120" height="120" viewBox="0 0 120 120">
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#5AFF15" />
                  <stop offset="100%" stopColor="#A2FF00" />
                </linearGradient>
              </defs>
              <circle 
                cx="60" 
                cy="60" 
                r="54" 
                fill="none" 
                stroke="rgba(255,255,255,0.1)" 
                strokeWidth="4" 
              />
              <circle 
                cx="60" 
                cy="60" 
                r="54" 
                fill="none" 
                stroke="url(#progressGradient)" 
                strokeWidth="6" 
                strokeLinecap="round"
                strokeDasharray="339.3" 
                strokeDashoffset="85" 
              />
              <text x="60" y="60" textAnchor="middle" dominantBaseline="middle" fontSize="32" fill="white" className="font-share-tech">8.96</text>
              <text x="60" y="82" textAnchor="middle" dominantBaseline="middle" fontSize="14" fill="#B8B8FF" className="font-changa">تعلم</text>
            </svg>
          </div>
          
          <p className="text-game-highlight text-sm mt-3 font-outfit">
            <span className="inline-block py-1 px-2 bg-game-highlight/10 rounded-full text-xs">
              +0.96 نقطة
            </span>
          </p>
        </div>
      </div>
      
      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Today's Quest - 3 cols */}
        <div className="lg:col-span-3 quest-card flex flex-col hover-scale">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-white font-changa">مهمة اليوم</h3>
            <div className="h-8 w-8 rounded-full flex items-center justify-center bg-game-primary/10">
              <Flame className="h-5 w-5 text-game-primary" />
            </div>
          </div>
          
          <p className="text-white text-center mb-6">أكمل تحصيلي</p>
          
          <button className="game-btn w-full py-3 mt-auto font-outfit">ابدأ المهمة</button>
          
          <div className="grid grid-cols-2 gap-2 mt-6">
            <div className="text-center py-2 px-3 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10">
              <p className="text-sm text-white">أتعلم</p>
            </div>
            <div className="text-center py-2 px-3 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10">
              <p className="text-sm text-white">أبحث</p>
            </div>
          </div>
        </div>
        
        {/* Activity Chart - 5 cols */}
        <div className="lg:col-span-5 activity-card hover-scale">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-white font-changa">إنجاز</h3>
            <Activity className="h-5 w-5 text-game-accent" />
          </div>
          
          <div className="relative h-56 mt-4">
            <div className="absolute inset-0 flex items-end justify-between">
              {weeklyActivity.map((day, index) => (
                <div key={day.day} className="flex flex-col items-center group w-1/7">
                  <div 
                    className="w-12 rounded-md transition-all duration-300 group-hover:shadow-lg relative overflow-hidden"
                    style={{ 
                      height: `${(day.hours / maxActivityHours) * 100}%`, 
                      backgroundColor: day.color,
                    }}
                  >
                    <div 
                      className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    ></div>
                  </div>
                  <span className="text-gray-400 text-xs mt-2 font-share-tech">{day.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Leaderboard - 4 cols */}
        <div className="lg:col-span-4 leaderboard-card hover-scale">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-white font-changa">المتصدرون</h3>
            <div className="h-6 w-6 flex items-center justify-center">
              <Trophy className="h-5 w-5 text-yellow-400" />
            </div>
          </div>
          
          <div className="space-y-3 mt-4">
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
                
                <div className="flex-1 flex justify-between items-center">
                  <span className="text-white font-medium">Level {user.levelNum}</span>
                  <span className="text-xs text-game-accent font-share-tech">{user.xp.toLocaleString()} نقطة</span>
                </div>
              </div>
            ))}
          </div>
          
          <button className="game-btn-outline w-full mt-4 py-2 text-sm">عرض الكل</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
