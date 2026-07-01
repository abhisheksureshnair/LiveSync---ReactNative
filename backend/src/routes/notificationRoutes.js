const express = require('express');
const { notifications } = require('../data/store');
const { requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(requireAuth);

router.get('/', (req, res) => {
  res.json({ notifications });
});

router.patch('/:notificationId/read', (req, res) => {
  const notification = notifications.find(item => item.id === req.params.notificationId);
  if (!notification) return res.status(404).json({ message: 'Notification not found.' });

  notification.read = true;
  res.json({ notification });
});

router.delete('/', (req, res) => {
  notifications.splice(0, notifications.length);
  res.json({ message: 'All notifications cleared.' });
});

module.exports = router;
