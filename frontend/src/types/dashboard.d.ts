
/**
 * Dashboard and Widget Types
 * 
 * Type definitions for dashboard components,
 * widgets, statistics, and analytics.
 */

export interface StatsCardProps {
  /** Statistic title */
  title: string;
  /** Main statistic value */
  value: string | number;
  /** Change percentage or description */
  change?: string;
  /** Whether change is positive */
  isPositive?: boolean;
  /** Card icon */
  icon?: React.ComponentType<any>;
  /** Additional CSS classes */
  className?: string;
}

export interface CourseProgressProps {
  /** Course title */
  title: string;
  /** Progress percentage (0-100) */
  progress: number;
  /** Total experience points */
  totalXP: number;
  /** Current unit number */
  currentUnit?: number;
  /** Total units in course */
  totalUnits?: number;
  /** Course thumbnail URL */
  thumbnail?: string;
}

export interface LeaderboardEntry {
  /** User rank position */
  rank: number;
  /** User name */
  name: string;
  /** User avatar URL */
  avatar?: string;
  /** Total XP or score */
  score: number;
  /** User level */
  level?: number;
  /** Whether this is current user */
  isCurrentUser?: boolean;
}

export interface LeaderboardProps {
  /** List of leaderboard entries */
  entries: LeaderboardEntry[];
  /** Current user ID for highlighting */
  currentUserId?: string;
  /** Leaderboard title */
  title?: string;
  /** Maximum entries to display */
  maxEntries?: number;
}

/**
 * Weekly Performance and Analytics
 */
export interface WeeklyData {
  /** Day of week (Arabic) */
  day: string;
  /** Study time in minutes */
  studyTime: number;
  /** XP earned */
  xp: number;
  /** Exercises completed */
  exercises?: number;
  /** Courses accessed */
  courses?: number;
}

export interface WeeklyChartProps {
  /** Weekly performance data */
  data: WeeklyData[];
  /** Chart height in pixels */
  height?: number;
  /** Chart colors */
  colors?: {
    studyTime: string;
    xp: string;
  };
}

/**
 * Quest and Achievement Types
 */
export interface DailyQuest {
  /** Quest unique identifier */
  id: string;
  /** Quest title (Arabic) */
  title: string;
  /** Quest description */
  description: string;
  /** Reward XP amount */
  rewardXP: number;
  /** Reward coins amount */
  rewardCoins?: number;
  /** Current progress (0-100) */
  progress: number;
  /** Whether quest is completed */
  completed: boolean;
  /** Quest deadline */
  deadline?: Date;
}

export interface DailyQuestProps {
  /** Quest data */
  quest: DailyQuest;
  /** Function to claim reward */
  onClaim?: (questId: string) => void;
}

/**
 * Student Performance Types
 */
export interface StudentStats {
  /** Total study time in hours */
  totalStudyTime: number;
  /** Current learning streak */
  currentStreak: number;
  /** Courses completed */
  coursesCompleted: number;
  /** Current level */
  level: number;
  /** Total XP earned */
  totalXP: number;
  /** Current XP in level */
  currentLevelXP: number;
  /** XP needed for next level */
  nextLevelXP: number;
  /** Virtual coins balance */
  coins: number;
  /** Achievements unlocked */
  achievements: string[];
}

export interface IntelligenceScore {
  /** Overall intelligence score */
  score: number;
  /** Score breakdown by subject */
  breakdown: {
    subject: string;
    score: number;
    color: string;
  }[];
  /** Score trend (up/down/stable) */
  trend: 'up' | 'down' | 'stable';
  /** Previous score for comparison */
  previousScore?: number;
}

/**
 * Notification and Alert Types
 */
export interface NotificationItem {
  /** Notification ID */
  id: string;
  /** Notification title */
  title: string;
  /** Notification message */
  message: string;
  /** Notification type */
  type: 'info' | 'success' | 'warning' | 'error';
  /** Whether notification is read */
  read: boolean;
  /** Notification timestamp */
  timestamp: Date;
  /** Optional action button */
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface AnnouncementCard {
  /** Announcement title */
  title: string;
  /** Announcement content */
  content: string;
  /** Publication date */
  date: Date;
  /** Announcement priority */
  priority: 'low' | 'medium' | 'high';
  /** Whether announcement is pinned */
  pinned?: boolean;
  /** Announcement author */
  author?: string;
}
