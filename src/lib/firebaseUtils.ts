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
    const q = query(
      collection(db, 'courses'),
      where('isPublished', '==', true),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Course));
  } catch (error) {
    console.error('Error fetching courses:', error);
    return [];
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
  const q = query(
    collection(db, 'courses'),
    where('isPublished', '==', true),
    orderBy('createdAt', 'desc')
  );
  return onSnapshot(q, (snapshot) => {
    const courses = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Course));
    callback(courses);
  });
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