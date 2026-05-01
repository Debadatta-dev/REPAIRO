import { useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/user/login", form);

      login({
        token: res.data.token,
        user: res.data.user,
      });

      if (res.data.user.role === "user") navigate("/user");
      if (res.data.user.role === "shop") navigate("/shop");
      if (res.data.user.role === "agent") navigate("/agent");

    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 relative overflow-hidden">

    {/* 🔹 Brand (Top Left) */}
    <div className="absolute top-6 left-6 text-white text-2xl font-bold tracking-wide">
      REPAIRO
    </div>

    {/* 🔹 Background glow */}
    <div className="absolute w-72 h-72 bg-purple-400 rounded-full blur-3xl opacity-30 top-10 left-10"></div>
    <div className="absolute w-72 h-72 bg-pink-400 rounded-full blur-3xl opacity-30 bottom-10 right-10"></div>

    {/* 🔹 Card */}
    <motion.form
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onSubmit={handleSubmit}
      className="backdrop-blur-lg bg-white/10 border border-white/20 text-white p-8 rounded-2xl shadow-xl w-80"
    >
      <h2 className="text-3xl font-bold mb-6 text-center">
        Welcome Back
      </h2>

      <input
        type="email"
        placeholder="Email"
        className="w-full mb-4 p-2 rounded bg-white/20 placeholder-white focus:outline-none"
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full mb-4 p-2 rounded bg-white/20 placeholder-white focus:outline-none"
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <button className="w-full bg-white text-indigo-600 p-2 rounded font-semibold hover:scale-105 transition">
        Login
      </button>

      {/* 🔹 Signup link */}
      <p className="text-sm text-center mt-4 text-white/80">
        Don’t have an account?{" "}
        <span
          onClick={() => navigate("/signup")}
          className="underline cursor-pointer hover:text-white"
        >
          Sign up
        </span>
      </p>
    </motion.form>
  </div>
);
}

export default Login;