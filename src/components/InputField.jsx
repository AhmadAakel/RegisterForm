import React from "react";
import { AiFillCheckCircle, AiFillEye } from "react-icons/ai";
import { BsEyedropper } from "react-icons/bs";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { GoEye, GoEyeClosed } from "react-icons/go";

export default function InputField({
  type,
  name,
  placeholder,
  value,
  onChange,
  error,
  showPassword,
  toggleShowPassword,
  showConfirmPassword,
  toggleShowConfirmPassword,
  isPasswordMatched,
}) {
  return (
    <div className="w-full">
      <div className="relative">
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`border rounded-lg w-full px-4 py-2 focus:outline-none focus:ring-1 transition ${error ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-gray-200"} ${isPasswordMatched ? "border-green-500" : "border-gray-300"}`}
        />
        {toggleShowPassword && (
          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black transition"
          >
            {showPassword ? <GoEyeClosed /> : <GoEye size={20} />}
          </button>
        )}
        {toggleShowConfirmPassword && (
          <button
            type="button"
            onClick={toggleShowConfirmPassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black transition"
          >
            {showConfirmPassword ? <GoEyeClosed /> : <GoEye size={20} />}
          </button>
        )}
      </div>
    </div>
  );
}
