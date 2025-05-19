
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Brain, Share2, Play, Pause, RotateCcw } from 'lucide-react';

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
}

const ActionPanel = ({ onQuizClick, onAskAiClick, leaderboard, currentUser }: ActionPanelProps) => {
  const [pomodoro, setPomodoro] = useState({
    isRunning: false,
    timeLeft: 25 * 60, // 25 minutes in seconds
    totalTime: 25 * 60
  });

  useEffect(() => {
    let interval: number | null = null;
    
    if (pomodoro.isRunning && pomodoro.timeLeft > 0) {
      interval = window.setInterval(() => {
        setPomodoro(prev => ({
          ...prev,
          timeLeft: prev.timeLeft - 1
        }));
      }, 1000);
    } else if (pomodoro.timeLeft === 0) {
      // Timer ended
      setPomodoro(prev => ({
        ...prev,
        isRunning: false
      }));
      
      // Notification or sound could be added here
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [pomodoro.isRunning, pomodoro.timeLeft]);

  const togglePomodoro = () => {
    setPomodoro(prev => ({
      ...prev,
      isRunning: !prev.isRunning
    }));
  };

  const resetPomodoro = () => {
    setPomodoro({
      isRunning: false,
      timeLeft: 25 * 60,
      totalTime: 25 * 60
    });
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed top-[88px] right-0 w-[240px] bottom-0 bg-[#0F0F0F] border-l border-white/5 hidden lg:block">
      <div className="h-full flex flex-col p-4">
        {/* Quick actions */}
        <div className="space-y-3 mb-6">
          <Button
            onClick={onQuizClick}
            className="w-full bg-[#FF4B1A] hover:bg-[#FF4B1A]/90 text-white font-['Noto_Sans_Arabic']"
          >
            اختبار سريع
          </Button>
          
          <Button
            onClick={onAskAiClick}
            variant="outline"
            className="w-full border-[#FF4B1A]/30 text-[#FF4B1A] hover:bg-[#FF4B1A]/10 font-['Noto_Sans_Arabic']"
          >
            <Brain className="h-4 w-4 mr-2" />
            اسأل D-Bot
          </Button>
          
          <button className="w-full flex items-center justify-center gap-2 py-2 bg-black/40 rounded-lg text-gray-300 hover:text-white hover:bg-black/60 transition-colors border border-white/10">
            <Share2 className="h-4 w-4" />
            <span className="text-sm font-['Noto_Sans_Arabic']">مشاركة</span>
          </button>
        </div>
        
        {/* Pomodoro timer */}
        <div className="bg-black/30 rounded-xl p-4 border border-white/10 mb-6">
          <h3 className="text-white text-center font-['Noto_Sans_Arabic'] mb-4">مؤقت بومودورو</h3>
          
          <div className="w-32 h-32 mx-auto mb-3">
            <CircularProgressbar
              value={(pomodoro.timeLeft / pomodoro.totalTime) * 100}
              text={formatTime(pomodoro.timeLeft)}
              strokeWidth={5}
              styles={buildStyles({
                textSize: '16px',
                textColor: '#fff',
                pathColor: '#FF4B1A',
                trailColor: 'rgba(255, 255, 255, 0.1)'
              })}
            />
          </div>
          
          <div className="flex justify-center space-x-2">
            <button
              onClick={togglePomodoro}
              className="h-8 w-8 rounded-full bg-[#FF4B1A]/20 flex items-center justify-center text-[#FF4B1A] hover:bg-[#FF4B1A]/30 transition-colors"
            >
              {pomodoro.isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>
            
            <button
              onClick={resetPomodoro}
              className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        {/* Mini leaderboard */}
        <div className="bg-black/30 rounded-xl p-4 border border-white/10">
          <h3 className="text-white text-center font-['Noto_Sans_Arabic'] mb-3">لوحة المتصدرين</h3>
          
          <div className="space-y-2">
            {leaderboard.slice(0, 3).map((user, index) => (
              <div 
                key={user.id} 
                className="flex items-center justify-between p-2 rounded-lg bg-black/30"
              >
                <div className="flex items-center">
                  <div className="w-5 h-5 flex items-center justify-center text-xs font-['Share_Tech_Mono'] text-white/70">
                    {index + 1}
                  </div>
                  
                  <div className="h-7 w-7 rounded-full overflow-hidden border border-white/10 ml-2">
                    <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                  </div>
                  
                  <span className="text-sm text-white font-['Noto_Sans_Arabic'] ml-2 truncate max-w-[80px]">
                    {user.name}
                  </span>
                </div>
                
                <span className="text-xs font-['Share_Tech_Mono'] text-[#FF4B1A] bg-[#FF4B1A]/10 px-2 py-0.5 rounded">
                  {user.xp} XP
                </span>
              </div>
            ))}
            
            {/* Current user position */}
            <div className="mt-3 p-2 rounded-lg bg-[#FF4B1A]/5 border border-[#FF4B1A]/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-5 h-5 flex items-center justify-center text-xs font-['Share_Tech_Mono'] text-[#FF4B1A]">
                    {leaderboard.findIndex(u => u.id === currentUser.id) + 1}
                  </div>
                  
                  <div className="h-7 w-7 rounded-full overflow-hidden border border-[#FF4B1A]/30 ml-2">
                    <img src={currentUser.avatar} alt={currentUser.name} className="h-full w-full object-cover" />
                  </div>
                  
                  <span className="text-sm text-white font-['Noto_Sans_Arabic'] ml-2 truncate max-w-[80px]">
                    أنت
                  </span>
                </div>
                
                <span className="text-xs font-['Share_Tech_Mono'] text-[#FF4B1A] bg-[#FF4B1A]/20 px-2 py-0.5 rounded">
                  {currentUser.xp} XP
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionPanel;
