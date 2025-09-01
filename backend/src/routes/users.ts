import express, { Request, Response } from 'express';
import { body, validationResult, query } from 'express-validator';
import { getAuth } from '../database/connection.js';
import { db } from '../database/connection.js';
import { verifyFirebaseToken, requireRole } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { logger } from '../utils/logger.js';
import { AppError } from '../middleware/errorHandler.js';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(verifyFirebaseToken);

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 */
router.get('/profile', asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new AppError('Authentication required', 401, 'AUTHENTICATION_REQUIRED');
  }

  try {
    const auth = getAuth();
    const userRecord = await auth.getUser(req.user.uid);
    const customClaims = userRecord.customClaims || {};

    // Get additional user data from Firestore
    const userDoc = await db.users().doc(req.user.uid).get();
    const userData = userDoc.exists ? userDoc.data() : {};

    res.json({
      success: true,
      data: {
        user: {
          uid: userRecord.uid,
          email: userRecord.email,
          name: userRecord.displayName,
          role: customClaims.role || 'student',
          grade: customClaims.grade,
          photoURL: userRecord.photoURL,
          emailVerified: userRecord.emailVerified,
          createdAt: userRecord.metadata.creationTime,
          lastSignIn: userRecord.metadata.lastSignInTime,
          ...userData
        }
      }
    });
  } catch (error) {
    throw new AppError('Failed to get user profile', 500, 'PROFILE_RETRIEVAL_FAILED');
  }
}));

/**
 * @swagger
 * /api/users/profile:
 *   put:
 *     summary: Update user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               grade:
 *                 type: string
 *               bio:
 *                 type: string
 *               preferences:
 *                 type: object
 *     responses:
 *       200:
 *         description: Profile updated successfully
 */
router.put('/profile', [
  body('name').optional().trim().isLength({ min: 2 }),
  body('grade').optional().trim().notEmpty(),
  body('bio').optional().trim(),
  body('preferences').optional().isObject()
], asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new AppError('Authentication required', 401, 'AUTHENTICATION_REQUIRED');
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError('Validation failed', 400, 'VALIDATION_ERROR');
  }

  const { name, grade, bio, preferences } = req.body;

  try {
    const auth = getAuth();
    const updates: any = {};

    // Update Firebase Auth display name if provided
    if (name) {
      updates.displayName = name;
    }

    // Update custom claims if grade is provided
    if (grade) {
      const userRecord = await auth.getUser(req.user.uid);
      const customClaims = userRecord.customClaims || {};
      
      await auth.setCustomUserClaims(req.user.uid, {
        ...customClaims,
        grade
      });
    }

    // Update Firebase Auth profile
    if (Object.keys(updates).length > 0) {
      await auth.updateUser(req.user.uid, updates);
    }

    // Update Firestore user data
    const userData: any = {};
    if (name) userData.name = name;
    if (grade) userData.grade = grade;
    if (bio !== undefined) userData.bio = bio;
    if (preferences) userData.preferences = preferences;
    
    userData.updatedAt = db.serverTimestamp();

    if (Object.keys(userData).length > 0) {
      await db.users().doc(req.user.uid).set(userData, { merge: true });
    }

    logger.info('User profile updated:', { uid: req.user.uid, updates: userData });

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: { updates: userData }
    });
  } catch (error) {
    throw new AppError('Failed to update profile', 500, 'PROFILE_UPDATE_FAILED');
  }
}));

/**
 * @swagger
 * /api/users/search:
 *   get:
 *     summary: Search users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Search query
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *           enum: [student, teacher, admin]
 *         description: Filter by role
 *       - in: query
 *         name: grade
 *         schema:
 *           type: string
 *         description: Filter by grade
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Number of results to return
 *     responses:
 *       200:
 *         description: Users found successfully
 */
router.get('/search', [
  query('q').optional().trim(),
  query('role').optional().isIn(['student', 'teacher', 'admin']),
  query('grade').optional().trim(),
  query('limit').optional().isInt({ min: 1, max: 100 }).toInt()
], asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new AppError('Authentication required', 401, 'AUTHENTICATION_REQUIRED');
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError('Validation failed', 400, 'VALIDATION_ERROR');
  }

  const { q, role, grade, limit = 20 } = req.query as { q?: string; role?: string; grade?: string; limit?: number };

  try {
    let query = db.users().limit(limit);

    // Apply filters
    if (role) {
      query = query.where('role', '==', role);
    }
    if (grade) {
      query = query.where('grade', '==', grade);
    }

    const snapshot = await query.get();
    const users: any[] = [];

    for (const doc of snapshot.docs) {
      const userData = doc.data();
      
      // Filter by search query if provided
      if (q && !userData.name?.toLowerCase().includes(q.toLowerCase())) {
        continue;
      }

      users.push({
        uid: doc.id,
        name: userData.name,
        role: userData.role,
        grade: userData.grade,
        photoURL: userData.photoURL,
        bio: userData.bio
      });
    }

    res.json({
      success: true,
      data: {
        users,
        total: users.length,
        limit
      }
    });
  } catch (error) {
    throw new AppError('Failed to search users', 500, 'USER_SEARCH_FAILED');
  }
}));

/**
 * @swagger
 * /api/users/{uid}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User found successfully
 *       404:
 *         description: User not found
 */
router.get('/:uid', asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new AppError('Authentication required', 401, 'AUTHENTICATION_REQUIRED');
  }

  const { uid } = req.params as { uid: string };

  try {
    // Get user from Firestore
    const userDoc = await db.users().doc(uid).get();
    
    if (!userDoc.exists) {
      throw new AppError('User not found', 404, 'USER_NOT_FOUND');
    }

    const userData = userDoc.data();

    res.json({
      success: true,
      data: {
        user: {
          uid: userDoc.id,
          name: userData?.name,
          role: userData?.role,
          grade: userData?.grade,
          photoURL: userData?.photoURL,
          bio: userData?.bio,
          createdAt: userData?.createdAt,
          updatedAt: userData?.updatedAt
        }
      }
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError('Failed to get user', 500, 'USER_RETRIEVAL_FAILED');
  }
}));

/**
 * @swagger
 * /api/users/{uid}:
 *   delete:
 *     summary: Delete user (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       403:
 *         description: Insufficient permissions
 */
router.delete('/:uid', requireRole('admin'), asyncHandler(async (req: Request, res: Response) => {
  const { uid } = req.params as { uid: string };

  try {
    const auth = getAuth();
    
    // Delete from Firebase Auth
    await auth.deleteUser(uid);
    
    // Delete from Firestore
    await db.users().doc(uid).delete();
    
    // Delete related data (enrollments, progress, etc.)
    // This would need to be implemented based on your data structure
    
    logger.info('User deleted by admin:', { uid, deletedBy: req.user?.uid });

    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error: any) {
    if (error.code === 'auth/user-not-found') {
      throw new AppError('User not found', 404, 'USER_NOT_FOUND');
    }
    throw new AppError('Failed to delete user', 500, 'USER_DELETION_FAILED');
  }
}));

export default router;
