import React from "react";
import { Link } from "react-router-dom";

function TeffenHome() {
  const MessId = localStorage.getItem("messId");
  const Joinmess = localStorage.getItem("joinmess");
  const isJoined = MessId || Joinmess;



  return (
    <div className="min-h-screen relative overflow-hidden bg-[#fff8f3] text-gray-900">
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-orange-300 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute top-40 -right-24 w-96 h-96 bg-pink-300 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-yellow-200 rounded-full blur-3xl opacity-30"></div>

      <div className="relative max-w-7xl mx-auto px-5 py-14">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[78vh]">
          <div>
            <span className="inline-block px-5 py-2 rounded-full bg-orange-100 text-orange-600 font-black mb-6">
              🍱 SMART TIFFIN DASHBOARD
            </span>

            <h1 className="text-5xl md:text-7xl font-black leading-tight">
              Manage Your{" "}
              <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                Daily Meals
              </span>{" "}
              Easily
            </h1>

            <p className="text-gray-600 text-lg mt-6 max-w-xl">
              Find best mess services near you, check daily menu, join meal
              plans and send custom food messages.
            </p>

            <div className="flex flex-wrap gap-4 mt-9">
              <Link to="/tiffinprofile">
                <button className="px-8 py-4 rounded-2xl bg-white text-gray-900 font-black shadow-xl border border-orange-100 hover:scale-105 transition">
                  👤 My Profile
                </button>
              </Link>

              {!isJoined && (
                <Link to="/usermess">
                  <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 text-white font-black shadow-xl hover:scale-105 transition">
                    📋 Browse Mess
                  </button>
                </Link>
              )}

              {isJoined && (
                <Link to="/owner">
                  <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-black shadow-xl hover:scale-105 transition">
                    🚀 Go Dashboard
                  </button>
                </Link>
              )}
            </div>

            <div className="grid grid-cols-3 gap-4 mt-10 max-w-xl">
              {[
                ["50+", "Mess"],
                ["Daily", "Menu"],
                ["24/7", "Support"],
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white/90 rounded-3xl p-5 text-center shadow-xl border border-orange-100"
                >
                  <h3 className="text-2xl font-black text-orange-500">
                    {item[0]}
                  </h3>
                  <p className="text-gray-500 font-bold text-sm mt-1">
                    {item[1]}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-400 rounded-[50px] blur-3xl opacity-25"></div>

            <div className="relative bg-white rounded-[50px] p-7 shadow-[0_35px_90px_rgba(0,0,0,0.16)] border border-orange-100">
              <div className="h-72 rounded-[35px] bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center text-9xl shadow-xl">
                🍱
              </div>

              <div className="mt-7">
                <h2 className="text-3xl font-black text-gray-900">
                  Today Special Meal
                </h2>

                <p className="text-gray-500 mt-3">
                  Homemade food, healthy ingredients and fresh daily menu for
                  students.
                </p>

                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="bg-orange-50 rounded-3xl p-4 text-center">
                    <p className="text-3xl">🔥</p>
                    <p className="font-black text-sm mt-2">Hot</p>
                  </div>

                  <div className="bg-green-50 rounded-3xl p-4 text-center">
                    <p className="text-3xl">🥗</p>
                    <p className="font-black text-sm mt-2">Healthy</p>
                  </div>

                  <div className="bg-yellow-50 rounded-3xl p-4 text-center">
                    <p className="text-3xl">💬</p>
                    <p className="font-black text-sm mt-2">Custom</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-10">
          <div className="text-center mb-10">
            <span className="inline-block px-5 py-2 rounded-full bg-orange-100 text-orange-600 font-black mb-4">
              ✨ PREMIUM FEATURES
            </span>

            <h2 className="text-4xl md:text-5xl font-black">
              Everything For Your Meal Plan
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🔍",
                title: "Search Mess",
                text: "Find mess services by city, village and food preference.",
              },
              {
                icon: "🍲",
                title: "Daily Menu",
                text: "Check daily veg, non-veg and special food options.",
              },
              {
                icon: "💬",
                title: "Custom Message",
                text: "Send food requests like less spicy or extra chapati.",
              },
              {
                icon: "📅",
                title: "Flexible Plan",
                text: "Choose 15 days, 1 month or 6 month meal plan.",
              },
              {
                icon: "👨‍💼",
                title: "Owner Info",
                text: "View mess owner details and contact information.",
              },
              {
                icon: "✅",
                title: "Easy Join",
                text: "Join your favourite mess quickly with one simple form.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group bg-white rounded-[35px] p-7 shadow-xl border border-orange-100 hover:-translate-y-3 transition duration-500"
              >
                <div className="w-16 h-16 rounded-3xl bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center text-3xl shadow-xl mb-6 group-hover:scale-110 transition">
                  {feature.icon}
                </div>

                <h3 className="text-2xl font-black text-gray-900">
                  {feature.title}
                </h3>

                <p className="text-gray-500 mt-3 leading-relaxed">
                  {feature.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 bg-white rounded-[45px] p-8 md:p-10 shadow-2xl border border-orange-100">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl mb-3">🥗</div>
              <h3 className="text-2xl font-black">Healthy Food</h3>
              <p className="text-gray-500 mt-2">
                Fresh homemade meals prepared daily.
              </p>
            </div>

            <div>
              <div className="text-5xl mb-3">🚀</div>
              <h3 className="text-2xl font-black">Fast Joining</h3>
              <p className="text-gray-500 mt-2">
                Select mess and start your plan quickly.
              </p>
            </div>

            <div>
              <div className="text-5xl mb-3">⭐</div>
              <h3 className="text-2xl font-black">Premium Service</h3>
              <p className="text-gray-500 mt-2">
                Clean UI, easy tracking and simple meal management.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default TeffenHome;