import admin from 'firebase-admin';
import { config } from '../config/index.js';
import { logger } from '../utils/logger.js';

// Initialize Firebase Admin SDK
let firebaseApp: admin.app.App;

export const initializeFirebase = () => {
  try {
    if (admin.apps.length === 0) {
      firebaseApp = admin.initializeApp({
        credential: admin.credential.cert({
          projectId: config.firebase.projectId,
          privateKey: config.firebase.privateKey,
          clientEmail: config.firebase.clientEmail
        }),
        storageBucket: `${config.firebase.projectId}.appspot.com`,
        databaseURL: `https://${config.firebase.projectId}-default-rtdb.firebaseio.com`
      });
      
      logger.info('Firebase Admin SDK initialized successfully');
    } else {
      firebaseApp = admin.apps[0] as admin.app.App;
      logger.info('Firebase Admin SDK already initialized');
    }
    
    return firebaseApp;
  } catch (error) {
    logger.error('Failed to initialize Firebase Admin SDK:', error);
    throw error;
  }
};

// Get Firestore instance
export const getFirestore = () => {
  if (!firebaseApp) {
    throw new Error('Firebase Admin SDK not initialized');
  }
  return admin.firestore(firebaseApp);
};

// Get Firebase Auth instance
export const getAuth = () => {
  if (!firebaseApp) {
    throw new Error('Firebase Admin SDK not initialized');
  }
  return admin.auth(firebaseApp);
};

// Get Firebase Storage instance
export const getStorage = () => {
  if (!firebaseApp) {
    throw new Error('Firebase Admin SDK not initialized');
  }
  return admin.storage(firebaseApp);
};

// Get Firebase Realtime Database instance
export const getDatabase = () => {
  if (!firebaseApp) {
    throw new Error('Firebase Admin SDK not initialized');
  }
  return admin.database(firebaseApp);
};

// Connect to database
export const connectDatabase = async () => {
  try {
    const app = initializeFirebase();
    
    // Test the connection by getting Firestore instance
    const db = getFirestore();
    
    // Test write permission with a simple operation
    const testDoc = db.collection('_test').doc('connection');
    await testDoc.set({
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      test: true
    });
    
    // Clean up test document
    await testDoc.delete();
    
    logger.info('Database connection established successfully');
    return app;
  } catch (error) {
    logger.error('Failed to connect to database:', error);
    throw error;
  }
};

// Disconnect from database
export const disconnectDatabase = async () => {
  try {
    if (firebaseApp) {
      await firebaseApp.delete();
      logger.info('Database connection closed successfully');
    }
  } catch (error) {
    logger.error('Error closing database connection:', error);
  }
};

// Database utility functions
export const db = {
  // Firestore collections
  users: () => getFirestore().collection('users'),
  courses: () => getFirestore().collection('courses'),
  units: () => getFirestore().collection('units'),
  lessons: () => getFirestore().collection('lessons'),
  progress: () => getFirestore().collection('progress'),
  leaderboards: () => getFirestore().collection('leaderboards'),
  enrollments: () => getFirestore().collection('enrollments'),
  quizzes: () => getFirestore().collection('quizzes'),
  submissions: () => getFirestore().collection('submissions'),
  notifications: () => getFirestore().collection('notifications'),
  achievements: () => getFirestore().collection('achievements'),
  
  // Batch operations
  batch: () => getFirestore().batch(),
  
  // Transaction operations
  runTransaction: (updateFunction: (transaction: admin.firestore.Transaction) => Promise<any>) => {
    return getFirestore().runTransaction(updateFunction);
  },
  
  // Field values
  serverTimestamp: () => admin.firestore.FieldValue.serverTimestamp(),
  delete: () => admin.firestore.FieldValue.delete(),
  increment: (n: number) => admin.firestore.FieldValue.increment(n),
  arrayUnion: (...elements: any[]) => admin.firestore.FieldValue.arrayUnion(...elements),
  arrayRemove: (...elements: any[]) => admin.firestore.FieldValue.arrayRemove(...elements)
};

// Export Firebase Admin for direct use if needed
export { admin };

export default {
  connectDatabase,
  disconnectDatabase,
  getFirestore,
  getAuth,
  getStorage,
  getDatabase,
  db
};
