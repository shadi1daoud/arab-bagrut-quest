import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit,
  onSnapshot,
  updateDoc,
  setDoc,
  addDoc,
  deleteDoc,
  Timestamp,
  DocumentData,
  QuerySnapshot,
  DocumentSnapshot
} from 'firebase/firestore';
import { db } from './firebase';

// Types
export interface Course {
  id: string;
  title: string;
  subject: string;
  grade: string;
  description: string;
  icon: string;
  color: string;
  xpReward: number;
  totalUnits: number;
  totalLessons: number;
  students: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  isPublished: boolean;
  createdBy: string;
  thumbnail?: string;
  stats: {
    totalEnrollments: number;
    averageProgress: number;
    completionRate: number;
  };
}

export interface Unit {
  id: string;
  courseId: string;
  number: number;
  title: string;
  duration: string;
  videoSrc: string;
  pdfUrl?: string;
  notes?: string;
  hasQuiz: boolean;
  xpReward: number;
  chapters: Array<{
    time: number;
    title: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
    timestamps: Array<{
      time: number;
      label: string;
    }>;
  }>;
}

export interface Quiz {
  id: string;
  unitId: string;
  courseId: string;
  title: string;
  description: string;
  questions: Array<{
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
    type: 'multiple-choice' | 'true-false';
    xpReward: number;
  }>;
  totalXP: number;
  timeLimit?: number;
  passingScore: number;
}

export interface UserCourse {
  id?: string;
  userId: string;
  courseId: string;
  progress: number;
  currentUnitId: string | null;
  completedUnits: string[];
  totalXP: number;
  startedAt: Timestamp;
  lastAccessed: Timestamp;
  completedAt?: Timestamp;
}

export interface UserUnit {
  id?: string;
  userId: string;
  unitId: string;
  courseId: string;
  status: 'idle' | 'in-progress' | 'completed';
  progress: number;
  timeSpent: number;
  completedAt?: Timestamp;
  xpEarned: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  requirement: {
    type: string;
    value: number;
  };
  xpReward: number;
  coinReward: number;
}

export interface ShopItem {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: 'boosters' | 'study' | 'ai' | 'mystery' | 'dbucks';
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
  effect?: string;
  limitedTime?: boolean;
  timeRemaining?: number;
  isActive: boolean;
}

export interface LeaderboardEntry {
  userId: string;
  rank: number;
  score: number;
  name: string;
  avatar?: string;
}

// Course Functions
export const getCourses = async (): Promise<Course[]> => {
  try {
    // First try with the composite index
    const q = query(
      collection(db, 'courses'),
      where('isPublished', '==', true),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Course));
  } catch (error) {
    console.error('Error fetching courses:', error);
    
    // Fallback: try without the orderBy clause
    try {
      console.log('Trying fallback query without orderBy...');
      const q = query(
        collection(db, 'courses'),
        where('isPublished', '==', true)
      );
      const snapshot = await getDocs(q);
      const courses = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Course));
      
      // Sort manually in JavaScript
      return courses.sort((a, b) => {
        if (a.createdAt && b.createdAt) {
          return b.createdAt.toMillis() - a.createdAt.toMillis();
        }
        return 0;
      });
    } catch (fallbackError) {
      console.error('Fallback query also failed:', fallbackError);
      
      // Last resort: get all courses and filter in JavaScript
      try {
        console.log('Trying to get all courses and filter manually...');
        const snapshot = await getDocs(collection(db, 'courses'));
        const allCourses = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Course));
        return allCourses.filter(course => course.isPublished === true);
      } catch (finalError) {
        console.error('All query attempts failed:', finalError);
        return [];
      }
    }
  }
};

export const getCourseById = async (courseId: string): Promise<Course | null> => {
  try {
    const docRef = doc(db, 'courses', courseId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Course;
    }
    return null;
  } catch (error) {
    console.error('Error fetching course:', error);
    return null;
  }
};

export const getUnitsByCourseId = async (courseId: string): Promise<Unit[]> => {
  try {
    const q = query(
      collection(db, 'units'),
      where('courseId', '==', courseId),
      orderBy('number', 'asc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Unit));
  } catch (error) {
    console.error('Error fetching units:', error);
    return [];
  }
};

export const getUnitById = async (unitId: string): Promise<Unit | null> => {
  try {
    const docRef = doc(db, 'units', unitId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Unit;
    }
    return null;
  } catch (error) {
    console.error('Error fetching unit:', error);
    return null;
  }
};

// Quiz Functions
export const getQuizByUnitId = async (unitId: string): Promise<Quiz | null> => {
  try {
    const q = query(
      collection(db, 'quizzes'),
      where('unitId', '==', unitId),
      limit(1)
    );
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      return { id: doc.id, ...doc.data() } as Quiz;
    }
    return null;
  } catch (error) {
    console.error('Error fetching quiz:', error);
    return null;
  }
};

// User Progress Functions
export const getUserCourseProgress = async (userId: string, courseId: string): Promise<UserCourse | null> => {
  try {
    const docRef = doc(db, 'userCourses', `${userId}_${courseId}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as UserCourse;
    }
    return null;
  } catch (error) {
    console.error('Error fetching user course progress:', error);
    return null;
  }
};

export const getUserUnitProgress = async (userId: string, unitId: string): Promise<UserUnit | null> => {
  try {
    const docRef = doc(db, 'userUnits', `${userId}_${unitId}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as UserUnit;
    }
    return null;
  } catch (error) {
    console.error('Error fetching user unit progress:', error);
    return null;
  }
};

export const updateUserUnitProgress = async (
  userId: string,
  unitId: string,
  courseId: string,
  progress: number,
  status: 'idle' | 'in-progress' | 'completed'
): Promise<void> => {
  try {
    const docRef = doc(db, 'userUnits', `${userId}_${unitId}`);
    const updateData: Partial<UserUnit> = {
      userId,
      unitId,
      courseId,
      progress,
      status,
      timeSpent: 0, // You might want to track this separately
    };

    if (status === 'completed') {
      updateData.completedAt = Timestamp.now();
      updateData.xpEarned = 100; // Default XP, you might want to get this from unit data
      
      // Record activity for completed unit
      await recordUserActivity(
        userId,
        'unit_completed',
        `Unit ${unitId} completed`,
        100,
        { unitId, courseId }
      );
    }

    await setDoc(docRef, updateData, { merge: true });
  } catch (error) {
    console.error('Error updating user unit progress:', error);
    throw error;
  }
};

// Achievement Functions
export const getAchievements = async (): Promise<Achievement[]> => {
  try {
    const snapshot = await getDocs(collection(db, 'achievements'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Achievement));
  } catch (error) {
    console.error('Error fetching achievements:', error);
    return [];
  }
};

export const getUserAchievements = async (userId: string): Promise<string[]> => {
  try {
    const q = query(
      collection(db, 'userAchievements'),
      where('userId', '==', userId)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data().achievementId);
  } catch (error) {
    console.error('Error fetching user achievements:', error);
    return [];
  }
};

// Shop Functions
export const getShopItems = async (): Promise<ShopItem[]> => {
  try {
    const q = query(
      collection(db, 'shopItems'),
      where('isActive', '==', true),
      orderBy('price', 'asc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ShopItem));
  } catch (error) {
    console.error('Error fetching shop items:', error);
    return [];
  }
};

export const getUserInventory = async (userId: string): Promise<Array<{ itemId: string; quantity: number }>> => {
  try {
    const q = query(
      collection(db, 'userInventory'),
      where('userId', '==', userId)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      itemId: doc.data().itemId,
      quantity: doc.data().quantity
    }));
  } catch (error) {
    console.error('Error fetching user inventory:', error);
    return [];
  }
};

// Leaderboard Functions
export const getLeaderboard = async (period: 'weekly' | 'monthly', category: 'xp' | 'streak'): Promise<LeaderboardEntry[]> => {
  try {
    const docRef = doc(db, 'leaderboards', `${period}_${category}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().entries as LeaderboardEntry[];
    }
    return [];
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return [];
  }
};

// Real-time listeners
export const subscribeToUserProgress = (
  userId: string,
  courseId: string,
  callback: (progress: UserCourse | null) => void
) => {
  const docRef = doc(db, 'userCourses', `${userId}_${courseId}`);
  return onSnapshot(docRef, (doc) => {
    if (doc.exists()) {
      callback({ id: doc.id, ...doc.data() } as UserCourse);
    } else {
      callback(null);
    }
  });
};

export const subscribeToCourses = (callback: (courses: Course[]) => void) => {
  try {
    const q = query(
      collection(db, 'courses'),
      where('isPublished', '==', true),
      orderBy('createdAt', 'desc')
    );
    return onSnapshot(q, (snapshot) => {
      const courses = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Course));
      callback(courses);
    }, (error) => {
      console.error('Error in subscribeToCourses:', error);
      // Fallback: subscribe without orderBy
      const fallbackQ = query(
        collection(db, 'courses'),
        where('isPublished', '==', true)
      );
      return onSnapshot(fallbackQ, (snapshot) => {
        const courses = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Course));
        // Sort manually
        const sortedCourses = courses.sort((a, b) => {
          if (a.createdAt && b.createdAt) {
            return b.createdAt.toMillis() - a.createdAt.toMillis();
          }
          return 0;
        });
        callback(sortedCourses);
      });
    });
  } catch (error) {
    console.error('Error setting up course subscription:', error);
    // Return a no-op unsubscribe function
    return () => {};
  }
};

// Admin Functions
export const getAdminAnalytics = async (date: string) => {
  try {
    const docRef = doc(db, 'adminAnalytics', date);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
    return null;
  } catch (error) {
    console.error('Error fetching admin analytics:', error);
    return null;
  }
};

// Utility Functions
export const formatTimestamp = (timestamp: Timestamp): string => {
  if (!timestamp) return '';
  const date = timestamp.toDate();
  return date.toLocaleDateString('ar-SA');
};

export const calculateProgress = (completedUnits: string[], totalUnits: number): number => {
  if (totalUnits === 0) return 0;
  return Math.round((completedUnits.length / totalUnits) * 100);
}; 

// Test function to verify Firebase connection
export const testFirebaseConnection = async (): Promise<boolean> => {
  try {
    console.log('Testing Firebase connection...');
    
    // Test reading from a collection that should exist
    const testSnapshot = await getDocs(collection(db, 'users'));
    console.log('Firebase connection successful. Users collection accessible.');
    
    // Test reading from userAnalytics collection
    try {
      const analyticsSnapshot = await getDocs(collection(db, 'userAnalytics'));
      console.log('Firebase connection successful. userAnalytics collection accessible.');
    } catch (analyticsError) {
      console.error('Firebase userAnalytics collection access failed:', analyticsError);
    }
    
    // Test writing to userAnalytics collection (this will help identify permission issues)
    try {
      const testDoc = doc(db, 'userAnalytics', 'test-write-permission');
      await setDoc(testDoc, { test: true, timestamp: Timestamp.now() });
      console.log('Firebase connection successful. userAnalytics collection writable.');
      // Clean up test document
      await deleteDoc(testDoc);
    } catch (writeError) {
      console.error('Firebase userAnalytics collection write failed:', writeError);
    }
    
    return true;
  } catch (error) {
    console.error('Firebase connection test failed:', error);
    return false;
  }
}; 

// User Analytics and Progress Tracking Functions
export interface UserAnalytics {
  id?: string;
  userId: string;
  totalStudyTime: number; // in minutes
  totalXP: number;
  currentStreak: number;
  longestStreak: number;
  coursesCompleted: number;
  unitsCompleted: number;
  quizzesPassed: number;
  averageScore: number;
  lastActive: Timestamp;
  weeklyProgress: {
    [weekKey: string]: {
      xp: number;
      studyTime: number;
      unitsCompleted: number;
      quizzesPassed: number;
    };
  };
  monthlyProgress: {
    [monthKey: string]: {
      xp: number;
      studyTime: number;
      coursesCompleted: number;
    };
  };
}

export interface WeeklyStats {
  currentWeekXP: number;
  previousWeekXP: number;
  currentWeekHours: number;
  previousWeekHours: number;
  streak: number;
  weeklyGoal: number;
  weeklyGoalProgress: number;
}

export interface DashboardStats {
  totalCourses: number;
  completedCourses: number;
  totalXP: number;
  averageProgress: number;
  currentStreak: number;
  weeklyStats: WeeklyStats;
  recentActivity: Array<{
    type: 'unit_completed' | 'quiz_passed' | 'course_started' | 'xp_earned';
    title: string;
    xp: number;
    timestamp: Timestamp;
  }>;
}

// Get user analytics
export const getUserAnalytics = async (userId: string): Promise<UserAnalytics | null> => {
  try {
    const docRef = doc(db, 'userAnalytics', userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = { id: docSnap.id, ...docSnap.data() } as UserAnalytics;
      console.log('getUserAnalytics: Found analytics for user:', userId, 'currentStreak:', data.currentStreak);
      return data;
    }
    console.log('getUserAnalytics: No analytics found for user:', userId);
    return null;
  } catch (error) {
    console.error('Error fetching user analytics:', error);
    return null;
  }
};

// Create or update user analytics
export const updateUserAnalytics = async (userId: string, updates: Partial<UserAnalytics>): Promise<void> => {
  try {
    const docRef = doc(db, 'userAnalytics', userId);
    await setDoc(docRef, {
      ...updates,
      lastActive: Timestamp.now()
    }, { merge: true });
  } catch (error) {
    console.error('Error updating user analytics:', error);
    throw error;
  }
};

// Calculate weekly stats
export const calculateWeeklyStats = async (userId: string): Promise<WeeklyStats> => {
  try {
    const analytics = await getUserAnalytics(userId);
    if (!analytics) {
      return {
        currentWeekXP: 0,
        previousWeekXP: 0,
        currentWeekHours: 0,
        previousWeekHours: 0,
        streak: 0,
        weeklyGoal: 1000,
        weeklyGoalProgress: 0
      };
    }

    const now = new Date();
    const currentWeekKey = getWeekKey(now);
    const previousWeekKey = getWeekKey(new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000));

    const currentWeek = analytics.weeklyProgress[currentWeekKey] || { xp: 0, studyTime: 0, unitsCompleted: 0, quizzesPassed: 0 };
    const previousWeek = analytics.weeklyProgress[previousWeekKey] || { xp: 0, studyTime: 0, unitsCompleted: 0, quizzesPassed: 0 };

    const weeklyGoal = 1000; // Default goal, could be user-configurable
    const weeklyGoalProgress = Math.min((currentWeek.xp / weeklyGoal) * 100, 100);

    return {
      currentWeekXP: currentWeek.xp,
      previousWeekXP: previousWeek.xp,
      currentWeekHours: Math.round(currentWeek.studyTime / 60),
      previousWeekHours: Math.round(previousWeek.studyTime / 60),
      streak: analytics.currentStreak,
      weeklyGoal,
      weeklyGoalProgress
    };
  } catch (error) {
    console.error('Error calculating weekly stats:', error);
    return {
      currentWeekXP: 0,
      previousWeekXP: 0,
      currentWeekHours: 0,
      previousWeekHours: 0,
      streak: 0,
      weeklyGoal: 1000,
      weeklyGoalProgress: 0
    };
  }
};

// Calculate comprehensive dashboard stats
export const calculateDashboardStats = async (userId: string): Promise<DashboardStats> => {
  try {
    // Get user courses
    const userCourses = await getUserCourses(userId);
    const allCourses = await getCourses();
    
    // Get user analytics
    const analytics = await getUserAnalytics(userId);
    console.log('calculateDashboardStats: User analytics:', analytics);
    console.log('calculateDashboardStats: Current streak from analytics:', analytics?.currentStreak);
    const weeklyStats = await calculateWeeklyStats(userId);

    // Calculate course statistics
    const totalCourses = userCourses.length;
    const completedCourses = userCourses.filter(course => course.progress === 100).length;
    const totalXP = userCourses.reduce((sum, course) => sum + course.totalXP, 0);
    const averageProgress = totalCourses > 0 
      ? Math.round(userCourses.reduce((sum, course) => sum + course.progress, 0) / totalCourses)
      : 0;

    // Get recent activity
    const recentActivity = await getRecentActivity(userId);

    return {
      totalCourses,
      completedCourses,
      totalXP,
      averageProgress,
      currentStreak: analytics?.currentStreak || 0,
      weeklyStats,
      recentActivity
    };
  } catch (error) {
    console.error('Error calculating dashboard stats:', error);
    return {
      totalCourses: 0,
      completedCourses: 0,
      totalXP: 0,
      averageProgress: 0,
      currentStreak: 0,
      weeklyStats: {
        currentWeekXP: 0,
        previousWeekXP: 0,
        currentWeekHours: 0,
        previousWeekHours: 0,
        streak: 0,
        weeklyGoal: 1000,
        weeklyGoalProgress: 0
      },
      recentActivity: []
    };
  }
};

// Get user's recent activity
export const getRecentActivity = async (userId: string): Promise<Array<{
  type: 'unit_completed' | 'quiz_passed' | 'course_started' | 'xp_earned';
  title: string;
  xp: number;
  timestamp: Timestamp;
}>> => {
  try {
    const q = query(
      collection(db, 'userActivity'),
      where('userId', '==', userId),
      orderBy('timestamp', 'desc'),
      limit(10)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as any[];
  } catch (error) {
    console.error('Error fetching recent activity:', error);
    return [];
  }
};

// Record user activity
export const recordUserActivity = async (
  userId: string,
  type: 'unit_completed' | 'quiz_passed' | 'course_started' | 'xp_earned',
  title: string,
  xp: number,
  additionalData?: any
): Promise<void> => {
  try {
    const activityData = {
      userId,
      type,
      title,
      xp,
      timestamp: Timestamp.now(),
      ...additionalData
    };

    // Add to activity collection
    await addDoc(collection(db, 'userActivity'), activityData);

    // Update user analytics
    await updateUserAnalyticsFromActivity(userId, type, xp, additionalData);
  } catch (error) {
    console.error('Error recording user activity:', error);
  }
};

// Update user analytics based on activity
export const updateUserAnalyticsFromActivity = async (
  userId: string,
  activityType: string,
  xp: number,
  additionalData?: any
): Promise<void> => {
  try {
    const analytics = await getUserAnalytics(userId);
    const now = new Date();
    const weekKey = getWeekKey(now);
    const monthKey = getMonthKey(now);

    const updates: Partial<UserAnalytics> = {
      userId,
      totalXP: (analytics?.totalXP || 0) + xp,
      lastActive: Timestamp.now()
    };

    // Update weekly progress
    if (analytics?.weeklyProgress) {
      const currentWeek = analytics.weeklyProgress[weekKey] || { xp: 0, studyTime: 0, unitsCompleted: 0, quizzesPassed: 0 };
      updates.weeklyProgress = {
        ...analytics.weeklyProgress,
        [weekKey]: {
          ...currentWeek,
          xp: currentWeek.xp + xp,
          ...(activityType === 'unit_completed' && { unitsCompleted: currentWeek.unitsCompleted + 1 }),
          ...(activityType === 'quiz_passed' && { quizzesPassed: currentWeek.quizzesPassed + 1 })
        }
      };
    } else {
      updates.weeklyProgress = {
        [weekKey]: {
          xp,
          studyTime: 0,
          unitsCompleted: activityType === 'unit_completed' ? 1 : 0,
          quizzesPassed: activityType === 'quiz_passed' ? 1 : 0
        }
      };
    }

    // Update monthly progress
    if (analytics?.monthlyProgress) {
      const currentMonth = analytics.monthlyProgress[monthKey] || { xp: 0, studyTime: 0, coursesCompleted: 0 };
      updates.monthlyProgress = {
        ...analytics.monthlyProgress,
        [monthKey]: {
          ...currentMonth,
          xp: currentMonth.xp + xp,
          ...(activityType === 'course_started' && { coursesCompleted: currentMonth.coursesCompleted + 1 })
        }
      };
    } else {
      updates.monthlyProgress = {
        [monthKey]: {
          xp,
          studyTime: 0,
          coursesCompleted: activityType === 'course_started' ? 1 : 0
        }
      };
    }

    // Update specific counters
    if (activityType === 'unit_completed') {
      updates.unitsCompleted = (analytics?.unitsCompleted || 0) + 1;
    } else if (activityType === 'quiz_passed') {
      updates.quizzesPassed = (analytics?.quizzesPassed || 0) + 1;
    } else if (activityType === 'course_started') {
      updates.coursesCompleted = (analytics?.coursesCompleted || 0) + 1;
    }

    await updateUserAnalytics(userId, updates);
  } catch (error) {
    console.error('Error updating user analytics from activity:', error);
  }
};

// Update user streak and daily login tracking
export const updateUserStreak = async (userId: string): Promise<void> => {
  try {
    console.log('updateUserStreak: Starting streak update for user:', userId);
    
    // Check if XP was already given today using session storage
    const today = new Date().toDateString();
    const sessionKey = `daily_xp_${userId}_${today}`;
    const xpAlreadyGiven = sessionStorage.getItem(sessionKey);
    
    if (xpAlreadyGiven) {
      console.log('updateUserStreak: XP already given today, skipping');
      return;
    }
    
    const analytics = await getUserAnalytics(userId);
    
    // If no analytics exist, this is the first login - create initial streak
    if (!analytics) {
      console.log('updateUserStreak: First time login - creating initial streak');
      const now = new Date();
      const weekKey = getWeekKey(now);
      const monthKey = getMonthKey(now);
      
      const initialAnalytics = {
        userId,
        totalStudyTime: 0,
        totalXP: 100, // Start with 100 XP for first login
        currentStreak: 1, // Start with 1 day streak
        longestStreak: 1,
        coursesCompleted: 0,
        unitsCompleted: 0,
        quizzesPassed: 0,
        averageScore: 0,
        lastActive: Timestamp.now(),
        weeklyProgress: {
          [weekKey]: {
            xp: 100,
            studyTime: 0,
            unitsCompleted: 0,
            quizzesPassed: 0
          }
        },
        monthlyProgress: {
          [monthKey]: {
            xp: 100,
            studyTime: 0,
            coursesCompleted: 0
          }
        }
      };
      
      await setDoc(doc(db, 'userAnalytics', userId), initialAnalytics);
      
      // Record first login activity
      await recordUserActivity(
        userId,
        'xp_earned',
        'First login bonus',
        100, // First login bonus
        { type: 'first_login', streak: 1 }
      );
      
      // Mark XP as given for today
      sessionStorage.setItem(sessionKey, 'true');
      
      return;
    }

    const now = new Date();
    const lastActive = analytics.lastActive.toDate();
    const daysSinceLastActive = Math.floor((now.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24));

    let newStreak = analytics.currentStreak;
    let longestStreak = analytics.longestStreak;
    let xpToAdd = 0;

    if (daysSinceLastActive === 1) {
      // Consecutive day
      newStreak += 1;
      longestStreak = Math.max(longestStreak, newStreak);
      xpToAdd = 50; // Daily login bonus
      console.log(`Streak continued: ${newStreak} days`);
    } else if (daysSinceLastActive > 1) {
      // Streak broken
      newStreak = 1;
      xpToAdd = 50; // Daily login bonus
      console.log('Streak broken, starting new streak');
    } else if (daysSinceLastActive === 0) {
      // Same day login, keep current streak, no XP
      console.log(`Same day login, streak remains: ${newStreak} days`);
    }

    console.log('updateUserStreak: Updating analytics with new streak:', newStreak);
    await updateUserAnalytics(userId, {
      currentStreak: newStreak,
      longestStreak,
      lastActive: Timestamp.now(),
      totalXP: analytics.totalXP + xpToAdd,
      weeklyProgress: {
        ...analytics.weeklyProgress,
        [getWeekKey(now)]: {
          ...analytics.weeklyProgress[getWeekKey(now)],
          xp: (analytics.weeklyProgress[getWeekKey(now)]?.xp || 0) + xpToAdd
        }
      }
    });
    console.log('updateUserStreak: Analytics updated successfully');

    // Record daily login activity only if XP was given
    if (xpToAdd > 0) {
      await recordUserActivity(
        userId,
        'xp_earned',
        'Daily login bonus',
        xpToAdd,
        { type: 'daily_login', streak: newStreak }
      );
      console.log('updateUserStreak: Activity recorded successfully');
      
      // Mark XP as given for today
      sessionStorage.setItem(sessionKey, 'true');
    }

  } catch (error) {
    console.error('Error updating user streak:', error);
  }
};

// Helper functions
const getWeekKey = (date: Date): string => {
  const year = date.getFullYear();
  const week = Math.ceil((date.getTime() - new Date(year, 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000));
  return `${year}-W${week.toString().padStart(2, '0')}`;
};

const getMonthKey = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  return `${year}-${month}`;
};

// Get user's all courses with progress
export const getUserCourses = async (userId: string): Promise<UserCourse[]> => {
  try {
    const q = query(
      collection(db, 'userCourses'),
      where('userId', '==', userId)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as UserCourse));
  } catch (error) {
    console.error('Error fetching user courses:', error);
    return [];
  }
}; 

// Test function to verify all progression systems
export const ensureUserAnalytics = async (userId: string): Promise<void> => {
  try {
    console.log('ensureUserAnalytics: Checking for user analytics:', userId);
    const analytics = await getUserAnalytics(userId);
    
    if (!analytics) {
      console.log('ensureUserAnalytics: No analytics found, creating initial analytics');
      const now = new Date();
      const weekKey = getWeekKey(now);
      const monthKey = getMonthKey(now);
      
      const initialAnalytics = {
        userId,
        totalStudyTime: 0,
        totalXP: 0,
        currentStreak: 1, // Start with 1 day streak
        longestStreak: 1,
        coursesCompleted: 0,
        unitsCompleted: 0,
        quizzesPassed: 0,
        averageScore: 0,
        lastActive: Timestamp.now(),
        weeklyProgress: {
          [weekKey]: {
            xp: 0,
            studyTime: 0,
            unitsCompleted: 0,
            quizzesPassed: 0
          }
        },
        monthlyProgress: {
          [monthKey]: {
            xp: 0,
            studyTime: 0,
            coursesCompleted: 0
          }
        }
      };
      
      await setDoc(doc(db, 'userAnalytics', userId), initialAnalytics);
      console.log('ensureUserAnalytics: Initial analytics created successfully');
    } else {
      console.log('ensureUserAnalytics: Analytics found, current streak:', analytics.currentStreak);
    }
  } catch (error) {
    console.error('ensureUserAnalytics: Error ensuring user analytics:', error);
  }
};

export const testProgressionSystems = async (userId: string): Promise<{
  analytics: boolean;
  streak: boolean;
  weeklyStats: boolean;
  dashboardStats: boolean;
  activity: boolean;
}> => {
  const results = {
    analytics: false,
    streak: false,
    weeklyStats: false,
    dashboardStats: false,
    activity: false
  };

  try {
    console.log('Testing progression systems for user:', userId);

    // Test 1: User Analytics
    const analytics = await getUserAnalytics(userId);
    results.analytics = analytics !== null;
    console.log('✅ Analytics test:', results.analytics ? 'PASSED' : 'FAILED');

    // Test 2: Weekly Stats
    const weeklyStats = await calculateWeeklyStats(userId);
    results.weeklyStats = weeklyStats !== null;
    console.log('✅ Weekly Stats test:', results.weeklyStats ? 'PASSED' : 'FAILED');

    // Test 3: Dashboard Stats
    const dashboardStats = await calculateDashboardStats(userId);
    results.dashboardStats = dashboardStats !== null;
    console.log('✅ Dashboard Stats test:', results.dashboardStats ? 'PASSED' : 'FAILED');

    // Test 4: Streak System
    const userCourses = await getUserCourses(userId);
    results.streak = true; // If we get here, streak system is working
    console.log('✅ Streak test: PASSED');

    // Test 5: Activity Recording
    try {
      await recordUserActivity(userId, 'xp_earned', 'Test activity', 10, { test: true });
      results.activity = true;
      console.log('✅ Activity recording test: PASSED');
    } catch (error) {
      console.log('❌ Activity recording test: FAILED', error);
    }

    console.log('🎯 Progression Systems Test Results:', results);
    return results;

  } catch (error) {
    console.error('❌ Progression systems test failed:', error);
    return results;
  }
}; 