
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Search, Trophy, Star, Users, UserPlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Friends data
interface Friend {
  id: string;
  name: string;
  avatar?: string;
  level: number;
  xp: number;
  streak: number;
  isOnline: boolean;
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
  },
  {
    id: 'f2',
    name: 'سارة حسن',
    avatar: '👧',
    level: 6,
    xp: 14200,
    streak: 30,
    isOnline: false,
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
  },
];

// Leaderboard data
interface LeaderboardEntry {
  id: string;
  name: string;
  avatar?: string;
  xp: number;
  rank: number;
}

const LEADERBOARD_DATA: LeaderboardEntry[] = [
  {
    id: 'l1',
    name: 'سارة حسن',
    avatar: '👧',
    xp: 14200,
    rank: 1,
  },
  {
    id: 'l2',
    name: 'ليلى عمر',
    avatar: '👩',
    xp: 16300,
    rank: 2,
  },
  {
    id: 'f1',
    name: 'شادي داود',
    avatar: '👨‍🎓',
    xp: 8966,
    rank: 3,
  },
  {
    id: 'l3',
    name: 'أحمد محمود',
    avatar: '👦',
    xp: 12500,
    rank: 4,
  },
  {
    id: 'l4',
    name: 'محمد علي',
    avatar: '👨',
    xp: 7800,
    rank: 5,
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">المجتمع</h1>
        <p className="text-gray-400 mt-1">تفاعل مع أصدقائك وتنافس معهم</p>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b border-gray-800">
        <button
          className={`px-4 py-2 flex items-center gap-2 ${activeTab === 'friends' ? 'text-game-primary border-b-2 border-game-primary' : 'text-gray-400'}`}
          onClick={() => setActiveTab('friends')}
        >
          <Users className="h-4 w-4" />
          الأصدقاء
        </button>
        <button
          className={`px-4 py-2 flex items-center gap-2 ${activeTab === 'leaderboard' ? 'text-game-primary border-b-2 border-game-primary' : 'text-gray-400'}`}
          onClick={() => setActiveTab('leaderboard')}
        >
          <Trophy className="h-4 w-4" />
          المتصدرون
        </button>
      </div>
      
      {/* Friends Tab */}
      {activeTab === 'friends' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between gap-3">
            <div className="relative max-w-md w-full">
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="py-2 px-4 pr-10 bg-gray-800 border border-gray-700 rounded-md text-white w-full focus:outline-none focus:ring-1 focus:ring-game-primary"
                placeholder="ابحث عن صديق..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <button
              onClick={handleAddFriend}
              className="game-btn flex items-center gap-2"
            >
              <UserPlus className="h-4 w-4" />
              إضافة صديق
            </button>
          </div>
          
          {/* Friends List */}
          <div className="space-y-4">
            {filteredFriends.map((friend) => (
              <div key={friend.id} className="game-panel hover:border-game-primary transition-colors">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="h-12 w-12 bg-gray-800 rounded-full flex items-center justify-center text-xl border-2 border-gray-700">
                      {friend.avatar}
                    </div>
                    {friend.isOnline && (
                      <div className="absolute bottom-0 left-0 h-3 w-3 bg-green-500 rounded-full border border-gray-800"></div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-white">{friend.name}</h3>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center text-game-accent">
                          <Trophy className="h-4 w-4 mr-1" />
                          <span>المستوى {friend.level}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between text-sm mt-1">
                      <div className="text-gray-400">
                        <span>{friend.xp.toLocaleString()} XP</span>
                      </div>
                      <div className="flex items-center text-gray-400">
                        <span>🔥 {friend.streak} يوم</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredFriends.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400">لم يتم العثور على أصدقاء</p>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Leaderboard Tab */}
      {activeTab === 'leaderboard' && (
        <div>
          <div className="game-panel">
            <h3 className="text-lg font-semibold text-white mb-4">المتصدرون (أعلى 5)</h3>
            
            <div className="space-y-4">
              {LEADERBOARD_DATA.map((entry, index) => (
                <div 
                  key={entry.id}
                  className={`flex items-center p-3 rounded-lg ${entry.id === 'f1' ? 'bg-gray-800 border border-game-primary' : 'bg-gray-800'}`}
                >
                  <div className="w-8 h-8 flex items-center justify-center font-bold text-lg">
                    {index === 0 ? '🥇' : 
                     index === 1 ? '🥈' : 
                     index === 2 ? '🥉' : 
                     `#${entry.rank}`}
                  </div>
                  
                  <div className="h-10 w-10 bg-gray-700 rounded-full flex items-center justify-center text-xl mr-4 border border-gray-600">
                    {entry.avatar}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium text-white">{entry.name}</h4>
                      <div className="text-game-primary font-bold">
                        {entry.xp.toLocaleString()} XP
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-6">
              <button className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors text-sm">
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
