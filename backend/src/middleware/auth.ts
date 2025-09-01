import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { getAuth } from '../database/connection.js';
import { config } from '../config/index.js';
import { AppError } from './errorHandler.js';
import { logger } from '../utils/logger.js';

// Extend Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        uid: string;
        email: string;
        role: string;
        [key: string]: any;
      };
    }
  }
}

// Verify JWT token
export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('Access token required', 401, 'TOKEN_REQUIRED');
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    
    // Verify JWT token
    const decoded = jwt.verify(token, config.jwt.secret) as any;
    
    if (!decoded.uid) {
      throw new AppError('Invalid token format', 401, 'INVALID_TOKEN_FORMAT');
    }

    // Verify with Firebase Auth
    const auth = getAuth();
    const userRecord = await auth.verifyIdToken(token);
    
    if (userRecord.uid !== decoded.uid) {
      throw new AppError('Token mismatch', 401, 'TOKEN_MISMATCH');
    }

    // Add user info to request
    req.user = {
      uid: userRecord.uid,
      email: userRecord.email || '',
      role: decoded.role || 'student',
      ...decoded
    };

    next();
  } catch (error: any) {
    if (error instanceof AppError) {
      next(error);
    } else if (error.name === 'JsonWebTokenError') {
      next(new AppError('Invalid token', 401, 'INVALID_TOKEN'));
    } else if (error.name === 'TokenExpiredError') {
      next(new AppError('Token expired', 401, 'TOKEN_EXPIRED'));
    } else {
      logger.error('Token verification error:', error);
      next(new AppError('Authentication failed', 401, 'AUTHENTICATION_FAILED'));
    }
  }
};

// Verify Firebase ID token directly
export const verifyFirebaseToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('Access token required', 401, 'TOKEN_REQUIRED');
    }

    const token = authHeader.substring(7);
    
    // Verify with Firebase Auth
    const auth = getAuth();
    const userRecord = await auth.verifyIdToken(token);
    
    // Add user info to request
    req.user = {
      uid: userRecord.uid,
      email: userRecord.email || '',
      role: userRecord.customClaims?.role || 'student',
      displayName: userRecord.displayName,
      photoURL: userRecord.photoURL,
      emailVerified: userRecord.emailVerified,
      ...userRecord.customClaims
    };

    next();
  } catch (error: any) {
    if (error instanceof AppError) {
      next(error);
    } else {
      logger.error('Firebase token verification error:', error);
      next(new AppError('Authentication failed', 401, 'AUTHENTICATION_FAILED'));
    }
  }
};

// Role-based access control
export const requireRole = (roles: string | string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError('Authentication required', 401, 'AUTHENTICATION_REQUIRED'));
    }

    const userRole = req.user.role;
    const allowedRoles = Array.isArray(roles) ? roles : [roles];

    if (!allowedRoles.includes(userRole)) {
      return next(new AppError('Insufficient permissions', 403, 'INSUFFICIENT_PERMISSIONS'));
    }

    next();
  };
};

// Admin only access
export const requireAdmin = requireRole('admin');

// Student only access
export const requireStudent = requireRole('student');

// Teacher only access
export const requireTeacher = requireRole('teacher');

// Optional authentication (doesn't fail if no token)
export const optionalAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(); // Continue without user
    }

    const token = authHeader.substring(7);
    
    // Verify with Firebase Auth
    const auth = getAuth();
    const userRecord = await auth.verifyIdToken(token);
    
    // Add user info to request
    req.user = {
      uid: userRecord.uid,
      email: userRecord.email || '',
      role: userRecord.customClaims?.role || 'student',
      displayName: userRecord.displayName,
      photoURL: userRecord.photoURL,
      emailVerified: userRecord.emailVerified,
      ...userRecord.customClaims
    };

    next();
  } catch (error: any) {
    // Log error but don't fail the request
    logger.warn('Optional authentication failed:', error);
    next();
  }
};

// Generate JWT token
export const generateToken = (payload: any, expiresIn: string = config.jwt.expiresIn) => {
  return jwt.sign(payload, config.jwt.secret, { expiresIn } as jwt.SignOptions);
};

// Generate refresh token
export const generateRefreshToken = (payload: any) => {
  return jwt.sign(payload, config.jwt.secret, { expiresIn: config.jwt.refreshExpiresIn } as jwt.SignOptions);
};

// Verify refresh token
export const verifyRefreshToken = (token: string) => {
  try {
    return jwt.verify(token, config.jwt.secret) as any;
  } catch (error) {
    throw new AppError('Invalid refresh token', 401, 'INVALID_REFRESH_TOKEN');
  }
};

export default {
  verifyToken,
  verifyFirebaseToken,
  requireRole,
  requireAdmin,
  requireStudent,
  requireTeacher,
  optionalAuth,
  generateToken,
  generateRefreshToken,
  verifyRefreshToken
};
