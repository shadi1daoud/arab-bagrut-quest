
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

interface CourseHeaderProps {
  courseTitle: string;
  totalXP: number;
  progress: number;
  courseId: string;
}

const CourseHeader = ({ courseTitle, totalXP, progress, courseId }: CourseHeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 h-[88px] bg-gradient-to-r from-[#0E0E0E] to-[#1A1A1A] border-b border-white/5 z-30 flex items-center px-4 md:px-6">
      <div className="max-w-[1480px] mx-auto w-full flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link 
            to="/my-courses" 
            className="text-gray-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-2.5 rounded-full"
          >
            <ArrowRight className="h-5 w-5" />
          </Link>
          
          <h1 className="text-xl md:text-2xl font-bold font-['Changa'] bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            {courseTitle}
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:block w-56 lg:w-72">
            <div className="flex justify-between items-center text-xs text-white/70 mb-1">
              <span className="font-['Noto_Sans_Arabic']">التقدم الإجمالي</span>
              <span className="font-['Share_Tech_Mono']">{progress}%</span>
            </div>
            <Progress 
              value={progress} 
              className="h-2 bg-[#262626]"
              style={{
                "--progress-indicator-color": "linear-gradient(to right, #FF4B1A, #FF794B)",
                "--progress-indicator-shadow": "0 0 8px rgba(255,75,26,0.33)"
              } as React.CSSProperties}
            />
          </div>
          
          <div className="flex items-center bg-[#FF4B1A]/10 rounded-full px-3 py-1 border border-[#FF4B1A]/20">
            <span className="text-[#FF4B1A] font-['Share_Tech_Mono'] text-sm font-bold">
              {totalXP} XP
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default CourseHeader;
