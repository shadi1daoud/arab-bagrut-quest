
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, Play, CheckCircle, BookOpen, Award, AlertTriangle, Clock } from 'lucide-react';
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
  color: 'bg-blue-600',
  xpReward: 1500,
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
          hasQuiz: true
        },
        {
          id: 'l2',
          title: 'المعادلات التربيعية',
          duration: '20 دقيقة',
          isCompleted: true,
          hasQuiz: true
        },
        {
          id: 'l3',
          title: 'المصفوفات',
          duration: '25 دقيقة',
          isCompleted: false,
          hasQuiz: true
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
          hasQuiz: true
        },
        {
          id: 'l5',
          title: 'قواعد الاشتقاق',
          duration: '22 دقيقة',
          isCompleted: false,
          hasQuiz: false
        },
        {
          id: 'l6',
          title: 'تطبيقات المشتقة',
          duration: '30 دقيقة',
          isCompleted: false,
          hasQuiz: true
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
          hasQuiz: false
        },
        {
          id: 'l8',
          title: 'الهندسة التحليلية',
          duration: '25 دقيقة',
          isCompleted: false,
          hasQuiz: true
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
    });
    
    closeVideoModal();
  };

  return (
    <div className="space-y-6">
      {/* Course Header */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link to="/courses" className="text-gray-400 hover:text-white">
            <ArrowRight className="h-5 w-5" />
          </Link>
          
          <div className={`h-12 w-12 ${course.color} rounded-md flex items-center justify-center`}>
            <span className="text-2xl">{course.icon}</span>
          </div>
          
          <div>
            <h1 className="text-2xl font-bold text-white">{course.title}</h1>
            <p className="text-gray-400">{course.grade} • {course.units} وحدات</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="bg-gray-800 px-3 py-1.5 rounded-md flex items-center gap-2 text-sm">
            <Award className="h-4 w-4 text-game-accent" />
            <span className="text-game-accent">+{course.xpReward} XP</span>
          </div>
        </div>
      </div>
      
      {/* Progress Overview */}
      <div className="game-panel">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-white mb-1">نظرة عامة</h2>
            <p className="text-gray-400 text-sm">{course.description}</p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <div className="flex items-center gap-2 text-sm mb-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-gray-400">{completedLessons} من {totalLessons} درس مكتمل</span>
            </div>
            
            <div className="w-full md:w-64 bg-gray-800 h-2 rounded-full overflow-hidden">
              <div className={`${course.color} h-full rounded-full`} style={{ width: `${progressPercentage}%` }}></div>
            </div>
            
            <div className="mt-1 text-xs text-gray-400">
              <span className={course.color.replace('bg-', 'text-')}>{progressPercentage}%</span> مكتمل
            </div>
          </div>
        </div>
      </div>
      
      {/* Course Content */}
      <div className="space-y-6">
        {course.sections.map((section) => (
          <div key={section.id} className="game-panel">
            <h3 className="text-lg font-semibold text-white mb-4">{section.title}</h3>
            
            <div className="space-y-3">
              {section.lessons.map((lesson) => (
                <div 
                  key={lesson.id}
                  className={`p-3 rounded-lg flex items-center gap-3 cursor-pointer transition-colors ${
                    lesson.isCompleted 
                      ? 'bg-gray-800/80 border border-green-600/20' 
                      : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                  onClick={() => openVideoModal(lesson.id)}
                >
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                    lesson.isCompleted ? 'bg-green-600/20 text-green-500' : 'bg-gray-700'
                  }`}>
                    {lesson.isCompleted ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-medium text-white">{lesson.title}</h4>
                      <div className="flex items-center gap-2">
                        {lesson.hasQuiz && (
                          <span className="px-2 py-0.5 bg-blue-600/20 text-blue-400 rounded text-xs">
                            اختبار
                          </span>
                        )}
                        <span className="text-gray-400 text-xs flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {lesson.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* Video Modal */}
      {videoModalOpen && activeLesson && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="max-w-4xl w-full bg-game-card-bg rounded-lg overflow-hidden animate-scale-in">
            <div className="aspect-video bg-black flex items-center justify-center relative">
              <div className="text-white text-center">
                <Play className="h-16 w-16 mx-auto mb-4 text-game-primary animate-pulse" />
                <p className="text-lg">هذا محاكاة لمشغل الفيديو في النسخة التجريبية</p>
                <p className="text-sm text-gray-400 mt-2">في الإصدار النهائي، سيظهر هنا فيديو الدرس</p>
              </div>
              
              <button
                onClick={closeVideoModal}
                className="absolute top-4 left-4 h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            <div className="p-4">
              <h3 className="text-xl font-semibold text-white mb-4">
                {course.sections
                  .flatMap(s => s.lessons)
                  .find(l => l.id === activeLesson)?.title}
              </h3>
              
              <div className="flex justify-between">
                <button
                  onClick={closeVideoModal}
                  className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
                >
                  إغلاق
                </button>
                
                <button
                  onClick={markAsComplete}
                  className="game-btn"
                >
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
