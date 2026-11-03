// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  console.error(err);

  if (err.retryAfter) {
    res.set("Retry-After", String(err.retryAfter));
  }

  res.status(err.status || 500).json({
    status: "error",
    message: err.status ? err.message : "Internal server error",
    ...(err.retryAfter ? { retryAfterSeconds: err.retryAfter } : {}),
  });
}

export default errorHandler;
