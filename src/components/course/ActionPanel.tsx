import React from 'react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, Brain, Activity, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface User {
  id: string;
  name: string;
  avatar: string;
  xp: number;
}

interface ActionPanelProps {
  onQuizClick: () => void;
  onAskAiClick: () => void;
  leaderboard: User[];
  currentUser: User;
  isOpen: boolean;
  onToggle: () => void;
}

const ActionPanel = ({ 
  onQuizClick, 
  onAskAiClick, 
  leaderboard, 
  currentUser,
  isOpen,
  onToggle
}: ActionPanelProps) => {
  return (
    <>
      <motion.div
        initial={false}
        animate={{ 
          width: isOpen ? 300 : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "h-full bg-[#0F0F0F]/80 backdrop-blur-sm border-l border-white/5 z-20 shadow-[-2px_0_10px_rgba(0,0,0,0.3)] overflow-hidden"
        )}
      >
        <div className="flex flex-col h-full w-[300px]">
          <div className="flex items-center justify-between p-4 border-b border-white/5">
            <Button 
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full bg-black/40 flex items-center justify-center border border-white/10 hover:bg-white/10 transition-colors hover:shadow-[0_0_8px_rgba(255,75,26,0.33)]"
              onClick={onToggle}
            >
              <ChevronLeft className="h-4 w-4 text-gray-400" />
            </Button>
            <h3 className="text-white font-['Changa'] text-lg">
              أدوات مساعدة
            </h3>
          </div>
          
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-6">
              {/* Quick actions */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-400 font-['Noto_Sans_Arabic']">
                  أدوات سريعة
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    onClick={onQuizClick}
                    className="bg-[#1A1A1A] border-white/5 hover:bg-[#252525] hover:border-white/10 transition-all duration-300 hover:shadow-[0_0_8px_rgba(255,75,26,0.2)]"
                  >
                    <Activity className="h-4 w-4 mr-2 text-[#FF4B1A]" />
                    <span className="font-['Noto_Sans_Arabic']">اختبار سريع</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={onAskAiClick}
                    className="bg-[#1A1A1A] border-white/5 hover:bg-[#252525] hover:border-white/10 transition-all duration-300 hover:shadow-[0_0_8px_rgba(255,75,26,0.2)]"
                  >
                    <Brain className="h-4 w-4 mr-2 text-[#FF4B1A]" />
                    <span className="font-['Noto_Sans_Arabic']">اسأل AI</span>
                  </Button>
                </div>
              </div>
              
              {/* Leaderboard */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-400 font-['Noto_Sans_Arabic']">
                  المتصدرون
                </h4>
                <div className="space-y-2">
                  {leaderboard.map((user, index) => {
                    const isCurrentUser = user.id === currentUser.id;
                    return (
                      <div
                        key={user.id}
                        className={cn(
                          "flex items-center p-2 rounded-lg",
                          isCurrentUser 
                            ? "bg-[#FF4B1A]/10 border border-[#FF4B1A]/20" 
                            : "hover:bg-white/5"
                        )}
                      >
                        <div className="flex items-center justify-center w-8 font-['Share_Tech_Mono']">
                          {index + 1}
                        </div>
                        <div className="h-8 w-8 rounded-full overflow-hidden mr-2">
                          <img 
                            src={user.avatar} 
                            alt={user.name} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={cn(
                            "text-sm truncate",
                            isCurrentUser ? "font-medium text-white" : "text-gray-300"
                          )}>
                            {user.name}
                          </p>
                        </div>
                        <div className="font-['Share_Tech_Mono'] text-sm font-bold text-[#FF4B1A]">
                          {user.xp} XP
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </ScrollArea>
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
                "fixed top-[100px] right-4 z-30 rounded-full shadow-lg",
                isOpen ? "opacity-0 pointer-events-none" : "opacity-100 animate-pulse hover:animate-none"
              )}
              onClick={onToggle}
              style={{ 
                background: 'linear-gradient(45deg, #FF4B1A, #FF794B)'
              }}
              aria-label="Open helping tools"
            >
              <ChevronLeft className="h-4 w-4 text-white" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p className="font-['Noto_Sans_Arabic']">أدوات مساعدة</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};

export default ActionPanel;
