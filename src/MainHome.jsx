import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Fetchdata } from "../Slice/ProductSlice";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";

function MainHome() {

  const dispatch = useDispatch();
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {

    dispatch(Fetchdata());

  }, [dispatch]);

 

  const product = useSelector((state) => state.product.item);

  const items = product?.map((i) =>
    typeof i === "string" ? JSON.parse(i) : i
  );

  return (

    <div className="bg-[#fff8f3] min-h-screen overflow-hidden">

      {/* HERO SECTION */}

      <div className="relative">

        {/* Background Blur */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-orange-300 rounded-full blur-3xl opacity-30"></div>

        <div className="absolute top-10 right-0 w-72 h-72 bg-pink-300 rounded-full blur-3xl opacity-30"></div>

        {/* Carousel */}

        <div className="relative h-[550px] overflow-hidden rounded-b-[50px]">

          <Carousel fade className="h-full">

            {items && items.length > 0 ? (

              items.map((i, index) =>
                i.files?.map((file, fIndex) => (

                  <Carousel.Item
                    key={`${index}-${fIndex}`}
                    className="h-[550px]"
                  >

                    <img
                      src={`${BASE_URL}/Upload/${file}`}
                      alt="Mess"
                      className="w-full h-full object-cover"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/55"></div>

                    {/* Hero Content */}

                    <div className="absolute inset-0 flex items-center">

                      <div className="max-w-7xl mx-auto px-6 w-full">

                        <div className="max-w-2xl text-white">

                          <div className="inline-block px-5 py-2 rounded-full bg-white/20 backdrop-blur-lg border border-white/20 text-sm font-semibold mb-6">
                            🍱 Best Mess Service Platform
                          </div>

                          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">

                            Find Your <br />

                            <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
                              Perfect Mess
                            </span>

                          </h1>

                          <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-8">
                            Quality food, affordable prices and trusted mess
                            services near your location.
                          </p>

                          <div className="flex flex-wrap gap-4">

                            <Link to="/messregister">

                              <button className="px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold shadow-2xl hover:scale-105 transition duration-300">
                                Explore Messes 🚀
                              </button>

                            </Link>

                            <Link to="/contact">

                              <button className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 text-white font-bold hover:bg-white/20 transition">
                                Contact Us
                              </button>

                            </Link>

                          </div>

                        </div>

                      </div>

                    </div>

                  </Carousel.Item>

                ))
              )

            ) : (

              <Carousel.Item className="h-[550px]">

                <div className="h-full bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center">

                  <h1 className="text-6xl font-black text-white">
                    Find Your Perfect Mess
                  </h1>

                </div>

              </Carousel.Item>

            )}

          </Carousel>

        </div>

      </div>

      {/* FEATURES */}

      <div className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white rounded-3xl p-8 shadow-lg hover:-translate-y-2 transition duration-300 border border-orange-100">

            <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center text-3xl mb-6">
              ⚡
            </div>

            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              Fast Service
            </h3>

            <p className="text-gray-500">
              Quick and easy mess booking experience.
            </p>

          </div>

          <div className="bg-white rounded-3xl p-8 shadow-lg hover:-translate-y-2 transition duration-300 border border-pink-100">

            <div className="w-16 h-16 rounded-2xl bg-pink-100 flex items-center justify-center text-3xl mb-6">
              🍽️
            </div>

            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              Healthy Food
            </h3>

            <p className="text-gray-500">
              Fresh and hygienic meals everyday.
            </p>

          </div>

          <div className="bg-white rounded-3xl p-8 shadow-lg hover:-translate-y-2 transition duration-300 border border-yellow-100">

            <div className="w-16 h-16 rounded-2xl bg-yellow-100 flex items-center justify-center text-3xl mb-6">
              💰
            </div>

            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              Affordable
            </h3>

            <p className="text-gray-500">
              Best pricing plans for students and workers.
            </p>

          </div>

          <div className="bg-white rounded-3xl p-8 shadow-lg hover:-translate-y-2 transition duration-300 border border-green-100">

            <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center text-3xl mb-6">
              ❤️
            </div>

            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              Trusted
            </h3>

            <p className="text-gray-500">
              Loved by hundreds of happy customers.
            </p>

          </div>

        </div>

      </div>

      {/* MESS CARDS */}

      <div className="max-w-7xl mx-auto px-6 pb-24">

        <div className="text-center mb-16">

          <h2 className="text-5xl font-black text-gray-800 mb-4">
            Featured Mess Services
          </h2>

          <p className="text-gray-500 text-lg">
            Find best food services around you
          </p>

          <div className="w-32 h-2 bg-gradient-to-r from-orange-500 to-pink-500 mx-auto mt-6 rounded-full"></div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">

          {items && items.length > 0 ? (

            items.map((i, index) => (

              <div
                key={index}
                className="group bg-white rounded-[35px] overflow-hidden shadow-xl hover:-translate-y-3 transition duration-500 border border-orange-100"
              >

                {/* Image */}

                <div className="relative h-64 overflow-hidden">

                  <img
                    src={`${BASE_URL}/Upload/${i.files?.[0]}`}
                    alt={i.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                  <div
                    className={`absolute top-5 right-5 px-4 py-2 rounded-full text-sm font-bold text-white shadow-lg ${
                      i.type === "veg"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {i.type === "veg"
                      ? "🥬 Vegetarian"
                      : "🍗 Non-Veg"}
                  </div>

                </div>

                {/* Content */}

                <div className="p-7">

                  <h3 className="text-3xl font-black text-gray-800 mb-3">
                    {i.name}
                  </h3>

                  <p className="text-gray-500 mb-5 text-lg">
                    📍 {i.city}
                    {i.village ? `, ${i.village}` : ""}
                  </p>

                  {/* Food Tags */}

                  <div className="flex flex-wrap gap-3 mb-7">

                    <span className="px-4 py-2 rounded-full bg-orange-100 text-orange-600 font-semibold text-sm">
                      🌅 Breakfast
                    </span>

                    <span className="px-4 py-2 rounded-full bg-pink-100 text-pink-600 font-semibold text-sm">
                      🍽️ Lunch
                    </span>

                    <span className="px-4 py-2 rounded-full bg-yellow-100 text-yellow-600 font-semibold text-sm">
                      🌙 Dinner
                    </span>

                  </div>

                  {/* Footer */}

                  <div className="flex items-center justify-between">

                    <div>

                      <p className="text-sm text-gray-400">Starting From</p>

                      <h1 className="text-4xl font-black text-orange-500">
                        ₹{i.price || "N/A"}
                      </h1>

                    </div>

                    <Link to={`/messview/${i._id || i.id}`}>

                      <button className="px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold shadow-lg hover:scale-105 transition duration-300">
                        View →
                      </button>

                    </Link>

                  </div>

                </div>

              </div>

            ))

          ) : (

            <div className="col-span-3 text-center py-24">

              <div className="text-7xl mb-5">🔍</div>

              <h2 className="text-3xl font-bold text-gray-700 mb-3">
                No Mess Services Found
              </h2>

              <p className="text-gray-500 text-lg">
                Please check again later.
              </p>

            </div>

          )}

        </div>

      </div>

      {/* CTA SECTION */}

      <div className="relative py-24 overflow-hidden bg-gradient-to-r from-orange-500 via-orange-400 to-pink-500">

        <div className="absolute top-0 left-0 w-72 h-72 bg-white/20 rounded-full blur-3xl"></div>

        <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-300/30 rounded-full blur-3xl"></div>

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">

          <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
            Ready To Join?
          </h1>

          <p className="text-xl text-white/90 mb-10 leading-relaxed">
            Become a mess owner or tiffin provider and grow your business today.
          </p>

          <div className="flex flex-wrap gap-5 justify-center">

            <Link to="/messregister">

              <button className="px-10 py-4 rounded-full bg-white text-orange-500 font-black shadow-2xl hover:scale-105 transition duration-300">
                Register as Mess Owner
              </button>

            </Link>

            <Link to="/teffinregister">

              <button className="px-10 py-4 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 text-white font-black hover:bg-white/20 transition">
                Register as Tiffin Provider
              </button>

            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default MainHome;
