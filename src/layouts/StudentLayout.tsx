
import { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Home, BookOpen, ShoppingCart, Users, Settings, LogOut, Menu, X, Bell, Search, Flame, Shield, Award } from 'lucide-react';
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
          "sidebar-item transition-all duration-300",
          isActive ? "active" : ""
        )}
      >
        <div className={cn(
          "flex items-center justify-center w-8 h-8 rounded-lg transition-all",
          isActive 
            ? "bg-game-primary/20 text-white" 
            : "bg-muted/30 text-gray-400"
        )}>
          <Icon className={cn(
            "h-5 w-5", 
            isActive ? "animate-pulse" : ""
          )} />
        </div>
        <span className={cn(
          isActive ? "font-medium" : "", 
          "transition-all duration-300"
        )}>
          {label}
        </span>
      </NavLink>
    );
  };

  // Create particles for galaxy effect
  const createParticles = () => {
    const particles = [];
    for (let i = 0; i < 40; i++) {
      const style = {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        opacity: Math.random() * 0.5 + 0.1,
        width: `${Math.random() * 2 + 1}px`,
        height: `${Math.random() * 2 + 1}px`,
        animationDelay: `${Math.random() * 15}s`,
        animationDuration: `${Math.random() * 10 + 10}s`
      };
      particles.push(<div key={i} className="particle" style={style}></div>);
    }
    return particles;
  };

  return (
    <div className="h-screen w-full flex overflow-hidden bg-transparent">
      {/* Galaxy particles background */}
      <div className="galaxy-particles fixed inset-0 z-0">
        {createParticles()}
      </div>
      
      {/* Cyber grid background */}
      <div className="cyber-grid fixed inset-0 z-0"></div>
      
      {/* Sidebar - fixed on desktop, sliding on mobile */}
      <aside 
        className={cn(
          "bg-game-card-bg/80 backdrop-blur-md w-64 fixed inset-y-0 right-0 z-30 transform transition-transform duration-300 lg:translate-x-0 lg:static flex flex-col overflow-hidden",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="p-4 mb-2 flex justify-center">
          <div className="flex items-center gap-2 hover-scale">
            <div className="bg-game-primary rounded-lg p-1.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 10C21 10 18.995 7.26822 17.3662 5.63824C15.7373 4.00827 13.4864 3 11 3C6.02944 3 2 7.02944 2 12C2 16.9706 6.02944 21 11 21C15.9706 21 20 16.9706 20 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 2L13 11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-white text-2xl font-bold font-changa">درسني</span>
          </div>
        </div>
        
        {user && (
          <div className="px-4 py-3 flex flex-col items-center relative">
            <div className="orbit-container relative mb-3">
              <div className="h-20 w-20 rounded-full overflow-hidden border-2 border-game-primary/20 shadow-lg">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-game-secondary/40 to-game-secondary/20 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">{user?.name?.charAt(0)}</span>
                  </div>
                )}
              </div>
              <div className="absolute -top-1 -right-1 h-6 w-6 bg-game-primary rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-game-primary/20 font-share-tech">5</div>
            </div>
            
            <h2 className="text-white font-bold text-lg font-changa">{user?.name || 'شادي داود'}</h2>
            <p className="text-game-text-secondary text-sm mb-2 font-lexend">{user?.grade || 'الثاني عشر'}</p>
            
            <div className="w-full mt-1 relative">
              <div className="flex justify-between items-center text-sm mb-1">
                <span className="text-game-highlight font-medium font-share-tech">Lv 5</span>
                <span className="text-xs text-blue-300 font-share-tech">2450 / 3000</span>
              </div>
              
              <div className="level-bar">
                <div className="level-bar-fill" style={{ width: "60%" }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div className="overflow-y-auto flex-1 p-4">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavItem key={item.path} {...item} />
            ))}
          </nav>
        </div>
        
        <div className="p-4 mt-auto">
          <button 
            onClick={logout}
            className="flex items-center gap-3 w-full text-gray-400 hover:text-white transition-all p-3 rounded-lg hover:bg-muted/30 group"
          >
            <LogOut className="h-5 w-5" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-game-card-bg/80 backdrop-blur-md py-3 px-4 flex justify-between items-center border-b border-white/5 z-10">
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
                className="bg-muted/10 border border-white/5 text-white text-sm rounded-full block w-80 pr-10 p-2.5 placeholder-gray-500 focus:ring-1 focus:ring-game-accent/30 focus:border-game-accent/30 transition-all"
                placeholder="ابحث..."
              />
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            {user && (
              <>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-muted/10 py-1 px-3 rounded-full border border-white/5">
                    <Flame className="h-4 w-4 text-orange-400" />
                    <span className="text-white font-share-tech text-sm">12</span>
                  </div>
                  
                  <div className="hidden md:block h-5 w-px bg-white/10"></div>
                  
                  <div className="flex items-center gap-2">
                    <div className="bg-muted/10 py-1 px-3 rounded-full border border-white/5 hidden md:flex items-center gap-2">
                      <Award className="h-4 w-4 text-game-accent" />
                      <span className="text-white font-share-tech text-sm">8965</span>
                    </div>
                    
                    <button className="relative text-gray-400 hover:text-white group">
                      <Bell className="h-5 w-5" />
                      <span className="absolute -top-1 -right-1 bg-game-primary w-4 h-4 rounded-full text-xs flex items-center justify-center">
                        3
                      </span>
                    </button>
                  </div>
                </div>
                
                <div className="text-white">
                  <span className="text-game-accent mr-1 font-changa">👋 أهلاً بعودتك،</span>
                  <span className="mr-1 font-changa">{user?.name?.split(' ')[0] || 'شادي'}</span>
                </div>
              </>
            )}
          </div>
        </header>
        
        {/* Main content */}
        <main className="flex-1 p-4 lg:p-6 overflow-hidden relative z-10 h-[calc(100vh-64px)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
