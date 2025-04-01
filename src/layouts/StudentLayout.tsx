
import { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { 
  Home, BookOpen, ShoppingCart, Users, Settings, LogOut, 
  Menu, X, Bell, Search, Sun, Moon, PanelRight,
  Lightbulb, Zap, Award, CircleUser
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';
import { PixelBadge } from '@/components/ui/pixel-badge';

const StudentLayout = () => {
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
    { path: '/', label: 'الرئيسية', icon: Home },
    { path: '/courses', label: 'كورساتي', icon: BookOpen },
    { path: '/shop', label: 'المتجر', icon: ShoppingCart },
    { path: '/community', label: 'المجتمع', icon: Users },
    { path: '/settings', label: 'الإعدادات', icon: Settings },
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
      {/* Sidebar - fixed on desktop, sliding on mobile */}
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
              <Zap className="h-4 w-4 text-white" />
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
          <p className="text-muted-foreground text-sm">{user?.grade} - {user?.city}</p>
          
          <div className="flex items-center gap-2 mt-2">
            <PixelBadge variant="warning" className="text-xs">مستوى 8</PixelBadge>
            <PixelBadge variant="info" className="text-xs">
              <Award className="h-3 w-3 mr-1" />
              مبتدئ متقدم
            </PixelBadge>
          </div>
        </div>
        
        <div className="overflow-y-auto flex-1 p-4">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavItem key={item.path} {...item} />
            ))}
          </nav>
          
          <div className="mt-8 p-4 bg-secondary/30 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              <h4 className="text-sidebar-foreground font-medium">نصيحة اليوم</h4>
            </div>
            <p className="text-muted-foreground text-sm">
              تذكر أن المواظبة على الدراسة يومياً هي مفتاح النجاح!
            </p>
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
            <span>تسجيل الخروج</span>
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
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <PanelRight className="h-5 w-5" />}
            </button>
            
            <div className="relative mx-4 hidden md:block">
              <input
                type="search"
                className="bg-secondary/50 border border-border text-foreground text-sm rounded-full block w-80 pr-10 py-2 px-4 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                placeholder="ابحث عن الدروس، الكورسات، المهام..."
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
              <span className="notification-badge">3</span>
            </div>
            
            <div className="hidden sm:flex items-center gap-2 rounded-full bg-secondary/50 py-1.5 px-3">
              <div className="h-7 w-7 rounded-full bg-primary/20 flex items-center justify-center">
                <Zap className="h-4 w-4 text-primary" />
              </div>
              <span className="text-primary font-medium">850</span>
              <span className="text-muted-foreground text-sm">نقطة</span>
            </div>
            
            <div className="text-foreground text-sm hidden md:block">
              <span className="text-primary font-medium">👋 أهلا بعودتك،</span> {user?.name?.split(' ')[0]}
            </div>
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

export default StudentLayout;
