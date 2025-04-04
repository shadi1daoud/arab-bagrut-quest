
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ChevronLeft, Trophy, Star, CheckCircle, Clock, Flame, Activity, Award } from 'lucide-react';

// Dummy activity data for the chart
const weeklyActivity = [
  { day: 'St', hours: 1.2, color: '#3B82F6' },
  { day: 'Su', hours: 2.5, color: '#3B82F6' },
  { day: 'Mo', hours: 1.0, color: '#D946EF' },
  { day: 'Tu', hours: 2.8, color: '#00E5FF' },
  { day: 'We', hours: 0.6, color: '#3B82F6' },
  { day: 'Th', hours: 1.8, color: '#D946EF' },
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
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* User Profile Card - 3 cols */}
        <div className="lg:col-span-3 space-card">
          <div className="flex flex-col items-center">
            <div className="relative mb-3">
              <div className="h-24 w-24 rounded-full overflow-hidden border-2 border-accent/50 shadow-lg shadow-accent/20">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-blue-900 to-cyan-700 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">{user?.name?.charAt(0) || 'S'}</span>
                  </div>
                )}
              </div>
            </div>
            
            <h2 className="text-white font-bold text-xl">{user?.name || 'Shadi Daoud'}</h2>
            <p className="text-game-text-secondary text-sm mb-4">{user?.grade || 'المحطة'}</p>
            
            <div className="w-full mt-2">
              <div className="flex justify-between items-center text-sm mb-1">
                <span className="text-game-highlight font-medium">Lv 5</span>
              </div>
              
              <div className="level-bar">
                <div className="level-bar-fill" style={{ width: "60%" }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Content - 5 cols */}
        <div className="lg:col-span-5 grid grid-cols-1 gap-4">
          {/* Streak Counter */}
          <div className="streak-card flex justify-between items-center">
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-bold text-white">الجهد</h3>
              <div className="text-5xl font-bold text-white mt-2">12</div>
            </div>
            
            <div className="h-12 w-12 rounded-full flex items-center justify-center">
              <Flame className="h-10 w-10 text-orange-500 animate-pulse" />
            </div>
          </div>
          
          {/* XP Counter */}
          <div className="space-card flex justify-between items-center">
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-bold text-white">النقاط</h3>
              <div className="text-5xl font-bold text-white mt-2">8,965</div>
            </div>
            
            <div className="h-12 w-12 rounded-full flex items-center justify-center">
              <Award className="h-10 w-10 text-fuchsia-500 animate-pulse" />
            </div>
          </div>
        </div>
        
        {/* Intelligence Panel - 4 cols */}
        <div className="lg:col-span-4 space-card flex flex-col items-center justify-center py-4">
          <h3 className="text-2xl font-bold text-white mb-4">الذكاء</h3>
          
          <div className="progress-circle w-40 h-40">
            <svg width="160" height="160" viewBox="0 0 160 160">
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#5AFF15" />
                  <stop offset="100%" stopColor="#A2FF00" />
                </linearGradient>
              </defs>
              <circle className="progress-circle-bg" cx="80" cy="80" r="70" />
              <circle 
                className="progress-circle-fill" 
                cx="80" 
                cy="80" 
                r="70" 
                strokeDasharray="439.8" 
                strokeDashoffset="110" 
              />
              <text x="80" y="75" textAnchor="middle" fontSize="36" fontWeight="bold" fill="white">8,96</text>
              <text x="80" y="100" textAnchor="middle" fontSize="16" fill="#B8B8FF">تعلم</text>
            </svg>
          </div>
          
          <p className="text-game-accent text-sm mt-2">استمر! +٩٦:٨ نقطة</p>
        </div>
      </div>
      
      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Today's Quest - 3 cols */}
        <div className="lg:col-span-3 quest-card flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-white">Today's Quest</h3>
            <Flame className="h-6 w-6 text-orange-500 animate-pulse" />
          </div>
          
          <p className="text-white mb-6 text-center">أكمل تحصيلي</p>
          
          <button className="game-btn w-full py-3 mt-auto">Start Quest</button>
          
          <div className="grid grid-cols-2 gap-2 mt-6">
            <div className="text-center py-2 px-3 bg-muted/20 rounded-lg">
              <p className="text-sm text-white">أتعلم</p>
            </div>
            <div className="text-center py-2 px-3 bg-muted/20 rounded-lg">
              <p className="text-sm text-white">أبحث</p>
            </div>
          </div>
        </div>
        
        {/* Activity Chart - 5 cols */}
        <div className="lg:col-span-5 activity-card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-white">إنجاز</h3>
            <Activity className="h-5 w-5 text-blue-400" />
          </div>
          
          <div className="relative h-56 mt-4">
            <div className="absolute inset-0 flex items-end justify-between">
              {weeklyActivity.map((day, index) => (
                <div key={day.day} className="flex flex-col items-center group w-1/7">
                  <div 
                    className="w-12 rounded-md transition-all duration-300"
                    style={{ 
                      height: `${(day.hours / 3) * 100}%`, 
                      backgroundColor: day.color 
                    }}
                  ></div>
                  <span className="text-gray-400 text-xs mt-2">{day.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Leaderboard - 4 cols */}
        <div className="lg:col-span-4 leaderboard-card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-white">Lederboard</h3>
            <Trophy className="h-5 w-5 text-yellow-400" />
          </div>
          
          <div className="space-y-3 mt-4">
            {leaderboardData.map((user) => (
              <div key={user.id} className="flex items-center gap-3 bg-card/40 p-2 rounded-lg">
                <div className="h-10 w-10 rounded-full bg-blue-900/50 flex items-center justify-center border border-blue-400/30">
                  <span className="text-white text-xs">Lv {user.level}</span>
                </div>
                
                <div className="flex-1 flex justify-between items-center">
                  <span className="text-white font-medium">Level {user.levelNum}</span>
                  <span className="text-xs text-game-accent">{user.xp} نقطة</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
