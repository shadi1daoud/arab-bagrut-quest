
import { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Home, BookOpen, ShoppingCart, Users, Settings, LogOut, Menu, X, Bell, Search, Flame, Shield, Award, ChevronRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const StudentLayout = () => {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);
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

  const toggleMenu = () => {
    setIsMenuCollapsed(!isMenuCollapsed);
  };

  const NavItem = ({ path, label, icon: Icon }: { path: string; label: string; icon: any }) => {
    const isActive = location.pathname === path;
    
    return (
      <NavLink 
        to={path}
        className={({ isActive }) => cn(
          "sidebar-item transition-all duration-300 flex items-center",
          isActive ? "active" : ""
        )}
      >
        <div className={cn(
          "flex items-center justify-center w-10 h-10 rounded-lg transition-all",
          isActive 
            ? "bg-game-primary/20 text-white" 
            : "bg-muted/30 text-gray-400"
        )}>
          <Icon className={cn(
            "h-5 w-5", 
            isActive ? "animate-pulse" : ""
          )} />
        </div>
        
        <AnimatePresence initial={false}>
          {!isMenuCollapsed && (
            <motion.span 
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "ml-3 whitespace-nowrap overflow-hidden",
                isActive ? "font-medium" : ""
              )}
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
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
      
      {/* Sidebar - controllable expand/collapse */}
      <motion.aside 
        initial={false}
        animate={{ width: isMenuCollapsed ? "72px" : "240px" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "bg-game-card-bg/80 backdrop-blur-md fixed inset-y-0 right-0 z-30 transform lg:translate-x-0 lg:static flex flex-col overflow-hidden",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        )}
      >
        <div className="p-4 flex items-center justify-between">
          <div className={cn("flex items-center gap-2", isMenuCollapsed ? "justify-center w-full" : "")}>
            {isMenuCollapsed ? (
              <img 
                src="/lovable-uploads/4b850b89-0042-4c72-a297-c387e8ca3562.png" 
                alt="Darsni Logo" 
                className="h-8 w-8 object-contain"
              />
            ) : (
              <img 
                src="/lovable-uploads/fd288540-ffc0-448a-a6b9-3aee7a09267a.png" 
                alt="Darsni Logo" 
                className="h-8 object-contain"
              />
            )}
          </div>
          
          <button 
            onClick={toggleMenu} 
            className={cn(
              "p-2 rounded-lg hover:bg-muted/30 text-gray-400 hover:text-white transition-colors",
              isMenuCollapsed ? "rotate-180" : ""
            )}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        
        {user && (
          <div className={cn(
            "px-4 py-2 flex items-center gap-3 relative overflow-hidden border-b border-white/5",
            isMenuCollapsed ? "justify-center" : ""
          )}>
            <div className="orbit-container relative flex-shrink-0">
              <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-game-primary/20 shadow-lg">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-game-secondary/40 to-game-secondary/20 flex items-center justify-center">
                    <span className="text-white text-xl font-bold">{user?.name?.charAt(0)}</span>
                  </div>
                )}
              </div>
              <div className="absolute -top-1 -right-1 h-5 w-5 bg-game-primary rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-game-primary/20 font-share-tech">5</div>
            </div>
            
            <AnimatePresence initial={false}>
              {!isMenuCollapsed && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="flex-1 min-w-0"
                >
                  <h2 className="text-white font-bold text-base font-changa truncate">{user?.name || 'شادي داود'}</h2>
                  <p className="text-game-text-secondary text-xs mb-1 font-lexend truncate">{user?.grade || 'الثاني عشر'}</p>
                  
                  <div className="flex justify-between items-center text-sm mb-1">
                    <span className="text-game-highlight font-medium font-share-tech">Lv 5</span>
                    <span className="text-xs text-blue-300 font-share-tech">2450/3000</span>
                  </div>
                  
                  <div className="level-bar">
                    <div className="level-bar-fill" style={{ width: "60%" }}></div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
        
        <div className={cn(
          "overflow-y-auto flex-1 py-4 px-2",
          isMenuCollapsed ? "flex flex-col items-center" : ""
        )}>
          <nav className="space-y-2">
            {navItems.map((item) => (
              <NavItem key={item.path} {...item} />
            ))}
          </nav>
        </div>
        
        <div className={cn(
          "p-3 mt-auto border-t border-white/5",
          isMenuCollapsed ? "flex justify-center" : ""
        )}>
          <button 
            onClick={logout}
            className={cn(
              "flex items-center gap-3 text-gray-400 hover:text-white transition-all p-2 rounded-lg hover:bg-muted/30",
              isMenuCollapsed ? "justify-center w-10 h-10" : "w-full"
            )}
          >
            <LogOut className="h-5 w-5" />
            <AnimatePresence initial={false}>
              {!isMenuCollapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  تسجيل الخروج
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.aside>
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Header - more compact */}
        <header className="bg-game-card-bg/80 backdrop-blur-md py-2 px-4 flex justify-between items-center border-b border-white/5 z-10">
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
                className="bg-muted/10 border border-white/5 text-white text-sm rounded-full block w-56 pr-10 p-1.5 placeholder-gray-500 focus:ring-1 focus:ring-game-accent/30 focus:border-game-accent/30 transition-all"
                placeholder="ابحث..."
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {user && (
              <>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-muted/10 py-1 px-2 rounded-full border border-white/5">
                    <Flame className="h-3.5 w-3.5 text-orange-400" />
                    <span className="text-white font-share-tech text-sm">12</span>
                  </div>
                  
                  <div className="hidden md:block h-4 w-px bg-white/10"></div>
                  
                  <div className="flex items-center gap-2">
                    <div className="bg-muted/10 py-1 px-2 rounded-full border border-white/5 hidden md:flex items-center gap-1.5">
                      <Award className="h-3.5 w-3.5 text-game-accent" />
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
                  <span className="text-game-accent mr-1 text-sm font-changa">👋 أهلاً،</span>
                  <span className="mr-1 text-sm font-changa">{user?.name?.split(' ')[0] || 'شادي'}</span>
                </div>
              </>
            )}
          </div>
        </header>
        
        {/* Main content with fixed height */}
        <main className="flex-1 p-3 overflow-hidden relative z-10 h-[calc(100vh-48px)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
