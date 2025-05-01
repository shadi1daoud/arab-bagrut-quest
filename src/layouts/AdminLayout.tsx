
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
          "sidebar-item flex items-center gap-3 py-3 px-4 rounded-xl transition-all",
          isActive 
            ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-white border border-white/10 shadow-[0_0_10px_rgba(124,58,237,0.2)]" 
            : "text-gray-400 hover:text-white hover:bg-white/5"
        )}
      >
        <div className={cn(
          "flex items-center justify-center w-8 h-8 rounded-lg transition-all",
          isActive 
            ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-[0_0_8px_rgba(124,58,237,0.3)]"
            : "bg-muted/30 text-gray-400"
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
          "bg-card/50 backdrop-blur-md fixed inset-y-0 right-0 z-30 transform transition-transform duration-200 lg:translate-x-0 lg:static flex flex-col border-l border-white/5",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        )}
      >
        <div className="p-4 flex items-center justify-between mb-2">
          <div className={cn("flex items-center", isMenuCollapsed ? "justify-center w-full" : "")}>
            <AnimatePresence initial={false} mode="wait">
              {isMenuCollapsed ? (
                <motion.img 
                  key="favicon"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  src="/lovable-uploads/f848c528-dd58-411a-8aa1-e90bfdb6a8c6.png" 
                  alt="Darsni Favicon" 
                  className="h-10 w-10 object-contain"
                />
              ) : (
                <motion.img 
                  key="full-logo"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  src="/lovable-uploads/fb2240e4-c664-43fd-896d-20f9cac3ca33.png" 
                  alt="Darsni Logo" 
                  className="max-w-[140px] h-auto object-contain ml-5"
                />
              )}
            </AnimatePresence>
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
        
        <div className={cn(
          "p-4 border-b border-white/10",
          isMenuCollapsed ? "flex justify-center" : ""
        )}>
          <div className={cn(
            "flex", 
            isMenuCollapsed ? "flex-col items-center" : "flex-col items-center"
          )}>
            <div className="h-20 w-20 rounded-full overflow-hidden border-2 border-white/10 shadow-lg shadow-purple-500/10 bg-gradient-to-b from-gray-800 to-gray-900">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-blue-900 to-cyan-700 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">{user?.name?.charAt(0) || 'A'}</span>
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
                  <h2 className="text-lg font-bold text-white">{user?.name || 'Admin User'}</h2>
                  <p className="text-sm text-gray-400">مشرف النظام</p>
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
                    className="mt-6 flex items-center gap-3 py-3 px-4 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:shadow-lg hover:shadow-purple-500/20 hover:brightness-110 transition-all"
                  >
                    <Upload className="h-5 w-5" />
                    <span>رفع كورس جديد</span>
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
        <header className="bg-card/50 backdrop-blur-md py-3 px-4 flex justify-between items-center border-b border-white/10">
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
                className="bg-white/5 border border-white/10 text-white text-sm rounded-xl block w-80 pr-10 p-2.5 placeholder-gray-500 focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                placeholder="ابحث..."
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative text-gray-400 hover:text-white transition-all">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-purple-500 to-blue-500 w-4 h-4 rounded-full text-xs flex items-center justify-center shadow-sm shadow-purple-500/20">
                2
              </span>
            </button>
            
            <h1 className="text-lg font-medium text-white">
              <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">درسني</span> - لوحة المشرف
            </h1>
          </div>
        </header>
        
        {/* Main content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto bg-gradient-to-b from-[#0E0E1C]/40 to-[#0E0E1C]/80">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
