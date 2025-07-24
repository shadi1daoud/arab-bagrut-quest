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
  getLeaderboardData,
  subscribeToCourses,
  calculateDashboardStats,
  DashboardStats,
  Course as FirebaseCourse,
  UserCourse,
  getUserCourses,
  getDailyQuote,
  addSampleLeaderboardData,
  addSampleQuotesData
} from '@/lib/firebaseUtils';

// Generate weekly activity data from user analytics
const generateWeeklyActivity = (analytics: any) => {
  const days = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
  
  if (!analytics?.weeklyProgress) {
    // Return default data if no analytics available
    return days.map(day => ({ day, xp: 0 }));
  }

  // Get current week key
  const now = new Date();
  const weekKey = `${now.getFullYear()}-W${Math.ceil((now.getDate() + now.getDay()) / 7)}`;
  const currentWeekData = analytics.weeklyProgress[weekKey];

  if (!currentWeekData) {
    return days.map(day => ({ day, xp: 0 }));
  }

  // For now, distribute XP evenly across days (this could be enhanced with actual daily data)
  const dailyXP = Math.floor(currentWeekData.xp / 7);
  return days.map(day => ({ day, xp: dailyXP }));
};

const Dashboard = () => {
  const { user } = useAuth();
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);
  const [courses, setCourses] = useState<FirebaseCourse[]>([]);
  const [userCourses, setUserCourses] = useState<UserCourse[]>([]);
  const [leaderboardData, setLeaderboardData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  console.log('Dashboard: Rendering with user:', user);
  console.log('Dashboard: Current dashboardStats:', dashboardStats);

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) {
        console.log('Dashboard: No user, skipping data fetch');
        return;
      }

      try {
        console.log('Dashboard: Starting to fetch dashboard data');
        setLoading(true);
        
        // Calculate comprehensive dashboard stats
        const stats = await calculateDashboardStats(user.id);
        setDashboardStats(stats);

        // Fetch all courses
        const allCourses = await getCourses();
        console.log('Dashboard: Fetched courses:', allCourses.length);
        setCourses(allCourses);

        // Get user courses from the stats
        const userCoursesData = await getUserCourses(user.id);
        console.log('Dashboard: Fetched user courses:', userCoursesData.length);
        setUserCourses(userCoursesData);

        // Fetch leaderboard
        const leaderboard = await getLeaderboardData('weekly');
        console.log('Dashboard: Fetched leaderboard:', leaderboard.length);
        setLeaderboardData(leaderboard);



      } catch (error) {
        console.error('Dashboard: Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();

    // Subscribe to real-time course updates
    const unsubscribe = subscribeToCourses((updatedCourses) => {
      console.log('Dashboard: Received course updates:', updatedCourses.length);
      setCourses(updatedCourses);
    });

    return () => unsubscribe();
  }, [user]);

  // Transform courses for CourseProgress component
  const courseProgressData = userCourses.map(userCourse => {
    const course = courses.find(c => c.id === userCourse.courseId);
    return {
      id: parseInt(userCourse.courseId),
      name: course?.title || 'Unknown Course',
      progress: userCourse.progress
    };
  });

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
        
        {/* Temporary button for testing - remove in production */}
        <div className="mt-4 flex gap-2">
          <Button 
            onClick={async () => {
              try {
                await addSampleLeaderboardData();
                await addSampleQuotesData();
                // Refresh data
                const leaderboard = await getLeaderboardData('weekly');
                setLeaderboardData(leaderboard);
              } catch (error) {
                console.error('Error adding sample data:', error);
              }
            }}
            variant="outline"
            size="sm"
            className="text-white border-white/30 hover:bg-white/10"
          >
            تحديث البيانات التجريبية
          </Button>
          <div className="text-xs text-white/70 mt-2">
            💡 البيانات التجريبية ستظهر تلقائياً حتى لو لم يتم تحديث قاعدة البيانات
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SimpleStatsCard
          title="الكورسات المسجلة"
          value={dashboardStats?.totalCourses || 0}
          change={`+${dashboardStats?.totalCourses || 0}`}
          isPositive={true}
          icon={BookOpen}
        />
        <SimpleStatsCard
          title="الكورسات المكتملة"
          value={dashboardStats?.completedCourses || 0}
          change={`+${dashboardStats?.completedCourses || 0}`}
          isPositive={true}
          icon={Trophy}
        />
        <SimpleStatsCard
          title="إجمالي النقاط"
          value={dashboardStats?.totalXP || 0}
          change={`+${dashboardStats?.weeklyStats?.currentWeekXP || 0}`}
          isPositive={true}
          icon={Star}
        />
        <SimpleStatsCard
          title="متوسط التقدم"
          value={`${dashboardStats?.averageProgress || 0}%`}
          change={`+${dashboardStats?.averageProgress || 0}%`}
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
              <WeeklyChart data={generateWeeklyActivity(dashboardStats)} />
            </CardContent>
          </Card>

          {/* Weekly Progress Comparison */}
          <WeeklyProgressComparison 
            currentWeekXP={dashboardStats?.weeklyStats?.currentWeekXP || 0}
            previousWeekXP={dashboardStats?.weeklyStats?.previousWeekXP || 0}
            currentWeekHours={dashboardStats?.weeklyStats?.currentWeekHours || 0}
            previousWeekHours={dashboardStats?.weeklyStats?.previousWeekHours || 0}
            streak={dashboardStats?.currentStreak || 0}
            weeklyGoal={dashboardStats?.weeklyStats?.weeklyGoal || 1000}
          />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* User Stats Widget */}
          <div className="grid grid-cols-2 gap-4">
            <StreakCounter streak={dashboardStats?.currentStreak || 0} />
            <TodayGoalsCard 
              completedGoals={dashboardStats?.weeklyStats?.currentWeekXP || 0} 
              totalGoals={dashboardStats?.weeklyStats?.weeklyGoal || 1000} 
            />
          </div>

          {/* Student of the Week */}
          <StudentOfWeekWidget leaderboardData={leaderboardData} />

          {/* Daily Motivation */}
          <DailyMotivationCard />

          {/* Leaderboard */}
          <Card className="bg-black/40 border border-white/10">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-white mb-4">المتصدرون</h2>
              {leaderboardData.length > 0 ? (
                <Leaderboard 
                  data={leaderboardData} 
                  filter="week"
                  onFilterChange={() => {}}
                />
              ) : (
                <div className="text-center text-gray-400 py-4">
                  <Trophy className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>لا توجد بيانات متصدرين متاحة حالياً</p>
                </div>
              )}
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
