import React, { useState, useEffect } from "react";
import axiosInstance from "../../../utils/api/axiosInstance";

const UpdateTaskModal = ({ isOpen, onClose, refetch, task }) => {
  const [updatedData, setUpdatedData] = useState({
    title: "",
    description: "",
    category: "",
    dueDate: "",
  });

  useEffect(() => {
    if (task) {
      setUpdatedData({
        title: task.title || "",
        description: task.description || "",
        category: task.category || "",
        dueDate: task.dueDate ? task.dueDate.split("T")[0] : "",
      });
    }
  }, [task]);
  console.log("task", task);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.put(`/task/${task._id}`, updatedData);
      console.log("Task Updated:", res.data);
      refetch();
      onClose();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Update Task</h2>
        <form onSubmit={handleUpdate} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={updatedData.title}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={updatedData.description}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          ></textarea>
          <select
            name="category"
            value={updatedData.category}
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
            value={updatedData.dueDate}
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
              className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600"
            >
              Update Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTaskModal;
