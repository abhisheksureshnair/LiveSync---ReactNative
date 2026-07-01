const { sessions } = require('../data/store');

const requireAuth = (req, res, next) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token || !sessions.has(token)) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'A valid Bearer token is required.',
    });
  }

  req.session = sessions.get(token);
  req.token = token;
  next();
};

module.exports = { requireAuth };
