const notFound = (req, res, next) => {
  const error = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
  error.status = 404;
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;

  res.status(status).json({
    error: status >= 500 ? 'Internal Server Error' : err.message,
    message: err.message,
  });
};

module.exports = { notFound, errorHandler };
