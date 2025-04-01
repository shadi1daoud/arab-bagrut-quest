
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ChevronLeft, Trophy, Star, CheckCircle, Clock, Edit } from 'lucide-react';

// Dummy activity data for the chart
const weeklyActivity = [
  { day: 'الأحد', hours: 1.5 },
  { day: 'الإثنين', hours: 2.2 },
  { day: 'الثلاثاء', hours: 0.8 },
  { day: 'الأربعاء', hours: 3.0 },
  { day: 'الخميس', hours: 0.5 },
  { day: 'الجمعة', hours: 1.5 },
  { day: 'السبت', hours: 0.8 },
];

// Sample announcements
const announcements = [
  {
    id: 1,
    title: 'تحديث جديد للمنصة',
    content: 'تم إضافة مواد جديدة في قسم الرياضيات للصف الثاني عشر',
    date: 'منذ 3 أيام'
  },
  {
    id: 2,
    title: 'ورشة عمل قادمة',
    content: 'سيتم تنظيم ورشة عمل افتراضية حول حل مسائل الفيزياء يوم الأحد القادم',
    date: 'منذ يوم واحد'
  }
];

const Dashboard = () => {
  const { user } = useAuth();
  
  const maxActivityHours = Math.max(...weeklyActivity.map(day => day.hours));
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Profile Panel */}
        <div className="bg-black border border-gray-800 rounded-lg p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-medium text-white">الملف الشخصي</h3>
            <button className="text-gray-400 hover:text-white">
              <Edit className="h-5 w-5" />
            </button>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="relative mb-3">
              <div className="h-24 w-24 rounded-full overflow-hidden border-2 border-orange-500">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                ) : (
                  <span className="text-white text-2xl font-bold flex items-center justify-center h-full bg-gray-700">
                    {user?.name?.charAt(0)}
                  </span>
                )}
              </div>
              <div className="absolute bottom-0 right-0 bg-green-500 h-4 w-4 rounded-full border-2 border-black"></div>
            </div>
            
            <h2 className="text-white font-medium">{user?.name}</h2>
            <p className="text-gray-400 text-sm mb-4">{user?.grade} - {user?.city}</p>
            
            <div className="w-full space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-orange-500">مبتدئ</span>
                <span className="text-sm text-gray-400">10</span>
              </div>
              
              <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 rounded-full" style={{ width: "30%" }}></div>
              </div>
              
              <p className="text-xs text-gray-500 text-center">
                تبقى لك 7 من أصل 10 مستويات لتنتقل إلى مرحلة متوسط
              </p>
            </div>
          </div>
        </div>
        
        {/* Center Stats Grid */}
        <div className="space-y-6">
          {/* Streak Counter */}
          <div className="bg-black border border-gray-800 rounded-lg p-5 flex items-center justify-between">
            <div className="text-center">
              <h3 className="text-gray-400 text-sm mb-1">دخول متواصل</h3>
              <div className="flex items-center justify-center">
                <span className="text-2xl font-bold text-white">20</span>
                <span className="text-orange-500 text-2xl ml-1">🔥</span>
              </div>
            </div>
            
            <div className="h-10 w-10 bg-black border border-orange-500 rounded-full flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16 13H13V16C13 16.55 12.55 17 12 17C11.45 17 11 16.55 11 16V13H8C7.45 13 7 12.55 7 12C7 11.45 7.45 11 8 11H11V8C11 7.45 11.45 7 12 7C12.55 7 13 7.45 13 8V11H16C16.55 11 17 11.45 17 12C17 12.55 16.55 13 16 13Z" fill="#FF5500"/>
              </svg>
            </div>
          </div>
          
          {/* Tasks Count */}
          <div className="bg-black border border-gray-800 rounded-lg p-5 flex items-center justify-between">
            <div className="text-center">
              <h3 className="text-gray-400 text-sm mb-1">مهمة</h3>
              <div className="text-2xl font-bold text-white">150</div>
            </div>
            
            <div className="h-10 w-10 bg-black border border-orange-500 rounded-full flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="#FF5500"/>
              </svg>
            </div>
          </div>
          
          {/* Ranking */}
          <div className="bg-black border border-gray-800 rounded-lg p-5 flex items-center justify-between">
            <div className="text-center">
              <h3 className="text-gray-400 text-sm mb-1">بين أصدقائي</h3>
              <div className="text-2xl font-bold text-white">#3</div>
            </div>
            
            <div className="h-10 w-10 bg-black border border-orange-500 rounded-full flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 2H7C5.9 2 5 2.9 5 4V20C5 21.1 5.9 22 7 22H17C18.1 22 19 21.1 19 20V4C19 2.9 18.1 2 17 2ZM12 19C10.9 19 10 18.1 10 17C10 15.9 10.9 15 12 15C13.1 15 14 15.9 14 17C14 18.1 13.1 19 12 19ZM16 10H8V8H16V10ZM16 6H8V4H16V6Z" fill="#FF5500"/>
              </svg>
            </div>
          </div>
        </div>
        
        {/* Performance Panel */}
        <div className="bg-black border border-gray-800 rounded-lg p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-white">الاداء</h3>
            <select className="bg-black border border-gray-700 text-gray-400 text-sm rounded-lg p-1">
              <option>شهري</option>
              <option>أسبوعي</option>
              <option>يومي</option>
            </select>
          </div>
          
          <div className="flex flex-col items-center justify-center">
            <div className="relative h-32 w-32 mb-3">
              {/* Circular gauge background */}
              <svg className="absolute" width="128" height="128" viewBox="0 0 128 128">
                <circle 
                  cx="64" 
                  cy="64" 
                  r="60" 
                  fill="none" 
                  stroke="#2A2A2A" 
                  strokeWidth="8" 
                />
                {/* Colored progress arc - in this case 75% around the circle */}
                <circle 
                  cx="64" 
                  cy="64" 
                  r="60" 
                  fill="none" 
                  stroke="#FF5500" 
                  strokeWidth="8" 
                  strokeDasharray="377"
                  strokeDashoffset="94"
                  transform="rotate(-90 64 64)"
                />
              </svg>
              
              {/* Needle pointing to current value */}
              <div 
                className="absolute top-1/2 left-1/2 h-32 w-1 bg-orange-500 origin-bottom" 
                style={{ transform: "translate(-50%, -100%) rotate(60deg)" }}
              >
                <div className="h-2 w-2 rounded-full bg-orange-500 absolute -left-0.5 top-0"></div>
              </div>
              
              {/* Center point */}
              <div className="absolute top-1/2 left-1/2 h-4 w-4 bg-black border-2 border-gray-600 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
            
            <div className="text-center">
              <h3 className="text-white">نقاطك: <span className="text-orange-500 text-2xl font-bold">8,966</span></h3>
              <p className="text-orange-500 text-sm flex items-center justify-center mt-1">
                <span>🔥</span> مرتبة 3 بين 3 أصدقائك
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Activity Chart and Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Chart */}
        <div className="bg-black border border-gray-800 rounded-lg p-5 lg:col-span-2">
          <h3 className="text-lg font-medium text-white mb-6">ساعات نشاطي</h3>
          
          <div className="relative h-56">
            {/* Y-axis labels */}
            <div className="absolute inset-y-0 right-0 flex flex-col justify-between text-xs text-gray-500 pr-2">
              <span>12</span>
              <span>8</span>
              <span>4</span>
              <span>0</span>
            </div>
            
            {/* Chart content */}
            <div className="absolute inset-0 right-8 flex items-end">
              <div className="flex-1 flex items-end justify-between h-full">
                {weeklyActivity.map((day, index) => (
                  <div key={day.day} className="flex flex-col items-center group relative">
                    {/* Tooltip showing hours */}
                    {day.hours === maxActivityHours && (
                      <div className="absolute bottom-full mb-1 bg-orange-500 text-white text-xs rounded px-2 py-0.5 z-10">
                        {day.hours} ساعات
                      </div>
                    )}
                    
                    {/* Bar */}
                    <div 
                      className={`w-8 ${day.hours === maxActivityHours ? 'bg-orange-500' : 'bg-gray-700'} rounded-sm relative group`}
                      style={{ height: `${(day.hours / 12) * 100}%` }}
                    >
                      {/* Hidden tooltip that shows on hover */}
                      <div className="opacity-0 group-hover:opacity-100 absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-0.5 z-10 transition-opacity">
                        {day.hours} ساعات
                      </div>
                    </div>
                    
                    {/* Day label */}
                    <span className="text-gray-500 text-xs mt-2">{day.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Announcements */}
        <div className="bg-black border border-gray-800 rounded-lg p-5">
          <h3 className="text-lg font-medium text-white mb-4">إعلانات</h3>
          
          <div className="space-y-4">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="border-b border-gray-800 pb-3 last:border-0 last:pb-0">
                <h4 className="font-medium text-white text-sm">{announcement.title}</h4>
                <p className="text-gray-400 text-xs mt-1">{announcement.content}</p>
                <div className="text-gray-500 text-xs mt-2">{announcement.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
