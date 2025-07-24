
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  requiresAdmin?: boolean;
}

const ProtectedRoute = ({ children, requiresAdmin = false }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();

  console.log('ProtectedRoute: user:', user, 'isLoading:', isLoading, 'requiresAdmin:', requiresAdmin);

  if (isLoading) {
    console.log('ProtectedRoute: Showing loading state');
    return <div className="flex items-center justify-center min-h-screen">جاري التحميل...</div>;
  }

  if (!user) {
    console.log('ProtectedRoute: No user, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  if (requiresAdmin && user.role !== 'admin') {
    console.log('ProtectedRoute: User is not admin, redirecting to home');
    return <Navigate to="/" replace />;
  }

  console.log('ProtectedRoute: Rendering protected content');
  return <>{children}</>;
};

export default ProtectedRoute;
