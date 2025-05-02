import React, { useState } from "react";
import axiosInstance from "../../../utils/api/axiosInstance";

const AddTaskModal = ({ isOpen, onClose, refetch }) => {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    category: "",
    dueDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/task", taskData);
      console.log("Task Created:", res.data);
      // task list abar load korar jonno
      refetch();
      onClose(); // modal close
      setTaskData({
        title: "",
        description: "",
        category: "",
        dueDate: "",
      });
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Add New Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={taskData.title}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={taskData.description}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          ></textarea>
          <select
            name="category"
            value={taskData.category}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            required
          >
            <option value="">Select Category</option>
            <option value="Arts and Craft">Arts and Craft</option>
            <option value="Nature">Nature</option>
            <option value="Family">Family</option>
            <option value="Sport">Sport</option>
            <option value="Friend">Friend</option>
            <option value="Meditation">Meditation</option>
          </select>
          <input
            type="date"
            name="dueDate"
            value={taskData.dueDate}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-sky-500 text-white hover:bg-sky-600"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
