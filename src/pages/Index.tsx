
import { useNavigate } from 'react-router-dom';
import { Flame, Trophy, ChevronRight, Activity, Award, BarChart3, Clock, ExternalLink, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

// Sample data for the performance chart
const performanceData = [
  { day: 'الأحد', mins: 45, xp: 120 },
  { day: 'الإثنين', mins: 30, xp: 80 },
  { day: 'الثلاثاء', mins: 60, xp: 150 },
  { day: 'الأربعاء', mins: 15, xp: 40 },
  { day: 'الخميس', mins: 75, xp: 180 },
  { day: 'الجمعة', mins: 50, xp: 130 },
  { day: 'السبت', mins: 35, xp: 90 },
];

const Index = () => {
  const navigate = useNavigate();
  const [adCode, setAdCode] = useState('');

  // Function to handle ad code change
  const handleAdCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdCode(e.target.value);
  };

  return (
    <div className="h-full flex flex-col items-center justify-start relative overflow-hidden">
      {/* Galaxy particles background */}
      <div className="galaxy-particles absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5 + 0.1,
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            animationDelay: `${Math.random() * 15}s`,
            animationDuration: `${Math.random() * 10 + 10}s`
          }}></div>
        ))}
      </div>
      
      {/* Cyber grid background */}
      <div className="cyber-grid absolute inset-0"></div>
      
      <div className="container h-full max-w-full px-2 relative z-10 flex flex-col">
        {/* Header Section - More compact */}
        <div className="game-panel p-2 mb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-game-primary p-1.5 rounded-xl shadow-lg shadow-game-primary/20">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 10C21 10 18.995 7.26822 17.3662 5.63824C15.7373 4.00827 13.4864 3 11 3C6.02944 3 2 7.02944 2 12C2 16.9706 6.02944 21 11 21C15.9706 21 20 16.9706 20 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 2L13 11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold font-changa text-white">درسني</h1>
                <h2 className="text-xs font-changa text-game-text-secondary">منصة تعليمية جديدة لطلاب المراحل الثانوية</h2>
              </div>
            </div>
            <button 
              onClick={() => navigate('/login')}
              className="game-btn px-3 py-1 text-sm hover-scale"
            >
              ابدأ رحلتك الآن
            </button>
          </div>
        </div>
        
        {/* Main content grid - Restructured for better space usage */}
        <div className="grid grid-cols-12 gap-2 flex-1">
          {/* Left Column - Main features - 8 cols */}
          <div className="col-span-8 grid grid-rows-[auto_1fr_auto] gap-2">
            {/* Features in 2x2 grid - More compact */}
            <div className="grid grid-cols-2 gap-2">
              <div className="xp-card p-2 hover-scale">
                <div className="flex items-start gap-2">
                  <div className="h-6 w-6 rounded-full bg-game-primary/20 flex items-center justify-center flex-shrink-0">
                    <Flame className="h-3.5 w-3.5 text-game-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-changa text-white mb-0.5">تعلم بأسلوب جديد</h3>
                    <p className="text-gray-300 text-xs mb-1">استمتع بالتعلم من خلال نظام تعليمي مبتكر يشبه الألعاب.</p>
                    <div className="flex items-center text-game-accent text-xs">
                      <span className="font-semibold">استكشف المزيد</span>
                      <ChevronRight className="h-3 w-3 ml-1" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="stats-card p-2 hover-scale">
                <div className="flex items-start gap-2">
                  <div className="h-6 w-6 rounded-full bg-game-accent/20 flex items-center justify-center flex-shrink-0">
                    <Trophy className="h-3.5 w-3.5 text-game-accent" />
                  </div>
                  <div>
                    <h3 className="text-sm font-changa text-white mb-0.5">حقق التفوق</h3>
                    <p className="text-gray-300 text-xs mb-1">تنافس مع زملائك واحصل على مكافآت عند إكمال المهام التعليمية.</p>
                    <div className="flex items-center text-game-accent text-xs">
                      <span className="font-semibold">تعرف على المكافآت</span>
                      <ChevronRight className="h-3 w-3 ml-1" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Weekly Performance Chart - Enhanced with actual data visualization */}
            <div className="game-panel p-2 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10 transition-all">
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-sm font-bold text-white font-changa flex items-center gap-1">
                  <Activity className="h-3.5 w-3.5 text-blue-400" />
                  إنجاز أسبوعي
                </h3>
                <div className="flex items-center text-xs bg-blue-500/20 py-0.5 px-1.5 rounded-full">
                  <span className="text-blue-300 font-share-tech">310 دقيقة</span>
                </div>
              </div>
              
              <div className="h-32">
                <ChartContainer config={{
                  xp: { color: "#3B82F6", label: "XP المكتسبة" }
                }} className="h-full text-xs">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={performanceData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
                      <XAxis 
                        dataKey="day" 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#9ca3af', fontSize: 10 }}
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
                        fill="#3B82F6" 
                        radius={[3, 3, 0, 0]}
                        barSize={14}
                        className="fill-blue-500 focus:fill-blue-400 hover:fill-blue-400"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </div>
            
            {/* Upcoming Exams - Compact section */}
            <div className="game-panel p-2 hover:border-red-500/30 hover:shadow-lg hover:shadow-red-500/10 transition-all h-auto">
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-sm font-bold text-white font-changa flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-red-400" />
                  امتحانات قادمة
                </h3>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 1, subject: 'رياضيات', date: 'الأحد، 12 مايو', icon: '🧮', color: 'from-blue-600 to-blue-400' },
                  { id: 2, subject: 'فيزياء', date: 'الثلاثاء، 14 مايو', icon: '⚛️', color: 'from-purple-600 to-purple-400' },
                ].map((exam) => (
                  <div 
                    key={exam.id} 
                    className="flex items-center gap-2 p-1.5 rounded-lg bg-game-card-bg-alt border border-white/5 hover:border-red-500/20 transition-all"
                  >
                    <div className={`h-7 w-7 rounded-lg flex items-center justify-center bg-gradient-to-br ${exam.color} text-white text-base`}>
                      {exam.icon}
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="text-white font-medium text-xs">{exam.subject}</h4>
                      <div className="flex items-center text-xs text-gray-400">
                        <Clock className="h-2.5 w-2.5 mr-0.5" />
                        {exam.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right Column - Profile & User related - 4 cols */}
          <div className="col-span-4 grid grid-rows-[auto_auto_1fr] gap-2">
            {/* Leaderboard - Compact version with only 3 users */}
            <div className="game-panel p-2 hover:border-yellow-500/30 hover:shadow-lg hover:shadow-yellow-500/10 transition-all">
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-sm font-bold text-white font-changa flex items-center gap-1">
                  <Trophy className="h-3.5 w-3.5 text-yellow-400" />
                  المتصدرون
                </h3>
              </div>
              
              <div className="space-y-1">
                {[
                  { rank: 1, name: 'أحمد', level: 18, xp: 14520 },
                  { rank: 2, name: 'سارة', level: 16, xp: 13980 },
                  { rank: 3, name: 'محمد', level: 15, xp: 13450 }
                ].map((user) => (
                  <div 
                    key={user.rank} 
                    className={`flex items-center gap-1.5 p-1 rounded-lg transition-all duration-200 hover:bg-white/5 border ${
                      user.rank === 1 ? 'border-yellow-500/20 bg-yellow-500/5' : 
                      user.rank === 2 ? 'border-gray-300/20 bg-gray-300/5' : 
                      'border-orange-500/20 bg-orange-500/5'
                    }`}
                  >
                    <div className={`h-4 w-4 rounded-full flex items-center justify-center border ${
                      user.rank === 1 ? 'border-yellow-500/30 text-yellow-400' : 
                      user.rank === 2 ? 'border-gray-300/30 text-gray-300' : 
                      'border-orange-500/30 text-orange-400'
                    }`}>
                      <span className="text-xs font-share-tech">{user.rank}</span>
                    </div>
                    
                    <div className="flex-1 flex justify-between items-center">
                      <span className="text-white font-medium text-xs">{user.name}</span>
                      <span className="text-xs text-game-accent font-share-tech">Lv.{user.level}</span>
                    </div>
                  </div>
                ))}
                <div className="border-t border-white/5 pt-1 mt-1">
                  <button className="w-full text-xs text-blue-400 hover:text-blue-300 transition-colors font-medium flex items-center justify-center gap-1">
                    عرض الكل
                    <ChevronDown className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Activity Streak Cards - Tighter layout */}
            <div className="grid grid-cols-2 gap-2">
              {/* Daily Streak */}
              <div className="game-panel p-1.5 hover:shadow-lg hover:shadow-orange-500/10 transition-all flex flex-col items-center">
                <div className="mb-0.5">
                  <Flame className="h-4 w-4 text-orange-400" />
                </div>
                <div className="text-xs text-white font-medium mb-0.5">الجهد اليومي</div>
                <div className="text-base font-bold text-white font-share-tech">12</div>
              </div>
              
              {/* XP Points */}
              <div className="game-panel p-1.5 hover:shadow-lg hover:shadow-game-accent/10 transition-all flex flex-col items-center">
                <div className="mb-0.5">
                  <Award className="h-4 w-4 text-game-accent" />
                </div>
                <div className="text-xs text-white font-medium mb-0.5">النقاط</div>
                <div className="text-base font-bold text-white font-share-tech">8.9K</div>
              </div>
            </div>
            
            {/* Google Ad Section - New addition */}
            <div className="game-panel p-2 flex flex-col flex-1">
              <div className="flex justify-between items-center mb-1.5">
                <h3 className="text-sm font-bold text-white font-changa flex items-center gap-1">
                  <ExternalLink className="h-3.5 w-3.5 text-green-400" />
                  إعلان
                </h3>
              </div>
              
              <div className="bg-gray-800/50 border border-white/5 rounded-lg p-1.5 mb-1.5 flex-1 flex items-center justify-center overflow-hidden" style={{minHeight: '250px', maxHeight: '250px'}}>
                {adCode ? (
                  <div dangerouslySetInnerHTML={{ __html: adCode }} className="w-full h-full" />
                ) : (
                  <div className="text-center">
                    <Award className="h-6 w-6 text-gray-500 mx-auto mb-1 animate-pulse" />
                    <p className="text-gray-400 text-xs">مساحة مخصصة للإعلانات</p>
                    <p className="text-gray-500 text-xs">أدخل كود الإعلان أدناه</p>
                  </div>
                )}
              </div>
              
              <div className="mt-auto">
                <Input 
                  value={adCode}
                  onChange={handleAdCodeChange}
                  placeholder="أدخل كود Google Ad هنا"
                  className="text-xs h-7 bg-gray-800/50 border-gray-700"
                />
                <p className="text-gray-500 text-[10px] mt-0.5 text-center">
                  يمكنك إضافة أكواد إعلانات Google AdSense هنا
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
