
import React from 'react';
import { BookOpen, Clock } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Progress } from './ui/progress';
import { SectionHeader } from './ui/section-header';
import { Link } from 'react-router-dom';

interface CourseCardProps {
  id: number | string;
  title: string;
  image?: string;
  progress: number;
  duration: string;
  lessonCount: number;
  category?: string;
  color?: string;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  id,
  title,
  image,
  progress,
  duration,
  lessonCount,
  category = "أكاديمي",
  color = "#FF4800"
}) => {
  return (
    <Card className="overflow-hidden group h-full flex flex-col">
      <CardContent className="p-0 flex flex-col h-full">
        <div className="aspect-[16/9] bg-black/60 relative overflow-hidden">
          {image ? (
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1A1D2F] to-black">
              <BookOpen className="h-12 w-12 text-[#FF4800]/50" />
            </div>
          )}
          
          <div className="absolute top-2 left-2 py-1 px-2 bg-black/60 backdrop-blur-md rounded-md text-[10px] text-white font-noto">
            {category}
          </div>
          
          {progress > 0 && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/60">
              <div 
                className="h-full bg-[#FF4800]" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}
        </div>
        
        <div className="p-3 flex-1 flex flex-col">
          <h3 className="text-base font-medium text-white mb-1 font-changa line-clamp-2">
            {title}
          </h3>
          
          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center text-xs text-gray-400">
              <Clock className="h-3 w-3 mr-1 text-[#FF4800]" />
              {duration}
            </div>
            <div className="flex items-center text-xs text-gray-400">
              <BookOpen className="h-3 w-3 mr-1 text-[#FF4800]" />
              {lessonCount} درس
            </div>
          </div>
          
          {progress > 0 && (
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-white">التقدم</span>
              <span className="text-xs text-[#FF4800] font-['Share_Tech_Mono']">{progress}%</span>
            </div>
          )}
        </div>
        
        <Link to={`/courses/${id}`} className="w-full">
          <SectionHeader 
            title="عرض الكورس"
            icon={<BookOpen className="h-4 w-4 text-[#FF4800]" strokeWidth={2} />}
            className="cursor-pointer hover:bg-black/70 transition-colors"
          />
        </Link>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
