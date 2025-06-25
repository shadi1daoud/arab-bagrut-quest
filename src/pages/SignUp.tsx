import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { ArrowRight, Lock, Mail, User, Sparkles, MapPin, GraduationCap } from 'lucide-react';
import { signup } from '@/lib/authUtils';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    grade: '',
    city: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const grades = [
    'التاسع', 'العاشر', 'الحادي عشر', 'الثاني عشر'
  ];

  // Create particles for galaxy effect
  const createParticles = () => {
    const particles = [];
    for (let i = 0; i < 60; i++) {
      const style = {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        opacity: Math.random() * 0.5 + 0.1,
        width: `${Math.random() * 2 + 1}px`,
        height: `${Math.random() * 2 + 1}px`,
        animationDelay: `${Math.random() * 15}s`,
        animationDuration: `${Math.random() * 10 + 10}s`
      };
      particles.push(<div key={i} className="particle" style={style}></div>);
    }
    return particles;
  };

  // Create background shine effects
  const createShineEffects = () => {
    return (
      <>
        <div className="absolute -top-[30%] -right-[20%] w-96 h-96 bg-gradient-to-br from-cyan-500/20 via-purple-600/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute -bottom-[30%] -left-[20%] w-96 h-96 bg-gradient-to-tr from-purple-500/20 via-pink-600/5 to-transparent rounded-full blur-3xl"></div>
      </>
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "خطأ في كلمة المرور",
        description: "كلمة المرور وتأكيد كلمة المرور غير متطابقتان",
        variant: "destructive"
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: "كلمة مرور ضعيفة",
        description: "يجب أن تكون كلمة المرور 6 أحرف على الأقل",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Use Firebase signup function
      const user = await signup(formData.email, formData.password, formData.name);
      
      setIsSuccess(true);
      toast({
        title: "تم إنشاء الحساب بنجاح",
        description: "مرحباً بك في منصة درسني! تم تسجيل دخولك تلقائياً"
      });

      // Animate success then redirect
      setTimeout(() => {
        navigate('/');
      }, 1000);
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'حدث خطأ أثناء إنشاء الحساب';
      toast({
        title: "فشل إنشاء الحساب",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center overflow-hidden relative">
      {/* Galaxy particles background */}
      <div className="galaxy-particles fixed inset-0 z-0">
        {createParticles()}
      </div>
      
      {/* Cyber grid background */}
      <div className="cyber-grid fixed inset-0 z-0"></div>
      
      {/* Gradient shine effects */}
      {createShineEffects()}
      
      {/* Sign-up container */}
      <motion.div
        className="w-full max-w-md z-10 px-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4 my-[10px]">
            <img 
              src="/lovable-uploads/7d6a3b3b-a0be-4ec3-8796-51da0a277b60.png" 
              alt="Darsni Logo" 
              className="h-14 w-auto" 
            />
          </div>
          <p className="text-xl font-semibold mt-2 font-outfit text-cosmic-primary">انضم إلى منصة درسني</p>
          <motion.div
            className="absolute top-44 left-1/2 -translate-x-1/2 z-0 opacity-20 pointer-events-none"
            animate={{ rotate: 360 }}
            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-[400px] h-[400px] border border-cyan-500/20 rounded-full"></div>
          </motion.div>
        </div>
        
        <motion.div
          className="relative backdrop-blur-xl bg-game-card-bg/90 border border-white/10 rounded-2xl shadow-xl overflow-hidden p-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {/* Card background effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-cyan-900/10 z-0"></div>
          <div className="absolute inset-0 from-game-accent/5 via-transparent to-transparent z-0 bg-stone-900 bg-[cosmic-card-bg-hover]"></div>
          
          <motion.div
            className="relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white font-changa">
                <span className="mr-2 text-cosmic-primary">🚀</span>
                ابدأ رحلتك التعليمية!
              </h2>
              <Sparkles className="text-game-accent w-6 h-6" />
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1.5">
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1 font-outfit">
                  الاسم الكامل
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pr-10 rounded-lg bg-muted/20 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-game-accent/50 transition-all"
                    placeholder="أدخل اسمك الكامل"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1 font-outfit">
                  البريد الإلكتروني
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pr-10 rounded-lg bg-muted/20 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-game-accent/50 transition-all"
                    placeholder="أدخل بريدك الإلكتروني"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="grade" className="block text-sm font-medium text-gray-300 mb-1 font-outfit">
                    الصف
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <GraduationCap className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      id="grade"
                      name="grade"
                      value={formData.grade}
                      onChange={handleChange}
                      className="w-full px-4 py-3 pr-10 rounded-lg bg-muted/20 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-game-accent/50 transition-all appearance-none"
                      required
                    >
                      <option value="">اختر الصف</option>
                      {grades.map(grade => (
                        <option key={grade} value={grade} className="bg-gray-800">{grade}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="city" className="block text-sm font-medium text-gray-300 mb-1 font-outfit">
                    المدينة
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="city"
                      name="city"
                      type="text"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-3 pr-10 rounded-lg bg-muted/20 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-game-accent/50 transition-all"
                      placeholder="المدينة"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1 font-outfit">
                  كلمة المرور
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pr-10 rounded-lg bg-muted/20 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-game-accent/50 transition-all"
                    placeholder="أدخل كلمة المرور"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1 font-outfit">
                  تأكيد كلمة المرور
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pr-10 rounded-lg bg-muted/20 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-game-accent/50 transition-all"
                    placeholder="أعد إدخال كلمة المرور"
                    required
                  />
                </div>
              </div>
              
              <motion.div
                className="pt-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                <button
                  type="submit"
                  disabled={isLoading || isSuccess}
                  className="relative w-full py-3 px-4 bg-gradient-to-r from-game-primary to-secondary text-white rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-game-primary/20 overflow-hidden group"
                >
                  {isSuccess ? (
                    <motion.span
                      className="inline-flex items-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      تم إنشاء الحساب!
                      <Sparkles className="mr-2 h-5 w-5" />
                    </motion.span>
                  ) : isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      جاري إنشاء الحساب...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      إنشاء حساب جديد
                      <ArrowRight className="mr-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </span>
                  )}
                  
                  <span className="absolute bottom-0 left-0 h-1 bg-white/30 w-0 group-hover:w-full transition-all duration-700"></span>
                </button>
              </motion.div>
            </form>
            
            {/* XP loading bar for success animation */}
            {isSuccess && (
              <motion.div
                className="mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-xs text-white mb-1 flex justify-between">
                  <span>مرحباً بك في درسني...</span>
                  <span className="font-share-tech">XP +100</span>
                </div>
                <div className="h-2 bg-muted/20 rounded overflow-hidden">
                  <motion.div
                    className="h-full bg-game-accent"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1 }}
                  />
                </div>
              </motion.div>
            )}
            
            <div className="mt-6 text-center text-sm text-gray-400">
              <span>لديك حساب بالفعل؟ </span>
              <Link to="/login" className="text-blue-400 hover:underline font-outfit transition-colors">
                تسجيل الدخول
              </Link>
            </div>
          </motion.div>
        </motion.div>
        
        <div className="text-center mt-4 text-gray-500 text-sm">
          منصة درسني التعليمية | جميع الحقوق محفوظة 2023
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;
