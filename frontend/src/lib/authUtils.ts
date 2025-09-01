import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  UserCredential 
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import { Timestamp } from "firebase/firestore";

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  level: number;
  xp: number;
  streak: number;
  coins: number;
  createdAt: Date;
  lastActive: Date;
  isBlocked: boolean;
  preferences: {
    notifications: boolean;
    language: 'ar' | 'en';
    theme: 'dark' | 'light';
  };
  stats: {
    totalStudyTime: number;
    coursesCompleted: number;
    totalXP: number;
    achievements: string[];
  };
}

export async function signup(
  email: string, 
  password: string, 
  name: string
): Promise<User> {
  try {
    // Create Firebase Auth user
    const userCredential: UserCredential = await createUserWithEmailAndPassword(
      auth, 
      email, 
      password
    );
    
    const { user } = userCredential;
    
    // Create user document in Firestore
    const userData: User = {
      id: user.uid,
      name,
      email,
      role: 'student',
      level: 1,
      xp: 0,
      streak: 1, // Start with 1 day streak
      coins: 100, // Starting coins
      createdAt: new Date(),
      lastActive: new Date(),
      isBlocked: false,
      preferences: {
        notifications: true,
        language: 'ar',
        theme: 'dark'
      },
      stats: {
        totalStudyTime: 0,
        coursesCompleted: 0,
        totalXP: 0,
        achievements: []
      }
    };
    
    // Save to Firestore
    await setDoc(doc(db, "users", user.uid), userData);
    
    // Initialize user analytics
    const now = new Date();
    const weekKey = `${now.getFullYear()}-W${Math.ceil((now.getTime() - new Date(now.getFullYear(), 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000)).toString().padStart(2, '0')}`;
    const monthKey = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}`;
    
    const initialAnalytics = {
      userId: user.uid,
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
    
    await setDoc(doc(db, "userAnalytics", user.uid), initialAnalytics);
    
    return userData;
  } catch (error) {
    throw new Error(`Signup failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function signin(email: string, password: string): Promise<User> {
  try {
    // Sign in with Firebase Auth
    const userCredential: UserCredential = await signInWithEmailAndPassword(
      auth, 
      email, 
      password
    );
    
    const { user } = userCredential;
    
    // Get user data from Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid));
    
    let userData: User;
    
    if (!userDoc.exists()) {
      // User exists in Auth but not in Firestore - create the document
      console.log("User exists in Auth but not in Firestore. Creating Firestore document...");
      
      userData = {
        id: user.uid,
        name: user.displayName || email.split('@')[0], // Use display name or email prefix
        email: user.email || email,
        role: 'student',
        level: 1,
        xp: 0,
        streak: 1, // Start with 1 day streak
        coins: 100,
        createdAt: new Date(),
        lastActive: new Date(),
        isBlocked: false,
        preferences: {
          notifications: true,
          language: 'ar',
          theme: 'dark'
        },
        stats: {
          totalStudyTime: 0,
          coursesCompleted: 0,
          totalXP: 0,
          achievements: []
        }
      };
      
      // Create the Firestore document
      await setDoc(doc(db, "users", user.uid), userData);
      
      // Initialize user analytics
      const now = new Date();
      const weekKey = `${now.getFullYear()}-W${Math.ceil((now.getTime() - new Date(now.getFullYear(), 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000)).toString().padStart(2, '0')}`;
      const monthKey = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}`;
      
      const initialAnalytics = {
        userId: user.uid,
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
      
      await setDoc(doc(db, "userAnalytics", user.uid), initialAnalytics);
    } else {
      // User exists in both Auth and Firestore
      userData = userDoc.data() as User;
      
      // Update lastActive timestamp
      await setDoc(doc(db, "users", user.uid), {
        ...userData,
        lastActive: new Date()
      }, { merge: true });
      
      userData = {
        ...userData,
        lastActive: new Date()
      };
    }
    
    return userData;
  } catch (error) {
    throw new Error(`Signin failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
} 