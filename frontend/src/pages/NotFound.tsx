
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-game-background p-4">
      <div className="text-center max-w-md w-full game-panel animate-scale-in">
        <div className="text-8xl font-bold text-game-primary glow-text mb-4">404</div>
        <h1 className="text-2xl font-bold text-white mb-4">الصفحة غير موجودة</h1>
        <p className="text-gray-400 mb-6">
          عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
        </p>
        <Link 
          to="/" 
          className="game-btn inline-block"
        >
          العودة للصفحة الرئيسية
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
