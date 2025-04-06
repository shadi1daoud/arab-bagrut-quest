
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { User, Bell, Phone, Moon, Sun, Save, Shield, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [grade, setGrade] = useState(user?.grade || '');
  const [city, setCity] = useState(user?.city || '');
  const [notifications, setNotifications] = useState(true);
  const [whatsapp, setWhatsapp] = useState('');
  const [darkMode, setDarkMode] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      // Update user profile
      updateUser({
        name,
        grade,
        city,
      });
      
      toast({
        title: "تم حفظ الإعدادات",
        description: "تم تحديث معلومات الملف الشخصي بنجاح",
      });
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء حفظ الإعدادات",
        variant: "destructive",
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
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "تم الربط بنجاح",
      description: "تم ربط حسابك مع واتساب للتذكيرات",
    });
  };
  
  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
    toast({
      title: "تم تغيير الوضع",
      description: darkMode ? "تم تفعيل الوضع النهاري" : "تم تفعيل الوضع الليلي",
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white font-changa flex items-center">
        <Shield className="mr-2 h-7 w-7 text-game-primary" />
        الإعدادات
      </h1>
      
      {/* User Profile Summary */}
      <div className="settings-card p-6">
        <div className="flex items-center gap-4">
          <div className="orbit-container">
            <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-game-primary/30 shadow-lg bg-gradient-to-br from-game-card-bg to-game-card-bg-alt flex items-center justify-center">
              <span className="text-2xl font-bold text-white">{user?.name?.charAt(0) || 'S'}</span>
            </div>
            <div className="orbit-particle"></div>
            <div className="orbit-particle"></div>
            <div className="orbit-particle"></div>
          </div>
          <div className="ml-4">
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
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Settings */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="settings-card">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 rounded-lg bg-game-primary/10 text-game-primary">
                <User className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-semibold text-white font-changa">الملف الشخصي</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  الاسم الكامل
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-game-card-bg border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-game-primary/50 focus:border-game-primary/50 transition-colors"
                  placeholder="أدخل اسمك الكامل"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  الصف
                </label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-game-card-bg border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-game-primary/50 focus:border-game-primary/50 transition-colors"
                  required
                >
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
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-game-card-bg border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-game-primary/50 focus:border-game-primary/50 transition-colors"
                  placeholder="أدخل اسم مدينتك"
                />
              </div>
              
              <div className="pt-4">
                <button
                  type="submit"
                  className={`game-btn flex items-center gap-2 ${isSaving ? 'opacity-70 cursor-not-allowed' : ''}`}
                  disabled={isSaving}
                >
                  <Save className="h-4 w-4" />
                  {isSaving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
                </button>
              </div>
            </div>
          </form>
        </div>
        
        {/* Other Settings */}
        <div className="space-y-6">
          {/* Notifications */}
          <div className="settings-card">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 rounded-lg bg-game-accent/10 text-game-accent">
                <Bell className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-semibold text-white font-changa">الإشعارات</h2>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-300">تفعيل الإشعارات</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={notifications}
                  onChange={() => setNotifications(!notifications)}
                />
                <div className="toggle-switch">
                  <span className="toggle-switch-thumb"></span>
                </div>
              </label>
            </div>
          </div>
          
          {/* WhatsApp Connection */}
          <div className="settings-card">
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
                <input
                  type="tel"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-lg bg-game-card-bg border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-game-accent/50 focus:border-game-accent/50 transition-colors"
                  placeholder="رقم الهاتف"
                />
                <button
                  type="button"
                  onClick={handleConnectWhatsApp}
                  className="game-btn-outline"
                >
                  ربط
                </button>
              </div>
            </div>
          </div>
          
          {/* Theme Switch */}
          <div className="settings-card">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 rounded-lg bg-yellow-500/10 text-yellow-500">
                {darkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </div>
              <h2 className="text-xl font-semibold text-white font-changa">المظهر</h2>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-300">{darkMode ? 'الوضع الليلي' : 'الوضع النهاري'}</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={darkMode}
                  onChange={handleToggleDarkMode}
                />
                <div className="toggle-switch">
                  <span className="toggle-switch-thumb"></span>
                </div>
              </label>
            </div>
          </div>
          
          {/* Language Settings */}
          <div className="settings-card">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
                <Globe className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-semibold text-white font-changa">اللغة</h2>
            </div>
            
            <div className="flex items-center justify-between">
              <select
                className="w-full px-4 py-3 rounded-lg bg-game-card-bg border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-colors"
              >
                <option value="ar">العربية</option>
                <option value="en">English</option>
                <option value="he">עברית</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
