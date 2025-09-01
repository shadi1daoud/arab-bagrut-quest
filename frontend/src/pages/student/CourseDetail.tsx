import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Clock, BookOpen, Star, Users, CheckCircle, Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { 
  getCourseById, 
  getUnitsByCourseId, 
  getUserCourseProgress,
  Course as FirebaseCourse,
  Unit as FirebaseUnit,
  UserCourse
} from '@/lib/firebaseUtils';

const CourseDetail = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [course, setCourse] = useState<FirebaseCourse | null>(null);
  const [units, setUnits] = useState<FirebaseUnit[]>([]);
  const [userProgress, setUserProgress] = useState<UserCourse | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch course data
  useEffect(() => {
    const fetchCourseData = async () => {
      if (!courseId || !user) return;

      try {
        setLoading(true);
        
        // Fetch course details
        const courseData = await getCourseById(courseId);
        setCourse(courseData);

        // Fetch units
        const unitsData = await getUnitsByCourseId(courseId);
        setUnits(unitsData);

        // Fetch user progress
        const progressData = await getUserCourseProgress(user.id, courseId);
        setUserProgress(progressData);

      } catch (error) {
        console.error('Error fetching course data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [courseId, user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">جاري التحميل...</div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-bold text-white mb-2">الكورس غير موجود</h2>
        <Button onClick={() => navigate('/courses')}>
          العودة للكورسات
        </Button>
      </div>
    );
  }

  const progress = userProgress?.progress || 0;
  const completedUnits = userProgress?.completedUnits || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/courses')}
          className="text-white hover:text-[#FF4800]"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          العودة
        </Button>
      </div>

      {/* Course Header */}
      <Card className="bg-black/40 border border-white/10">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div 
                className="w-16 h-16 rounded-xl flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: course.color }}
              >
                {course.icon}
              </div>
              <div>
                <CardTitle className="text-white text-2xl mb-2">{course.title}</CardTitle>
                <p className="text-gray-400">{course.description}</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-[#FF4800]/20 text-[#FF4800]">
              {course.grade}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent>
          {/* Course Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <BookOpen className="h-5 w-5 text-[#FF4800]" />
                <span className="text-white font-bold">{course.totalUnits}</span>
              </div>
              <p className="text-gray-400 text-sm">الوحدات</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-[#FF4800]" />
                <span className="text-white font-bold">{course.totalLessons}</span>
              </div>
              <p className="text-gray-400 text-sm">الدروس</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="h-5 w-5 text-[#FF4800]" />
                <span className="text-white font-bold">{course.students}</span>
              </div>
              <p className="text-gray-400 text-sm">الطلاب</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="h-5 w-5 text-[#FF4800]" />
                <span className="text-white font-bold">{course.xpReward}</span>
              </div>
              <p className="text-gray-400 text-sm">XP</p>
            </div>
          </div>

          {/* Progress */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white font-medium">التقدم العام</span>
              <span className="text-[#FF4800] font-bold">{progress}%</span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>

          {/* Start/Continue Button */}
          <Button 
            className="w-full bg-[#FF4800] hover:bg-[#FF4800]/90"
            onClick={() => {
              if (units.length > 0) {
                navigate(`/course/${courseId}/unit/${units[0].id}`);
              }
            }}
          >
            {progress > 0 ? 'استكمال الكورس' : 'ابدأ الكورس'}
          </Button>
        </CardContent>
      </Card>

      {/* Units List */}
      <Card className="bg-black/40 border border-white/10">
        <CardHeader>
          <CardTitle className="text-white">وحدات الكورس</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {units.map((unit, index) => {
              const isCompleted = completedUnits.includes(unit.id);
              const isUnlocked = index === 0 || completedUnits.includes(units[index - 1]?.id);
              
              return (
                <div 
                  key={unit.id}
                  className={`p-4 rounded-lg border transition-all duration-300 ${
                    isCompleted 
                      ? 'bg-green-500/10 border-green-500/30' 
                      : isUnlocked 
                        ? 'bg-black/20 border-white/10 hover:border-[#FF4800]/30 cursor-pointer' 
                        : 'bg-gray-800/20 border-gray-700/30 opacity-50'
                  }`}
                  onClick={() => {
                    if (isUnlocked) {
                      navigate(`/course/${courseId}/unit/${unit.id}`);
                    }
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        {isCompleted ? (
                          <CheckCircle className="h-8 w-8 text-green-500" />
                        ) : isUnlocked ? (
                          <Play className="h-8 w-8 text-[#FF4800]" />
                        ) : (
                          <Lock className="h-8 w-8 text-gray-500" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-white font-medium mb-1">
                          الوحدة {unit.number}: {unit.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {unit.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="h-4 w-4" />
                            {unit.xpReward} XP
                          </span>
                          {unit.hasQuiz && (
                            <Badge variant="outline" className="text-xs">
                              اختبار
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      {isCompleted && (
                        <Badge className="bg-green-500 text-white">
                          مكتمل
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Course Stats */}
      <Card className="bg-black/40 border border-white/10">
        <CardHeader>
          <CardTitle className="text-white">إحصائيات الكورس</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-black/20 rounded-lg">
              <div className="text-2xl font-bold text-[#FF4800] mb-2">
                {course.stats.totalEnrollments}
              </div>
              <p className="text-gray-400 text-sm">إجمالي التسجيلات</p>
            </div>
            <div className="text-center p-4 bg-black/20 rounded-lg">
              <div className="text-2xl font-bold text-[#FF4800] mb-2">
                {course.stats.averageProgress}%
              </div>
              <p className="text-gray-400 text-sm">متوسط التقدم</p>
            </div>
            <div className="text-center p-4 bg-black/20 rounded-lg">
              <div className="text-2xl font-bold text-[#FF4800] mb-2">
                {course.stats.completionRate}%
              </div>
              <p className="text-gray-400 text-sm">معدل الإكمال</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseDetail;
