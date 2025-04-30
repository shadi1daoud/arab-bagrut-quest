
import React from 'react';
import { BookOpen, ChevronRight } from 'lucide-react';
import { Progress } from './ui/progress';

interface CourseItem {
  id: number;
  name: string;
  progress: number;
}

interface CourseProgressProps {
  courses: CourseItem[];
}

export const CourseProgress: React.FC<CourseProgressProps> = ({ courses }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-bold text-white font-changa flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-[#8E6DFF]" strokeWidth={2} />
          تقدم الكورسات
        </h3>
      </div>
      
      <div className="space-y-4">
        {courses.map(course => (
          <div key={course.id} className="group">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white text-xs font-changa">{course.name}</span>
              <span className="text-xs text-[#8E6DFF] font-['Share_Tech_Mono']">{course.progress}%</span>
            </div>
            
            <Progress 
              value={course.progress} 
              className="h-6"
            />
          </div>
        ))}
      </div>
      
      <div className="flex justify-end mt-4">
        <a href="/courses" className="text-xs text-[#8E6DFF] font-changa flex items-center hover:underline">
          عرض جميع الكورسات
          <ChevronRight className="h-4 w-4" strokeWidth={2} />
        </a>
      </div>
    </div>
  );
};

export default CourseProgress;
