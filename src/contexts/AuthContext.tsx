import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import type { User as SupabaseUser, Session } from '@supabase/supabase-js';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin' | 'teacher';
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
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        if (session?.user) {
          await loadUserProfile(session.user);
        } else {
          setUser(null);
        }
        setIsLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        await loadUserProfile(session.user);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadUserProfile = async (supabaseUser: SupabaseUser) => {
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', supabaseUser.id)
      .single();

    const { data: roleData } = await supabase.rpc('get_user_role', {
      _user_id: supabaseUser.id
    });

    if (profile) {
      setUser({
        id: profile.id,
        name: profile.full_name || '',
        email: supabaseUser.email || '',
        role: roleData || 'student',
        avatar: profile.avatar_url || undefined,
        grade: profile.grade || undefined,
        city: profile.city || undefined,
        level: profile.level || 1,
        xp: profile.xp || 0,
        streak: profile.streak_days || 0,
        coins: profile.coins || 0,
      });
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Login error:', error.message);
        setIsLoading(false);
        return false;
      }

      if (data.user) {
        await loadUserProfile(data.user);
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
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email: signUpData.email,
        password: signUpData.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: signUpData.name,
            grade: signUpData.grade,
            city: signUpData.city,
          },
        },
      });

      if (error) {
        console.error('Sign-up error:', error.message);
        setIsLoading(false);
        return false;
      }

      if (data.user) {
        await loadUserProfile(data.user);
        setIsLoading(false);
        return true;
      }

      setIsLoading(false);
      return false;
    } catch (error) {
      console.error('Sign-up error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    navigate('/login');
  };

  const updateUser = async (userData: Partial<User>) => {
    if (!user) return;

    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: userData.name,
        avatar_url: userData.avatar,
        grade: userData.grade,
        city: userData.city,
        xp: userData.xp,
        level: userData.level,
        coins: userData.coins,
        streak_days: userData.streak,
      })
      .eq('id', user.id);

    if (!error) {
      setUser({ ...user, ...userData });
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
