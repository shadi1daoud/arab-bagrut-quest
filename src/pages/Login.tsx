
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
          description: "مرحباً بك في منصة درسني",
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
    <div className="min-h-screen flex flex-col justify-center items-center bg-black p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-1">
            <h1 className="text-4xl font-bold text-white">درسني</h1>
            <span className="bg-orange-500 p-1 rounded">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 10C21 10 18.995 7.26822 17.3662 5.63824C15.7373 4.00827 13.4864 3 11 3C6.02944 3 2 7.02944 2 12C2 16.9706 6.02944 21 11 21C15.9706 21 20 16.9706 20 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 2L13 11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </div>
          <p className="text-gray-400 mt-2">منصة التحضير للبجروت</p>
        </div>
        
        <div className="bg-black border border-gray-800 rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-bold text-white text-center mb-6">تسجيل الدخول</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                البريد الإلكتروني
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="أدخل بريدك الإلكتروني"
                required
              />
              
              <div className="mt-1 text-xs text-orange-500">
                للتجربة: student@darsni.com أو admin@darsni.com
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-1">
                كلمة المرور
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="أدخل كلمة المرور"
                required
              />
              
              <div className="mt-1 text-xs text-orange-500">
                للتجربة: أي كلمة مرور
              </div>
            </div>
            
            <button
              type="submit"
              className={`w-full py-2 px-4 bg-orange-500 text-white rounded-md font-semibold transition-all hover:bg-orange-600 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
            </button>
          </form>
        </div>
        
        <div className="text-center mt-4 text-gray-500 text-sm">
          منصة درسني التعليمية | جميع الحقوق محفوظة 2023
        </div>
      </div>
    </div>
  );
};

export default Login;
