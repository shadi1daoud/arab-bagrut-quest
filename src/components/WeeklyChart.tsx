
import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from 'recharts';
import { Activity, Clock, Award } from 'lucide-react';
import { SectionHeader } from './ui/section-header';

interface WeeklyChartProps {
  data: Array<{ day: string; xp: number }>;
  showHeader?: boolean;
  totalHours?: string;
  totalXP?: string;
}

const weeklyData = [
  { day: 'الأحد', xp: 12 },
  { day: 'الإثنين', xp: 8 },
  { day: 'الثلاثاء', xp: 5 },
  { day: 'الأربعاء', xp: 6 },
  { day: 'الخميس', xp: 9 },
  { day: 'الجمعة', xp: 4 },
  { day: 'السبت', xp: 7 },
];

export const WeeklyChart: React.FC<WeeklyChartProps> = ({ 
  data = weeklyData,
  showHeader = true,
  totalHours = '8.7',
  totalXP = '870'
}) => {
  return (
    <div className="flex flex-col">
      <div className="p-4">
        <div className="flex-1 flex flex-col">
          <div className="h-36 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FF4800" stopOpacity={1} />
                    <stop offset="100%" stopColor="#FF4800" stopOpacity={0.6} />
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="day" 
                  axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                  tickLine={false}
                  tick={{ fill: '#9ca3af', fontSize: 10 }}
                />
                <Tooltip
                  contentStyle={{ 
                    backgroundColor: 'rgba(26, 29, 47, 0.95)', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '16px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
                  }}
                  labelStyle={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}
                  itemStyle={{ color: '#FF4800' }}
                  formatter={(value) => [`${value} ساعات`, '']}
                />
                <Bar 
                  dataKey="xp" 
                  fill="url(#barGradient)" 
                  radius={6}
                  barSize={20}
                  animationDuration={1500}
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex items-center gap-2 mt-2">
            <div className="py-1 px-2 bg-[#FF4800]/10 rounded-full text-xs text-[#FF4800] font-['Share_Tech_Mono'] flex items-center gap-1">
              <Clock className="h-3 w-3 text-[#FF4800]" />
              {totalHours} ساعة
            </div>
            
            <div className="py-1 px-2 bg-[#FF4800]/10 rounded-full text-xs text-[#FF4800] font-['Share_Tech_Mono'] flex items-center gap-1">
              <Award className="h-3 w-3" />
              +{totalXP} XP
            </div>
          </div>
        </div>
      </div>
      
      {showHeader && (
        <SectionHeader 
          title="إنجاز أسبوعي"
          icon={<Activity className="h-4 w-4 text-[#FF4800]" strokeWidth={2} />}
          actionLabel="عرض التفاصيل"
          actionHref="/activity"
        />
      )}
    </div>
  );
};

export default WeeklyChart;
