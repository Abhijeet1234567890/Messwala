import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function TeffinNav() {
  const [select, setselect] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [item, setitem] = useState(null);
  const [messId, setMessId] = useState(null);
  const navigate = useNavigate();

  const getMessId = () => {
    try {
      const join = JSON.parse(localStorage.getItem("joinmess"));
      if (join?.result?.messId) return join.result.messId;

      const normal = JSON.parse(localStorage.getItem("messId"));
      return normal?.messId || normal || null;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("teffintoken");

    if (token) {
      try {
        const data = jwtDecode(token);
        setitem(data);
      } catch (error) {
        console.error("Token decode error:", error);
        localStorage.removeItem("teffintoken");
      }
    }

    setMessId(getMessId());
  }, []);

  const handleSelect = (e) => {
    const value = e.target.value.toLowerCase();
    setselect(value);

    if (value === "logout") {
      localStorage.removeItem("teffintoken");
      localStorage.removeItem("messId");
      localStorage.removeItem("joinmess");
      setitem(null);
      setMessId(null);
      navigate("/");
      window.location.reload();
    }

    if (value === "help") {
      navigate("/help");
    }
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const profileImg = item?.file
    ? `http://localhost:2000/Upload/${item.file}`
    : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

  return (
    <nav className="sticky top-0 z-50 bg-white/85 backdrop-blur-2xl border-b border-orange-100 shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link to="/teffinhome" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center text-2xl shadow-xl">
              🍱
            </div>

            <div>
              <h1 className="text-xl md:text-2xl font-black bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                Tiffin Dashboard
              </h1>
              <p className="text-xs text-gray-500 font-bold hidden sm:block">
                Fresh meals, daily menu & smart mess service
              </p>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/about"
              className="px-5 py-3 rounded-2xl text-gray-700 font-bold hover:bg-orange-50 hover:text-orange-600 transition"
            >
              About
            </Link>

            <Link
              to="/contact"
              className="px-5 py-3 rounded-2xl text-gray-700 font-bold hover:bg-orange-50 hover:text-orange-600 transition"
            >
              Contact
            </Link>

            {messId ? (
              <Link
                to="/owner"
                className="px-5 py-3 rounded-2xl bg-orange-50 text-orange-600 font-black hover:bg-orange-100 transition"
              >
                👨‍💼 Owner Panel
              </Link>
            ) : (
              <Link
                to="/usermess"
                className="px-5 py-3 rounded-2xl bg-orange-50 text-orange-600 font-black hover:bg-orange-100 transition"
              >
                📋 Mess List
              </Link>
            )}

            <div className="px-5 py-3 rounded-2xl bg-green-50 text-green-700 font-black">
              ✅ Active
            </div>
          </div>

          <div className="flex items-center gap-4">
            {item && (
              <Link
                to="/tiffinprofile"
                className="hidden md:flex items-center gap-3 bg-white rounded-2xl px-3 py-2 border border-orange-100 shadow-lg hover:scale-105 transition"
              >
                <img
                  src={profileImg}
                  alt="Profile"
                  className="w-11 h-11 rounded-2xl object-cover border-2 border-orange-400"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
                  }}
                />

                <div className="text-left">
                  <p className="text-sm font-black text-gray-900">
                    {item.name || "User"}
                  </p>
                  <p className="text-xs text-gray-500 font-bold">
                    View Profile
                  </p>
                </div>
              </Link>
            )}

            <select
              onChange={handleSelect}
              value={select}
              className="hidden md:block px-4 py-3 bg-[#fff8f3] border border-orange-100 rounded-2xl text-gray-800 font-bold cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="">Account</option>
              <option value="help">Help</option>
              <option value="logout">Logout</option>
            </select>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-12 h-12 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 text-white text-2xl shadow-xl"
            >
              {mobileMenuOpen ? "×" : "☰"}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden pb-5 pt-3 border-t border-orange-100">
            <div className="bg-white rounded-[30px] p-4 shadow-xl border border-orange-100 space-y-3">
              {item && (
                <Link
                  to="/tiffinprofile"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-4 bg-[#fff8f3] rounded-2xl p-4"
                >
                  <img
                    src={profileImg}
                    alt="Profile"
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-orange-400"
                  />

                  <div>
                    <p className="font-black text-gray-900">
                      {item.name || "User"}
                    </p>
                    <p className="text-sm text-gray-500 font-bold">
                      Premium Account
                    </p>
                  </div>
                </Link>
              )}

              <Link
                to="/about"
                onClick={closeMobileMenu}
                className="block px-5 py-4 rounded-2xl font-bold text-gray-700 hover:bg-orange-50"
              >
                ℹ️ About
              </Link>

              <Link
                to="/contact"
                onClick={closeMobileMenu}
                className="block px-5 py-4 rounded-2xl font-bold text-gray-700 hover:bg-orange-50"
              >
                📞 Contact
              </Link>

              {messId ? (
                <Link
                  to="/owner"
                  onClick={closeMobileMenu}
                  className="block px-5 py-4 rounded-2xl bg-orange-50 text-orange-600 font-black"
                >
                  👨‍💼 Owner Panel
                </Link>
              ) : (
                <Link
                  to="/usermess"
                  onClick={closeMobileMenu}
                  className="block px-5 py-4 rounded-2xl bg-orange-50 text-orange-600 font-black"
                >
                  📋 Mess List
                </Link>
              )}

              <select
                onChange={handleSelect}
                value={select}
                className="w-full px-5 py-4 bg-[#fff8f3] border border-orange-100 rounded-2xl text-gray-800 font-bold"
              >
                <option value="">Account</option>
                <option value="help">Help</option>
                <option value="logout">Logout</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default TeffinNav;