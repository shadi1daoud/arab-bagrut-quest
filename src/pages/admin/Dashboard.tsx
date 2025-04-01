
import { useState } from 'react';
import { 
  Users, BookOpen, Award, TrendingUp, UserCheck, ArrowUpRight, PlusCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Sample analytics data
const ANALYTICS_DATA = {
  totalStudents: 246,
  totalCourses: 8,
  totalLessons: 54,
  totalXPAwarded: 124560,
  activeStudents: 187,
  completionRate: 76,
  studentGrowth: 12,
  weeklyActivity: [
    { day: 'الأحد', count: 156 },
    { day: 'الإثنين', count: 142 },
    { day: 'الثلاثاء', count: 164 },
    { day: 'الأربعاء', count: 198 },
    { day: 'الخميس', count: 213 },
    { day: 'الجمعة', count: 140 },
    { day: 'السبت', count: 112 },
  ],
  recentlyActiveStudents: [
    { id: 's1', name: 'أحمد محمود', avatar: '👦', lastActive: 'منذ 5 دقائق', progress: 78 },
    { id: 's2', name: 'سارة حسن', avatar: '👧', lastActive: 'منذ 15 دقيقة', progress: 92 },
    { id: 's3', name: 'محمد علي', avatar: '👨', lastActive: 'منذ 30 دقيقة', progress: 64 },
    { id: 's4', name: 'ليلى عمر', avatar: '👩', lastActive: 'منذ ساعة', progress: 87 },
    { id: 's5', name: 'شادي داود', avatar: '👨‍🎓', lastActive: 'منذ 3 ساعات', progress: 35 },
  ],
  popularCourses: [
    { id: 'c1', title: 'رياضيات', enrollments: 189, icon: '🧮', color: 'bg-blue-600' },
    { id: 'c2', title: 'إنجليزي', enrollments: 156, icon: '🔤', color: 'bg-green-600' },
    { id: 'c3', title: 'فيزياء', enrollments: 98, icon: '⚛️', color: 'bg-purple-600' },
  ],
};

const AdminDashboard = () => {
  const [periodFilter, setPeriodFilter] = useState('week');
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">لوحة التحكم</h1>
          <p className="text-gray-400 mt-1">نظرة عامة على منصة دارسني</p>
        </div>
        
        <div className="flex gap-2">
          <select
            value={periodFilter}
            onChange={(e) => setPeriodFilter(e.target.value)}
            className="py-2 px-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-game-primary"
          >
            <option value="day">اليوم</option>
            <option value="week">هذا الأسبوع</option>
            <option value="month">هذا الشهر</option>
            <option value="year">هذا العام</option>
          </select>
          
          <Link 
            to="/admin/courses/upload"
            className="game-btn flex items-center gap-2"
          >
            <PlusCircle className="h-4 w-4" />
            رفع كورس جديد
          </Link>
        </div>
      </div>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400 text-sm">إجمالي الطلاب</p>
              <h3 className="text-2xl font-bold text-white mt-1">
                {ANALYTICS_DATA.totalStudents}
              </h3>
              <p className="text-xs text-green-500 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +{ANALYTICS_DATA.studentGrowth}% من الشهر الماضي
              </p>
            </div>
            <div className="h-10 w-10 rounded-full bg-blue-900/30 flex items-center justify-center">
              <Users className="h-5 w-5 text-blue-500" />
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400 text-sm">إجمالي الكورسات</p>
              <h3 className="text-2xl font-bold text-white mt-1">
                {ANALYTICS_DATA.totalCourses}
              </h3>
              <p className="text-xs text-gray-400 flex items-center mt-1">
                {ANALYTICS_DATA.totalLessons} درس إجمالي
              </p>
            </div>
            <div className="h-10 w-10 rounded-full bg-purple-900/30 flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-purple-500" />
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400 text-sm">إجمالي النقاط الممنوحة</p>
              <h3 className="text-2xl font-bold text-white mt-1">
                {ANALYTICS_DATA.totalXPAwarded.toLocaleString()}
              </h3>
              <p className="text-xs text-gray-400 flex items-center mt-1">
                XP
              </p>
            </div>
            <div className="h-10 w-10 rounded-full bg-yellow-900/30 flex items-center justify-center">
              <Award className="h-5 w-5 text-yellow-500" />
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400 text-sm">الطلاب النشطين</p>
              <h3 className="text-2xl font-bold text-white mt-1">
                {ANALYTICS_DATA.activeStudents}
              </h3>
              <p className="text-xs text-gray-400 flex items-center mt-1">
                نسبة الإتمام {ANALYTICS_DATA.completionRate}%
              </p>
            </div>
            <div className="h-10 w-10 rounded-full bg-green-900/30 flex items-center justify-center">
              <UserCheck className="h-5 w-5 text-green-500" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Charts and Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Chart */}
        <div className="lg:col-span-2 bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-white">نشاط الطلاب</h3>
            <span className="text-xs text-gray-400">نشاط الأسبوع</span>
          </div>
          
          <div className="h-60 flex items-end justify-between gap-2">
            {ANALYTICS_DATA.weeklyActivity.map((day) => (
              <div key={day.day} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-gray-700 rounded-t-sm transition-all duration-500 hover:bg-blue-600 group relative"
                  style={{ height: `${(day.count / 250) * 100}%` }}
                >
                  <div className="absolute opacity-0 group-hover:opacity-100 bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded px-2 py-1 pointer-events-none transition-opacity">
                    {day.count} طالب
                  </div>
                </div>
                <span className="text-xs text-gray-400 mt-1">{day.day}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Popular Courses */}
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-white">الكورسات الأكثر شعبية</h3>
            <Link to="/admin/courses" className="text-xs text-blue-500 hover:underline">
              عرض الكل
            </Link>
          </div>
          
          <div className="space-y-3">
            {ANALYTICS_DATA.popularCourses.map((course) => (
              <div key={course.id} className="flex items-center gap-3 p-2 rounded-lg bg-gray-700">
                <div className={`h-10 w-10 rounded-md ${course.color} flex items-center justify-center`}>
                  <span className="text-xl">{course.icon}</span>
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium text-white">{course.title}</h4>
                    <span className="text-xs px-2 py-0.5 bg-gray-800 text-white rounded-full">
                      {course.enrollments} طالب
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-700">
            <Link 
              to="/admin/courses/upload"
              className="flex items-center gap-2 text-blue-500 text-sm hover:text-blue-400 transition-colors"
            >
              <PlusCircle className="h-4 w-4" />
              إضافة كورس جديد
            </Link>
          </div>
        </div>
      </div>
      
      {/* Recent Active Students */}
      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-white">الطلاب النشطين مؤخراً</h3>
          <Link to="/admin/users" className="text-xs text-blue-500 hover:underline">
            عرض جميع الطلاب
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="text-right">
                <th className="px-4 py-2 text-sm font-medium text-gray-400">الطالب</th>
                <th className="px-4 py-2 text-sm font-medium text-gray-400">آخر نشاط</th>
                <th className="px-4 py-2 text-sm font-medium text-gray-400">التقدم</th>
                <th className="px-4 py-2 text-sm font-medium text-gray-400"></th>
              </tr>
            </thead>
            <tbody>
              {ANALYTICS_DATA.recentlyActiveStudents.map((student) => (
                <tr key={student.id} className="border-t border-gray-700">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center text-lg">
                        {student.avatar}
                      </div>
                      <span className="font-medium text-white">{student.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-400">
                    {student.lastActive}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            student.progress > 80 ? 'bg-green-600' : 
                            student.progress > 50 ? 'bg-blue-600' : 
                            'bg-yellow-600'
                          }`} 
                          style={{ width: `${student.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-400">{student.progress}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link 
                      to={`/admin/users?id=${student.id}`}
                      className="text-blue-500 hover:text-blue-400 transition-colors"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
