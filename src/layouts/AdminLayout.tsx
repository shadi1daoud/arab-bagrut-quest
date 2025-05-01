
import { useState, useEffect } from 'react';
import { Outlet, NavLink, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, FileText, Users, LogOut, Upload, Menu, X, Search, Bell, ChevronRight
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import '../styles/theme-nebula.css';

// Generate stars for our star field background
const generateStars = (count: number) => {
  const stars = [];
  for (let i = 0; i < count; i++) {
    const size = Math.random() * 3 + 1;
    stars.push({
      id: i,
      size,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDelay: Math.random() * 4,
      animationDuration: Math.random() * 2 + 2
    });
  }
  return stars;
};

const stars = generateStars(100);

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
          "sidebar-item flex items-center gap-3 py-3 px-4 rounded-xl transition-all",
          isActive 
            ? "active border border-[rgba(255,72,0,0.2)]" 
            : "text-gray-400 hover:text-white hover:bg-white/5"
        )}
      >
        <div className={cn(
          "sidebar-icon flex items-center justify-center w-8 h-8 rounded-lg transition-all",
          isActive 
            ? "bg-[#FF4800] text-white shadow-[0_0_15px_rgba(255,72,0,0.4)]"
            : "bg-white/5 text-gray-400"
        )}>
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
              style={{
                fontFamily: 'var(--font-body-ar)'
              }}
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
      {/* Background effects */}
      <div className="star-field">
        {stars.map(star => (
          <div
            key={star.id}
            className="star"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              left: `${star.left}%`,
              top: `${star.top}%`,
              animationDelay: `${star.animationDelay}s`,
              animationDuration: `${star.animationDuration}s`
            }}
          />
        ))}
      </div>
      <div className="grid-overlay"></div>
      
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isMenuCollapsed ? "72px" : "220px" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "fixed inset-y-0 right-0 z-30 transform transition-transform duration-200 lg:translate-x-0 lg:static flex flex-col",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        )}
        data-state={isMenuCollapsed ? "collapsed" : "expanded"}
      >
        <div className="p-4 flex items-center justify-between mb-2">
          <div className={cn("flex items-center", isMenuCollapsed ? "justify-center w-full" : "")}>
            <div id="logo-wrapper">
              <img className="logo-full" src="/assets/images/darsni-full.svg" alt="Darsni" />
              <img className="logo-mini" src="/assets/images/darsni-icon.svg" alt="" />
            </div>
          </div>
          
          <button 
            onClick={toggleMenu} 
            className={cn(
              "p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors",
              isMenuCollapsed ? "rotate-180" : ""
            )}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-4 border-b border-white/10">
          <div className={cn(
            "flex", 
            isMenuCollapsed ? "flex-col items-center" : "flex-col items-center"
          )}>
            <div className="h-20 w-20 rounded-full overflow-hidden border-2 border-[#FF4800]/20 shadow-lg shadow-[#FF4800]/10 bg-gradient-to-b from-[#0B0D19] to-[#10122A]">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-[#10122A] to-[#0B0D19] flex items-center justify-center">
                  <span className="text-white text-2xl font-bold font-['Changa']">{user?.name?.charAt(0) || 'A'}</span>
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
                  <h2 className="text-lg font-bold text-white font-['Changa']">{user?.name || 'Admin User'}</h2>
                  <p className="text-sm text-[var(--color-text-muted)] font-['Noto_Sans_Arabic']">مشرف النظام</p>
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
                    className="btn-primary mt-6 flex items-center gap-3 py-3 px-4 rounded-xl w-full justify-center hover:shadow-lg hover:shadow-[#FF4800]/20"
                  >
                    <Upload className="h-5 w-5" />
                    <span className="font-['Noto_Sans_Arabic']">رفع كورس جديد</span>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </nav>
        </div>
        
        <div className="p-4 mt-auto border-t border-white/10">
          <button 
            onClick={logout}
            className={cn(
              "flex items-center gap-3 text-gray-400 hover:text-white transition-all p-3 rounded-xl hover:bg-white/5",
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
                  className="font-['Noto_Sans_Arabic']"
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
        <header>
          <div className="py-3 px-4 flex justify-between items-center">
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
                  className="bg-white/5 border border-white/10 text-white text-sm rounded-xl block w-80 pr-10 p-2.5 placeholder-gray-500 focus:ring-1 focus:ring-[#FF4800] focus:border-[#FF4800]"
                  placeholder="ابحث..."
                />
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="relative text-gray-400 hover:text-white transition-all">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-[#FF4800] w-4 h-4 rounded-full text-xs flex items-center justify-center shadow-sm shadow-[#FF4800]/20">
                  2
                </span>
              </button>
              
              <h1 className="text-lg font-medium text-white">
                <span className="text-gradient font-['Changa'] font-bold">درسني</span> - لوحة المشرف
              </h1>
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

export default AdminLayout;
