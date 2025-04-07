
import { useNavigate } from 'react-router-dom';
import { Flame, Trophy, ChevronRight } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full flex flex-col items-center justify-center relative overflow-hidden py-4">
      {/* Galaxy particles background */}
      <div className="galaxy-particles absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5 + 0.1,
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            animationDelay: `${Math.random() * 15}s`,
            animationDuration: `${Math.random() * 10 + 10}s`
          }}></div>
        ))}
      </div>
      
      {/* Cyber grid background */}
      <div className="cyber-grid absolute inset-0"></div>
      
      <div className="container max-w-4xl px-4 relative z-10">
        <div className="text-center mb-6">
          <div className="flex justify-center items-center mb-3">
            <div className="bg-game-primary p-3 rounded-xl shadow-lg shadow-game-primary/20 mr-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 10C21 10 18.995 7.26822 17.3662 5.63824C15.7373 4.00827 13.4864 3 11 3C6.02944 3 2 7.02944 2 12C2 16.9706 6.02944 21 11 21C15.9706 21 20 16.9706 20 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 2L13 11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1 className="text-4xl font-bold font-changa text-white">درسني</h1>
          </div>
          <h2 className="text-lg font-changa text-game-text-secondary">منصة تعليمية جديدة لطلاب المراحل الثانوية</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="xp-card p-4 hover-scale">
            <div className="flex items-center mb-3">
              <div className="h-8 w-8 rounded-full bg-game-primary/20 flex items-center justify-center mr-2">
                <Flame className="h-5 w-5 text-game-primary" />
              </div>
              <h3 className="text-lg font-changa text-white">تعلم بأسلوب جديد</h3>
            </div>
            <p className="text-gray-300 text-sm mb-3">استمتع بالتعلم من خلال نظام تعليمي مبتكر يشبه الألعاب.</p>
            <div className="flex items-center text-game-accent text-sm">
              <span className="font-semibold">استكشف المزيد</span>
              <ChevronRight className="h-4 w-4 mr-1" />
            </div>
          </div>
          
          <div className="stats-card p-4 hover-scale">
            <div className="flex items-center mb-3">
              <div className="h-8 w-8 rounded-full bg-game-accent/20 flex items-center justify-center mr-2">
                <Trophy className="h-5 w-5 text-game-accent" />
              </div>
              <h3 className="text-lg font-changa text-white">حقق التفوق</h3>
            </div>
            <p className="text-gray-300 text-sm mb-3">تنافس مع زملائك واحصل على مكافآت عند إكمال المهام التعليمية.</p>
            <div className="flex items-center text-game-accent text-sm">
              <span className="font-semibold">تعرف على المكافآت</span>
              <ChevronRight className="h-4 w-4 mr-1" />
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <button 
            onClick={() => navigate('/login')}
            className="game-btn px-6 py-3 text-base hover-scale"
          >
            ابدأ رحلتك الآن
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
