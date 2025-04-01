
import { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Home, BookOpen, ShoppingCart, Users, Settings, LogOut, Menu, X, Bell, Search } from 'lucide-react';
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
          "flex items-center gap-3 py-3 transition-all",
          isActive 
            ? "text-orange-500" 
            : "text-gray-400 hover:text-gray-300"
        )}
      >
        <Icon className="h-5 w-5" />
        <span>{label}</span>
      </NavLink>
    );
  };

  return (
    <div className="min-h-screen bg-black flex">
      {/* Sidebar - fixed on desktop, sliding on mobile */}
      <aside 
        className={cn(
          "bg-black border-l border-gray-800 w-64 fixed inset-y-0 right-0 z-30 transform transition-transform duration-200 lg:translate-x-0 lg:static flex flex-col",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="p-4 mb-2 flex justify-center">
          <div className="flex items-center gap-1">
            <span className="text-white text-2xl font-bold">درسني</span>
            <span className="bg-orange-500 p-1 rounded">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 10C21 10 18.995 7.26822 17.3662 5.63824C15.7373 4.00827 13.4864 3 11 3C6.02944 3 2 7.02944 2 12C2 16.9706 6.02944 21 11 21C15.9706 21 20 16.9706 20 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 2L13 11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </div>
        </div>
        
        <div className="overflow-y-auto flex-1 p-4">
          <nav className="space-y-6">
            {navItems.map((item) => (
              <NavItem key={item.path} {...item} />
            ))}
          </nav>
        </div>
        
        <div className="p-4 mt-auto border-t border-gray-800">
          <button 
            onClick={logout}
            className="flex items-center gap-3 w-full text-gray-400 hover:text-gray-300 transition-all"
          >
            <LogOut className="h-5 w-5" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-black py-3 px-4 border-b border-gray-800 flex justify-between items-center">
          <div className="flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-white"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
            
            <div className="relative mx-2 hidden md:block">
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Search className="h-4 w-4 text-gray-500" />
              </div>
              <input
                type="search"
                className="bg-gray-900 border border-gray-700 text-white text-sm rounded-full block w-80 pr-10 p-2.5 placeholder-gray-500"
                placeholder="ابحث..."
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="text-gray-400">
              <Bell className="h-5 w-5" />
            </button>
            
            <div className="text-white text-sm">
              <span className="text-orange-500 font-medium">👋 أهلا بعودتك،</span> {user?.name?.split(' ')[0]}
            </div>
            
            <div className="h-9 w-9 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden border-2 border-orange-500">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
              ) : (
                <span className="text-white font-bold">{user?.name?.charAt(0)}</span>
              )}
            </div>
          </div>
        </header>
        
        {/* Main content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
