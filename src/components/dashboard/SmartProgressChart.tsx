
import React from 'react';
import { TrendingUp, Award, Clock, Target, Brain, Zap } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, ReferenceLine } from 'recharts';

interface SmartProgressChartProps {
  data: { day: string; xp: number }[];
}

const SmartProgressChart: React.FC<SmartProgressChartProps> = ({ data }) => {
  // Calculate insights
  const totalXP = data.reduce((sum, item) => sum + item.xp, 0);
  const averageXP = Math.round(totalXP / data.length);
  const highestDay = data.reduce((max, item) => item.xp > max.xp ? item : max, data[0]);
  const trend = data[data.length - 1].xp > data[0].xp ? 'up' : 'down';
  const trendPercentage = Math.abs(((data[data.length - 1].xp - data[0].xp) / data[0].xp) * 100);

  // Enhanced data with cumulative progress
  const enhancedData = data.map((item, index) => ({
    ...item,
    cumulative: data.slice(0, index + 1).reduce((sum, d) => sum + d.xp, 0),
    isToday: index === data.length - 1,
    isBest: item.xp === highestDay.xp
  }));

  return (
    <Card className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF4800]/5 via-transparent to-blue-500/5"></div>
      
      <CardContent className="p-4 relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-bold text-white font-changa flex items-center gap-2">
              <Brain className="h-5 w-5 text-[#FF4800]" />
              التحليل الذكي للأداء
            </h3>
            <p className="text-sm text-gray-400 font-noto">تحليل متقدم لنشاطك الأسبوعي</p>
          </div>
          
          <div className="text-right">
            <div className="flex items-center gap-1">
              <TrendingUp className={`h-4 w-4 ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`} />
              <span className={`text-sm font-['Share_Tech_Mono'] ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                {trend === 'up' ? '↗' : '↘'} {trendPercentage.toFixed(1)}%
              </span>
            </div>
            <span className="text-xs text-gray-400">مقارنة بالأسبوع الماضي</span>
          </div>
        </div>

        {/* Smart Insights Cards */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-white/5 rounded-lg p-3 text-center">
            <Award className="h-4 w-4 text-[#FF4800] mx-auto mb-1" />
            <div className="text-lg font-bold text-white font-['Share_Tech_Mono']">{totalXP}</div>
            <div className="text-xs text-gray-400 font-noto">إجمالي XP</div>
          </div>
          
          <div className="bg-white/5 rounded-lg p-3 text-center">
            <Target className="h-4 w-4 text-yellow-400 mx-auto mb-1" />
            <div className="text-lg font-bold text-white font-['Share_Tech_Mono']">{averageXP}</div>
            <div className="text-xs text-gray-400 font-noto">متوسط يومي</div>
          </div>
          
          <div className="bg-white/5 rounded-lg p-3 text-center">
            <Zap className="h-4 w-4 text-purple-400 mx-auto mb-1" />
            <div className="text-lg font-bold text-white font-['Share_Tech_Mono']">{highestDay.xp}</div>
            <div className="text-xs text-gray-400 font-noto">أفضل يوم</div>
          </div>
        </div>

        {/* Enhanced Chart */}
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={enhancedData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FF4800" stopOpacity={0.6} />
                  <stop offset="50%" stopColor="#FF4800" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#FF4800" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#FF4800" stopOpacity={1} />
                  <stop offset="100%" stopColor="#FFB366" stopOpacity={1} />
                </linearGradient>
              </defs>
              
              <XAxis 
                dataKey="day" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9ca3af', fontSize: 10 }}
              />
              <YAxis hide />
              
              <ReferenceLine 
                y={averageXP} 
                stroke="#FFB366" 
                strokeDasharray="5 5" 
                strokeOpacity={0.5}
                label={{ value: "المتوسط", position: "insideTopRight", fontSize: 10, fill: "#FFB366" }}
              />
              
              <Tooltip
                contentStyle={{ 
                  backgroundColor: 'rgba(26, 29, 47, 0.95)', 
                  border: '1px solid rgba(255,72,0,0.2)',
                  borderRadius: '8px',
                  boxShadow: '0 0 15px rgba(255,72,0,0.15)'
                }}
                labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                itemStyle={{ color: '#FF4800' }}
                formatter={(value: any, name: string) => [
                  `${value} XP`,
                  name === 'xp' ? 'نقاط اليوم' : 'إجمالي'
                ]}
              />
              
              <Area 
                type="monotone" 
                dataKey="xp" 
                stroke="url(#lineGradient)"
                strokeWidth={3}
                fill="url(#areaGradient)"
                dot={{ fill: '#FF4800', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#FF4800', stroke: '#fff', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      
      <CardFooter className="bg-white/5 border-t border-white/10">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-[#FF4800]" />
            <span className="text-sm text-white font-noto">8.7 ساعة هذا الأسبوع</span>
          </div>
          
          <div className="text-sm text-gray-400 font-noto">
            الهدف القادم: <span className="text-[#FF4800] font-semibold">Level 6</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SmartProgressChart;
