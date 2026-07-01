const express = require('express');
const { children } = require('../data/store');
const { requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(requireAuth);

router.post('/message', (req, res) => {
  const text = String(req.body.message || '').trim();

  if (!text) {
    return res.status(400).json({ message: 'message is required.' });
  }

  const lowerText = text.toLowerCase();
  const liam = children.find(child => child.id === 'liam');
  const sophia = children.find(child => child.id === 'sophia');

  let reply = "I'm looking into that for you. One moment please...";

  if (lowerText.includes('liam') || lowerText.includes('where')) {
    reply = `${liam.name} is currently ${liam.currentLocation.label.toLowerCase()}. GPS is online, battery is ${liam.currentLocation.batteryPercent}%, and ETA is about ${liam.currentLocation.etaMinutes} minutes.`;
  } else if (lowerText.includes('sophia')) {
    reply = `${sophia.name} is currently within ${sophia.currentLocation.label}. Battery is ${sophia.currentLocation.batteryPercent}%.`;
  } else if (lowerText.includes('battery')) {
    reply = `Device batteries: ${liam.name} ${liam.currentLocation.batteryPercent}%, ${sophia.name} ${sophia.currentLocation.batteryPercent}%.`;
  } else if (lowerText.includes('call')) {
    reply = `You can reach ${liam.name} directly at ${liam.phoneNumber}.`;
  } else if (lowerText.includes('safe') || lowerText.includes('zone') || lowerText.includes('school')) {
    reply = `${sophia.name} is at the Home Safe Zone. ${liam.name} has left the School Safe Zone and is transmitting location data.`;
  }

  res.json({
    reply,
    createdAt: new Date().toISOString(),
  });
});

module.exports = router;
