const express = require('express');
const { randomUUID } = require('crypto');
const { children, findChild, tripHistory, reports } = require('../data/store');
const { requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(requireAuth);

router.get('/', (req, res) => {
  res.json({
    children: children.map(child => ({
      id: child.id,
      name: child.name,
      avatar: child.avatar,
      phoneNumber: child.phoneNumber,
      status: child.status,
      currentLocation: child.currentLocation,
    })),
  });
});

router.get('/:childId', (req, res) => {
  const child = findChild(req.params.childId);
  if (!child) return res.status(404).json({ message: 'Child not found.' });
  res.json({ child });
});

router.get('/:childId/location', (req, res) => {
  const child = findChild(req.params.childId);
  if (!child) return res.status(404).json({ message: 'Child not found.' });

  res.json({
    childId: child.id,
    status: child.status,
    location: {
      ...child.currentLocation,
      lastUpdatedAt: new Date().toISOString(),
    },
  });
});

router.patch('/:childId/location', (req, res) => {
  const child = findChild(req.params.childId);
  if (!child) return res.status(404).json({ message: 'Child not found.' });

  child.currentLocation = {
    ...child.currentLocation,
    ...req.body,
    lastUpdatedAt: new Date().toISOString(),
  };

  res.json({ location: child.currentLocation });
});

router.get('/:childId/history', (req, res) => {
  const child = findChild(req.params.childId);
  if (!child) return res.status(404).json({ message: 'Child not found.' });

  res.json({
    childId: child.id,
    trips: tripHistory[child.id] || [],
  });
});

router.get('/:childId/reports/weekly', (req, res) => {
  const child = findChild(req.params.childId);
  if (!child) return res.status(404).json({ message: 'Child not found.' });

  res.json({
    childId: child.id,
    report: reports[child.id],
  });
});

router.get('/:childId/controls', (req, res) => {
  const child = findChild(req.params.childId);
  if (!child) return res.status(404).json({ message: 'Child not found.' });

  res.json({ controls: child.controls });
});

router.patch('/:childId/controls', (req, res) => {
  const child = findChild(req.params.childId);
  if (!child) return res.status(404).json({ message: 'Child not found.' });

  child.controls = {
    ...child.controls,
    ...req.body,
  };

  res.json({ controls: child.controls });
});

router.get('/:childId/geofences', (req, res) => {
  const child = findChild(req.params.childId);
  if (!child) return res.status(404).json({ message: 'Child not found.' });

  res.json({ geofences: child.geofences });
});

router.post('/:childId/geofences', (req, res) => {
  const child = findChild(req.params.childId);
  if (!child) return res.status(404).json({ message: 'Child not found.' });

  const { name, radius, icon = 'location-on' } = req.body;

  if (!name || !radius) {
    return res.status(400).json({ message: 'name and radius are required.' });
  }

  const geofence = {
    id: randomUUID(),
    name,
    radius: Number(radius),
    icon,
  };

  child.geofences.push(geofence);
  res.status(201).json({ geofence });
});

router.delete('/:childId/geofences/:geofenceId', (req, res) => {
  const child = findChild(req.params.childId);
  if (!child) return res.status(404).json({ message: 'Child not found.' });

  const originalLength = child.geofences.length;
  child.geofences = child.geofences.filter(item => item.id !== req.params.geofenceId);

  if (child.geofences.length === originalLength) {
    return res.status(404).json({ message: 'Geofence not found.' });
  }

  res.json({ message: 'Geofence deleted successfully.' });
});

module.exports = router;
