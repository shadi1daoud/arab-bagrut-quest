
import React from 'react';
import { Trophy, Flame } from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Card, CardContent } from './ui/card';

interface LeaderboardUser {
  id: number;
  name: string;
  level: number;
  xp: number;
  streak?: number;
  badge?: string | null;
  isCurrentUser?: boolean;
  avatar: string;
  rank: number;
}

interface LeaderboardProps {
  data: LeaderboardUser[];
  filter?: string;
  onFilterChange?: (filter: string) => void;
}

// Helper functions
const getBadgeStyle = (badge: string | null) => {
  switch(badge) {
    case 'legendary':
      return { icon: '👑', color: 'text-yellow-400', bg: 'bg-yellow-500/20' };
    case 'expert':
      return { icon: '🏆', color: 'text-purple-400', bg: 'bg-purple-500/20' };  
    case 'master':
      return { icon: '⭐', color: 'text-blue-400', bg: 'bg-blue-500/20' };
    default:
      return null;
  }
};

export const Leaderboard: React.FC<LeaderboardProps> = ({
  data,
  filter = 'week',
  onFilterChange = () => {}
}) => {
  return (
    <div>
      <Card className="bg-black/40 border border-white/10 overflow-hidden">
        <CardContent className="p-0">
          <Tabs defaultValue={filter} onValueChange={onFilterChange}>
            <TabsList className="flex w-full">
              <TabsTrigger value="week" className="flex-1">أسبوعي</TabsTrigger>
              <TabsTrigger value="month" className="flex-1">شهري</TabsTrigger>
            </TabsList>
            
            <TabsContent value="week">
              <div className="divide-y divide-white/5">
                {data.slice(0, 10).map((user) => {
                  const badgeStyle = getBadgeStyle(user.badge);
                  return (
                    <div 
                      key={user.id} 
                      className={`flex items-center gap-2 p-2 ${
                        user.isCurrentUser ? 'bg-[#FF4B1A]/5 border-r-2 border-[#FF4B1A]' : ''
                      }`}
                    >
                      <div className={`h-6 w-6 rounded-full flex items-center justify-center border ${
                        user.rank === 1 ? 'border-yellow-500/50 text-yellow-400' : 
                        user.rank === 2 ? 'border-gray-300/50 text-gray-300' : 
                        user.rank === 3 ? 'border-orange-500/50 text-orange-400' : 
                        'border-white/10 text-white/70'
                      }`}>
                        <span className="text-xs font-share-tech">{user.rank}</span>
                      </div>
                      
                      <div className="relative">
                        <div className="h-8 w-8 rounded-full bg-game-card-bg-alt flex items-center justify-center text-lg">
                          {user.avatar}
                        </div>
                        {user.streak && user.streak > 0 && (
                          <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs">
                            <Flame className="h-2.5 w-2.5" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-white">{user.name}</span>
                          <span className="text-xs text-[#FF4B1A] font-share-tech">{user.xp.toLocaleString()} XP</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Trophy className="h-3 w-3 text-yellow-400" />
                            <span className="text-xs text-gray-400">Lv {user.level}</span>
                          </div>
                          
                          {badgeStyle && (
                            <div className={`px-1.5 py-0.5 rounded text-xs flex items-center gap-1 ${badgeStyle.bg}`}>
                              <span>{badgeStyle.icon}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>
            
            <TabsContent value="month">
              <div className="p-3 text-center text-gray-400">
                سيتم تحديث المتصدرين الشهريين في بداية الشهر القادم
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Leaderboard;
