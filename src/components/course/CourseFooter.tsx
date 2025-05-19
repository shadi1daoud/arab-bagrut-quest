
import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from "@/lib/utils";
import confetti from 'canvas-confetti';

interface CourseFooterProps {
  currentUnit: number;
  totalUnits: number;
  onPrevUnit: () => void;
  onNextUnit: () => void;
  isLastUnit: boolean;
  onComplete?: () => void;
  isUnitCompleted: boolean;
}

const CourseFooter = ({ 
  currentUnit, 
  totalUnits, 
  onPrevUnit, 
  onNextUnit,
  isLastUnit,
  onComplete,
  isUnitCompleted
}: CourseFooterProps) => {
  
  const handleComplete = () => {
    // Trigger confetti effect
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#FF4B1A', '#FF794B', '#FFD0B5', '#FFF']
    });
    
    if (onComplete) onComplete();
  };
  
  return (
    <footer className="fixed bottom-0 left-0 right-0 h-16 bg-gradient-to-r from-[#0E0E0E] to-[#1A1A1A] border-t border-white/5 shadow-[0_-4px_20px_rgba(0,0,0,0.3)] flex items-center px-4 z-30">
      <div className="max-w-[1480px] w-full mx-auto flex items-center justify-between">
        <Button
          onClick={onPrevUnit}
          variant="outline"
          className="font-['Noto_Sans_Arabic'] hover:shadow-[0_0_8px_rgba(255,75,26,0.33)] transition-all duration-300 border-white/10"
          disabled={currentUnit <= 1}
        >
          <ChevronRight className="h-4 w-4 mr-2" />
          الوحدة السابقة
        </Button>
        
        <div className="text-center">
          <p className="text-gray-400 text-sm font-['Noto_Sans_Arabic']">
            الوحدة <span className="text-white font-['Share_Tech_Mono']">{currentUnit}</span> من <span className="text-white font-['Share_Tech_Mono']">{totalUnits}</span>
          </p>
        </div>
        
        <Button
          onClick={isLastUnit && !isUnitCompleted ? handleComplete : onNextUnit}
          variant="default"
          className={cn(
            "font-['Noto_Sans_Arabic'] transition-all duration-300 hover:shadow-[0_0_8px_rgba(255,75,26,0.33)]",
            isLastUnit && !isUnitCompleted && "bg-green-500 hover:bg-green-600"
          )}
          disabled={isLastUnit && isUnitCompleted}
        >
          {isLastUnit ? (
            isUnitCompleted ? "تم الإكمال" : "إكمال الكورس"
          ) : (
            <>
              الوحدة التالية
              <ChevronLeft className="h-4 w-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </footer>
  );
};

export default CourseFooter;
