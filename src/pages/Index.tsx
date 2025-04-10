
import { useNavigate } from 'react-router-dom';
import { Flame, Trophy, ChevronRight, Activity, Award, BarChart3, Clock, ExternalLink, 
  ChevronDown, BookOpen, Target, Brain } from 'lucide-react';
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
        
        {/* Main content - Optimized fullscreen layout */}
        <div className="grid grid-cols-12 gap-2 flex-1">
          {/* LEFT COLUMN - 3 cols */}
          <div className="col-span-3 flex flex-col gap-2">
            {/* Leaderboard - Compact */}
            <div className="game-panel p-2 h-auto">
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
                    className={`flex items-center gap-1.5 p-0.5 rounded-lg transition-all duration-200 hover:bg-white/5 border ${
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
            
            {/* Course Progress - More prominent */}
            <div className="game-panel p-2 flex-grow">
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-sm font-bold text-white font-changa flex items-center gap-1">
                  <BookOpen className="h-3.5 w-3.5 text-blue-400" />
                  تقدم الكورسات
                </h3>
              </div>
              
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-xs mb-0.5">
                    <span className="text-white flex items-center gap-1">
                      <span className="h-4 w-4 rounded-sm bg-blue-500/20 flex items-center justify-center text-[10px]">🧮</span>
                      رياضيات
                    </span>
                    <span className="text-blue-400 font-share-tech">70%</span>
                  </div>
                  <div className="h-1.5 bg-gray-700/70 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{width: '70%'}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-xs mb-0.5">
                    <span className="text-white flex items-center gap-1">
                      <span className="h-4 w-4 rounded-sm bg-green-500/20 flex items-center justify-center text-[10px]">🔤</span>
                      إنجليزي
                    </span>
                    <span className="text-green-400 font-share-tech">45%</span>
                  </div>
                  <div className="h-1.5 bg-gray-700/70 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{width: '45%'}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-xs mb-0.5">
                    <span className="text-white flex items-center gap-1">
                      <span className="h-4 w-4 rounded-sm bg-purple-500/20 flex items-center justify-center text-[10px]">⚛️</span>
                      فيزياء
                    </span>
                    <span className="text-purple-400 font-share-tech">30%</span>
                  </div>
                  <div className="h-1.5 bg-gray-700/70 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full" style={{width: '30%'}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-xs mb-0.5">
                    <span className="text-white flex items-center gap-1">
                      <span className="h-4 w-4 rounded-sm bg-red-500/20 flex items-center justify-center text-[10px]">📝</span>
                      عربي
                    </span>
                    <span className="text-red-400 font-share-tech">82%</span>
                  </div>
                  <div className="h-1.5 bg-gray-700/70 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 rounded-full" style={{width: '82%'}}></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Upcoming Exams - Compact */}
            <div className="game-panel p-2">
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-sm font-bold text-white font-changa flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-red-400" />
                  امتحانات قادمة
                </h3>
              </div>
              
              <div className="space-y-1">
                {[
                  { id: 1, subject: 'رياضيات', date: 'الأحد، 12 مايو', icon: '🧮', color: 'from-blue-600 to-blue-400' },
                  { id: 2, subject: 'فيزياء', date: 'الثلاثاء، 14 مايو', icon: '⚛️', color: 'from-purple-600 to-purple-400' },
                ].map((exam) => (
                  <div 
                    key={exam.id} 
                    className="flex items-center gap-1.5 p-1 rounded-lg bg-game-card-bg-alt border border-white/5"
                  >
                    <div className={`h-5 w-5 rounded-lg flex items-center justify-center bg-gradient-to-br ${exam.color} text-white text-sm`}>
                      {exam.icon}
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="text-white font-medium text-xs">{exam.subject}</h4>
                      <div className="flex items-center text-[10px] text-gray-400">
                        <Clock className="h-2 w-2 mr-0.5" />
                        {exam.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* MIDDLE COLUMN - 6 cols */}
          <div className="col-span-6 flex flex-col gap-2">
            {/* Weekly Performance Chart - Optimized size */}
            <div className="game-panel p-2 flex-grow-0">
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-sm font-bold text-white font-changa flex items-center gap-1">
                  <Activity className="h-3.5 w-3.5 text-blue-400" />
                  إنجاز أسبوعي
                </h3>
                <div className="flex items-center text-xs bg-blue-500/20 py-0.5 px-1.5 rounded-full">
                  <span className="text-blue-300 font-share-tech">310 دقيقة</span>
                </div>
              </div>
              
              <div className="h-52">
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
            
            {/* Daily Mission - Compact & Prominent */}
            <div className="game-panel p-3 h-auto">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-bold text-white font-changa flex items-center gap-1">
                  <Target className="h-3.5 w-3.5 text-game-primary" />
                  مهمة اليوم
                </h3>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-game-primary/20 to-game-primary/5 flex items-center justify-center border border-game-primary/20">
                  <span className="text-2xl">🧮</span>
                </div>
                
                <div className="flex-1">
                  <h4 className="text-white font-lexend text-sm">أكمل تحصيلي الرياضيات</h4>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center gap-1 text-xs text-game-accent">
                      <Award className="h-4 w-4" />
                      <span className="font-share-tech">+150 XP</span>
                    </div>
                    <button className="game-btn text-xs py-1 px-3 hover-scale">ابدأ</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* RIGHT COLUMN - 3 cols */}
          <div className="col-span-3 flex flex-col gap-2">
            {/* User Profile - Compact */}
            <div className="game-panel p-2">
              <div className="flex flex-col items-center">
                <div className="relative mb-2">
                  <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-game-primary/20 bg-gradient-to-br from-game-card-bg-alt to-game-card-bg flex items-center justify-center">
                    <span className="text-white text-xl font-bold">ش</span>
                  </div>
                  <div className="absolute -top-1 -right-1 h-4 w-4 bg-game-primary rounded-full flex items-center justify-center text-white text-[10px] font-bold shadow-lg shadow-game-primary/20 font-share-tech">5</div>
                </div>
                
                <h2 className="text-white font-bold text-sm font-changa mb-0.5">شادي داود</h2>
                <p className="text-game-text-secondary text-xs mb-1">الثاني عشر</p>
                
                <div className="w-full">
                  <div className="flex justify-between items-center mb-0.5">
                    <div className="text-game-highlight font-medium font-share-tech bg-game-highlight/10 px-1.5 py-0.5 rounded text-xs">Lv 5</div>
                    <span className="text-xs text-blue-300 font-share-tech">2450/3000</span>
                  </div>
                  
                  <div className="level-bar">
                    <div className="level-bar-fill" style={{ width: "60%" }}></div>
                  </div>
                </div>
                
                <div className="flex justify-center gap-2 mt-1 w-full text-xs">
                  <div className="flex flex-col items-center">
                    <div className="text-game-accent mb-0.5">المستوى</div>
                    <div className="text-white font-bold font-share-tech">5</div>
                  </div>
                  
                  <div className="h-6 w-px bg-white/10 mx-1"></div>
                  
                  <div className="flex flex-col items-center">
                    <div className="text-game-accent mb-0.5">المرتبة</div>
                    <div className="text-white font-bold font-share-tech">#3</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* AI Smart Ring - Compact */}
            <div className="game-panel p-2 h-auto flex flex-col items-center">
              <h3 className="text-white font-medium text-xs flex items-center gap-1 mb-1">
                <Brain className="h-3 w-3 text-game-highlight" />
                الذكاء الاصطناعي
              </h3>
              
              <div className="xp-progress-ring">
                <svg width="60" height="60" viewBox="0 0 120 120">
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
                  <text x="60" y="55" textAnchor="middle" dominantBaseline="middle" fontSize="22" fill="white" className="font-share-tech">8.9</text>
                  <text x="60" y="75" textAnchor="middle" dominantBaseline="middle" fontSize="10" fill="#B8B8FF" className="font-lexend">تعلم</text>
                </svg>
              </div>
              
              <div className="flex items-center mt-1 text-xs">
                <span className="py-0.5 px-2 bg-gradient-to-r from-game-highlight/20 to-game-highlight/10 rounded-full text-game-highlight border border-game-highlight/20 font-share-tech">
                  +0.9
                </span>
              </div>
            </div>
            
            {/* Stats Cards - Side by side */}
            <div className="grid grid-cols-2 gap-2">
              <div className="game-panel p-1.5 flex flex-col items-center">
                <div className="h-6 w-6 rounded-full bg-gradient-to-br from-orange-500/20 to-orange-500/5 flex items-center justify-center mb-0.5">
                  <Flame className="h-3.5 w-3.5 text-orange-400" />
                </div>
                <h3 className="text-white font-medium text-xs">الجهد اليومي</h3>
                <div className="text-lg font-bold text-white font-share-tech">12</div>
              </div>
              
              <div className="game-panel p-1.5 flex flex-col items-center">
                <div className="h-6 w-6 rounded-full bg-gradient-to-br from-game-accent/20 to-game-accent/5 flex items-center justify-center mb-0.5">
                  <Award className="h-3.5 w-3.5 text-game-accent" />
                </div>
                <h3 className="text-white font-medium text-xs">النقاط</h3>
                <div className="text-lg font-bold text-white font-share-tech">8.9K</div>
              </div>
            </div>
            
            {/* Google Ad Section - Smaller */}
            <div className="game-panel p-2 flex flex-col flex-1">
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-xs font-bold text-white font-changa flex items-center gap-1">
                  <ExternalLink className="h-3 w-3 text-green-400" />
                  إعلان
                </h3>
              </div>
              
              <div className="bg-gray-800/50 border border-white/5 rounded-lg p-1.5 flex-1 flex items-center justify-center overflow-hidden" style={{minHeight: '130px', maxHeight: '130px'}}>
                {adCode ? (
                  <div dangerouslySetInnerHTML={{ __html: adCode }} className="w-full h-full" />
                ) : (
                  <div className="text-center">
                    <Award className="h-4 w-4 text-gray-500 mx-auto mb-0.5 animate-pulse" />
                    <p className="text-gray-400 text-xs">مساحة مخصصة للإعلانات</p>
                    <p className="text-gray-500 text-xs">أدخل كود الإعلان أدناه</p>
                  </div>
                )}
              </div>
              
              <div className="mt-1">
                <Input 
                  value={adCode}
                  onChange={handleAdCodeChange}
                  placeholder="كود Google Ad"
                  className="text-xs h-6 bg-gray-800/50 border-gray-700"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
