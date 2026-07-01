const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const authRoutes = require('./routes/authRoutes');
const childRoutes = require('./routes/childRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const assistantRoutes = require('./routes/assistantRoutes');
const updateRoutes = require('./routes/updateRoutes');
const profileRoutes = require('./routes/profileRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();

const allowedOrigins = process.env.ALLOWED_ORIGINS || '*';

app.use(cors({ origin: allowedOrigins === '*' ? '*' : allowedOrigins.split(',') }));
app.use(express.json({ limit: '1mb' }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    app: process.env.APP_NAME || 'LiveSync',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/update', updateRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/children', childRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/assistant', assistantRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
