
import { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Home, BookOpen, ShoppingCart, Users, Settings, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const StudentLayout = () => {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { path: '/', label: 'الصفحة الرئيسية', icon: Home },
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
          "flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
          isActive 
            ? "bg-game-primary text-white animate-pulse-glow" 
            : "text-gray-300 hover:bg-gray-800"
        )}
      >
        <Icon className="h-5 w-5" />
        <span>{label}</span>
      </NavLink>
    );
  };

  return (
    <div className="min-h-screen bg-game-background flex flex-col">
      {/* Header */}
      <header className="bg-game-card-bg border-b border-gray-800 py-3 px-4 flex justify-between items-center">
        <div className="flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-white"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
          <h1 className="text-xl font-bold text-game-primary mr-2 glow-text">دارسني</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-white text-sm hidden sm:block">
            <span className="text-game-text-secondary">أهلا بك،</span> {user?.name}
          </div>
          
          <div className="h-10 w-10 rounded-full bg-game-primary flex items-center justify-center overflow-hidden border-2 border-game-secondary">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
            ) : (
              <span className="text-white font-bold">{user?.name?.charAt(0)}</span>
            )}
          </div>
        </div>
      </header>
      
      <div className="flex flex-1 h-full">
        {/* Sidebar */}
        <aside 
          className={cn(
            "bg-game-card-bg border-l border-gray-800 w-64 flex-shrink-0 fixed inset-y-0 right-0 z-20 transform transition-transform duration-200 lg:translate-x-0 lg:static",
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex flex-col h-full pt-16 lg:pt-0">
            <div className="p-4 border-b border-gray-800">
              <div className="flex items-center justify-center mb-3">
                <div className="h-20 w-20 rounded-full bg-game-primary flex items-center justify-center overflow-hidden border-2 border-game-secondary">
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-white text-2xl font-bold">{user?.name?.charAt(0)}</span>
                  )}
                </div>
              </div>
              
              <div className="text-center">
                <h2 className="text-lg font-bold text-white">{user?.name}</h2>
                <p className="text-sm text-game-text-secondary">{user?.grade} - {user?.city}</p>
                
                <div className="mt-2 flex items-center justify-center">
                  <span className="text-game-accent">🔥</span>
                  <span className="mx-1 text-white">{user?.streak}</span>
                  <span className="text-game-text-secondary text-xs">يوم متواصل</span>
                </div>
              </div>
            </div>
            
            <nav className="p-3 flex-1 space-y-1">
              {navItems.map((item) => (
                <NavItem key={item.path} {...item} />
              ))}
            </nav>
            
            <div className="p-4 border-t border-gray-800">
              <button 
                onClick={logout}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 transition-all"
              >
                <LogOut className="h-5 w-5" />
                <span>تسجيل خروج</span>
              </button>
            </div>
          </div>
        </aside>
        
        {/* Main content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
