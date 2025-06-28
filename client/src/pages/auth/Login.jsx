import React, { useState } from "react";
import img from "../../assets/vector.png";
import bg from "../../assets/bg.png";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai"; // Font Awesome আইকন ব্যবহার করছি
import axiosInstance from "../../utils/api/axiosInstance";
import showToast from "../../utils/toast";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // useNavigate হুক ব্যবহার করে রিডাইরেক্ট করার জন্য

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axiosInstance.post("/login", {
        // /login এ পোস্ট রিকোয়েস্ট
        email: data.email,
        password: data.password,
      }); // withCredentials: true ব্যবহার করে কুকি পাঠানো হচ্ছে
      console.log("Response:", response.data); // রেসপন্স লগ করা হচ্ছে
      console.log("Login successful:", response.data);
      showToast("success", "Login successful!");
      // লগইন সফল হলে ব্যবহারকারীকে অন্য পেজে রিডাইরেক্ট করুন
      navigate("/"); // '/dashboard' আপনার ড্যাশবোর্ডের রাউট হতে পারে
      // অথবা লোকাল স্টোরেজে টোকেন বা ব্যবহারকারীর তথ্য সংরক্ষণ করতে পারেন
      // উদাহরণস্বরূপ টোকেন সংরক্ষণ
    } catch (error) {
      console.error("Login failed:", error);
      showToast("error", error.response?.data?.message || "Login failed!");
      // লগইন ব্যর্থ হলে এরর মেসেজ দেখান
    }
  };
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
            Login
          </h2>
          <p className="text-sm text-gray-600 mb-6 text-center">
            Welcome back! Please Enter your Details to Log In.
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
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
            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center text-gray-700 text-sm">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-green-500 focus:ring-green-500 border-gray-300 rounded"
                />
                <span className="ml-2">Remember me</span>
              </label>
              <a
                href="#"
                className="inline-block align-baseline font-semibold text-sm text-[#60E5Ae] hover:text-green-800"
              >
                <NavLink to="/auth/reset-password">Forgot Password?</NavLink>
              </a>
            </div>
            <button
              type="submit"
              className="bg-[#60E5ae] hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Login
            </button>
          </form>
          <div className="mt-6 text-center">
            <div className="flex items-center justify-center mb-4">
              <hr className="border border-gray-300 w-full" />{" "}
              <span className="px-2">Or</span>
              <hr className="border border-gray-300 w-full" />
            </div>
            <p className="text-gray-600 text-sm">
              Dont Have an Account?{" "}
              <a
                href="#"
                className="font-semibold text-[#60E5Ae] hover:text-green-800"
              >
                <NavLink to="/auth/register">Sign Up</NavLink>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
