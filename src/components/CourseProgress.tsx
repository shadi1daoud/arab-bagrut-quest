
import React from 'react';
import { BookOpen, ChevronRight } from 'lucide-react';
import { Progress } from './ui/progress';

interface CourseProgressProps {
  courses: Array<{
    id: number;
    name: string;
    progress: number;
  }>;
}

const CourseProgress: React.FC<CourseProgressProps> = ({ courses }) => {
  return (
    <div className="space-y-3">
      {courses.map(course => (
        <div key={course.id} className="hover:bg-[rgba(255,255,255,0.03)] p-2 rounded-lg transition-all group">
          <div className="flex justify-between items-center mb-1">
            <h4 className="text-white text-sm font-changa">{course.name}</h4>
            <span className="text-xs font-['Share_Tech_Mono'] text-[#FF4800]">{course.progress}%</span>
          </div>
          
          <div className="relative">
            <Progress 
              value={course.progress} 
              className="h-1.5" 
            />
            <div 
              className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-r from-transparent via-[#FF4800]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ 
                transform: 'translateX(-100%)', 
                animation: 'shine 2s infinite linear',
                pointerEvents: 'none'
              }}
            />
          </div>
          
          <div className="mt-1 flex justify-end">
            <button className="text-[10px] text-gray-400 flex items-center hover:text-white transition-colors">
              التفاصيل
              <ChevronRight size={12} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseProgress;
