// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  console.error(err);

  res.status(err.status || 500).json({
    status: "error",
    message: err.status ? err.message : "Internal server error",
  });
}

export default errorHandler;