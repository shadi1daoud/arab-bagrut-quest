
import { useState, useEffect } from 'react';
import { Outlet, NavLink, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, FileText, Users, LogOut, Upload, 
  Menu, X, Search, Bell, Shield, Sun, Moon, Settings,
  BarChart2, BookOpen, Zap, CircleUser
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';
import { PixelBadge } from '@/components/ui/pixel-badge';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    // Apply the theme class to the document
    if (isDarkMode) {
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
    }
  }, [isDarkMode]);

  const navItems = [
    { path: '/admin', label: 'لوحة التحكم', icon: LayoutDashboard },
    { path: '/admin/courses', label: 'إدارة الكورسات', icon: BookOpen },
    { path: '/admin/users', label: 'إدارة المستخدمين', icon: Users },
    { path: '/admin/analytics', label: 'التقارير والإحصاءات', icon: BarChart2 },
    { path: '/admin/settings', label: 'إعدادات النظام', icon: Settings },
  ];

  const NavItem = ({ path, label, icon: Icon }: { path: string; label: string; icon: any }) => {
    const isActive = location.pathname === path;
    
    return (
      <NavLink 
        to={path}
        className={({ isActive }) => cn(
          "flex items-center gap-3 py-3 px-4 rounded-lg transition-all hover:bg-secondary/50",
          isActive 
            ? "text-primary bg-secondary/70 shadow-sm" 
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <Icon className="h-5 w-5" />
        <span>{label}</span>
      </NavLink>
    );
  };

  return (
    <div className="min-h-screen bg-background flex transition-colors duration-300">
      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-sidebar z-30 border-l border-sidebar-border w-64 fixed inset-y-0 right-0 transform transition-transform duration-300 lg:translate-x-0 lg:static flex flex-col shadow-xl",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="p-4 mb-2 flex justify-center border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <span className="text-white text-2xl font-bold gradient-text">درسني</span>
            <span className="bg-primary p-1 rounded">
              <Shield className="h-4 w-4 text-white" />
            </span>
          </div>
        </div>
        
        <div className="p-4 flex flex-col items-center border-b border-sidebar-border">
          <div className="relative">
            <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center overflow-hidden border-2 border-primary mb-3">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
              ) : (
                <CircleUser className="h-10 w-10 text-muted-foreground" />
              )}
            </div>
            <div className="absolute bottom-2 right-0 h-4 w-4 bg-green-500 rounded-full border-2 border-sidebar"></div>
          </div>
          
          <h3 className="text-sidebar-foreground font-medium">{user?.name}</h3>
          <p className="text-muted-foreground text-sm">مشرف النظام</p>
          
          <div className="flex items-center gap-2 mt-2">
            <PixelBadge variant="default" className="text-xs animate-pulse">
              <Shield className="h-3 w-3 mr-1" />
              مشرف رئيسي
            </PixelBadge>
          </div>
        </div>
        
        <div className="overflow-y-auto flex-1 p-4">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavItem key={item.path} {...item} />
            ))}
          </nav>
          
          <Link 
            to="/admin/courses/upload"
            className="flex items-center gap-3 mt-6 py-3 px-4 rounded-lg bg-gradient-to-r from-primary to-primary/80 text-white hover:shadow-md hover:shadow-primary/20 transition-all"
          >
            <Upload className="h-5 w-5" />
            <span>رفع كورس جديد</span>
          </Link>
          
          <div className="mt-8 p-4 bg-secondary/30 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="h-5 w-5 text-primary" />
              <h4 className="text-sidebar-foreground font-medium">إحصائيات النظام</h4>
            </div>
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="bg-secondary/50 p-2 rounded-lg">
                <div className="text-lg font-bold text-primary">258</div>
                <div className="text-xs text-muted-foreground">طالب</div>
              </div>
              <div className="bg-secondary/50 p-2 rounded-lg">
                <div className="text-lg font-bold text-primary">42</div>
                <div className="text-xs text-muted-foreground">كورس</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-4 mt-auto border-t border-sidebar-border">
          <div className="flex items-center justify-between mb-4">
            <span className="text-muted-foreground text-sm">الوضع المظلم</span>
            <Switch 
              checked={isDarkMode} 
              onCheckedChange={setIsDarkMode} 
              className="data-[state=checked]:bg-primary"
            />
          </div>
          
          <button 
            onClick={logout}
            className="flex items-center gap-3 w-full py-2 px-4 rounded-lg text-muted-foreground hover:text-white hover:bg-red-500/20 transition-all"
          >
            <LogOut className="h-5 w-5" />
            <span>تسجيل خروج</span>
          </button>
        </div>
      </aside>
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-secondary/30 backdrop-blur-md py-3 px-4 border-b border-border flex justify-between items-center sticky top-0 z-20">
          <div className="flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-foreground rounded-lg hover:bg-secondary/70"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            
            <div className="relative mx-4 hidden md:block">
              <input
                type="search"
                className="bg-secondary/50 border border-border text-foreground text-sm rounded-full block w-80 pr-10 py-2 px-4 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                placeholder="ابحث في لوحة التحكم..."
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Search className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <button className="p-2 bg-secondary/50 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/70 transition-all">
                <Bell className="h-5 w-5" />
              </button>
              <span className="notification-badge">2</span>
            </div>
            
            <h1 className="text-lg font-medium text-foreground hidden md:block">
              <span className="text-primary">درسني</span> - لوحة المشرف
            </h1>
          </div>
        </header>
        
        {/* Main content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto animate-slide-up">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
