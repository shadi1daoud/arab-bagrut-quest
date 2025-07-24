import React, { useState, useEffect } from 'react';
import { Activity, Award, BookOpen, Clock, Trophy, TrendingUp, Target, Flame, Star } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import StatsCard from '@/components/StatsCard';
import SimpleStatsCard from '@/components/SimpleStatsCard';
import WeeklyProgressComparison from '@/components/WeeklyProgressComparison';
import AdCard from '@/components/AdCard';
import WeeklyChart from '@/components/WeeklyChart';
import Leaderboard from '@/components/Leaderboard';
import CourseProgress from '@/components/CourseProgress';
import StudentOfWeekWidget from '@/components/widgets/StudentOfWeekWidget';
import DailyMotivationCard from '@/components/widgets/DailyMotivationCard';
import StreakCounter from '@/components/widgets/StreakCounter';
import TodayGoalsCard from '@/components/widgets/TodayGoalsCard';
import { useAuth } from '@/contexts/AuthContext';
import { 
  getCourses, 
  getUserCourseProgress, 
  getLeaderboard,
  subscribeToCourses,
  Course as FirebaseCourse,
  UserCourse
} from '@/lib/firebaseUtils';

// Weekly activity data - this could be fetched from Firebase in the future
const weeklyActivity = [{
  day: 'الأحد',
  xp: 12
}, {
  day: 'الإثنين',
  xp: 8
}, {
  day: 'الثلاثاء',
  xp: 5
}, {
  day: 'الأربعاء',
  xp: 6
}, {
  day: 'الخميس',
  xp: 9
}, {
  day: 'الجمعة',
  xp: 4
}, {
  day: 'السبت',
  xp: 7
}];

const Dashboard = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState<FirebaseCourse[]>([]);
  const [userCourses, setUserCourses] = useState<UserCourse[]>([]);
  const [leaderboardData, setLeaderboardData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  console.log('Dashboard: Rendering with user:', user);

  // Fetch courses and user progress
  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        console.log('Dashboard: No user, skipping data fetch');
        return;
      }

      try {
        console.log('Dashboard: Starting to fetch data');
        setLoading(true);
        
        // Fetch all courses
        const allCourses = await getCourses();
        console.log('Dashboard: Fetched courses:', allCourses.length);
        setCourses(allCourses);

        // Fetch user progress for each course
        const userProgressPromises = allCourses.map(course => 
          getUserCourseProgress(user.id, course.id)
        );
        const userProgressResults = await Promise.all(userProgressPromises);
        const validUserCourses = userProgressResults.filter(progress => progress !== null) as UserCourse[];
        console.log('Dashboard: Fetched user courses:', validUserCourses.length);
        setUserCourses(validUserCourses);

        // Fetch leaderboard
        const leaderboard = await getLeaderboard('weekly', 'xp');
        console.log('Dashboard: Fetched leaderboard:', leaderboard.length);
        setLeaderboardData(leaderboard);

      } catch (error) {
        console.error('Dashboard: Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Subscribe to real-time course updates
    const unsubscribe = subscribeToCourses((updatedCourses) => {
      console.log('Dashboard: Received course updates:', updatedCourses.length);
      setCourses(updatedCourses);
    });

    return () => unsubscribe();
  }, [user]);

  // Calculate user stats
  const userStats = {
    totalCourses: userCourses.length,
    completedCourses: userCourses.filter(course => course.progress === 100).length,
    totalXP: userCourses.reduce((sum, course) => sum + course.totalXP, 0),
    averageProgress: userCourses.length > 0 
      ? Math.round(userCourses.reduce((sum, course) => sum + course.progress, 0) / userCourses.length)
      : 0
  };

  // Transform courses for CourseProgress component
  const courseProgressData = userCourses.map(userCourse => {
    const course = courses.find(c => c.id === userCourse.courseId);
    return {
      id: parseInt(userCourse.courseId),
      name: course?.title || 'Unknown Course',
      progress: userCourse.progress
    };
  });

  console.log('Dashboard: Calculated stats:', userStats);
  console.log('Dashboard: Course progress data:', courseProgressData);

  if (loading) {
    console.log('Dashboard: Showing loading state');
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">جاري التحميل...</div>
      </div>
    );
  }

  console.log('Dashboard: Rendering dashboard content');
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-[#FF4800] to-[#FFA56E] rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">مرحباً، {user?.name}</h1>
        <p className="text-white/90">استمر في رحلتك التعليمية واكتشف المزيد من المعرفة</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SimpleStatsCard
          title="الكورسات المسجلة"
          value={userStats.totalCourses}
          change="+2"
          isPositive={true}
          icon={BookOpen}
        />
        <SimpleStatsCard
          title="الكورسات المكتملة"
          value={userStats.completedCourses}
          change="+1"
          isPositive={true}
          icon={Trophy}
        />
        <SimpleStatsCard
          title="إجمالي النقاط"
          value={userStats.totalXP}
          change="+150"
          isPositive={true}
          icon={Star}
        />
        <SimpleStatsCard
          title="متوسط التقدم"
          value={`${userStats.averageProgress}%`}
          change="+5%"
          isPositive={true}
          icon={TrendingUp}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Course Progress */}
          <Card className="bg-black/40 border border-white/10">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-white mb-4">تقدم الكورسات</h2>
              <div className="space-y-4">
                {courseProgressData.length > 0 ? (
                  <CourseProgress courses={courseProgressData} />
                ) : (
                  <div className="text-center text-gray-400 py-8">
                    <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>لم تسجل في أي كورس بعد</p>
                    <Button className="mt-4" variant="outline">
                      استكشف الكورسات
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Weekly Activity */}
          <Card className="bg-black/40 border border-white/10">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-white mb-4">النشاط الأسبوعي</h2>
              <WeeklyChart data={weeklyActivity} />
            </CardContent>
          </Card>

          {/* Weekly Progress Comparison */}
          <WeeklyProgressComparison 
            currentWeekXP={51}
            previousWeekXP={43}
            currentWeekHours={8.7}
            previousWeekHours={7.2}
            streak={5}
            weeklyGoal={100}
          />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* User Stats Widget */}
          <div className="grid grid-cols-2 gap-4">
            <StreakCounter streak={5} />
            <TodayGoalsCard completedGoals={3} totalGoals={5} />
          </div>

          {/* Student of the Week */}
          <StudentOfWeekWidget />

          {/* Daily Motivation */}
          <DailyMotivationCard />

          {/* Leaderboard */}
          <Card className="bg-black/40 border border-white/10">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-white mb-4">المتصدرون</h2>
              <Leaderboard 
                data={leaderboardData} 
                filter="week"
                onFilterChange={() => {}}
              />
            </CardContent>
          </Card>

          {/* Ad Card */}
          <AdCard />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
