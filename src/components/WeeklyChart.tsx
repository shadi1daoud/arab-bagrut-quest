
import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from 'recharts';

interface WeeklyChartProps {
  data: Array<{ day: string; xp: number }>;
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

export const WeeklyChart: React.FC<WeeklyChartProps> = ({ data = weeklyData }) => {
  return (
    <div className="h-36 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FF4800" stopOpacity={1} />
              <stop offset="100%" stopColor="#FF4800" stopOpacity={0.8} />
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
  );
};

export default WeeklyChart;
