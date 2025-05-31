
import React from 'react';
import { BookOpen, Clock, Award, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface Course {
  id: string;
  title: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  estimatedTime: string;
  nextLesson: string;
  color: string;
}

interface MyCoursesProps {
  courses: Course[];
  onViewAll: () => void;
}

const MyCoursesSection: React.FC<MyCoursesProps> = ({ courses, onViewAll }) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-white font-changa">
            <BookOpen className="w-5 h-5 text-[#FF4800]" />
            كورساتي الحالية
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onViewAll}
            className="text-[#FF4800] hover:text-[#CC3900] text-xs p-0"
          >
            عرض الكل
            <ChevronRight className="w-3 h-3 mr-1" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {courses.slice(0, 3).map((course) => (
          <div 
            key={course.id}
            className="p-4 rounded-xl bg-black/20 border border-white/5 hover:border-[#FF4800]/30 transition-all duration-300 cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${course.color}20` }}
              >
                <BookOpen 
                  className="w-6 h-6" 
                  style={{ color: course.color }}
                />
              </div>

              <div className="flex-1">
                <h4 className="text-white font-medium font-changa text-sm mb-1">
                  {course.title}
                </h4>
                
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-400 font-noto">
                    {course.completedLessons}/{course.totalLessons} دروس
                  </span>
                  <span className="text-xs text-[#FF4800] font-['Share_Tech_Mono']">
                    {course.progress}%
                  </span>
                </div>

                <Progress value={course.progress} className="h-1.5 mb-2" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {course.estimatedTime}
                    </div>
                  </div>

                  <span className="text-xs text-gray-300 font-noto">
                    التالي: {course.nextLesson}
                  </span>
                </div>
              </div>

              <Button 
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#FF4800] hover:bg-[#CC3900] h-8 px-3 text-xs"
              >
                متابعة
              </Button>
            </div>
          </div>
        ))}

        {courses.length > 3 && (
          <Button 
            variant="outline" 
            className="w-full border-[#FF4800]/30 text-[#FF4800] hover:bg-[#FF4800]/10 text-sm h-10"
            onClick={onViewAll}
          >
            عرض جميع الكورسات ({courses.length})
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default MyCoursesSection;
