import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Search, LogOut, ArrowUpRight } from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  LabelList 
} from 'recharts';

// Sample data for the activity chart
const activityData = [
  { day: 'السبت', hours: 3 },
  { day: 'الجمعة', hours: 2 },
  { day: 'الخميس', hours: 3 },
  { day: 'الأربعاء', hours: 5 },
  { day: 'الثلاثاء', hours: 2 },
  { day: 'الإثنين', hours: 3 },
  { day: 'الأحد', hours: 4 },
];

const Index = () => {
  const navigate = useNavigate();
  const [adCode, setAdCode] = useState('');
  
  return (
    <div className="flex h-screen bg-black text-white">
      {/* Right Sidebar Navigation */}
      <div className="w-[70px] lg:w-[250px] border-l border-gray-800 flex flex-col items-center p-4">
        <div className="mb-8 w-full flex justify-center">
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold text-white">Darsni</h1>
            <div className="w-full h-0.5 bg-orange-500 mt-1"></div>
          </div>
        </div>
        
        <div className="flex flex-col items-center space-y-8 mt-8 w-full">
          <button 
            className="flex items-center justify-center w-full gap-3 text-orange-500 hover:bg-gray-900 p-2 rounded-md transition-colors"
            onClick={() => navigate('/')}
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="hidden lg:inline text-sm">الرئيسية</span>
          </button>
          
          <button 
            className="flex items-center justify-center w-full gap-3 text-white hover:bg-gray-900 p-2 rounded-md transition-colors"
            onClick={() => navigate('/courses')}
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 3H8C9.06087 3 10.0783 3.42143 10.8284 4.17157C11.5786 4.92172 12 5.93913 12 7V21C12 20.2044 11.6839 19.4413 11.1213 18.8787C10.5587 18.3161 9.79565 18 9 18H2V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 3H16C14.9391 3 13.9217 3.42143 13.1716 4.17157C12.4214 4.92172 12 5.93913 12 7V21C12 20.2044 12.3161 19.4413 12.8787 18.8787C13.4413 18.3161 14.2044 18 15 18H22V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="hidden lg:inline text-sm">كورساتي</span>
          </button>
          
          <button 
            className="flex items-center justify-center w-full gap-3 text-white hover:bg-gray-900 p-2 rounded-md transition-colors"
            onClick={() => navigate('/shop')}
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="hidden lg:inline text-sm">المتجر</span>
          </button>
          
          <button 
            className="flex items-center justify-center w-full gap-3 text-white hover:bg-gray-900 p-2 rounded-md transition-colors"
            onClick={() => navigate('/community')}
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="hidden lg:inline text-sm">المجتمع</span>
          </button>
          
          <button 
            className="flex items-center justify-center w-full gap-3 text-white hover:bg-gray-900 p-2 rounded-md transition-colors"
            onClick={() => navigate('/settings')}
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.287 15.9606C19.3467 16.285 19.5043 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4243 16.365 19.2667 16.0406 19.207C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.287C7.71502 19.3467 7.41568 19.5043 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.57567 16.6643 4.73334 16.365 4.79304 16.0406C4.85274 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77274 8.36381 4.71304 8.03941C4.65334 7.71502 4.49567 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.57567 7.63502 4.73334 7.95941 4.79304C8.28381 4.85274 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77274 15.9606 4.71304C16.285 4.65334 16.5843 4.49567 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4243 7.33568 19.2667 7.63502 19.207 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="hidden lg:inline text-sm">الإعدادات</span>
          </button>
        </div>
        
        <button className="mt-auto flex items-center justify-center gap-2 bg-transparent hover:bg-gray-900 text-white py-2 px-4 rounded-md transition-colors">
          <LogOut className="h-5 w-5" />
          <span className="hidden lg:inline text-sm">تسجيل الخروج</span>
        </button>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="h-16 flex items-center justify-between border-b border-gray-800 px-4">
          <div className="flex items-center gap-4">
            <button className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-800 transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.287 15.9606C19.3467 16.285 19.5043 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4243 16.365 19.2667 16.0406 19.207C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.287C7.71502 19.3467 7.41568 19.5043 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.57567 16.6643 4.73334 16.365 4.79304 16.0406C4.85274 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77274 8.36381 4.71304 8.03941C4.65334 7.71502 4.49567 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.57567 7.63502 4.73334 7.95941 4.79304C8.28381 4.85274 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77274 15.9606 4.71304C16.285 4.65334 16.5843 4.49567 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4243 7.33568 19.2667 7.63502 19.207 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <button className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-800 transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13.73 21C13.5542 21.3031 13.3018 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          
          <div className="relative">
            <input
              type="text"
              placeholder="بحث"
              className="bg-gray-800 border border-gray-700 rounded-full w-64 py-1 px-4 text-right text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
            <Search className="absolute left-3 top-2 h-4 w-4 text-gray-500" />
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-orange-500 text-sm font-medium">شادي</span>
            <span className="text-gray-300 text-sm">أهلاً بعودتك ،</span>
            <span className="text-yellow-400">👋</span>
          </div>
        </header>
        
        {/* Dashboard Grid */}
        <div className="flex-1 p-4 grid grid-cols-12 gap-4">
          {/* Profile Card - 3 cols */}
          <div className="col-span-3 bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
            <div className="p-4">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-medium text-white">الملف الشخصي</h3>
                <button className="text-white hover:text-orange-500">
                  <Edit className="h-4 w-4" />
                </button>
              </div>
              
              <div className="flex flex-col items-center mt-4">
                <div className="relative w-20 h-20 rounded-full border-2 border-orange-500 mb-2 overflow-hidden">
                  <div className="absolute inset-0 bg-orange-500/20 rounded-full"></div>
                  <img 
                    src="/lovable-uploads/1c2c3b5b-f76f-459a-94ed-22d2f3e35da0.png" 
                    alt="Profile" 
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                
                <div className="text-center">
                  <h4 className="text-lg font-medium text-orange-500 flex items-center justify-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    شادي داود
                  </h4>
                  <p className="text-xs text-gray-400">الثاني عشر - دار الأرقم</p>
                </div>
              </div>
              
              <div className="mt-6 border-t border-gray-800 pt-4">
                <h5 className="text-orange-500 font-medium text-center mb-2">مبتدئ</h5>
                <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                  <span>10</span>
                  <span>1</span>
                </div>
                <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full" style={{width: "20%"}}></div>
                </div>
                <p className="text-xs text-gray-500 text-center mt-2">تبقى لك 7 من 10 مستويات للانتقال إلى مرتبة "متوسط"</p>
              </div>
            </div>
          </div>
          
          {/* Middle section - 5 cols */}
          <div className="col-span-5 grid grid-rows-3 gap-4">
            {/* Top Row: Stats Cards */}
            <div className="row-span-1 grid grid-cols-3 gap-4">
              {/* Consecutive Days Card */}
              <div className="col-span-1 bg-gray-900 rounded-lg border border-gray-800 p-4 flex flex-col items-center justify-center">
                <h3 className="text-center text-gray-400 text-xs mb-1">يوم 20</h3>
                <p className="text-center text-xs text-gray-500">دخول متواصل</p>
                <div className="mt-2">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="#ff5722" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="#ff572233"/>
                  </svg>
                </div>
              </div>
              
              {/* Points Card */}
              <div className="col-span-1 bg-gray-900 rounded-lg border border-gray-800 p-4 flex flex-col items-center justify-center">
                <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center mb-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#ff5722" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M20 12H21M3 12H4M12 20V21M12 3V4M17.7 17.7L16.9 16.9M6.1 6.1L7 7M16.9 7L17.7 6.1M7 16.9L6.1 17.7" stroke="#ff5722" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white text-center">150</h3>
                <p className="text-center text-sm text-gray-400">نقاط</p>
              </div>
              
              {/* Progress Circular Chart Card */}
              <div className="col-span-1 bg-gray-900 rounded-lg border border-gray-800 p-4 flex flex-col items-center justify-center">
                <select className="bg-transparent text-xs text-gray-400 mb-1 focus:outline-none">
                  <option>شهري</option>
                  <option>أسبوعي</option>
                  <option>يومي</option>
                </select>
                
                <div className="relative w-full h-16 flex items-center justify-center">
                  <svg className="w-full h-full" viewBox="0 0 120 60">
                    <circle cx="60" cy="30" r="28" stroke="#222" strokeWidth="4" fill="none" />
                    <circle cx="60" cy="30" r="28" stroke="#ff5722" strokeWidth="4" fill="none" strokeDasharray="176" strokeDashoffset="44" strokeLinecap="round" />
                    <circle cx="60" cy="30" r="18" fill="#111" />
                    <text x="60" y="30" textAnchor="middle" dominantBaseline="middle" fill="#ff5722" fontSize="16" fontWeight="bold">8.966</text>
                    <text x="60" y="42" textAnchor="middle" dominantBaseline="middle" fill="#777" fontSize="7">نقاطك</text>
                  </svg>
                </div>
                
                <p className="text-xs text-orange-500 flex items-center mt-1">
                  <span className="inline-block w-2 h-2 bg-orange-500 rounded-full mr-1"></span>
                  مرتبة 3 بين أصدقائك
                </p>
              </div>
            </div>
            
            {/* Rank Card */}
            <div className="row-span-1 bg-gray-900 rounded-lg border border-gray-800 p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium text-white">#3</h3>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 6L12 2L8 6" stroke="#ff5722" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 2V16" stroke="#ff5722" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20 10H22V22H2V10H4" stroke="#ff5722" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-gray-400 text-sm">بين أصدقائك</p>
            </div>
            
            {/* Activity Hours Chart */}
            <div className="row-span-1 bg-gray-900 rounded-lg border border-gray-800 p-4">
              <h3 className="text-lg font-medium text-white mb-4">ساعات نشاطي</h3>
              
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={activityData}
                    margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
                  >
                    <XAxis
                      dataKey="day"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#9ca3af', fontSize: 10 }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#9ca3af', fontSize: 10 }}
                    />
                    <Bar dataKey="hours" fill="#ff5722" radius={[4, 4, 0, 0]}>
                      <LabelList dataKey="hours" position="top" fill="#ff5722" fontSize={12} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          
          {/* Right section - 4 cols */}
          <div className="col-span-4 grid grid-rows-2 gap-4">
            {/* Ad section */}
            <div className="row-span-1 bg-gray-900 rounded-lg border border-gray-800 p-4">
              <h3 className="text-lg font-medium text-white mb-4">إعلانات</h3>
              <div className="bg-gray-800 w-full h-[calc(100%-36px)] rounded flex items-center justify-center">
                {adCode ? (
                  <div dangerouslySetInnerHTML={{ __html: adCode }} className="w-full h-full" />
                ) : (
                  <div className="text-center">
                    <p className="text-gray-500 text-sm">مساحة مخصصة للإعلانات</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
