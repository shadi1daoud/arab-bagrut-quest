
import React from 'react';
import { Trophy, Flame } from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Card, CardContent } from './ui/card';

interface LeaderboardEntry {
  userId: string;
  rank: number;
  score: number;
  name: string;
  avatar?: string;
}

interface LeaderboardProps {
  data: LeaderboardEntry[];
  filter?: string;
  onFilterChange?: (filter: string) => void;
}

// Helper functions
const getBadgeStyle = (rank: number) => {
  switch(rank) {
    case 1:
      return { icon: '👑', color: 'text-yellow-400', bg: 'bg-yellow-500/20' };
    case 2:
      return { icon: '🏆', color: 'text-purple-400', bg: 'bg-purple-500/20' };  
    case 3:
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
                  const badgeStyle = getBadgeStyle(user.rank);
                  return (
                    <div 
                      key={user.userId} 
                      className="flex items-center gap-2 p-2"
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
                          {user.avatar || '👤'}
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-white">{user.name}</span>
                          <span className="text-xs text-[#FF4B1A] font-share-tech">
                            {user.score ? user.score.toLocaleString() : '0'} XP
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Trophy className="h-3 w-3 text-yellow-400" />
                            <span className="text-xs text-gray-400">Rank {user.rank}</span>
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
