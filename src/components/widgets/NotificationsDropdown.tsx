
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Check, Clock, Star } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'achievement' | 'reminder' | 'system';
  timestamp: string;
  read: boolean;
}

const NotificationsDropdown: React.FC = () => {
  const notifications: Notification[] = [
    {
      id: '1',
      title: 'إنجاز جديد!',
      message: 'لقد أكملت 10 دروس هذا الأسبوع',
      type: 'achievement',
      timestamp: 'منذ 5 دقائق',
      read: false
    },
    {
      id: '2',
      title: 'تذكير',
      message: 'لديك امتحان رياضيات غداً',
      type: 'reminder',
      timestamp: 'منذ ساعة',
      read: false
    },
    {
      id: '3',
      title: 'تحديث النظام',
      message: 'تم إضافة ميزات جديدة للمنصة',
      type: 'system',
      timestamp: 'منذ يومين',
      read: true
    }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'achievement': return <Star className="h-4 w-4 text-yellow-400" />;
      case 'reminder': return <Clock className="h-4 w-4 text-blue-400" />;
      default: return <Bell className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-white" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-[#FF4800] text-white text-xs flex items-center justify-center p-0">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-80 bg-gray-900 border-gray-700 text-white max-h-96 overflow-y-auto"
      >
        <div className="p-3 border-b border-gray-700">
          <h3 className="font-semibold text-white font-changa">الإشعارات</h3>
          {unreadCount > 0 && (
            <p className="text-xs text-gray-400">لديك {unreadCount} إشعارات جديدة</p>
          )}
        </div>
        {notifications.map((notification) => (
          <DropdownMenuItem 
            key={notification.id}
            className="p-3 cursor-pointer hover:bg-gray-800 border-b border-gray-700 last:border-b-0"
          >
            <div className="flex items-start gap-3 w-full">
              <div className="mt-1">
                {getTypeIcon(notification.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-medium text-white font-changa truncate">
                    {notification.title}
                  </h4>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-[#FF4800] rounded-full flex-shrink-0 ml-2" />
                  )}
                </div>
                <p className="text-xs text-gray-300 font-noto line-clamp-2 mb-1">
                  {notification.message}
                </p>
                <span className="text-xs text-gray-500">{notification.timestamp}</span>
              </div>
            </div>
          </DropdownMenuItem>
        ))}
        <div className="p-3 border-t border-gray-700">
          <Button variant="ghost" className="w-full text-xs text-[#FF4800] hover:bg-[#FF4800]/10">
            عرض جميع الإشعارات
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationsDropdown;
