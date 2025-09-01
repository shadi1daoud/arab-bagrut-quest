import express, { Request, Response } from 'express';
import { body, validationResult, query } from 'express-validator';
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
 * /api/courses:
 *   get:
 *     summary: Get all courses
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: subject
 *         schema:
 *           type: string
 *         description: Filter by subject
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
 *         description: Courses retrieved successfully
 */
router.get('/', [
  query('subject').optional().trim(),
  query('grade').optional().trim(),
  query('limit').optional().isInt({ min: 1, max: 100 }).toInt()
], asyncHandler(async (req: Request, res: Response) => {
  const { subject, grade, limit = 20 } = req.query as { subject?: string; grade?: string; limit?: number };

  try {
    let query = db.courses().limit(limit);

    // Apply filters
    if (subject) {
      query = query.where('subject', '==', subject);
    }
    if (grade) {
      query = query.where('grade', '==', grade);
    }

    const snapshot = await query.get();
    const courses: any[] = [];

    snapshot.forEach(doc => {
      courses.push({
        id: doc.id,
        ...doc.data()
      });
    });

    res.json({
      success: true,
      data: {
        courses,
        total: courses.length,
        limit
      }
    });
  } catch (error) {
    throw new AppError('Failed to retrieve courses', 500, 'COURSE_RETRIEVAL_FAILED');
  }
}));

/**
 * @swagger
 * /api/courses:
 *   post:
 *     summary: Create a new course (Admin/Teacher only)
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - subject
 *               - grade
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *               subject:
 *                 type: string
 *               grade:
 *                 type: string
 *               description:
 *                 type: string
 *               icon:
 *                 type: string
 *               color:
 *                 type: string
 *               xpReward:
 *                 type: number
 *     responses:
 *       201:
 *         description: Course created successfully
 *       403:
 *         description: Insufficient permissions
 */
router.post('/', [
  body('title').trim().isLength({ min: 3 }),
  body('subject').trim().notEmpty(),
  body('grade').trim().notEmpty(),
  body('description').trim().isLength({ min: 10 }),
  body('icon').optional().trim(),
  body('color').optional().trim(),
  body('xpReward').optional().isInt({ min: 0 })
], requireRole(['admin', 'teacher']), asyncHandler(async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError('Validation failed', 400, 'VALIDATION_ERROR');
  }

  const { title, subject, grade, description, icon, color, xpReward } = req.body;

  try {
    const courseData = {
      title,
      subject,
      grade,
      description,
      icon: icon || '📚',
      color: color || 'bg-blue-600',
      xpReward: xpReward || 1000,
      totalUnits: 0,
      totalLessons: 0,
      students: 0,
      createdAt: db.serverTimestamp(),
      updatedAt: db.serverTimestamp(),
      isPublished: false,
      createdBy: req.user!.uid,
      stats: {
        totalEnrollments: 0,
        averageProgress: 0,
        completionRate: 0
      }
    };

    const courseRef = await db.courses().add(courseData);
    const courseDoc = await courseRef.get();

    logger.info('Course created:', { courseId: courseRef.id, createdBy: req.user!.uid });

    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      data: {
        course: {
          id: courseRef.id,
          ...courseDoc.data()
        }
      }
    });
  } catch (error) {
    throw new AppError('Failed to create course', 500, 'COURSE_CREATION_FAILED');
  }
}));

/**
 * @swagger
 * /api/courses/{id}:
 *   get:
 *     summary: Get course by ID
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Course ID
 *     responses:
 *       200:
 *         description: Course retrieved successfully
 *       404:
 *         description: Course not found
 */
router.get('/:id', asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };

  try {
    const courseDoc = await db.courses().doc(id).get();
    
    if (!courseDoc.exists) {
      throw new AppError('Course not found', 404, 'COURSE_NOT_FOUND');
    }

    const courseData = courseDoc.data();

    res.json({
      success: true,
      data: {
        course: {
          id: courseDoc.id,
          ...courseData
        }
      }
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError('Failed to retrieve course', 500, 'COURSE_RETRIEVAL_FAILED');
  }
}));

/**
 * @swagger
 * /api/courses/{id}:
 *   put:
 *     summary: Update course (Admin/Teacher only)
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Course ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               subject:
 *                 type: string
 *               grade:
 *                 type: string
 *               description:
 *                 type: string
 *               icon:
 *                 type: string
 *               color:
 *                 type: string
 *               xpReward:
 *                 type: number
 *               isPublished:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Course updated successfully
 *       403:
 *         description: Insufficient permissions
 *       404:
 *         description: Course not found
 */
router.put('/:id', [
  body('title').optional().trim().isLength({ min: 3 }),
  body('subject').optional().trim().notEmpty(),
  body('grade').optional().trim().notEmpty(),
  body('description').optional().trim().isLength({ min: 10 }),
  body('icon').optional().trim(),
  body('color').optional().trim(),
  body('xpReward').optional().isInt({ min: 0 }),
  body('isPublished').optional().isBoolean()
], requireRole(['admin', 'teacher']), asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    throw new AppError('Validation failed', 400, 'VALIDATION_ERROR');
  }

  try {
    const courseRef = db.courses().doc(id);
    const courseDoc = await courseRef.get();
    
    if (!courseDoc.exists) {
      throw new AppError('Course not found', 404, 'COURSE_NOT_FOUND');
    }

    // Check if user is the creator or admin
    const courseData = courseDoc.data();
    if (req.user!.role !== 'admin' && courseData?.createdBy !== req.user!.uid) {
      throw new AppError('Insufficient permissions', 403, 'INSUFFICIENT_PERMISSIONS');
    }

    const updates = {
      ...req.body,
      updatedAt: db.serverTimestamp()
    };

    await courseRef.update(updates);

    logger.info('Course updated:', { courseId: id, updatedBy: req.user!.uid });

    res.json({
      success: true,
      message: 'Course updated successfully',
      data: { updates }
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError('Failed to update course', 500, 'COURSE_UPDATE_FAILED');
  }
}));

/**
 * @swagger
 * /api/courses/{id}:
 *   delete:
 *     summary: Delete course (Admin only)
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Course ID
 *     responses:
 *       200:
 *         description: Course deleted successfully
 *       403:
 *         description: Insufficient permissions
 *       404:
 *         description: Course not found
 */
router.delete('/:id', requireRole('admin'), asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };

  try {
    const courseRef = db.courses().doc(id);
    const courseDoc = await courseRef.get();
    
    if (!courseDoc.exists) {
      throw new AppError('Course not found', 404, 'COURSE_NOT_FOUND');
    }

    // Delete course and related data
    await courseRef.delete();
    
    // TODO: Delete related units, lessons, enrollments, etc.
    
    logger.info('Course deleted by admin:', { courseId: id, deletedBy: req.user!.uid });

    res.json({
      success: true,
      message: 'Course deleted successfully'
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError('Failed to delete course', 500, 'COURSE_DELETION_FAILED');
  }
}));

export default router;
