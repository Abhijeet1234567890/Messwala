import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function JoinMess() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mess: "",
    city: "",
    village: "",
    pincode: "",
    selecttype: "",
    note: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, type: "", message: "" });
  const navigate = useNavigate();

  const messview = localStorage.getItem("messview");
  const messdata = messview ? JSON.parse(messview) : null;
  const messId = messdata?.id || messdata?._id || "";

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => setToast({ show: false, type: "", message: "" }), 2500);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const selectPlan = (value) => {
    setFormData((prev) => ({ ...prev, mess: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!messId) return showToast("error", "Mess details not found.");
    if (!formData.mess) return showToast("error", "Please select duration.");
    if (!formData.selecttype) return showToast("error", "Please select food type.");

    setIsLoading(true);

    const userdata = {
      ...formData,
      type: formData.selecttype,
      messId,
    };

    try {
      let res = await fetch("http://localhost:2000/joinmess", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userdata),
      });

      const result = await res.json();

      if (res.ok) {
        localStorage.setItem("joinmess", JSON.stringify(result));
        showToast("success", "Mess joined successfully!");
        setTimeout(() => navigate("/owner"), 1200);
      } else {
        showToast("error", result.message || "Failed to join mess.");
      }
    } catch (error) {
      console.error(error);
      showToast("error", "Server error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    localStorage.removeItem("messview");
    navigate(`/messview/${messId}`);
  };

  const inputClass =
    "w-full px-5 py-4 rounded-2xl bg-white border border-orange-100 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-sm";

  const plans = [
    { title: "15 Days", icon: "⚡", text: "Quick trial plan" },
    { title: "1 Month", icon: "🔥", text: "Most popular plan" },
    { title: "6 Month", icon: "👑", text: "Best value plan" },
  ];

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
              <p className="text-sm font-bold">{toast.message}</p>
            </div>
          </div>
        </div>
      )}

      <div className="absolute -top-24 -left-24 w-96 h-96 bg-orange-300 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute top-40 -right-24 w-96 h-96 bg-pink-300 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-yellow-200 rounded-full blur-3xl opacity-30"></div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-5 py-2 rounded-full bg-orange-100 text-orange-600 font-black mb-5">
            🤝 JOIN MESS
          </span>

          <h1 className="text-4xl md:text-6xl font-black text-gray-900">
            Start Your{" "}
            <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              Daily Meal Plan
            </span>
          </h1>

          <p className="text-gray-600 text-lg mt-5">
            Fill your details, choose duration and join your favourite mess.
          </p>
        </div>

        <div className="grid lg:grid-cols-[420px_1fr] gap-10 items-start">
          <div className="space-y-6">
            <div className="bg-white rounded-[40px] p-7 shadow-2xl border border-orange-100">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center text-3xl shadow-xl mb-5">
                🍱
              </div>

              <h2 className="text-3xl font-black text-gray-900">
                Selected Mess
              </h2>

              <p className="text-gray-500 mt-2">
                Confirm your mess before joining.
              </p>

              <div className="mt-6 space-y-4">
                <div className="bg-[#fff8f3] rounded-3xl p-5 border border-orange-100">
                  <p className="text-xs font-black text-orange-500 uppercase">
                    Mess ID
                  </p>
                  <p className="font-black text-gray-900 mt-2 break-all">
                    {messId || "Not Available"}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 rounded-3xl p-4 text-center">
                    <p className="text-3xl">🥗</p>
                    <p className="font-black text-gray-800 mt-2">Healthy</p>
                  </div>

                  <div className="bg-yellow-50 rounded-3xl p-4 text-center">
                    <p className="text-3xl">🔥</p>
                    <p className="font-black text-gray-800 mt-2">Fresh</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[40px] p-7 shadow-xl border border-orange-100">
              <h3 className="text-2xl font-black text-gray-900 mb-5">
                Why Join?
              </h3>

              <div className="space-y-4">
                {[
                  "Daily homemade food",
                  "Veg / Non-Veg choice",
                  "Flexible duration plan",
                  "Custom food note support",
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-green-100 text-green-700 flex items-center justify-center font-black">
                      ✓
                    </div>
                    <p className="font-bold text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-400 rounded-[45px] blur-3xl opacity-25"></div>

            <div className="relative bg-white/95 backdrop-blur-xl rounded-[45px] p-6 md:p-8 shadow-[0_35px_90px_rgba(0,0,0,0.16)] border border-white">
              <div className="mb-8">
                <h2 className="text-4xl font-black text-gray-900">
                  Join Registration
                </h2>
                <p className="text-gray-500 mt-2">
                  Complete your meal membership details.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
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

                <div>
                  <p className="text-sm font-black text-gray-700 mb-3">
                    Select Duration
                  </p>

                  <div className="grid md:grid-cols-3 gap-4">
                    {plans.map((plan) => (
                      <button
                        key={plan.title}
                        type="button"
                        onClick={() => selectPlan(plan.title)}
                        className={`p-5 rounded-3xl border text-left transition ${
                          formData.mess === plan.title
                            ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white border-transparent shadow-xl scale-[1.03]"
                            : "bg-[#fff8f3] border-orange-100 text-gray-800 hover:border-orange-300"
                        }`}
                      >
                        <div className="text-3xl mb-3">{plan.icon}</div>
                        <h4 className="font-black text-lg">{plan.title}</h4>
                        <p
                          className={`text-sm mt-1 ${
                            formData.mess === plan.title
                              ? "text-white/80"
                              : "text-gray-500"
                          }`}
                        >
                          {plan.text}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <select
                    name="selecttype"
                    value={formData.selecttype}
                    onChange={handleInputChange}
                    required
                    className={inputClass}
                  >
                    <option value="">Select Food Type</option>
                    <option value="Veg">🥬 Vegetarian</option>
                    <option value="NonVeg">🍗 Non-Vegetarian</option>
                    <option value="Both">🍱 Both</option>
                  </select>

                  <input
                    type="text"
                    value={messId}
                    readOnly
                    className={`${inputClass} bg-orange-50 cursor-not-allowed`}
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-5">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className={inputClass}
                  />

                  <input
                    type="text"
                    name="village"
                    placeholder="Village"
                    value={formData.village}
                    onChange={handleInputChange}
                    className={inputClass}
                  />

                  <input
                    type="text"
                    name="pincode"
                    placeholder="Pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    required
                    className={inputClass}
                  />
                </div>

                <textarea
                  name="note"
                  value={formData.note}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Any custom food note? Example: less spicy, extra chapati..."
                  className="w-full resize-none px-5 py-4 rounded-2xl bg-[#fff8f3] border border-orange-100 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-5 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 text-white font-black text-xl shadow-2xl hover:scale-[1.02] transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Joining..." : "🚀 Join Mess Now"}
                </button>
              </form>

              <button
                onClick={handleBack}
                className="w-full mt-5 py-4 rounded-2xl bg-gray-100 text-gray-700 font-black hover:bg-gray-200 transition"
              >
                ← Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JoinMess;