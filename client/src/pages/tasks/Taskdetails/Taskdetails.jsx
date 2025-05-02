import React, { useContext, useState } from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../utils/api/axiosInstance";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { FaArrowDown } from "react-icons/fa";
import { RiEdit2Fill } from "react-icons/ri";
import UpdateTaskModal from "../updateTask/UpdateTaskModel";
import img from "../../../assets/delete.png";
import congo from "../../../assets/congo.png";
import { AuthContext } from "../../../context/AuthProvider";

const TaskDetails = () => {
  const params = useParams();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // For delete confirmation
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  const { incrementPoints, points } = useContext(AuthContext);

  const endDate = moment("2024-04-19").format("dddd, MMMM D - YYYY");
  const [status, setStatus] = useState("InProgress");
  const navigate = useNavigate();

  const { data: task = [], refetch } = useQuery({
    queryKey: ["task"],
    queryFn: async () => {
      const res = await axiosInstance.get(`/task/${params.id}`);
      return res.data;
    },
  });

  const handleStatusChange = async (event) => {
    const newStatus = event.target.value;
    setStatus(newStatus);

    try {
      // API call to update the status of the task
      await axiosInstance.put(`/task/${task._id}`, { status: newStatus });
      refetch(); // Refetch the task data to update UI with the latest status
      console.log("Task status updated successfully!");
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  // delete
  const handleDelete = async () => {
    try {
      // API call to delete the task
      await axiosInstance.delete(`/task/${task._id}`);
      navigate("/"); // Redirect to the task list page after deletion
      refetch(); // Refetch tasks to update UI
      console.log("Task deleted successfully!");
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  const handleClose = () => {
    setIsSubmitModalOpen(false);
    incrementPoints("Done");
    // Replace with your route, e.g., '/dashboard'
  };
  console.log(points);

  return (
    <div className="bg-white shadow-md h-screen w-11/12 mx-auto rounded-lg p-4 sm:p-6 mt-4">
      <div className="bg-white rounded-lg shadow-md p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Task Details</h2>
          <div className="flex flex-col md:flex-row gap-2">
            <button
              onClick={() => setIsUpdateModalOpen(true)}
              className="bg-[#fff7e6] hover:bg-yellow-100 text-yellow-400 font-semibold py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <div className="flex items-center">
                <RiEdit2Fill size={20} className="mr-1" />
                Edit Task
              </div>
            </button>
            <button className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400">
              <NavLink to={"/"}>Back</NavLink>
            </button>
          </div>
        </div>

        {/* Task Information */}
        <div className="flex items-start mb-6">
          <div className="w-12 h-12 rounded-full bg-teal-300 text-white flex items-center justify-center font-bold text-xl mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
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
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {task.category}
            </h3>
            <p className="text-gray-600 text-sm">{task.description}</p>
          </div>
        </div>

        {/* End Date */}
        <div className="flex items-center mb-4">
          <label className="w-32 font-semibold text-gray-700">End Date</label>
          <div className="flex items-center">
            <AiOutlineCalendar size={20} className="mr-2 text-gray-500" />
            <span className="text-gray-600">
              {moment(task.dueDate).format("dddd, MMMM D - YYYY")}
            </span>
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center mb-6">
          <label className="w-32 font-semibold text-gray-700">Status</label>
          <div className="flex items-center">
            <span
              className={`w-3 h-3 rounded-full mr-2 ${
                status === "Ongoing"
                  ? "bg-blue-400"
                  : status === "Done"
                  ? "bg-green-400"
                  : "bg-purple-400"
              }`}
            ></span>
            <span
              className={`font-semibold ${
                status === "Ongoing"
                  ? "text-blue-500"
                  : status === "Done"
                  ? "text-green-500"
                  : "text-purple-500"
              }`}
            >
              {task.status}
            </span>
          </div>
        </div>

        {/* Change Status Dropdown */}
        <div className="mb-6">
          <label
            htmlFor="status"
            className="block font-semibold text-gray-700 mb-2"
          >
            Change Status
          </label>
          <div className="relative md:w-3/12">
            <select
              id="status"
              className=" w-full appearance-none  bg-gray-100 border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              value={status}
              onChange={handleStatusChange}
            >
              <option>Ongoing</option>
              <option>Done</option>
              <option>Pending</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0.5  flex items-center px-2 text-gray-700">
              <FaArrowDown></FaArrowDown>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setIsDeleteModalOpen(true)} // Open the delete modal
            className="bg-red-200 hover:bg-red-300 text-red-700 font-semibold py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Delete Task
          </button>
          <button
            onClick={() => {
              setIsSubmitModalOpen(true);
            }}
            className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-6 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
          >
            Submit
          </button>
        </div>
      </div>

      <UpdateTaskModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        refetch={refetch}
        task={task}
      />

      {/* Delete Confirmation Modal (DaisyUI) */}
      <dialog open={isDeleteModalOpen} className="modal">
        <div className="modal-box flex justify-center flex-col items-center">
          <h3 className="font-bold text-lg text-red-500">Delete Task</h3>
          <div>
            <img src={img} alt="" />
          </div>
          <h1 className="text-3xl font-bold">Are You Sure!!</h1>
          <p>Do you want to delete this Task on this app?</p>
          <div className="modal-action">
            <button
              className="bg-[#60efae] w-[144px] cursor-pointer rounded-md text-white font-semibold py-2 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
              onClick={handleDelete} // Trigger the delete function
            >
              Yes
            </button>
            <button
              className="bg-[#ff4c24] w-[144px] cursor-pointer rounded-md text-white font-semibold py-2 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
              onClick={() => setIsDeleteModalOpen(false)} // Close the modal
            >
              No
            </button>
          </div>
        </div>
      </dialog>

      {/* submit */}
      <dialog open={isSubmitModalOpen} className="modal">
        <div className="modal-box flex justify-center flex-col items-center">
          <div>
            <img src={congo} alt="" />
          </div>

          <h1 className="text-3xl font-bold">
            Successfully Completed The Task
          </h1>
          <p className="text-center">
            Congratulation! you have successfully completed the <br /> task and
            you got 20 points.
          </p>
          <button
            className="mt-4 bg-[#60efae] w-[144px] cursor-pointer rounded-md text-white font-semibold py-2 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
            onClick={handleClose} // Close the modal
          >
            Close
          </button>
        </div>
      </dialog>
    </div>
  );
};

export default TaskDetails;
