
import React from 'react';
import { BookOpen } from 'lucide-react';
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
    <div className="space-y-4">
      {courses.map(course => (
        <div key={course.id} className="group">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white text-xs font-changa">{course.name}</span>
            <span className="text-xs text-[#FF4800] font-['Share_Tech_Mono']">{course.progress}%</span>
          </div>
          
          <Progress 
            value={course.progress} 
            className="h-6 bg-black/40 border border-white/5"
          />
        </div>
      ))}
    </div>
  );
};

export default CourseProgress;
