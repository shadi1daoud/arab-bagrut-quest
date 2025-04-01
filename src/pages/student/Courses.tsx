
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ChevronLeft } from 'lucide-react';

// Sample courses data
const COURSES = [
  {
    id: 1,
    title: 'رياضيات',
    subject: 'رياضيات',
    grade: 'الثاني عشر',
    units: 5,
    progress: 35,
    icon: '🧮',
    color: 'bg-blue-600',
    enrolled: true,
    xpReward: 1500,
  },
  {
    id: 2,
    title: 'إنجليزي',
    subject: 'لغات',
    grade: 'الثاني عشر',
    units: 5,
    progress: 65,
    icon: '🔤',
    color: 'bg-green-600',
    enrolled: true,
    xpReward: 1200,
  },
  {
    id: 3,
    title: 'فيزياء',
    subject: 'علوم',
    grade: 'الثاني عشر',
    units: 5,
    progress: 0,
    icon: '⚛️',
    color: 'bg-purple-600',
    enrolled: false,
    xpReward: 1800,
  },
  {
    id: 4,
    title: 'كيمياء',
    subject: 'علوم',
    grade: 'الثاني عشر',
    units: 5,
    progress: 0,
    icon: '🧪',
    color: 'bg-red-600',
    enrolled: false,
    xpReward: 1650,
  },
  {
    id: 5,
    title: 'أحياء',
    subject: 'علوم',
    grade: 'الثاني عشر',
    units: 5,
    progress: 0,
    icon: '🔬',
    color: 'bg-teal-600',
    enrolled: false,
    xpReward: 1400,
  },
  {
    id: 6,
    title: 'تاريخ',
    subject: 'إنسانيات',
    grade: 'الثاني عشر',
    units: 3,
    progress: 0,
    icon: '📜',
    color: 'bg-yellow-600',
    enrolled: false,
    xpReward: 1100,
  },
];

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all'); // 'all', 'enrolled', 'available'
  const [sortBy, setSortBy] = useState('subject'); // 'subject', 'progress'
  
  // Filter and sort courses
  const filteredCourses = COURSES.filter(course => {
    if (filterBy === 'enrolled' && !course.enrolled) return false;
    if (filterBy === 'available' && course.enrolled) return false;
    return course.title.includes(searchTerm) || course.subject.includes(searchTerm);
  }).sort((a, b) => {
    if (sortBy === 'subject') {
      return a.subject.localeCompare(b.subject);
    } else if (sortBy === 'progress') {
      return b.progress - a.progress;
    }
    return 0;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">كورساتي</h1>
          <p className="text-gray-400 mt-1">استكشف واكمل دراستك</p>
        </div>
        
        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative">
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="py-2 px-4 pr-10 bg-gray-800 border border-gray-700 rounded-md text-white w-full focus:outline-none focus:ring-1 focus:ring-game-primary"
              placeholder="ابحث عن كورس..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="py-2 px-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-game-primary"
            >
              <option value="all">جميع الكورسات</option>
              <option value="enrolled">المسجلة</option>
              <option value="available">المتاحة</option>
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="py-2 px-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-game-primary"
            >
              <option value="subject">ترتيب حسب المادة</option>
              <option value="progress">ترتيب حسب التقدم</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div key={course.id} className="game-panel hover:border-game-primary transition-colors">
            <div className="flex items-start gap-4">
              <div className={`h-14 w-14 rounded-md ${course.color} flex items-center justify-center`}>
                <span className="text-2xl">{course.icon}</span>
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between">
                  <h3 className="font-semibold text-white">{course.title}</h3>
                  {course.enrolled && (
                    <span className="text-xs px-2 py-0.5 bg-gray-700 text-white rounded-full">
                      مسجل
                    </span>
                  )}
                </div>
                
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>{course.subject}</span>
                  <span>{course.grade} • {course.units} وحدات</span>
                </div>
                
                {course.enrolled && (
                  <>
                    <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden mt-3">
                      <div 
                        className={`${course.color} h-full rounded-full`} 
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-2 text-xs">
                      <span className="text-gray-400">{course.progress}% مكتمل</span>
                    </div>
                  </>
                )}
                
                <div className="flex justify-between items-center mt-3">
                  <div className="flex items-center text-xs text-game-accent">
                    <span className="ml-1">+{course.xpReward}</span>
                    <span>XP عند الإكمال</span>
                  </div>
                  
                  <Link 
                    to={`/courses/${course.id}`}
                    className="px-3 py-1.5 text-xs game-btn flex items-center gap-1"
                  >
                    {course.enrolled ? 'تابع الكورس' : 'ابدأ الآن'}
                    <ChevronLeft className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">لم يتم العثور على كورسات مطابقة</p>
        </div>
      )}
    </div>
  );
};

export default Courses;
