import React from 'react';
import { Award, Brain, Flame } from 'lucide-react';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
interface StatsCardProps {
  name: string;
  level: number;
  grade: string;
  xp: number;
  maxXp: number;
  effort: number;
  points: number;
  iq: number;
}
export const StatsCard: React.FC<StatsCardProps> = ({
  name = "شادي داود",
  level = 5,
  grade = "الثاني عشر - دار الأرقم",
  xp = 2450,
  maxXp = 3000,
  effort = 12,
  points = 8900,
  iq = 8.9
}) => {
  return <div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Avatar className="h-14 w-14 border-2 border-[#8E6DFF]/20">
            <AvatarImage src="/assets/avatars/student.png" />
            <AvatarFallback className="bg-[#1A1D2F] text-xl font-bold">
              {name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="absolute -top-1 -right-1 h-5 w-5 bg-[#8E6DFF] rounded-full flex items-center justify-center text-[#0C0E1A] text-xs font-bold shadow-lg shadow-[#8E6DFF]/20 font-['Share_Tech_Mono']">{level}</div>
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between">
            <h2 className="text-white font-bold text-base font-changa">{name}</h2>
            <span className="text-xs py-0.5 px-2 bg-[#8E6DFF]/10 rounded-md font-bold font-['Share_Tech_Mono'] text-[#ff4800]">Lv {level}</span>
          </div>
          
          <p className="text-gray-400 text-xs mb-2 font-noto">{grade}</p>
          
          <div className="w-full">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-[#8E6DFF] font-['Share_Tech_Mono']">{xp}/{maxXp}</span>
            </div>
            
            <Progress value={Math.floor(xp / maxXp * 100)} className="h-1.5" />
          </div>
        </div>
      </div>
      
      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-2 mt-4">
        <div className="p-2 rounded-xl bg-[rgba(255,255,255,0.03)] flex flex-col items-center">
          <Flame className="h-4 w-4 text-[#8E6DFF]" strokeWidth={2} />
          <span className="text-white font-medium text-[10px] mb-0.5 font-noto">الجهد</span>
          <div className="text-sm font-bold text-white font-['Share_Tech_Mono']">{effort}</div>
        </div>
        
        <div className="p-2 rounded-xl bg-[rgba(255,255,255,0.03)] flex flex-col items-center">
          <Award className="h-4 w-4 text-[#8E6DFF]" strokeWidth={2} />
          <span className="text-white font-medium text-[10px] mb-0.5 font-noto">النقاط</span>
          <div className="text-sm font-bold text-white font-['Share_Tech_Mono']">{(points / 1000).toFixed(1)}K</div>
        </div>
        
        <div className="p-2 rounded-xl bg-[rgba(255,255,255,0.03)] flex flex-col items-center">
          <Brain className="h-4 w-4 text-[#8E6DFF]" strokeWidth={2} />
          <span className="text-white font-medium text-[10px] mb-0.5 font-noto">الذكاء</span>
          <div className="text-sm font-bold text-white font-['Share_Tech_Mono']">{iq}</div>
        </div>
      </div>
    </div>;
};
export default StatsCard;