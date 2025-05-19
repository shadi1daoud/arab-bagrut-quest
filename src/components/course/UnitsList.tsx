
import React from 'react';
import { Check, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
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
  isOpen: boolean;
  onToggle: () => void;
}

const UnitsList = ({ units, currentUnitId, onSelectUnit }: UnitsListProps) => {
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
    <motion.div
      initial={false}
      // Always show with fixed width
      animate={{ 
        width: 260,
        opacity: 1
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        "h-full bg-[#0F0F0F]/80 backdrop-blur-sm border-r border-white/5 z-20 shadow-[2px_0_10px_rgba(0,0,0,0.3)]"
      )}
    >
      <div className="flex flex-col h-full w-[260px]">
        <div className="flex items-center justify-between p-4 border-b border-white/5">
          <h3 className="text-white font-['Changa'] text-lg">
            الوحدات التعليمية
          </h3>
          {/* Removed toggle button */}
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
  );
};

export default UnitsList;
