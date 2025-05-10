
import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip, Cell } from 'recharts';

interface WeeklyChartProps {
  data: { day: string; xp: number }[];
}

const WeeklyChart: React.FC<WeeklyChartProps> = ({ data }) => {
  const highestXp = Math.max(...data.map(item => item.xp));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
        <defs>
          <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF4800" stopOpacity={1} />
            <stop offset="100%" stopColor="#FF4800" stopOpacity={0.6} />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <XAxis 
          dataKey="day" 
          axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
          tickLine={false}
          tick={{ fill: '#9ca3af', fontSize: 10 }}
        />
        <Tooltip
          cursor={{ fill: 'rgba(255,255,255,0.03)' }}
          contentStyle={{ 
            backgroundColor: 'rgba(26, 29, 47, 0.95)', 
            border: '1px solid rgba(255,72,0,0.2)',
            borderRadius: '8px',
            boxShadow: '0 0 15px rgba(255,72,0,0.15)'
          }}
          labelStyle={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}
          itemStyle={{ color: '#FF4800' }}
          formatter={(value) => [`${value} XP`, 'نقاط اليوم']}
        />
        <Bar 
          dataKey="xp" 
          fill="url(#barGradient)" 
          radius={[4, 4, 0, 0]}
          barSize={20}
          animationDuration={1500}
          className="transition-all duration-300"
        >
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              filter={entry.xp === highestXp ? 'url(#glow)' : undefined}
              style={{
                filter: entry.xp === highestXp ? 'drop-shadow(0 0 3px rgba(255,72,0,0.5))' : 'none'
              }}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default WeeklyChart;
