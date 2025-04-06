
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, Play, CheckCircle, BookOpen, Award, AlertTriangle, Clock, Star, Users } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

// Sample course data
const COURSE_DATA = {
  id: '1',
  title: 'رياضيات',
  subject: 'رياضيات',
  grade: 'الثاني عشر',
  units: 5,
  description: 'كورس شامل للرياضيات للصف الثاني عشر يغطي جميع مواضيع البجروت بشكل مفصل وتفاعلي.',
  progress: 35,
  icon: '🧮',
  color: 'from-blue-600 to-blue-400',
  xpReward: 1500,
  studentsCount: 256,
  difficulty: 'متوسط',
  instructor: 'د. أحمد محمود',
  sections: [
    {
      id: 's1',
      title: 'الجبر',
      lessons: [
        {
          id: 'l1',
          title: 'المعادلات الخطية',
          duration: '15 دقيقة',
          isCompleted: true,
          hasQuiz: true,
          xpReward: 50
        },
        {
          id: 'l2',
          title: 'المعادلات التربيعية',
          duration: '20 دقيقة',
          isCompleted: true,
          hasQuiz: true,
          xpReward: 75
        },
        {
          id: 'l3',
          title: 'المصفوفات',
          duration: '25 دقيقة',
          isCompleted: false,
          hasQuiz: true,
          xpReward: 100
        }
      ]
    },
    {
      id: 's2',
      title: 'حساب التفاضل والتكامل',
      lessons: [
        {
          id: 'l4',
          title: 'مفهوم المشتقة',
          duration: '18 دقيقة',
          isCompleted: false,
          hasQuiz: true,
          xpReward: 80
        },
        {
          id: 'l5',
          title: 'قواعد الاشتقاق',
          duration: '22 دقيقة',
          isCompleted: false,
          hasQuiz: false,
          xpReward: 90
        },
        {
          id: 'l6',
          title: 'تطبيقات المشتقة',
          duration: '30 دقيقة',
          isCompleted: false,
          hasQuiz: true,
          xpReward: 120
        }
      ]
    },
    {
      id: 's3',
      title: 'الهندسة',
      lessons: [
        {
          id: 'l7',
          title: 'الهندسة الإقليدية',
          duration: '20 دقيقة',
          isCompleted: false,
          hasQuiz: false,
          xpReward: 85
        },
        {
          id: 'l8',
          title: 'الهندسة التحليلية',
          duration: '25 دقيقة',
          isCompleted: false,
          hasQuiz: true,
          xpReward: 95
        }
      ]
    }
  ]
};

// Calculate completed lessons
const calculateProgress = (course: typeof COURSE_DATA) => {
  let totalLessons = 0;
  let completedLessons = 0;

  course.sections.forEach(section => {
    totalLessons += section.lessons.length;
    completedLessons += section.lessons.filter(lesson => lesson.isCompleted).length;
  });

  return {
    totalLessons,
    completedLessons,
    progressPercentage: Math.round((completedLessons / totalLessons) * 100)
  };
};

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [activeLesson, setActiveLesson] = useState<string | null>(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>('s1'); // Default to first section
  const { toast } = useToast();
  
  // For this MVP, we'll use the sample course data
  const course = COURSE_DATA;
  
  const { totalLessons, completedLessons, progressPercentage } = calculateProgress(course);
  
  const openVideoModal = (lessonId: string) => {
    setActiveLesson(lessonId);
    setVideoModalOpen(true);
  };
  
  const closeVideoModal = () => {
    setVideoModalOpen(false);
  };
  
  const markAsComplete = () => {
    toast({
      title: "تم الإكمال بنجاح!",
      description: "تم إكمال الدرس بنجاح وإضافة النقاط إلى حسابك",
      variant: "default",
    });
    
    closeVideoModal();
  };
  
  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Course Header */}
      <div className="flex flex-col md:flex-row justify-between gap-4 relative">
        <div className="flex items-center gap-3">
          <Link to="/courses" className="text-gray-400 hover:text-white bg-game-card-bg-alt hover:bg-game-card-bg p-2.5 rounded-full transition-colors">
            <ArrowRight className="h-5 w-5" />
          </Link>
          
          <div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center shadow-lg shadow-blue-600/20 overflow-hidden`}>
            <span className="text-3xl">{course.icon}</span>
          </div>
          
          <div>
            <h1 className="text-2xl font-bold text-white font-changa bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">{course.title}</h1>
            <p className="text-gray-400">{course.grade} • {course.units} وحدات</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="bg-game-card-bg px-3 py-2 rounded-xl flex items-center gap-2 text-sm border border-white/5">
            <Star className="h-4 w-4 text-game-accent" />
            <span className="text-game-accent font-share-tech">+{course.xpReward} XP</span>
          </div>
          
          <div className="bg-game-card-bg px-3 py-2 rounded-xl flex items-center gap-2 text-sm border border-white/5">
            <Users className="h-4 w-4 text-gray-400" />
            <span className="text-white font-share-tech">{course.studentsCount}</span>
            <span className="text-gray-400">طالب</span>
          </div>
        </div>
      </div>
      
      {/* Progress Overview */}
      <div className="game-panel relative overflow-hidden hover:shadow-lg hover:shadow-blue-600/10 transition-all">
        <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
        
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div className="md:w-2/3">
            <h2 className="text-lg font-semibold text-white mb-1 font-lexend">نظرة عامة</h2>
            <p className="text-gray-400 text-sm">{course.description}</p>
            
            <div className="mt-4 flex flex-wrap gap-3">
              <div className="bg-game-card-bg-alt px-3 py-1.5 rounded-lg text-sm flex items-center gap-2 border border-white/5">
                <BookOpen className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300">المدرّس: {course.instructor}</span>
              </div>
              
              <div className="bg-game-card-bg-alt px-3 py-1.5 rounded-lg text-sm flex items-center gap-2 border border-white/5">
                <AlertTriangle className="h-4 w-4 text-yellow-400" />
                <span className="text-gray-300">الصعوبة: {course.difficulty}</span>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/3 flex flex-col items-center justify-center bg-game-card-bg-alt p-4 rounded-xl border border-white/5">
            <div className="flex items-center gap-2 text-sm mb-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-white font-share-tech">{completedLessons} / {totalLessons}</span>
              <span className="text-gray-400">درس مكتمل</span>
            </div>
            
            <div className="w-full bg-game-background h-3 rounded-full overflow-hidden">
              <div 
                className={`bg-gradient-to-r ${course.color} h-full rounded-full relative`} 
                style={{ width: `${progressPercentage}%` }}
              >
                <div className="absolute inset-0 bg-white opacity-10 animate-pulse"></div>
              </div>
            </div>
            
            <div className="mt-2 text-xs text-gray-400">
              <span className="text-blue-400 font-share-tech">{progressPercentage}%</span> مكتمل
            </div>
          </div>
        </div>
      </div>
      
      {/* Course Content */}
      <div className="space-y-4">
        {course.sections.map((section) => (
          <div key={section.id} className="game-panel hover:border-blue-500/30 transition-all">
            {/* Section Header */}
            <div 
              className={`flex justify-between items-center cursor-pointer ${expandedSection === section.id ? 'mb-4' : ''}`}
              onClick={() => toggleSection(section.id)}
            >
              <h3 className="text-lg font-semibold text-white font-lexend">{section.title}</h3>
              <div className={`h-8 w-8 rounded-full bg-game-card-bg-alt flex items-center justify-center transition-transform ${expandedSection === section.id ? 'rotate-180' : ''}`}>
                <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            
            {/* Section Content - Conditionally rendered based on expanded state */}
            {expandedSection === section.id && (
              <div className="space-y-2 animate-accordion-down">
                {section.lessons.map((lesson) => (
                  <div 
                    key={lesson.id}
                    className={`p-3 rounded-lg flex items-center gap-3 cursor-pointer transition-all ${
                      lesson.isCompleted 
                        ? 'bg-green-500/10 border border-green-500/20' 
                        : 'bg-game-card-bg-alt hover:bg-gray-700/50'
                    }`}
                    onClick={() => openVideoModal(lesson.id)}
                  >
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      lesson.isCompleted ? 'bg-green-500/20 text-green-500' : 'bg-game-card-bg text-white'
                    }`}>
                      {lesson.isCompleted ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <Play className="h-5 w-5" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-medium text-white">{lesson.title}</h4>
                        <div className="flex items-center gap-2">
                          {lesson.hasQuiz && (
                            <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded-md text-xs border border-blue-500/20">
                              اختبار
                            </span>
                          )}
                          <span className="text-gray-400 text-xs flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {lesson.duration}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center mt-1">
                        <div className="text-xs text-gray-400">
                          {lesson.isCompleted ? 'تم الإكمال' : 'غير مكتمل'}
                        </div>
                        <div className="text-xs text-game-accent bg-game-accent/10 px-2 py-0.5 rounded-md">
                          <span className="font-share-tech">+{lesson.xpReward} XP</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Video Modal */}
      {videoModalOpen && activeLesson && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="max-w-4xl w-full bg-game-card-bg rounded-2xl overflow-hidden border border-white/10 shadow-2xl animate-scale-in">
            <div className="aspect-video bg-black flex items-center justify-center relative">
              <div className="absolute inset-0 cyber-grid opacity-10"></div>
              
              <div className="text-white text-center z-10">
                <Play className="h-16 w-16 mx-auto mb-4 text-game-primary animate-pulse-glow" />
                <p className="text-xl font-bold font-changa">هذا محاكاة لمشغل الفيديو</p>
                <p className="text-sm text-gray-400 mt-2 font-lexend">في الإصدار النهائي، سيظهر هنا فيديو الدرس</p>
              </div>
              
              <button
                onClick={closeVideoModal}
                className="absolute top-4 left-4 h-10 w-10 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white backdrop-blur-sm transition-colors"
                aria-label="إغلاق"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white mb-4 font-lexend">
                {course.sections
                  .flatMap(s => s.lessons)
                  .find(l => l.id === activeLesson)?.title}
              </h3>
              
              <div className="flex justify-between">
                <button
                  onClick={closeVideoModal}
                  className="px-5 py-2.5 bg-game-card-bg-alt text-white rounded-lg hover:bg-gray-700 transition-colors border border-white/5"
                >
                  إغلاق
                </button>
                
                <button
                  onClick={markAsComplete}
                  className="px-5 py-2.5 bg-gradient-to-r from-game-primary to-game-primary/70 text-white rounded-lg hover:shadow-lg hover:shadow-game-primary/20 transition-all flex items-center gap-2"
                >
                  <CheckCircle className="h-5 w-5" />
                  إكمال الدرس
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;
