import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { User, Bell, Phone, Moon, Sun, Save, Shield, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tab } from '@headlessui/react';
import { motion } from 'framer-motion';

// Define tab categories
const tabs = [{
  key: 'profile',
  name: 'الملف الشخصي',
  icon: User
}, {
  key: 'notifications',
  name: 'الإشعارات',
  icon: Bell
}, {
  key: 'connection',
  name: 'الاتصال',
  icon: Phone
}, {
  key: 'appearance',
  name: 'المظهر',
  icon: Sun
}, {
  key: 'language',
  name: 'اللغة',
  icon: Globe
}];
const Settings = () => {
  const {
    user,
    updateUser
  } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [grade, setGrade] = useState(user?.grade || '');
  const [city, setCity] = useState(user?.city || '');
  const [notifications, setNotifications] = useState(true);
  const [whatsapp, setWhatsapp] = useState('');
  const [darkMode, setDarkMode] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const {
    toast
  } = useToast();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      // Update user profile
      updateUser({
        name,
        grade,
        city
      });
      toast({
        title: "تم حفظ الإعدادات",
        description: "تم تحديث معلومات الملف الشخصي بنجاح"
      });
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء حفظ الإعدادات",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };
  const handleConnectWhatsApp = () => {
    if (!whatsapp) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال رقم هاتف صالح",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "تم الربط بنجاح",
      description: "تم ربط حسابك مع واتساب للتذكيرات"
    });
  };
  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
    toast({
      title: "تم تغيير الوضع",
      description: darkMode ? "تم تفعيل الوضع النهاري" : "تم تفعيل الوضع الليلي"
    });
  };
  return <div className="h-full overflow-hidden">
      <div className="flex flex-col h-full">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-white font-changa flex items-center my-[10px]">
            <Shield className="mr-2 h-7 w-7 text-game-primary" />
            الإعدادات
          </h1>
          <p className="text-gray-400 mt-1">تخصيص وإدارة حسابك</p>
        </div>
        
        {/* User Profile Summary */}
        <div className="settings-card p-4 mb-4">
          <div className="flex items-center gap-4">
            <div className="orbit-container">
              <div className="h-14 w-14 rounded-full overflow-hidden border-2 border-game-primary/30 shadow-lg bg-gradient-to-br from-game-card-bg to-game-card-bg-alt flex items-center justify-center">
                <span className="text-xl font-bold text-white">{user?.name?.charAt(0) || 'S'}</span>
              </div>
              <div className="orbit-particle"></div>
              <div className="orbit-particle"></div>
              <div className="orbit-particle"></div>
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">{user?.name || 'شادي داود'}</h2>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-xs px-2 py-0.5 bg-game-primary/20 text-game-primary rounded-full border border-game-primary/30">
                  المستوى 5
                </span>
                <span className="text-xs px-2 py-0.5 bg-game-accent/10 text-game-accent rounded-full font-share-tech">
                  XP 2,450
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabbed Settings Interface */}
        <div className="flex-1 overflow-hidden">
          <Tab.Group>
            <div className="flex h-full">
              {/* Tab Navigation */}
              <Tab.List className="w-48 bg-game-card-bg rounded-lg p-2 mr-4">
                {tabs.map(tab => <Tab key={tab.key} className={({
                selected
              }) => `w-full flex items-center gap-2 py-3 px-4 mb-1 rounded-lg text-sm transition-all ${selected ? 'bg-game-primary/20 text-white font-medium' : 'text-gray-400 hover:text-white hover:bg-game-card-bg-alt'}`}>
                    <tab.icon className="h-4 w-4" />
                    <span>{tab.name}</span>
                  </Tab>)}
              </Tab.List>
              
              {/* Tab Panels */}
              <Tab.Panels className="flex-1 overflow-hidden bg-game-card-bg rounded-lg">
                {/* Profile Settings */}
                <Tab.Panel className="h-full p-6 outline-none">
                  <motion.div initial={{
                  opacity: 0
                }} animate={{
                  opacity: 1
                }} transition={{
                  duration: 0.3
                }}>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="p-2 rounded-lg bg-game-primary/10 text-game-primary">
                          <User className="h-5 w-5" />
                        </div>
                        <h2 className="text-xl font-semibold text-white font-changa">الملف الشخصي</h2>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          الاسم الكامل
                        </label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-3 rounded-lg bg-game-card-bg border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-game-primary/50 focus:border-game-primary/50 transition-colors" placeholder="أدخل اسمك الكامل" required />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          الصف
                        </label>
                        <select value={grade} onChange={e => setGrade(e.target.value)} className="w-full px-4 py-3 rounded-lg bg-game-card-bg border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-game-primary/50 focus:border-game-primary/50 transition-colors" required>
                          <option value="">اختر الصف</option>
                          <option value="العاشر">العاشر</option>
                          <option value="الحادي عشر">الحادي عشر</option>
                          <option value="الثاني عشر">الثاني عشر</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          المدينة
                        </label>
                        <input type="text" value={city} onChange={e => setCity(e.target.value)} className="w-full px-4 py-3 rounded-lg bg-game-card-bg border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-game-primary/50 focus:border-game-primary/50 transition-colors" placeholder="أدخل اسم مدينتك" />
                      </div>
                      
                      <div className="pt-4">
                        <button type="submit" className={`game-btn flex items-center gap-2 ${isSaving ? 'opacity-70 cursor-not-allowed' : ''}`} disabled={isSaving}>
                          <Save className="h-4 w-4" />
                          {isSaving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
                        </button>
                      </div>
                    </form>
                  </motion.div>
                </Tab.Panel>
                
                {/* Notifications Settings */}
                <Tab.Panel className="h-full p-6 outline-none">
                  <motion.div initial={{
                  opacity: 0
                }} animate={{
                  opacity: 1
                }} transition={{
                  duration: 0.3
                }} className="h-full">
                    <div className="flex items-center gap-2 mb-6">
                      <div className="p-2 rounded-lg bg-game-accent/10 text-game-accent">
                        <Bell className="h-5 w-5" />
                      </div>
                      <h2 className="text-xl font-semibold text-white font-changa">الإشعارات</h2>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="flex items-center justify-between bg-game-card-bg-alt p-4 rounded-lg">
                        <div>
                          <h3 className="font-medium text-white">تنبيهات التطبيق</h3>
                          <p className="text-sm text-gray-400 mt-1">استلام إشعارات داخل التطبيق</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" checked={notifications} onChange={() => setNotifications(!notifications)} />
                          <div className="toggle-switch">
                            <span className="toggle-switch-thumb"></span>
                          </div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between bg-game-card-bg-alt p-4 rounded-lg">
                        <div>
                          <h3 className="font-medium text-white">تذكيرات الدراسة</h3>
                          <p className="text-sm text-gray-400 mt-1">تذكير يومي لإكمال دروسك</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" checked={true} />
                          <div className="toggle-switch">
                            <span className="toggle-switch-thumb"></span>
                          </div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between bg-game-card-bg-alt p-4 rounded-lg">
                        <div>
                          <h3 className="font-medium text-white">إشعارات التحديات</h3>
                          <p className="text-sm text-gray-400 mt-1">إشعارات عند وجود تحديات جديدة</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" checked={true} />
                          <div className="toggle-switch">
                            <span className="toggle-switch-thumb"></span>
                          </div>
                        </label>
                      </div>
                    </div>
                  </motion.div>
                </Tab.Panel>
                
                {/* Connection Settings */}
                <Tab.Panel className="h-full p-6 outline-none">
                  <motion.div initial={{
                  opacity: 0
                }} animate={{
                  opacity: 1
                }} transition={{
                  duration: 0.3
                }}>
                    <div className="flex items-center gap-2 mb-6">
                      <div className="p-2 rounded-lg bg-green-500/10 text-green-500">
                        <Phone className="h-5 w-5" />
                      </div>
                      <h2 className="text-xl font-semibold text-white font-changa">ربط مع واتساب</h2>
                    </div>
                    
                    <div className="space-y-4">
                      <p className="text-sm text-gray-300">
                        اربط حسابك مع واتساب لتلقي تذكيرات الدراسة والتحديات اليومية
                      </p>
                      
                      <div className="flex gap-2">
                        <input type="tel" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} className="flex-1 px-4 py-3 rounded-lg bg-game-card-bg border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-game-accent/50 focus:border-game-accent/50 transition-colors" placeholder="رقم الهاتف" />
                        <button type="button" onClick={handleConnectWhatsApp} className="game-btn-outline">
                          ربط
                        </button>
                      </div>
                      
                      <div className="mt-8">
                        <h3 className="font-medium text-white mb-3">خدمات أخرى</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center bg-game-card-bg-alt p-4 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="h-8 w-8 rounded-lg bg-[#4267B2]/20 flex items-center justify-center text-[#4267B2]">
                                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                              </div>
                              <span className="text-white">فيسبوك</span>
                            </div>
                            <button className="px-3 py-1 rounded-lg bg-game-card-bg text-game-accent border border-game-accent/30 text-sm">
                              ربط
                            </button>
                          </div>
                          
                          <div className="flex justify-between items-center bg-game-card-bg-alt p-4 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="h-8 w-8 rounded-lg bg-[#1DA1F2]/20 flex items-center justify-center text-[#1DA1F2]">
                                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 9.99 9.99 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z" />
                                </svg>
                              </div>
                              <span className="text-white">تويتر</span>
                            </div>
                            <button className="px-3 py-1 rounded-lg bg-game-card-bg text-game-accent border border-game-accent/30 text-sm">
                              ربط
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Tab.Panel>
                
                {/* Appearance Settings */}
                <Tab.Panel className="h-full p-6 outline-none">
                  <motion.div initial={{
                  opacity: 0
                }} animate={{
                  opacity: 1
                }} transition={{
                  duration: 0.3
                }}>
                    <div className="flex items-center gap-2 mb-6">
                      <div className="p-2 rounded-lg bg-yellow-500/10 text-yellow-500">
                        {darkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                      </div>
                      <h2 className="text-xl font-semibold text-white font-changa">المظهر</h2>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className={`bg-[#0F0C1D] rounded-lg p-4 flex flex-col items-center border-2 hover:border-game-primary cursor-pointer transition-all ${darkMode ? 'border-game-primary' : 'border-transparent'}`} onClick={() => setDarkMode(true)}>
                        <div className="w-full h-32 mb-4 rounded-md bg-game-card-bg flex flex-col items-center justify-center">
                          <div className="w-3/4 h-4 rounded-full bg-game-primary/40 mb-2"></div>
                          <div className="w-1/2 h-4 rounded-full bg-gray-700 mb-2"></div>
                          <div className="w-2/3 h-4 rounded-full bg-gray-700"></div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Moon className="h-4 w-4 text-gray-400" />
                          <span className="text-white">الوضع الليلي</span>
                        </div>
                      </div>
                      
                      <div className={`bg-[#F8F9FA] rounded-lg p-4 flex flex-col items-center border-2 hover:border-game-primary cursor-pointer transition-all ${!darkMode ? 'border-game-primary' : 'border-transparent'}`} onClick={() => setDarkMode(false)}>
                        <div className="w-full h-32 mb-4 rounded-md bg-white shadow-sm flex flex-col items-center justify-center">
                          <div className="w-3/4 h-4 rounded-full bg-game-primary/40 mb-2"></div>
                          <div className="w-1/2 h-4 rounded-full bg-gray-300 mb-2"></div>
                          <div className="w-2/3 h-4 rounded-full bg-gray-300"></div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Sun className="h-4 w-4 text-gray-700" />
                          <span className="text-gray-700">الوضع النهاري</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <button className="w-full py-3 bg-game-primary/20 text-game-primary rounded-lg border border-game-primary/20 hover:bg-game-primary/30 transition-colors" onClick={handleToggleDarkMode}>
                        تطبيق {darkMode ? 'الوضع الليلي' : 'الوضع النهاري'}
                      </button>
                    </div>
                  </motion.div>
                </Tab.Panel>
                
                {/* Language Settings */}
                <Tab.Panel className="h-full p-6 outline-none">
                  <motion.div initial={{
                  opacity: 0
                }} animate={{
                  opacity: 1
                }} transition={{
                  duration: 0.3
                }}>
                    <div className="flex items-center gap-2 mb-6">
                      <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
                        <Globe className="h-5 w-5" />
                      </div>
                      <h2 className="text-xl font-semibold text-white font-changa">اللغة</h2>
                    </div>
                    
                    <div className="space-y-4">
                      <p className="text-sm text-gray-300">
                        اختر لغة واجهة التطبيق
                      </p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-game-card-bg-alt border border-white/10 p-4 rounded-lg flex items-center justify-between cursor-pointer hover:border-purple-500/30 transition-all">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">🇦🇪</span>
                            <span className="text-white">العربية</span>
                          </div>
                          <div className="h-4 w-4 rounded-full bg-purple-500 flex items-center justify-center">
                            <div className="h-2 w-2 rounded-full bg-white"></div>
                          </div>
                        </div>
                        
                        <div className="bg-game-card-bg-alt border border-white/5 p-4 rounded-lg flex items-center justify-between cursor-pointer hover:border-purple-500/30 transition-all">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">🇺🇸</span>
                            <span className="text-white">English</span>
                          </div>
                          <div className="h-4 w-4 rounded-full border border-gray-600"></div>
                        </div>
                        
                        <div className="bg-game-card-bg-alt border border-white/5 p-4 rounded-lg flex items-center justify-between cursor-pointer hover:border-purple-500/30 transition-all">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">🇮🇱</span>
                            <span className="text-white">עברית</span>
                          </div>
                          <div className="h-4 w-4 rounded-full border border-gray-600"></div>
                        </div>
                      </div>
                      
                      <div className="mt-8">
                        <button className="game-btn w-full justify-center">
                          حفظ إعدادات اللغة
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </Tab.Panel>
              </Tab.Panels>
            </div>
          </Tab.Group>
        </div>
      </div>
    </div>;
};
export default Settings;