import { useState, useEffect } from 'react';
import { Outlet, NavLink, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, FileText, Users, LogOut, Upload, Menu, X, Search, Bell
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { path: '/admin', label: 'لوحة التحكم', icon: LayoutDashboard },
    { path: '/admin/courses', label: 'إدارة الكورسات', icon: FileText },
    { path: '/admin/users', label: 'إدارة المستخدمين', icon: Users },
  ];

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
        <span className="text-sm font-medium">{label}</span>
      </NavLink>
    );
  };

  return (
    <div className="min-h-screen bg-transparent flex">
      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-card/50 backdrop-blur-md w-64 fixed inset-y-0 right-0 z-30 transform transition-transform duration-200 lg:translate-x-0 lg:static flex flex-col border-l border-white/5",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="p-4 mb-2 flex justify-center">
          <div className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/fd288540-ffc0-448a-a6b9-3aee7a09267a.png" 
              alt="Darsni Logo"
              className="h-12 object-contain"
            />
          </div>
        </div>
        
        <div className="p-4 border-b border-white/10">
          <div className="flex flex-col items-center">
            <div className="h-20 w-20 rounded-full overflow-hidden border-2 border-white/10 shadow-lg shadow-purple-500/10 bg-gradient-to-b from-gray-800 to-gray-900">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-blue-900 to-cyan-700 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">{user?.name?.charAt(0) || 'A'}</span>
                </div>
              )}
            </div>
            <h2 className="mt-4 text-lg font-bold text-white">{user?.name || 'Admin User'}</h2>
            <p className="text-sm text-gray-400">مشرف النظام</p>
          </div>
        </div>
        
        <div className="overflow-y-auto flex-1 p-4">
          <nav className="space-y-2">
            {navItems.map((item) => (
              <NavItem key={item.path} {...item} />
            ))}
            
            <Link 
              to="/admin/courses/upload"
              className="mt-6 flex items-center gap-3 py-3 px-4 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:shadow-lg hover:shadow-purple-500/20 hover:brightness-110 transition-all"
            >
              <Upload className="h-5 w-5" />
              <span>رفع كورس جديد</span>
            </Link>
          </nav>
        </div>
        
        <div className="p-4 mt-auto border-t border-white/10">
          <button 
            onClick={logout}
            className="flex items-center gap-3 w-full text-gray-400 hover:text-white transition-all p-3 rounded-xl hover:bg-white/5"
          >
            <LogOut className="h-5 w-5" />
            <span>تسجيل خروج</span>
          </button>
        </div>
      </aside>
      
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
