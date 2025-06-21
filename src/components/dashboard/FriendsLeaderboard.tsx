
import React from 'react';
import { Users, Trophy, Award, Star, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const FriendsLeaderboard = () => {
  // Mock friends data
  const friends = [
    { id: 1, name: 'أحمد محمد', xp: 3200, level: 8, avatar: '👨', rank: 1, isOnline: true, status: 'يدرس الآن' },
    { id: 2, name: 'فاطمة أحمد', xp: 2950, level: 7, avatar: '👩', rank: 2, isOnline: true, status: 'في اختبار' },
    { id: 3, name: 'شادي داود', xp: 2450, level: 5, avatar: '👦', rank: 3, isCurrentUser: true, status: 'نشط' },
    { id: 4, name: 'نور السيد', xp: 2100, level: 6, avatar: '👧', rank: 4, isOnline: false, status: 'آخر ظهور: منذ ساعة' },
    { id: 5, name: 'محمد علي', xp: 1890, level: 5, avatar: '👨‍🎓', rank: 5, isOnline: true, status: 'يحل واجب' }
  ];

  const getRankIcon = (rank: number) => {
    switch(rank) {
      case 1: return <Trophy className="h-4 w-4 text-yellow-400" />;
      case 2: return <Award className="h-4 w-4 text-gray-300" />;
      case 3: return <Star className="h-4 w-4 text-orange-400" />;
      default: return <span className="text-xs font-bold text-gray-400">#{rank}</span>;
    }
  };

  return (
    <Card className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5"></div>
      
      <CardContent className="p-4 relative z-10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-white font-changa flex items-center gap-2">
            <Users className="h-5 w-5 text-[#FF4800]" />
            ترتيب الأصدقاء
          </h3>
          
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-400 font-noto">{friends.filter(f => f.isOnline).length} متصل</span>
          </div>
        </div>

        <div className="space-y-3">
          {friends.map((friend) => (
            <div 
              key={friend.id}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all hover:bg-white/5 ${
                friend.isCurrentUser ? 'bg-[#FF4800]/10 border border-[#FF4800]/20' : 'bg-white/5'
              }`}
            >
              {/* Rank */}
              <div className="flex items-center justify-center w-6 h-6">
                {getRankIcon(friend.rank)}
              </div>
              
              {/* Avatar with online status */}
              <div className="relative">
                <Avatar className="h-10 w-10 border border-white/10">
                  <AvatarFallback className="bg-[#1A1D2F] text-lg">
                    {friend.avatar}
                  </AvatarFallback>
                </Avatar>
                {friend.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-[#0C0E1A]"></div>
                )}
              </div>
              
              {/* Friend Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className={`text-sm font-medium truncate font-changa ${
                    friend.isCurrentUser ? 'text-[#FF4800]' : 'text-white'
                  }`}>
                    {friend.name} {friend.isCurrentUser && '(أنت)'}
                  </h4>
                  <span className="text-xs text-[#FF4800] font-['Share_Tech_Mono'] font-bold">
                    {friend.xp.toLocaleString()} XP
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400 font-noto truncate">
                    {friend.status}
                  </span>
                  <span className="text-xs text-gray-400 font-noto">
                    Lv {friend.level}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="bg-white/5 border-t border-white/10">
        <Button variant="ghost" className="w-full text-[#FF4800] hover:text-[#FF4800] hover:bg-[#FF4800]/10 font-changa">
          عرض جميع الأصدقاء
          <ChevronRight className="h-4 w-4 mr-2" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FriendsLeaderboard;
