import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

function Tiffenwalaprofile() {

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const [data, setdata] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("teffintoken");

    if (token) {
      try {
        const decode = jwtDecode(token);
        setdata(decode);
      } catch (error) {
        console.error("Token decode error:", error);
      }
    }

    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fff8f3] flex items-center justify-center">
        <div className="bg-white p-10 rounded-[35px] shadow-2xl text-center border border-orange-100">
          <div className="text-6xl mb-4 animate-pulse">⏳</div>
          <p className="text-gray-700 text-xl font-black">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#fff8f3] px-4 py-10">
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-orange-300 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute top-40 -right-24 w-96 h-96 bg-pink-300 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-yellow-200 rounded-full blur-3xl opacity-30"></div>

      <div className="relative max-w-6xl mx-auto">
        {data ? (
          <>
            <div className="text-center mb-12">
              <span className="inline-block px-5 py-2 rounded-full bg-orange-100 text-orange-600 font-black mb-5">
                🥘 TIFFIN OWNER PROFILE
              </span>

              <h1 className="text-4xl md:text-6xl font-black text-gray-900">
                Welcome{" "}
                <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                  {data.name}
                </span>
              </h1>

              <p className="text-gray-500 mt-4 text-lg">
                Manage your tiffin profile, contact info and business identity.
              </p>
            </div>

            <div className="grid lg:grid-cols-[380px_1fr] gap-10 items-start">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-400 rounded-[45px] blur-3xl opacity-25"></div>

                <div className="relative bg-white rounded-[45px] p-8 shadow-[0_35px_90px_rgba(0,0,0,0.15)] border border-orange-100 text-center">
                  <div className="relative w-40 h-40 mx-auto mb-6">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 p-1 shadow-2xl">
                      <img
                        src={
                          data.file
                            ? `${BASE_URL}/Upload/${data.file}`
                            : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                        }
                        alt="Profile"
                        className="w-full h-full rounded-full object-cover border-4 border-white"
                      />
                    </div>

                    <div className="absolute -bottom-2 -right-2 w-14 h-14 rounded-2xl bg-green-500 text-white flex items-center justify-center text-2xl shadow-xl border-4 border-white">
                      ✓
                    </div>
                  </div>

                  <h2 className="text-3xl font-black text-gray-900">
                    {data.name}
                  </h2>

                  <p className="text-orange-500 font-bold mt-2">
                    Premium Tiffin Partner
                  </p>

                  <div className="mt-7 grid grid-cols-2 gap-4">
                    <div className="bg-orange-50 rounded-3xl p-4">
                      <p className="text-3xl">🍱</p>
                      <p className="text-sm font-black text-gray-800 mt-2">
                        Tiffin
                      </p>
                    </div>

                    <div className="bg-green-50 rounded-3xl p-4">
                      <p className="text-3xl">✅</p>
                      <p className="text-sm font-black text-gray-800 mt-2">
                        Active
                      </p>
                    </div>
                  </div>

                  <button className="w-full mt-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 text-white font-black shadow-xl hover:scale-[1.03] transition">
                    ✏️ Edit Profile
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-[40px] p-8 shadow-2xl border border-orange-100">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 rounded-3xl bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center text-3xl shadow-xl">
                      👤
                    </div>

                    <div>
                      <h3 className="text-3xl font-black text-gray-900">
                        Personal Information
                      </h3>
                      <p className="text-gray-500">
                        Your basic account details
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="bg-[#fff8f3] rounded-3xl p-5 border border-orange-100">
                      <p className="text-xs font-black text-orange-500 uppercase">
                        Full Name
                      </p>
                      <p className="text-xl font-black text-gray-900 mt-2">
                        {data.name}
                      </p>
                    </div>

                    <div className="bg-[#fff8f3] rounded-3xl p-5 border border-orange-100">
                      <p className="text-xs font-black text-orange-500 uppercase">
                        Email Address
                      </p>
                      <p className="text-lg font-bold text-gray-800 mt-2 break-all">
                        {data.email}
                      </p>
                    </div>

                    <div className="bg-[#fff8f3] rounded-3xl p-5 border border-orange-100">
                      <p className="text-xs font-black text-orange-500 uppercase">
                        City
                      </p>
                      <p className="text-xl font-black text-gray-900 mt-2">
                        📍 {data.city || "Not Available"}
                      </p>
                    </div>

                    <div className="bg-[#fff8f3] rounded-3xl p-5 border border-orange-100">
                      <p className="text-xs font-black text-orange-500 uppercase">
                        Contact
                      </p>
                      <p className="text-xl font-black text-gray-900 mt-2">
                        📞 {data.contact || "Not Available"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-5">
                  {[
                    { icon: "🍛", title: "Daily Menu", text: "Manage food menu" },
                    { icon: "💬", title: "Messages", text: "Customer requests" },
                    { icon: "🚀", title: "Growth", text: "Improve orders" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-[30px] p-6 shadow-xl border border-orange-100 hover:-translate-y-2 transition"
                    >
                      <div className="text-4xl mb-4">{item.icon}</div>
                      <h4 className="text-xl font-black text-gray-900">
                        {item.title}
                      </h4>
                      <p className="text-gray-500 mt-2">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="max-w-3xl mx-auto bg-white border border-orange-100 p-14 rounded-[40px] text-center shadow-2xl">
            <div className="text-7xl mb-5">😢</div>
            <h2 className="text-4xl font-black text-gray-900">
              Profile Not Found
            </h2>
            <p className="text-gray-500 mt-4 text-xl">
              Please login again to view your profile.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Tiffenwalaprofile;