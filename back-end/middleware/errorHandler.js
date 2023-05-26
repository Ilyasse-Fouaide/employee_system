const errorHandler = (err, req, res, next) => {
  const message = err.message;
  const status = err.status || 400;
  res.status(status).json({ error: message });
}

module.exports = errorHandler;
