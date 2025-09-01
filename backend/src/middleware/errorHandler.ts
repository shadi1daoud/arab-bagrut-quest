import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger.js';

// Custom error class
export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;
  public code: string | undefined;

  constructor(message: string, statusCode: number, code?: string) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    this.code = code;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Error handler middleware
export const errorHandler = (
  error: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = 'Internal Server Error';
  let code: string | undefined;

  // Handle custom AppError
  if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
    code = error.code;
  }
  // Handle Firebase Auth errors
  else if ((error as any).code === 'auth/user-not-found') {
    statusCode = 404;
    message = 'User not found';
    code = 'USER_NOT_FOUND';
  }
  else if ((error as any).code === 'auth/wrong-password') {
    statusCode = 401;
    message = 'Invalid credentials';
    code = 'INVALID_CREDENTIALS';
  }
  else if ((error as any).code === 'auth/email-already-in-use') {
    statusCode = 409;
    message = 'Email already in use';
    code = 'EMAIL_ALREADY_EXISTS';
  }
  else if ((error as any).code === 'auth/weak-password') {
    statusCode = 400;
    message = 'Password is too weak';
    code = 'WEAK_PASSWORD';
  }
  else if ((error as any).code === 'auth/invalid-email') {
    statusCode = 400;
    message = 'Invalid email format';
    code = 'INVALID_EMAIL';
  }
  // Handle validation errors
  else if (error.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation failed';
    code = 'VALIDATION_ERROR';
  }
  // Handle JWT errors
  else if (error.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token';
    code = 'INVALID_TOKEN';
  }
  else if (error.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expired';
    code = 'TOKEN_EXPIRED';
  }
  // Handle multer errors
  else if ((error as any).code === 'LIMIT_FILE_SIZE') {
    statusCode = 413;
    message = 'File too large';
    code = 'FILE_TOO_LARGE';
  }
  else if ((error as any).code === 'LIMIT_UNEXPECTED_FILE') {
    statusCode = 400;
    message = 'Unexpected file field';
    code = 'UNEXPECTED_FILE_FIELD';
  }
  // Handle rate limiting errors
  else if (error.message && error.message.includes('Too many requests')) {
    statusCode = 429;
    message = 'Too many requests';
    code = 'RATE_LIMIT_EXCEEDED';
  }

  // Log error
  logger.error('Error occurred:', {
    error: {
      message: error.message,
      stack: error.stack,
      code: (error as any).code || code,
      statusCode
    },
    request: {
      method: req.method,
      url: req.url,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      userId: (req as any).user?.uid
    }
  });

  // Send error response
  res.status(statusCode).json({
    success: false,
    error: {
      message,
      code,
      ...(process.env.NODE_ENV === 'development' && {
        stack: error.stack,
        details: error.message
      })
    },
    timestamp: new Date().toISOString(),
    path: req.url
  });
};

// Async error wrapper
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// 404 handler
export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  const error = new AppError(`Route ${req.originalUrl} not found`, 404, 'ROUTE_NOT_FOUND');
  next(error);
};

// Export common error types
export const ErrorTypes = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  AUTHENTICATION_ERROR: 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR: 'AUTHORIZATION_ERROR',
  NOT_FOUND_ERROR: 'NOT_FOUND_ERROR',
  CONFLICT_ERROR: 'CONFLICT_ERROR',
  RATE_LIMIT_ERROR: 'RATE_LIMIT_ERROR',
  FILE_UPLOAD_ERROR: 'FILE_UPLOAD_ERROR',
  DATABASE_ERROR: 'DATABASE_ERROR',
  EXTERNAL_SERVICE_ERROR: 'EXTERNAL_SERVICE_ERROR'
} as const;

export default errorHandler;
