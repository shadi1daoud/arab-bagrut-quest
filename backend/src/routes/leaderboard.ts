import express from 'express';

const router = express.Router();

// TODO: Implement leaderboard routes
router.get('/', (req, res) => {
  res.json({ message: 'Leaderboard routes coming soon' });
});

export default router;
