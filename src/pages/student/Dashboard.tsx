
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ChevronLeft, Trophy, Star, CheckCircle, Clock } from 'lucide-react';

// Dummy activity data for the chart
const weeklyActivity = [
  { day: 'الأحد', hours: 1.5 },
  { day: 'الإثنين', hours: 2.2 },
  { day: 'الثلاثاء', hours: 0.8 },
  { day: 'الأربعاء', hours: 1.7 },
  { day: 'الخميس', hours: 2.5 },
  { day: 'الجمعة', hours: 0.5 },
  { day: 'السبت', hours: 3.0 },
];

// Calculate user level based on XP
const calculateLevel = (xp: number): string => {
  if (xp < 5000) return 'مبتدئ';
  if (xp < 10000) return 'متوسط';
  if (xp < 20000) return 'متقدم';
  return 'خبير';
};

// Calculate percentage to next level
const calculateLevelProgress = (xp: number): number => {
  if (xp < 5000) return (xp / 5000) * 100;
  if (xp < 10000) return ((xp - 5000) / 5000) * 100;
  if (xp < 20000) return ((xp - 10000) / 10000) * 100;
  return 100;
};

// Sample announcements
const announcements = [
  {
    id: 1,
    title: 'تحديث جديد للمنصة',
    content: 'تم إضافة مواد جديدة في قسم الرياضيات للصف الثاني عشر',
    date: 'منذ 3 أيام'
  },
  {
    id: 2,
    title: 'ورشة عمل قادمة',
    content: 'سيتم تنظيم ورشة عمل افتراضية حول حل مسائل الفيزياء يوم الأحد القادم',
    date: 'منذ يوم واحد'
  }
];

const Dashboard = () => {
  const { user } = useAuth();
  const [isBouncing, setIsBouncing] = useState(false);
  
  const currentLevel = calculateLevel(user?.xp || 0);
  const nextLevel = currentLevel === 'مبتدئ' ? 'متوسط' : 
                    currentLevel === 'متوسط' ? 'متقدم' : 
                    currentLevel === 'متقدم' ? 'خبير' : 'خبير';
  const progressPercentage = calculateLevelProgress(user?.xp || 0);
  
  // Function to trigger XP animation
  const triggerXPAnimation = () => {
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-2 items-start">
        <h1 className="text-2xl font-bold text-white">أهلا بعودتك، {user?.name.split(' ')[0]}</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main User Stats Panel */}
        <div className="game-panel col-span-1 lg:col-span-2 space-y-6">
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            {/* User Avatar */}
            <div className="h-20 w-20 rounded-full bg-game-primary flex items-center justify-center overflow-hidden border-2 border-game-secondary">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
              ) : (
                <span className="text-white text-2xl font-bold">{user?.name?.charAt(0)}</span>
              )}
            </div>
            
            {/* User Basic Info */}
            <div className="flex-1">
              <h2 className="text-xl font-bold text-white">{user?.name}</h2>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <span>{user?.grade} • {user?.city}</span>
              </div>
              
              {/* Level Progress */}
              <div className="mt-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-game-primary font-medium">{currentLevel}</span>
                  <span className="text-sm text-gray-400">{nextLevel}</span>
                </div>
                <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-game-primary rounded-full"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-400 mt-1 text-center">
                  تبقى لك {currentLevel === 'مبتدئ' ? '7' : currentLevel === 'متوسط' ? '5' : '3'} من أصل 10 مستويات لتنتقل إلى مرحلة {nextLevel}
                </div>
              </div>
            </div>
          </div>
          
          {/* User Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {/* Streak */}
            <div className="bg-gray-800 rounded-lg p-3 text-center">
              <div className="flex justify-center items-center text-2xl mb-1">
                <span>🔥</span>
                <span className="font-bold text-white mr-1">{user?.streak}</span>
              </div>
              <span className="text-sm text-gray-400">يوم متواصل</span>
            </div>
            
            {/* XP Points */}
            <div 
              className={`bg-gray-800 rounded-lg p-3 text-center cursor-pointer transition-transform ${isBouncing ? 'animate-float' : ''}`}
              onClick={triggerXPAnimation}
            >
              <div className="text-2xl font-bold text-game-primary glow-text mb-1">
                {user?.xp?.toLocaleString()}
              </div>
              <span className="text-sm text-gray-400">نقاطي</span>
            </div>
            
            {/* Ranking */}
            <div className="bg-gray-800 rounded-lg p-3 text-center">
              <div className="flex justify-center items-center mb-1">
                <Trophy className="w-5 h-5 text-game-accent" />
                <span className="font-bold text-white mr-1">#3</span>
              </div>
              <span className="text-sm text-gray-400">بين أصدقائك</span>
            </div>
            
            {/* Tasks Completed */}
            <div className="bg-gray-800 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-white mb-1">150</div>
              <span className="text-sm text-gray-400">مهمة مكتملة</span>
            </div>
          </div>
        </div>
        
        {/* Activity Panel */}
        <div className="game-panel space-y-4">
          <h3 className="text-lg font-semibold text-white">نشاطي الأسبوعي</h3>
          
          <div className="h-48 flex items-end justify-between gap-1">
            {weeklyActivity.map((day) => (
              <div key={day.day} className="flex-1 flex flex-col items-center">
                <div className="w-full bg-gray-800 rounded-t-sm" style={{ height: `${day.hours * 20}px` }}>
                  <div 
                    className="w-full bg-game-primary rounded-t-sm transition-all duration-500 hover:bg-game-secondary group relative"
                    style={{ height: `${day.hours * 20}px` }}
                  >
                    <div className="absolute opacity-0 group-hover:opacity-100 bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded px-2 py-1 pointer-events-none transition-opacity">
                      {day.hours} ساعة
                    </div>
                  </div>
                </div>
                <span className="text-xs text-gray-400 mt-1">{day.day}</span>
              </div>
            ))}
          </div>
          
          <div className="text-center pt-2 border-t border-gray-800">
            <p className="text-sm text-gray-400">
              <span className="text-game-primary font-bold">{weeklyActivity.reduce((sum, day) => sum + day.hours, 0)}</span> ساعة دراسة هذا الأسبوع
            </p>
          </div>
        </div>
      </div>
      
      {/* Courses Preview & Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Courses Preview */}
        <div className="game-panel lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">كورساتي الحالية</h3>
            <Link to="/courses" className="text-game-primary hover:text-game-secondary text-sm flex items-center">
              عرض الكل <ChevronLeft className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Course 1 */}
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-game-primary transition-colors">
              <div className="flex items-start gap-3">
                <div className="h-12 w-12 rounded-md bg-blue-600 flex items-center justify-center">
                  <span className="text-xl">🧮</span>
                </div>
                
                <div className="flex-1">
                  <h4 className="font-medium text-white">رياضيات</h4>
                  <div className="flex justify-between text-xs text-gray-400 mb-2">
                    <span>الصف الثاني عشر</span>
                    <span>5 وحدات</span>
                  </div>
                  
                  <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full rounded-full" style={{ width: '35%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-xs text-gray-400">35% مكتمل</span>
                    <Link 
                      to="/courses/1" 
                      className="px-3 py-1 text-xs bg-gray-700 hover:bg-gray-600 text-white rounded"
                    >
                      تابع الكورس
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Course 2 */}
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-game-primary transition-colors">
              <div className="flex items-start gap-3">
                <div className="h-12 w-12 rounded-md bg-green-600 flex items-center justify-center">
                  <span className="text-xl">🔤</span>
                </div>
                
                <div className="flex-1">
                  <h4 className="font-medium text-white">إنجليزي</h4>
                  <div className="flex justify-between text-xs text-gray-400 mb-2">
                    <span>الصف الثاني عشر</span>
                    <span>5 وحدات</span>
                  </div>
                  
                  <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-green-600 h-full rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-xs text-gray-400">65% مكتمل</span>
                    <Link 
                      to="/courses/2" 
                      className="px-3 py-1 text-xs bg-gray-700 hover:bg-gray-600 text-white rounded"
                    >
                      تابع الكورس
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Announcements */}
        <div className="game-panel">
          <h3 className="text-lg font-semibold text-white mb-4">إعلانات</h3>
          
          <div className="space-y-4">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="bg-gray-800 rounded-lg p-3 border border-gray-700">
                <h4 className="font-medium text-white text-sm">{announcement.title}</h4>
                <p className="text-gray-400 text-xs mt-1">{announcement.content}</p>
                <div className="flex justify-between items-center mt-2 text-xs">
                  <span className="text-gray-500">{announcement.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
