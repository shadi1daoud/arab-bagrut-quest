import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Search, Trophy, Star, Users, UserPlus, Crown, Award, MessageCircle, BookOpen, Activity } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';

// Friends data
interface Friend {
  id: string;
  name: string;
  avatar?: string;
  level: number;
  xp: number;
  streak: number;
  isOnline: boolean;
  status?: 'top' | 'active' | 'studying';
}

// Leaderboard entry interface
interface LeaderboardEntry {
  id: string;
  name: string;
  avatar?: string;
  xp: number;
  rank: number;
  badge?: 'gold' | 'silver' | 'bronze';
  growth?: 'up' | 'down' | 'same';
}

const FRIENDS_DATA: Friend[] = [
  {
    id: 'f1',
    name: 'أحمد محمود',
    avatar: '👦',
    level: 5,
    xp: 12500,
    streak: 15,
    isOnline: true,
    status: 'top',
  },
  {
    id: 'f2',
    name: 'سارة حسن',
    avatar: '👧',
    level: 6,
    xp: 14200,
    streak: 30,
    isOnline: false,
    status: 'studying',
  },
  {
    id: 'f3',
    name: 'محمد علي',
    avatar: '👨',
    level: 4,
    xp: 7800,
    streak: 5,
    isOnline: true,
  },
  {
    id: 'f4',
    name: 'ليلى عمر',
    avatar: '👩',
    level: 7,
    xp: 16300,
    streak: 25,
    isOnline: false,
    status: 'active',
  },
];

const LEADERBOARD_DATA: LeaderboardEntry[] = [
  {
    id: 'l1',
    name: 'سارة حسن',
    avatar: '👧',
    xp: 14200,
    rank: 1,
    badge: 'gold',
    growth: 'same',
  },
  {
    id: 'l2',
    name: 'ليلى عمر',
    avatar: '👩',
    xp: 16300,
    rank: 2,
    badge: 'silver',
    growth: 'up',
  },
  {
    id: 'f1',
    name: 'شادي داود',
    avatar: '👨‍🎓',
    xp: 8966,
    rank: 3,
    badge: 'bronze',
    growth: 'down',
  },
  {
    id: 'l3',
    name: 'أحمد محمود',
    avatar: '👦',
    xp: 12500,
    rank: 4,
    growth: 'up',
  },
  {
    id: 'l4',
    name: 'محمد علي',
    avatar: '👨',
    xp: 7800,
    rank: 5,
    growth: 'down',
  },
];

const Community = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'friends' | 'leaderboard'>('friends');
  const [filterBy, setFilterBy] = useState<'all' | 'online'>('all');
  const { toast } = useToast();
  
  // Filter friends based on search and online status
  const filteredFriends = FRIENDS_DATA.filter(friend => {
    if (filterBy === 'online' && !friend.isOnline) return false;
    return friend.name.includes(searchTerm);
  });
  
  const handleSendInvite = () => {
    toast({
      title: "تم إرسال الدعوة",
      description: "تم إرسال دعوة الصداقة بنجاح",
    });
  };
  
  const handleSendMessage = (friendName: string) => {
    toast({
      title: "رسالة جديدة",
      description: `تم إرسال رسالة إلى ${friendName}`,
    });
  };
  
  const handleAddFriend = (id: string) => {
    toast({
      title: "تمت الإضافة",
      description: "تمت إضافة الصديق بنجاح",
    });
  };

  return (
    <div className="h-full overflow-hidden animate-fade-in">
      <div className="flex flex-col h-full max-h-[calc(100vh-120px)]">
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
          <div>
            <h1 className="text-2xl font-bold text-white font-changa bg-gradient-to-r from-game-primary to-game-accent bg-clip-text text-transparent">المجتمع</h1>
            <p className="text-gray-400 mt-1">تواصل وتنافس مع الأصدقاء</p>
          </div>
          
          <div className="flex gap-2">
            <div className="relative">
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="py-2.5 px-4 pr-10 bg-game-card-bg border border-gray-700/30 rounded-md text-white w-full focus:outline-none focus:ring-1 focus:ring-game-primary transition-all"
                placeholder="ابحث عن صديق..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <button 
              onClick={handleSendInvite}
              className="py-2.5 px-4 bg-gradient-to-r from-game-primary to-game-primary/70 text-white rounded-md flex items-center gap-2 hover:shadow-md hover:shadow-game-primary/20 transition-all"
            >
              <UserPlus className="h-4 w-4" />
              <span className="hidden sm:inline">إضافة صديق</span>
            </button>
          </div>
        </div>
        
        {/* Tabs Navigation */}
        <div className="flex mb-4 border-b border-white/10">
          <button
            className={`px-4 py-2 flex items-center gap-2 ${
              activeTab === 'friends' 
                ? 'text-game-primary border-b-2 border-game-primary' 
                : 'text-gray-400'
            }`}
            onClick={() => setActiveTab('friends')}
          >
            <Users className="h-4 w-4" />
            أصدقاء
          </button>
          <button
            className={`px-4 py-2 flex items-center gap-2 ${
              activeTab === 'leaderboard' 
                ? 'text-game-accent border-b-2 border-game-accent' 
                : 'text-gray-400'
            }`}
            onClick={() => setActiveTab('leaderboard')}
          >
            <Trophy className="h-4 w-4" />
            المتصدرون
          </button>
        </div>
        
        {/* Main Content Area - Adjusts based on active tab */}
        <div className="flex-1 overflow-hidden">
          {activeTab === 'friends' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full"
            >
              <div className="game-panel h-full overflow-hidden flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-white font-lexend">الأصدقاء</h3>
                  <div>
                    <select
                      value={filterBy}
                      onChange={(e) => setFilterBy(e.target.value as 'all' | 'online')}
                      className="bg-game-card-bg-alt text-sm py-1 px-3 border border-white/10 rounded text-gray-300"
                    >
                      <option value="all">جميع الأصدقاء</option>
                      <option value="online">المتصلون</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-3 overflow-auto max-h-full p-1">
                  {filteredFriends.length > 0 ? (
                    filteredFriends.map((friend) => (
                      <div 
                        key={friend.id}
                        className="p-3 bg-game-card-bg-alt rounded-lg border border-white/5 hover:border-game-primary/30 transition-all"
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-game-card-bg to-game-card-bg-alt flex items-center justify-center text-xl">
                                {friend.avatar}
                              </div>
                              <div className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-game-card-bg ${
                                friend.isOnline ? 'bg-green-500' : 'bg-gray-500'
                              }`}></div>
                            </div>
                            
                            <div>
                              <HoverCard>
                                <HoverCardTrigger asChild>
                                  <h4 className="font-medium text-white cursor-pointer">{friend.name}</h4>
                                </HoverCardTrigger>
                                <HoverCardContent className="w-64 bg-game-card-bg border border-white/10">
                                  <div className="flex justify-center mb-2">
                                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-game-card-bg to-game-card-bg-alt flex items-center justify-center text-4xl">
                                      {friend.avatar}
                                    </div>
                                  </div>
                                  <h4 className="text-center text-white mb-2">{friend.name}</h4>
                                  <div className="grid grid-cols-3 gap-2 text-center text-sm">
                                    <div className="bg-game-card-bg-alt p-2 rounded">
                                      <div className="text-game-accent font-share-tech">{friend.level}</div>
                                      <div className="text-gray-400">مستوى</div>
                                    </div>
                                    <div className="bg-game-card-bg-alt p-2 rounded">
                                      <div className="text-game-primary font-share-tech">{friend.xp.toLocaleString()}</div>
                                      <div className="text-gray-400">XP</div>
                                    </div>
                                    <div className="bg-game-card-bg-alt p-2 rounded">
                                      <div className="text-orange-400 font-share-tech">{friend.streak}</div>
                                      <div className="text-gray-400">تتابع</div>
                                    </div>
                                  </div>
                                </HoverCardContent>
                              </HoverCard>
                              
                              <div className="flex items-center gap-2 text-xs">
                                <span className="text-gray-400">مستوى {friend.level}</span>
                                {friend.status === 'top' && (
                                  <span className="text-yellow-400 flex items-center">
                                    <Crown className="h-3 w-3 mr-1" />
                                    متصدر
                                  </span>
                                )}
                                {friend.status === 'studying' && (
                                  <span className="text-blue-400 flex items-center">
                                    <BookOpen className="h-3 w-3 mr-1" />
                                    يدرس
                                  </span>
                                )}
                                {friend.status === 'active' && (
                                  <span className="text-green-400 flex items-center">
                                    <Activity className="h-3 w-3 mr-1" />
                                    نشط
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => handleSendMessage(friend.name)}
                              className="p-2 text-gray-400 hover:text-white bg-transparent hover:bg-game-primary/10 rounded-full transition-colors"
                            >
                              <MessageCircle className="h-4 w-4" />
                            </button>
                            {friend.isOnline && (
                              <button className="py-1.5 px-3 text-xs bg-game-primary/20 text-game-primary rounded hover:bg-game-primary/30 transition-colors">
                                تحدي
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-400">لم يتم العثور على أصدقاء</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="game-panel h-full overflow-hidden flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-white font-lexend">اقتراحات</h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 overflow-auto max-h-full p-1">
                  {LEADERBOARD_DATA.map((entry) => (
                    <div 
                      key={entry.id}
                      className="p-3 bg-game-card-bg-alt rounded-lg border border-white/5 hover:border-game-accent/30 transition-all"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-game-card-bg to-game-card-bg-alt flex items-center justify-center text-xl">
                            {entry.avatar}
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-white">{entry.name}</h4>
                            <div className="flex items-center gap-2 text-xs">
                              <span className="text-gray-400">Rank {entry.rank}</span>
                              <span className="text-game-accent flex items-center">
                                <Star className="h-3 w-3 mr-1" />
                                {entry.xp.toLocaleString()} XP
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <button 
                          onClick={() => handleAddFriend(entry.id)}
                          className="py-1.5 px-3 text-xs bg-game-accent/20 text-game-accent rounded hover:bg-game-accent/30 transition-colors"
                        >
                          إضافة
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
          
          {activeTab === 'leaderboard' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full"
            >
              <div className="game-panel h-full overflow-hidden flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-white font-lexend">
                    <Trophy className="inline-block h-5 w-5 mr-2 text-yellow-400" />
                    المتصدرون الأسبوع
                  </h3>
                </div>
                
                <div className="space-y-3 overflow-auto max-h-full p-1">
                  {LEADERBOARD_DATA.map((entry) => (
                    <div 
                      key={entry.id}
                      className={`p-3 rounded-lg border transition-all ${
                        entry.badge === 'gold'
                          ? 'bg-gradient-to-r from-yellow-900/30 to-yellow-700/10 border-yellow-500/30 shadow-sm shadow-yellow-500/20'
                          : entry.badge === 'silver'
                            ? 'bg-gradient-to-r from-gray-700/30 to-gray-500/10 border-gray-400/30'
                            : entry.badge === 'bronze'
                              ? 'bg-gradient-to-r from-amber-900/30 to-amber-700/10 border-amber-500/30'
                              : 'bg-game-card-bg-alt border-white/5'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-game-card-bg mr-4 font-share-tech text-lg">
                          {entry.rank}
                        </div>
                        
                        <div className="flex items-center gap-3 flex-1">
                          <div className="relative">
                            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-game-card-bg to-game-card-bg-alt flex items-center justify-center text-2xl">
                              {entry.avatar}
                            </div>
                            {entry.badge && (
                              <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-game-card-bg flex items-center justify-center border-2 border-game-card-bg">
                                {entry.badge === 'gold' && <Award className="h-4 w-4 text-yellow-400" />}
                                {entry.badge === 'silver' && <Award className="h-4 w-4 text-gray-400" />}
                                {entry.badge === 'bronze' && <Award className="h-4 w-4 text-amber-400" />}
                              </div>
                            )}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <h4 className="font-medium text-white">{entry.name}</h4>
                              <div className="flex items-center text-lg font-share-tech font-bold text-game-accent">
                                <span>{entry.xp.toLocaleString()}</span>
                                <span className="text-xs ml-1">XP</span>
                              </div>
                            </div>
                            
                            <div className="w-full bg-game-background h-2 rounded-full overflow-hidden mt-2">
                              <div 
                                className={`h-full rounded-full relative ${
                                  entry.badge === 'gold'
                                    ? 'bg-gradient-to-r from-yellow-500 to-yellow-300'
                                    : entry.badge === 'silver'
                                      ? 'bg-gradient-to-r from-gray-400 to-gray-300'
                                      : entry.badge === 'bronze'
                                        ? 'bg-gradient-to-r from-amber-500 to-amber-300'
                                        : 'bg-gradient-to-r from-blue-600 to-blue-400'
                                }`} 
                                style={{ width: `${Math.min(100, entry.xp / 200)}%` }}
                              >
                                <div className="absolute inset-0 bg-white opacity-20 animate-pulse"></div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center">
                            {entry.growth === 'up' && (
                              <span className="flex items-center text-green-400">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="m18 15-6-6-6 6"/>
                                </svg>
                              </span>
                            )}
                            {entry.growth === 'down' && (
                              <span className="flex items-center text-red-400">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="m6 9 6 6 6-6"/>
                                </svg>
                              </span>
                            )}
                            {entry.growth === 'same' && (
                              <span className="flex items-center text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M8 12h8"/>
                                </svg>
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Community;
