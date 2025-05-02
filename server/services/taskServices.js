const Task = require("../models/taskModel");

const createTask = async (title, description, dueDate, category, userId) => {
  const task = await Task.create({
    title,
    description,
    dueDate,
    category,
    owner: userId, // Set owner to the `owner` passed in the arguments
  });
  console.log(`owner ${userId}`);
  return task;
};

const getUserTasks = async (owner) => {
  const tasks = await Task.find({ owner });
  return tasks;
};

const getTaskById = async (taskId, owner) => {
  const task = await Task.findOne({ _id: taskId, owner });
  if (!task) throw new Error("Task not found");
  return task;
};

const updateTask = async (taskId, updateData, owner) => {
  const task = await Task.findOneAndUpdate({ _id: taskId, owner }, updateData, {
    new: true,
  });
  if (!task) throw new Error("Task not found");
  return task;
};

const deleteTask = async (taskId, owner) => {
  const task = await Task.findOneAndDelete({ _id: taskId, owner });
  if (!task) throw new Error("Task not found");
  return { message: "Task deleted" };
};

module.exports = {
  createTask,
  getUserTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
