
import { useState } from 'react';
import { 
  Activity, Award, Bell, BookOpen, Brain, Calendar, ChevronRight, 
  Clock, ExternalLink, Flame, Lock, Star, Target, Trophy, Users, Zap, Play,
  TrendingUp, CheckCircle2
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip, LineChart, Line, Area, AreaChart } from 'recharts';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Weekly activity data with consistent values
const weeklyActivity = [
  { day: 'الأحد', xp: 12, hours: 1.2, completed: 3 },
  { day: 'الإثنين', xp: 8, hours: 0.8, completed: 2 },
  { day: 'الثلاثاء', xp: 5, hours: 0.5, completed: 1 },
  { day: 'الأربعاء', xp: 6, hours: 0.6, completed: 2 },
  { day: 'الخميس', xp: 9, hours: 0.9, completed: 3 },
  { day: 'الجمعة', xp: 4, hours: 0.4, completed: 1 },
  { day: 'السبت', xp: 7, hours: 0.7, completed: 2 },
];

// Progress comparison data
const progressComparison = [
  { period: 'الأسبوع الماضي', xp: 42, hours: 4.2 },
  { period: 'هذا الأسبوع', xp: 51, hours: 5.1 }
];

// Friends leaderboard data - top 5
const friendsLeaderboard = [
  { id: 1, name: 'سارة أحمد', level: 15, xp: 8450, avatar: '👧', streak: 12, isFriend: true },
  { id: 2, name: 'محمد علي', level: 14, xp: 7920, avatar: '👦', streak: 8, isFriend: true },
  { id: 3, name: 'أحمد خالد', level: 12, xp: 6540, avatar: '👨', streak: 5, isFriend: true },
  { id: 4, name: 'فاطمة محمد', level: 11, xp: 5890, avatar: '👩', streak: 3, isFriend: true },
  { id: 5, name: 'عمر حسن', level: 10, xp: 5200, avatar: '🧑', streak: 7, isFriend: true }
];

// Today's achievements
const todayAchievements = [
  { id: 1, title: 'مبروك! أكملت 5 دروس', icon: BookOpen, xp: 100 },
  { id: 2, title: 'سلسلة 7 أيام متتالية!', icon: Flame, xp: 50 },
  { id: 3, title: 'حصلت على درجة كاملة', icon: Star, xp: 150 }
];

const Index = () => {
  const [activeTab, setActiveTab] = useState('today');
  
  // Calculate totals
  const totalWeeklyXP = weeklyActivity.reduce((sum, day) => sum + day.xp, 0);
  const totalWeeklyHours = weeklyActivity.reduce((sum, day) => sum + day.hours, 0).toFixed(1);
  const currentStreak = 7;
  const studyGoal = 60; // minutes
  const studyProgress = 45; // minutes completed today
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0E0E0E] via-[#1A1D2F] to-[#0E0E0E] text-white">
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        
        {/* Hero Greeting Section */}
        <section className="relative">
          <Card className="bg-gradient-to-br from-[#FF4800]/20 via-[#FF4800]/10 to-transparent border-[#FF4800]/30 overflow-hidden">
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row items-start gap-8">
                {/* Profile & Greeting */}
                <div className="flex-1 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="h-20 w-20 rounded-full overflow-hidden border-3 border-[#FF4800]/40 shadow-xl">
                        <img src="/lovable-uploads/48f9c971-a223-40f4-9e8b-17c399b6f387.png" alt="Profile" className="h-full w-full object-cover" />
                      </div>
                      <div className="absolute -top-2 -right-2 h-8 w-8 bg-[#FF4800] rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg animate-pulse">5</div>
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold text-white font-changa">مرحباً، شادي! 👋</h1>
                      <p className="text-[#FF4800] text-lg font-medium font-noto">جاهز لرحلة تعلم جديدة اليوم؟</p>
                    </div>
                  </div>
                  
                  {/* XP and Streak Indicators */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-[#FF4800]/20 px-4 py-3 rounded-full border border-[#FF4800]/30">
                      <Flame className="h-5 w-5 text-[#FF4800] animate-pulse" />
                      <span className="text-white font-bold font-['Share_Tech_Mono'] text-lg">{currentStreak}</span>
                      <span className="text-white/80 text-sm font-noto">يوم متتالي</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/10 px-4 py-3 rounded-full border border-white/20">
                      <Star className="h-5 w-5 text-yellow-400" />
                      <span className="text-white font-bold font-['Share_Tech_Mono'] text-lg">2,450</span>
                      <span className="text-white/80 text-sm">XP</span>
                    </div>
                  </div>
                </div>
                
                {/* Daily Study Goal */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 min-w-[300px]">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-white font-semibold font-changa flex items-center gap-2 text-lg">
                      <Target className="h-6 w-6 text-[#FF4800]" />
                      هدف اليوم
                    </h3>
                    <span className="text-[#FF4800] font-bold font-['Share_Tech_Mono'] text-xl">{studyProgress}/{studyGoal}</span>
                  </div>
                  <Progress value={(studyProgress / studyGoal) * 100} className="h-4 mb-3" />
                  <p className="text-white/70 text-sm font-noto mb-4">أكمل {studyGoal - studyProgress} دقيقة أخرى لتحقيق هدفك!</p>
                  
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-[#FF4800] hover:bg-[#FF4800]/90 text-white font-changa">
                      <Play className="h-4 w-4 mr-2" />
                      ابدأ الآن
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#FF4800]/30 to-transparent rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-28 h-28 bg-gradient-to-tr from-purple-500/20 to-transparent rounded-full blur-2xl"></div>
            </CardContent>
          </Card>
        </section>

        {/* Smart Analytics Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly XP Chart */}
          <Card className="bg-black/40 backdrop-blur-md border-white/10">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-white font-bold font-changa text-xl flex items-center gap-2">
                  <Activity className="h6 w-6 text-[#FF4800]" />
                  نشاطك الأسبوعي
                </h3>
                <div className="flex items-center gap-2">
                  <div className="bg-[#FF4800]/10 px-3 py-1 rounded-full text-sm text-[#FF4800] font-['Share_Tech_Mono'] font-medium">
                    {totalWeeklyXP} XP
                  </div>
                  <div className="bg-white/10 px-3 py-1 rounded-full text-sm text-white font-['Share_Tech_Mono']">
                    {totalWeeklyHours} ساعة
                  </div>
                </div>
              </div>
              
              <div className="h-64 w-full mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weeklyActivity}>
                    <defs>
                      <linearGradient id="xpGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FF4800" stopOpacity={0.8} />
                        <stop offset="100%" stopColor="#FF4800" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="day" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#9ca3af', fontSize: 14 }}
                    />
                    <Tooltip
                      contentStyle={{ 
                        backgroundColor: 'rgba(26, 29, 47, 0.95)', 
                        border: '1px solid rgba(255,72,0,0.2)',
                        borderRadius: '12px',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
                      }}
                      labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                      itemStyle={{ color: '#FF4800' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="xp" 
                      stroke="#FF4800" 
                      strokeWidth={3}
                      fill="url(#xpGradient)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="text-2xl font-bold text-white font-['Share_Tech_Mono']">{weeklyActivity.reduce((sum, day) => sum + day.completed, 0)}</div>
                  <div className="text-sm text-gray-400 font-noto">دروس مكتملة</div>
                </div>
                <div className="bg-[#FF4800]/10 rounded-xl p-4">
                  <div className="text-2xl font-bold text-[#FF4800] font-['Share_Tech_Mono']">{totalWeeklyXP}</div>
                  <div className="text-sm text-gray-400 font-noto">نقاط خبرة</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="text-2xl font-bold text-white font-['Share_Tech_Mono']">{totalWeeklyHours}</div>
                  <div className="text-sm text-gray-400 font-noto">ساعات دراسة</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Weekly Progress Comparison */}
          <Card className="bg-black/40 backdrop-blur-md border-white/10">
            <CardContent className="p-6">
              <h3 className="text-white font-bold font-changa text-xl mb-6 flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-green-400" />
                مقارنة التقدم
              </h3>
              
              <div className="space-y-6">
                {progressComparison.map((period, index) => (
                  <div key={period.period} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-medium font-noto text-lg">{period.period}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-[#FF4800] font-bold font-['Share_Tech_Mono'] text-lg">{period.xp} XP</span>
                        <span className="text-white/70 font-['Share_Tech_Mono']">{period.hours} ساعة</span>
                      </div>
                    </div>
                    <Progress value={index === 0 ? 70 : 85} className="h-3" />
                  </div>
                ))}
                
                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 mt-6">
                  <div className="flex items-center gap-2 text-green-400 mb-2">
                    <TrendingUp className="h-5 w-5" />
                    <span className="font-semibold font-noto text-lg">تحسن ملحوظ!</span>
                  </div>
                  <p className="text-white/80 text-sm font-noto">زدت بـ 9 XP و 0.9 ساعة هذا الأسبوع مقارنة بالأسبوع الماضي</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Student of the Week & Friends Leaderboard */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Student of the Week */}
          <div className="lg:col-span-2">
            <Card className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/30 overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-white font-bold font-changa text-xl flex items-center gap-2">
                    <Trophy className="h-6 w-6 text-yellow-400" />
                    طالب الأسبوع
                  </h3>
                  <div className="bg-yellow-500/20 px-3 py-1 rounded-full text-sm text-yellow-400 font-medium">
                    أسبوع 42
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="h-24 w-24 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 p-1">
                      <div className="h-full w-full rounded-full bg-[#1A1D2F] flex items-center justify-center text-4xl">
                        👧
                      </div>
                    </div>
                    <div className="absolute -top-3 -right-3 h-10 w-10 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                      <Trophy className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="text-2xl font-bold text-white font-changa mb-1">سارة أحمد</h4>
                    <p className="text-yellow-400 font-medium font-noto mb-3 text-lg">الثالث الثانوي - مدرسة النور</p>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-full">
                        <Star className="h-4 w-4 text-yellow-400" />
                        <span className="text-white font-['Share_Tech_Mono'] font-medium">8,450 XP</span>
                      </div>
                      <div className="flex items-center gap-2 bg-orange-500/20 px-3 py-2 rounded-full">
                        <Flame className="h-4 w-4 text-orange-500" />
                        <span className="text-white font-['Share_Tech_Mono'] font-medium">12 يوم</span>
                      </div>
                      <div className="flex items-center gap-2 bg-blue-500/20 px-3 py-2 rounded-full">
                        <BookOpen className="h-4 w-4 text-blue-400" />
                        <span className="text-white font-['Share_Tech_Mono'] font-medium">47 درس</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-changa px-6">
                    عرض الملف
                  </Button>
                </div>
                
                <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
                  <p className="text-white/90 font-noto italic text-center">
                    "الاستمرارية والمثابرة هما مفتاح النجاح في التعلم"
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Friends Leaderboard */}
          <Card className="bg-black/40 backdrop-blur-md border-white/10">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-white font-bold font-changa text-lg flex items-center gap-2">
                  <Users className="h-5 w-5 text-[#FF4800]" />
                  أصدقائك المتصدرون
                </h3>
                <Button variant="link" className="text-[#FF4800] p-0 h-auto text-sm">
                  عرض الكل
                </Button>
              </div>
              
              <div className="space-y-3">
                {friendsLeaderboard.slice(0, 5).map((user, index) => (
                  <div key={user.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      index === 0 ? 'bg-yellow-500 text-black' :
                      index === 1 ? 'bg-gray-300 text-black' :
                      index === 2 ? 'bg-orange-500 text-white' :
                      'bg-white/10 text-white'
                    }`}>
                      {index + 1}
                    </div>
                    
                    <div className="h-10 w-10 rounded-full bg-[#FF4800]/20 flex items-center justify-center text-lg">
                      {user.avatar}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="text-white text-sm font-medium truncate font-changa">{user.name}</div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#FF4800] text-xs font-['Share_Tech_Mono']">{user.xp.toLocaleString()} XP</span>
                        <span className="text-gray-400 text-xs">•</span>
                        <span className="text-gray-400 text-xs font-noto">المستوى {user.level}</span>
                      </div>
                    </div>
                    
                    {user.streak > 0 && (
                      <div className="flex items-center gap-1 bg-orange-500/20 px-2 py-1 rounded-full">
                        <Flame className="h-3 w-3 text-orange-500" />
                        <span className="text-xs text-white font-['Share_Tech_Mono']">{user.streak}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-white/10">
                <Button variant="outline" className="w-full border-[#FF4800]/30 text-[#FF4800] hover:bg-[#FF4800]/10 font-changa">
                  دعوة أصدقاء جدد
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Ad Section */}
        <section>
          <Card className="bg-black/20 backdrop-blur-sm border-white/5">
            <CardContent className="p-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs text-gray-400 font-changa flex items-center gap-2">
                  <ExternalLink className="h-4 w-4 text-[#FF4800]" />
                  مساحة إعلانية تفاعلية
                </span>
              </div>
              
              <div className="bg-gradient-to-r from-[#FF4800]/5 to-purple-500/5 border-2 border-dashed border-white/10 rounded-2xl h-40 flex items-center justify-center hover:border-[#FF4800]/20 transition-all duration-300 group cursor-pointer">
                <div className="text-center">
                  <div className="h-12 w-12 rounded-full bg-[#FF4800]/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#FF4800]/20 transition-colors">
                    <ExternalLink className="h-6 w-6 text-[#FF4800]" />
                  </div>
                  <h4 className="text-white text-lg font-changa mb-2 group-hover:text-[#FF4800] transition-colors">مساحة للمحتوى الإعلاني</h4>
                  <p className="text-gray-400 text-sm font-noto group-hover:text-white transition-colors">اكتشف عروض وخدمات تعليمية مميزة</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Index;
