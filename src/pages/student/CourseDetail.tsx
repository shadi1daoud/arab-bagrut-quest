import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { AnimatePresence } from 'framer-motion';

// Import custom components
import CourseHeader from '@/components/course/CourseHeader';
import UnitsList from '@/components/course/UnitsList';
import VideoPlayer from '@/components/course/VideoPlayer';
import ContentTabs from '@/components/course/ContentTabs';
import ActionPanel from '@/components/course/ActionPanel';
import CourseFooter from '@/components/course/CourseFooter';
import MiniQuiz from '@/components/course/MiniQuiz';
import AskAiModal from '@/components/course/AskAiModal';
import { useIsMobile } from '@/hooks/use-mobile';

// Import types
import type { Unit, QuizQuestion } from '@/types/course';

// Sample course data
const COURSE_DATA = {
  id: '1',
  title: 'رياضيات',
  subject: 'رياضيات',
  grade: 'الثاني عشر',
  description: 'كورس شامل للرياضيات للصف الثاني عشر يغطي جميع مواضيع البجروت بشكل مفصل وتفاعلي.',
  progress: 35,
  totalXP: 1500,
  totalUnits: 24,
  units: [
    {
      id: 'unit1',
      number: 1,
      title: 'مقدمة في الجبر',
      status: 'completed' as const,
      duration: '18 دقيقة',
      hasStreak: true,
      videoSrc: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
      chapters: [
        { time: 15, title: 'تعريف المصفوفات' },
        { time: 45, title: 'جمع المصفوفات' },
        { time: 72, title: 'ضرب المصفوفات' },
      ],
      pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      notes: 'ملاحظات حول الدرس الأول...',
      faqs: [
        {
          question: 'ما هي المصفوفة؟',
          answer: 'المصفوفة هي مجموعة من الأعداد أو الرموز مرتبة في صفوف وأعمدة.',
          timestamps: [
            { time: 15, label: 'تعريف المصفوفة (0:15)' }
          ]
        },
        {
          question: 'كيف نضرب مصفوفتين؟',
          answer: 'لضرب مصفوفتين، يجب أن يكون عدد أعمدة المصفوفة الأولى مساويًا لعدد صفوف المصفوفة الثانية.',
          timestamps: [
            { time: 72, label: 'شرح الضرب (1:12)' }
          ]
        },
      ],
    },
    {
      id: 'unit2',
      number: 2,
      title: 'المعادلات التربيعية',
      status: 'in-progress' as const,
      duration: '22 دقيقة',
      videoSrc: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
      chapters: [
        { time: 20, title: 'القانون العام' },
        { time: 60, title: 'طرق الحل' },
        { time: 90, title: 'تطبيقات' },
      ],
      pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      notes: '',
      faqs: [
        {
          question: 'ما هو القانون العام لحل المعادلة التربيعية؟',
          answer: 'القانون العام هو x = [-b ± √(b² - 4ac)] / 2a حيث المعادلة على الشكل ax² + bx + c = 0',
          timestamps: [
            { time: 20, label: 'القانون العام (0:20)' }
          ]
        },
      ],
    },
    {
      id: 'unit3',
      number: 3,
      title: 'حساب المثلثات',
      status: 'idle' as const,
      duration: '25 دقيقة',
      videoSrc: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
      chapters: [
        { time: 30, title: 'الدوال المثلثية' },
        { time: 75, title: 'تطبيقات' },
      ],
      notes: '',
      faqs: [],
    },
    {
      id: 'unit4',
      number: 4,
      title: 'التفاضل والتكامل',
      status: 'idle' as const,
      duration: '30 دقيقة',
      videoSrc: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
      chapters: [],
      notes: '',
      faqs: [],
    },
    {
      id: 'unit5',
      number: 5,
      title: 'الوحدات المركبة',
      status: 'idle' as const,
      duration: '20 دقيقة',
      videoSrc: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
      chapters: [],
      notes: '',
      faqs: [],
    }
  ] as Unit[]
};

// Sample quiz questions
const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'ما هو الناتج من ضرب المصفوفة [1, 2; 3, 4] في المصفوفة [0, 1; 1, 0]؟',
    options: ['[1, 2; 3, 4]', '[2, 1; 4, 3]', '[1, 0; 0, 1]', '[0, 0; 0, 0]'],
    correctAnswer: 1,
    type: 'multiple-choice'
  },
  {
    id: 'q2',
    question: 'المصفوفة الوحدة هي مصفوفة مربعة تكون فيها جميع القيم الموجودة على القطر الرئيسي تساوي 1، وباقي القيم تساوي 0.',
    options: ['صحيح', 'خطأ'],
    correctAnswer: 0,
    type: 'true-false'
  },
  {
    id: 'q3',
    question: 'أي من الآتي يمثل حلاً للمعادلة التربيعية x² - 5x + 6 = 0؟',
    options: ['x = 2, x = 3', 'x = -2, x = -3', 'x = 2, x = -3', 'x = -2, x = 3'],
    correctAnswer: 0,
    type: 'multiple-choice'
  },
  {
    id: 'q4',
    question: 'لإيجاد مشتقة الدالة f(x) = x³، نستخدم قاعدة القوة ونحصل على f\'(x) = 3x².',
    options: ['صحيح', 'خطأ'],
    correctAnswer: 0,
    type: 'true-false'
  },
  {
    id: 'q5',
    question: 'ما هي قيمة جا(90°)؟',
    options: ['0', '1', '-1', 'غير معرفة'],
    correctAnswer: 1,
    type: 'multiple-choice'
  }
];

// Sample leaderboard
const LEADERBOARD = [
  { id: 'user1', name: 'أحمد محمد', avatar: '/lovable-uploads/48f9c971-a223-40f4-9e8b-17c399b6f387.png', xp: 2450 },
  { id: 'user2', name: 'سارة أحمد', avatar: '/lovable-uploads/48f9c971-a223-40f4-9e8b-17c399b6f387.png', xp: 2100 },
  { id: 'user3', name: 'محمود علي', avatar: '/lovable-uploads/48f9c971-a223-40f4-9e8b-17c399b6f387.png', xp: 1950 },
  { id: 'currentUser', name: 'أنت', avatar: '/lovable-uploads/48f9c971-a223-40f4-9e8b-17c399b6f387.png', xp: 1800 }
];

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [currentUnitId, setCurrentUnitId] = useState<string>('unit1');
  const [showMiniQuiz, setShowMiniQuiz] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);
  const [notes, setNotes] = useState<Record<string, string>>({});
  // Always keep sidebars open
  const [sidebarOpen] = useState(true);
  const [actionPanelOpen] = useState(true);
  const isMobile = useIsMobile();
  const videoRef = useRef<HTMLDivElement>(null);
  
  // Find current course data (for this example we'll use the sample data)
  const course = COURSE_DATA;
  
  // Find the current unit
  const currentUnit = course.units.find(unit => unit.id === currentUnitId) || course.units[0];
  const currentUnitIndex = course.units.findIndex(unit => unit.id === currentUnitId);
  
  // Mobile behavior can still collapse sidebars if needed
  useEffect(() => {
    // No auto collapse on mobile now
  }, [isMobile]);
  
  // Keyboard shortcuts - removing sidebar toggle shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in text fields
      const activeElement = document.activeElement;
      const isInputActive = activeElement instanceof HTMLInputElement || 
                           activeElement instanceof HTMLTextAreaElement;
      if (isInputActive) return;
      
      switch(e.key.toLowerCase()) {
        case 'n':
          // Next unit
          if (currentUnitIndex < course.units.length - 1) {
            setCurrentUnitId(course.units[currentUnitIndex + 1].id);
          }
          break;
        case 'p':
          // Previous unit
          if (currentUnitIndex > 0) {
            setCurrentUnitId(course.units[currentUnitIndex - 1].id);
          }
          break;
        case 'q':
          // Open quiz
          setShowMiniQuiz(true);
          break;
        // Removed 's' and 'a' shortcuts for toggling sidebars
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentUnitIndex, course.units]);
  
  const handleVideoEnd = () => {
    setShowMiniQuiz(true);
  };
  
  const handleUnitChange = (unitId: string) => {
    setCurrentUnitId(unitId);
    // Scroll to top of video when changing units
    if (videoRef.current) {
      videoRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    // No auto-close on mobile anymore
  };
  
  const handlePrevUnit = () => {
    if (currentUnitIndex > 0) {
      setCurrentUnitId(course.units[currentUnitIndex - 1].id);
    }
  };
  
  const handleNextUnit = () => {
    if (currentUnitIndex < course.units.length - 1) {
      setCurrentUnitId(course.units[currentUnitIndex + 1].id);
    }
  };
  
  const handleQuizComplete = (score: number) => {
    // Update XP based on score
    if (score === QUIZ_QUESTIONS.length) {
      toast({
        title: "مبروك!",
        description: "لقد أكملت الاختبار بنجاح وحصلت على +80 XP إضافي!",
      });
    }
  };
  
  const handleNotesChange = (newNotes: string) => {
    setNotes(prev => ({
      ...prev,
      [currentUnitId]: newNotes
    }));
  };
  
  const handleJumpToTimestamp = (time: number) => {
    const videoElement = document.querySelector('video');
    if (videoElement) {
      videoElement.currentTime = time;
      videoElement.play();
    }
  };
  
  // Handle course completion
  const handleCourseComplete = () => {
    toast({
      title: "مبروك!",
      description: `لقد أكملت كورس ${course.title} بنجاح وحصلت على ${course.totalXP} XP!`,
      variant: "default",
    });
  };

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };
  
  const toggleActionPanel = () => {
    setActionPanelOpen(prev => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col relative bg-gradient-to-b from-[#0E0E0E] to-[#121212]">
      {/* Course header */}
      <CourseHeader 
        courseTitle={course.title}
        totalXP={course.totalXP}
        progress={course.progress}
        courseId={id || '1'}
        onToggleSidebar={() => {}} // Empty function as we don't toggle anymore
      />
      
      {/* Main content - using flex layout with proper overflow handling */}
      <div className="flex flex-1 overflow-hidden pt-[88px] pb-16">
        {/* Left sidebar - Units list */}
        <UnitsList 
          units={course.units}
          currentUnitId={currentUnitId}
          onSelectUnit={handleUnitChange}
          isOpen={sidebarOpen}
          onToggle={() => {}} // Empty function as we don't toggle anymore
        />
        
        {/* Main content area with proper scrolling */}
        <main className="flex-1 relative overflow-y-auto scrollbar-none">
          <div className="container max-w-[1200px] mx-auto px-4 py-6">
            <div className="grid grid-cols-1 gap-6">
              {/* Video player */}
              <div ref={videoRef}>
                <VideoPlayer 
                  videoSrc={currentUnit.videoSrc || ''}
                  chapters={currentUnit.chapters || []}
                  poster="/lovable-uploads/1c2c3b5b-f76f-459a-94ed-22d2f3e35da0.png"
                  onVideoEnd={handleVideoEnd}
                />
              </div>
              
              {/* Content tabs */}
              <div>
                <ContentTabs 
                  pdfUrl={currentUnit.pdfUrl}
                  faqs={currentUnit.faqs || []}
                  notes={notes[currentUnitId] || currentUnit.notes || ''}
                  onNotesChange={handleNotesChange}
                  onJumpToTimestamp={handleJumpToTimestamp}
                />
              </div>
            </div>
          </div>
        </main>
        
        {/* Right action panel */}
        <ActionPanel 
          onQuizClick={() => setShowMiniQuiz(true)}
          onAskAiClick={() => setShowAiModal(true)}
          leaderboard={LEADERBOARD}
          currentUser={LEADERBOARD[3]}
          isOpen={actionPanelOpen}
          onToggle={() => {}} // Empty function as we don't toggle anymore
        />
      </div>
      
      {/* Footer */}
      <CourseFooter 
        currentUnit={currentUnitIndex + 1}
        totalUnits={course.units.length}
        onPrevUnit={handlePrevUnit}
        onNextUnit={handleNextUnit}
        isLastUnit={currentUnitIndex === course.units.length - 1}
        onComplete={handleCourseComplete}
        isUnitCompleted={currentUnit.status === 'completed'}
      />
      
      {/* Modals */}
      <AnimatePresence>
        {showMiniQuiz && (
          <MiniQuiz 
            questions={QUIZ_QUESTIONS}
            onClose={() => setShowMiniQuiz(false)}
            onComplete={handleQuizComplete}
          />
        )}
        
        {showAiModal && (
          <AskAiModal onClose={() => setShowAiModal(false)} />
        )}
      </AnimatePresence>
      
      {/* Add a grain overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')] opacity-20"></div>
    </div>
  );
};

export default CourseDetail;
