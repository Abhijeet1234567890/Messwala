import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Owner() {
  const [messItems, setMessItems] = useState([]);
  const [instceFood, setInstceFood] = useState([]);
  const [owner, setOwner] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEndDialog, setShowEndDialog] = useState(false);
  const [isEnding, setIsEnding] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    type: "",
    message: "",
  });

 

  const showToast = (type, message) => {
    setToast({ show: true, type, message });

    setTimeout(() => {
      setToast({ show: false, type: "", message: "" });
    }, 3000);
  };

  const getMessId = () => {
    try {
      const joinData = JSON.parse(localStorage.getItem("joinmess"));

      if (joinData?.result?.messId) {
        return joinData.result.messId;
      }

      const messData = JSON.parse(localStorage.getItem("messId"));
      return messData?.messId || messData || null;
    } catch {
      return null;
    }
  };

  const getUserEmail = () => {
    try {
      const token = localStorage.getItem("teffintoken");

      if (!token) return null;

      const decoded = jwtDecode(token);
      return decoded?.email || null;
    } catch {
      return null;
    }
  };

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setIsLoading(true);

      const messId = getMessId();

      if (!messId) {
        setError("No messId found");
        setIsLoading(false);
        return;
      }

      const ownerRes = await fetch(`${BASE_URL}/findmess`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messId: String(messId) }),
      });

      if (!ownerRes.ok) {
        throw new Error("Owner fetch failed");
      }

      const ownerData = await ownerRes.json();

      if (ownerData.data) {
        setOwner(ownerData.data);
      }

      const itemsRes = await fetch(`${BASE_URL}/addinstnceitem`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: messId }),
      });

      const itemsData = await itemsRes.json();

      if (itemsData.data) {
        const cleanItems = itemsData.data.filter(
          (item) => item && item.name && item.file
        );

        setMessItems(cleanItems);
      }

      const foodRes = await fetch(`${BASE_URL}/addinstance`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: messId }),
      });

      const foodData = await foodRes.json();

      if (foodData.data) {
        const cleanFood = foodData.data.filter(
          (item) => item && item.name && item.file
        );

        setInstceFood(cleanFood);
      }
    } catch (err) {
      console.log(err);
      setError(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const confirmEndMess = async () => {
    try {
      const email = getUserEmail();

      if (!email) {
        showToast("error", "User email not found. Please login again.");
        return;
      }

      setIsEnding(true);

      let res = await fetch(`${BASE_URL}/endmess`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const result = await res.json();

      if (!res.ok) {
        showToast("error", result.message || "End mess failed");
        return;
      }

      showToast("success", result.message || "Mess ended successfully");
      setShowEndDialog(false);

      setTimeout(() => {
        window.location.reload();
      }, 1200);
    } catch (err) {
      console.log(err);
      showToast("error", "Server error. Please try again.");
    } finally {
      setIsEnding(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fff8f3] flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center text-5xl animate-pulse shadow-2xl">
            🍱
          </div>

          <h2 className="text-3xl font-black text-gray-900 mt-6">
            Loading Mess Data...
          </h2>

          <p className="text-gray-500 mt-2">
            Please wait, we are preparing fresh details.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#fff8f3] flex items-center justify-center px-4">
        <div className="bg-white rounded-[35px] p-10 text-center shadow-2xl border border-red-100 max-w-md">
          <div className="text-7xl mb-5">❌</div>

          <h2 className="text-3xl font-black text-red-500">
            Something Went Wrong
          </h2>

          <p className="text-gray-500 mt-3">{error}</p>

          <Link to="/">
            <button className="mt-7 px-8 py-3 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-black shadow-lg">
              Go Home
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const foodList = messItems.length > 0 ? messItems : instceFood;

  return (
    <div className="min-h-screen bg-[#fff8f3] overflow-hidden relative px-4 py-10">
      {toast.show && (
        <div className="fixed top-6 right-6 z-[9999]">
          <div
            className={`px-6 py-4 rounded-2xl shadow-2xl text-white font-black border border-white/30 ${
              toast.type === "success"
                ? "bg-gradient-to-r from-green-500 to-emerald-600"
                : "bg-gradient-to-r from-red-500 to-pink-600"
            }`}
          >
            {toast.type === "success" ? "✅" : "❌"} {toast.message}
          </div>
        </div>
      )}

      {showEndDialog && (
        <div className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="bg-white rounded-[35px] shadow-2xl max-w-md w-full overflow-hidden border border-orange-100">
            <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-8 text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-white flex items-center justify-center text-5xl shadow-xl">
                ⚠️
              </div>

              <h2 className="text-3xl font-black text-white mt-5">
                End Mess Service?
              </h2>

              <p className="text-white/90 mt-2 font-medium">
                Are you sure you want to end your current mess subscription?
              </p>
            </div>

            <div className="p-7">
              <div className="bg-orange-50 border border-orange-100 rounded-3xl p-5 mb-6">
                <p className="text-gray-700 font-semibold leading-relaxed">
                  हे confirm केल्यावर तुमचा mess subscription end होईल.
                  नंतर परत join करण्यासाठी पुन्हा process करावी लागेल.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setShowEndDialog(false)}
                  disabled={isEnding}
                  className="py-4 rounded-2xl bg-gray-100 text-gray-700 font-black hover:bg-gray-200 transition disabled:opacity-60"
                >
                  Cancel
                </button>

                <button
                  onClick={confirmEndMess}
                  disabled={isEnding}
                  className="py-4 rounded-2xl bg-gradient-to-r from-red-500 to-pink-600 text-white font-black shadow-xl hover:scale-105 transition disabled:opacity-60 disabled:hover:scale-100"
                >
                  {isEnding ? "Ending..." : "Confirm End"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="absolute top-0 left-0 w-80 h-80 bg-orange-300 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute top-40 right-0 w-80 h-80 bg-pink-300 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-yellow-200 rounded-full blur-3xl opacity-30"></div>

      <div className="relative max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col sm:flex-row justify-end gap-4">
          <button
            onClick={() => setShowEndDialog(true)}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-red-500 to-pink-600 text-white font-black shadow-xl hover:scale-105 transition"
          >
            End Mess Details
          </button>

          <Link to="/messdetail">
            <button className="px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-black shadow-xl hover:scale-105 transition">
              View Mess Details →
            </button>
          </Link>
        </div>

        {owner && (
          <section className="grid lg:grid-cols-2 gap-10 items-center mb-14">
            <div>
              <span className="inline-block px-5 py-2 rounded-full bg-orange-100 text-orange-600 font-black mb-6">
                🍱 MESS OWNER PROFILE
              </span>

              <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight mb-5">
                Welcome to{" "}
                <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                  {owner.name}
                </span>
              </h1>

              <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-8">
                Explore available food items, check mess details and enjoy fresh
                homemade meals from this mess service.
              </p>

              <div className="grid sm:grid-cols-2 gap-5">
                <div className="bg-white rounded-3xl p-5 shadow-xl border border-orange-100">
                  <p className="text-gray-500 font-bold">Owner Gender</p>
                  <h3 className="text-2xl font-black text-gray-900 mt-2">
                    {owner.gender || "N/A"}
                  </h3>
                </div>

                <div className="bg-white rounded-3xl p-5 shadow-xl border border-orange-100">
                  <p className="text-gray-500 font-bold">Food Type</p>
                  <h3
                    className={`text-2xl font-black mt-2 ${
                      owner.type === "veg"
                        ? "text-green-600"
                        : owner.type === "both"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {owner.type === "veg"
                      ? "🥬 Veg"
                      : owner.type === "both"
                      ? "🍱 Both"
                      : "🍗 Non-Veg"}
                  </h3>
                </div>

                <div className="bg-white rounded-3xl p-5 shadow-xl border border-orange-100">
                  <p className="text-gray-500 font-bold">City</p>
                  <h3 className="text-2xl font-black text-gray-900 mt-2">
                    {owner.city || "N/A"}
                  </h3>
                </div>

                <div className="bg-white rounded-3xl p-5 shadow-xl border border-orange-100">
                  <p className="text-gray-500 font-bold">Village</p>
                  <h3 className="text-2xl font-black text-gray-900 mt-2">
                    {owner.village || "N/A"}
                  </h3>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-400 rounded-[45px] blur-3xl opacity-25"></div>

              <div className="relative bg-white rounded-[45px] overflow-hidden shadow-2xl border border-orange-100">
                {owner.files?.length > 0 ? (
                  <Carousel>
                    {owner.files.map((file, i) => (
                      <Carousel.Item key={i} className="h-[430px]">
                        <img
                          src={`${BASE_URL}/Upload/${file}`}
                          className="w-full h-full object-cover"
                          alt="mess"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      </Carousel.Item>
                    ))}
                  </Carousel>
                ) : (
                  <div className="h-[430px] bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center text-8xl">
                    🍱
                  </div>
                )}

                <div className="absolute top-5 left-5 px-5 py-2 rounded-full bg-white/90 backdrop-blur-md text-orange-600 font-black shadow-lg">
                  Trusted Mess
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {[
            {
              icon: "🥗",
              title: "Fresh Food",
              text: "Daily homemade and hygienic meals.",
            },
            {
              icon: "⏰",
              title: "Daily Service",
              text: "Breakfast, lunch and dinner availability.",
            },
            {
              icon: "💰",
              title: "Affordable",
              text: "Perfect pricing for students and workers.",
            },
            {
              icon: "✅",
              title: "Easy Ordering",
              text: "Simple add to cart and order process.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-[30px] p-6 shadow-xl border border-orange-100 hover:-translate-y-2 transition"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center text-2xl mb-5 shadow-lg">
                {item.icon}
              </div>

              <h3 className="text-xl font-black text-gray-900">
                {item.title}
              </h3>

              <p className="text-gray-500 mt-2">{item.text}</p>
            </div>
          ))}
        </section>

        <div className="text-center mb-12">
          <span className="inline-block px-5 py-2 rounded-full bg-orange-100 text-orange-600 font-black mb-5">
            🍽️ AVAILABLE FOOD
          </span>

          <h2 className="text-4xl md:text-5xl font-black text-gray-900">
            Instance{" "}
            <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              Food Items
            </span>
          </h2>

          <p className="text-gray-500 mt-4 text-lg">
            Choose your favourite food item and add it to cart.
          </p>
        </div>

        {foodList.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {foodList.map((food, i) => (
              <div
                key={i}
                className="group bg-white rounded-[35px] overflow-hidden shadow-xl border border-orange-100 hover:-translate-y-3 transition duration-500"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={`${BASE_URL}/Upload/${food.file}`}
                    alt={food.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                  <div className="absolute top-5 right-5 px-4 py-2 rounded-full bg-white text-orange-600 font-black shadow-lg">
                    ₹{food.price || 0}
                  </div>
                </div>

                <div className="p-7">
                  <h3 className="text-3xl font-black text-gray-900 mb-3">
                    {food.name}
                  </h3>

                  <p className="text-gray-500 leading-relaxed mb-5">
                    {food.description || "Fresh and tasty homemade food item."}
                  </p>

                  <div className="flex flex-wrap gap-3 mb-7">
                    <span className="px-4 py-2 rounded-full bg-orange-100 text-orange-600 font-bold text-sm">
                      🔥 Fresh
                    </span>

                    <span className="px-4 py-2 rounded-full bg-green-100 text-green-600 font-bold text-sm">
                      🥗 Hygienic
                    </span>

                    <span className="px-4 py-2 rounded-full bg-yellow-100 text-yellow-600 font-bold text-sm">
                      🍱 Homemade
                    </span>
                  </div>

                  <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 text-white font-black shadow-xl hover:scale-105 transition">
                    Add To Cart 🛒
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[45px] p-14 text-center shadow-2xl border border-orange-100">
            <div className="text-7xl mb-6">🍽️</div>

            <h2 className="text-4xl font-black text-gray-900">
              No Food Items Available
            </h2>

            <p className="text-gray-500 text-lg mt-4">
              This mess has not added food items yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Owner;