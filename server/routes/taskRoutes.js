const express = require("express");
const protect = require("../middlewares/authMiddleware");
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const router = express.Router();

router.use(protect);

router.route("/task").post(createTask).get(getTasks);
router.route("/task/:id").get(getTaskById).put(updateTask).delete(deleteTask);

module.exports = router;
