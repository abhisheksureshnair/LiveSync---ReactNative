const express = require('express');
const { parent, children } = require('../data/store');
const { requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', requireAuth, (req, res) => {
  res.json({
    parent,
    children: children.map(({ id, name, avatar, phoneNumber, status }) => ({
      id,
      name,
      avatar,
      phoneNumber,
      status,
    })),
    settings: {
      pushNotifications: true,
      stopAlerts: true,
      theme: 'system',
    },
  });
});

module.exports = router;
