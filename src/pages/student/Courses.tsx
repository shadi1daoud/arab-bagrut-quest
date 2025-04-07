
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ChevronLeft, BookOpen, Star, Clock, CheckCircle, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { Tab } from '@headlessui/react';

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
  
  const enrolledCourses = COURSES.filter(course => course.enrolled);
  const availableCourses = COURSES.filter(course => !course.enrolled);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center gap-2 mb-2">
        <div>
          <h1 className="text-xl font-bold text-white font-changa bg-gradient-to-r from-game-primary to-game-accent bg-clip-text text-transparent">كورساتي</h1>
          <p className="text-gray-400 text-xs">استكشف واكمل دراستك</p>
        </div>
        
        {/* Search & Filters */}
        <div className="flex gap-2 items-center">
          <div className="relative">
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <Search className="h-3 w-3 text-gray-400" />
            </div>
            <input
              type="text"
              className="py-1.5 px-3 pr-8 bg-game-card-bg border border-gray-700/30 rounded-md text-white w-36 text-sm focus:outline-none focus:ring-1 focus:ring-game-primary transition-all"
              placeholder="ابحث..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="py-1.5 px-2 bg-game-card-bg border border-gray-700/30 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-game-primary transition-all text-sm w-28"
          >
            <option value="all">الكل</option>
            <option value="enrolled">المسجلة</option>
            <option value="available">المتاحة</option>
          </select>
        </div>
      </div>
      
      <Tab.Group>
        <Tab.List className="flex mb-2 bg-game-card-bg/50 rounded-lg p-1 text-xs">
          <Tab 
            className={({ selected }) =>
              `flex-1 py-1.5 px-3 rounded-md transition-all ${
                selected ? 'bg-game-card-bg text-game-primary' : 'text-gray-400 hover:text-white'
              }`
            }
          >
            كورساتي
          </Tab>
          <Tab
            className={({ selected }) =>
              `flex-1 py-1.5 px-3 rounded-md transition-all ${
                selected ? 'bg-game-card-bg text-game-primary' : 'text-gray-400 hover:text-white'
              }`
            }
          >
            المتجر
          </Tab>
        </Tab.List>
        
        <Tab.Panels className="flex-1 overflow-hidden">
          {/* My Courses Panel */}
          <Tab.Panel className="h-full">
            {enrolledCourses.length > 0 ? (
              <motion.div 
                className="grid grid-cols-3 gap-2 h-full"
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                {enrolledCourses.map((course) => (
                  <motion.div 
                    key={course.id} 
                    className="game-panel p-3 hover:border-game-primary transition-all duration-300 hover:shadow-lg"
                    variants={itemVariants}
                    onMouseEnter={() => setHoverCourse(course.id)}
                    onMouseLeave={() => setHoverCourse(null)}
                  >
                    <div className="flex items-start gap-2 relative">
                      <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${course.color} flex items-center justify-center relative shadow-lg overflow-hidden flex-shrink-0`}>
                        <div className="absolute inset-0 bg-black opacity-10"></div>
                        <span className="text-xl">{course.icon}</span>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold text-white font-lexend text-sm">{course.title}</h3>
                          <span className="text-xs px-1.5 py-0.5 bg-game-primary/20 text-game-primary rounded-full flex items-center">
                            <CheckCircle className="h-2.5 w-2.5 mr-0.5" />
                            مسجل
                          </span>
                        </div>
                        
                        <div className="flex justify-between text-xs text-gray-400 mt-0.5">
                          <span>{course.subject}</span>
                          <span className="flex items-center">
                            <BookOpen className="h-2.5 w-2.5 mr-0.5" />
                            {course.units} وحدات
                          </span>
                        </div>
                        
                        {/* Progress bar */}
                        <div className="w-full bg-game-background h-1.5 rounded-full overflow-hidden mt-2">
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
                          
                          <Link 
                            to={`/courses/${course.id}`}
                            className="px-2 py-1 text-xs rounded-lg flex items-center gap-1 bg-gradient-to-r from-game-primary to-game-primary/70 text-white"
                          >
                            تابع
                            <ChevronLeft className="h-3 w-3" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="flex items-center justify-center h-full animate-fade-in">
                <div className="text-center">
                  <div className="text-5xl mb-3 opacity-30">📚</div>
                  <p className="text-gray-400 text-sm">لم تسجل في أي كورس بعد</p>
                  <button className="mt-3 px-4 py-1.5 bg-game-primary rounded-md text-white text-sm">استعرض الكورسات</button>
                </div>
              </div>
            )}
          </Tab.Panel>
          
          {/* Available Courses Panel */}
          <Tab.Panel className="h-full">
            {availableCourses.length > 0 ? (
              <div className="h-full flex flex-col">
                <div className="flex gap-2 mb-2">
                  <button className="px-3 py-1 rounded-md bg-game-card-bg-alt text-white text-xs border border-white/5 hover:border-white/20">الكل</button>
                  <button className="px-3 py-1 rounded-md bg-transparent text-gray-400 text-xs hover:text-white">علوم</button>
                  <button className="px-3 py-1 rounded-md bg-transparent text-gray-400 text-xs hover:text-white">رياضيات</button>
                  <button className="px-3 py-1 rounded-md bg-transparent text-gray-400 text-xs hover:text-white">لغات</button>
                </div>
                
                <Tab.Group>
                  <Tab.Panels className="flex-1">
                    <Tab.Panel className="h-full">
                      <motion.div 
                        className="grid grid-cols-3 gap-2 h-full"
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                      >
                        {availableCourses.map((course) => (
                          <motion.div 
                            key={course.id} 
                            className="game-panel p-3 hover:border-game-primary transition-all duration-300 hover:shadow-lg"
                            variants={itemVariants}
                            onMouseEnter={() => setHoverCourse(course.id)}
                            onMouseLeave={() => setHoverCourse(null)}
                          >
                            <div className="flex items-start gap-2 relative">
                              <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${course.color} flex items-center justify-center relative shadow-lg overflow-hidden flex-shrink-0`}>
                                <div className="absolute inset-0 bg-black opacity-10"></div>
                                <span className="text-xl">{course.icon}</span>
                                {course.realmImage && hoverCourse === course.id && (
                                  <motion.div 
                                    className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-black/30 to-transparent"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                  >
                                    <span className="text-xl">{course.realmImage}</span>
                                  </motion.div>
                                )}
                              </div>
                              
                              <div className="flex-1">
                                <div className="flex justify-between">
                                  <h3 className="font-semibold text-white font-lexend text-sm">{course.title}</h3>
                                </div>
                                
                                <div className="flex justify-between text-xs text-gray-400 mt-0.5">
                                  <span>{course.subject}</span>
                                  <span className="flex items-center">
                                    <BookOpen className="h-2.5 w-2.5 mr-0.5" />
                                    {course.units} وحدات
                                  </span>
                                </div>
                                
                                <div className="flex justify-between items-center mt-3 text-xs">
                                  <div className="flex items-center text-game-accent bg-game-accent/10 px-1.5 py-0.5 rounded">
                                    <Star className="h-2.5 w-2.5 mr-0.5" />
                                    <span className="font-share-tech">+{course.xpReward} XP</span>
                                  </div>
                                  
                                  <Link 
                                    to={`/courses/${course.id}`}
                                    className="px-2 py-1 text-xs rounded-lg bg-game-card-bg-alt text-white hover:bg-game-card-bg"
                                  >
                                    ابدأ الآن
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full animate-fade-in">
                <div className="text-center">
                  <div className="text-5xl mb-3 opacity-30">🔍</div>
                  <p className="text-gray-400 text-sm">لا توجد كورسات متاحة الآن</p>
                </div>
              </div>
            )}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default Courses;
