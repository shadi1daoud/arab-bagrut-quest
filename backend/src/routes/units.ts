import express from 'express';

const router = express.Router();

// TODO: Implement units routes
router.get('/', (req, res) => {
  res.json({ message: 'Units routes coming soon' });
});

export default router;
