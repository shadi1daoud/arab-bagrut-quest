
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { User, Bell, Phone, Moon, Sun, Save, Shield, Globe, ArrowRight, ChevronRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tab } from '@headlessui/react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch'; 
import { Toggle } from '@/components/ui/toggle';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
  const { toast } = useToast();
  
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
  
  const tabContentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };
  
  return (
    <div className="h-full overflow-hidden relative">
      {/* Fixed: Removed StarParticles with className prop causing the error */}
      <div className="absolute inset-0 z-0 opacity-20">
        {/* Subtle background pattern instead of starry particles */}
        <div className="h-full w-full bg-gradient-to-br from-black to-[#111] opacity-80"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NWgtMXYtNXptNiAwaDF2NWgtMXYtNXptLTExIDBoMXYyaC0xdi0yek0yNSAzM2gxdjJoLTF2LTJ6bTUgMGgxdjJoLTF2LTJ6bTUgMGgxdjJoLTF2LTJ6bTUgMGgxdjJoLTF2LTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
      </div>
      
      <div className="flex flex-col h-full z-10 relative">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-white font-changa flex items-center gap-3 py-2">
            <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-[#FF4800]/10 text-[#FF4800]">
              <Shield className="h-5 w-5" />
            </div>
            الإعدادات
          </h1>
          <p className="text-gray-400 mt-1 pr-1">تخصيص وإدارة حسابك والإشعارات</p>
        </div>
        
        {/* User Profile Summary */}
        <Card className="mb-4 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#FF4800]/5 to-transparent opacity-50 pointer-events-none"></div>
          <CardContent className="p-4 relative z-10">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="h-14 w-14 rounded-full overflow-hidden border-2 border-[#FF4800] shadow-lg bg-gradient-to-br from-black to-[#201F24] flex items-center justify-center">
                  <span className="text-xl font-bold text-white">{user?.name?.charAt(0) || 'S'}</span>
                </div>
                <div className="absolute h-3 w-3 bg-green-500 rounded-full border border-black -top-1 -right-1"></div>
                {/* Removed the orbit-particle div */}
              </div>
              
              <div>
                <h2 className="text-lg font-bold text-white font-changa">{user?.name || 'شادي داود'}</h2>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs px-2 py-0.5 bg-[#FF4800]/20 text-[#FF4800] rounded-full border border-[#FF4800]/30 font-noto-arabic">
                    المستوى 5
                  </span>
                  <span className="text-xs px-2 py-0.5 bg-[#FF4800]/10 text-[#FF4800] rounded-full font-share-tech">
                    XP 2,450
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Tabbed Settings Interface */}
        <Card className="flex-1 overflow-hidden">
          <Tab.Group>
            <div className="flex h-full">
              {/* Tab Navigation */}
              <div className="w-48 border-l border-white/5 p-2">
                <Tab.List className="space-y-1">
                  {tabs.map((tab) => (
                    <Tab key={tab.key} className={({selected}) => `
                      w-full flex items-center gap-2 py-2.5 px-3 rounded-lg text-sm 
                      transition-all relative overflow-hidden
                      ${selected ? 'bg-[#FF4800]/10 text-white font-medium' : 'text-gray-400 hover:text-white hover:bg-white/5'}
                    `}>
                      {({selected}) => (
                        <>
                          <div className={`h-7 w-7 rounded-md flex items-center justify-center ${selected ? 'bg-[#FF4800]/20 text-[#FF4800]' : 'bg-black/30'}`}>
                            <tab.icon className="h-4 w-4" />
                          </div>
                          <span className="font-noto-arabic">{tab.name}</span>
                          {selected && (
                            <motion.div 
                              layoutId="tab-highlight" 
                              className="absolute inset-0 border-l-2 border-[#FF4800] right-0 rounded-l" 
                              initial={false}
                              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                          )}
                          {selected && (
                            <ChevronRight className="absolute right-2 h-4 w-4 text-[#FF4800]" />
                          )}
                        </>
                      )}
                    </Tab>
                  ))}
                </Tab.List>
              </div>
              
              {/* Tab Panels */}
              <div className="flex-1 overflow-auto scrollbar-none">
                <Tab.Panels className="h-full">
                  {/* Profile Settings */}
                  <Tab.Panel className="h-full p-6 outline-none">
                    <motion.div 
                      variants={tabContentVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex items-center gap-2 mb-6">
                          <div className="p-2 rounded-lg bg-[#FF4800]/10 text-[#FF4800]">
                            <User className="h-5 w-5" />
                          </div>
                          <h2 className="text-xl font-semibold text-white font-changa">الملف الشخصي</h2>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1.5 font-noto-arabic">
                              الاسم الكامل
                            </label>
                            <Input 
                              type="text" 
                              value={name} 
                              onChange={e => setName(e.target.value)} 
                              className="w-full bg-black/40 border-white/10 focus-visible:ring-[#FF4800]/50 font-noto-arabic"
                              placeholder="أدخل اسمك الكامل" 
                              required 
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1.5 font-noto-arabic">
                              الصف
                            </label>
                            <select 
                              value={grade} 
                              onChange={e => setGrade(e.target.value)} 
                              className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white 
                                        focus:outline-none focus:ring-2 focus:ring-[#FF4800]/50 focus:border-[#FF4800]/50 
                                        transition-colors font-noto-arabic" 
                              required
                            >
                              <option value="">اختر الصف</option>
                              <option value="العاشر">العاشر</option>
                              <option value="الحادي عشر">الحادي عشر</option>
                              <option value="الثاني عشر">الثاني عشر</option>
                            </select>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1.5 font-noto-arabic">
                              المدينة
                            </label>
                            <Input 
                              type="text" 
                              value={city} 
                              onChange={e => setCity(e.target.value)} 
                              className="w-full bg-black/40 border-white/10 focus-visible:ring-[#FF4800]/50 font-noto-arabic"
                              placeholder="أدخل اسم مدينتك" 
                            />
                          </div>
                        </div>
                        
                        <div className="pt-4">
                          <Button 
                            type="submit" 
                            className="font-noto-arabic flex items-center gap-2" 
                            disabled={isSaving}
                          >
                            <Save className="h-4 w-4" />
                            {isSaving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
                          </Button>
                        </div>
                      </form>
                    </motion.div>
                  </Tab.Panel>
                  
                  {/* Notifications Settings */}
                  <Tab.Panel className="h-full p-6 outline-none">
                    <motion.div 
                      variants={tabContentVariants}
                      initial="hidden"
                      animate="visible" 
                      className="h-full"
                    >
                      <div className="flex items-center gap-2 mb-6">
                        <div className="p-2 rounded-lg bg-[#FF4800]/10 text-[#FF4800]">
                          <Bell className="h-5 w-5" />
                        </div>
                        <h2 className="text-xl font-semibold text-white font-changa">الإشعارات</h2>
                      </div>
                      
                      <div className="space-y-4">
                        <Card className="overflow-hidden border-white/5 hover:border-[#FF4800]/20 transition-all duration-300">
                          <CardContent className="p-4 flex items-center justify-between">
                            <div>
                              <h3 className="font-medium text-white font-noto-arabic">تنبيهات التطبيق</h3>
                              <p className="text-sm text-gray-400 mt-1 font-noto-arabic">استلام إشعارات داخل التطبيق</p>
                            </div>
                            <Switch 
                              checked={notifications} 
                              onCheckedChange={() => setNotifications(!notifications)}
                              className="data-[state=checked]:bg-[#FF4800]"
                            />
                          </CardContent>
                        </Card>
                        
                        <Card className="overflow-hidden border-white/5 hover:border-[#FF4800]/20 transition-all duration-300">
                          <CardContent className="p-4 flex items-center justify-between">
                            <div>
                              <h3 className="font-medium text-white font-noto-arabic">تذكيرات الدراسة</h3>
                              <p className="text-sm text-gray-400 mt-1 font-noto-arabic">تذكير يومي لإكمال دروسك</p>
                            </div>
                            <Switch 
                              defaultChecked 
                              className="data-[state=checked]:bg-[#FF4800]"
                            />
                          </CardContent>
                        </Card>
                        
                        <Card className="overflow-hidden border-white/5 hover:border-[#FF4800]/20 transition-all duration-300">
                          <CardContent className="p-4 flex items-center justify-between">
                            <div>
                              <h3 className="font-medium text-white font-noto-arabic">إشعارات التحديات</h3>
                              <p className="text-sm text-gray-400 mt-1 font-noto-arabic">إشعارات عند وجود تحديات جديدة</p>
                            </div>
                            <Switch 
                              defaultChecked
                              className="data-[state=checked]:bg-[#FF4800]"
                            />
                          </CardContent>
                        </Card>
                      </div>
                    </motion.div>
                  </Tab.Panel>
                  
                  {/* Connection Settings */}
                  <Tab.Panel className="h-full p-6 outline-none">
                    <motion.div 
                      variants={tabContentVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <div className="flex items-center gap-2 mb-6">
                        <div className="p-2 rounded-lg bg-[#FF4800]/10 text-[#FF4800]">
                          <Phone className="h-5 w-5" />
                        </div>
                        <h2 className="text-xl font-semibold text-white font-changa">ربط مع واتساب</h2>
                      </div>
                      
                      <div className="space-y-4">
                        <p className="text-sm text-gray-300 font-noto-arabic">
                          اربط حسابك مع واتساب لتلقي تذكيرات الدراسة والتحديات اليومية
                        </p>
                        
                        <Card className="overflow-hidden border-white/5">
                          <CardContent className="p-4">
                            <div className="flex gap-2">
                              <Input 
                                type="tel" 
                                value={whatsapp} 
                                onChange={e => setWhatsapp(e.target.value)} 
                                className="flex-1 bg-black/40 border-white/10 focus-visible:ring-[#FF4800]/50 font-noto-arabic"
                                placeholder="رقم الهاتف" 
                              />
                              <Button 
                                variant="outline" 
                                onClick={handleConnectWhatsApp} 
                                className="border-[#FF4800]/30 text-[#FF4800] hover:border-[#FF4800] font-noto-arabic"
                              >
                                ربط
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <div className="mt-8">
                          <h3 className="font-medium text-white mb-3 font-noto-arabic">خدمات أخرى</h3>
                          <div className="space-y-3">
                            <Card className="overflow-hidden border-white/5 hover:border-[#FF4800]/20 transition-all duration-300">
                              <CardContent className="p-4 flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                  <div className="h-8 w-8 rounded-lg bg-[#4267B2]/20 flex items-center justify-center text-[#4267B2]">
                                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                  </div>
                                  <span className="text-white font-noto-arabic">فيسبوك</span>
                                </div>
                                <Button 
                                  variant="outline" 
                                  className="px-3 py-1 h-auto text-sm border-[#FF4800]/30 text-[#FF4800] hover:border-[#FF4800] hover:bg-[#FF4800]/5 font-noto-arabic"
                                >
                                  ربط
                                </Button>
                              </CardContent>
                            </Card>
                            
                            <Card className="overflow-hidden border-white/5 hover:border-[#FF4800]/20 transition-all duration-300">
                              <CardContent className="p-4 flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                  <div className="h-8 w-8 rounded-lg bg-[#1DA1F2]/20 flex items-center justify-center text-[#1DA1F2]">
                                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 9.99 9.99 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z" />
                                    </svg>
                                  </div>
                                  <span className="text-white font-noto-arabic">تويتر</span>
                                </div>
                                <Button 
                                  variant="outline" 
                                  className="px-3 py-1 h-auto text-sm border-[#FF4800]/30 text-[#FF4800] hover:border-[#FF4800] hover:bg-[#FF4800]/5 font-noto-arabic"
                                >
                                  ربط
                                </Button>
                              </CardContent>
                            </Card>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </Tab.Panel>
                  
                  {/* Appearance Settings */}
                  <Tab.Panel className="h-full p-6 outline-none">
                    <motion.div 
                      variants={tabContentVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <div className="flex items-center gap-2 mb-6">
                        <div className="p-2 rounded-lg bg-[#FF4800]/10 text-[#FF4800]">
                          {darkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                        </div>
                        <h2 className="text-xl font-semibold text-white font-changa">المظهر</h2>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div 
                          className={`rounded-xl p-4 flex flex-col items-center border-2 hover:border-[#FF4800] cursor-pointer transition-all 
                                    ${darkMode ? 'border-[#FF4800] bg-gradient-to-br from-[#191919] to-[#0F0C1D]/80' : 'border-transparent bg-[#111]/60'}`} 
                          onClick={() => setDarkMode(true)}
                        >
                          <div className="w-full h-32 mb-4 rounded-md bg-black/40 flex flex-col items-center justify-center overflow-hidden relative p-3">
                            <div className="w-full h-full absolute inset-0">
                              {/* Removed the problematic StarParticles component */}
                              <div className="h-full w-full bg-[#0F0C1D] opacity-70">
                                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NWgtMXYtNXptNiAwaDF2NWgtMXYtNXptLTExIDBoMXYyaC0xdi0yek0yNSAzM2gxdjJoLTF2LTJ6bTUgMGgxdjJoLTF2LTJ6bTUgMGgxdjJoLTF2LTJ6bTUgMGgxdjJoLTF2LTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
                              </div>
                            </div>
                            <div className="relative z-10 space-y-2 w-full">
                              <div className="w-3/4 h-4 rounded-full bg-[#FF4800]/40 mb-2"></div>
                              <div className="w-1/2 h-4 rounded-full bg-gray-700 mb-2"></div>
                              <div className="w-2/3 h-4 rounded-full bg-gray-700"></div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 py-1 px-4 bg-[#FF4800]/10 rounded-full">
                            <Moon className="h-4 w-4 text-[#FF4800]" />
                            <span className="text-white font-noto-arabic">الوضع الليلي</span>
                          </div>
                        </div>
                        
                        <div 
                          className={`rounded-xl p-4 flex flex-col items-center border-2 hover:border-[#FF4800] cursor-pointer transition-all
                                    ${!darkMode ? 'border-[#FF4800] bg-gradient-to-br from-[#F8F9FA] to-[#EAECF3]' : 'border-transparent bg-[#F8F9FA]/10'}`} 
                          onClick={() => setDarkMode(false)}
                        >
                          <div className="w-full h-32 mb-4 rounded-md bg-white shadow-sm flex flex-col items-center justify-center p-4">
                            <div className="w-3/4 h-4 rounded-full bg-[#FF4800]/40 mb-2"></div>
                            <div className="w-1/2 h-4 rounded-full bg-gray-300 mb-2"></div>
                            <div className="w-2/3 h-4 rounded-full bg-gray-300"></div>
                          </div>
                          <div className="flex items-center gap-2 py-1 px-4 bg-[#FF4800]/10 rounded-full">
                            <Sun className="h-4 w-4 text-[#FF4800]" />
                            <span className={`${!darkMode ? 'text-gray-700' : 'text-gray-300'} font-noto-arabic`}>الوضع النهاري</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-8">
                        <Button 
                          className="w-full font-noto-arabic"
                          variant="outline" 
                          onClick={handleToggleDarkMode}
                        >
                          <span className="relative z-10">
                            تطبيق {darkMode ? 'الوضع الليلي' : 'الوضع النهاري'}
                          </span>
                        </Button>
                      </div>
                    </motion.div>
                  </Tab.Panel>
                  
                  {/* Language Settings */}
                  <Tab.Panel className="h-full p-6 outline-none">
                    <motion.div 
                      variants={tabContentVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <div className="flex items-center gap-2 mb-6">
                        <div className="p-2 rounded-lg bg-[#FF4800]/10 text-[#FF4800]">
                          <Globe className="h-5 w-5" />
                        </div>
                        <h2 className="text-xl font-semibold text-white font-changa">اللغة</h2>
                      </div>
                      
                      <div className="space-y-4">
                        <p className="text-sm text-gray-300 font-noto-arabic">
                          اختر لغة واجهة التطبيق
                        </p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <Card className="border-[#FF4800] bg-gradient-to-br from-[#FF4800]/5 to-transparent overflow-hidden group hover:shadow-[0_0_15px_rgba(255,72,0,0.2)] transition-all">
                            <CardContent className="p-4 flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <span className="text-2xl">🇦🇪</span>
                                <span className="text-white font-noto-arabic">العربية</span>
                              </div>
                              <div className="h-5 w-5 rounded-full bg-[#FF4800] flex items-center justify-center p-0.5">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full text-white">
                                  <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </div>
                            </CardContent>
                          </Card>
                          
                          <Card className="border-white/5 hover:border-[#FF4800]/30 hover:bg-[#FF4800]/5 transition-all overflow-hidden group">
                            <CardContent className="p-4 flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <span className="text-2xl">🇺🇸</span>
                                <span className="text-white">English</span>
                              </div>
                              <div className="h-5 w-5 rounded-full border border-gray-600"></div>
                            </CardContent>
                          </Card>
                          
                          <Card className="border-white/5 hover:border-[#FF4800]/30 hover:bg-[#FF4800]/5 transition-all overflow-hidden group">
                            <CardContent className="p-4 flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <span className="text-2xl">🇮🇱</span>
                                <span className="text-white">עברית</span>
                              </div>
                              <div className="h-5 w-5 rounded-full border border-gray-600"></div>
                            </CardContent>
                          </Card>
                        </div>
                        
                        <div className="mt-8">
                          <Button className="w-full font-noto-arabic">
                            حفظ إعدادات اللغة
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  </Tab.Panel>
                </Tab.Panels>
              </div>
            </div>
          </Tab.Group>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
