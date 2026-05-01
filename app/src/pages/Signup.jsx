import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

function Signup() {

  const navigate = useNavigate();

  const [role, setRole] = useState("user");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  // HANDLE INPUT
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  // HANDLE SIGNUP
  const handleSignup = async (e) => {

    e.preventDefault();

    setError("");
    setSuccess("");

    try {

      setLoading(true);

      const payload = {
        ...formData,
        role
      };

      await API.post(
        "/user/signup",
        payload
      );

      setSuccess(
        `${role.toUpperCase()} account created successfully`
      );

      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (err) {

      console.error(err);

      setError(
        err.response?.data?.msg ||
        err.response?.data?.message ||
        "Signup Failed"
      );

    } finally {

      setLoading(false);
    }
  };


  return (

    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-black to-[#020617] flex items-center justify-center px-4 relative overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-indigo-600/20 blur-[140px] rounded-full pointer-events-none" />

      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-pink-600/20 blur-[140px] rounded-full pointer-events-none" />


      {/* CARD */}
      <div
        className="
          w-full
          max-w-md
          rounded-3xl
          border
          border-white/10
          bg-white/[0.05]
          backdrop-blur-xl
          p-8
          shadow-2xl
          relative
          z-10
        "
      >

        {/* LOGO */}
        <div className="text-center mb-8">

          <h1
            className="
              text-5xl
              font-black
              bg-gradient-to-r
              from-indigo-300
              to-pink-500
              bg-clip-text
              text-transparent
            "
          >
            REPAIRO
          </h1>

          <p className="text-gray-400 mt-2">
            Create your account
          </p>

        </div>


        {/* ROLE SELECTOR */}
        <div className="grid grid-cols-3 gap-3 mb-8">

          {/* USER */}
          <button
            type="button"
            onClick={() => setRole("user")}
            className={`
              py-3
              rounded-2xl
              font-semibold
              transition-all
              ${
                role === "user"
                  ? "bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow-lg"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }
            `}
          >
            User
          </button>


          {/* SHOP */}
          <button
            type="button"
            onClick={() => setRole("shop")}
            className={`
              py-3
              rounded-2xl
              font-semibold
              transition-all
              ${
                role === "shop"
                  ? "bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow-lg"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }
            `}
          >
            Shop
          </button>


          {/* AGENT */}
          <button
            type="button"
            onClick={() => setRole("agent")}
            className={`
              py-3
              rounded-2xl
              font-semibold
              transition-all
              ${
                role === "agent"
                  ? "bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow-lg"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }
            `}
          >
            Agent
          </button>

        </div>


        {/* FORM */}
        <form
          onSubmit={handleSignup}
          className="space-y-5"
        >

          {/* NAME */}
          <div>

            <label className="block mb-2 text-sm text-gray-400">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder={`Enter ${
                role === "shop"
                  ? "shop"
                  : role
              } name`}
              className="
                w-full
                p-4
                rounded-2xl
                bg-white/10
                border
                border-white/10
                text-white
                placeholder-gray-500
                outline-none
                focus:border-indigo-500
                transition-all
              "
            />

          </div>


          {/* EMAIL */}
          <div>

            <label className="block mb-2 text-sm text-gray-400">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter email"
              className="
                w-full
                p-4
                rounded-2xl
                bg-white/10
                border
                border-white/10
                text-white
                placeholder-gray-500
                outline-none
                focus:border-indigo-500
                transition-all
              "
            />

          </div>


          {/* PASSWORD */}
          <div>

            <label className="block mb-2 text-sm text-gray-400">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter password"
              className="
                w-full
                p-4
                rounded-2xl
                bg-white/10
                border
                border-white/10
                text-white
                placeholder-gray-500
                outline-none
                focus:border-indigo-500
                transition-all
              "
            />

          </div>


          {/* ERROR MESSAGE */}
          {error && (
            <div
              className="
                bg-red-500/10
                border
                border-red-500/30
                text-red-300
                p-3
                rounded-xl
                text-sm
              "
            >
              {error}
            </div>
          )}


          {/* SUCCESS MESSAGE */}
          {success && (
            <div
              className="
                bg-green-500/10
                border
                border-green-500/30
                text-green-300
                p-3
                rounded-xl
                text-sm
              "
            >
              {success}
            </div>
          )}


          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              py-4
              rounded-2xl
              bg-gradient-to-r
              from-indigo-500
              to-pink-500
              font-bold
              text-lg
              hover:scale-[1.02]
              transition-all
              duration-300
              shadow-xl
              disabled:opacity-70
            "
          >
            {loading
              ? "Creating Account..."
              : `Signup as ${
                  role.charAt(0).toUpperCase() +
                  role.slice(1)
                }`}
          </button>

        </form>


        {/* LOGIN */}
        <div className="mt-8 text-center">

          <p className="text-gray-400 text-sm">

            Already have an account?{" "}

            <Link
              to="/"
              className="
                text-indigo-400
                hover:text-indigo-300
                font-semibold
              "
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Signup;