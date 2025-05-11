
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, Filter, ChevronLeft, ChevronRight, BookOpen, Star, Clock, 
  CheckCircle, Activity, Calculator, Languages, Atom, FlaskConical, 
  Microscope, Scroll, GraduationCap, School, Trophy
} from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { 
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Sample courses data with added fields for the new design
const COURSES = [{
  id: 1,
  title: 'رياضيات',
  subject: 'رياضيات',
  grade: 'الثاني عشر',
  units: 5,
  progress: 35,
  icon: <Calculator size={20} color="#FF4800" strokeWidth={2} />,
  color: 'from-blue-600 to-blue-400',
  enrolled: true,
  xpReward: 1500,
  realmImage: "/lovable-uploads/f24ee729-d5df-4160-b98a-a3b6ff99272e.png",
  realmIcon: <Calculator size={40} color="#FFFFFF" strokeWidth={1.5} />,
  realmColor: 'from-blue-700 to-blue-500',
  realmDescription: 'استكشف عالم الرياضيات وحل المعادلات المعقدة'
}, {
  id: 2,
  title: 'إنجليزي',
  subject: 'لغات',
  grade: 'الثاني عشر',
  units: 5,
  progress: 65,
  icon: <Languages size={20} color="#FF4800" strokeWidth={2} />,
  color: 'from-green-600 to-green-400',
  enrolled: true,
  xpReward: 1200,
  realmImage: "/lovable-uploads/1c2c3b5b-f76f-459a-94ed-22d2f3e35da0.png",
  realmIcon: <Languages size={40} color="#FFFFFF" strokeWidth={1.5} />,
  realmColor: 'from-green-700 to-green-500',
  realmDescription: 'تعلم لغات جديدة وتواصل مع العالم'
}, {
  id: 3,
  title: 'فيزياء',
  subject: 'علوم',
  grade: 'الثاني عشر',
  units: 5,
  progress: 0,
  icon: <Atom size={20} color="#FF4800" strokeWidth={2} />,
  color: 'from-purple-600 to-purple-400',
  enrolled: false,
  xpReward: 1800,
  realmImage: "/lovable-uploads/b01a3696-c05d-49eb-b8f2-6b1f7dcbeaab.png",
  realmIcon: <Atom size={40} color="#FFFFFF" strokeWidth={1.5} />,
  realmColor: 'from-purple-700 to-purple-500',
  realmDescription: 'اكتشف أسرار الكون والقوى الطبيعية'
}, {
  id: 4,
  title: 'كيمياء',
  subject: 'علوم',
  grade: 'الثاني عشر',
  units: 5,
  progress: 0,
  icon: <FlaskConical size={20} color="#FF4800" strokeWidth={2} />,
  color: 'from-red-600 to-red-400',
  enrolled: false,
  xpReward: 1650,
  realmImage: "/lovable-uploads/cf18a2e0-832e-4784-8739-89c3d0b07ac8.png",
  realmIcon: <FlaskConical size={40} color="#FFFFFF" strokeWidth={1.5} />,
  realmColor: 'from-red-700 to-red-500',
  realmDescription: 'اخلط العناصر واكتشف التفاعلات الكيميائية'
}, {
  id: 5,
  title: 'أحياء',
  subject: 'علوم',
  grade: 'الثاني عشر',
  units: 5,
  progress: 0,
  icon: <Microscope size={20} color="#FF4800" strokeWidth={2} />,
  color: 'from-teal-600 to-teal-400',
  enrolled: false,
  xpReward: 1400,
  realmImage: "/lovable-uploads/883e84cb-3765-41fc-acde-905616ee0377.png",
  realmIcon: <Microscope size={40} color="#FFFFFF" strokeWidth={1.5} />,
  realmColor: 'from-teal-700 to-teal-500',
  realmDescription: 'استكشف الكائنات الحية والأنظمة البيولوجية'
}, {
  id: 6,
  title: 'تاريخ',
  subject: 'إنسانيات',
  grade: 'الثاني عشر',
  units: 3,
  progress: 0,
  icon: <Scroll size={20} color="#FF4800" strokeWidth={2} />,
  color: 'from-yellow-600 to-yellow-400',
  enrolled: false,
  xpReward: 1100,
  realmImage: "/lovable-uploads/7d6a3b3b-a0be-4ec3-8796-51da0a277b60.png",
  realmIcon: <Scroll size={40} color="#FFFFFF" strokeWidth={1.5} />,
  realmColor: 'from-yellow-700 to-yellow-500',
  realmDescription: 'سافر عبر الزمن واستكشف التاريخ البشري'
}];

// Special offers data for the Time-Limited section
const TIME_LIMITED_OFFERS = [
  {
    id: 101,
    title: 'دورة البرمجة للمبتدئين',
    discount: 50,
    originalPrice: 199,
    currentPrice: 99,
    expiresIn: 172800, // 48 hours in seconds
    image: "/lovable-uploads/f848c528-dd58-411a-8aa1-e90bfdb6a8c6.png",
    color: 'from-blue-800 to-indigo-600',
  },
  {
    id: 102,
    title: 'أساسيات علم البيانات',
    discount: 40,
    originalPrice: 249,
    currentPrice: 149,
    expiresIn: 86400, // 24 hours in seconds
    image: "/lovable-uploads/58c2f9f8-a86e-458c-86b3-590e2530f8df.png",
    color: 'from-green-800 to-emerald-600',
  },
  {
    id: 103,
    title: 'تحليل الأعمال المتقدم',
    discount: 35,
    originalPrice: 299,
    currentPrice: 199,
    expiresIn: 129600, // 36 hours in seconds
    image: "/lovable-uploads/fb2240e4-c664-43fd-896d-20f9cac3ca33.png",
    color: 'from-purple-800 to-violet-600',
  }
];

// Helper function to format time (HH:MM:SS)
const formatTime = (seconds: number): string => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  return [
    hrs.toString().padStart(2, '0'),
    mins.toString().padStart(2, '0'),
    secs.toString().padStart(2, '0')
  ].join(':');
};

// Define a type for realm structure
interface Realm {
  name: string;
  color: string;
  icon: React.ReactNode;
  description: string;
  image: string;
  courses: typeof COURSES;
}

// Group courses by subject for realms
const getCoursesBySubject = (): Realm[] => {
  const subjects: Record<string, Realm> = {};
  COURSES.forEach(course => {
    if (!subjects[course.subject]) {
      subjects[course.subject] = {
        name: course.subject,
        color: course.realmColor,
        icon: course.realmIcon,
        description: course.realmDescription,
        image: course.realmImage,
        courses: []
      };
    }
    subjects[course.subject].courses.push(course);
  });
  return Object.values(subjects);
};

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [hoverCourse, setHoverCourse] = useState<number | null>(null);
  const [hoverRealm, setHoverRealm] = useState<string | null>(null);
  const [timers, setTimers] = useState(
    TIME_LIMITED_OFFERS.map(offer => formatTime(offer.expiresIn))
  );
  
  const enrolledCourses = COURSES.filter(course => course.enrolled);
  const realms = getCoursesBySubject();

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };
  
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };
  
  const floatVariants: Variants = {
    initial: { y: 0 },
    hover: { 
      y: -10,
      transition: { duration: 1, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }
    }
  };
  
  // Simulate countdown effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimers(prev => 
        prev.map((time, i) => {
          const [h, m, s] = time.split(':').map(Number);
          let total = h * 3600 + m * 60 + s - 1;
          if (total < 0) total = 0;
          return formatTime(total);
        })
      );
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="space-y-10 pb-10">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white font-changa bg-gradient-to-r from-game-primary to-game-accent bg-clip-text text-transparent">
            خارطة المعرفة 🗺️
          </h1>
          <p className="text-gray-400 text-sm">
            استكشف العوالم التعليمية المختلفة وابدأ رحلتك
          </p>
        </div>
        
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
              onChange={e => setSearchTerm(e.target.value)} 
            />
          </div>
        </div>
      </div>
      
      {/* Section 1: My Courses */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="text-game-primary h-5 w-5" strokeWidth={2} />
          <h2 className="text-xl font-bold text-white">📘 كورساتي</h2>
          <span className="text-xs px-2 py-0.5 bg-game-primary/20 text-game-primary rounded-full">
            {enrolledCourses.length} كورس
          </span>
        </div>
        
        {enrolledCourses.length > 0 ? (
          <Carousel 
            opts={{ align: "start", loop: true }} 
            className="w-full"
          >
            <CarouselContent>
              {enrolledCourses.map((course) => (
                <CarouselItem key={course.id} className="md:basis-1/2 lg:basis-1/3">
                  <motion.div 
                    className="h-full"
                    variants={itemVariants}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <Card className="border-gray-800 h-full flex flex-col overflow-hidden">
                      <CardHeader className={`bg-gradient-to-br ${course.color} p-4 relative`}>
                        <div className="absolute top-2 right-2 px-2 py-1 bg-black/30 rounded-full text-xs flex items-center gap-1 backdrop-blur-sm">
                          <CheckCircle className="h-3 w-3" color="#FFFFFF" />
                          <span className="text-white">مسجل</span>
                        </div>
                        
                        <div className="h-12 w-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                          {course.icon}
                        </div>
                        
                        <CardTitle className="mt-2 text-white">{course.title}</CardTitle>
                        <CardDescription className="text-white/70">{course.grade} • {course.subject}</CardDescription>
                      </CardHeader>
                      
                      <CardContent className="flex-1 p-4">
                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                          <span className="flex items-center">
                            <BookOpen className="h-3 w-3 mr-1" /> {course.units} وحدات
                          </span>
                          <span>{course.progress}% مكتمل</span>
                        </div>
                        
                        {/* Progress bar with animation */}
                        <div className="w-full bg-game-card-bg-alt h-2 rounded-full overflow-hidden mb-4">
                          <div 
                            className={`bg-gradient-to-r from-game-primary to-game-accent h-full rounded-full animate-pulse-glow relative`} 
                            style={{ width: `${course.progress}%` }}
                          >
                            <div className="absolute inset-0 bg-white opacity-30 animate-progress-shimmer"></div>
                          </div>
                        </div>
                      </CardContent>
                      
                      <CardFooter className="p-3">
                        <Link 
                          to={`/courses/${course.id}`}
                          className="w-full"
                        >
                          <Button 
                            variant="default" 
                            className="w-full gap-1 font-medium text-sm"
                            size="sm"
                          >
                            تابع التعلم
                            <ChevronLeft className="h-4 w-4" />
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:flex">
              <CarouselPrevious className="-left-4 bg-gray-900/50 hover:bg-gray-900/80 border-gray-800" />
              <CarouselNext className="-right-4 bg-gray-900/50 hover:bg-gray-900/80 border-gray-800" />
            </div>
          </Carousel>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 bg-game-card-bg rounded-xl border border-gray-800">
            <div className="flex justify-center mb-4">
              <School size={48} className="text-gray-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-400 mb-2">لم تسجل في أي كورس بعد</h3>
            <p className="text-gray-500 text-sm mb-6">اكتشف الكورسات المتاحة أدناه للبدء</p>
            <Button variant="default">استعرض الكورسات</Button>
          </div>
        )}
      </section>
      
      {/* Section 2: Time-Limited Courses */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Clock className="text-game-primary h-5 w-5" strokeWidth={2} />
          <h2 className="text-xl font-bold text-white">🔥 كورسات محدودة</h2>
          <span className="text-xs px-2 py-0.5 bg-game-primary/20 text-game-primary rounded-full">عروض خاصة</span>
        </div>
        
        <Carousel opts={{ align: "start" }} className="w-full">
          <CarouselContent>
            {TIME_LIMITED_OFFERS.map((offer, index) => (
              <CarouselItem key={offer.id} className="md:basis-1/2 lg:basis-1/3">
                <motion.div 
                  className="h-full"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                >
                  <Card className="border-gray-800 animate-border-glow border-[#FF4800]/20 h-full flex flex-col overflow-hidden">
                    <div className={`bg-gradient-to-br ${offer.color} aspect-[16/9] relative overflow-hidden`}>
                      {offer.image && <img 
                        src={offer.image} 
                        alt={offer.title} 
                        className="w-full h-full object-cover mix-blend-overlay opacity-60"
                      />}
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                      
                      {/* Discount badge */}
                      <div className="absolute top-3 right-3 bg-game-primary text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                        {offer.discount}% خصم
                      </div>
                      
                      {/* Timer */}
                      <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-lg flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-game-primary animate-pulse" />
                        <span className="font-share-tech text-sm">{timers[index]}</span>
                      </div>
                    </div>
                    
                    <CardContent className="flex-1 p-4">
                      <CardTitle className="mb-2 text-lg">{offer.title}</CardTitle>
                      
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-game-primary font-bold text-xl">{offer.currentPrice} د.ك</span>
                        <span className="text-gray-400 text-sm line-through">{offer.originalPrice} د.ك</span>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="p-3">
                      <Button 
                        variant="default" 
                        className="w-full gap-1"
                      >
                        <Trophy className="h-4 w-4 mr-1" />
                        احصل عليه الآن
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:flex">
            <CarouselPrevious className="-left-4 bg-gray-900/50 hover:bg-gray-900/80 border-gray-800" />
            <CarouselNext className="-right-4 bg-gray-900/50 hover:bg-gray-900/80 border-gray-800" />
          </div>
        </Carousel>
      </section>
      
      {/* Section 3: Knowledge Realms */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <GraduationCap className="text-game-primary h-5 w-5" strokeWidth={2} />
          <h2 className="text-xl font-bold text-white">🌍 عوالم المعرفة</h2>
          <span className="text-xs px-2 py-0.5 bg-game-primary/20 text-game-primary rounded-full">
            اكتشف وتعلم
          </span>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {realms.map((realm) => (
            <motion.div 
              key={realm.name}
              className="relative"
              variants={itemVariants}
              initial="initial"
              whileHover="hover"
              onMouseEnter={() => setHoverRealm(realm.name)}
              onMouseLeave={() => setHoverRealm(null)}
            >
              <motion.div 
                variants={floatVariants}
                className="h-full"
              >
                <Card className="border-gray-800 overflow-hidden h-full">
                  {/* Realm Header */}
                  <div className={`relative bg-gradient-to-r ${realm.color} h-32 overflow-hidden`}>
                    {realm.image && (
                      <img 
                        src={realm.image} 
                        alt={realm.name} 
                        className="w-full h-full object-cover opacity-40" 
                      />
                    )}
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
                    
                    <div className="absolute bottom-0 left-0 w-full p-4 flex items-end justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-white">{realm.name}</h3>
                        <p className="text-white/80 text-sm">{realm.description}</p>
                      </div>
                      
                      <div className="flex items-center justify-center h-16 w-16">
                        {realm.icon}
                      </div>
                    </div>
                  </div>
                  
                  {/* Realm Courses */}
                  <div className="p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <h4 className="text-sm text-gray-400">الكورسات المتاحة</h4>
                      <span className="text-xs px-2 py-0.5 bg-gray-800 text-gray-400 rounded-full">
                        {realm.courses.length}
                      </span>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      {realm.courses.map((course) => (
                        <div 
                          key={course.id} 
                          className="flex items-center gap-2 p-2 rounded-lg bg-game-card-bg-alt hover:bg-game-card-bg-hover transition-colors"
                        >
                          <div className={`h-8 w-8 rounded-md bg-gradient-to-br ${course.color} flex items-center justify-center`}>
                            {course.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h5 className="text-white text-sm font-medium truncate">{course.title}</h5>
                            <p className="text-gray-400 text-xs">{course.grade}</p>
                          </div>
                          <div className="flex items-center text-xs font-share-tech text-game-accent">
                            <Star className="h-3 w-3 mr-0.5" />
                            {course.xpReward} XP
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="w-full gap-2"
                    >
                      ادخل العالم
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
              
              {/* Floating particles effect */}
              {hoverRealm === realm.name && (
                <>
                  <motion.div
                    className="absolute top-10 right-5 h-2 w-2 rounded-full bg-game-primary opacity-70"
                    animate={{
                      y: [-10, 10],
                      x: [-5, 5],
                      opacity: [0.3, 0.7, 0.3]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                  <motion.div
                    className="absolute bottom-20 left-10 h-3 w-3 rounded-full bg-game-accent opacity-60"
                    animate={{
                      y: [5, -15],
                      x: [8, -3],
                      opacity: [0.2, 0.6, 0.2]
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                  <motion.div
                    className="absolute top-1/2 right-10 h-1.5 w-1.5 rounded-full bg-white opacity-50"
                    animate={{
                      y: [-8, 12],
                      x: [5, -10],
                      opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                </>
              )}
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default Courses;
