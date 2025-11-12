import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { GRADE_OPTIONS } from '@/lib/constants';

const signUpSchema = z.object({
  name: z.string().trim().min(2, 'الاسم يجب أن يكون حرفين على الأقل').max(100, 'الاسم طويل جداً'),
  email: z.string().email('البريد الإلكتروني غير صحيح').max(255, 'البريد الإلكتروني طويل جداً'),
  password: z.string().min(8, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل').max(100, 'كلمة المرور طويلة جداً'),
  confirmPassword: z.string(),
  grade: z.string().min(1, 'الصف الدراسي مطلوب'),
  city: z.string().trim().min(2, 'المدينة مطلوبة').max(100, 'اسم المدينة طويل جداً'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'كلمات المرور غير متطابقة',
  path: ['confirmPassword'],
});

type SignUpFormData = z.infer<typeof signUpSchema>;

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    grade: '',
    city: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof SignUpFormData, string>>>({});
  const { signUp, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      navigate(user.role === 'admin' ? '/admin/dashboard' : '/student/dashboard');
    }
  }, [user, navigate]);

  const createParticles = () => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }));
  };

  const createShineEffects = () => {
    return Array.from({ length: 3 }, (_, i) => ({
      id: i,
      width: Math.random() * 200 + 100,
      angle: Math.random() * 360,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 3,
    }));
  };

  const particles = createParticles();
  const shineEffects = createShineEffects();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    const validation = signUpSchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors: Partial<Record<keyof SignUpFormData, string>> = {};
      validation.error.errors.forEach((err) => {
        const field = err.path[0] as keyof SignUpFormData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    
    const result = await signUp({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      grade: formData.grade,
      city: formData.city,
    });
    
    if (result) {
      setSuccess(true);
      toast({
        title: "تم إنشاء الحساب بنجاح! 🎉",
        description: "مرحباً بك في منصة درسني",
      });
      setTimeout(() => {
        navigate('/student/dashboard');
      }, 1500);
    } else {
      setLoading(false);
      toast({
        title: "خطأ في التسجيل",
        description: "البريد الإلكتروني مستخدم بالفعل أو حدث خطأ",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 flex items-center justify-center p-4">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-purple-500/30 to-cyan-500/30 blur-sm"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
          }}
        />
      ))}

      {shineEffects.map((shine) => (
        <motion.div
          key={shine.id}
          className="absolute bg-gradient-to-r from-transparent via-purple-500/10 to-transparent blur-xl"
          style={{
            width: shine.width,
            height: '200vh',
            transform: `rotate(${shine.angle}deg)`,
          }}
          animate={{
            x: ['-100%', '200%'],
          }}
          transition={{
            duration: shine.duration,
            repeat: Infinity,
            delay: shine.delay,
            ease: 'linear',
          }}
        />
      ))}

      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <motion.div
          className="relative bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-purple-500/20 overflow-hidden"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-cyan-500/5" />
          
          <div className="relative p-8">
            <div className="text-center mb-8">
              <motion.h1 
                className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                انضم إلينا! 🚀
              </motion.h1>
              <motion.p 
                className="text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                ابدأ رحلتك التعليمية الآن
              </motion.p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  👤 الاسم الكامل
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-purple-500/30 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                  placeholder="أحمد محمد"
                  disabled={loading || success}
                />
                {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  📧 البريد الإلكتروني
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-purple-500/30 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                  placeholder="example@darsni.com"
                  disabled={loading || success}
                />
                {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  📚 الصف الدراسي
                </label>
                <select
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-purple-500/30 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                  disabled={loading || success}
                >
                  <option value="">اختر الصف</option>
                  {GRADE_OPTIONS.map((grade) => (
                    <option key={grade} value={grade}>{grade}</option>
                  ))}
                </select>
                {errors.grade && <p className="mt-1 text-sm text-red-400">{errors.grade}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  🏙️ المدينة
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-purple-500/30 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                  placeholder="القدس"
                  disabled={loading || success}
                />
                {errors.city && <p className="mt-1 text-sm text-red-400">{errors.city}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  🔒 كلمة المرور
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-purple-500/30 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                  placeholder="••••••••"
                  disabled={loading || success}
                />
                {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  🔒 تأكيد كلمة المرور
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-purple-500/30 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                  placeholder="••••••••"
                  disabled={loading || success}
                />
                {errors.confirmPassword && <p className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>}
              </div>

              <motion.button
                type="submit"
                disabled={loading || success}
                className="w-full py-4 rounded-xl font-bold text-lg relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: loading || success ? 1 : 1.02 }}
                whileTap={{ scale: loading || success ? 1 : 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 transition-all group-hover:from-purple-500 group-hover:to-cyan-500" />
                <span className="relative z-10 text-white flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      />
                      جاري إنشاء الحساب...
                    </>
                  ) : success ? (
                    <>
                      ✓ تم بنجاح!
                    </>
                  ) : (
                    <>
                      إنشاء حساب 🎮
                    </>
                  )}
                </span>
              </motion.button>
            </form>

            {success && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 rounded-xl bg-gradient-to-r from-green-500/20 to-cyan-500/20 border border-green-500/30"
              >
                <p className="text-green-400 text-center font-medium">
                  🎉 تم إنشاء الحساب بنجاح!
                </p>
                <motion.div 
                  className="mt-3 h-2 bg-gray-800/50 rounded-full overflow-hidden"
                >
                  <motion.div
                    className="h-full bg-gradient-to-r from-green-500 to-cyan-500"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1.5 }}
                  />
                </motion.div>
              </motion.div>
            )}

            <div className="mt-6 text-center">
              <span className="text-gray-400 text-sm">لديك حساب بالفعل؟ </span>
              <Link to="/login" className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors font-medium">
                سجل الدخول
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignUp;
