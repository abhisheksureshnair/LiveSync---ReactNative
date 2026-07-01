const { randomUUID } = require('crypto');

const parent = {
  id: 'parent-1',
  name: 'Abhishek Nair',
  phoneNumber: '1234567890',
  email: 'parent@livesync.local',
  role: 'parent',
};

const children = [
  {
    id: 'liam',
    name: 'Liam Carter',
    avatar: 'boy_avatar.png',
    phoneNumber: '+91 98765 43210',
    status: 'on_the_go',
    currentLocation: {
      label: 'On the way home',
      latitude: 10.0261,
      longitude: 76.3125,
      speedKmph: 24,
      batteryPercent: 84,
      network: 'GPS Active',
      etaMinutes: 8,
      distanceFromParentKm: 1.5,
      lastUpdatedAt: new Date().toISOString(),
    },
    controls: {
      socialMedia: true,
      screenTimeLimit: true,
      homeworkMode: false,
    },
    geofences: [
      { id: 'zone-liam-school', name: 'School Safe Zone', radius: 200, icon: 'school' },
      { id: 'zone-liam-home', name: 'Home Safe Zone', radius: 150, icon: 'home' },
    ],
  },
  {
    id: 'sophia',
    name: 'Sophia Carter',
    avatar: 'girl_avatar.png',
    phoneNumber: '+91 99887 76655',
    status: 'safe_zone',
    currentLocation: {
      label: 'Home Safe Zone',
      latitude: 10.0305,
      longitude: 76.3081,
      speedKmph: 0,
      batteryPercent: 92,
      network: 'GPS Active',
      etaMinutes: 0,
      distanceFromParentKm: 0,
      lastUpdatedAt: new Date().toISOString(),
    },
    controls: {
      socialMedia: false,
      screenTimeLimit: true,
      homeworkMode: true,
    },
    geofences: [
      { id: 'zone-sophia-home', name: 'Home Safe Zone', radius: 150, icon: 'home' },
      { id: 'zone-sophia-park', name: 'Leisure Park Safe Zone', radius: 300, icon: 'park' },
    ],
  },
];

const tripHistory = {
  liam: [
    {
      id: 'trip-liam-1',
      title: 'School to Home',
      date: '2026-07-01',
      startedAt: '15:10',
      endedAt: '15:42',
      distanceKm: 6.8,
      durationMinutes: 32,
      status: 'completed',
    },
    {
      id: 'trip-liam-2',
      title: 'Home to School',
      date: '2026-07-01',
      startedAt: '07:35',
      endedAt: '08:05',
      distanceKm: 6.7,
      durationMinutes: 30,
      status: 'completed',
    },
  ],
  sophia: [
    {
      id: 'trip-sophia-1',
      title: 'Tuition to Home',
      date: '2026-07-01',
      startedAt: '17:05',
      endedAt: '17:28',
      distanceKm: 3.2,
      durationMinutes: 23,
      status: 'completed',
    },
  ],
};

const reports = {
  liam: {
    activeHours: '34.5 Hrs',
    averageSpeed: '14.2 km/h',
    totalCommute: '48.6 km',
    distanceByDay: [
      { day: 'Mon', distanceKm: 8.2 },
      { day: 'Tue', distanceKm: 10.2 },
      { day: 'Wed', distanceKm: 6.5 },
      { day: 'Thu', distanceKm: 9.4 },
      { day: 'Fri', distanceKm: 7.8 },
      { day: 'Sat', distanceKm: 4.1 },
      { day: 'Sun', distanceKm: 2.4 },
    ],
    safeZoneDistribution: [
      { label: 'Home', percent: 56 },
      { label: 'School', percent: 34 },
      { label: 'Transit', percent: 10 },
    ],
  },
  sophia: {
    activeHours: '12.8 Hrs',
    averageSpeed: '8.5 km/h',
    totalCommute: '17.7 km',
    distanceByDay: [
      { day: 'Mon', distanceKm: 2.1 },
      { day: 'Tue', distanceKm: 4.1 },
      { day: 'Wed', distanceKm: 3.8 },
      { day: 'Thu', distanceKm: 2.5 },
      { day: 'Fri', distanceKm: 3.4 },
      { day: 'Sat', distanceKm: 1.1 },
      { day: 'Sun', distanceKm: 0.7 },
    ],
    safeZoneDistribution: [
      { label: 'Home', percent: 72 },
      { label: 'Park', percent: 18 },
      { label: 'Transit', percent: 10 },
    ],
  },
};

const notifications = [
  {
    id: 'notification-1',
    title: 'Liam Left School Zone',
    message: 'Liam has left the Green Valley School safe zone and is heading home.',
    type: 'geofence',
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    id: 'notification-2',
    title: 'Sophia Entered Home Zone',
    message: 'Sophia has safely entered the Home safe zone.',
    type: 'geofence',
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
  {
    id: 'notification-3',
    title: 'Battery Alert',
    message: "Sophia's phone battery has dropped below 15%. Real-time tracking might be limited.",
    type: 'battery',
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
];

const sessions = new Map();

const findChild = (childId) => children.find(child => child.id === childId);

const createSession = () => {
  const token = randomUUID();
  sessions.set(token, {
    parentId: parent.id,
    createdAt: new Date().toISOString(),
  });
  return token;
};

module.exports = {
  parent,
  children,
  tripHistory,
  reports,
  notifications,
  sessions,
  findChild,
  createSession,
};
