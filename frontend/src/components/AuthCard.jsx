import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/axios";
import { useAuth } from "../context/AuthContext";

import toast from "react-hot-toast";

const AuthCard = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;

      if (isLogin) {
        response = await api.post("/auth/login", {
          email: formData.email,
          password: formData.password,
        });
      } else {
        response = await api.post("/auth/register", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
      }

      const { token, user } = response.data;

      login(token, user);

      navigate("/dashboard");

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        "Something went wrong"
      );
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-green-100 p-8 w-full max-w-md">
      <div className="flex bg-green-50 rounded-xl p-1 mb-6">
        <button
          onClick={() => setIsLogin(true)}
          className={`flex-1 py-2 rounded-lg transition cursor-pointer ${
            isLogin
              ? "bg-green-600 text-white"
              : "text-green-700"
          }`}
        >
          Login
        </button>

        <button
          onClick={() => setIsLogin(false)}
          className={`flex-1 py-2 rounded-lg transition cursor-pointer ${
            !isLogin
              ? "bg-green-600 text-white"
              : "text-green-700"
          }`}
        >
          Sign Up
        </button>
      </div>

      <h2 className="text-2xl font-bold text-center mb-6">
        {isLogin ? "Welcome Back" : "Create Account"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-green-500"
          />
        )}

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email Address"
          className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-green-500"
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-green-500"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition cursor-pointer"
        >
          {isLogin ? "Login" : "Create Account"}
        </button>
      </form>
    </div>
  );
};

export default AuthCard;