const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // log to server
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Something went wrong!",
  });
};

module.exports = errorHandler;
