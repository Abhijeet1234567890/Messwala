import React from "react";
import { Link } from "react-router-dom";

function MessHome() {
  const stats = [
    {
      title: "Total Orders",
      value: "24",
      icon: "📋",
      bg: "from-orange-500 to-pink-500",
    },
    {
      title: "Total Users",
      value: "156",
      icon: "👥",
      bg: "from-blue-500 to-indigo-500",
    },
    {
      title: "Revenue",
      value: "₹8,900",
      icon: "💰",
      bg: "from-green-500 to-emerald-500",
    },
    {
      title: "Food Items",
      value: "18",
      icon: "🍲",
      bg: "from-yellow-500 to-orange-500",
    },
  ];

  const cards = [
    {
      icon: "📋",
      title: "View Orders",
      desc: "Check and manage all incoming orders from customers.",
      path: "/orders",
      btn: "View Orders",
    },
    {
      icon: "🍲",
      title: "Add Food Items",
      desc: "Add new dishes, prices, images and meal details.",
      path: "/addinstace",
      btn: "Add Food",
    },
    {
      icon: "👥",
      title: "View Users",
      desc: "See your customers and manage user information.",
      path: "/users",
      btn: "View Users",
    },
  ];

  return (
    <div className="min-h-screen bg-[#fff8f3] overflow-hidden relative py-10 px-4">

      {/* BACKGROUND DESIGN */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-orange-300 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute top-40 right-0 w-80 h-80 bg-pink-300 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-yellow-200 rounded-full blur-3xl opacity-30"></div>

      <div className="relative max-w-7xl mx-auto">

        {/* HERO */}
        <section className="grid lg:grid-cols-2 gap-10 items-center mb-14">

          <div>
            <span className="inline-block px-5 py-2 rounded-full bg-orange-100 text-orange-600 font-black mb-6">
              👨‍💼 OWNER DASHBOARD
            </span>

            <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight mb-6">
              Welcome to Your{" "}
              <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                Mess Dashboard
              </span>
            </h1>

            <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl">
              Manage your mess business, add food items, track customers and grow
              your service easily from one modern dashboard.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/addinstace">
                <button className="px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-black shadow-xl hover:scale-105 transition">
                  + Add Food Item
                </button>
              </Link>

              <Link to="/startedmess">
                <button className="px-8 py-4 rounded-full bg-white text-orange-600 font-black border border-orange-200 shadow-lg hover:scale-105 transition">
                  View Started Mess
                </button>
              </Link>
            </div>
          </div>

          {/* HERO CARD */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-400 rounded-[45px] blur-3xl opacity-25"></div>

            <div className="relative bg-white rounded-[45px] p-8 shadow-2xl border border-orange-100">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="text-gray-500 font-bold">Today Overview</p>
                  <h2 className="text-4xl font-black text-gray-900">
                    Business Summary
                  </h2>
                </div>

                <div className="w-16 h-16 rounded-3xl bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center text-3xl shadow-xl">
                  🍱
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-bold text-gray-700">Orders Growth</span>
                    <span className="font-black text-orange-500">78%</span>
                  </div>
                  <div className="h-3 bg-orange-100 rounded-full overflow-hidden">
                    <div className="h-full w-[78%] bg-gradient-to-r from-orange-500 to-pink-500 rounded-full"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-bold text-gray-700">Customer Reach</span>
                    <span className="font-black text-orange-500">64%</span>
                  </div>
                  <div className="h-3 bg-orange-100 rounded-full overflow-hidden">
                    <div className="h-full w-[64%] bg-gradient-to-r from-orange-500 to-pink-500 rounded-full"></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="bg-[#fff8f3] rounded-3xl p-5 border border-orange-100">
                    <p className="text-gray-500 font-bold">Status</p>
                    <h3 className="text-2xl font-black text-green-600">
                      Active
                    </h3>
                  </div>

                  <div className="bg-[#fff8f3] rounded-3xl p-5 border border-orange-100">
                    <p className="text-gray-500 font-bold">Rating</p>
                    <h3 className="text-2xl font-black text-yellow-500">
                      4.8 ⭐
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </section>

        {/* STATS */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {stats.map((item, index) => (
            <div
              key={index}
              className="group bg-white rounded-[30px] p-6 shadow-xl border border-orange-100 hover:-translate-y-2 transition duration-300"
            >
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${item.bg} flex items-center justify-center text-2xl shadow-lg mb-5 group-hover:scale-110 transition`}
              >
                {item.icon}
              </div>

              <p className="text-gray-500 font-bold mb-2">{item.title}</p>

              <h2 className="text-4xl font-black text-gray-900">
                {item.value}
              </h2>
            </div>
          ))}
        </section>

        {/* ACTION CARDS */}
        <section className="grid md:grid-cols-3 gap-8">
          {cards.map((item, index) => (
            <div
              key={index}
              className="group bg-white rounded-[35px] p-8 shadow-xl border border-orange-100 hover:-translate-y-3 transition duration-500"
            >
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center text-4xl shadow-xl mb-7 group-hover:scale-110 transition">
                {item.icon}
              </div>

              <h2 className="text-3xl font-black text-gray-900 mb-3">
                {item.title}
              </h2>

              <p className="text-gray-500 text-lg leading-relaxed mb-7">
                {item.desc}
              </p>

              <Link to={item.path}>
                <button className="w-full py-4 rounded-2xl bg-orange-50 text-orange-600 font-black border border-orange-200 hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-500 hover:text-white transition">
                  {item.btn} →
                </button>
              </Link>
            </div>
          ))}
        </section>

      </div>
    </div>
  );
}

export default MessHome;