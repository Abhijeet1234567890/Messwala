import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function TeffenwalRegister() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    pass: "",
    gender: "",
    city: "",
    contact: "",
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, type: "", message: "" });

  const navigate = useNavigate();

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => setToast({ show: false, type: "", message: "" }), 2500);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);

    if (selected) {
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!file) {
      showToast("error", "Please upload profile photo.");
      return;
    }

    setIsLoading(true);

    const formDataToSend = new FormData();

    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    formDataToSend.append("file", file);

    try {
      const result = await fetch("http://localhost:2000/teffinregister", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await result.json();

      if (result.ok) {
        showToast("success", "Registration successful!");
        setTimeout(() => navigate("/teffinlogin"), 1200);
      } else {
        showToast("error", data.message || "Registration failed.");
      }
    } catch (error) {
      console.error(error);
      showToast("error", "Server error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass =
    "w-full px-5 py-4 bg-white/80 border border-orange-100 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition shadow-sm";

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#fff8f3] px-4 py-10">
      {toast.show && (
        <div className="fixed top-6 right-6 z-[9999]">
          <div
            className={`flex items-center gap-4 px-6 py-4 rounded-2xl shadow-2xl border backdrop-blur-xl ${
              toast.type === "success"
                ? "bg-green-50/95 border-green-200 text-green-700"
                : "bg-red-50/95 border-red-200 text-red-700"
            }`}
          >
            <div className="text-2xl">
              {toast.type === "success" ? "✅" : "❌"}
            </div>
            <div>
              <h3 className="font-black">
                {toast.type === "success" ? "Success" : "Error"}
              </h3>
              <p className="text-sm font-semibold">{toast.message}</p>
            </div>
          </div>
        </div>
      )}

      <div className="absolute -top-20 -left-20 w-96 h-96 bg-orange-300 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute top-40 -right-20 w-96 h-96 bg-pink-300 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-yellow-200 rounded-full blur-3xl opacity-30"></div>

      <div className="relative max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
        <div className="hidden lg:block">
          <span className="inline-block px-5 py-2 rounded-full bg-orange-100 text-orange-600 font-black mb-5">
            🥘 TIFFIN PARTNER
          </span>

          <h1 className="text-6xl font-black text-gray-900 leading-tight">
            Start Your{" "}
            <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              Tiffin Business
            </span>
          </h1>

          <p className="text-gray-600 text-lg mt-6 max-w-xl">
            Register your mess or tiffin service and reach students easily with
            daily menu, custom messages and online joining.
          </p>

          <div className="grid grid-cols-2 gap-5 mt-10">
            {[
              ["🍛", "Daily Menu"],
              ["📦", "More Orders"],
              ["💬", "Custom Request"],
              ["🚀", "Easy Growth"],
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-xl rounded-3xl p-5 shadow-xl border border-orange-100"
              >
                <div className="text-3xl mb-3">{item[0]}</div>
                <h3 className="font-black text-gray-900">{item[1]}</h3>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-400 rounded-[45px] blur-3xl opacity-25"></div>

          <div className="relative bg-white/90 backdrop-blur-2xl rounded-[45px] p-6 md:p-8 shadow-[0_35px_90px_rgba(0,0,0,0.18)] border border-white">
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center text-4xl shadow-xl mb-5">
                🥘
              </div>

              <h2 className="text-4xl font-black text-gray-900">
                Register Now
              </h2>

              <p className="text-gray-500 mt-2">
                Create your tiffin partner account
              </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              <div className="flex justify-center mb-6">
                <label
                  htmlFor="profile-image"
                  className="relative w-32 h-32 rounded-[32px] bg-orange-50 border-2 border-dashed border-orange-300 flex items-center justify-center cursor-pointer overflow-hidden shadow-lg hover:scale-105 transition"
                >
                  {preview ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center">
                      <div className="text-4xl">📷</div>
                      <p className="text-xs font-bold text-orange-500 mt-2">
                        Upload Photo
                      </p>
                    </div>
                  )}

                  <input
                    id="profile-image"
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                </label>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className={inputClass}
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className={inputClass}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="password"
                  name="pass"
                  placeholder="Password"
                  value={formData.pass}
                  onChange={handleInputChange}
                  required
                  className={inputClass}
                />

                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className={inputClass}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="tel"
                  name="contact"
                  placeholder="Contact Number"
                  value={formData.contact}
                  onChange={handleInputChange}
                  required
                  className={inputClass}
                />

                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                  className={inputClass}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 mt-4 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 text-white font-black text-lg shadow-xl hover:scale-[1.02] hover:shadow-orange-300 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? "Registering..." : "🚀 Create Account"}
              </button>
            </form>

            <p className="text-center text-gray-500 mt-7">
              Already registered?{" "}
              <Link
                to="/teffinlogin"
                className="text-orange-500 hover:text-pink-500 font-black"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeffenwalRegister;