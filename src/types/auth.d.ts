
/**
 * Authentication and User Management Types
 * 
 * This file contains type definitions for user authentication,
 * user profiles, and related authentication operations.
 */

export interface User {
  /** Unique user identifier */
  id: string;
  /** User's full name in Arabic */
  name: string;
  /** User's email address */
  email: string;
  /** User role determining access permissions */
  role: 'student' | 'admin';
  /** Optional profile avatar URL */
  avatar?: string;
  /** Student's grade level (Arabic) */
  grade?: string;
  /** User's city/location (Arabic) */
  city?: string;
  /** Current user level in gamification system */
  level?: number;
  /** Total experience points earned */
  xp?: number;
  /** Current login streak in days */
  streak?: number;
  /** Virtual coins earned through activities */
  coins?: number;
}

export interface SignUpData {
  /** User's full name */
  name: string;
  /** Email address for account */
  email: string;
  /** Account password */
  password: string;
  /** Student's grade level */
  grade: string;
  /** User's city */
  city: string;
}

export interface AuthContextType {
  /** Currently authenticated user or null */
  user: User | null;
  /** Loading state for auth operations */
  isLoading: boolean;
  /** Login function returning success boolean */
  login: (email: string, password: string) => Promise<boolean>;
  /** Sign up function returning success boolean */
  signUp: (signUpData: SignUpData) => Promise<boolean>;
  /** Logout function */
  logout: () => void;
  /** Update user profile function */
  updateUser: (userData: Partial<User>) => void;
}

/**
 * Protected Route Configuration
 */
export interface ProtectedRouteProps {
  /** Child components to render */
  children: React.ReactNode;
  /** Whether route requires admin access */
  requiresAdmin?: boolean;
}
