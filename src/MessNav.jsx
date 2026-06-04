import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";

function MessNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSelect = (e) => {
    const value = e.target.value;

    if (value === "Logout") {
      localStorage.removeItem("token");
      navigate("/", { replace: true });
      window.location.reload();
    } else if (value === "Help") {
      navigate("/help");
      setMobileMenuOpen(false);
    }
  };

  const navLinkClass = (path) =>
    `px-4 py-2 rounded-full font-bold transition-all duration-300 ${
      location.pathname === path
        ? "bg-orange-100 text-orange-600"
        : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
    }`;

  const mobileLinkClass = (path) =>
    `flex items-center justify-between w-full px-4 py-3 rounded-2xl font-bold transition ${
      location.pathname === path
        ? "bg-orange-100 text-orange-600"
        : "bg-white text-gray-700 hover:text-orange-600"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-orange-100 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
      <div className="h-1 bg-gradient-to-r from-orange-500 via-pink-500 to-yellow-400"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="h-20 flex items-center justify-between">

          {/* LOGO */}
          <Link
            to="/messhome"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 group"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-orange-400 blur-xl opacity-40 group-hover:opacity-70 transition"></div>

              <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center text-2xl shadow-xl group-hover:scale-105 transition">
                🍱
              </div>
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
                Mess<span className="text-orange-500">Finder</span>
              </h1>
              <p className="hidden sm:block text-xs text-gray-500 -mt-1">
                Owner Dashboard
              </p>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center gap-3 bg-orange-50/70 px-4 py-3 rounded-full border border-orange-100">
            <Link to="/messhome" className={navLinkClass("/messhome")}>
              🏠 Home
            </Link>

             <Link to="/custommessagemess" className={navLinkClass("/custommessagemess")}>
            Custom Message
            </Link>

            <Link to="/startedmess" className={navLinkClass("/startedmess")}>
              🍽️ Started Mess
            </Link>

            <Link
              to="/addinstace"
              className="px-5 py-2 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-black shadow-lg hover:scale-105 transition"
            >
              + Add Food
            </Link>

             <Link
              to="/messmenu"
              className="px-5 py-2 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-black shadow-lg hover:scale-105 transition"
            >
              + Add Mess Menu
            </Link>
            

            <Link
              to="/viewteffinwala"
              className={navLinkClass("/viewteffinwala")}
            >
              📦 Tiffin List
            </Link>
          </div>

          {/* RIGHT SECTION */}
          <div className="hidden md:flex items-center gap-4">
            <select
              onChange={handleSelect}
              defaultValue=""
              className="px-5 py-3 rounded-full bg-white border border-orange-200 text-gray-800 font-bold shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="" disabled>
                Menu
              </option>
              <option value="Help">Help</option>
              <option value="Logout">Logout</option>
            </select>
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-12 h-12 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 text-white text-2xl shadow-lg flex items-center justify-center"
          >
            {mobileMenuOpen ? "×" : "☰"}
          </button>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ${
            mobileMenuOpen ? "max-h-[550px] pb-5" : "max-h-0"
          }`}
        >
          <div className="relative rounded-[28px] p-4 bg-gradient-to-br from-orange-50 via-white to-pink-50 border border-orange-100 shadow-xl">

            <div className="absolute -top-8 -right-8 w-28 h-28 bg-orange-200 rounded-full blur-3xl opacity-60"></div>
            <div className="absolute -bottom-8 -left-8 w-28 h-28 bg-pink-200 rounded-full blur-3xl opacity-60"></div>

            <div className="relative z-10 space-y-3">
              <Link
                to="/messhome"
                onClick={() => setMobileMenuOpen(false)}
                className={mobileLinkClass("/messhome")}
              >
                <span>🏠 Home</span>
                <span>›</span>
              </Link>

              <Link
                to="/startedmess"
                onClick={() => setMobileMenuOpen(false)}
                className={mobileLinkClass("/startedmess")}
              >
                <span>🍽️ Started Mess</span>
                <span>›</span>
              </Link>

              <Link
                to="/addinstace"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between w-full px-4 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 text-white font-black shadow-lg"
              >
                <span>+ Add Food</span>
                <span>›</span>
              </Link>

              <Link
                to="/viewteffinwala"
                onClick={() => setMobileMenuOpen(false)}
                className={mobileLinkClass("/viewteffinwala")}
              >
                <span>📦 Tiffin List</span>
                <span>›</span>
              </Link>

              <div className="h-px bg-orange-100 my-3"></div>

              <select
                onChange={(e) => {
                  handleSelect(e);
                  setMobileMenuOpen(false);
                }}
                defaultValue=""
                className="w-full px-4 py-3 rounded-2xl bg-white border border-orange-200 text-gray-800 font-bold focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="" disabled>
                  Menu
                </option>
                <option value="Help">Help</option>
                <option value="Logout">Logout</option>
              </select>
            </div>
          </div>
        </div>

      </div>
    </nav>
  );
}

export default MessNav;