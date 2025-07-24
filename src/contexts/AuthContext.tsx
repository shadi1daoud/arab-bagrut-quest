
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { signin, signup, User as FirebaseUser } from '@/lib/authUtils';

// User types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  avatar?: string;
  grade?: string;
  city?: string;
  level?: number;
  xp?: number;
  streak?: number;
  coins?: number;
}

export interface SignUpData {
  name: string;
  email: string;
  password: string;
  grade: string;
  city: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signUp: (signUpData: SignUpData) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('AuthProvider: Setting up auth state listener');
    
    // Listen for Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log('AuthProvider: Firebase auth state changed:', firebaseUser?.uid);
      
      if (firebaseUser) {
        try {
          console.log('AuthProvider: Fetching user data from Firestore for:', firebaseUser.uid);
          
          // Get user data from Firestore
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data() as FirebaseUser;
            console.log('AuthProvider: User data found:', userData);
            setUser(userData);
            localStorage.setItem('darsni_user', JSON.stringify(userData));
          } else {
            console.log('AuthProvider: No user document found in Firestore');
            setUser(null);
          }
        } catch (error) {
          console.error('AuthProvider: Error fetching user data:', error);
          setUser(null);
        }
      } else {
        console.log('AuthProvider: No Firebase user, clearing state');
        setUser(null);
        localStorage.removeItem('darsni_user');
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    console.log('AuthProvider: Login attempt for:', email);
    setIsLoading(true);
    try {
      const userData = await signin(email, password);
      console.log('AuthProvider: Login successful:', userData);
      setUser(userData);
      localStorage.setItem('darsni_user', JSON.stringify(userData));
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('AuthProvider: Login error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const signUp = async (signUpData: SignUpData): Promise<boolean> => {
    console.log('AuthProvider: Signup attempt for:', signUpData.email);
    setIsLoading(true);
    try {
      const userData = await signup(signUpData.email, signUpData.password, signUpData.name);
      console.log('AuthProvider: Signup successful:', userData);
      setUser(userData);
      localStorage.setItem('darsni_user', JSON.stringify(userData));
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('AuthProvider: Signup error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const logout = async () => {
    console.log('AuthProvider: Logout attempt');
    try {
      await signOut(auth);
      setUser(null);
      localStorage.removeItem('darsni_user');
      navigate('/login');
    } catch (error) {
      console.error('AuthProvider: Logout error:', error);
    }
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('darsni_user', JSON.stringify(updatedUser));
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    signUp,
    logout,
    updateUser
  };

  console.log('AuthProvider: Current state - user:', user, 'isLoading:', isLoading);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
