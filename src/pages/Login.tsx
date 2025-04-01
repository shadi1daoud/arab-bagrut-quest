
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      
      if (success) {
        toast({
          title: "تم تسجيل الدخول بنجاح",
          description: "مرحباً بك في منصة دارسني",
        });
        
        // Redirect based on role (from AuthContext)
        if (email === 'admin@darsni.com') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } else {
        toast({
          title: "فشل تسجيل الدخول",
          description: "الرجاء التحقق من البريد الإلكتروني وكلمة المرور",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تسجيل الدخول",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-game-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-game-primary glow-text">دارسني</h1>
          <p className="text-game-text-secondary mt-2">منصة التحضير للبجروت</p>
        </div>
        
        <div className="game-panel backdrop-blur-sm animate-scale-in">
          <h2 className="text-xl font-bold text-white text-center mb-6">تسجيل الدخول</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-game-text-secondary mb-1">
                البريد الإلكتروني
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-game-primary"
                placeholder="أدخل بريدك الإلكتروني"
                required
              />
              
              <div className="mt-1 text-xs text-game-accent">
                للتجربة: student@darsni.com أو admin@darsni.com
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-game-text-secondary mb-1">
                كلمة المرور
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-game-primary"
                placeholder="أدخل كلمة المرور"
                required
              />
              
              <div className="mt-1 text-xs text-game-accent">
                للتجربة: أي كلمة مرور
              </div>
            </div>
            
            <button
              type="submit"
              className={`game-btn w-full ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
            </button>
          </form>
        </div>
        
        <div className="text-center mt-4 text-game-text-secondary text-sm">
          منصة دارسني التعليمية | جميع الحقوق محفوظة 2023
        </div>
      </div>
    </div>
  );
};

export default Login;
