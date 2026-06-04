
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function TeffinwalaList() {
  const [teffin, setteffin] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem("token");
  const messId = token ? JSON.parse(token) : null;


  const navigate = useNavigate();

const openContactPage = (id) => {
  navigate(`/teffincontact/${id}`);
};
  useEffect(() => {
    Getid();
  }, []);

  async function Getid() {
    try {
      setIsLoading(true);

      let res = await fetch("http://localhost:2000/viewteffinwala", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messId }),
      });

      let data = await res.json();
      setteffin(data.result || []);
    } catch (err) {
      console.log("Error:", err);
    } finally {
      setIsLoading(false);
    }
  }

  const totalProviders = teffin.length;
  const vegCount = teffin.filter((i) => i.type === "Veg").length;
  const nonVegCount = teffin.filter((i) => i.type === "NonVeg").length;
  const bothCount = teffin.filter((i) => i.type !== "Veg" && i.type !== "NonVeg").length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fff8f3] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center text-5xl animate-pulse shadow-2xl">
            🥘
          </div>

          <h2 className="text-3xl font-black text-gray-900 mt-6">
            Loading Tiffin Providers...
          </h2>

          <p className="text-gray-500 mt-2">
            Please wait, provider data is loading.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fff8f3] overflow-hidden relative px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-72 h-72 sm:w-96 sm:h-96 bg-orange-300 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute top-60 right-0 w-72 h-72 sm:w-96 sm:h-96 bg-pink-300 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 left-1/3 w-72 h-72 sm:w-96 sm:h-96 bg-yellow-200 rounded-full blur-3xl opacity-30"></div>

      <div className="relative max-w-7xl mx-auto">

        {/* Hero Header */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12">

          <div>
            <span className="inline-block px-5 py-2 rounded-full bg-orange-100 text-orange-600 font-black mb-5 text-sm">
              🥘 TIFFIN PROVIDERS
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-5">
              Browse Trusted{" "}
              <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                Tiffin Providers
              </span>
            </h1>

            <p className="text-gray-600 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl">
              तुमच्या mess सोबत connected tiffin providers, त्यांचा food type,
              location आणि service details premium dashboard मध्ये पाहा.
            </p>
          </div>

          {/* Overview Card */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-400 rounded-[40px] blur-3xl opacity-25"></div>

            <div className="relative bg-white rounded-[35px] sm:rounded-[45px] p-6 sm:p-8 shadow-2xl border border-orange-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-3xl bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center text-3xl shadow-xl">
                  📊
                </div>

                <div>
                  <p className="text-gray-500 font-bold">Provider Overview</p>
                  <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
                    Service Summary
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#fff8f3] rounded-3xl p-5 border border-orange-100">
                  <p className="text-gray-500 font-bold text-sm">Total</p>
                  <h3 className="text-3xl font-black text-orange-500">
                    {totalProviders}
                  </h3>
                </div>

                <div className="bg-[#fff8f3] rounded-3xl p-5 border border-orange-100">
                  <p className="text-gray-500 font-bold text-sm">Status</p>
                  <h3 className="text-3xl font-black text-green-600">
                    Active
                  </h3>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 sm:gap-6 mb-12">
          {[
            {
              icon: "👥",
              title: "Total Providers",
              value: totalProviders,
              text: "Registered tiffin providers",
            },
            {
              icon: "🥬",
              title: "Veg Providers",
              value: vegCount,
              text: "Vegetarian food services",
            },
            {
              icon: "🍗",
              title: "Non-Veg Providers",
              value: nonVegCount,
              text: "Non-veg food services",
            },
            {
              icon: "🍱",
              title: "Both Type",
              value: bothCount,
              text: "Veg and non-veg both",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="group bg-white rounded-[30px] p-6 shadow-xl border border-orange-100 hover:-translate-y-2 hover:shadow-2xl transition duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center text-2xl mb-5 shadow-lg group-hover:scale-110 transition">
                {item.icon}
              </div>

              <p className="text-gray-500 font-bold">{item.title}</p>

              <h3 className="text-3xl font-black text-gray-900 mt-2">
                {item.value}
              </h3>

              <p className="text-gray-500 mt-2 text-sm">{item.text}</p>
            </div>
          ))}
        </div>

        {/* Info Banner */}
        <div className="bg-white rounded-[35px] p-6 sm:p-8 shadow-xl border border-orange-100 mb-12">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center text-2xl">
                ✅
              </div>

              <div>
                <h3 className="text-xl font-black text-gray-900">
                  Verified Listing
                </h3>
                <p className="text-gray-500 mt-1">
                  Provider details are listed according to your mess connection.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-pink-100 flex items-center justify-center text-2xl">
                📍
              </div>

              <div>
                <h3 className="text-xl font-black text-gray-900">
                  Location Based
                </h3>
                <p className="text-gray-500 mt-1">
                  City, village and pincode details help easy connection.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-yellow-100 flex items-center justify-center text-2xl">
                ⚡
              </div>

              <div>
                <h3 className="text-xl font-black text-gray-900">
                  Quick Contact
                </h3>
                <p className="text-gray-500 mt-1">
                  Use contact button for future provider communication flow.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section Title */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900">
            Provider{" "}
            <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              List
            </span>
          </h2>

          <p className="text-gray-500 mt-3 text-base sm:text-lg">
            खाली सर्व tiffin providers ची details responsive cards मध्ये आहेत.
          </p>
        </div>

        {/* Providers Grid */}
        {teffin && teffin.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {teffin.map((i, index) => (
              <div
                key={index}
                className="group bg-white rounded-[35px] p-6 shadow-xl border border-orange-100 hover:-translate-y-3 hover:shadow-2xl transition duration-500"
              >
                {/* Top */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-3xl bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition">
                      🥘
                    </div>

                    <div>
                      <h4 className="text-2xl font-black text-gray-900">
                        {i.name}
                      </h4>

                      <p className="text-gray-500 font-semibold">
                        Tiffin Provider
                      </p>
                    </div>
                  </div>

                  <span
                    className={`px-4 py-2 rounded-full text-sm font-black ${
                      i.type === "Veg"
                        ? "bg-green-100 text-green-600"
                        : i.type === "NonVeg"
                        ? "bg-red-100 text-red-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {i.type === "Veg"
                      ? "🥬 Veg"
                      : i.type === "NonVeg"
                      ? "🍗 Non-Veg"
                      : "🍱 Both"}
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-4">
                  <div className="bg-[#fff8f3] rounded-2xl p-4 border border-orange-100">
                    <p className="text-gray-500 text-sm font-bold mb-1">
                      Duration
                    </p>

                    <p className="font-black text-gray-900">
                      {i.mess || "N/A"}
                    </p>
                  </div>

                  <div className="bg-[#fff8f3] rounded-2xl p-4 border border-orange-100">
                    <p className="text-gray-500 text-sm font-bold mb-1">
                      Location
                    </p>

                    <p className="font-black text-gray-900">
                      📍 {i.city}
                      {i.village ? `, ${i.village}` : ""}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#fff8f3] rounded-2xl p-4 border border-orange-100">
                      <p className="text-gray-500 text-sm font-bold mb-1">
                        Pincode
                      </p>

                      <p className="font-black text-gray-900">
                        {i.pincode || "N/A"}
                      </p>
                    </div>

                    <div className="bg-[#fff8f3] rounded-2xl p-4 border border-orange-100">
                      <p className="text-gray-500 text-sm font-bold mb-1">
                        Status
                      </p>

                      <p className="font-black text-green-600">
                        Active
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom */}
                <div className="mt-6 flex flex-wrap gap-3">
                  <span className="px-4 py-2 rounded-full bg-orange-100 text-orange-600 font-bold text-sm">
                    🔥 Fresh
                  </span>

                  <span className="px-4 py-2 rounded-full bg-green-100 text-green-600 font-bold text-sm">
                    🥗 Hygienic
                  </span>

                  <span className="px-4 py-2 rounded-full bg-pink-100 text-pink-600 font-bold text-sm">
                    🚚 Service
                  </span>
                </div>

              <button
  onClick={() => openContactPage(i._id)}
  className="w-full mt-7 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 text-white font-black shadow-xl hover:scale-105 transition duration-300"
>
  Contact Now →
</button>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[35px] sm:rounded-[45px] p-10 sm:p-14 text-center shadow-2xl border border-orange-100">
            <div className="text-7xl mb-6">🔍</div>

            <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
              No Tiffin Providers Found
            </h2>

            <p className="text-gray-500 text-lg mt-4">
              अजून कोणतेही tiffin providers available नाहीत.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

export default TeffinwalaList;