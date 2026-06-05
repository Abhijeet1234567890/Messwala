import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function TeffenLogin() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    pass: "",
  });

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const [isLoading, setIsLoading] = useState(false);

  const [toast, setToast] = useState({
    show: false,
    type: "",
    message: "",
  });

  const navigate = useNavigate();

  const showToast = (type, message) => {
    setToast({
      show: true,
      type,
      message,
    });

    setTimeout(() => {
      setToast({
        show: false,
        type: "",
        message: "",
      });
    }, 2500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/teffinlogin`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      console.log("Response:", data);

      if (data && data.token) {
        localStorage.setItem("teffintoken", data.token);

        if (data.joinData && data.joinData.messId) {
          localStorage.setItem("messId", data.joinData.messId);

          showToast("success", "Login successful! Mess already joined.");
        } else {
          showToast("success", "Login successful! No mess joined yet.");
        }

        setTimeout(() => {
          navigate("/teffinhome");
          window.location.reload();
        }, 1200);
      } else {
        showToast("error", data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.log("Error:", error);
      showToast("error", "Server error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass =
    "w-full px-5 py-4 rounded-2xl bg-[#fff8f3] border border-orange-100 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-300 transition";

  return (
    <div className="min-h-screen bg-[#fff8f3] overflow-hidden relative px-4 sm:px-6 lg:px-8 py-10 flex items-center">

      {/* Toast */}
      {toast.show && (
        <div className="fixed top-6 right-6 z-[9999] animate-[slideIn_0.3s_ease-out]">
          <div
            className={`flex items-center gap-4 px-6 py-4 rounded-2xl shadow-2xl border backdrop-blur-xl ${
              toast.type === "success"
                ? "bg-green-50/95 border-green-200 text-green-700"
                : "bg-red-50/95 border-red-200 text-red-700"
            }`}
          >
            <div
              className={`w-11 h-11 rounded-2xl flex items-center justify-center text-2xl ${
                toast.type === "success" ? "bg-green-100" : "bg-red-100"
              }`}
            >
              {toast.type === "success" ? "✅" : "❌"}
            </div>

            <div>
              <h3 className="font-black text-base">
                {toast.type === "success" ? "Success" : "Error"}
              </h3>

              <p className="text-sm font-medium">
                {toast.message}
              </p>
            </div>
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateX(40px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}
      </style>

      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-72 h-72 sm:w-96 sm:h-96 bg-orange-300 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 sm:w-96 sm:h-96 bg-pink-300 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-yellow-200 rounded-full blur-3xl opacity-30"></div>

      <div className="relative max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">

        {/* Left Extra Information */}
        <div className="hidden lg:block">

          <span className="inline-block px-5 py-2 rounded-full bg-orange-100 text-orange-600 font-black mb-6">
            TIFFIN PROVIDER LOGIN
          </span>

          <h1 className="text-6xl font-black text-gray-900 leading-tight mb-6">
            Manage Your{" "}
            <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              Tiffin Service
            </span>
          </h1>

          <p className="text-gray-600 text-xl leading-relaxed mb-8">
            Login to your tiffin account and manage your mess joining,
            profile, daily food service and customer connection easily.
          </p>

          <div className="space-y-5">
            {[
              {
                icon: "🥘",
                title: "Tiffin Dashboard",
                text: "Access your tiffin dashboard and service details.",
              },
              {
                icon: "🍱",
                title: "Mess Connection",
                text: "Check your joined mess and food service status.",
              },
              {
                icon: "📅",
                title: "Daily Meals",
                text: "View daily menu and manage your meal plan.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-5 shadow-xl border border-orange-100 flex gap-4 items-start hover:-translate-y-1 transition"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center text-2xl shadow-lg">
                  {item.icon}
                </div>

                <div>
                  <h3 className="text-xl font-black text-gray-900">
                    {item.title}
                  </h3>

                  <p className="text-gray-500 mt-1">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Form Card */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-400 rounded-[45px] blur-3xl opacity-25"></div>

          <div className="relative max-w-md mx-auto bg-white rounded-[35px] sm:rounded-[45px] p-6 sm:p-8 md:p-10 shadow-2xl border border-orange-100">

            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center text-4xl shadow-xl mb-5">
                🥘
              </div>

              <h1 className="text-4xl font-black text-gray-900">
                Tiffin Login
              </h1>

              <p className="text-gray-500 mt-2">
                Login and access your tiffin dashboard
              </p>

              <div className="w-24 h-2 bg-gradient-to-r from-orange-500 to-pink-500 mx-auto mt-5 rounded-full"></div>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-5">

              <input
                type="text"
                name="name"
                placeholder="Enter Name"
                value={formData.name}
                onChange={handleChange}
                required
                className={inputClass}
              />

              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
                required
                className={inputClass}
              />

              <input
                type="password"
                name="pass"
                placeholder="Enter Password"
                value={formData.pass}
                onChange={handleChange}
                required
                className={inputClass}
              />

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 text-white font-black text-lg shadow-xl hover:scale-105 transition duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? "Logging in..." : "Login Now 🚀"}
              </button>

            </form>

            {/* Info Box */}
            <div className="mt-6 rounded-2xl bg-orange-50 p-4 border border-orange-100">
              <p className="text-sm text-gray-600 text-center font-medium">
                Secure login for registered tiffin providers only.
              </p>
            </div>

            {/* Footer */}
            <p className="text-center text-gray-500 mt-7">
              Don't have an account?{" "}
              <Link
                to="/teffinregister"
                className="text-orange-500 hover:text-pink-500 font-black"
              >
                Register
              </Link>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}

export default TeffenLogin;