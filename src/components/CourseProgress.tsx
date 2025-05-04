
import React from 'react';
import { BookOpen } from 'lucide-react';
import { Progress } from './ui/progress';
import { SectionHeader } from './ui/section-header';

interface CourseItem {
  id: number;
  name: string;
  progress: number;
}

interface CourseProgressProps {
  courses: CourseItem[];
  showHeader?: boolean;
}

export const CourseProgress: React.FC<CourseProgressProps> = ({ 
  courses, 
  showHeader = true 
}) => {
  return (
    <div className="space-y-4">
      {courses.map(course => (
        <div key={course.id} className="group">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white text-xs font-changa">{course.name}</span>
            <span className="text-xs text-[#FF4800] font-['Share_Tech_Mono']">{course.progress}%</span>
          </div>
          
          <Progress 
            value={course.progress} 
            className="h-4 bg-black/40 border border-white/5"
          />
        </div>
      ))}
      
      {showHeader && (
        <SectionHeader 
          title="تقدم الكورسات"
          icon={<BookOpen className="h-4 w-4 text-[#FF4800]" strokeWidth={2} />}
          actionLabel="عرض الكل"
          actionHref="/courses"
        />
      )}
    </div>
  );
};

export default CourseProgress;
