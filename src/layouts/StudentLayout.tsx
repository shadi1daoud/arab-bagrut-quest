import { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Home, BookOpen, ShoppingCart, Users, Settings, LogOut, Menu, X, Bell, Search, Flame, Award, ChevronRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/theme-nebula.css';
const StudentLayout = () => {
  const {
    user,
    logout
  } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);
  const navItems = [{
    path: '/',
    label: 'الرئيسية',
    icon: Home
  }, {
    path: '/courses',
    label: 'كورساتي',
    icon: BookOpen
  }, {
    path: '/shop',
    label: 'المتجر',
    icon: ShoppingCart
  }, {
    path: '/community',
    label: 'المجتمع',
    icon: Users
  }, {
    path: '/settings',
    label: 'الإعدادات',
    icon: Settings
  }];
  const toggleMenu = () => {
    setIsMenuCollapsed(!isMenuCollapsed);
  };
  const NavItem = ({
    path,
    label,
    icon: Icon
  }: {
    path: string;
    label: string;
    icon: any;
  }) => {
    const isActive = location.pathname === path;
    return <NavLink to={path} className={({
      isActive
    }) => cn("sidebar-item flex items-center gap-3 py-3 px-4 rounded-xl transition-all", isActive ? "active border border-[rgba(255,72,0,0.2)]" : "text-gray-400 hover:text-white hover:bg-white/5")}>
        <div className={cn("sidebar-icon flex items-center justify-center w-8 h-8 rounded-lg transition-all", isActive ? "bg-[#FF4800] text-white shadow-[0_0_15px_rgba(255,72,0,0.4)]" : "bg-white/5 text-gray-400")}>
          <Icon className="h-5 w-5" />
        </div>
        
        <AnimatePresence initial={false}>
          {!isMenuCollapsed && <motion.span initial={{
          opacity: 0,
          width: 0
        }} animate={{
          opacity: 1,
          width: "auto"
        }} exit={{
          opacity: 0,
          width: 0
        }} transition={{
          duration: 0.2
        }} className="ml-3 whitespace-nowrap overflow-hidden font-['Noto_Sans_Arabic']">
              {label}
            </motion.span>}
        </AnimatePresence>
      </NavLink>;
  };

  // Create particles for star field effect
  const createStars = () => {
    const stars = [];
    for (let i = 0; i < 100; i++) {
      const size = Math.random() * 3 + 1;
      stars.push({
        id: i,
        size,
        left: Math.random() * 100,
        top: Math.random() * 100,
        animationDelay: Math.random() * 4,
        animationDuration: Math.random() * 3 + 2
      });
    }
    return stars;
  };
  const stars = createStars();
  return <div className="h-screen w-full flex overflow-hidden bg-transparent">
      {/* Background effects */}
      <div className="star-field">
        {stars.map(star => <div key={star.id} className="star" style={{
        width: `${star.size}px`,
        height: `${star.size}px`,
        left: `${star.left}%`,
        top: `${star.top}%`,
        animationDelay: `${star.animationDelay}s`,
        animationDuration: `${star.animationDuration}s`
      }} />)}
      </div>
      <div className="grid-overlay"></div>
      
      {/* Sidebar - controllable expand/collapse */}
      <motion.aside initial={false} animate={{
      width: isMenuCollapsed ? "72px" : "220px"
    }} transition={{
      duration: 0.3,
      ease: "easeInOut"
    }} className={cn("fixed inset-y-0 right-0 z-30 transform lg:translate-x-0 lg:static flex flex-col overflow-hidden", isMobileMenuOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0")} data-state={isMenuCollapsed ? "collapsed" : "expanded"}>
        <div className="p-4 flex items-center justify-between">
          <div className={cn("flex items-center", isMenuCollapsed ? "justify-center w-full" : "")}>
            <div id="logo-wrapper">
              <img alt="Darsni" src="/lovable-uploads/389a6f4c-bab8-4bbc-aa92-54a785b1a946.png" className="logo-full object-scale-down" />
              <img className="logo-mini" src="/assets/images/darsni-icon.svg" alt="" />
            </div>
          </div>
          
          <button onClick={toggleMenu} className="">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        
        {user && <div className={cn("px-4 py-2 flex items-center gap-3 relative overflow-hidden border-b border-white/5", isMenuCollapsed ? "justify-center" : "")}>
            <div className="relative flex-shrink-0 glow-effect">
              <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-[#FF4800]/20 shadow-lg">
                {user?.avatar ? <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" /> : <div className="h-full w-full bg-gradient-to-br from-[#10122A] to-[#0B0D19] flex items-center justify-center">
                    <span className="text-white text-xl font-bold font-['Changa']">{user?.name?.charAt(0)}</span>
                  </div>}
              </div>
              <div className="absolute -top-1 -right-1 h-5 w-5 bg-[#FF4800] rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-[#FF4800]/20 font-['Share_Tech_Mono']">5</div>
            </div>
            
            <AnimatePresence initial={false}>
              {!isMenuCollapsed && <motion.div initial={{
            opacity: 0,
            width: 0
          }} animate={{
            opacity: 1,
            width: "auto"
          }} exit={{
            opacity: 0,
            width: 0
          }} className="flex-1 min-w-0">
                  <h2 className="text-white font-bold text-base font-['Changa'] truncate">{user?.name || 'شادي داود'}</h2>
                  <p className="text-[var(--color-text-muted)] text-xs mb-1 font-['Noto_Sans_Arabic'] truncate">{user?.grade || 'الثاني عشر'}</p>
                  
                  <div className="flex justify-between items-center text-sm mb-1">
                    <span className="text-[#FF4800] font-medium font-['Share_Tech_Mono']">Lv 5</span>
                    <span className="text-xs font-['Share_Tech_Mono'] text-[#ff4800]">2450/3000</span>
                  </div>
                  
                  <div className="progress-bar">
                    <div className="progress-bar-fill" style={{
                width: "60%"
              }}></div>
                  </div>
                </motion.div>}
            </AnimatePresence>
          </div>}
        
        <div className={cn("overflow-y-auto flex-1 py-4 px-2", isMenuCollapsed ? "flex flex-col items-center" : "")}>
          <nav className="space-y-2">
            {navItems.map(item => <NavItem key={item.path} {...item} />)}
          </nav>
        </div>
        
        <div className={cn("p-3 mt-auto border-t border-white/5", isMenuCollapsed ? "flex justify-center" : "")}>
          <button onClick={logout} className={cn("flex items-center gap-3 text-gray-400 hover:text-white transition-all p-2 rounded-lg hover:bg-white/5", isMenuCollapsed ? "justify-center w-10 h-10" : "w-full")}>
            <LogOut className="h-5 w-5" />
            <AnimatePresence initial={false}>
              {!isMenuCollapsed && <motion.span initial={{
              opacity: 0,
              width: 0
            }} animate={{
              opacity: 1,
              width: "auto"
            }} exit={{
              opacity: 0,
              width: 0
            }} transition={{
              duration: 0.2
            }} className="font-['Noto_Sans_Arabic']">
                  تسجيل خروج
                </motion.span>}
            </AnimatePresence>
          </button>
        </div>
      </motion.aside>
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Header - more compact */}
        <header>
          <div className="py-2 px-4 flex justify-between items-center">
            <div className="flex items-center">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2 text-white">
                {isMobileMenuOpen ? <X /> : <Menu />}
              </button>
              
              <div className="relative mx-2 hidden md:block">
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Search className="h-4 w-4 text-gray-500" />
                </div>
                <input type="search" className="bg-white/5 border border-white/5 text-white text-sm rounded-full block w-56 pr-10 p-1.5 placeholder-gray-500 focus:ring-1 focus:ring-[#FF4800]/30 focus:border-[#FF4800]/30 transition-all" placeholder="ابحث..." />
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {user && <>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 glass-card py-1 px-2 rounded-full border border-white/5">
                      <Flame className="h-3.5 w-3.5 text-[#FF4800]" />
                      <span className="text-white font-['Share_Tech_Mono'] text-sm">12</span>
                    </div>
                    
                    <div className="hidden md:block h-4 w-px bg-white/10"></div>
                    
                    <div className="flex items-center gap-2">
                      <div className="glass-card py-1 px-2 rounded-full border border-white/5 hidden md:flex items-center gap-1.5">
                        <Award className="h-3.5 w-3.5 text-[#FF4800]" />
                        <span className="text-white font-['Share_Tech_Mono'] text-sm">8965</span>
                      </div>
                      
                      <button className="relative text-gray-400 hover:text-white group">
                        <Bell className="h-5 w-5" />
                        <span className="absolute -top-1 -right-1 bg-[#FF4800] w-4 h-4 rounded-full text-xs flex items-center justify-center">
                          3
                        </span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-white">
                    <span className="text-[#FF4800] mr-1 text-sm font-['Changa']">👋 أهلاً،</span>
                    <span className="mr-1 text-sm font-['Changa']">{user?.name?.split(' ')[0] || 'شادي'}</span>
                  </div>
                </>}
            </div>
          </div>
        </header>
        
        {/* Main content with fixed height */}
        <main className="flex-1 p-3 overflow-hidden relative z-10 h-[calc(100vh-56px)]">
          <Outlet />
        </main>
      </div>
    </div>;
};
export default StudentLayout;