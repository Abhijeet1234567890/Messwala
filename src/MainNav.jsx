import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";



function MainNav() {

    const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [select, setSelect] = useState("");
  const navigate = useNavigate();

  const handleSelect = (e) => {
    const value = e.target.value;
    setSelect(value);

    if (value === "messwala") {
      navigate("/messregister");
      setMobileMenuOpen(false);
    } else if (value === "teffeenwala") {
      navigate("/teffinregister");
      setMobileMenuOpen(false);
    }
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
      isActive
        ? "text-orange-500 bg-orange-50"
        : "text-gray-600 hover:text-orange-500 hover:bg-orange-50"
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `flex items-center justify-between w-full px-4 py-3 rounded-2xl font-semibold transition ${
      isActive
        ? "bg-orange-50 text-orange-500"
        : "bg-white text-gray-700 hover:text-orange-500"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] border-b border-orange-100">
      <div className="h-1 bg-gradient-to-r from-orange-400 via-orange-500 to-pink-500"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="h-20 flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-orange-400 blur-xl rounded-2xl opacity-40 group-hover:opacity-70 transition"></div>

              <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center shadow-xl text-3xl group-hover:scale-105 transition">
                🍱
              </div>
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                Mess<span className="text-orange-500">Finder</span>
              </h1>
              <p className="hidden sm:block text-sm text-gray-500 font-medium">
                Tasty Food, Happy Mood ❤
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-4">
            <NavLink to="/" className={linkClass}>
              <span>🏠</span> Home
            </NavLink>

            <NavLink to="/about" className={linkClass}>
              <span>ⓘ</span> About
            </NavLink>

            <NavLink to="/contact" className={linkClass}>
              <span>📞</span> Contact
            </NavLink>
          </div>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-4">
            <select
              value={select}
              onChange={handleSelect}
              className="px-5 py-3 rounded-full bg-white border border-orange-200 text-gray-800 font-semibold shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="">👤 Login / Register</option>
              <option value="messwala">Messwala</option>
              <option value="teffeenwala">Teffeenwala</option>
            </select>

            <Link to="/contact">
              <button className="px-6 py-3 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 text-white font-bold shadow-lg hover:shadow-pink-200 hover:scale-105 transition">
                Get Started 🚀
              </button>
            </Link>
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-400 to-pink-500 text-white text-2xl shadow-lg flex items-center justify-center"
          >
            {mobileMenuOpen ? "×" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ${
            mobileMenuOpen ? "max-h-[520px] pb-5" : "max-h-0"
          }`}
        >
          <div className="relative bg-white rounded-[28px] p-4 shadow-2xl border border-orange-100">

            <div className="absolute -top-8 -right-8 w-28 h-28 bg-orange-200 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute -bottom-8 -left-8 w-28 h-28 bg-pink-200 rounded-full blur-3xl opacity-50"></div>

            <div className="relative z-10 space-y-3">
              <NavLink
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={mobileLinkClass}
              >
                <span>🏠 Home</span>
                <span>›</span>
              </NavLink>

              <NavLink
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={mobileLinkClass}
              >
                <span>ⓘ About</span>
                <span>›</span>
              </NavLink>

              <NavLink
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className={mobileLinkClass}
              >
                <span>📞 Contact</span>
                <span>›</span>
              </NavLink>

              <div className="h-px bg-gray-200 my-3"></div>

              <select
                value={select}
                onChange={handleSelect}
                className="w-full px-4 py-3 rounded-2xl bg-orange-50 border border-orange-200 text-gray-800 font-bold focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="">👤 Login / Register</option>
                <option value="messwala">Messwala</option>
                <option value="teffeenwala">Teffeenwala</option>
              </select>

              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center w-full px-4 py-3 rounded-2xl bg-gradient-to-r from-orange-400 to-pink-500 text-white font-bold shadow-lg"
              >
                Get Started 🚀
              </Link>
            </div>
          </div>
        </div>

      </div>
    </nav>
  );
}

export default MainNav;