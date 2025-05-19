import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Check, Clock, Menu } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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
  isOpen: boolean;
  onToggle: () => void;
}

const UnitsList = ({ units, currentUnitId, onSelectUnit, isOpen, onToggle }: UnitsListProps) => {
  const getStatusIcon = (status: UnitStatus, hasStreak?: boolean) => {
    switch (status) {
      case 'completed':
        return (
          <div className="h-5 w-5 rounded-full bg-[#FF4B1A] flex items-center justify-center text-white">
            <Check className="h-3 w-3" />
          </div>
        );
      case 'in-progress':
        return (
          <div className="relative h-5 w-5">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" fill="none" stroke="#FF4B1A" strokeWidth="2" />
              <path 
                d="M12 2 A10 10 0 0 1 22 12" 
                fill="none" 
                stroke="#FF4B1A" 
                strokeWidth="2" 
                strokeLinecap="round"
              />
            </svg>
          </div>
        );
      default:
        return (
          <div className="h-5 w-5 rounded-full border border-gray-500"></div>
        );
    }
  };

  return (
    <>
      <motion.div
        initial={false}
        animate={{ 
          width: isOpen ? 260 : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "h-full bg-[#0F0F0F]/80 backdrop-blur-sm border-r border-white/5 z-20 shadow-[2px_0_10px_rgba(0,0,0,0.3)] overflow-hidden"
        )}
      >
        <div className="flex flex-col h-full w-[260px]">
          <div className="flex items-center justify-between p-4 border-b border-white/5">
            <h3 className="text-white font-['Changa'] text-lg">
              الوحدات التعليمية
            </h3>
            <Button 
              variant="ghost" 
              size="icon"
              className="h-8 w-8 rounded-full bg-black/40 flex items-center justify-center border border-white/10 hover:bg-white/10 transition-colors hover:shadow-[0_0_8px_rgba(255,75,26,0.33)]"
              onClick={onToggle}
            >
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-none py-2">
            <div className="space-y-1 px-2">
              {units.map(unit => (
                <div 
                  key={unit.id}
                  className={cn(
                    "flex items-center py-2.5 px-3 rounded-xl cursor-pointer transition-all duration-300",
                    unit.id === currentUnitId 
                      ? "bg-[#151515] border border-[#FF4B1A]/20 shadow-[0_0_8px_rgba(255,75,26,0.15)]" 
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
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Persistent toggle button */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="default"
              size="icon"
              className={cn(
                "fixed top-[100px] left-4 z-30 rounded-full shadow-lg",
                isOpen ? "opacity-0 pointer-events-none" : "opacity-100 animate-pulse hover:animate-none"
              )}
              onClick={onToggle}
              style={{ 
                background: 'linear-gradient(45deg, #FF4B1A, #FF794B)'
              }}
              aria-label="Open units list"
            >
              <ChevronRight className="h-4 w-4 text-white" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p className="font-['Noto_Sans_Arabic']">الوحدات التعليمية</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};

export default UnitsList;
