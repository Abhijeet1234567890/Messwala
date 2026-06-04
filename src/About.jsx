import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="min-h-screen bg-[#fff8f3] overflow-hidden">

      {/* HERO */}
      <section className="relative px-4 py-20">
        <div className="absolute top-0 left-0 w-72 h-72 bg-orange-300 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute top-20 right-0 w-72 h-72 bg-pink-300 rounded-full blur-3xl opacity-30"></div>

        <div className="relative max-w-7xl mx-auto text-center">
          <span className="inline-block px-5 py-2 rounded-full bg-orange-100 text-orange-600 font-bold text-sm mb-6">
            ABOUT MESSFINDER
          </span>

          <h1 className="text-4xl md:text-7xl font-black text-gray-900 mb-6">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              MessFinder
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-gray-600 text-lg md:text-xl leading-relaxed">
            MessFinder connects students, bachelors and professionals with
            trusted mess and tiffin services near them.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-4 pb-24 grid lg:grid-cols-2 gap-10 items-center">

        {/* LEFT */}
        <div className="space-y-6">

          <div className="bg-white rounded-[35px] p-8 shadow-xl border border-orange-100 hover:-translate-y-2 transition">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center text-3xl mb-6">
              🚀
            </div>

            <h2 className="text-3xl font-black text-gray-900 mb-4">
              Our Mission
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed">
              Our mission is to make daily food search simple, affordable and
              reliable. Users can easily find good mess services without wasting
              time.
            </p>
          </div>

          <div className="bg-white rounded-[35px] p-8 shadow-xl border border-pink-100 hover:-translate-y-2 transition">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-pink-500 to-orange-500 flex items-center justify-center text-3xl mb-6">
              ⭐
            </div>

            <h2 className="text-3xl font-black text-gray-900 mb-6">
              Why Choose Us?
            </h2>

            <div className="space-y-4">
              {[
                "Verified mess and tiffin providers",
                "Simple and user-friendly platform",
                "Affordable meal plans",
                "Fast search and easy contact",
                "Best option for students and workers",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 bg-orange-50 rounded-2xl p-4"
                >
                  <span className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-500 to-pink-500"></span>
                  <p className="text-gray-700 font-semibold">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-400 rounded-[45px] blur-3xl opacity-25"></div>

          <div className="relative bg-white rounded-[45px] p-8 md:p-10 shadow-2xl border border-orange-100">

            <div className="text-center mb-10">
              <h2 className="text-4xl font-black text-gray-900 mb-3">
                Trusted Platform
              </h2>
              <p className="text-gray-500 text-lg">
                Growing with happy users and trusted food partners.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-5">
              {[
                { value: "10K+", label: "Happy Users", icon: "😊" },
                { value: "500+", label: "Mess Partners", icon: "🍱" },
                { value: "50+", label: "Cities", icon: "📍" },
                { value: "4.8★", label: "Rating", icon: "⭐" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-[#fff8f3] rounded-3xl p-6 text-center border border-orange-100 hover:scale-105 transition"
                >
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="text-3xl font-black bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                    {item.value}
                  </h3>
                  <p className="text-gray-500 font-semibold mt-2">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-3xl bg-gradient-to-r from-orange-500 to-pink-500 p-6 text-center text-white">
              <p className="text-lg italic font-medium">
                “Good food brings people together. MessFinder makes it easier.”
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <Link to="/messregister">
                <button className="px-7 py-3 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold shadow-lg hover:scale-105 transition">
                  Register Mess
                </button>
              </Link>

              <Link to="/contact">
                <button className="px-7 py-3 rounded-full bg-orange-50 text-orange-600 font-bold border border-orange-200 hover:scale-105 transition">
                  Contact Us
                </button>
              </Link>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

export default About;