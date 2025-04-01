import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { User, Bell, Phone, Moon, Sun, Save } from 'lucide-react';
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
      <h1 className="text-2xl font-bold text-white">الإعدادات</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Settings */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="game-panel">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <User className="h-5 w-5" />
              الملف الشخصي
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  الاسم الكامل
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-1 focus:ring-game-primary"
                  placeholder="أدخل اسمك الكامل"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  الصف
                </label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-1 focus:ring-game-primary"
                  required
                >
                  <option value="">اختر الصف</option>
                  <option value="العاشر">العاشر</option>
                  <option value="الحادي عشر">الحادي عشر</option>
                  <option value="الثاني عشر">الثاني عشر</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  المدينة
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-1 focus:ring-game-primary"
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
          <div className="game-panel">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Bell className="h-5 w-5" />
              الإشعارات
            </h2>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-400">تفعيل الإشعارات</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={notifications}
                  onChange={() => setNotifications(!notifications)}
                />
                <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] after:content-[''] after:absolute after:top-0.5 after:right-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-game-primary"></div>
              </label>
            </div>
          </div>
          
          {/* WhatsApp Connection */}
          <div className="game-panel">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Phone className="h-5 w-5" />
              ربط مع واتساب
            </h2>
            
            <div className="space-y-4">
              <p className="text-sm text-gray-400">
                اربط حسابك مع واتساب لتلقي تذكيرات الدراسة
              </p>
              
              <div className="flex gap-2">
                <input
                  type="tel"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-1 focus:ring-game-primary"
                  placeholder="رقم الهاتف"
                />
                <button
                  type="button"
                  onClick={handleConnectWhatsApp}
                  className="game-btn"
                >
                  ربط
                </button>
              </div>
            </div>
          </div>
          
          {/* Theme Switch */}
          <div className="game-panel">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              {darkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              المظهر
            </h2>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-400">{darkMode ? 'الوضع الليلي' : 'الوضع النهاري'}</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={darkMode}
                  onChange={handleToggleDarkMode}
                />
                <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] after:content-[''] after:absolute after:top-0.5 after:right-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-game-primary"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
