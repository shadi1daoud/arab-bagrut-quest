
import { useNavigate } from 'react-router-dom';
import { Flame, Trophy, ChevronRight, Activity, Award, BarChart3 } from 'lucide-react';
import { useState } from 'react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Input } from '@/components/ui/input';

// Sample data for the performance chart
const performanceData = [
  { day: 'الأحد', mins: 45 },
  { day: 'الإثنين', mins: 30 },
  { day: 'الثلاثاء', mins: 60 },
  { day: 'الأربعاء', mins: 15 },
  { day: 'الخميس', mins: 75 },
  { day: 'الجمعة', mins: 50 },
  { day: 'السبت', mins: 35 },
];

const Index = () => {
  const navigate = useNavigate();
  const [adCode, setAdCode] = useState('');

  // Function to handle ad code change
  const handleAdCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdCode(e.target.value);
  };

  return (
    <div className="h-full flex flex-col items-center justify-start relative overflow-hidden py-2">
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
      
      <div className="container h-full max-w-full px-4 relative z-10 grid grid-cols-12 gap-3">
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-3">
          {/* Header Section - More compact */}
          <div className="game-panel p-3 flex flex-col items-center">
            <div className="flex justify-center items-center mb-2">
              <div className="bg-game-primary p-2 rounded-xl shadow-lg shadow-game-primary/20 mr-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 10C21 10 18.995 7.26822 17.3662 5.63824C15.7373 4.00827 13.4864 3 11 3C6.02944 3 2 7.02944 2 12C2 16.9706 6.02944 21 11 21C15.9706 21 20 16.9706 20 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 2L13 11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h1 className="text-3xl font-bold font-changa text-white">درسني</h1>
            </div>
            <h2 className="text-md font-changa text-game-text-secondary">منصة تعليمية جديدة لطلاب المراحل الثانوية</h2>
            <button 
              onClick={() => navigate('/login')}
              className="game-btn px-4 py-2 text-sm mt-2 hover-scale"
            >
              ابدأ رحلتك الآن
            </button>
          </div>
          
          {/* Main Features Cards - 2 cards in a row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="xp-card p-3 hover-scale h-full">
              <div className="flex items-center mb-2">
                <div className="h-7 w-7 rounded-full bg-game-primary/20 flex items-center justify-center mr-2">
                  <Flame className="h-4 w-4 text-game-primary" />
                </div>
                <h3 className="text-md font-changa text-white">تعلم بأسلوب جديد</h3>
              </div>
              <p className="text-gray-300 text-xs mb-2">استمتع بالتعلم من خلال نظام تعليمي مبتكر يشبه الألعاب.</p>
              <div className="flex items-center text-game-accent text-xs">
                <span className="font-semibold">استكشف المزيد</span>
                <ChevronRight className="h-3 w-3 ml-1" />
              </div>
            </div>
            
            <div className="stats-card p-3 hover-scale h-full">
              <div className="flex items-center mb-2">
                <div className="h-7 w-7 rounded-full bg-game-accent/20 flex items-center justify-center mr-2">
                  <Trophy className="h-4 w-4 text-game-accent" />
                </div>
                <h3 className="text-md font-changa text-white">حقق التفوق</h3>
              </div>
              <p className="text-gray-300 text-xs mb-2">تنافس مع زملائك واحصل على مكافآت عند إكمال المهام التعليمية.</p>
              <div className="flex items-center text-game-accent text-xs">
                <span className="font-semibold">تعرف على المكافآت</span>
                <ChevronRight className="h-3 w-3 ml-1" />
              </div>
            </div>
          </div>
          
          {/* Weekly Performance Chart */}
          <div className="game-panel p-3 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10 transition-all">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-base font-bold text-white font-changa flex items-center gap-1.5">
                <Activity className="h-4 w-4 text-blue-400" />
                الأداء الأسبوعي
              </h3>
              <div className="flex items-center text-xs">
                <span className="text-white font-share-tech">310 دقيقة</span>
              </div>
            </div>
            
            <div className="h-40">
              <ChartContainer config={{}} className="h-full text-xs">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceData} margin={{ top: 5, right: 5, bottom: 15, left: 0 }}>
                    <XAxis 
                      dataKey="day" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#9ca3af', fontSize: 10 }}
                      dy={5}
                    />
                    <YAxis 
                      hide={true}
                      axisLine={false}
                      tickLine={false}
                    />
                    <ChartTooltip
                      content={<ChartTooltipContent formatter={(value) => [`${value} دقيقة`, 'وقت التعلم']} />}
                    />
                    <Bar 
                      dataKey="mins" 
                      fill="#3B82F6" 
                      radius={[4, 4, 0, 0]}
                      barSize={20}
                      className="fill-blue-500 focus:fill-blue-400 hover:fill-blue-400"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </div>
        </div>
        
        {/* Right Column */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-3">
          {/* Leaderboard - More compact */}
          <div className="game-panel p-3 hover:border-yellow-500/30 hover:shadow-lg hover:shadow-yellow-500/10 transition-all">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-base font-bold text-white font-changa flex items-center gap-1.5">
                <Trophy className="h-4 w-4 text-yellow-400" />
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
                  className={`flex items-center gap-2 p-1.5 rounded-lg transition-all duration-200 hover:bg-white/5 border ${
                    user.rank === 1 ? 'border-yellow-500/20 bg-yellow-500/5' : 
                    user.rank === 2 ? 'border-gray-300/20 bg-gray-300/5' : 
                    'border-orange-500/20 bg-orange-500/5'
                  }`}
                >
                  <div className={`h-5 w-5 rounded-full flex items-center justify-center border ${
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
              
              <div className="pt-1 flex justify-center">
                <button className="text-xs text-blue-400 hover:underline flex items-center">
                  عرض المزيد
                  <ChevronRight className="h-3 w-3 ml-1" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Ad Section */}
          <div className="game-panel p-3">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-base font-bold text-white font-changa flex items-center gap-1.5">
                <BarChart3 className="h-4 w-4 text-green-400" />
                الإعلانات
              </h3>
            </div>
            
            <div className="bg-gray-800/50 border border-white/5 rounded-lg p-2 mb-2 min-h-[150px] flex items-center justify-center">
              {adCode ? (
                <div dangerouslySetInnerHTML={{ __html: adCode }} className="w-full h-full" />
              ) : (
                <div className="text-center">
                  <Award className="h-8 w-8 text-gray-500 mx-auto mb-2" />
                  <p className="text-gray-400 text-xs">مساحة مخصصة للإعلانات</p>
                  <p className="text-gray-500 text-xs">أدخل كود الإعلان أدناه</p>
                </div>
              )}
            </div>
            
            <div className="mt-1">
              <Input 
                value={adCode}
                onChange={handleAdCodeChange}
                placeholder="أدخل كود Google Ad هنا"
                className="text-xs h-8 bg-gray-800/50 border-gray-700"
              />
              <p className="text-gray-500 text-xs mt-1 text-center">
                يمكنك إضافة أكواد إعلانات Google AdSense هنا
              </p>
            </div>
          </div>
          
          {/* Latest Updates or Badges */}
          <div className="game-panel p-2 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10 transition-all">
            <div className="flex items-center p-1">
              <div className="h-6 w-6 rounded-full bg-purple-600/20 flex items-center justify-center mr-2">
                <Award className="h-3.5 w-3.5 text-purple-400" />
              </div>
              <span className="text-white text-sm">احصل على شارات جديدة</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
