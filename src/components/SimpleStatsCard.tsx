import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from './ui/card';

interface SimpleStatsCardProps {
  title: string;
  value: number | string;
  change: string;
  isPositive: boolean;
  icon: LucideIcon;
}

export const SimpleStatsCard: React.FC<SimpleStatsCardProps> = ({
  title,
  value,
  change,
  isPositive,
  icon: Icon
}) => {
  return (
    <Card className="bg-black/40 border border-white/10">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400 mb-1">{title}</p>
            <p className="text-2xl font-bold text-white">{value}</p>
            <p className={`text-xs ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {change}
            </p>
          </div>
          <div className="p-3 bg-[#FF4800]/10 rounded-lg">
            <Icon className="h-6 w-6 text-[#FF4800]" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SimpleStatsCard; 