
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, UserPlus, MessageCircle, Search, 
  Check, X, MoreVertical, Crown, Star,
  Trophy, Gamepad2, Clock, UserMinus
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Mock data for friends
const FRIENDS_DATA = [
  {
    id: 1,
    name: 'رامي سعيد',
    avatar: '👨‍🎓',
    level: 21,
    xp: 28950,
    status: 'online',
    lastSeen: null,
    streak: 14,
    badge: 'legendary',
    isOnline: true,
    currentActivity: 'يحل اختبار الرياضيات',
    mutualFriends: 5
  },
  {
    id: 2,
    name: 'ليان خالد',
    avatar: '👩‍🎓',
    level: 19,
    xp: 25600,
    status: 'studying',
    lastSeen: null,
    streak: 8,
    badge: 'expert',
    isOnline: true,
    currentActivity: 'تدرس الفيزياء',
    mutualFriends: 3
  },
  {
    id: 3,
    name: 'أحمد محمود',
    avatar: '👦',
    level: 16,
    xp: 19500,
    status: 'offline',
    lastSeen: 'منذ ساعتين',
    streak: 5,
    badge: null,
    isOnline: false,
    currentActivity: null,
    mutualFriends: 2
  },
  {
    id: 4,
    name: 'محمد علي',
    avatar: '👨',
    level: 15,
    xp: 18200,
    status: 'offline',
    lastSeen: 'منذ يوم',
    streak: 0,
    badge: null,
    isOnline: false,
    currentActivity: null,
    mutualFriends: 1
  }
];

const FRIEND_REQUESTS = [
  {
    id: 1,
    name: 'نور ماجد',
    avatar: '👧',
    level: 10,
    xp: 11500,
    mutualFriends: 2,
    requestedAt: 'منذ يوم'
  },
  {
    id: 2,
    name: 'عمر سامي',
    avatar: '👦',
    level: 9,
    xp: 10200,
    mutualFriends: 0,
    requestedAt: 'منذ 3 أيام'
  }
];

const SUGGESTED_FRIENDS = [
  {
    id: 1,
    name: 'شادي داود',
    avatar: '👨‍💻',
    level: 14,
    xp: 16800,
    mutualFriends: 3,
    reason: 'أصدقاء مشتركون'
  },
  {
    id: 2,
    name: 'لينا كريم',
    avatar: '👩',
    level: 13,
    xp: 15350,
    mutualFriends: 1,
    reason: 'نفس المدرسة'
  },
  {
    id: 3,
    name: 'يوسف أحمد',
    avatar: '👨‍🎓',
    level: 12,
    xp: 12900,
    mutualFriends: 2,
    reason: 'اهتمامات مشتركة'
  }
];

interface FriendsSectionProps {}

const FriendsSection: React.FC<FriendsSectionProps> = () => {
  const [activeView, setActiveView] = useState<'friends' | 'requests' | 'suggestions'>('friends');
  const [searchQuery, setSearchQuery] = useState('');
  
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'studying': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getBadgeColor = (badge: string | null) => {
    switch (badge) {
      case 'legendary': return 'text-yellow-400 bg-yellow-500/20';
      case 'expert': return 'text-purple-400 bg-purple-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const filteredFriends = FRIENDS_DATA.filter(friend =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <motion.div variants={containerVariants} initial="hidden" animate="show">
        <motion.div variants={itemVariants}>
          <Card className="bg-gradient-to-r from-[#FF4B1A]/20 to-[#FFA56E]/10 border-[#FF4B1A]/30">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-[#FF4B1A]/30 flex items-center justify-center">
                    <Users className="h-6 w-6 text-[#FF4B1A]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">أصدقائي</h2>
                    <p className="text-gray-300 text-sm">{FRIENDS_DATA.length} صديق • {FRIENDS_DATA.filter(f => f.isOnline).length} متصل الآن</p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant={activeView === 'friends' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setActiveView('friends')}
                  >
                    الأصدقاء
                  </Button>
                  <Button
                    variant={activeView === 'requests' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setActiveView('requests')}
                    className="relative"
                  >
                    الطلبات
                    {FRIEND_REQUESTS.length > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                        {FRIEND_REQUESTS.length}
                      </Badge>
                    )}
                  </Button>
                  <Button
                    variant={activeView === 'suggestions' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setActiveView('suggestions')}
                  >
                    اقتراحات
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Search Bar */}
      {activeView === 'friends' && (
        <motion.div variants={containerVariants} initial="hidden" animate="show">
          <motion.div variants={itemVariants}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="ابحث عن الأصدقاء..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#FF4B1A]/50"
              />
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Friends List */}
      {activeView === 'friends' && (
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-4">
          {filteredFriends.map((friend) => (
            <motion.div key={friend.id} variants={itemVariants}>
              <Card className="bg-black/40 border border-white/10 hover:border-[#FF4B1A]/30 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center text-2xl">
                          {friend.avatar}
                        </div>
                        <div className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-black ${getStatusColor(friend.status)}`}></div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-white font-medium">{friend.name}</span>
                          {friend.badge && (
                            <div className={`px-2 py-1 rounded-full text-xs ${getBadgeColor(friend.badge)}`}>
                              {friend.badge === 'legendary' && <Crown className="h-3 w-3 inline mr-1" />}
                              {friend.badge === 'expert' && <Star className="h-3 w-3 inline mr-1" />}
                              {friend.badge}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-3 text-sm text-gray-400">
                          <span>Level {friend.level}</span>
                          <span>•</span>
                          <span>{friend.xp.toLocaleString()} XP</span>
                          {friend.streak > 0 && (
                            <>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                🔥 {friend.streak}
                              </span>
                            </>
                          )}
                        </div>
                        
                        {friend.isOnline && friend.currentActivity && (
                          <div className="flex items-center gap-1 text-xs text-green-400 mt-1">
                            <Gamepad2 className="h-3 w-3" />
                            <span>{friend.currentActivity}</span>
                          </div>
                        )}
                        
                        {!friend.isOnline && friend.lastSeen && (
                          <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                            <Clock className="h-3 w-3" />
                            <span>آخر ظهور {friend.lastSeen}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Friend Requests */}
      {activeView === 'requests' && (
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-4">
          <h3 className="text-lg font-bold text-white">طلبات الصداقة</h3>
          {FRIEND_REQUESTS.length === 0 ? (
            <Card className="bg-black/40 border border-white/10">
              <CardContent className="p-8 text-center">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">لا توجد طلبات صداقة جديدة</p>
              </CardContent>
            </Card>
          ) : (
            FRIEND_REQUESTS.map((request) => (
              <motion.div key={request.id} variants={itemVariants}>
                <Card className="bg-black/40 border border-white/10">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center text-2xl">
                          {request.avatar}
                        </div>
                        
                        <div>
                          <span className="text-white font-medium block">{request.name}</span>
                          <div className="flex items-center gap-3 text-sm text-gray-400">
                            <span>Level {request.level}</span>
                            <span>•</span>
                            <span>{request.xp.toLocaleString()} XP</span>
                          </div>
                          {request.mutualFriends > 0 && (
                            <div className="text-xs text-gray-500 mt-1">
                              {request.mutualFriends} أصدقاء مشتركين
                            </div>
                          )}
                          <div className="text-xs text-gray-500 mt-1">
                            {request.requestedAt}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <Check className="h-4 w-4 mr-1" />
                          قبول
                        </Button>
                        <Button variant="outline" size="sm">
                          <X className="h-4 w-4 mr-1" />
                          رفض
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </motion.div>
      )}

      {/* Friend Suggestions */}
      {activeView === 'suggestions' && (
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-4">
          <h3 className="text-lg font-bold text-white">اقتراحات الأصدقاء</h3>
          <div className="grid gap-4">
            {SUGGESTED_FRIENDS.map((suggestion) => (
              <motion.div key={suggestion.id} variants={itemVariants}>
                <Card className="bg-black/40 border border-white/10">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center text-2xl">
                          {suggestion.avatar}
                        </div>
                        
                        <div>
                          <span className="text-white font-medium block">{suggestion.name}</span>
                          <div className="flex items-center gap-3 text-sm text-gray-400">
                            <span>Level {suggestion.level}</span>
                            <span>•</span>
                            <span>{suggestion.xp.toLocaleString()} XP</span>
                          </div>
                          <div className="text-xs text-blue-400 mt-1">
                            {suggestion.reason}
                          </div>
                          {suggestion.mutualFriends > 0 && (
                            <div className="text-xs text-gray-500 mt-1">
                              {suggestion.mutualFriends} أصدقاء مشتركين
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <Button size="sm">
                        <UserPlus className="h-4 w-4 mr-1" />
                        إضافة
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default FriendsSection;
