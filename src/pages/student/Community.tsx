
import { useState } from 'react';
import { Search, Trophy, MessageCircle, Flame, ArrowUpRight, Users, Shield, Clock, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { Tab } from '@headlessui/react';

// Sample data
const FRIENDS_DATA = [
  { id: 1, name: 'أحمد محمود', avatar: '👦', level: 8, online: true, streak: 12, status: 'يدرس الرياضيات الآن', lastActive: 'الآن' },
  { id: 2, name: 'سارة حسن', avatar: '👧', level: 10, online: true, streak: 5, status: 'متاحة للتحدي', lastActive: 'الآن' },
  { id: 3, name: 'محمد علي', avatar: '👨', level: 7, online: false, streak: 3, status: null, lastActive: 'قبل 20 دقيقة' },
  { id: 4, name: 'ليلى عمر', avatar: '👩', level: 12, online: false, streak: 0, status: null, lastActive: 'قبل 3 ساعات' },
  { id: 5, name: 'يوسف أحمد', avatar: '👨‍🎓', level: 15, online: false, streak: 8, status: null, lastActive: 'قبل يوم' },
];

const LEADERBOARD_DATA = [
  { id: 1, name: 'رامي سعيد', avatar: '👨‍🎓', level: 21, xp: 28950, subjects: ['رياضيات', 'فيزياء'], badge: 'legendary', rank: 1 },
  { id: 2, name: 'ليان خالد', avatar: '👩‍🎓', level: 19, xp: 25600, subjects: ['أحياء', 'كيمياء'], badge: 'expert', rank: 2 },
  { id: 3, name: 'أحمد محمود', avatar: '👦', level: 18, xp: 24100, subjects: ['رياضيات', 'لغة إنجليزية'], badge: 'master', rank: 3 },
  { id: 4, name: 'سارة حسن', avatar: '👧', level: 16, xp: 19500, subjects: ['فيزياء'], badge: 'rising', rank: 4 },
  { id: 5, name: 'محمد علي', avatar: '👨', level: 15, xp: 18200, subjects: ['أحياء', 'كيمياء'], badge: 'consistent', rank: 5 },
  { id: 6, name: 'شادي داود', avatar: '👨‍💻', level: 14, xp: 16800, subjects: ['رياضيات'], badge: 'creative', rank: 6 },
  { id: 7, name: 'لينا كريم', avatar: '👩', level: 13, xp: 15350, subjects: ['لغة عربية'], badge: null, rank: 7 },
  { id: 8, name: 'يوسف أحمد', avatar: '👨‍🎓', level: 12, xp: 12900, subjects: ['تاريخ'], badge: null, rank: 8 },
  { id: 9, name: 'نور ماجد', avatar: '👧', level: 10, xp: 11500, subjects: ['جغرافيا'], badge: null, rank: 9 },
  { id: 10, name: 'عمر سامي', avatar: '👦', level: 9, xp: 10200, subjects: ['علوم'], badge: null, rank: 10 },
];

const COMMUNITY_CHALLENGES = [
  { id: 1, title: 'تحدي الرياضيات الأسبوعي', participants: 24, difficulty: 'medium', reward: 250, timeLeft: '1 يوم', icon: '🧮' },
  { id: 2, title: 'سباق حل المعادلات', participants: 18, difficulty: 'hard', reward: 350, timeLeft: '5 ساعات', icon: '⚡' },
  { id: 3, title: 'اختبار المفردات الإنجليزية', participants: 32, difficulty: 'easy', reward: 150, timeLeft: '3 أيام', icon: '🔤' },
];

const getBadgeStyle = (badge: string | null) => {
  switch(badge) {
    case 'legendary':
      return { icon: '👑', color: 'text-yellow-400', bg: 'bg-yellow-500/20' };
    case 'expert':
      return { icon: '🏆', color: 'text-purple-400', bg: 'bg-purple-500/20' };  
    case 'master':
      return { icon: '⭐', color: 'text-blue-400', bg: 'bg-blue-500/20' };
    case 'rising':
      return { icon: '📈', color: 'text-green-400', bg: 'bg-green-500/20' };
    case 'consistent':
      return { icon: '🔄', color: 'text-cyan-400', bg: 'bg-cyan-500/20' };
    case 'creative':
      return { icon: '💡', color: 'text-pink-400', bg: 'bg-pink-500/20' };
    default:
      return null;
  }
};

const getDifficultyStyle = (difficulty: string) => {
  switch(difficulty) {
    case 'easy':
      return { color: 'text-green-400', bg: 'bg-green-500/20' };
    case 'medium':
      return { color: 'text-blue-400', bg: 'bg-blue-500/20' };
    case 'hard':
      return { color: 'text-red-400', bg: 'bg-red-500/20' };
    default:
      return { color: 'text-gray-400', bg: 'bg-gray-500/20' };
  }
};

const Community = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTimeRange, setSelectedTimeRange] = useState('week');
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 5 },
    show: { opacity: 1, y: 0 }
  };
  
  // Filter friends
  const filteredFriends = FRIENDS_DATA.filter(friend => 
    friend.name.includes(searchTerm)
  );

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center gap-2 mb-2">
        <div>
          <h1 className="text-xl font-bold text-white font-changa bg-gradient-to-r from-game-primary to-game-accent bg-clip-text text-transparent">المجتمع</h1>
          <p className="text-gray-400 text-xs">تواصل وتنافس مع الآخرين</p>
        </div>
        
        <div className="flex gap-2">
          <div className="relative">
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <Search className="h-3 w-3 text-gray-400" />
            </div>
            <input
              type="text"
              className="py-1.5 px-3 pr-8 bg-game-card-bg border border-gray-700/30 rounded-md text-white w-36 text-sm focus:outline-none focus:ring-1 focus:ring-game-primary transition-all"
              placeholder="ابحث..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-12 gap-2 h-full">
        {/* Friends Column - 4 cols */}
        <div className="col-span-4 flex flex-col h-full">
          <div className="game-panel p-3 h-full">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-bold text-white flex items-center gap-1.5">
                <Users className="h-4 w-4 text-game-primary" />
                الأصدقاء
              </h2>
              <button className="text-xs text-game-primary py-0.5 px-2 rounded-md bg-game-primary/10 hover:bg-game-primary/20 transition-colors">
                إضافة صديق
              </button>
            </div>
            
            <Tab.Group>
              <Tab.List className="flex mb-2 bg-game-card-bg/50 rounded-md p-0.5 text-xs">
                <Tab 
                  className={({ selected }) =>
                    `flex-1 py-1 px-2 rounded-md transition-all ${
                      selected ? 'bg-game-card-bg text-game-primary' : 'text-gray-400 hover:text-white'
                    }`
                  }
                >
                  الكل
                </Tab>
                <Tab
                  className={({ selected }) =>
                    `flex-1 py-1 px-2 rounded-md transition-all ${
                      selected ? 'bg-game-card-bg text-game-primary' : 'text-gray-400 hover:text-white'
                    }`
                  }
                >
                  المتصلين
                </Tab>
              </Tab.List>
              
              <Tab.Panels className="flex-1 overflow-hidden">
                {/* All Friends Tab */}
                <Tab.Panel className="h-full overflow-y-auto">
                  <motion.div 
                    className="space-y-1.5"
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                  >
                    {filteredFriends.map((friend) => (
                      <motion.div 
                        key={friend.id} 
                        className="flex items-center gap-2 p-2 rounded-md hover:bg-game-card-bg-alt transition-all border border-transparent hover:border-white/10"
                        variants={itemVariants}
                      >
                        <div className="relative">
                          <div className="h-9 w-9 rounded-full bg-game-card-bg-alt flex items-center justify-center text-xl relative">
                            {friend.avatar}
                            {friend.streak > 0 && (
                              <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs">
                                <Flame className="h-2.5 w-2.5" />
                              </div>
                            )}
                          </div>
                          <div className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-gray-800 ${friend.online ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h3 className="font-medium text-white text-sm">{friend.name}</h3>
                            <span className="text-xs text-gray-400 font-share-tech">Lv {friend.level}</span>
                          </div>
                          
                          <div className="text-xs text-gray-400 line-clamp-1">
                            {friend.online
                              ? (friend.status || 'متصل الآن')
                              : `آخر ظهور: ${friend.lastActive}`
                            }
                          </div>
                        </div>
                        
                        <button className="p-1.5 rounded-full hover:bg-game-primary/10 text-gray-400 hover:text-game-primary transition-all">
                          <MessageCircle className="h-4 w-4" />
                        </button>
                      </motion.div>
                    ))}
                  </motion.div>
                </Tab.Panel>
                
                {/* Online Friends Tab */}
                <Tab.Panel className="h-full overflow-y-auto">
                  <motion.div 
                    className="space-y-1.5"
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                  >
                    {filteredFriends.filter(friend => friend.online).map((friend) => (
                      <motion.div 
                        key={friend.id} 
                        className="flex items-center gap-2 p-2 rounded-md hover:bg-game-card-bg-alt transition-all border border-transparent hover:border-white/10"
                        variants={itemVariants}
                      >
                        <div className="relative">
                          <div className="h-9 w-9 rounded-full bg-game-card-bg-alt flex items-center justify-center text-xl">
                            {friend.avatar}
                            {friend.streak > 0 && (
                              <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs">
                                <Flame className="h-2.5 w-2.5" />
                              </div>
                            )}
                          </div>
                          <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-gray-800 bg-green-500"></div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h3 className="font-medium text-white text-sm">{friend.name}</h3>
                            <span className="text-xs text-gray-400 font-share-tech">Lv {friend.level}</span>
                          </div>
                          
                          <div className="text-xs text-gray-400">
                            {friend.status || 'متصل الآن'}
                          </div>
                        </div>
                        
                        <button className="p-1.5 rounded-full hover:bg-game-primary/10 text-gray-400 hover:text-game-primary transition-all">
                          <MessageCircle className="h-4 w-4" />
                        </button>
                      </motion.div>
                    ))}
                  </motion.div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
        
        {/* Center Column - Leaderboard - 5 cols */}
        <div className="col-span-5 flex flex-col h-full">
          <div className="game-panel p-3 h-full">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-bold text-white flex items-center gap-1.5">
                <Trophy className="h-4 w-4 text-yellow-400" />
                المتصدرون
              </h2>
              
              <select
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="py-1 px-2 bg-game-card-bg border border-gray-700/30 rounded-md text-white text-xs focus:outline-none focus:ring-1 focus:ring-game-accent"
              >
                <option value="week">هذا الأسبوع</option>
                <option value="month">هذا الشهر</option>
                <option value="all">الإجمالي</option>
              </select>
            </div>
            
            <div className="overflow-y-auto h-full">
              <motion.div 
                className="space-y-1"
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                {LEADERBOARD_DATA.slice(0, 8).map((user) => {
                  const badgeStyle = getBadgeStyle(user.badge);
                  return (
                    <motion.div 
                      key={user.id} 
                      className={`flex items-center gap-2 p-2 rounded-md border transition-all ${
                        user.rank === 1 ? 'border-yellow-500/30 bg-yellow-500/5' : 
                        user.rank === 2 ? 'border-gray-300/30 bg-gray-300/5' : 
                        user.rank === 3 ? 'border-orange-500/30 bg-orange-500/5' : 
                        'border-transparent hover:border-white/10 hover:bg-game-card-bg-alt'
                      }`}
                      variants={itemVariants}
                    >
                      <div className={`h-6 w-6 rounded-full flex items-center justify-center border ${
                        user.rank === 1 ? 'border-yellow-500/30 text-yellow-400' : 
                        user.rank === 2 ? 'border-gray-300/30 text-gray-300' : 
                        user.rank === 3 ? 'border-orange-500/30 text-orange-400' : 
                        'border-white/10 text-white/70'
                      }`}>
                        <span className="text-xs font-share-tech">{user.rank}</span>
                      </div>
                      
                      <div className="h-8 w-8 rounded-full bg-game-card-bg-alt flex items-center justify-center text-lg">
                        {user.avatar}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium text-white text-sm">{user.name}</h3>
                          <span className="text-xs text-game-accent font-share-tech">{user.xp.toLocaleString()} XP</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex text-xs">
                            {user.subjects.map((subject, idx) => (
                              <span key={idx} className="text-gray-400 mr-1">{idx > 0 && '• '}{subject}</span>
                            ))}
                          </div>
                          
                          <span className="text-xs bg-game-card-bg px-1.5 py-0.5 rounded font-share-tech text-white">Lv {user.level}</span>
                        </div>
                      </div>
                      
                      {badgeStyle && (
                        <div className={`px-2 py-1 rounded flex items-center gap-1 ${badgeStyle.bg}`}>
                          <span>{badgeStyle.icon}</span>
                          <span className={`text-xs ${badgeStyle.color}`}>{user.badge}</span>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Right Column - Challenges - 3 cols */}
        <div className="col-span-3 flex flex-col h-full gap-2">
          {/* Challenges */}
          <div className="game-panel p-3 flex-1">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-bold text-white flex items-center gap-1.5">
                <Shield className="h-4 w-4 text-game-accent" />
                التحديات
              </h2>
            </div>
            
            <div className="space-y-2">
              {COMMUNITY_CHALLENGES.map(challenge => {
                const difficultyStyle = getDifficultyStyle(challenge.difficulty);
                return (
                  <div key={challenge.id} className="p-2 border border-white/5 rounded-md hover:border-game-accent/30 transition-all bg-game-card-bg-alt">
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-lg bg-game-accent/10 flex items-center justify-center text-2xl">
                        {challenge.icon}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-white font-medium text-sm">{challenge.title}</h3>
                        
                        <div className="flex justify-between text-xs">
                          <span className={`${difficultyStyle.color} px-1.5 rounded-sm ${difficultyStyle.bg}`}>
                            {challenge.difficulty}
                          </span>
                          
                          <span className="text-gray-400 flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {challenge.participants}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-2 pt-2 border-t border-white/5">
                      <div className="flex items-center gap-1 text-xs text-game-accent bg-game-accent/10 px-1.5 py-0.5 rounded">
                        <Trophy className="h-3 w-3" />
                        <span className="font-share-tech">+{challenge.reward} XP</span>
                      </div>
                      
                      <button className="text-xs bg-game-primary/10 text-game-primary px-2 py-1 rounded-md hover:bg-game-primary/20 transition-colors flex items-center gap-1">
                        انضم
                        <ArrowUpRight className="h-3 w-3" />
                      </button>
                    </div>
                    
                    <div className="text-xs text-gray-400 mt-1.5 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      متبقي: {challenge.timeLeft}
                    </div>
                  </div>
                );
              })}
            </div>
            
            <button className="w-full text-center text-xs text-blue-400 hover:underline mt-3 py-1">
              عرض جميع التحديات
            </button>
          </div>
          
          {/* Your Stats */}
          <div className="game-panel p-3">
            <h2 className="font-bold text-white flex items-center gap-1.5 mb-2">
              <Activity className="h-4 w-4 text-blue-400" />
              إحصائياتك
            </h2>
            
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="p-2 bg-game-card-bg-alt rounded-md">
                <div className="text-xs text-gray-400">المركز</div>
                <div className="text-white font-bold font-share-tech text-lg">#6</div>
              </div>
              
              <div className="p-2 bg-game-card-bg-alt rounded-md">
                <div className="text-xs text-gray-400">مجموع XP</div>
                <div className="text-white font-bold font-share-tech text-lg">16.8K</div>
              </div>
              
              <div className="p-2 bg-game-card-bg-alt rounded-md">
                <div className="text-xs text-gray-400">التقدم</div>
                <div className="flex justify-center items-center text-white font-bold font-share-tech text-lg">
                  <div className="h-2 w-full bg-gray-700 rounded-full mx-2">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  65%
                </div>
              </div>
              
              <div className="p-2 bg-game-card-bg-alt rounded-md">
                <div className="text-xs text-gray-400">التحديات</div>
                <div className="text-white font-bold font-share-tech text-lg">24</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
