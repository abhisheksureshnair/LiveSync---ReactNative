const express = require('express');

const router = express.Router();

const compareVersions = (latest, current) => {
  const left = String(latest || '0.0.0').split('.').map(Number);
  const right = String(current || '0.0.0').split('.').map(Number);

  for (let index = 0; index < 3; index += 1) {
    const latestPart = left[index] || 0;
    const currentPart = right[index] || 0;
    if (latestPart > currentPart) return 1;
    if (latestPart < currentPart) return -1;
  }

  return 0;
};

router.post('/check', (req, res) => {
  const currentVersion = req.body.currentVersion || process.env.CURRENT_VERSION || '1.0.0';
  const latestVersion = process.env.LATEST_VERSION || '1.0.0';
  const hasUpdate = compareVersions(latestVersion, currentVersion) > 0;
  const latestMajor = Number(String(latestVersion).split('.')[0] || 0);
  const currentMajor = Number(String(currentVersion).split('.')[0] || 0);
  const forceUpdate = process.env.FORCE_UPDATE === 'true' || latestMajor > currentMajor;

  res.json({
    appName: req.body.appName || process.env.APP_NAME || 'LiveSync',
    currentVersion,
    latestVersion,
    hasUpdate,
    isForceUpdate: hasUpdate && forceUpdate,
    updateUrl: process.env.UPDATE_URL || '',
  });
});

module.exports = router;
