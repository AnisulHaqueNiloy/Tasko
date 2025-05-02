const express = require("express");
const verifyToken = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/user", verifyToken, (req, res) => {
  res.json({ user: req.user });
});
module.exports = router;
