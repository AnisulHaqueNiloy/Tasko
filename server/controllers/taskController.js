const {
  createTask,
  getUserTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../services/taskServices");

exports.createTask = async (req, res) => {
  const userId = req.user._id;

  const { title, description, dueDate, category } = req.body;
  try {
    const task = await createTask(
      title,
      description,
      dueDate,
      category,
      userId
    );

    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await getUserTasks(req.user._id);
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await getTaskById(req.params.id, req.user._id);
    res.json(task);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await updateTask(req.params.id, req.body, req.user._id);
    res.json(task);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const result = await deleteTask(req.params.id, req.user._id);
    res.json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
