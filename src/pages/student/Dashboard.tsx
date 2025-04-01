
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  ChevronLeft, Trophy, Star, CheckCircle, Clock, 
  Zap, Calendar, BarChart3, ActivitySquare, 
  Target, BookOpen, Award, Sparkles, ArrowUpRight,
  TrendingUp, TrendingDown, User, ChevronsUp
} from 'lucide-react';
import { PixelProgress } from '@/components/ui/pixel-progress';
import { PixelButton } from '@/components/ui/pixel-button';
import { PixelBadge } from '@/components/ui/pixel-badge';

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

// Upcoming exams
const upcomingExams = [
  { id: 1, subject: 'الرياضيات', date: '15 أبريل', time: '10:00 ص', difficulty: 'متوسط' },
  { id: 2, subject: 'الفيزياء', date: '18 أبريل', time: '12:30 م', difficulty: 'صعب' }
];

const Dashboard = () => {
  const { user } = useAuth();
  const [period, setPeriod] = useState('weekly');
  
  const maxActivityHours = Math.max(...weeklyActivity.map(day => day.hours));
  
  return (
    <div className="space-y-6 animate-blur-in">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-xl bg-secondary/30 backdrop-blur-lg border border-border/50 p-6 md:p-8">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/5 z-0"></div>
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-blue-500/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="mb-6 md:mb-0">
            <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-primary/70 mb-2 animate-slide-down">
              أهلاً بعودتك، {user?.name?.split(' ')[0]}!
            </h1>
            <p className="text-foreground/80 max-w-lg">
              أنت في المرتبة <span className="text-primary font-bold">#3</span> بين أصدقائك. استمر بالمذاكرة لتحافظ على تقدمك!
            </p>
            
            <div className="flex mt-4 gap-3">
              <PixelButton className="group">
                استكمل الدراسة
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-[-2px] group-hover:translate-y-[-2px]" />
              </PixelButton>
              <PixelButton variant="secondary">استعرض الجدول</PixelButton>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 bg-secondary/70 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-primary/30 animate-pulse-glow hover-scale">
              <Zap className="h-8 w-8 text-primary" />
            </div>
            <div className="text-center">
              <p className="text-muted-foreground text-sm">نقاطك</p>
              <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70">8,966</h3>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stats Cards */}
        <div className="col-span-1">
          <div className="grid grid-cols-2 gap-4">
            {/* Streak Counter */}
            <div className="futuristic-card flex flex-col justify-between hover-scale">
              <div className="text-muted-foreground text-sm mb-2">دخول متواصل</div>
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <span className="text-2xl font-bold text-primary">32</span>
                <span className="text-primary">يوم</span>
              </div>
            </div>
            
            {/* Tasks Count */}
            <div className="futuristic-card flex flex-col justify-between hover-scale">
              <div className="text-muted-foreground text-sm mb-2">مهام مكتملة</div>
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
                <span className="text-2xl font-bold text-foreground">158</span>
              </div>
            </div>
            
            {/* Ranking */}
            <div className="futuristic-card flex flex-col justify-between hover-scale">
              <div className="text-muted-foreground text-sm mb-2">المرتبة</div>
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Trophy className="h-5 w-5 text-blue-500" />
                </div>
                <span className="text-2xl font-bold text-foreground">#3</span>
              </div>
            </div>
            
            {/* Study Time */}
            <div className="futuristic-card flex flex-col justify-between hover-scale">
              <div className="text-muted-foreground text-sm mb-2">ساعات الدراسة</div>
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                  <Clock className="h-5 w-5 text-yellow-500" />
                </div>
                <span className="text-2xl font-bold text-foreground">42</span>
                <span className="text-muted-foreground">ساعة</span>
              </div>
            </div>
          </div>
          
          {/* Level Progress */}
          <div className="futuristic-card mt-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-foreground">مستوى التقدم</h3>
              <PixelBadge variant="info" className="animate-pulse">مستوى 8</PixelBadge>
            </div>
            
            <div className="flex items-center gap-3 mb-2">
              <div className="relative h-14 w-14 rounded-full border-4 border-primary/30 flex items-center justify-center">
                <span className="text-lg font-bold text-primary">8</span>
                <div className="absolute inset-0 animate-pulse-glow opacity-70"></div>
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-primary font-medium">مبتدئ متقدم</span>
                  <span className="text-xs text-muted-foreground">7,500 / 10,000</span>
                </div>
                
                <PixelProgress 
                  value={75} 
                  max={100} 
                  color="default" 
                  height="md"
                  variant="gradient"
                  className="mb-1"
                />
                
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>المستوى الحالي</span>
                  <div className="flex items-center">
                    <ChevronsUp className="h-3 w-3 mr-1 text-primary" />
                    <span>2,500 نقطة للمستوى القادم</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-3 rounded-lg bg-secondary/50 border border-border/50">
              <div className="flex items-center gap-2 mb-2">
                <Award className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">المهارات المكتسبة</span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <PixelBadge variant="outline" className="text-xs animate-shimmer">حل المعادلات</PixelBadge>
                <PixelBadge variant="outline" className="text-xs animate-shimmer">قوانين الحركة</PixelBadge>
                <PixelBadge variant="outline" className="text-xs animate-shimmer">البرمجة</PixelBadge>
                <PixelBadge variant="outline" className="text-xs animate-shimmer">+5 أخرى</PixelBadge>
              </div>
            </div>
          </div>
        </div>
        
        {/* Activity & Performance */}
        <div className="col-span-1 lg:col-span-2 space-y-4">
          {/* Performance Panel */}
          <div className="futuristic-card">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-foreground flex items-center">
                <ActivitySquare className="h-5 w-5 mr-2 text-primary" />
                أداء المواد
              </h3>
              
              <div className="flex bg-secondary rounded-lg p-0.5">
                <button 
                  onClick={() => setPeriod('weekly')} 
                  className={`px-3 py-1 text-xs rounded-md transition-all ${period === 'weekly' ? 'bg-primary text-white' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  أسبوعي
                </button>
                <button 
                  onClick={() => setPeriod('monthly')} 
                  className={`px-3 py-1 text-xs rounded-md transition-all ${period === 'monthly' ? 'bg-primary text-white' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  شهري
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="h-8 w-8 bg-green-500/20 rounded-lg flex items-center justify-center mr-3">
                        <Target className="h-4 w-4 text-green-500" />
                      </div>
                      <span className="font-medium">الرياضيات</span>
                    </div>
                    <div className="flex items-center text-green-500">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span className="text-xs font-medium">95%</span>
                    </div>
                  </div>
                  <PixelProgress value={95} max={100} color="success" height="sm" variant="gradient" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="h-8 w-8 bg-blue-500/20 rounded-lg flex items-center justify-center mr-3">
                        <Target className="h-4 w-4 text-blue-500" />
                      </div>
                      <span className="font-medium">الفيزياء</span>
                    </div>
                    <div className="flex items-center text-blue-500">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span className="text-xs font-medium">88%</span>
                    </div>
                  </div>
                  <PixelProgress value={88} max={100} color="info" height="sm" variant="gradient" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="h-8 w-8 bg-red-500/20 rounded-lg flex items-center justify-center mr-3">
                        <Target className="h-4 w-4 text-red-500" />
                      </div>
                      <span className="font-medium">الكيمياء</span>
                    </div>
                    <div className="flex items-center text-red-500">
                      <TrendingDown className="h-4 w-4 mr-1" />
                      <span className="text-xs font-medium">72%</span>
                    </div>
                  </div>
                  <PixelProgress value={72} max={100} color="danger" height="sm" variant="gradient" />
                </div>
              </div>
              
              <div className="bg-secondary/50 rounded-lg p-4 flex flex-col justify-between">
                <div>
                  <h4 className="font-medium mb-1">معدل الإنجاز العام</h4>
                  <p className="text-muted-foreground text-sm mb-6">قمت بإكمال 85% من المهام المطلوبة</p>
                  
                  <div className="flex items-center justify-center my-4">
                    <div className="relative w-32 h-32">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle 
                          cx="50" cy="50" r="40" 
                          fill="none" 
                          stroke="rgba(255,255,255,0.1)" 
                          strokeWidth="8" 
                        />
                        <circle 
                          cx="50" cy="50" r="40" 
                          fill="none" 
                          stroke="url(#gradient)" 
                          strokeWidth="8" 
                          strokeDasharray="251.2" 
                          strokeDashoffset={251.2 * (1 - 0.85)}
                          transform="rotate(-90 50 50)" 
                          className="animate-pulse"
                          strokeLinecap="round"
                        />
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#FF5500" />
                            <stop offset="100%" stopColor="#FF8844" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold text-primary">85%</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-auto">
                  <PixelButton variant="outline" className="w-full group">
                    عرض التفاصيل
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-[-2px] group-hover:translate-y-[-2px]" />
                  </PixelButton>
                </div>
              </div>
            </div>
          </div>
          
          {/* Upcoming & Announcements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Upcoming Exams */}
            <div className="futuristic-card">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-foreground flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-primary" />
                  الاختبارات القادمة
                </h3>
                <Link to="/courses" className="text-primary text-sm hover:underline">عرض الكل</Link>
              </div>
              
              <div className="space-y-3">
                {upcomingExams.map(exam => (
                  <div key={exam.id} className="bg-secondary/50 p-3 rounded-lg flex justify-between items-center hover:bg-secondary/70 transition-all">
                    <div>
                      <h4 className="font-medium">{exam.subject}</h4>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{exam.date} - {exam.time}</span>
                      </div>
                    </div>
                    <PixelBadge 
                      variant={
                        exam.difficulty === 'صعب' ? 'destructive' : 
                        exam.difficulty === 'متوسط' ? 'warning' : 'success'
                      }
                    >
                      {exam.difficulty}
                    </PixelBadge>
                  </div>
                ))}
                
                <PixelButton variant="outline" className="w-full mt-2 group">
                  <BookOpen className="h-4 w-4 mr-2" />
                  بدء المذاكرة
                </PixelButton>
              </div>
            </div>
            
            {/* Announcements */}
            <div className="futuristic-card">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-foreground flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-primary" />
                  إعلانات
                </h3>
              </div>
              
              <div className="space-y-3">
                {announcements.map((announcement) => (
                  <div key={announcement.id} className="border-b border-border/50 pb-3 last:border-0 last:pb-0 hover:bg-secondary/30 p-2 rounded-lg transition-all">
                    <h4 className="font-medium text-foreground">{announcement.title}</h4>
                    <p className="text-muted-foreground text-sm mt-1">{announcement.content}</p>
                    <div className="text-primary text-xs mt-2 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {announcement.date}
                    </div>
                  </div>
                ))}
                
                <div className="flex items-center justify-center p-2 rounded-lg bg-secondary/50 text-sm text-muted-foreground">
                  <span>لا توجد إعلانات أخرى</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
