
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
          "nav-btn",
          isActive ? "active" : ""
        )}
      >
        <div className="flex items-center justify-center w-8 h-8">
          <Icon className="h-5 w-5" />
        </div>
        
        <AnimatePresence initial={false}>
          {!isMenuCollapsed && (
            <motion.span 
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}
              className="ml-3 whitespace-nowrap overflow-hidden"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </NavLink>
    );
  };

  return (
    <div className="h-screen w-full flex overflow-hidden bg-[var(--base-bg)]">
      {/* Sidebar - controllable expand/collapse */}
      <motion.aside 
        initial={false}
        animate={{ width: isMenuCollapsed ? "72px" : "240px" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "fixed inset-y-0 right-0 z-30 transform lg:translate-x-0 lg:static flex flex-col overflow-hidden shadow-[var(--shadow)] border-l border-[var(--border)]",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        )}
        data-state={isMenuCollapsed ? "collapsed" : "expanded"}
      >
        <div className="flex items-center justify-between relative">
          <div className={cn("flex items-center", isMenuCollapsed ? "justify-center w-full" : "")}>
            <div id="logo-wrapper">
              <img className="logo-full" src="/assets/images/darsni-full.svg" alt="Darsni" />
              <img className="logo-mini" src="/assets/images/darsni-icon.svg" alt="" />
            </div>
          </div>
          
          <button 
            id="toggleBtn"
            onClick={toggleMenu} 
            className={cn(
              "p-2 rounded-lg text-white transition-colors"
            )}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        
        {user && (
          <div className={cn(
            "px-4 py-2 flex items-center gap-3 relative overflow-hidden border-b border-[var(--border)]",
            isMenuCollapsed ? "justify-center" : ""
          )}>
            <div className="relative flex-shrink-0">
              <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-[var(--accent)]/20 shadow-lg">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full w-full bg-[var(--surface)] flex items-center justify-center">
                    <span className="text-[var(--accent)] text-xl font-bold">{user?.name?.charAt(0)}</span>
                  </div>
                )}
              </div>
              <div className="absolute -top-1 -right-1 h-5 w-5 bg-[var(--accent)] rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">5</div>
            </div>
            
            <AnimatePresence initial={false}>
              {!isMenuCollapsed && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="flex-1 min-w-0"
                >
                  <h2 className="text-[var(--text-main)] font-bold text-base truncate">{user?.name || 'شادي داود'}</h2>
                  <p className="text-[var(--muted)] text-xs mb-1 truncate">{user?.grade || 'الثاني عشر'}</p>
                  
                  <div className="flex justify-between items-center text-sm mb-1">
                    <span className="text-[var(--accent)] font-medium">Lv 5</span>
                    <span className="text-xs text-[var(--muted)]">2450/3000</span>
                  </div>
                  
                  <div className="progress-bar">
                    <span style={{ width: "60%" }}></span>
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
          "p-3 mt-auto border-t border-[var(--border)]",
          isMenuCollapsed ? "flex justify-center" : ""
        )}>
          <button 
            onClick={logout}
            className={cn(
              "nav-btn text-[var(--muted)] hover:text-[var(--text-main)]",
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
        <header className="bg-[var(--surface)] py-2 px-4 flex justify-between items-center border-b border-[var(--border)] shadow-[var(--shadow)] z-10">
          <div className="flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-[var(--text-main)]"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
            
            <div className="relative mx-2 hidden md:block">
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Search className="h-4 w-4 text-[var(--muted)]" />
              </div>
              <input
                type="search"
                className="bg-[var(--base-bg)] border border-[var(--border)] text-[var(--text-main)] text-sm rounded-[var(--radius)] block w-56 pr-10 p-1.5"
                placeholder="ابحث..."
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {user && (
              <>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-[var(--surface)] py-1 px-2 rounded-full border border-[var(--border)]">
                    <Flame className="h-3.5 w-3.5 text-[var(--accent)]" />
                    <span className="text-[var(--text-main)] text-sm">12</span>
                  </div>
                  
                  <div className="hidden md:block h-4 w-px bg-[var(--border)]"></div>
                  
                  <div className="flex items-center gap-2">
                    <div className="bg-[var(--surface)] py-1 px-2 rounded-full border border-[var(--border)] hidden md:flex items-center gap-1.5">
                      <Award className="h-3.5 w-3.5 text-[var(--accent)]" />
                      <span className="text-[var(--text-main)] text-sm">8965</span>
                    </div>
                    
                    <button className="relative text-[var(--muted)] hover:text-[var(--text-main)] group">
                      <Bell className="h-5 w-5" />
                      <span className="absolute -top-1 -right-1 bg-[var(--accent)] w-4 h-4 rounded-full text-xs flex items-center justify-center text-white">
                        3
                      </span>
                    </button>
                  </div>
                </div>
                
                <div className="text-[var(--text-main)]">
                  <span className="text-[var(--accent)] mr-1 text-sm">👋 أهلاً،</span>
                  <span className="mr-1 text-sm">{user?.name?.split(' ')[0] || 'شادي'}</span>
                </div>
              </>
            )}
          </div>
        </header>
        
        {/* Main content with fixed height */}
        <main className="flex-1 p-3 overflow-auto relative z-10 h-[calc(100vh-48px)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
