const { validationResult } = require("express-validator");

const validateRequest = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(errors.array()[0].msg);
    error.statusCode = 400;
    error.details = errors.array();
    throw error;
  }
};

module.exports = validateRequest;
