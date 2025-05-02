import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai"; // Font Awesome আইকন ব্যবহার করছি
import { ImStopwatch } from "react-icons/im";
const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onSubmit = (data) => {
    console.log(data);
    // এখানে রিসেট পাসওয়ার্ডের জন্য API কল করা যেতে পারে
  };

  const password = watch("newPassword"); // watch ব্যবহার করে নতুন পাসওয়ার্ডের মান ট্র্যাক করা হচ্ছে

  return (
    <div className="bg-white shadow-md w-11/12 mx-auto rounded-lg p-4 sm:p-6 mt-4 flex justify-center">
      <div className="bg-white p-8 rounded-lg w-[6/12] shadow-md ">
        <div className="flex justify-center mb-4">
          <div className="bg-gradient-to-l from-[#60E5AE] to-green-700 rounded-md p-3">
            <ImStopwatch className="text-4xl text-[#60E5AE]" />
          </div>
        </div>
        <h2 className="text-2xl font-semibold mb-2 text-center text-gray-800">
          Reset your Password
        </h2>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Strong passwords include numbers, letters, and punctuation marks.
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
              defaultValue="m32220@gmail.com" // ডিফল্ট ইমেইল অ্যাড্রেস
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              readOnly // যেহেতু ইমেইল পরিবর্তন করার অপশন নেই তাই রিডOnly করে দেওয়া হয়েছে
            />
          </div>
          <div className="mb-6 relative">
            <label
              htmlFor="newPassword"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Enter New Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="newPassword"
              {...register("newPassword", {
                required: "Please enter a new password",
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
            {errors.newPassword && (
              <p className="text-red-500 text-xs italic">
                {errors.newPassword.message}
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
                required: "Please confirm your new password",
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
            className="bg-[#60E5AE] hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
