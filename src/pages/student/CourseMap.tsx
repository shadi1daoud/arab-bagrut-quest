import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trophy, Star, Book, CheckCircle, Clock } from 'lucide-react';
import { PixelButton } from '@/components/ui/pixel-button';
import { PixelBadge } from '@/components/ui/pixel-badge';
import { PixelProgress } from '@/components/ui/pixel-progress';
import { PixelCard } from '@/components/ui/pixel-card';
import CourseMap3D from '@/components/ui/course-map-3d';

// Sample course data
const courseData = {
  id: 'math-101',
  title: 'رياضيات',
  description: 'كورس شامل للرياضيات يغطي جميع المهارات الاساسية',
  icon: '🧮',
  level: 'متوسط',
  progress: 35,
  totalXp: 2500,
  earnedXp: 875,
  nodes: [
    {
      id: 'intro',
      title: 'مقدمة',
      description: 'تعرف على أساسيات الرياضيات وأهميتها',
      unlocked: true,
      completed: true,
      type: 'lesson' as const,
      xp: 50
    },
    {
      id: 'numbers',
      title: 'الأرقام والعمليات',
      description: 'تعلم العمليات الأساسية من جمع وطرح وضرب وقسمة',
      unlocked: true,
      completed: true,
      type: 'lesson' as const,
      xp: 100
    },
    {
      id: 'quiz-1',
      title: 'اختبار قصير',
      description: 'اختبر فهمك للعمليات الأساسية',
      unlocked: true,
      completed: true,
      type: 'quiz' as const,
      xp: 75
    },
    {
      id: 'fractions',
      title: 'الكسور',
      description: 'تعلم الكسور الاعتيادية والعشرية',
      unlocked: true,
      completed: false,
      type: 'lesson' as const,
      xp: 150
    },
    {
      id: 'geometry',
      title: 'الهندسة',
      description: 'أساسيات الأشكال الهندسية وقياساتها',
      unlocked: false,
      completed: false,
      type: 'lesson' as const,
      xp: 200
    },
    {
      id: 'project-1',
      title: 'مشروع تطبيقي',
      description: 'تطبيق المفاهيم السابقة في مشروع عملي',
      unlocked: false,
      completed: false,
      type: 'project' as const,
      xp: 300
    },
    {
      id: 'algebra',
      title: 'الجبر',
      description: 'مقدمة في الجبر والمعادلات',
      unlocked: false,
      completed: false,
      type: 'lesson' as const,
      xp: 250
    },
    {
      id: 'final-challenge',
      title: 'التحدي النهائي',
      description: 'اختبار شامل لجميع المفاهيم في الكورس',
      unlocked: false,
      completed: false,
      type: 'challenge' as const,
      xp: 500
    },
  ],
  achievements: [
    { id: 'speed-math', title: 'سريع الحساب', description: 'أكمل 5 تمارين في أقل من دقيقة', earned: true, icon: '⚡' },
    { id: 'perfect-score', title: 'العلامة الكاملة', description: 'احصل على العلامة الكاملة في اختبار', earned: true, icon: '🏆' },
    { id: 'streak', title: 'مثابر', description: 'ادرس لمدة 5 أيام متتالية', earned: false, icon: '🔥' },
    { id: 'explorer', title: 'مستكشف', description: 'تصفح جميع دروس الكورس', earned: false, icon: '🧭' },
  ]
};

const CourseMap = () => {
  const [activeNodeId, setActiveNodeId] = useState(courseData.nodes[3].id); // Set to the current node
  
  // Calculate progress percentage
  const completedNodes = courseData.nodes.filter(node => node.completed).length;
  const progressPercentage = Math.round((completedNodes / courseData.nodes.length) * 100);
  
  // Calculate XP percentage
  const xpPercentage = Math.round((courseData.earnedXp / courseData.totalXp) * 100);

  return (
    <div className="space-y-8">
      {/* Header with navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/courses">
            <PixelButton variant="secondary" size="sm" className="aspect-square p-1">
              <ArrowLeft className="h-5 w-5" />
            </PixelButton>
          </Link>
          <h1 className="text-2xl font-minecraft text-white">{courseData.title}</h1>
          <PixelBadge variant="info">{courseData.level}</PixelBadge>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
            <span className="text-sm text-gray-400">الإنجاز الكلي</span>
            <div className="flex items-center gap-2">
              <span className="text-orange-500 font-minecraft">{progressPercentage}%</span>
              <CheckCircle className="h-4 w-4 text-orange-500" />
            </div>
          </div>
          
          <PixelButton>
            متابعة الدراسة
          </PixelButton>
        </div>
      </div>
      
      {/* Course progress stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <PixelCard className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-orange-500 border-2 border-orange-700 flex items-center justify-center">
              <Trophy className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-minecraft text-white text-lg">النقاط المكتسبة</h3>
              <div className="flex items-center gap-1">
                <span className="text-orange-500 font-minecraft">{courseData.earnedXp}</span>
                <span className="text-gray-400">/</span>
                <span className="text-gray-400">{courseData.totalXp} XP</span>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <PixelProgress 
              value={xpPercentage} 
              max={100} 
              color="default" 
              height="md" 
              variant="minecraft"
              className="mb-1"
            />
          </div>
        </PixelCard>
        
        <PixelCard className="p-4" variant="stone">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-blue-500 border-2 border-blue-700 flex items-center justify-center">
              <Star className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-minecraft text-white text-lg">الإنجازات</h3>
              <div className="flex items-center gap-1">
                <span className="text-blue-400 font-minecraft">
                  {courseData.achievements.filter(a => a.earned).length}
                </span>
                <span className="text-gray-400">/</span>
                <span className="text-gray-400">{courseData.achievements.length}</span>
              </div>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {courseData.achievements.map(achievement => (
              <div 
                key={achievement.id}
                className={`w-10 h-10 border-2 flex items-center justify-center ${
                  achievement.earned
                    ? 'bg-blue-500 border-blue-700 text-white'
                    : 'bg-gray-700 border-gray-800 text-gray-500'
                }`}
                title={achievement.title}
              >
                <span className="text-lg">{achievement.icon}</span>
              </div>
            ))}
          </div>
        </PixelCard>
        
        <PixelCard className="p-4" variant="wood">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-green-500 border-2 border-green-700 flex items-center justify-center">
              <Book className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-minecraft text-white text-lg">الدروس المكتملة</h3>
              <div className="flex items-center gap-1">
                <span className="text-green-400 font-minecraft">{completedNodes}</span>
                <span className="text-gray-400">/</span>
                <span className="text-gray-400">{courseData.nodes.length}</span>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <PixelProgress 
              value={progressPercentage} 
              max={100} 
              color="success" 
              height="md" 
              variant="minecraft"
              className="mb-1"
            />
            <div className="text-right text-sm text-gray-400 mt-1">
              تبقى {courseData.nodes.length - completedNodes} دروس للإكمال
            </div>
          </div>
        </PixelCard>
      </div>
      
      {/* 3D Course map */}
      <div className="mt-6">
        <CourseMap3D 
          courseName={courseData.title}
          courseIcon={courseData.icon}
          nodes={courseData.nodes}
          currentNodeId={activeNodeId}
          onNodeSelect={setActiveNodeId}
        />
      </div>
      
      {/* Achievements and rewards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <PixelCard className="p-4" variant="obsidian">
          <h3 className="font-minecraft text-xl text-white mb-4">الإنجازات القادمة</h3>
          <div className="space-y-3">
            {courseData.achievements.filter(a => !a.earned).map(achievement => (
              <div key={achievement.id} className="flex items-center gap-3 border-2 border-gray-700 p-3">
                <div className="h-10 w-10 bg-gray-700 border-2 border-gray-800 flex items-center justify-center">
                  <span className="text-lg text-gray-400">{achievement.icon}</span>
                </div>
                <div>
                  <h4 className="font-minecraft text-white">{achievement.title}</h4>
                  <p className="text-sm text-gray-400">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </PixelCard>
        
        <PixelCard className="p-4" variant="dirt">
          <h3 className="font-minecraft text-xl text-white mb-4">معلومات الكورس</h3>
          <p className="text-gray-300 mb-4">{courseData.description}</p>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b border-gray-700 pb-2">
              <span className="text-gray-400">المستوى</span>
              <span className="text-white font-minecraft">{courseData.level}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-700 pb-2">
              <span className="text-gray-400">عدد الدروس</span>
              <span className="text-white font-minecraft">{courseData.nodes.length}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-700 pb-2">
              <span className="text-gray-400">النقاط الإجمالية</span>
              <span className="text-white font-minecraft">{courseData.totalXp} XP</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">الوقت التقديري</span>
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-gray-400 mr-1" />
                <span className="text-white font-minecraft">5 ساعات</span>
              </div>
            </div>
          </div>
        </PixelCard>
      </div>
    </div>
  );
};

export default CourseMap;
