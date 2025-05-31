
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

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

// Sample users for the MVP
const SAMPLE_USERS: User[] = [
  {
    id: '1',
    name: 'شادي داود',
    email: 'student@darsni.com',
    role: 'student',
    avatar: '/assets/avatars/student.png',
    grade: 'الثاني عشر',
    city: 'مار إلياس',
    level: 3,
    xp: 8966,
    streak: 20,
    coins: 450
  },
  {
    id: '2',
    name: 'مدرسة ليلى',
    email: 'admin@darsni.com',
    role: 'admin',
    avatar: '/assets/avatars/admin.png'
  }
];

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
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('darsni_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // For MVP, just use the sample users
      const foundUser = SAMPLE_USERS.find(u => u.email === email);
      
      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem('darsni_user', JSON.stringify(foundUser));
        
        // Update streak for student
        if (foundUser.role === 'student') {
          const updatedUser = {
            ...foundUser,
            streak: (foundUser.streak || 0) + 1
          };
          setUser(updatedUser);
          localStorage.setItem('darsni_user', JSON.stringify(updatedUser));
        }
        
        setIsLoading(false);
        return true;
      }
      
      setIsLoading(false);
      return false;
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const signUp = async (signUpData: SignUpData): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Check if email already exists
      const existingUser = SAMPLE_USERS.find(u => u.email === signUpData.email);
      if (existingUser) {
        setIsLoading(false);
        return false;
      }

      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        name: signUpData.name,
        email: signUpData.email,
        role: 'student',
        avatar: '/assets/avatars/student.png',
        grade: signUpData.grade,
        city: signUpData.city,
        level: 1,
        xp: 100, // Starting XP
        streak: 1,
        coins: 50 // Starting coins
      };

      // Add to sample users (in a real app, this would be saved to database)
      SAMPLE_USERS.push(newUser);
      
      // Set as current user
      setUser(newUser);
      localStorage.setItem('darsni_user', JSON.stringify(newUser));
      
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Sign-up error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('darsni_user');
    navigate('/login');
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('darsni_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signUp, logout, updateUser }}>
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
