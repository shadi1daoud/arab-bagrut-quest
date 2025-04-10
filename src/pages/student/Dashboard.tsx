import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ChevronLeft, Trophy, Star, CheckCircle, Clock, Flame, Activity, Award, Brain, Target, Calendar, ChevronDown, ExternalLink, BookOpen } from 'lucide-react';
import { Tab } from '@headlessui/react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Input } from '@/components/ui/input';

const weeklyActivity = [
  { day: 'الأحد', hours: 1.2, xp: 120 },
  { day: 'الإثنين', hours: 0.8, xp: 80 },
  { day: 'الثلاثاء', hours: 1.5, xp: 150 },
  { day: 'الأربعاء', hours: 0.4, xp: 40 },
  { day: 'الخميس', hours: 1.8, xp: 180 },
  { day: 'الجمعة', hours: 1.3, xp: 130 },
  { day: 'السبت', hours: 0.9, xp: 90 },
];

const leaderboardData = [
  { id: 1, name: 'أحمد', avatar: '👦', level: 4, levelNum: 18, xp: 14520 },
  { id: 2, name: 'سارة', avatar: '👧', level: 13, levelNum: 16, xp: 14550 },
  { id: 3, name: 'محمد', avatar: '👨', level: 15, levelNum: 15, xp: 14650 },
];

const upcomingExams = [
  { id: 1, subject: 'رياضيات', date: 'الأحد، 12 مايو', icon: '🧮', color: 'from-blue-600 to-blue-400' },
  { id: 2, subject: 'فيزياء', date: 'الثلاثاء، 14 مايو', icon: '⚛️', color: 'from-purple-600 to-purple-400' },
];

const Dashboard = () => {
  const { user } = useAuth();
  const [countDone, setCountDone] = useState(false);
  const [adCode, setAdCode] = useState('');
  
  useEffect(() => {
    setCountDone(true);
  }, []);
  
  const handleAdCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdCode(e.target.value);
  };
  
  return (
    <div className="h-full grid grid-cols-12 gap-2 animate-fade-in">
      <div className="col-span-3 flex flex-col gap-2 h-full">
        <div className="game-panel p-2 flex-shrink-0">
          <div className="flex flex-col items-center">
            <div className="relative mb-2">
              <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-game-primary/20 bg-gradient-to-br from-game-card-bg-alt to-game-card-bg flex items-center justify-center">
                <span className="text-white text-xl font-bold">{user?.name?.charAt(0) || 'S'}</span>
              </div>
              <div className="absolute -top-1 -right-1 h-4 w-4 bg-game-primary rounded-full flex items-center justify-center text-white text-[10px] font-bold shadow-lg shadow-game-primary/20 font-share-tech">5</div>
            </div>
            
            <h2 className="text-white font-bold text-sm font-changa mb-0.5">{user?.name || 'شادي'}</h2>
            <p className="text-game-text-secondary text-xs mb-1">{user?.grade || 'الثاني عشر'}</p>
            
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
              
              <div className="h-6 w-px bg-white/10 mx-1"></div>
              
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
        
        <div className="grid grid-cols-2 gap-2">
          <div className="game-panel p-2 flex flex-col items-center">
            <div className="h-6 w-6 rounded-full bg-gradient-to-br from-orange-500/20 to-orange-500/5 flex items-center justify-center mb-1">
              <Flame className="h-4 w-4 text-orange-400" />
            </div>
            <h3 className="text-white font-medium text-xs">الجهد اليومي</h3>
            <div className="text-lg font-bold text-white font-share-tech">12</div>
          </div>
          
          <div className="game-panel p-2 flex flex-col items-center">
            <div className="h-6 w-6 rounded-full bg-gradient-to-br from-game-accent/20 to-game-accent/5 flex items-center justify-center mb-1">
              <Award className="h-4 w-4 text-game-accent" />
            </div>
            <h3 className="text-white font-medium text-xs">النقاط</h3>
            <div className="text-lg font-bold text-white font-share-tech">8.9K</div>
          </div>
        </div>
        
        <div className="game-panel p-2 flex flex-col items-center h-auto">
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
        
        <div className="game-panel p-2 flex flex-col flex-1">
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-sm font-medium text-white flex items-center gap-1">
              <ExternalLink className="h-3.5 w-3.5 text-green-400" />
              إعلان
            </h3>
          </div>
          
          <div className="bg-gray-800/50 border border-white/5 rounded-lg p-1.5 flex-1 flex items-center justify-center overflow-hidden" style={{minHeight: '100px', maxHeight: '140px'}}>
            {adCode ? (
              <div dangerouslySetInnerHTML={{ __html: adCode }} className="w-full h-full" />
            ) : (
              <div className="text-center">
                <Award className="h-4 w-4 text-gray-500 mx-auto mb-0.5" />
                <p className="text-gray-400 text-xs">مساحة للإعلانات</p>
              </div>
            )}
          </div>
          
          <div className="mt-1">
            <Input 
              value={adCode}
              onChange={handleAdCodeChange}
              placeholder="كود Google Ad"
              className="text-xs h-5 bg-gray-800/50 border-gray-700"
            />
          </div>
        </div>
      </div>
      
      <div className="col-span-6 flex flex-col gap-2 h-full">
        <div className="game-panel p-2 flex-grow">
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-sm font-bold text-white font-changa flex items-center gap-1">
              <Activity className="h-3.5 w-3.5 text-blue-400" />
              إنجاز أسبوعي
            </h3>
            <div className="flex items-center text-xs">
              <span className="text-blue-300 font-share-tech">310 دقيقة</span>
            </div>
          </div>
          
          <div className="h-40">
            <ChartContainer config={{
              xp: { color: "#3B82F6", label: "XP المكتسبة" }
            }} className="h-full text-xs">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyActivity} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
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
                    className="fill-blue-500 hover:fill-blue-400"
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 flex-grow">
          <div className="game-panel p-2">
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-sm font-bold text-white font-changa flex items-center gap-1">
                <Target className="h-3.5 w-3.5 text-game-primary" />
                مهمة اليوم
              </h3>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-game-primary/20 to-game-primary/5 flex items-center justify-center border border-game-primary/20">
                <span className="text-base">🧮</span>
              </div>
              
              <div className="flex-1">
                <h4 className="text-white font-lexend text-xs">أكمل تحصيلي الرياضيات</h4>
                <div className="flex justify-between items-center mt-1">
                  <div className="flex items-center gap-1 text-[10px] text-game-accent">
                    <Award className="h-3 w-3" />
                    <span className="font-share-tech">+150 XP</span>
                  </div>
                  <button className="game-btn text-[10px] py-0.5 px-2">ابدأ</button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="game-panel p-2">
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-sm font-bold text-white font-changa flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-red-400" />
                امتحانات قادمة
              </h3>
            </div>
            
            <div className="space-y-1">
              {upcomingExams.map((exam) => (
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
        
        <div className="game-panel p-2 flex-grow">
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-sm font-bold text-white font-changa flex items-center gap-1">
              <Flame className="h-3.5 w-3.5 text-orange-400" />
              التقدم الأسبوعي
            </h3>
          </div>
          
          <div className="grid grid-cols-7 gap-1 h-full">
            {weeklyActivity.map((day, i) => (
              <div key={i} className="flex flex-col items-center justify-end h-full">
                <div className="flex-1 w-full flex items-end">
                  <div 
                    className="w-full bg-orange-500/20 hover:bg-orange-500/40 transition-colors rounded-t-sm" 
                    style={{ height: `${(day.hours / 2) * 100}%` }}
                  ></div>
                </div>
                <span className="text-[10px] text-gray-400 mt-1">{day.day}</span>
                <span className="text-[10px] text-orange-300 font-share-tech">{day.hours}h</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="col-span-3 flex flex-col gap-2 h-full">
        <div className="game-panel p-2">
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-sm font-bold text-white font-changa flex items-center gap-1">
              <Trophy className="h-3.5 w-3.5 text-yellow-400" />
              المتصدرون
            </h3>
            <Link to="/community" className="text-xs text-blue-400 hover:underline">
              عرض الكل
            </Link>
          </div>
          
          <div className="space-y-1">
            {leaderboardData.map((user, index) => (
              <div 
                key={user.id} 
                className={`flex items-center gap-1.5 p-1 rounded-lg transition-all border ${
                  index === 0 ? 'border-yellow-500/20 bg-yellow-500/5' : 
                  index === 1 ? 'border-gray-300/20 bg-gray-300/5' : 
                  'border-orange-500/20 bg-orange-500/5'
                }`}
              >
                <div className={`h-4 w-4 rounded-full flex items-center justify-center border ${
                  index === 0 ? 'border-yellow-500/30 text-yellow-400' : 
                  index === 1 ? 'border-gray-300/30 text-gray-300' : 
                  'border-orange-500/30 text-orange-400'
                }`}>
                  <span className="text-xs font-share-tech">{index + 1}</span>
                </div>
                
                <div className="h-5 w-5 rounded-full flex items-center justify-center bg-game-card-bg-alt text-base border border-white/10">
                  {user.avatar}
                </div>
                
                <div className="flex-1 flex justify-between items-center">
                  <span className="text-white font-medium text-xs">{user.name}</span>
                  <span className="text-xs text-game-accent font-share-tech">{user.xp.toLocaleString()} XP</span>
                </div>
              </div>
            ))}
            <div className="pt-1 mt-1 border-t border-white/5">
              <button className="w-full text-xs text-blue-400 hover:text-blue-300 flex items-center justify-center gap-1">
                عرض الكل
                <ChevronDown className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="game-panel p-2 flex-grow">
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-sm font-bold text-white font-changa flex items-center gap-1">
              <BookOpen className="h-3.5 w-3.5 text-blue-400" />
              تقدم الكورسات
            </h3>
          </div>
          
          <div className="space-y-3">
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
                  <span className="h-4 w-4 rounded-sm bg-amber-500/20 flex items-center justify-center text-[10px]">🧪</span>
                  كيمياء
                </span>
                <span className="text-amber-400 font-share-tech">55%</span>
              </div>
              <div className="h-1.5 bg-gray-700/70 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{width: '55%'}}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-xs mb-0.5">
                <span className="text-white flex items-center gap-1">
                  <span className="h-4 w-4 rounded-sm bg-red-500/20 flex items-center justify-center text-[10px]">����</span>
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
      </div>
    </div>
  );
};

export default Dashboard;
