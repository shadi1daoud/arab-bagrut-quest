import express from 'express';

const router = express.Router();

// TODO: Implement admin routes
router.get('/', (req, res) => {
  res.json({ message: 'Admin routes coming soon' });
});

export default router;
