import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";

function MessView() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const JoinMess = (item) => {
    localStorage.setItem("messview", JSON.stringify(item));
    localStorage.setItem("messId", item._id || item.id);
    navigate("/joinmess");
  };

  const GetData = async () => {
    try {
      setIsLoading(true);

      let result = await fetch(`http://localhost:2000/viewmess/${id}`);
      result = await result.json();

      setData(result.result || []);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    GetData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fff8f3] flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center text-5xl animate-pulse shadow-2xl">
            🍱
          </div>

          <h2 className="text-3xl font-black text-gray-900 mt-6">
            Loading Mess Details...
          </h2>

          <p className="text-gray-500 mt-2">
            Please wait, we are fetching fresh details.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fff8f3] overflow-hidden relative px-4 py-10">

      {/* Background */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-orange-300 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute top-40 right-0 w-80 h-80 bg-pink-300 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-yellow-200 rounded-full blur-3xl opacity-30"></div>

      <div className="relative max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-5 py-2 rounded-full bg-orange-100 text-orange-600 font-black mb-5">
            🏢 MESS DETAILS
          </span>

          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-4">
            Explore{" "}
            <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              Mess Information
            </span>
          </h1>

          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Check mess images, food type, location, facilities and join your
            favourite mess easily.
          </p>
        </div>

        {data.length > 0 ? (
          data.map((i, idx) => (
            <div
              key={idx}
              className="grid lg:grid-cols-2 gap-10 items-start"
            >

              {/* Left Image Card */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-400 rounded-[45px] blur-3xl opacity-25"></div>

                <div className="relative bg-white rounded-[45px] overflow-hidden shadow-2xl border border-orange-100">

                  <div className="relative h-[420px] overflow-hidden">
                    <Carousel activeIndex={index} onSelect={handleSelect}>
                      {i.files && i.files.length > 0 ? (
                        i.files.map((file, fileIndex) => (
                          <Carousel.Item key={fileIndex} className="h-[420px]">
                            <img
                              src={`http://localhost:2000/Upload/${file}`}
                              alt={i.name}
                              className="w-full h-full object-cover"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                          </Carousel.Item>
                        ))
                      ) : (
                        <Carousel.Item className="h-[420px]">
                          <div className="w-full h-full bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center text-white text-7xl">
                            🍱
                          </div>
                        </Carousel.Item>
                      )}
                    </Carousel>

                    <div className="absolute top-5 left-5 px-5 py-2 rounded-full bg-white/90 backdrop-blur-md text-orange-600 font-black shadow-lg">
                      Premium Mess
                    </div>

                    <div
                      className={`absolute top-5 right-5 px-5 py-2 rounded-full text-white font-black shadow-lg ${
                        i.type === "veg"
                          ? "bg-green-500"
                          : i.type === "both"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    >
                      {i.type === "veg"
                        ? "🥬 Veg"
                        : i.type === "both"
                        ? "🍱 Both"
                        : "🍗 Non-Veg"}
                    </div>
                  </div>

                  <div className="p-6">
                    <h2 className="text-4xl font-black text-gray-900 mb-2">
                      {i.name}
                    </h2>

                    <p className="text-gray-500 text-lg font-semibold">
                      📍 {i.city}
                      {i.village ? `, ${i.village}` : ""}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Details */}
              <div className="space-y-6">

                {/* Main Info */}
                <div className="bg-white rounded-[45px] p-8 shadow-2xl border border-orange-100">

                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 rounded-3xl bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center text-3xl shadow-xl">
                      ℹ️
                    </div>

                    <div>
                      <h2 className="text-3xl font-black text-gray-900">
                        Mess Overview
                      </h2>

                      <p className="text-gray-500">
                        Basic details about this mess service
                      </p>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">

                    <div className="bg-[#fff8f3] rounded-3xl p-5 border border-orange-100">
                      <p className="text-gray-500 font-bold mb-2">Owner Gender</p>
                      <h3 className="text-2xl font-black text-gray-900">
                        {i.gender || "N/A"}
                      </h3>
                    </div>

                    <div className="bg-[#fff8f3] rounded-3xl p-5 border border-orange-100">
                      <p className="text-gray-500 font-bold mb-2">Food Type</p>
                      <h3
                        className={`text-2xl font-black ${
                          i.type === "veg"
                            ? "text-green-600"
                            : i.type === "both"
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        {i.type === "veg"
                          ? "🥬 Vegetarian"
                          : i.type === "both"
                          ? "🍱 Both"
                          : "🍗 Non-Veg"}
                      </h3>
                    </div>

                    <div className="bg-[#fff8f3] rounded-3xl p-5 border border-orange-100">
                      <p className="text-gray-500 font-bold mb-2">Contact</p>
                      <h3 className="text-xl font-black text-gray-900">
                        {i.contact || "N/A"}
                      </h3>
                    </div>

                    <div className="bg-[#fff8f3] rounded-3xl p-5 border border-orange-100">
                      <p className="text-gray-500 font-bold mb-2">City</p>
                      <h3 className="text-xl font-black text-gray-900">
                        {i.city || "N/A"}
                      </h3>
                    </div>

                  </div>

                  {i.description && (
                    <div className="mt-6 bg-orange-50 rounded-3xl p-6 border border-orange-100">
                      <h3 className="text-2xl font-black text-gray-900 mb-3">
                        About This Mess
                      </h3>

                      <p className="text-gray-600 leading-relaxed text-lg">
                        {i.description}
                      </p>
                    </div>
                  )}

                  <button
                    onClick={() => JoinMess(i)}
                    className="w-full mt-8 py-4 px-6 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 text-white font-black text-lg shadow-xl hover:scale-105 transition duration-300"
                  >
                    ✨ Join This Mess
                  </button>
                </div>

                {/* Extra Information Cards */}
                <div className="grid sm:grid-cols-2 gap-5">
                  {[
                    {
                      icon: "🥗",
                      title: "Healthy Meals",
                      text: "Fresh and hygienic homemade food.",
                    },
                    {
                      icon: "⏰",
                      title: "Daily Service",
                      text: "Breakfast, lunch and dinner support.",
                    },
                    {
                      icon: "💰",
                      title: "Affordable",
                      text: "Best for students and workers.",
                    },
                    {
                      icon: "✅",
                      title: "Easy Joining",
                      text: "Join mess with simple process.",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-3xl p-6 shadow-xl border border-orange-100 hover:-translate-y-2 transition"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center text-2xl mb-4 shadow-lg">
                        {item.icon}
                      </div>

                      <h3 className="text-xl font-black text-gray-900">
                        {item.title}
                      </h3>

                      <p className="text-gray-500 mt-2">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-[45px] p-16 text-center shadow-2xl border border-orange-100">
            <div className="text-7xl mb-6">😢</div>

            <h2 className="text-4xl font-black text-gray-900">
              Mess Details Not Found
            </h2>

            <p className="text-gray-500 text-lg mt-4">
              Please go back and try another mess service.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

export default MessView;