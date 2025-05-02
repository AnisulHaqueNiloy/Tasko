import React, { useState, useEffect } from "react";
import emptyImage from "../../../assets/download.png"; // Make sure this path is correct
import AddTaskModal from "../Addtask/AddTaskModal";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../utils/api/axiosInstance";
import { AiFillDelete, AiOutlineCalendar } from "react-icons/ai";
import moment from "moment";
import { Link } from "react-router-dom";

const Alltask = () => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Done":
        return "bg-green-400";
      case "Ongoing":
        return "bg-blue-400";
      case "Pending":
        return "bg-purple-400";
      default:
        return "bg-gray-400"; // Default color if status is unexpected
    }
  };
  const getStatusTextColor = (status) => {
    switch (status) {
      case "Done":
        return "text-green-500";
      case "Ongoing":
        return "text-blue-500";
      case "Pending":
        return "text-purple-500";
      default:
        return "text-gray-500"; // Default color if status is unexpected
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const categories = [
    "Arts and Craft",
    "Nature",
    "Family",
    "Sports",
    "Friend",
    "Meditation",
  ];
  const taskTypes = ["All Task", "Ongoing", "Pending", "Collaborative", "Done"];

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(""); // Default is all tasks

  const [isTaskTypeOpen, setIsTaskTypeOpen] = useState(false);
  const [selectedTaskType, setSelectedTaskType] = useState("");

  // Fetching task data
  const { data: task = [], refetch } = useQuery({
    queryKey: ["task"],
    queryFn: async () => {
      const res = await axiosInstance.get("/task");
      return res.data;
    },
  });

  // Filtering tasks based on selected category
  // const filteredTasks = selectedCategory
  //   ? task.filter((t) => t.category === selectedCategory)
  //   : task; // Show all tasks if no category is selected
  const filteredTasks = task.filter((t) => {
    if (selectedCategory) {
      // If a category is selected, filter by category
      return t.category === selectedCategory;
    } else if (selectedTaskType && selectedTaskType !== "All Task") {
      // If a task type is selected (and it's not "All Task"), filter by status
      return t.status === selectedTaskType;
    } else {
      // If no filters are selected, return all tasks
      return true;
    }
  });

  return (
    <div className="bg-white shadow-md h-screen w-11/12 mx-auto rounded-lg p-4 sm:p-6 mt-4">
      {/* Header + Filters */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
          All Task List
        </h2>

        <div className="flex flex-col sm:flex-row gap-3 relative">
          {/* 🔽 Category Dropdown */}
          <div className="relative w-full sm:w-52 text-sm">
            <button
              onClick={() => {
                setIsCategoryOpen(!isCategoryOpen);
                setIsTaskTypeOpen(false);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-left flex justify-between items-center"
            >
              {selectedCategory || "Select Task Category"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-2 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isCategoryOpen && (
              <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-md z-10">
                {categories.map((cat) => (
                  <label
                    key={cat}
                    className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSelectedCategory(cat);
                      setIsCategoryOpen(false);
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategory === cat}
                      readOnly
                      className="mr-2 appearance-none w-4 h-4 border border-gray-400 rounded-sm checked:bg-green-500"
                    />
                    {cat}
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* 🔽 Task Type Dropdown */}
          <div className="relative w-full sm:w-52 text-sm">
            <button
              onClick={() => {
                setIsTaskTypeOpen(!isTaskTypeOpen);
                setIsCategoryOpen(false);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-left flex justify-between items-center"
            >
              {selectedTaskType || "Select Task Type"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-2 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isTaskTypeOpen && (
              <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-md z-10">
                {taskTypes.map((type) => (
                  <label
                    key={type}
                    className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSelectedTaskType(type);
                      setIsTaskTypeOpen(false);
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedTaskType === type}
                      readOnly
                      className="mr-2 appearance-none w-4 h-4 border border-gray-400 rounded-sm checked:bg-green-500"
                    />
                    {type}
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* ➕ Add Task Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-2 rounded-md"
          >
            + Add New Task
          </button>
          <AddTaskModal
            isOpen={isModalOpen}
            refetch={refetch}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      </div>

      {/* Empty State */}
      <div className=" h-screen w-11/12 mx-auto rounded-lg p-4 sm:p-6 mt-4">
        {/* Conditional Rendering */}
        {filteredTasks?.length === 0 ? (
          // No tasks found
          <div className="flex flex-col items-center justify-center text-center py-8">
            <img
              src={emptyImage}
              alt="No Task"
              className="w-[200px] sm:w-[250px] mb-4"
            />
            <p className="text-gray-600 text-sm sm:text-base font-medium">
              No Task is Available yet, Please Add your New Task
            </p>
          </div>
        ) : (
          // Display filtered tasks in grid layout
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredTasks?.map((t) => (
              <Link to={`/task/${t?._id}`} key={t?._id}>
                <div className="bgbg-gray-100 p-4 rounded-lg shadow-md border hover:shadow-lg transition duration-300">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-teal-300 text-white flex items-center justify-center font-bold text-lg mr-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 2v10M18 8l-6 4-6-4M21 16H3M19 22H5c-1.1 0-2-.9-2-2V16c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2z" />
                        </svg>
                      </div>
                      <h2 className="text-xl font-semibold text-gray-800">
                        {t.category}
                      </h2>
                    </div>
                    <div className="text-red-500 cursor-pointer">
                      <AiFillDelete size={20} />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{t?.description}</p>
                  <div className="flex justify-between items-center text-gray-600 text-sm">
                    <div className="flex items-center">
                      <AiOutlineCalendar size={20} className="mr-2" />
                      <span>
                        {/* Format the dueDate using moment */}
                        {t?.dueDate
                          ? moment(t.dueDate).format("dddd, MMMM D - YYYY")
                          : "Invalid date"}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span
                        className={`w-2 h-2 rounded-full mr-2 ${getStatusColor(
                          t.status
                        )}`}
                      ></span>
                      <span
                        className={`font-semibold ${getStatusTextColor(
                          t.status
                        )}`}
                      >
                        {t.status}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Alltask;
