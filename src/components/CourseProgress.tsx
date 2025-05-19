import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Progress } from './ui/progress';

interface CourseProgressProps {
  courses?: Array<{
    id: number;
    name: string;
    progress: number;
  }>;
  progress?: number; // Add this to support the direct progress prop
  className?: string; // Add support for className
}

const CourseProgress: React.FC<CourseProgressProps> = ({ courses, progress, className }) => {
  // If a single progress value is provided, render a simple progress bar
  if (typeof progress === 'number') {
    return (
      <div className={className}>
        <Progress value={progress} className="h-2" />
      </div>
    );
  }
  
  // Otherwise render the courses list with progress bars
  return (
    <div className="space-y-3">
      {courses?.map(course => (
        <div key={course.id} className="hover:bg-[rgba(255,255,255,0.05)] p-2 rounded-lg transition-all duration-300 group cursor-pointer border border-transparent hover:border-[rgba(255,72,0,0.2)]">
          <div className="flex justify-between items-center mb-1">
            <h4 className="text-white text-sm font-changa">{course.name}</h4>
            <span className="text-xs font-['Share_Tech_Mono'] text-[#FF4800]">{course.progress}%</span>
          </div>
          
          <div className="relative overflow-hidden rounded-md">
            <Progress 
              value={course.progress} 
              className="h-2" 
            />
            <div 
              className="absolute top-0 bottom-0 left-0 w-full bg-gradient-to-r from-transparent via-[rgba(255,72,0,0.3)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity animate-shine"
              style={{pointerEvents: 'none'}}
            />
          </div>
          
          <div className="mt-1.5 flex justify-end">
            <button className="text-[10px] text-gray-400 flex items-center hover:text-white transition-colors group-hover:text-[#FF4800]">
              التفاصيل
              <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseProgress;
