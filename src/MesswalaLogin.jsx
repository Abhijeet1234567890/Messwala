import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function MesswalaLogin() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    pass: "",
  });

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

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await fetch(`${BASE_URL}/messlogin`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await result.json();

      if (data && data.item) {
        localStorage.setItem("token", data.item);

        showToast("success", "Login successful! Redirecting to dashboard...");

        setTimeout(() => {
          navigate("/messhome");
          window.location.reload();
        }, 1200);
      } else {
        showToast("error", "Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.log(error);
      showToast("error", "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass =
    "w-full px-5 py-4 rounded-2xl bg-[#fff8f3] border border-orange-100 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-300 transition";

  return (
    <div className="min-h-screen bg-[#fff8f3] overflow-hidden px-4 py-12 flex items-center relative">

      {/* Premium Toast */}
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
                toast.type === "success"
                  ? "bg-green-100"
                  : "bg-red-100"
              }`}
            >
              {toast.type === "success" ? "✅" : "❌"}
            </div>

            <div>
              <h3 className="font-black text-base">
                {toast.type === "success" ? "Success" : "Error"}
              </h3>
              <p className="text-sm font-medium">{toast.message}</p>
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

      <div className="absolute top-0 left-0 w-72 h-72 bg-orange-300 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-300 rounded-full blur-3xl opacity-30"></div>

      <div className="relative max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-10 items-center">

        <div className="hidden lg:block">
          <span className="inline-block px-5 py-2 rounded-full bg-orange-100 text-orange-600 font-bold mb-6">
            MESS OWNER LOGIN
          </span>

          <h1 className="text-6xl font-black text-gray-900 leading-tight mb-6">
            Manage Your{" "}
            <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              Mess Business
            </span>
          </h1>

          <p className="text-gray-600 text-xl leading-relaxed mb-8">
            Login to your mess dashboard and manage your food service,
            customers, profile and business details in one place.
          </p>

          <div className="space-y-5">
            {[
              {
                icon: "📊",
                title: "Dashboard Access",
                text: "View and manage your mess account from one dashboard.",
              },
              {
                icon: "🍱",
                title: "Food Service Control",
                text: "Update your mess details, food type and service information.",
              },
              {
                icon: "🚀",
                title: "Grow Online",
                text: "Reach more students, bachelors and working professionals.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-5 shadow-xl border border-orange-100 flex gap-4 items-start"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center text-2xl">
                  {item.icon}
                </div>

                <div>
                  <h3 className="text-xl font-black text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-gray-500">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-400 rounded-[45px] blur-3xl opacity-25"></div>

          <div className="relative max-w-md mx-auto bg-white rounded-[45px] p-6 sm:p-8 md:p-10 shadow-2xl border border-orange-100">

            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center text-4xl shadow-xl mb-5">
                🍱
              </div>

              <h1 className="text-4xl font-black text-gray-900">
                Mess Login
              </h1>

              <p className="text-gray-500 mt-2">
                Access your mess dashboard
              </p>

              <div className="w-24 h-2 bg-gradient-to-r from-orange-500 to-pink-500 mx-auto mt-5 rounded-full"></div>
            </div>

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

            <div className="mt-6 rounded-2xl bg-orange-50 p-4 border border-orange-100">
              <p className="text-sm text-gray-600 text-center">
                Secure login for registered mess owners only.
              </p>
            </div>

            <p className="text-center text-gray-500 mt-7">
              Don't have an account?{" "}
              <Link
                to="/messregister"
                className="text-orange-500 hover:text-pink-500 font-black"
              >
                Register here
              </Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}

export default MesswalaLogin;