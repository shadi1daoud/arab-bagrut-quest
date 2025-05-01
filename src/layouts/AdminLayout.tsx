
import { useState, useEffect } from 'react';
import { Outlet, NavLink, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, FileText, Users, LogOut, Upload, Menu, X, Search, Bell, ChevronRight
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { path: '/admin', label: 'لوحة التحكم', icon: LayoutDashboard },
    { path: '/admin/courses', label: 'إدارة الكورسات', icon: FileText },
    { path: '/admin/users', label: 'إدارة المستخدمين', icon: Users },
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
              className="text-sm font-medium"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </NavLink>
    );
  };

  return (
    <div className="min-h-screen bg-transparent flex">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isMenuCollapsed ? "72px" : "240px" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "fixed inset-y-0 right-0 z-30 transform transition-transform duration-200 lg:translate-x-0 lg:static flex flex-col border-l border-white/5",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        )}
        data-state={isMenuCollapsed ? "collapsed" : "expanded"}
      >
        <div className="p-4 flex items-center justify-between mb-2 relative">
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
        
        <div className="p-4 border-b border-[var(--border)]">
          <div className={cn(
            "flex", 
            isMenuCollapsed ? "flex-col items-center" : "flex-col items-center"
          )}>
            <div className="h-20 w-20 rounded-full overflow-hidden border-2 border-[var(--accent)] shadow-lg shadow-[var(--accent)]/10 bg-[var(--surface)]">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full bg-[var(--surface)] flex items-center justify-center">
                  <span className="text-[var(--accent)] text-2xl font-bold">{user?.name?.charAt(0) || 'A'}</span>
                </div>
              )}
            </div>
            <AnimatePresence initial={false}>
              {!isMenuCollapsed && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mt-4 text-center"
                >
                  <h2 className="text-lg font-bold text-[var(--text-main)]">{user?.name || 'Admin User'}</h2>
                  <p className="text-sm text-[var(--muted)]">مشرف النظام</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        <div className="overflow-y-auto flex-1 p-4">
          <nav className="space-y-2">
            {navItems.map((item) => (
              <NavItem key={item.path} {...item} />
            ))}
            
            <AnimatePresence initial={false}>
              {!isMenuCollapsed && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link 
                    to="/admin/courses/upload"
                    className="btn-primary mt-6 flex items-center gap-3"
                  >
                    <Upload className="h-5 w-5" />
                    <span>رفع كورس جديد</span>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </nav>
        </div>
        
        <div className="p-4 mt-auto border-t border-[var(--border)]">
          <button 
            onClick={logout}
            className={cn(
              "nav-btn text-[var(--muted)] hover:text-[var(--text-main)]",
              isMenuCollapsed ? "justify-center w-10 h-10 mx-auto" : "w-full"
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
                  تسجيل خروج
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.aside>
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-[var(--surface)] py-3 px-4 flex justify-between items-center border-b border-[var(--border)] shadow-[var(--shadow)]">
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
                className="bg-[var(--base-bg)] border border-[var(--border)] text-[var(--text-main)] text-sm rounded-[var(--radius)] block w-80 pr-10 p-2.5 placeholder-[var(--muted)]"
                placeholder="ابحث..."
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative text-[var(--muted)] hover:text-[var(--text-main)] transition-all">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-[var(--accent)] w-4 h-4 rounded-full text-xs flex items-center justify-center text-white shadow-sm">
                2
              </span>
            </button>
            
            <h1 className="text-lg font-medium text-[var(--text-main)]">
              <span className="text-[var(--accent)]">درسني</span> - لوحة المشرف
            </h1>
          </div>
        </header>
        
        {/* Main content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto bg-[var(--base-bg)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
