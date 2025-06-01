
/**
 * Application Constants
 * 
 * Centralized configuration and constant values
 * used throughout the application.
 */

/**
 * Sample Users for MVP Demo
 */
export const SAMPLE_USERS = [
  {
    id: '1',
    name: 'شادي داود',
    email: 'student@darsni.com',
    role: 'student' as const,
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
    role: 'admin' as const,
    avatar: '/assets/avatars/admin.png'
  }
] as const;

/**
 * Grade Levels (Arabic)
 */
export const GRADE_LEVELS = [
  'التاسع',
  'العاشر', 
  'الحادي عشر',
  'الثاني عشر'
] as const;

/**
 * Subject Categories
 */
export const SUBJECTS = [
  { id: 'math', name: 'رياضيات', color: '#FF4B1A' },
  { id: 'physics', name: 'فيزياء', color: '#00D4FF' },
  { id: 'chemistry', name: 'كيمياء', color: '#50C878' },
  { id: 'biology', name: 'أحياء', color: '#FFB347' },
  { id: 'arabic', name: 'عربي', color: '#DDA0DD' },
  { id: 'english', name: 'إنجليزي', color: '#87CEEB' },
  { id: 'history', name: 'تاريخ', color: '#F0E68C' }
] as const;

/**
 * XP and Leveling Configuration
 */
export const XP_CONFIG = {
  /** XP required for each level */
  LEVEL_REQUIREMENTS: [0, 100, 300, 600, 1000, 1500, 2100, 2800, 3600, 4500, 5500],
  
  /** XP rewards for different actions */
  REWARDS: {
    LOGIN: 50,
    COMPLETE_UNIT: 100,
    COMPLETE_COURSE: 500,
    DAILY_STREAK: 25,
    QUIZ_PERFECT: 150,
    QUIZ_GOOD: 75,
    FIRST_TIME_BONUS: 50
  },

  /** Coin rewards */
  COIN_REWARDS: {
    DAILY_LOGIN: 10,
    COMPLETE_UNIT: 20,
    COMPLETE_COURSE: 100,
    WEEKLY_GOAL: 50,
    PERFECT_QUIZ: 30
  }
} as const;

/**
 * API Endpoints (Future Implementation)
 */
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh'
  },
  COURSES: {
    LIST: '/courses',
    DETAIL: '/courses/:id',
    PROGRESS: '/courses/:id/progress',
    UNITS: '/courses/:id/units'
  },
  USER: {
    PROFILE: '/user/profile',
    STATS: '/user/stats',
    ACHIEVEMENTS: '/user/achievements'
  }
} as const;

/**
 * Local Storage Keys
 */
export const STORAGE_KEYS = {
  USER: 'darsni_user',
  THEME: 'darsni_theme',
  LANGUAGE: 'darsni_language',
  ONBOARDING: 'darsni_onboarding_complete'
} as const;

/**
 * Animation Durations (in milliseconds)
 */
export const ANIMATION_DURATIONS = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  LOADING: 1000
} as const;

/**
 * Breakpoints for Responsive Design
 */
export const BREAKPOINTS = {
  MOBILE: 320,
  TABLET: 768,
  DESKTOP: 1024,
  LARGE: 1440
} as const;

/**
 * Color Palette
 */
export const COLORS = {
  PRIMARY: '#FF4B1A',
  SECONDARY: '#FF794B',
  ACCENT: '#00D4FF',
  SUCCESS: '#50C878',
  WARNING: '#FFB347',
  ERROR: '#FF6B6B',
  BACKGROUND: '#0E0E0E',
  SURFACE: '#1A1A1A'
} as const;

/**
 * Default Configuration Values
 */
export const DEFAULTS = {
  PAGINATION_SIZE: 10,
  DEBOUNCE_DELAY: 300,
  TOAST_DURATION: 3000,
  SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutes
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  SUPPORTED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp']
} as const;

/**
 * Feature Flags (for gradual rollout)
 */
export const FEATURE_FLAGS = {
  ENABLE_SOCIAL_FEATURES: true,
  ENABLE_OFFLINE_MODE: false,
  ENABLE_PUSH_NOTIFICATIONS: false,
  ENABLE_ADVANCED_ANALYTICS: true,
  ENABLE_AI_TUTORING: false
} as const;
