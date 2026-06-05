import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function TeffinContact() {
  const { id } = useParams();
  const [provider, setProvider] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProvider();
  }, [id]);

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  async function getProvider() {
    try {
      setIsLoading(true);

      const res = await fetch(`${BASE_URL}/teffincontact/${id}`);
      const data = await res.json();

      setProvider(data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fff8f3] flex items-center justify-center">
        <h1 className="text-3xl font-black text-gray-900">Loading Contact...</h1>
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="min-h-screen bg-[#fff8f3] flex items-center justify-center px-4">
        <div className="bg-white rounded-[35px] p-10 shadow-2xl text-center">
          <h1 className="text-3xl font-black text-gray-900">Provider Not Found</h1>
          <Link to="/viewteffinwala">
            <button className="mt-6 px-8 py-3 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-black">
              Back
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const profileImage =
    provider.file || provider.profile || provider.image || provider.photo || provider.profileImage;

  return (
    <div className="min-h-screen bg-[#fff8f3] relative overflow-hidden px-4 py-12">
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-300 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-300 rounded-full blur-3xl opacity-30"></div>

      <div className="relative max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block px-5 py-2 rounded-full bg-orange-100 text-orange-600 font-black mb-5">
            CONTACT PROVIDER
          </span>

          <h1 className="text-4xl md:text-6xl font-black text-gray-900">
            Provider Contact
          </h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="bg-white rounded-[45px] p-8 shadow-2xl border border-orange-100 text-center">
            {profileImage ? (
              <img
                src={`${BASE_URL}/Upload/${profileImage}`}
                alt={provider.name}
                className="w-36 h-36 mx-auto rounded-full object-cover border-4 border-orange-400 shadow-xl mb-6"
              />
            ) : (
              <div className="w-36 h-36 mx-auto rounded-full bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center text-6xl shadow-xl mb-6">
                🥘
              </div>
            )}

            <h2 className="text-4xl font-black text-gray-900">{provider.name}</h2>
            <p className="text-gray-500 font-semibold mt-2">Tiffin Provider</p>

            <span className="inline-block mt-5 px-5 py-2 rounded-full bg-green-100 text-green-600 font-black">
              Active Provider
            </span>
          </div>

          <div className="bg-white rounded-[45px] p-8 shadow-2xl border border-orange-100">
            <h2 className="text-3xl font-black text-gray-900 mb-6">
              Contact Information
            </h2>

            <div className="space-y-4">
              <div className="bg-[#fff8f3] rounded-2xl p-5 border border-orange-100">
                <p className="text-gray-500 font-bold">Email</p>
                <p className="text-gray-900 font-black break-all">
                  {provider.email || "N/A"}
                </p>
              </div>

              <div className="bg-[#fff8f3] rounded-2xl p-5 border border-orange-100">
                <p className="text-gray-500 font-bold">Phone</p>
                <p className="text-gray-900 font-black">
                  {provider.phone || provider.mobile || provider.contact || "N/A"}
                </p>
              </div>

              <div className="bg-[#fff8f3] rounded-2xl p-5 border border-orange-100">
                <p className="text-gray-500 font-bold">Location</p>
                <p className="text-gray-900 font-black">
                  {provider.city || "N/A"} {provider.village ? `, ${provider.village}` : ""}
                </p>
              </div>

              <div className="bg-[#fff8f3] rounded-2xl p-5 border border-orange-100">
                <p className="text-gray-500 font-bold">Pincode</p>
                <p className="text-gray-900 font-black">
                  {provider.pincode || "N/A"}
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mt-7">
              <a
                href={`tel:${provider.phone || provider.mobile || provider.contact || ""}`}
                className="text-center py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 text-white font-black shadow-xl"
              >
                Call Now
              </a>

              <a
                href={`mailto:${provider.email || ""}`}
                className="text-center py-4 rounded-2xl bg-orange-50 text-orange-600 font-black border border-orange-200"
              >
                Send Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeffinContact;