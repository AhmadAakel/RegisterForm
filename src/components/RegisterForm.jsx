import React, { useState } from "react";
import InputField from "./InputField";
import { toast } from "react-toastify";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const [success, setSuccess] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const inputs = [
    {
      type: "text",
      name: "name",
      placeholder: "Name",
    },
    {
      type: "text",
      name: "email",
      placeholder: "Email",
    },
    {
      type: showPassword ? "text" : "password",
      name: "password",
      placeholder: "Password",
    },
    {
      type: showConfirmPassword ? "text" : "password",
      name: "confirmPassword",
      placeholder: "Confirm Password",
    },
  ];

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      toast.error("Name is required");
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      toast.error("Email is required");
    } else if (!formData.email.includes("@")) {
      newErrors.email = "pleas write correct email form";
      toast.error("pleas write correct email form");
    }
    if (!formData.password.trim()) {
      newErrors.password = "password is required";
      toast.error("password is required");
    }
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "pleas confirm your password";
      toast.error("pleas confirm your password");
    } else if (formData.confirmPassword != formData.password) {
      newErrors.confirmPassword = "passwords don't match";
      toast.error("passwords don't match");
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      await new Promise((a) => setTimeout(a, 2000));
      toast.success("Account Created Successfully");
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setLoading(false);
    }
  }

  function checkPasswordStrength(password) {
    if (password.length < 6) {
      return {
        strength: "Weak",
        color: "bg-red-500",
        width: "w-1/3",
      };
    } else if (password.match(/[A-Z]/) && password.match(/[0-9]/)) {
      return {
        strength: "Strong",
        color: "bg-green-500",
        width: "w-full",
      };
    } else {
      return {
        strength: "Medium",
        color: "bg-yellow-500",
        width: "w-2/3",
      };
    }
  }

  const passwordStrength = checkPasswordStrength(formData.password);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <form
          className="bg-white shadow-lg rounded-xl p-6 sm:p-8 w-full max-w-md flex flex-col space-y-3 sm:space-y-4 border border-gray-200"
          onSubmit={handleSubmit}
        >
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center tracking-tight">
            Register Form
          </h1>

          {inputs.map((input) => (
            <InputField
              key={input.name}
              type={input.type}
              name={input.name}
              placeholder={input.placeholder}
              value={formData[input.name]}
              onChange={handleChange}
              error={errors[input.name]}
              showPassword={showPassword}
              showConfirmPassword={showConfirmPassword}
              toggleShowPassword={
                input.name === "password"
                  ? () => setShowPassword(!showPassword)
                  : null
              }
              toggleShowConfirmPassword={
                input.name === "confirmPassword"
                  ? () => setShowConfirmPassword(!showConfirmPassword)
                  : null
              }
              isPasswordMatched={
                (input.name === "confirmPassword" ||
                  input.name === "password") &&
                formData.password === formData.confirmPassword &&
                formData.password != ""
              }
            />
          ))}
          {formData.password && (
            <div className="w-full">
              <div className="flex justify-between mb-1">
                <span className="text-sm">Password Strength</span>
                <span className="text-sm font-semibold">
                  {passwordStrength.strength}
                </span>
              </div>
              <div className=" flex space-x-1">
                <div
                  className={`bg-gray-300 rounded-full h-2 ${passwordStrength.width}`}
                >
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color} ${passwordStrength.strength}`}
                  ></div>
                </div>
                <div
                  className={`bg-gray-300 rounded-full h-2 ${passwordStrength.width}`}
                >
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.strength == "Medium" || passwordStrength.strength == "Strong" ? passwordStrength.color : ""} ${passwordStrength.strength}`}
                  ></div>
                </div>
                <div
                  className={`bg-gray-300 rounded-full h-2 ${passwordStrength.width}`}
                >
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.strength == "Strong" ? passwordStrength.color : ""} ${passwordStrength.strength}`}
                  ></div>
                </div>
              </div>
            </div>
          )}

          <button
            disabled={loading}
            className={` text-white transition text-sm sm:text-base w-full rounded-2xl py-1.5 ${loading ? "bg-gray-400 cursor-not-allowed" : "cursor-pointer  hover:bg-gray-800 bg-black "}`}
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </form>
      </div>
    </>
  );
}
