import express from 'express';

const router = express.Router();

// TODO: Implement upload routes
router.get('/', (req, res) => {
  res.json({ message: 'Upload routes coming soon' });
});

export default router;
