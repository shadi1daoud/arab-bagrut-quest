
import React, { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import HeroZone from '@/components/dashboard/HeroZone';
import TodaysMission from '@/components/dashboard/TodaysMission';
import MyCoursesSection from '@/components/dashboard/MyCoursesSection';
import StoreTeaser from '@/components/dashboard/StoreTeaser';
import AchievementsSection from '@/components/dashboard/AchievementsSection';
import WhatsNewSection from '@/components/dashboard/WhatsNewSection';
import Leaderboard from '@/components/Leaderboard';
import { useNavigate } from 'react-router-dom';

// Sample data
const sampleMissions = [
  {
    id: '1',
    title: 'أكمل درس الرياضيات',
    description: 'انهِ درس المعادلات التربيعية',
    progress: 3,
    maxProgress: 5,
    xpReward: 150,
    timeEstimate: '20 دقيقة',
    completed: false
  },
  {
    id: '2',
    title: 'مراجعة الفيزياء',
    description: 'راجع قوانين نيوتن للحركة',
    progress: 5,
    maxProgress: 5,
    xpReward: 100,
    timeEstimate: '15 دقيقة',
    completed: true
  },
  {
    id: '3',
    title: 'حل تمارين الكيمياء',
    description: 'اختبر فهمك للجدول الدوري',
    progress: 1,
    maxProgress: 3,
    xpReward: 200,
    timeEstimate: '30 دقيقة',
    completed: false
  }
];

const sampleCourses = [
  {
    id: '1',
    title: 'رياضيات متقدمة',
    progress: 75,
    totalLessons: 20,
    completedLessons: 15,
    estimatedTime: '2 ساعات',
    nextLesson: 'المعادلات التربيعية',
    color: '#FF4800'
  },
  {
    id: '2',
    title: 'فيزياء الثانوية',
    progress: 60,
    totalLessons: 18,
    completedLessons: 11,
    estimatedTime: '1.5 ساعة',
    nextLesson: 'قوانين الحركة',
    color: '#00FFE1'
  },
  {
    id: '3',
    title: 'كيمياء عامة',
    progress: 45,
    totalLessons: 25,
    completedLessons: 11,
    estimatedTime: '3 ساعات',
    nextLesson: 'الجدول الدوري',
    color: '#A335EE'
  },
  {
    id: '4',
    title: 'اللغة الإنجليزية',
    progress: 30,
    totalLessons: 30,
    completedLessons: 9,
    estimatedTime: '4 ساعات',
    nextLesson: 'القواعد المتقدمة',
    color: '#32FF88'
  }
];

const sampleStoreItems = [
  {
    id: '1',
    name: 'تحدي الأسبوع الذهبي',
    description: 'ضاعف نقاط XP لمدة أسبوع كامل',
    price: 500,
    icon: '⚡',
    rarity: 'legendary' as const,
    featured: true
  },
  {
    id: '2',
    name: 'شارة الإنجاز',
    description: 'اظهر إنجازاتك للأصدقاء',
    price: 150,
    icon: '🏆',
    rarity: 'epic' as const,
    featured: true
  }
];

const sampleAchievements = [
  {
    id: '1',
    title: 'عاشق التعلم',
    description: 'أكمل 10 دروس متتالية',
    progress: 8,
    maxProgress: 10,
    completed: false,
    icon: '📚',
    rarity: 'gold' as const,
    xpReward: 500
  },
  {
    id: '2',
    title: 'نجم الأسبوع',
    description: 'حافظ على streak لمدة 7 أيام',
    progress: 7,
    maxProgress: 7,
    completed: true,
    icon: '⭐',
    rarity: 'platinum' as const,
    xpReward: 300
  }
];

const sampleMilestone = {
  id: '1',
  title: 'ماستر الرياضيات',
  description: 'أكمل جميع دروس الرياضيات بدرجة 90% أو أكثر',
  requiredValue: 20,
  currentValue: 15,
  completed: false,
  locked: false
};

const sampleNews = [
  {
    id: '1',
    type: 'course' as const,
    title: 'كورس جديد: علوم البيانات',
    description: 'تعلم أساسيات تحليل البيانات والذكاء الاصطناعي',
    date: 'منذ يومين',
    isNew: true,
    actionText: 'اكتشف الآن'
  },
  {
    id: '2',
    type: 'event' as const,
    title: 'مسابقة الرياضيات الشهرية',
    description: 'اشترك في المسابقة واربح جوائز قيمة',
    date: 'منذ 3 أيام',
    isNew: true,
    actionText: 'اشترك الآن'
  },
  {
    id: '3',
    type: 'update' as const,
    title: 'تحديثات جديدة في المنصة',
    description: 'تحسينات في الأداء وميزات جديدة',
    date: 'منذ أسبوع',
    isNew: false
  }
];

const leaderboardData = [
  {
    id: 1,
    name: 'سارة',
    level: 15,
    xp: 8450,
    avatar: '👧',
    rank: 1,
    streak: 5,
    badge: 'legendary' as const
  },
  {
    id: 2,
    name: 'محمد',
    level: 14,
    xp: 7920,
    avatar: '👦',
    rank: 2,
    streak: 3,
    badge: 'master' as const
  },
  {
    id: 3,
    name: 'أحمد',
    level: 12,
    xp: 6540,
    avatar: '👨',
    rank: 3,
    badge: 'expert' as const
  }
];

const Dashboard = () => {
  const [leaderboardFilter, setLeaderboardFilter] = useState('week');
  const navigate = useNavigate();

  const handleViewAllCourses = () => {
    navigate('/my-courses');
  };

  const handleViewStore = () => {
    navigate('/shop');
  };
  
  return (
    <ScrollArea className="h-full w-full">
      <div className="min-h-screen p-4 space-y-6">
        {/* Hero Zone - Full Width */}
        <div className="w-full">
          <HeroZone 
            userName="شادي"
            level={5}
            xp={2450}
            maxXp={3000}
            streak={12}
            nextLevelReward="شارة ذهبية جديدة"
          />
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-8 space-y-6">
            {/* Today's Mission */}
            <TodaysMission missions={sampleMissions} />
            
            {/* My Courses */}
            <MyCoursesSection 
              courses={sampleCourses} 
              onViewAll={handleViewAllCourses}
            />
            
            {/* Store Teaser */}
            <StoreTeaser 
              featuredItems={sampleStoreItems}
              userCoins={8965}
              onViewStore={handleViewStore}
            />
          </div>

          {/* Right Column - Secondary Content */}
          <div className="lg:col-span-4 space-y-6">
            {/* Leaderboard */}
            <Leaderboard 
              data={leaderboardData}
              filter={leaderboardFilter}
              onFilterChange={setLeaderboardFilter}
            />
            
            {/* Achievements */}
            <AchievementsSection 
              recentAchievements={sampleAchievements}
              nextMilestone={sampleMilestone}
            />
            
            {/* What's New */}
            <WhatsNewSection newsItems={sampleNews} />
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};

export default Dashboard;
