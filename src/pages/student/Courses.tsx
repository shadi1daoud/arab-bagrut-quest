
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ChevronLeft, BookOpen, Star, Clock, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

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
    color: 'from-blue-600 to-blue-400',
    enrolled: true,
    xpReward: 1500,
    realmImage: '🪐',
  },
  {
    id: 2,
    title: 'إنجليزي',
    subject: 'لغات',
    grade: 'الثاني عشر',
    units: 5,
    progress: 65,
    icon: '🔤',
    color: 'from-green-600 to-green-400',
    enrolled: true,
    xpReward: 1200,
    realmImage: '🏝️',
  },
  {
    id: 3,
    title: 'فيزياء',
    subject: 'علوم',
    grade: 'الثاني عشر',
    units: 5,
    progress: 0,
    icon: '⚛️',
    color: 'from-purple-600 to-purple-400',
    enrolled: false,
    xpReward: 1800,
    realmImage: '🔭',
  },
  {
    id: 4,
    title: 'كيمياء',
    subject: 'علوم',
    grade: 'الثاني عشر',
    units: 5,
    progress: 0,
    icon: '🧪',
    color: 'from-red-600 to-red-400',
    enrolled: false,
    xpReward: 1650,
    realmImage: '⚗️',
  },
  {
    id: 5,
    title: 'أحياء',
    subject: 'علوم',
    grade: 'الثاني عشر',
    units: 5,
    progress: 0,
    icon: '🔬',
    color: 'from-teal-600 to-teal-400',
    enrolled: false,
    xpReward: 1400,
    realmImage: '🦠',
  },
  {
    id: 6,
    title: 'تاريخ',
    subject: 'إنسانيات',
    grade: 'الثاني عشر',
    units: 3,
    progress: 0,
    icon: '📜',
    color: 'from-yellow-600 to-yellow-400',
    enrolled: false,
    xpReward: 1100,
    realmImage: '🏛️',
  },
];

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all'); // 'all', 'enrolled', 'available'
  const [sortBy, setSortBy] = useState('subject'); // 'subject', 'progress'
  const [hoverCourse, setHoverCourse] = useState<number | null>(null);
  
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
  
  // Animation variants
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

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-changa bg-gradient-to-r from-game-primary to-game-accent bg-clip-text text-transparent">كورساتي</h1>
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
              className="py-3 px-4 pr-10 bg-game-card-bg border border-gray-700/30 rounded-md text-white w-full focus:outline-none focus:ring-1 focus:ring-game-primary transition-all"
              placeholder="ابحث عن كورس..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="py-3 px-4 bg-game-card-bg border border-gray-700/30 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-game-primary transition-all"
            >
              <option value="all">جميع الكورسات</option>
              <option value="enrolled">المسجلة</option>
              <option value="available">المتاحة</option>
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="py-3 px-4 bg-game-card-bg border border-gray-700/30 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-game-primary transition-all"
            >
              <option value="subject">ترتيب حسب المادة</option>
              <option value="progress">ترتيب حسب التقدم</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Courses Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {filteredCourses.map((course) => (
          <motion.div 
            key={course.id} 
            className="game-panel hover:border-game-primary transition-all duration-300 hover:shadow-lg"
            variants={itemVariants}
            onMouseEnter={() => setHoverCourse(course.id)}
            onMouseLeave={() => setHoverCourse(null)}
          >
            <div className="flex items-start gap-4 relative overflow-hidden">
              {/* Course realm background */}
              <div className={`absolute inset-0 opacity-10 ${hoverCourse === course.id ? 'opacity-15' : ''} transition-opacity duration-300`}>
                <div className={`w-full h-full bg-gradient-to-br ${course.color} opacity-30`}></div>
              </div>
              
              <div className={`h-16 w-16 rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center relative z-10 shadow-lg overflow-hidden`}>
                <div className="absolute inset-0 bg-black opacity-10"></div>
                <span className="text-3xl">{course.icon}</span>
                {course.realmImage && hoverCourse === course.id && (
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-black/30 to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-3xl">{course.realmImage}</span>
                  </motion.div>
                )}
              </div>
              
              <div className="flex-1 relative z-10">
                <div className="flex justify-between">
                  <h3 className="font-semibold text-white font-lexend">{course.title}</h3>
                  {course.enrolled && (
                    <span className="text-xs px-2 py-1 bg-game-primary/20 text-game-primary rounded-full flex items-center">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      مسجل
                    </span>
                  )}
                </div>
                
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>{course.subject}</span>
                  <span className="flex items-center">
                    <BookOpen className="h-3 w-3 mr-1" />
                    {course.grade} • {course.units} وحدات
                  </span>
                </div>
                
                {course.enrolled && (
                  <>
                    <div className="w-full bg-game-background h-2 rounded-full overflow-hidden mt-4">
                      <div 
                        className={`bg-gradient-to-r ${course.color} h-full rounded-full relative`} 
                        style={{ width: `${course.progress}%` }}
                      >
                        {course.progress > 10 && (
                          <div className="absolute inset-0 bg-white opacity-20 animate-pulse"></div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-2 text-xs">
                      <span className="text-gray-400 font-share-tech">{course.progress}% مكتمل</span>
                      {course.progress >= 50 && (
                        <span className="text-green-400 flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          متقدم
                        </span>
                      )}
                    </div>
                  </>
                )}
                
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center text-xs text-game-accent bg-game-accent/10 px-2 py-1 rounded-lg">
                    <Star className="h-3 w-3 mr-1" />
                    <span className="font-share-tech">+{course.xpReward} XP</span>
                  </div>
                  
                  <Link 
                    to={`/courses/${course.id}`}
                    className={`px-4 py-2 text-sm rounded-lg flex items-center gap-1.5 transition-all ${
                      course.enrolled
                        ? 'bg-gradient-to-r from-game-primary to-game-primary/70 text-white hover:shadow-md hover:shadow-game-primary/20'
                        : 'bg-game-card-bg-alt text-white hover:bg-game-card-bg'
                    }`}
                  >
                    {course.enrolled ? 'تابع الكورس' : 'ابدأ الآن'}
                    <ChevronLeft className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      {filteredCourses.length === 0 && (
        <div className="text-center py-16 animate-fade-in">
          <div className="text-7xl mb-4 opacity-30">📚</div>
          <p className="text-gray-400">لم يتم العثور على كورسات مطابقة</p>
          <p className="text-gray-500 text-sm mt-2">جرب البحث بكلمات مختلفة أو تغيير الفلاتر</p>
        </div>
      )}
    </div>
  );
};

export default Courses;
