
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Search, Trophy, Star, Users, UserPlus, Crown, Award } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
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

// Leaderboard data
interface LeaderboardEntry {
  id: string;
  name: string;
  avatar?: string;
  xp: number;
  rank: number;
  badge?: 'gold' | 'silver' | 'bronze';
  growth?: 'up' | 'down' | 'same';
}

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
  const { toast } = useToast();
  
  const filteredFriends = FRIENDS_DATA.filter(friend => 
    friend.name.includes(searchTerm)
  );
  
  const handleAddFriend = () => {
    toast({
      title: "تمت إضافة صديق",
      description: "تمت إضافة صديق جديد إلى قائمة أصدقائك",
    });
  };
  
  // Helper function to render status icons
  const renderStatusIcon = (friend: Friend) => {
    if (friend.status === 'top') {
      return <span className="ml-2 text-yellow-400 text-xs">👑 المتصدر</span>;
    }
    if (friend.status === 'studying') {
      return <span className="ml-2 text-game-accent text-xs">📚 يدرس الآن</span>;
    }
    if (friend.status === 'active') {
      return <span className="ml-2 text-green-400 text-xs">💬 جاهز للدراسة</span>;
    }
    return null;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white font-changa bg-gradient-to-r from-game-primary to-game-accent bg-clip-text text-transparent">المجتمع</h1>
          <p className="text-gray-400 mt-1">تفاعل مع أصدقائك وتنافس معهم</p>
        </div>
        
        <div className="flex gap-3">
          <div className="bg-game-card-bg-alt px-4 py-2 rounded-lg border border-white/5 flex items-center gap-2 shadow-lg shadow-game-primary/5">
            <Trophy className="h-5 w-5 text-yellow-400 animate-pulse-glow" />
            <span className="text-white font-semibold font-share-tech">{user?.rank || '#4'}</span>
            <span className="text-gray-400">الترتيب</span>
          </div>
          
          <div className="bg-game-card-bg-alt px-4 py-2 rounded-lg border border-white/5 flex items-center gap-2 shadow-lg shadow-game-accent/5">
            <Award className="h-5 w-5 text-game-accent" />
            <span className="text-white font-semibold font-share-tech">{user?.xp || '8,966'}</span>
            <span className="text-gray-400">نقطة</span>
          </div>
        </div>
      </div>
      
      {/* Tabs with animated border */}
      <div className="flex border-b border-gray-800 relative mb-6">
        <button
          className={`px-6 py-3 flex items-center gap-2 relative ${activeTab === 'friends' ? 'text-game-primary font-medium' : 'text-gray-400'}`}
          onClick={() => setActiveTab('friends')}
        >
          <Users className={`h-5 w-5 ${activeTab === 'friends' ? 'animate-pulse-glow' : ''}`} />
          الأصدقاء
          {activeTab === 'friends' && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-game-primary to-game-accent animate-pulse-glow"></span>
          )}
        </button>
        <button
          className={`px-6 py-3 flex items-center gap-2 relative ${activeTab === 'leaderboard' ? 'text-game-primary font-medium' : 'text-gray-400'}`}
          onClick={() => setActiveTab('leaderboard')}
        >
          <Trophy className={`h-5 w-5 ${activeTab === 'leaderboard' ? 'animate-pulse-glow' : ''}`} />
          المتصدرون
          {activeTab === 'leaderboard' && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-game-primary to-game-accent animate-pulse-glow"></span>
          )}
        </button>
      </div>
      
      {/* Friends Tab */}
      {activeTab === 'friends' && (
        <div className="space-y-6 animate-scale-in">
          <div className="flex flex-col sm:flex-row justify-between gap-3">
            <div className="relative max-w-md w-full">
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="py-3 px-4 pr-10 bg-game-card-bg border border-white/10 rounded-lg text-white w-full focus:outline-none focus:ring-1 focus:ring-game-primary transition-colors"
                placeholder="ابحث عن صديق..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <button
              onClick={handleAddFriend}
              className="game-btn flex items-center gap-2 bg-gradient-to-r from-game-primary to-game-primary/70 hover:shadow-lg hover:shadow-game-primary/20 transition-all px-6"
            >
              <UserPlus className="h-4 w-4" />
              إضافة صديق
            </button>
          </div>
          
          {/* Friends List */}
          <div className="space-y-4">
            {filteredFriends.map((friend) => (
              <div 
                key={friend.id} 
                className="game-panel hover:border-game-primary transition-all hover:shadow-lg hover:shadow-game-primary/10 hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <div className="h-16 w-16 rounded-full flex items-center justify-center text-2xl border-2 relative bg-gradient-to-b from-game-card-bg-alt to-game-card-bg border-white/10 shadow-inner overflow-hidden hover:border-game-primary transition-all cursor-pointer">
                          {friend.avatar}
                          {friend.isOnline && (
                            <div className="absolute bottom-1 right-1 h-3 w-3 bg-green-500 rounded-full border border-game-card-bg animate-pulse"></div>
                          )}
                          {friend.streak >= 20 && (
                            <div className="absolute -top-1 -right-1 text-xs">🔥</div>
                          )}
                        </div>
                      </HoverCardTrigger>
                      <HoverCardContent className="bg-game-card-bg-alt border border-white/10 p-4 shadow-xl rounded-lg w-60">
                        <div className="flex flex-col items-center gap-2">
                          <div className="text-3xl">{friend.avatar}</div>
                          <p className="text-white font-medium">{friend.name}</p>
                          <div className="flex items-center gap-2 text-sm text-game-accent">
                            <Trophy className="h-4 w-4" />
                            <span>المستوى {friend.level}</span>
                          </div>
                          <div className="w-full h-1.5 bg-game-background rounded-full overflow-hidden mt-2">
                            <div className="h-full bg-gradient-to-r from-game-accent to-game-highlight" style={{ width: '65%' }}></div>
                          </div>
                          <div className="text-sm text-gray-400 mt-1">{friend.xp.toLocaleString()} XP</div>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-white flex items-center">
                        {friend.name}
                        {renderStatusIcon(friend)}
                      </h3>
                      
                      <div className="flex items-center gap-2">
                        <div className="flex items-center text-game-accent bg-game-accent/10 px-2 py-0.5 rounded-lg">
                          <Star className="h-4 w-4 mr-1" />
                          <span className="font-share-tech">{friend.level}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between text-sm mt-2">
                      <div className="text-gray-400">
                        <span className="font-share-tech">{friend.xp.toLocaleString()} XP</span>
                      </div>
                      <div className="flex items-center text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-lg">
                        <span className="font-share-tech">🔥 {friend.streak} يوم</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-end mt-3">
                      <button className="text-xs px-3 py-1.5 bg-game-card-bg-alt hover:bg-game-secondary/20 text-white rounded-md transition-colors">
                        تحدي
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredFriends.length === 0 && (
              <div className="text-center py-12">
                <div className="text-5xl mb-4 opacity-30">👥</div>
                <p className="text-gray-400">لم يتم العثور على أصدقاء</p>
                <p className="text-gray-500 text-sm mt-2">جرب البحث بكلمات مختلفة</p>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Leaderboard Tab */}
      {activeTab === 'leaderboard' && (
        <div className="animate-scale-in">
          <div className="game-panel border-gradient shadow-2xl shadow-game-primary/10">
            <h3 className="text-xl font-bold text-white mb-6 font-changa flex items-center">
              <Crown className="h-5 w-5 text-yellow-400 mr-2" />
              المتصدرون (أعلى 5)
            </h3>
            
            <div className="space-y-4">
              {LEADERBOARD_DATA.map((entry, index) => {
                // Define badge and styling based on rank
                let badgeStyle = "";
                let rankDisplay = "";
                
                if (entry.badge === 'gold') {
                  badgeStyle = "bg-yellow-500/20 border-yellow-500/30 text-yellow-400";
                  rankDisplay = "🥇";
                } else if (entry.badge === 'silver') {
                  badgeStyle = "bg-gray-300/20 border-gray-300/30 text-gray-300";
                  rankDisplay = "🥈";
                } else if (entry.badge === 'bronze') {
                  badgeStyle = "bg-orange-500/20 border-orange-500/30 text-orange-400";
                  rankDisplay = "🥉";
                } else {
                  badgeStyle = "bg-gray-700/50 border-gray-700";
                  rankDisplay = `#${entry.rank}`;
                }
                
                // Is this the current user?
                const isCurrentUser = entry.id === 'f1';
                const rowStyle = isCurrentUser 
                  ? "bg-game-card-bg-alt border-l-4 border-l-game-primary" 
                  : "bg-game-card-bg hover:bg-game-card-bg-alt";
                
                return (
                  <div 
                    key={entry.id}
                    className={`flex items-center p-4 rounded-lg transition-all ${rowStyle} hover:shadow-md`}
                  >
                    <div className={`min-w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg border ${badgeStyle}`}>
                      {rankDisplay}
                    </div>
                    
                    <div className="h-12 w-12 bg-game-card-bg-alt rounded-full flex items-center justify-center text-xl mx-4 border border-white/5 overflow-hidden">
                      {entry.avatar}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h4 className={`font-medium ${isCurrentUser ? 'text-game-primary' : 'text-white'}`}>
                          {entry.name}
                          {isCurrentUser && <span className="text-xs text-game-primary ml-2">(أنت)</span>}
                        </h4>
                        <div className="flex items-center">
                          {entry.growth === 'up' && <span className="text-green-400 text-xs mr-2">▲ 1</span>}
                          {entry.growth === 'down' && <span className="text-red-400 text-xs mr-2">▼ 1</span>}
                          <div className="text-game-primary font-bold font-share-tech bg-game-primary/10 px-3 py-1 rounded-full">
                            {entry.xp.toLocaleString()} XP
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="text-center mt-8">
              <button className="px-6 py-3 bg-game-card-bg text-white rounded-lg hover:bg-game-card-bg-alt transition-colors text-sm border border-white/5">
                عرض القائمة الكاملة
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Community;
