
import React from 'react';
import { TrendingUp, TrendingDown, Calendar, Award, Target } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip, Cell } from 'recharts';

interface WeeklyProgressComparisonProps {
  currentWeek: { day: string; xp: number }[];
}

const WeeklyProgressComparison: React.FC<WeeklyProgressComparisonProps> = ({ currentWeek }) => {
  // Mock previous week data (in real app, this would come from API)
  const previousWeek = [
    { day: 'الأحد', xp: 10 },
    { day: 'الإثنين', xp: 6 },
    { day: 'الثلاثاء', xp: 8 },
    { day: 'الأربعاء', xp: 4 },
    { day: 'الخميس', xp: 7 },
    { day: 'الجمعة', xp: 5 },
    { day: 'السبت', xp: 6 },
  ];

  // Combine data for comparison
  const comparisonData = currentWeek.map((current, index) => {
    const previous = previousWeek[index];
    const difference = current.xp - previous.xp;
    const percentageChange = previous.xp > 0 ? ((difference / previous.xp) * 100) : 0;
    
    return {
      day: current.day,
      current: current.xp,
      previous: previous.xp,
      difference,
      percentageChange,
      isImprovement: difference > 0,
      isDecline: difference < 0,
      isEqual: difference === 0
    };
  });

  // Calculate overall metrics
  const currentTotal = currentWeek.reduce((sum, day) => sum + day.xp, 0);
  const previousTotal = previousWeek.reduce((sum, day) => sum + day.xp, 0);
  const overallImprovement = currentTotal - previousTotal;
  const overallPercentage = previousTotal > 0 ? ((overallImprovement / previousTotal) * 100) : 0;

  return (
    <Card className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-blue-500/5"></div>
      
      <CardContent className="p-4 relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-bold text-white font-changa flex items-center gap-2">
              <Calendar className="h-5 w-5 text-[#FF4800]" />
              مقارنة الأداء الأسبوعي
            </h3>
            <p className="text-sm text-gray-400 font-noto">مقارنة مع الأسبوع الماضي</p>
          </div>
          
          <div className="text-right">
            <div className="flex items-center gap-1">
              {overallImprovement >= 0 ? (
                <TrendingUp className="h-4 w-4 text-green-400" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-400" />
              )}
              <span className={`text-sm font-['Share_Tech_Mono'] ${overallImprovement >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {overallImprovement >= 0 ? '+' : ''}{overallImprovement} XP
              </span>
            </div>
            <span className="text-xs text-gray-400">
              {overallPercentage >= 0 ? '+' : ''}{overallPercentage.toFixed(1)}%
            </span>
          </div>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-white/5 rounded-lg p-3 text-center">
            <Award className="h-4 w-4 text-[#FF4800] mx-auto mb-1" />
            <div className="text-lg font-bold text-white font-['Share_Tech_Mono']">{currentTotal}</div>
            <div className="text-xs text-gray-400 font-noto">هذا الأسبوع</div>
          </div>
          
          <div className="bg-white/5 rounded-lg p-3 text-center">
            <Target className="h-4 w-4 text-gray-400 mx-auto mb-1" />
            <div className="text-lg font-bold text-gray-300 font-['Share_Tech_Mono']">{previousTotal}</div>
            <div className="text-xs text-gray-400 font-noto">الأسبوع الماضي</div>
          </div>
          
          <div className="bg-white/5 rounded-lg p-3 text-center">
            {overallImprovement >= 0 ? (
              <TrendingUp className="h-4 w-4 text-green-400 mx-auto mb-1" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-400 mx-auto mb-1" />
            )}
            <div className={`text-lg font-bold font-['Share_Tech_Mono'] ${overallImprovement >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {overallImprovement >= 0 ? '+' : ''}{overallImprovement}
            </div>
            <div className="text-xs text-gray-400 font-noto">الفرق</div>
          </div>
        </div>

        {/* Comparison Chart */}
        <div className="h-40 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparisonData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
              <XAxis 
                dataKey="day" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9ca3af', fontSize: 10 }}
              />
              
              <Tooltip
                contentStyle={{ 
                  backgroundColor: 'rgba(26, 29, 47, 0.95)', 
                  border: '1px solid rgba(255,72,0,0.2)',
                  borderRadius: '8px'
                }}
                labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                formatter={(value: any, name: string) => {
                  const item = comparisonData.find(d => d.day === name);
                  return [
                    `${value} XP`,
                    name === 'current' ? 'هذا الأسبوع' : 'الأسبوع الماضي'
                  ];
                }}
              />
              
              <Bar dataKey="previous" fill="rgba(156, 163, 175, 0.5)" radius={[2, 2, 0, 0]} barSize={12} />
              <Bar dataKey="current" radius={[2, 2, 0, 0]} barSize={12}>
                {comparisonData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.isImprovement ? '#10B981' : entry.isDecline ? '#EF4444' : '#FF4800'} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      
      <CardFooter className="bg-white/5 border-t border-white/10">
        <div className="flex items-center justify-between w-full text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-[#FF4800] rounded"></div>
              <span className="text-gray-300 font-noto">هذا الأسبوع</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-gray-400 rounded"></div>
              <span className="text-gray-300 font-noto">الأسبوع الماضي</span>
            </div>
          </div>
          
          <div className="text-gray-400 font-noto">
            {overallImprovement >= 0 ? 'تحسن ممتاز! 🎉' : 'لا بأس، استمر! 💪'}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default WeeklyProgressComparison;
