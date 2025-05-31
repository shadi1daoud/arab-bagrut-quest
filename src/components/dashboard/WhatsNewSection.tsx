
import React from 'react';
import { Sparkles, Bell, Gift, BookOpen, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface NewsItem {
  id: string;
  type: 'update' | 'course' | 'event' | 'reward';
  title: string;
  description: string;
  date: string;
  isNew: boolean;
  actionText?: string;
}

interface WhatsNewProps {
  newsItems: NewsItem[];
}

const WhatsNewSection: React.FC<WhatsNewProps> = ({ newsItems }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'course': return <BookOpen className="w-4 h-4" />;
      case 'event': return <Users className="w-4 h-4" />;
      case 'reward': return <Gift className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'course': return '#00FFE1';
      case 'event': return '#A335EE';
      case 'reward': return '#FFD700';
      default: return '#FF4800';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'course': return 'كورس جديد';
      case 'event': return 'فعالية';
      case 'reward': return 'مكافأة';
      default: return 'تحديث';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-white font-changa">
          <Sparkles className="w-5 h-5 text-[#FF4800]" />
          ما الجديد؟
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {newsItems.slice(0, 3).map((item) => (
          <div 
            key={item.id}
            className="p-3 rounded-xl bg-black/20 border border-white/5 hover:border-white/10 transition-all duration-300 group cursor-pointer"
          >
            <div className="flex items-start gap-3">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${getTypeColor(item.type)}20` }}
              >
                <div style={{ color: getTypeColor(item.type) }}>
                  {getIcon(item.type)}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-1">
                  <h4 className="text-white font-medium font-changa text-sm truncate">
                    {item.title}
                  </h4>
                  {item.isNew && (
                    <Badge 
                      variant="secondary" 
                      className="bg-[#FF4800]/20 text-[#FF4800] text-xs px-2 py-0 border-0 ml-2"
                    >
                      جديد
                    </Badge>
                  )}
                </div>

                <p className="text-xs text-gray-400 mb-2 font-noto line-clamp-2">
                  {item.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant="outline" 
                      className="text-xs px-2 py-0 border-white/10 text-gray-400"
                    >
                      {getTypeLabel(item.type)}
                    </Badge>
                    <span className="text-xs text-gray-500 font-noto">
                      {item.date}
                    </span>
                  </div>

                  {item.actionText && (
                    <span className="text-xs text-[#FF4800] font-noto group-hover:underline">
                      {item.actionText}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {newsItems.length > 3 && (
          <div className="text-center pt-2">
            <button className="text-sm text-[#FF4800] hover:text-[#CC3900] font-noto">
              عرض جميع الأخبار
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WhatsNewSection;
