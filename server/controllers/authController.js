const validateRequest = require("../utils/validateRequest");
const { registerUser, loginUser } = require("../services/authService");

const register = async (req, res, next) => {
  try {
    validateRequest(req);
    const { username, password, email } = req.body;
    const newUser = await registerUser({ username, password, email });

    res.status(201).json({
      message: `User registered successfully: ${newUser.username}`,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    validateRequest(req);
    const { username, email, password } = req.body;
    const token = await loginUser({ username, email, password });

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true, // for dev; true in production with HTTPS
        sameSite: "None", // or "None" if using different domains + HTTPS
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
