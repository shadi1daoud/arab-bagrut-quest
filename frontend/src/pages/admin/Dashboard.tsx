
import { useState } from 'react';
import { 
  Users, BookOpen, Award, TrendingUp, UserCheck, ArrowUpRight, PlusCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Tab } from '@headlessui/react';

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
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center gap-2 mb-2">
        <div>
          <h1 className="text-xl font-bold text-white">لوحة التحكم</h1>
          <p className="text-gray-400 text-xs">نظرة عامة على منصة دارسني</p>
        </div>
        
        <div className="flex gap-2">
          <select
            value={periodFilter}
            onChange={(e) => setPeriodFilter(e.target.value)}
            className="py-1.5 px-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-game-primary text-xs"
          >
            <option value="day">اليوم</option>
            <option value="week">هذا الأسبوع</option>
            <option value="month">هذا الشهر</option>
          </select>
          
          <Link 
            to="/admin/courses/upload"
            className="game-btn flex items-center gap-1.5 py-1.5 px-3 text-sm"
          >
            <PlusCircle className="h-3.5 w-3.5" />
            رفع كورس 
          </Link>
        </div>
      </div>
      
      {/* Dashboard content */}
      <div className="grid grid-cols-12 gap-2 h-full">
        {/* Left column - 8 cols */}
        <div className="col-span-8 flex flex-col gap-2">
          {/* Key Metrics */}
          <div className="grid grid-cols-4 gap-2">
            <div className="bg-gray-800 rounded-lg p-2 border border-gray-700">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-400 text-xs">إجمالي الطلاب</p>
                  <h3 className="text-xl font-bold text-white">
                    {ANALYTICS_DATA.totalStudents}
                  </h3>
                  <p className="text-xs text-green-500 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-0.5" />
                    +{ANALYTICS_DATA.studentGrowth}%
                  </p>
                </div>
                <div className="h-8 w-8 rounded-full bg-blue-900/30 flex items-center justify-center">
                  <Users className="h-4 w-4 text-blue-500" />
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-2 border border-gray-700">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-400 text-xs">إجمالي الكورسات</p>
                  <h3 className="text-xl font-bold text-white">
                    {ANALYTICS_DATA.totalCourses}
                  </h3>
                  <p className="text-xs text-gray-400 flex items-center">
                    {ANALYTICS_DATA.totalLessons} درس
                  </p>
                </div>
                <div className="h-8 w-8 rounded-full bg-purple-900/30 flex items-center justify-center">
                  <BookOpen className="h-4 w-4 text-purple-500" />
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-2 border border-gray-700">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-400 text-xs">إجمالي النقاط</p>
                  <h3 className="text-xl font-bold text-white">
                    {(ANALYTICS_DATA.totalXPAwarded / 1000).toFixed(0)}K
                  </h3>
                  <p className="text-xs text-gray-400 flex items-center">
                    XP
                  </p>
                </div>
                <div className="h-8 w-8 rounded-full bg-yellow-900/30 flex items-center justify-center">
                  <Award className="h-4 w-4 text-yellow-500" />
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-2 border border-gray-700">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-400 text-xs">الطلاب النشطين</p>
                  <h3 className="text-xl font-bold text-white">
                    {ANALYTICS_DATA.activeStudents}
                  </h3>
                  <p className="text-xs text-gray-400 flex items-center">
                    الإتمام {ANALYTICS_DATA.completionRate}%
                  </p>
                </div>
                <div className="h-8 w-8 rounded-full bg-green-900/30 flex items-center justify-center">
                  <UserCheck className="h-4 w-4 text-green-500" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Activity Chart */}
          <div className="bg-gray-800 rounded-lg p-3 border border-gray-700 flex-1">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-white text-base">نشاط الطلاب</h3>
              <span className="text-xs text-gray-400">نشاط الأسبوع</span>
            </div>
            
            <div className="h-32 flex items-end justify-between gap-1">
              {ANALYTICS_DATA.weeklyActivity.map((day) => (
                <div key={day.day} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-gray-700 rounded-t-sm transition-all duration-500 hover:bg-blue-600 group relative"
                    style={{ height: `${(day.count / 250) * 100}%` }}
                  >
                    <div className="absolute opacity-0 group-hover:opacity-100 bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded px-1.5 py-0.5 pointer-events-none transition-opacity">
                      {day.count} طالب
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 mt-1">{day.day}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Recent Active Students */}
          <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-white">الطلاب النشطين مؤخراً</h3>
              <Link to="/admin/users" className="text-xs text-blue-500 hover:underline">
                عرض الكل
              </Link>
            </div>
            
            <div className="overflow-hidden">
              <table className="w-full table-auto text-sm">
                <thead>
                  <tr className="text-right">
                    <th className="px-2 py-1 text-xs font-medium text-gray-400">الطالب</th>
                    <th className="px-2 py-1 text-xs font-medium text-gray-400">آخر نشاط</th>
                    <th className="px-2 py-1 text-xs font-medium text-gray-400">التقدم</th>
                    <th className="px-2 py-1 text-xs font-medium text-gray-400"></th>
                  </tr>
                </thead>
                <tbody>
                  {ANALYTICS_DATA.recentlyActiveStudents.slice(0, 4).map((student) => (
                    <tr key={student.id} className="border-t border-gray-700">
                      <td className="px-2 py-1.5">
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-gray-700 flex items-center justify-center text-base">
                            {student.avatar}
                          </div>
                          <span className="font-medium text-white text-sm">{student.name}</span>
                        </div>
                      </td>
                      <td className="px-2 py-1.5 text-xs text-gray-400">
                        {student.lastActive}
                      </td>
                      <td className="px-2 py-1.5">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${
                                student.progress > 80 ? 'bg-green-600' : 
                                student.progress > 50 ? 'bg-blue-600' : 
                                'bg-yellow-600'
                              }`} 
                              style={{ width: `${student.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-400 w-6">{student.progress}%</span>
                        </div>
                      </td>
                      <td className="px-2 py-1.5 text-right">
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
        
        {/* Right column - 4 cols */}
        <div className="col-span-4 flex flex-col gap-2">
          {/* Tabbed Panel */}
          <Tab.Group>
            <Tab.List className="flex space-x-1 bg-gray-800 rounded-lg p-1">
              <Tab className={({ selected }) =>
                `w-1/2 py-1.5 text-sm font-medium leading-5 rounded-md
                ${selected
                  ? 'bg-gray-700 text-white shadow'
                  : 'text-gray-400 hover:bg-gray-700/30 hover:text-white'
                }`}
              >
                الكورسات الشائعة
              </Tab>
              <Tab className={({ selected }) =>
                `w-1/2 py-1.5 text-sm font-medium leading-5 rounded-md
                ${selected
                  ? 'bg-gray-700 text-white shadow'
                  : 'text-gray-400 hover:bg-gray-700/30 hover:text-white'
                }`}
              >
                الإحصائيات
              </Tab>
            </Tab.List>
            
            <Tab.Panels className="flex-1 bg-gray-800 rounded-lg border border-gray-700">
              {/* Popular Courses Panel */}
              <Tab.Panel className="p-3 h-full flex flex-col">
                <div className="space-y-2 h-full flex flex-col">
                  {ANALYTICS_DATA.popularCourses.map((course) => (
                    <div 
                      key={course.id} 
                      className="flex items-center gap-3 p-2 rounded-lg bg-gray-700"
                    >
                      <div className={`h-8 w-8 rounded-md ${course.color} flex items-center justify-center`}>
                        <span className="text-lg">{course.icon}</span>
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
                  
                  <div className="mt-auto pt-2 border-t border-gray-700">
                    <Link 
                      to="/admin/courses/upload"
                      className="flex items-center gap-1.5 text-blue-500 text-sm hover:text-blue-400 transition-colors"
                    >
                      <PlusCircle className="h-3.5 w-3.5" />
                      إضافة كورس جديد
                    </Link>
                  </div>
                </div>
              </Tab.Panel>
              
              {/* Statistics Panel */}
              <Tab.Panel className="p-3 h-full">
                <div className="h-full flex flex-col">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">معدل الإكمال</span>
                      <span className="text-sm text-white font-medium">{ANALYTICS_DATA.completionRate}%</span>
                    </div>
                    
                    <div className="h-2 bg-gray-700 rounded-full">
                      <div 
                        className="h-full bg-green-600 rounded-full" 
                        style={{ width: `${ANALYTICS_DATA.completionRate}%` }}
                      ></div>
                    </div>
                    
                    <div className="pt-3 mt-3 border-t border-gray-700">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-400">معدل النمو</span>
                        <span className="text-sm text-green-500 flex items-center">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          {ANALYTICS_DATA.studentGrowth}%
                        </span>
                      </div>
                      
                      <div className="h-2 bg-gray-700 rounded-full">
                        <div 
                          className="h-full bg-blue-600 rounded-full" 
                          style={{ width: `${ANALYTICS_DATA.studentGrowth * 5}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex-1 flex flex-col justify-center items-center">
                    <div className="h-32 w-32 rounded-full border-4 border-gray-700 flex items-center justify-center relative">
                      <div className="h-full w-full rounded-full border-t-4 border-blue-500 absolute top-0 left-0 transform -rotate-45"></div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-white">{ANALYTICS_DATA.totalStudents}</div>
                        <div className="text-xs text-gray-400">طالب إجمالي</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
          
          {/* Quick Actions */}
          <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
            <h3 className="font-semibold text-white mb-2">إجراءات سريعة</h3>
            <div className="grid grid-cols-2 gap-2">
              <Link to="/admin/courses/upload" className="p-2 bg-gray-700 rounded-lg flex items-center gap-2 hover:bg-gray-600 transition-colors">
                <div className="h-6 w-6 rounded-full bg-blue-600/20 flex items-center justify-center">
                  <PlusCircle className="h-3.5 w-3.5 text-blue-400" />
                </div>
                <span className="text-sm text-white">إضافة كورس</span>
              </Link>
              
              <Link to="/admin/users" className="p-2 bg-gray-700 rounded-lg flex items-center gap-2 hover:bg-gray-600 transition-colors">
                <div className="h-6 w-6 rounded-full bg-green-600/20 flex items-center justify-center">
                  <Users className="h-3.5 w-3.5 text-green-400" />
                </div>
                <span className="text-sm text-white">إدارة الطلاب</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
