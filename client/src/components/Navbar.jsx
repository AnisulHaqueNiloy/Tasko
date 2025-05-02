import React, { useState } from "react";
import { FaTasks, FaListAlt, FaCog } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { ImStopwatch } from "react-icons/im";
import { FaClipboardList } from "react-icons/fa6";
import { RxColorWheel } from "react-icons/rx";
import img from "../assets/download.png";
import { IoMdArrowDropdown } from "react-icons/io";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navlinks = [
    <>
      <li key={"1"} className="text-lg font-bold">
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            isActive ? "text-[#60E5AE]" : undefined
          }
        >
          <FaClipboardList></FaClipboardList> Task List
        </NavLink>
      </li>
      <li className="text-lg font-bold">
        <NavLink
          key={"2"}
          to={"/spin"}
          className={({ isActive }) =>
            isActive ? "text-[#60E5AE]" : undefined
          }
        >
          {" "}
          <RxColorWheel></RxColorWheel>
          Spin
        </NavLink>
      </li>
    </>,
  ];

  return (
    <div className="navbar bg-transparent text-white md:w-11/12 mx-auto ">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navlinks}
          </ul>
        </div>
        <div className="flex items-center gap-2">
          {" "}
          <span className="bg-white/60 rounded-md p-2">
            <ImStopwatch></ImStopwatch>
          </span>{" "}
          <a className=" text-2xl">daisyUI</a>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navlinks}</ul>
      </div>
      <div className="navbar-end">
        {/* <div className="flex gap-2 items-center">
          <img src={img} alt="" className="w-12 h-12 rounded-full border-2" />
          <div className="flex gap-1 items-center cursor-pointer">
            <p>Thomas</p>
            <p>
              <IoMdArrowDropdown></IoMdArrowDropdown>
            </p>
          </div>
        </div> */}
        <div className="relative">
          <div className="flex gap-2 items-center">
            <img src={img} alt="" className="w-12 h-12 rounded-full border-2" />
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="flex gap-1 items-center cursor-pointer"
            >
              <p>Thomas</p>
              <p>
                <IoMdArrowDropdown />
              </p>
            </div>
          </div>

          {isOpen && (
            <ul className="absolute right-0 mt-2 bg-white text-black shadow-md rounded-md w-28 z-50">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer ">
                Log out
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
