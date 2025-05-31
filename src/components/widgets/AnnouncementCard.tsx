
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Star } from 'lucide-react';

interface AnnouncementCardProps {
  title: string;
  content: string;
  type: 'info' | 'important' | 'warning';
  timestamp: string;
  isNew?: boolean;
}

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({
  title,
  content,
  type,
  timestamp,
  isNew = false
}) => {
  const getTypeColor = () => {
    switch (type) {
      case 'important': return 'bg-red-500/10 text-red-400';
      case 'warning': return 'bg-yellow-500/10 text-yellow-400';
      default: return 'bg-blue-500/10 text-blue-400';
    }
  };

  return (
    <Card className="hover:bg-[rgba(255,255,255,0.05)] transition-colors">
      <CardContent className="p-3">
        <div className="flex items-start justify-between mb-2">
          <h4 className="text-white font-medium text-sm font-changa line-clamp-1">{title}</h4>
          {isNew && (
            <Badge className="bg-[#FF4800]/20 text-[#FF4800] text-xs px-2 py-0.5">
              جديد
            </Badge>
          )}
        </div>
        <p className="text-gray-300 text-xs font-noto mb-3 line-clamp-2">{content}</p>
        <div className="flex items-center justify-between">
          <div className={`px-2 py-1 rounded-full text-xs ${getTypeColor()}`}>
            {type === 'important' ? 'مهم' : type === 'warning' ? 'تحذير' : 'معلومة'}
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Clock className="h-3 w-3" />
            {timestamp}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnnouncementCard;
