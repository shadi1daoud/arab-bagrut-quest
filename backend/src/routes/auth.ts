import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { getAuth } from '../database/connection.js';
import { generateToken, generateRefreshToken } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { logger } from '../utils/logger.js';
import { AppError } from '../middleware/errorHandler.js';
import jwt from 'jsonwebtoken';
import { config } from '../config/index.js';

const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - name
 *               - grade
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 6
 *               name:
 *                 type: string
 *               grade:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [student, teacher, admin]
 *                 default: student
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 *       409:
 *         description: Email already exists
 */
router.post('/register', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('name').trim().isLength({ min: 2 }),
  body('grade').trim().notEmpty(),
  body('role').optional().isIn(['student', 'teacher', 'admin'])
], asyncHandler(async (req: Request, res: Response) => {
  // Check validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError('Validation failed', 400, 'VALIDATION_ERROR');
  }

  const { email, password, name, grade, role = 'student' } = req.body;

  try {
    const auth = getAuth();
    
    // Check if user already exists
    try {
      await auth.getUserByEmail(email);
      throw new AppError('Email already exists', 409, 'EMAIL_ALREADY_EXISTS');
    } catch (error: any) {
      if (error.code !== 'auth/user-not-found') {
        throw error;
      }
    }

    // Create user
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: name,
      emailVerified: false
    });

    // Set custom claims
    await auth.setCustomUserClaims(userRecord.uid, {
      role,
      grade,
      createdAt: Date.now()
    });

    // Generate tokens
    const token = generateToken({
      uid: userRecord.uid,
      email: userRecord.email,
      role,
      grade
    });

    const refreshToken = generateRefreshToken({
      uid: userRecord.uid
    });

    logger.info('User registered successfully:', { uid: userRecord.uid, email });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          uid: userRecord.uid,
          email: userRecord.email,
          name,
          role,
          grade
        },
        token,
        refreshToken
      }
    });
  } catch (error: any) {
    if (error.code === 'auth/email-already-exists') {
      throw new AppError('Email already exists', 409, 'EMAIL_ALREADY_EXISTS');
    }
    if (error.code === 'auth/weak-password') {
      throw new AppError('Password is too weak', 400, 'WEAK_PASSWORD');
    }
    if (error.code === 'auth/invalid-email') {
      throw new AppError('Invalid email format', 400, 'INVALID_EMAIL');
    }
    throw error;
  }
}));

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty()
], asyncHandler(async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError('Validation failed', 400, 'VALIDATION_ERROR');
  }

  const { email, password } = req.body;

  try {
    const auth = getAuth();
    
    // Sign in with email and password
    const userRecord = await auth.getUserByEmail(email);
    
    // Verify password (Firebase handles this automatically)
    // For custom password verification, you'd need to implement it here
    
    // Get custom claims
    const customClaims = userRecord.customClaims || {};
    
    // Generate tokens
    const token = generateToken({
      uid: userRecord.uid,
      email: userRecord.email,
      role: customClaims.role || 'student',
      grade: customClaims.grade
    });

    const refreshToken = generateRefreshToken({
      uid: userRecord.uid
    });

    logger.info('User logged in successfully:', { uid: userRecord.uid, email });

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          uid: userRecord.uid,
          email: userRecord.email,
          name: userRecord.displayName,
          role: customClaims.role || 'student',
          grade: customClaims.grade,
          photoURL: userRecord.photoURL,
          emailVerified: userRecord.emailVerified
        },
        token,
        refreshToken
      }
    });
  } catch (error: any) {
    if (error.code === 'auth/user-not-found') {
      throw new AppError('Invalid credentials', 401, 'INVALID_CREDENTIALS');
    }
    throw error;
  }
}));

/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: Refresh access token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *       401:
 *         description: Invalid refresh token
 */
router.post('/refresh', [
  body('refreshToken').notEmpty()
], asyncHandler(async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError('Validation failed', 400, 'VALIDATION_ERROR');
  }

  const { refreshToken } = req.body;

  try {
    const auth = getAuth();
    
    // Verify refresh token
    const decoded = jwt.verify(refreshToken, config.jwt.secret) as any;
    
    if (!decoded.uid) {
      throw new AppError('Invalid refresh token', 401, 'INVALID_REFRESH_TOKEN');
    }

    // Get user record
    const userRecord = await auth.getUser(decoded.uid);
    const customClaims = userRecord.customClaims || {};
    
    // Generate new tokens
    const newToken = generateToken({
      uid: userRecord.uid,
      email: userRecord.email,
      role: customClaims.role || 'student',
      grade: customClaims.grade
    });

    const newRefreshToken = generateRefreshToken({
      uid: userRecord.uid
    });

    res.json({
      success: true,
      message: 'Token refreshed successfully',
      data: {
        token: newToken,
        refreshToken: newRefreshToken
      }
    });
  } catch (error: any) {
    if (error.name === 'JsonWebTokenError') {
      throw new AppError('Invalid refresh token', 401, 'INVALID_REFRESH_TOKEN');
    }
    if (error.name === 'TokenExpiredError') {
      throw new AppError('Refresh token expired', 401, 'REFRESH_TOKEN_EXPIRED');
    }
    throw error;
  }
}));

/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     summary: Send password reset email
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: Password reset email sent
 *       404:
 *         description: User not found
 */
router.post('/forgot-password', [
  body('email').isEmail().normalizeEmail()
], asyncHandler(async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError('Validation failed', 400, 'VALIDATION_ERROR');
  }

  const { email } = req.body;

  try {
    const auth = getAuth();
    
    // Generate password reset link
    const actionCodeSettings = {
      url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password`,
      handleCodeInApp: false
    };

    const resetLink = await auth.generatePasswordResetLink(email, actionCodeSettings);
    
    // TODO: Send email with reset link
    // For now, just return the link (in production, send via email service)
    
    logger.info('Password reset link generated:', { email });

    res.json({
      success: true,
      message: 'Password reset email sent',
      data: {
        resetLink: process.env.NODE_ENV === 'development' ? resetLink : undefined
      }
    });
  } catch (error: any) {
    if (error.code === 'auth/user-not-found') {
      throw new AppError('User not found', 404, 'USER_NOT_FOUND');
    }
    throw error;
  }
}));

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 */
router.post('/logout', asyncHandler(async (req: Request, res: Response) => {
  // In a stateless JWT system, logout is handled client-side
  // You could implement a blacklist for tokens if needed
  
  logger.info('User logged out:', { uid: req.user?.uid });

  res.json({
    success: true,
    message: 'Logout successful'
  });
}));

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get current user profile
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get('/me', asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new AppError('Authentication required', 401, 'AUTHENTICATION_REQUIRED');
  }

  try {
    const auth = getAuth();
    const userRecord = await auth.getUser(req.user.uid);
    const customClaims = userRecord.customClaims || {};

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
          lastSignIn: userRecord.metadata.lastSignInTime
        }
      }
    });
  } catch (error) {
    throw new AppError('Failed to get user profile', 500, 'PROFILE_RETRIEVAL_FAILED');
  }
}));

export default router;
