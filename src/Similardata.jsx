import { useLocation, Link } from "react-router-dom";

function Similardata() {
  const location = useLocation();
  const data = location.state || [];

  return (
    <div className="min-h-screen bg-[#fff8f3] overflow-hidden relative px-4 py-10">

      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-orange-300 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute top-40 right-0 w-80 h-80 bg-pink-300 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-yellow-200 rounded-full blur-3xl opacity-30"></div>

      <div className="relative max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-5 py-2 rounded-full bg-orange-100 text-orange-600 font-black mb-5">
            🔎 SIMILAR RESULTS
          </span>

          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-5">
            Discover Similar{" "}
            <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              Food Options
            </span>
          </h1>

          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Explore similar mess, meals and food items based on your selected
            choice.
          </p>
        </div>

        {/* Extra Info Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {[
            {
              icon: "🍱",
              title: "Similar Meals",
              text: "Find related food options easily.",
            },
            {
              icon: "💰",
              title: "Compare Price",
              text: "Check food prices before choosing.",
            },
            {
              icon: "🥗",
              title: "Fresh Food",
              text: "Explore tasty and hygienic meals.",
            },
            {
              icon: "⚡",
              title: "Quick Search",
              text: "Fast result display with better UI.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-[30px] p-6 shadow-xl border border-orange-100 hover:-translate-y-2 transition duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center text-2xl mb-5 shadow-lg">
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

        {/* Data Grid */}
        {data.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {data.map((item, index) => (
              <div
                key={index}
                className="group bg-white rounded-[35px] overflow-hidden shadow-xl border border-orange-100 hover:-translate-y-3 transition duration-500"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  {item.file ? (
                    <img
                      src={`http://localhost:2000/Upload/${item.file}`}
                      alt={item.name || "item"}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center text-7xl">
                      🍱
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                  <div className="absolute top-5 left-5 px-4 py-2 rounded-full bg-white/90 text-orange-600 font-black shadow-lg">
                    Similar Match
                  </div>

                  {item.price && (
                    <div className="absolute top-5 right-5 px-4 py-2 rounded-full bg-white text-gray-900 font-black shadow-lg">
                      ₹{item.price}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-7">
                  <h2 className="text-3xl font-black text-gray-900 mb-3">
                    {item.name || "Food Item"}
                  </h2>

                  <p className="text-gray-500 leading-relaxed mb-5">
                    {item.description ||
                      "Fresh, tasty and hygienic homemade food option."}
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
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[45px] p-14 text-center shadow-2xl border border-orange-100">
            <div className="text-7xl mb-6">😕</div>

            <h2 className="text-4xl font-black text-gray-900">
              No Similar Data Found
            </h2>

            <p className="text-gray-500 text-lg mt-4">
              Please try another mess or food item.
            </p>

            <Link to="/">
              <button className="mt-8 px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-black shadow-xl hover:scale-105 transition">
                Back To Home
              </button>
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}

export default Similardata;