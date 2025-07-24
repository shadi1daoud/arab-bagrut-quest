import React, { useState, useEffect } from 'react';
import { Users, Trophy, Star, MessageCircle, Heart, Share2, MoreHorizontal } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { getLeaderboard } from '@/lib/firebaseUtils';

interface CommunityPost {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp: Date;
  tags: string[];
}

const Community = () => {
  const { user } = useAuth();
  const [leaderboardData, setLeaderboardData] = useState<any[]>([]);
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock community posts (in real app, this would come from Firebase)
  const mockPosts: CommunityPost[] = [
    {
      id: '1',
      userId: 'user1',
      userName: 'أحمد محمد',
      userAvatar: '/assets/avatars/student.png',
      content: 'أكملت كورس الرياضيات اليوم! 🎉 كان صعباً لكنه ممتع جداً. من يريد أن يشاركني في التحدي التالي؟',
      likes: 24,
      comments: 8,
      shares: 3,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      tags: ['رياضيات', 'تحدي', 'إنجاز']
    },
    {
      id: '2',
      userId: 'user2',
      userName: 'سارة أحمد',
      userAvatar: '/assets/avatars/student.png',
      content: 'أفضل طريقة لدراسة الفيزياء هي حل المسائل العملية. جربت هذه الطريقة وحصلت على نتائج ممتازة! 📚',
      image: '/lovable-uploads/1c2c3b5b-f76f-459a-94ed-22d2f3e35da0.png',
      likes: 18,
      comments: 12,
      shares: 5,
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      tags: ['فيزياء', 'دراسة', 'نصائح']
    },
    {
      id: '3',
      userId: 'user3',
      userName: 'محمود علي',
      userAvatar: '/assets/avatars/student.png',
      content: 'وصلت للمركز الثالث في التصنيف الأسبوعي! شكراً لجميع من ساعدني في هذه الرحلة التعليمية 🏆',
      likes: 31,
      comments: 15,
      shares: 7,
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      tags: ['إنجاز', 'تصنيف', 'شكر']
    }
  ];

  // Fetch community data
  useEffect(() => {
    const fetchCommunityData = async () => {
      try {
        setLoading(true);
        
        // Fetch leaderboard
        const leaderboard = await getLeaderboard('weekly', 'xp');
        setLeaderboardData(leaderboard);

        // Set mock posts (in real app, this would come from Firebase)
        setPosts(mockPosts);

      } catch (error) {
        console.error('Error fetching community data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunityData();
  }, []);

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'منذ دقائق';
    if (diffInHours < 24) return `منذ ${diffInHours} ساعة`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `منذ ${diffInDays} يوم`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">جاري التحميل...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">المجتمع</h1>
          <p className="text-gray-400">تواصل مع زملائك وشارك إنجازاتك</p>
        </div>
        <Button className="bg-[#FF4800] hover:bg-[#FF4800]/90">
          <MessageCircle className="h-4 w-4 mr-2" />
          مشاركة جديدة
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-black/40 border border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#FF4800]/10 rounded-lg">
                <Users className="h-5 w-5 text-[#FF4800]" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">أعضاء المجتمع</p>
                <p className="text-white font-bold text-xl">1,247</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#FF4800]/10 rounded-lg">
                <Trophy className="h-5 w-5 text-[#FF4800]" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">إنجازات اليوم</p>
                <p className="text-white font-bold text-xl">89</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#FF4800]/10 rounded-lg">
                <Star className="h-5 w-5 text-[#FF4800]" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">نقاط مكتسبة</p>
                <p className="text-white font-bold text-xl">12,450</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Posts Feed */}
        <div className="lg:col-span-2 space-y-6">
          {posts.map((post) => (
            <Card key={post.id} className="bg-black/40 border border-white/10">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={post.userAvatar} />
                      <AvatarFallback className="bg-[#FF4800]/20 text-white">
                        {post.userName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-white font-medium">{post.userName}</p>
                      <p className="text-gray-400 text-sm">{formatTimeAgo(post.timestamp)}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-white">{post.content}</p>
                
                {post.image && (
                  <div className="rounded-lg overflow-hidden">
                    <img 
                      src={post.image} 
                      alt="Post content"
                      className="w-full h-48 object-cover"
                    />
                  </div>
                )}
                
                {post.tags.length > 0 && (
                  <div className="flex gap-2 flex-wrap">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                )}
                
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center gap-6">
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-[#FF4800]">
                      <Heart className="h-4 w-4 mr-2" />
                      {post.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-[#FF4800]">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      {post.comments}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-[#FF4800]">
                      <Share2 className="h-4 w-4 mr-2" />
                      {post.shares}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Leaderboard */}
          <Card className="bg-black/40 border border-white/10">
            <CardHeader>
              <CardTitle className="text-white">المتصدرون الأسبوعيون</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leaderboardData.slice(0, 5).map((entry, index) => (
                  <div key={entry.userId} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      index === 0 ? 'bg-yellow-500 text-black' :
                      index === 1 ? 'bg-gray-400 text-black' :
                      index === 2 ? 'bg-orange-600 text-white' :
                      'bg-gray-600 text-white'
                    }`}>
                      {index + 1}
                    </div>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={entry.avatar} />
                      <AvatarFallback className="bg-[#FF4800]/20 text-white text-xs">
                        {entry.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">{entry.name}</p>
                      <p className="text-gray-400 text-xs">{entry.score} نقطة</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Trending Topics */}
          <Card className="bg-black/40 border border-white/10">
            <CardHeader>
              <CardTitle className="text-white">المواضيع الرائجة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {['#رياضيات', '#فيزياء', '#إنجاز', '#تحدي', '#نصائح_دراسية'].map((topic) => (
                  <div key={topic} className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 cursor-pointer">
                    <span className="text-white text-sm">{topic}</span>
                    <Badge variant="outline" className="text-xs">
                      24 مشاركة
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Community Guidelines */}
          <Card className="bg-black/40 border border-white/10">
            <CardHeader>
              <CardTitle className="text-white">إرشادات المجتمع</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-gray-400">
                <p>• احترم جميع الأعضاء</p>
                <p>• شارك المحتوى التعليمي المفيد</p>
                <p>• تجنب المحتوى المسيء</p>
                <p>• ساعد زملائك في التعلم</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Community;
