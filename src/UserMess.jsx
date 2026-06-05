import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Fetchdata } from "../Slice/ProductSlice";
import { Link, useNavigate } from "react-router-dom";

function UserMess() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(Fetchdata());
  }, [dispatch]);

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const product = useSelector((state) => state.product.item);

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const result = await fetch(`${BASE_URL}/search`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ qun: searchQuery }),
      });

     
      const data = await result.json();
      navigate("/similar", { state: data.item });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#fff8f3] px-4 py-10">
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-orange-300 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute top-40 -right-24 w-96 h-96 bg-pink-300 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-yellow-200 rounded-full blur-3xl opacity-30"></div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-5 py-2 rounded-full bg-orange-100 text-orange-600 font-black mb-5">
            🍱 MESS DIRECTORY
          </span>

          <h1 className="text-4xl md:text-6xl font-black text-gray-900">
            Find Best{" "}
            <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              Mess Near You
            </span>
          </h1>

          <p className="text-gray-600 text-lg mt-5">
            Search by city or village and join your favourite mess easily.
          </p>
        </div>

        <form onSubmit={handleSearch} className="max-w-4xl mx-auto mb-14">
          <div className="bg-white/90 backdrop-blur-xl rounded-[30px] p-4 shadow-2xl border border-orange-100 flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search by city or village..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-5 py-4 rounded-2xl bg-[#fff8f3] border border-orange-100 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            <button
              type="submit"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 text-white font-black shadow-xl hover:scale-105 transition"
            >
              🔍 Search
            </button>
          </div>
        </form>

        {product && product.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {product.map((i, index) => {
              const data = typeof i === "string" ? JSON.parse(i) : i;
              const id = data._id || data.id || index;

              return (
                <div
                  key={id}
                  className="group bg-white rounded-[35px] p-6 shadow-[0_25px_70px_rgba(0,0,0,0.12)] border border-orange-100 hover:-translate-y-3 transition duration-500"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-20 h-20 rounded-3xl bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center text-4xl shadow-xl">
                      🍛
                    </div>

                    <div>
                      <h2 className="text-2xl font-black text-gray-900">
                        {data.name}
                      </h2>
                      <p className="text-gray-500 text-sm">
                        📍 {data.city} {data.village ? `, ${data.village}` : ""}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-orange-50 rounded-2xl p-4">
                      <p className="text-xs font-black text-orange-500 uppercase">
                        Email
                      </p>
                      <p className="text-gray-800 font-bold break-all">
                        {data.email}
                      </p>
                    </div>

                    <div className="bg-green-50 rounded-2xl p-4">
                      <p className="text-xs font-black text-green-600 uppercase">
                        Contact
                      </p>
                      <p className="text-gray-800 font-bold">
                        📞 {data.contact || "N/A"}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <span
                        className={`px-5 py-3 rounded-2xl text-sm font-black ${
                          data.type === "veg"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {data.type === "veg" ? "🥬 Veg" : "🍗 Non-Veg"}
                      </span>

                      <span className="px-5 py-3 rounded-2xl bg-yellow-100 text-yellow-700 text-sm font-black">
                        ⭐ Premium
                      </span>
                    </div>
                  </div>

                  <Link to={`/messview/${id}`}>
                    <button className="w-full mt-7 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 text-white font-black shadow-xl hover:scale-[1.03] transition">
                      View Mess Details →
                    </button>
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="max-w-3xl mx-auto bg-white border border-orange-100 p-14 rounded-[40px] text-center shadow-2xl">
            <div className="text-7xl mb-5">🔍</div>
            <h2 className="text-4xl font-black text-gray-900">
              No Mess Found
            </h2>
            <p className="text-gray-500 mt-4 text-xl">
              Search city or village to find mess services.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserMess;