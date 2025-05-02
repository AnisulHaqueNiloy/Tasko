import React from "react";
import img from "../../assets/error.jpg";
import { NavLink } from "react-router-dom";
const ErrorPage = () => {
  return (
    <div className="bg-white shadow-md w-11/12 mx-auto rounded-lg p-4 sm:p-6 mt-4">
      <div className="flex flex-col justify-center items-center">
        <img src={img} alt="" className="h-[500px]" />
        <button className="bg-[#60E5AE] w-[380px] py-5 text-black font-semibold rounded-md cursor-pointer">
          <NavLink to={"/"}>Back to Home</NavLink>
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
