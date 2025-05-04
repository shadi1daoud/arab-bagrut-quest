
import React from 'react';
import { Trophy } from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { SectionHeader } from './ui/section-header';

interface LeaderboardUser {
  id: number;
  name: string;
  level: number;
  xp: number;
}

interface LeaderboardProps {
  data: LeaderboardUser[];
  filter: string;
  onFilterChange: (filter: string) => void;
  showHeader?: boolean;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({
  data,
  filter = 'week',
  onFilterChange,
  showHeader = true
}) => {
  return (
    <div className="flex flex-col">
      <div className="p-4">
        <div className="flex bg-black/30 rounded-lg p-0.5 text-[10px] mb-3 w-fit">
          <button 
            onClick={() => onFilterChange('week')}
            className={`px-2 py-0.5 rounded-md ${filter === 'week' ? 'bg-[#FF4800] text-[#0C0E1A]' : 'text-gray-400'}`}
          >
            أسبوعي
          </button>
          <button 
            onClick={() => onFilterChange('month')}
            className={`px-2 py-0.5 rounded-md ${filter === 'month' ? 'bg-[#FF4800] text-[#0C0E1A]' : 'text-gray-400'}`}
          >
            شهري
          </button>
        </div>
        
        <div className="space-y-3">
          {data.slice(0, 3).map((user, index) => (
            <div 
              key={user.id} 
              className="flex items-center gap-3 p-2 rounded-xl transition-all hover:bg-[rgba(255,255,255,0.03)] border-l-4 border-transparent hover:border-l-4 hover:border-l-[#1A1D2F] group"
            >
              <div className="h-6 w-6 flex items-center justify-center">
                {index === 0 ? (
                  <div className="h-6 w-6 rounded-full bg-yellow-500 flex items-center justify-center text-black text-xs font-bold">1</div>
                ) : index === 1 ? (
                  <div className="h-6 w-6 rounded-full bg-gray-400 flex items-center justify-center text-black text-xs font-bold">2</div>
                ) : (
                  <div className="h-6 w-6 rounded-full bg-amber-700 flex items-center justify-center text-black text-xs font-bold">3</div>
                )}
              </div>
              
              <Avatar className="h-8 w-8 border border-[rgba(255,255,255,0.1)]">
                <AvatarFallback className="bg-[#1A1D2F] text-sm font-bold">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="text-white text-xs font-medium truncate font-changa">{user.name}</div>
                <div className="text-[10px] text-gray-400 font-noto">Lv {user.level}</div>
              </div>
              
              <div className="text-xs font-bold text-[#FF4800] font-['Share_Tech_Mono']">
                {user.xp.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {showHeader && (
        <SectionHeader 
          title="المتصدرون"
          icon={<Trophy className="h-4 w-4 text-[#FF4800]" strokeWidth={2} />}
          actionLabel="عرض المزيد"
          actionHref="/leaderboard"
        />
      )}
    </div>
  );
};

export default Leaderboard;
