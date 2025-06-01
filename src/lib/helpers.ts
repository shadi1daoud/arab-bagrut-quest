
/**
 * Utility Helper Functions
 * 
 * Common utility functions used across the application
 * for formatting, validation, and data manipulation.
 */

import { STORAGE_KEYS, XP_CONFIG } from './constants';

/**
 * Format numbers in Arabic locale
 */
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('ar-SA').format(num);
};

/**
 * Format XP with suffix
 */
export const formatXP = (xp: number): string => {
  if (xp >= 1000000) {
    return `${(xp / 1000000).toFixed(1)}M XP`;
  }
  if (xp >= 1000) {
    return `${(xp / 1000).toFixed(1)}K XP`;
  }
  return `${xp} XP`;
};

/**
 * Calculate user level from XP
 */
export const calculateLevel = (xp: number): number => {
  const levels = XP_CONFIG.LEVEL_REQUIREMENTS;
  for (let i = levels.length - 1; i >= 0; i--) {
    if (xp >= levels[i]) {
      return i;
    }
  }
  return 0;
};

/**
 * Calculate XP progress in current level
 */
export const calculateLevelProgress = (xp: number): {
  currentLevel: number;
  currentLevelXP: number;
  nextLevelXP: number;
  progress: number;
} => {
  const currentLevel = calculateLevel(xp);
  const levels = XP_CONFIG.LEVEL_REQUIREMENTS;
  
  const currentLevelStart = levels[currentLevel] || 0;
  const nextLevelStart = levels[currentLevel + 1] || levels[levels.length - 1];
  
  const currentLevelXP = xp - currentLevelStart;
  const nextLevelXP = nextLevelStart - currentLevelStart;
  const progress = Math.min((currentLevelXP / nextLevelXP) * 100, 100);
  
  return {
    currentLevel,
    currentLevelXP,
    nextLevelXP,
    progress: Math.round(progress)
  };
};

/**
 * Format time duration in Arabic
 */
export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours > 0) {
    return `${hours} ساعة${mins > 0 ? ` و ${mins} دقيقة` : ''}`;
  }
  return `${mins} دقيقة`;
};

/**
 * Format date in Arabic
 */
export const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(dateObj);
};

/**
 * Format relative time (e.g., "منذ ساعتين")
 */
export const formatRelativeTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInMs = now.getTime() - dateObj.getTime();
  const diffInMins = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMins / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  
  if (diffInMins < 1) return 'الآن';
  if (diffInMins < 60) return `منذ ${diffInMins} دقيقة`;
  if (diffInHours < 24) return `منذ ${diffInHours} ساعة`;
  if (diffInDays < 7) return `منذ ${diffInDays} يوم`;
  
  return formatDate(dateObj);
};

/**
 * Validate email address
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 */
export const validatePassword = (password: string): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];
  
  if (password.length < 6) {
    errors.push('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
  }
  
  if (!/[A-Za-z]/.test(password)) {
    errors.push('كلمة المرور يجب أن تحتوي على حرف واحد على الأقل');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('كلمة المرور يجب أن تحتوي على رقم واحد على الأقل');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Generate random ID
 */
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

/**
 * Debounce function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Throttle function
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let lastCall = 0;
  
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    }
  };
};

/**
 * Clamp number between min and max
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

/**
 * Generate achievement badge based on criteria
 */
export const getAchievementBadge = (type: string, value: number): string | null => {
  const achievements = {
    streak: [
      { days: 7, badge: '🔥 أسبوع مميز' },
      { days: 14, badge: '💎 أسبوعين متواصلين' },
      { days: 30, badge: '👑 شهر كامل' }
    ],
    xp: [
      { points: 1000, badge: '🌟 أول ألف نقطة' },
      { points: 5000, badge: '🚀 خمسة آلاف نقطة' },
      { points: 10000, badge: '💫 عشرة آلاف نقطة' }
    ],
    courses: [
      { count: 1, badge: '📚 أول كورس' },
      { count: 5, badge: '🎓 خمسة كورسات' },
      { count: 10, badge: '🏆 عشرة كورسات' }
    ]
  };
  
  const categoryAchievements = achievements[type as keyof typeof achievements];
  if (!categoryAchievements) return null;
  
  for (const achievement of categoryAchievements.reverse()) {
    if (value >= achievement.count || value >= achievement.days || value >= achievement.points) {
      return achievement.badge;
    }
  }
  
  return null;
};

/**
 * Local storage helpers with error handling
 */
export const storage = {
  get: <T>(key: string, defaultValue: T): T => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.warn(`Error reading from localStorage key "${key}":`, error);
      return defaultValue;
    }
  },
  
  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Error writing to localStorage key "${key}":`, error);
    }
  },
  
  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }
};

/**
 * Generate random particles for visual effects
 */
export const generateParticles = (count: number = 60) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    style: {
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      opacity: Math.random() * 0.5 + 0.1,
      width: `${Math.random() * 2 + 1}px`,
      height: `${Math.random() * 2 + 1}px`,
      animationDelay: `${Math.random() * 15}s`,
      animationDuration: `${Math.random() * 10 + 10}s`
    }
  }));
};

/**
 * Calculate course completion percentage
 */
export const calculateCourseProgress = (completedUnits: number, totalUnits: number): number => {
  if (totalUnits === 0) return 0;
  return Math.round((completedUnits / totalUnits) * 100);
};

/**
 * Generate color based on string (for consistent user avatars)
 */
export const getColorFromString = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const colors = ['#FF4B1A', '#00D4FF', '#50C878', '#FFB347', '#DDA0DD', '#87CEEB'];
  return colors[Math.abs(hash) % colors.length];
};
