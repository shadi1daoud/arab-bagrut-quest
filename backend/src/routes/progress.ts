import express from 'express';

const router = express.Router();

// TODO: Implement progress routes
router.get('/', (req, res) => {
  res.json({ message: 'Progress routes coming soon' });
});

export default router;
