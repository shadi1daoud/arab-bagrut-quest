
import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Circle, Clock } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";

// Unit status types
type UnitStatus = 'idle' | 'in-progress' | 'completed';

interface Unit {
  id: string;
  number: number;
  title: string;
  status: UnitStatus;
  duration: string;
  hasStreak?: boolean;
}

interface UnitsListProps {
  units: Unit[];
  currentUnitId: string;
  onSelectUnit: (unitId: string) => void;
}

const UnitsList = ({ units, currentUnitId, onSelectUnit }: UnitsListProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const getStatusIcon = (status: UnitStatus, hasStreak?: boolean) => {
    switch (status) {
      case 'completed':
        return (
          <div className="h-5 w-5 rounded-full bg-[#FF4B1A] flex items-center justify-center text-white">
            <div className="h-2 w-2 bg-white rounded-full"></div>
          </div>
        );
      case 'in-progress':
        return (
          <div className="relative h-5 w-5">
            <div className="absolute inset-0 rounded-full border-2 border-[#FF4B1A] opacity-50"></div>
            <div 
              className="absolute inset-0 rounded-full border-2 border-[#FF4B1A]"
              style={{
                clipPath: 'polygon(0 0, 50% 0, 50% 50%, 0 50%)',
                transform: 'rotate(45deg)'
              }}
            ></div>
          </div>
        );
      default:
        return (
          <div className="h-5 w-5 rounded-full border border-gray-500"></div>
        );
    }
  };

  return (
    <Collapsible
      open={!isCollapsed}
      onOpenChange={(open) => setIsCollapsed(!open)}
      className={cn(
        "fixed top-[88px] bottom-0 h-[calc(100vh-88px)] bg-[#0F0F0F] border-r border-white/5 z-20 transition-all duration-300",
        isCollapsed ? "w-[68px]" : "w-[260px]"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b border-white/5">
          <h3 className={cn("text-white font-['Changa'] text-lg", isCollapsed && "hidden")}>
            الوحدات التعليمية
          </h3>
          <CollapsibleTrigger asChild>
            <button 
              className="h-8 w-8 rounded-full bg-black/40 flex items-center justify-center border border-white/10 hover:bg-white/10 transition-colors"
            >
              {isCollapsed ? <ChevronLeft className="h-4 w-4 text-gray-400" /> : <ChevronRight className="h-4 w-4 text-gray-400" />}
            </button>
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent asChild forceMount className="h-full overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto scrollbar-none py-2">
            <AnimatePresence>
              {!isCollapsed ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-1 px-2"
                >
                  {units.map(unit => (
                    <div 
                      key={unit.id}
                      className={cn(
                        "flex items-center py-2.5 px-3 rounded-xl cursor-pointer transition-all",
                        unit.id === currentUnitId 
                          ? "bg-[#151515] border border-[#FF4B1A]/20" 
                          : "hover:bg-black/40"
                      )}
                      onClick={() => onSelectUnit(unit.id)}
                    >
                      <div className="flex items-center justify-center h-7 w-7 rounded-full bg-black/40 mr-3 text-xs font-['Share_Tech_Mono'] text-white">
                        {unit.number}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center">
                          <h4 className="text-white text-sm font-['Noto_Sans_Arabic'] truncate mr-2">
                            {unit.title}
                          </h4>
                          {unit.hasStreak && (
                            <div className="w-3 h-3 relative">
                              <div className="absolute inset-0 bg-[#FF4B1A] rounded-full animate-pulse"></div>
                              <div className="absolute inset-[-2px] bg-[#FF4B1A] opacity-40 rounded-full animate-ping"></div>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{unit.duration}</span>
                        </div>
                      </div>
                      <div className="ml-2">
                        {getStatusIcon(unit.status, unit.hasStreak)}
                      </div>
                    </div>
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center space-y-4 pt-4"
                >
                  {units.map(unit => (
                    <TooltipProvider key={unit.id}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            onClick={() => onSelectUnit(unit.id)}
                            className="relative h-8 w-8 flex items-center justify-center"
                          >
                            <div 
                              className={cn(
                                "h-3 w-3 rounded-full transition-all",
                                unit.id === currentUnitId 
                                  ? "bg-[#FF4B1A] shadow-[0_0_8px_rgba(255,75,26,0.6)]" 
                                  : unit.status === 'completed' 
                                    ? "bg-[#FF4B1A]" 
                                    : unit.status === 'in-progress' 
                                      ? "border-2 border-[#FF4B1A]" 
                                      : "bg-gray-600"
                              )}
                            />
                            {unit.hasStreak && (
                              <div className="absolute top-0 right-0 w-2 h-2 bg-[#FF4B1A] rounded-full animate-pulse"></div>
                            )}
                          </button>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="bg-black/90 border-white/10">
                          <div className="text-xs">
                            <span className="text-white font-['Share_Tech_Mono'] mr-1">{unit.number}.</span>
                            <span className="text-white font-['Noto_Sans_Arabic']">{unit.title}</span>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
};

export default UnitsList;
