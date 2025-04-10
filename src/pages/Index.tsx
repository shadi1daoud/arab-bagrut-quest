
import React, { useState } from 'react';
import { 
  Activity, Award, Bell, BookOpen, Brain, Calendar, CheckCircle, 
  ChevronRight, ExternalLink, Flame, Lock, MoreHorizontal, Star, Target, Trophy, Users 
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

// Sample data for the activity chart
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

const Index = () => {
  const [adCode, setAdCode] = useState('');
  const [leaderboardFilter, setLeaderboardFilter] = useState('week');
  
  // Calculate total weekly hours
  const totalWeeklyHours = weeklyActivity.reduce((acc, day) => acc + day.hours, 0).toFixed(1);
  
  return (
    <div className="h-full grid grid-cols-12 gap-3 p-0">
      {/* LEFT COLUMN - Profile & Stats */}
      <div className="col-span-3 flex flex-col gap-3">
        {/* User Profile Card */}
        <Card className="game-panel overflow-hidden">
          <CardContent className="p-3">
            <div className="flex flex-col items-center">
              <div className="relative mb-2">
                <Avatar className="h-16 w-16 border-2 border-game-primary/30">
                  <AvatarFallback className="bg-gradient-to-br from-game-card-bg to-game-card-bg-alt text-xl font-bold">
                    ش
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -top-1 -right-1 h-5 w-5 bg-game-primary rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-game-primary/20 font-share-tech">5</div>
              </div>
              
              <h2 className="text-white font-bold text-base mb-0.5 font-changa">شادي داود</h2>
              <p className="text-game-text-secondary text-xs mb-2">الثاني عشر - دار الأرقم</p>
              
              <div className="w-full">
                <div className="flex justify-between items-center mb-1">
                  <div className="text-game-highlight text-xs px-2 py-0.5 bg-game-highlight/10 rounded-md font-bold font-share-tech">Lv 5</div>
                  <span className="text-xs text-blue-300 font-share-tech">2450/3000</span>
                </div>
                
                <div className="h-2 bg-game-card-bg-alt rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                    style={{ width: '70%' }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          <StatsCard icon={<Flame className="h-4 w-4 text-orange-400" />} title="الجهد" value="12" />
          <StatsCard icon={<Award className="h-4 w-4 text-game-accent" />} title="النقاط" value="8.9K" />
          <StatsCard icon={<Brain className="h-4 w-4 text-blue-400" />} title="الذكاء" value="8.9" />
        </div>
        
        {/* AI Smartness Score */}
        <Card className="game-panel overflow-hidden flex-1">
          <CardContent className="p-3 flex flex-col items-center">
            <h3 className="text-sm font-bold text-white font-changa flex items-center gap-2 mb-2">
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
                <text x="60" y="75" textAnchor="middle" dominantBaseline="middle" fontSize="10" fill="#B8B8FF" className="font-lexend">تعلم</text>
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
      </div>
      
      {/* MIDDLE COLUMN */}
      <div className="col-span-6 flex flex-col gap-3">
        {/* Weekly Progress Chart */}
        <Card className="game-panel overflow-hidden">
          <CardContent className="p-3">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-bold text-white font-changa flex items-center gap-2">
                <Activity className="h-4 w-4 text-blue-400" />
                إنجاز أسبوعي
              </h3>
              
              <div className="flex items-center gap-2 py-1 px-2 bg-blue-500/20 rounded-full">
                <span className="text-xs text-blue-300 font-share-tech">{totalWeeklyHours} ساعة</span>
              </div>
            </div>
            
            <div className="h-44 w-full">
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
                    tick={{ fill: '#9ca3af', fontSize: 10 }}
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
                    formatter={(value) => [`${value} XP`, 'نقاط اليوم']}
                  />
                  <Bar 
                    dataKey="xp" 
                    fill="url(#barGradient)" 
                    radius={[4, 4, 0, 0]}
                    barSize={18}
                    animationDuration={1500}
                    className="hover:opacity-80 transition-opacity cursor-pointer"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Today's Quest */}
        <Card className="game-panel overflow-hidden flex-1">
          <CardContent className="p-3">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-bold text-white font-changa flex items-center gap-2">
                <Target className="h-4 w-4 text-game-primary" />
                مهمة اليوم
              </h3>
            </div>
            
            <div className="flex items-center gap-3 p-2 bg-game-card-bg-alt/30 rounded-lg">
              <div className="h-14 w-14 rounded-lg bg-gradient-to-br from-game-primary/30 to-game-primary/5 flex items-center justify-center border border-game-primary/20 relative group">
                <span className="text-2xl transform group-hover:scale-110 transition-transform">🧮</span>
                <div className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center border border-white/10">
                  <Flame className="h-3 w-3" />
                </div>
              </div>
              
              <div className="flex-1">
                <h4 className="text-white font-medium font-lexend">أكمل تحصيلي الرياضيات</h4>
                <p className="text-xs text-gray-400 mb-1">حل 10 مسائل جديدة من كتاب التحصيلي</p>
                
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center gap-1 text-xs text-game-accent">
                    <Award className="h-3.5 w-3.5" />
                    <span className="font-share-tech">+150 XP</span>
                  </div>
                  
                  <Button className="bg-gradient-to-r from-game-primary to-game-primary/90 hover:brightness-110 text-white py-1 px-3 rounded-lg text-xs h-7 hover:scale-105 transition-transform">
                    ابدأ المهمة
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Additional quests (compact) */}
            <div className="mt-2 space-y-2">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-game-card-bg-alt/30 hover:bg-game-card-bg-alt/50 transition-colors cursor-pointer">
                <div className="h-8 w-8 rounded-md bg-gradient-to-br from-green-500/30 to-green-500/5 flex items-center justify-center">
                  <span className="text-lg">📝</span>
                </div>
                <div className="flex-1">
                  <h5 className="text-white text-xs font-medium">اختبار الفهم القرائي</h5>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">15 دقيقة</span>
                    <span className="text-xs text-game-accent font-share-tech">+50 XP</span>
                  </div>
                </div>
                <CheckCircle className="h-4 w-4 text-gray-500" />
              </div>
              
              <div className="flex items-center gap-2 p-2 rounded-lg bg-game-card-bg-alt/30 hover:bg-game-card-bg-alt/50 transition-colors cursor-pointer">
                <div className="h-8 w-8 rounded-md bg-gradient-to-br from-purple-500/30 to-purple-500/5 flex items-center justify-center">
                  <span className="text-lg">⚗️</span>
                </div>
                <div className="flex-1">
                  <h5 className="text-white text-xs font-medium">مراجعة درس الكيمياء</h5>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">20 دقيقة</span>
                    <span className="text-xs text-game-accent font-share-tech">+80 XP</span>
                  </div>
                </div>
                <CheckCircle className="h-4 w-4 text-gray-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Coming Soon Courses */}
        <Card className="game-panel overflow-hidden">
          <CardContent className="p-3">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-bold text-white font-changa flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-purple-400" />
                كورسات قريباً
              </h3>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="p-2 rounded-lg bg-game-card-bg-alt border border-white/5 hover:border-white/10 transition-all cursor-not-allowed opacity-70">
                <div className="flex items-center gap-2">
                  <div className="h-9 w-9 rounded-lg flex items-center justify-center bg-gradient-to-br from-cyan-500 to-cyan-700">
                    <span className="text-base">📊</span>
                  </div>
                  
                  <div>
                    <h4 className="text-gray-300 font-medium text-xs">علم البيانات</h4>
                    <div className="flex items-center gap-1 mt-0.5">
                      <div className="flex items-center text-xs text-gray-500">
                        <Lock className="h-3 w-3 mr-1" />
                        قريباً
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-2 rounded-lg bg-game-card-bg-alt border border-white/5 hover:border-white/10 transition-all cursor-not-allowed opacity-70">
                <div className="flex items-center gap-2">
                  <div className="h-9 w-9 rounded-lg flex items-center justify-center bg-gradient-to-br from-indigo-500 to-indigo-700">
                    <span className="text-base">💻</span>
                  </div>
                  
                  <div>
                    <h4 className="text-gray-300 font-medium text-xs">علوم الحاسب</h4>
                    <div className="flex items-center gap-1 mt-0.5">
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
      
      {/* RIGHT COLUMN */}
      <div className="col-span-3 flex flex-col gap-3">
        {/* Leaderboard */}
        <Card className="game-panel overflow-hidden">
          <CardContent className="p-3">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-bold text-white font-changa flex items-center gap-2">
                <Trophy className="h-4 w-4 text-yellow-400" />
                المتصدرون
              </h3>
              
              <div className="flex items-center gap-1 text-xs p-0.5 bg-game-card-bg-alt rounded-md">
                <button 
                  onClick={() => setLeaderboardFilter('week')}
                  className={`px-1.5 py-0.5 rounded ${leaderboardFilter === 'week' 
                    ? 'bg-game-primary text-white' 
                    : 'text-gray-400'}`}
                >
                  أسبوعي
                </button>
                <button 
                  onClick={() => setLeaderboardFilter('month')}
                  className={`px-1.5 py-0.5 rounded ${leaderboardFilter === 'month' 
                    ? 'bg-game-primary text-white' 
                    : 'text-gray-400'}`}
                >
                  شهري
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
                    index === 0 ? 'bg-gradient-to-br from-yellow-500/80 to-yellow-600/80 text-white' : 
                    index === 1 ? 'bg-gradient-to-br from-gray-300/80 to-gray-400/80 text-gray-800' : 
                    'bg-gradient-to-br from-orange-500/80 to-orange-600/80 text-white'
                  } font-bold text-xs`}>
                    {index + 1}
                  </div>
                  
                  <div className="h-8 w-8 rounded-full flex items-center justify-center bg-game-card-bg-alt border border-white/10 text-base">
                    {user.avatar}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-xs font-medium truncate">{user.name}</div>
                    <div className="text-xs text-gray-400">Lv {user.level}</div>
                  </div>
                  
                  <div className="text-sm font-bold font-share-tech text-game-accent">
                    {user.xp.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
            
            <Button variant="ghost" size="sm" className="w-full mt-2 text-xs text-blue-400 hover:text-blue-300 hover:bg-white/5">
              <Users className="h-3.5 w-3.5 mr-1" />
              عرض الكل
            </Button>
          </CardContent>
        </Card>
        
        {/* Course Progress */}
        <Card className="game-panel flex-1 overflow-hidden">
          <CardContent className="p-3">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-bold text-white font-changa flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-blue-400" />
                تقدم الكورسات
              </h3>
            </div>
            
            <div className="space-y-2">
              {courseProgress.map(course => (
                <div key={course.id} className="group hover:scale-[1.01] transition-transform">
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-5 rounded-md flex items-center justify-center bg-blue-500/20 text-blue-400">
                        <span className="text-xs">{course.icon}</span>
                      </div>
                      <span className="text-white text-xs">{course.name}</span>
                    </div>
                    <span className="text-xs text-game-accent font-share-tech">{course.progress}%</span>
                  </div>
                  
                  <div className="h-1.5 bg-game-card-bg-alt rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-blue-500 group-hover:bg-blue-400 transition-colors"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Google Ad Section */}
        <Card className="game-panel overflow-hidden">
          <CardContent className="p-3">
            <div className="flex justify-between items-center mb-1.5">
              <h3 className="text-xs font-bold text-white font-changa flex items-center gap-1">
                <ExternalLink className="h-3 w-3 text-green-400" />
                إعلان
              </h3>
            </div>
            
            <div className="bg-gray-800/50 border border-white/5 rounded-lg p-1.5 flex-1 flex items-center justify-center overflow-hidden" style={{height: '70px'}}>
              {adCode ? (
                <div dangerouslySetInnerHTML={{ __html: adCode }} className="w-full h-full" />
              ) : (
                <div className="text-center">
                  <Award className="h-3.5 w-3.5 text-gray-500 mx-auto mb-1" />
                  <p className="text-[10px] text-gray-400">مساحة للإعلانات</p>
                </div>
              )}
            </div>
            
            <div className="mt-1.5">
              <Input 
                value={adCode}
                onChange={(e) => setAdCode(e.target.value)}
                placeholder="كود Google Ad"
                className="text-[10px] h-6 bg-gray-800/50 border-gray-700"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Stats Card Component
const StatsCard = ({ icon, title, value }) => (
  <div className="game-panel p-2 flex flex-col items-center hover:scale-105 transition-transform">
    <div className="h-6 w-6 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-500/5 flex items-center justify-center mb-1">
      {icon}
    </div>
    <h3 className="text-white font-medium text-[10px]">{title}</h3>
    <div className="text-base font-bold text-white font-share-tech">{value}</div>
  </div>
);

export default Index;
