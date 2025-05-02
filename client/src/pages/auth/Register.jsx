import React, { useState } from "react";
import img from "../../assets/bg1.png";
import bg from "../../assets/bg.png";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai"; // Font Awesome আইকন ব্যবহার করছি
import axiosInstance from "../../utils/api/axiosInstance";
import showToast from "../../utils/toast";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const registerUser = async (userData) => {
    try {
      const response = await axiosInstance.post("/register", userData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error(
        "Registration failed:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  };

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const newUser = {
        username: data.name,
        email: data.email,
        password: data.password,
      };
      const responseData = await registerUser(newUser);
      console.log("Registration successful:", responseData);

      showToast("success", "Registration successful!");
      navigate("/auth/login"); // রেজিস্ট্রেশন সফল হলে লগইন পেজে রিডাইরেক্ট করা হচ্ছে
      // রেজিস্ট্রেশন সফল হলে অন্য কোনো অ্যাকশন (যেমন রিডাইরেক্ট) নিতে পারেন
    } catch (error) {
      console.error("Registration failed:", error);
      showToast("error", error.message || "Registration failed!");
    }
  };

  const password = watch("password"); // watch ব্যবহার করে পাসওয়ার্ডের মান ট্র্যাক করা হচ্ছে

  return (
    <div className="flex flex-col-reverse md:flex-row">
      <div
        className="h-screen md:w-2/4 flex items-center justify-center background-image bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <img src={img} alt="" className="w-[600px] h-[600px]" />
      </div>
      <div className="h-screen md:w-2/4 flex items-center justify-center bg-gray-100">
        <div className=" p-8 rounded-lg shadow-md w-3/4 ">
          <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
            Sign Up
          </h2>
          <p className="text-sm text-gray-600 mb-6 text-center">
            Create a New Account.
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                {...register("name", {
                  required: "Please enter your full name",
                })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.name && (
                <p className="text-red-500 text-xs italic">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                {...register("email", {
                  required: "Please enter your email",
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.email && (
                <p className="text-red-500 text-xs italic">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="mb-6 relative">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs italic">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="mb-6 relative">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Confirm Password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs italic">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="bg-[#60E5Ae] hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Sign Up
            </button>
          </form>
          <div className="mt-6 text-center">
            <div className="flex items-center justify-center mb-4">
              <hr className="border border-gray-300 w-full" />{" "}
              <span className="px-2">Or</span>
              <hr className="border border-gray-300 w-full" />
            </div>
            <p className="text-gray-600 text-sm">
              Already have an account?{" "}
              <a
                href="#"
                className="font-semibold text-[#60E5Ae] hover:text-green-800"
              >
                <NavLink to="/auth/login">Log In</NavLink>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
