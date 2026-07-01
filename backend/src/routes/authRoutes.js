const express = require('express');
const { parent, createSession, sessions } = require('../data/store');
const { requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();

const DEMO_PHONE = '1234567890';
const DEMO_OTP = '1234';

router.post('/request-otp', (req, res) => {
  const { phoneNumber } = req.body;

  if (!phoneNumber) {
    return res.status(400).json({ message: 'phoneNumber is required.' });
  }

  if (phoneNumber !== DEMO_PHONE) {
    return res.status(404).json({ message: 'No demo parent found for this phone number.' });
  }

  res.json({
    message: 'OTP sent successfully.',
    demoOtp: DEMO_OTP,
    expiresInSeconds: 300,
  });
});

router.post('/verify-otp', (req, res) => {
  const { phoneNumber, otp } = req.body;

  if (phoneNumber !== DEMO_PHONE || otp !== DEMO_OTP) {
    return res.status(401).json({ message: 'Invalid phone number or OTP.' });
  }

  const token = createSession();

  res.json({
    message: 'Login successful.',
    token,
    user: parent,
  });
});

router.post('/logout', requireAuth, (req, res) => {
  sessions.delete(req.token);
  res.json({ message: 'Logged out successfully.' });
});

module.exports = router;
