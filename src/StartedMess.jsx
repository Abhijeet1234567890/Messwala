import React, { useEffect, useMemo, useState } from "react";

function StartedMess() {
  const [users, setUsers] = useState([]);
  const [userProfiles, setUserProfiles] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const API_URL = "http://localhost:2000";
  const messId = localStorage.getItem("token");

  useEffect(() => {
    if (messId) {
      getStartedUsers();
    } else {
      setIsLoading(false);
    }
  }, [messId]);

  async function getStartedUsers() {
    try {
      setIsLoading(true);

      const res = await fetch(`${API_URL}/getmessstart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messId }),
      });

      const result = await res.json();
      const data = result.data || [];

      setUsers(data);

      const uniqueEmails = [...new Set(data.map((item) => item.email))];

      uniqueEmails.forEach((email) => {
        getUserProfile(email);
      });
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function getUserProfile(email) {
    try {
      const res = await fetch(`${API_URL}/getmess`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const result = await res.json();

      setUserProfiles((prev) => ({
        ...prev,
        [email]: result.profile,
      }));
    } catch (err) {
      console.log(err);
    }
  }

  function handleDownloadPDF(id) {
    window.open(`${API_URL}/get-pdf/${id}`, "_blank");
  }

  const totalUsers = useMemo(() => {
    return new Set(users.map((item) => item.email)).size;
  }, [users]);

  const totalRevenue = users.reduce(
    (acc, item) => acc + Number(item.amount || 0),
    0
  );

  const paidCount = users.filter(
    (item) => item.payment_status === "Paid"
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-orange-50 px-4 py-8 relative overflow-hidden">
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-300 rounded-full blur-[130px] opacity-40"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-orange-300 rounded-full blur-[130px] opacity-40"></div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-flex px-6 py-2 rounded-full bg-white shadow-lg text-emerald-700 font-black border border-emerald-100">
            💳 Started Mess Dashboard
          </span>

          <h1 className="mt-5 text-4xl md:text-6xl font-black text-slate-900">
            Payment{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-orange-500 bg-clip-text text-transparent">
              History
            </span>
          </h1>

          <p className="mt-4 text-slate-500 font-medium">
            User details, paid amount, joining date आणि PDF receipt download.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
          <div className="bg-white rounded-[30px] p-6 shadow-xl border border-emerald-100">
            <p className="text-slate-500 font-bold">Total Users</p>
            <h2 className="text-4xl font-black text-slate-900 mt-2">
              {totalUsers}
            </h2>
          </div>

          <div className="bg-white rounded-[30px] p-6 shadow-xl border border-orange-100">
            <p className="text-slate-500 font-bold">Total Joins</p>
            <h2 className="text-4xl font-black text-orange-500 mt-2">
              {users.length}
            </h2>
          </div>

          <div className="bg-white rounded-[30px] p-6 shadow-xl border border-green-100">
            <p className="text-slate-500 font-bold">Paid Payments</p>
            <h2 className="text-4xl font-black text-green-600 mt-2">
              {paidCount}
            </h2>
          </div>

          <div className="bg-white rounded-[30px] p-6 shadow-xl border border-yellow-100">
            <p className="text-slate-500 font-bold">Total Revenue</p>
            <h2 className="text-4xl font-black text-emerald-600 mt-2">
              ₹{totalRevenue}
            </h2>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-xl rounded-[35px] shadow-2xl border border-white overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between gap-4 p-6 border-b border-emerald-100">
            <div>
              <h2 className="text-2xl font-black text-slate-900">
                Started Mess Payment Table
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                प्रत्येक payment record आणि PDF receipt download.
              </p>
            </div>

            <button
              onClick={getStartedUsers}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-orange-500 text-white font-black shadow-lg hover:scale-105 transition"
            >
              🔄 Refresh
            </button>
          </div>

          {isLoading ? (
            <div className="p-20 text-center">
              <div className="text-7xl mb-4 animate-bounce">🍱</div>
              <h2 className="text-3xl font-black text-slate-900">
                Loading Data...
              </h2>
            </div>
          ) : users.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1450px]">
                <thead>
                  <tr className="bg-gradient-to-r from-emerald-700 via-green-600 to-orange-500 text-white">
                    <th className="p-4 text-left">User Details</th>
                    <th className="p-4 text-left">Join Info</th>
                    <th className="p-4 text-left">Paid Amount</th>
                    <th className="p-4 text-left">Payment Status</th>
                    <th className="p-4 text-left">Razorpay Details</th>
                    <th className="p-4 text-left">Payment Date</th>
                    <th className="p-4 text-left">Receipt</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((item, index) => {
                    const profile = userProfiles[item.email];

                    return (
                      <tr
                        key={item._id || index}
                        className="border-b border-emerald-100 hover:bg-emerald-50/70 transition"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={
                                profile?.file
                                  ? `${API_URL}/Upload/${profile.file}`
                                  : "https://via.placeholder.com/100"
                              }
                              alt="profile"
                              className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-300 shadow"
                            />

                            <div>
                              <h3 className="font-black text-slate-900">
                                {profile?.name || "User Name"}
                              </h3>

                              <p className="text-sm text-slate-500 font-semibold break-all">
                                {item.email || profile?.email || "No Email"}
                              </p>

                              <p className="text-sm text-slate-500 font-semibold">
                                {profile?.contact ||
                                  profile?.phone ||
                                  profile?.mobile ||
                                  "No Phone"}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="p-4">
                          <p className="font-bold text-slate-700">
                            Start Date:{" "}
                            <span className="text-slate-500">
                              {item.date
                                ? new Date(item.date).toLocaleDateString()
                                : "N/A"}
                            </span>
                          </p>

                          <p className="font-bold text-slate-700 mt-1">
                            Months:{" "}
                            <span className="text-orange-600">
                              {item.subscriptionMonth || 1}
                            </span>
                          </p>

                          <p className="font-bold text-slate-700 mt-1">
                            Order:{" "}
                            <span
                              className={
                                item.order_status === "Active"
                                  ? "text-green-600"
                                  : "text-red-500"
                              }
                            >
                              {item.order_status || "Active"}
                            </span>
                          </p>
                        </td>

                        <td className="p-4">
                          <div className="rounded-2xl bg-green-50 border border-green-100 p-4">
                            <p className="text-3xl font-black text-green-600">
                              ₹{item.amount || 0}
                            </p>

                            <p className="text-sm text-slate-500 font-bold mt-1">
                              Monthly: ₹{item.monthlyPrice || 0}
                            </p>

                            <p className="text-sm text-slate-500 font-bold">
                              Currency: {item.currency || "INR"}
                            </p>
                          </div>
                        </td>

                        <td className="p-4">
                          <span
                            className={`px-4 py-2 rounded-full text-sm font-black ${
                              item.payment_status === "Paid"
                                ? "bg-green-100 text-green-700"
                                : item.payment_status === "Failed"
                                ? "bg-red-100 text-red-600"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {item.payment_status || "Pending"}
                          </span>

                          <p className="text-sm text-slate-500 font-semibold mt-3">
                            Method: {item.paymentMethod || "Razorpay"}
                          </p>
                        </td>

                        <td className="p-4">
                          <div className="max-w-[280px] space-y-2">
                            <p className="text-sm text-slate-600 break-all">
                              <span className="font-black text-slate-900">
                                Order ID:
                              </span>{" "}
                              {item.razorpay_order_id || "N/A"}
                            </p>

                            <p className="text-sm text-slate-600 break-all">
                              <span className="font-black text-slate-900">
                                Payment ID:
                              </span>{" "}
                              {item.razorpay_payment_id || "N/A"}
                            </p>
                          </div>
                        </td>

                        <td className="p-4">
                          <div className="rounded-2xl bg-orange-50 border border-orange-100 p-4">
                            <p className="font-black text-orange-600">
                              {item.paymentDate
                                ? new Date(
                                    item.paymentDate
                                  ).toLocaleDateString()
                                : "N/A"}
                            </p>

                            <p className="text-xs text-slate-500 mt-1">
                              Created:{" "}
                              {item.createdAt
                                ? new Date(item.createdAt).toLocaleString()
                                : "N/A"}
                            </p>
                          </div>
                        </td>

                        <td className="p-4">
                          <button
                            onClick={() => handleDownloadPDF(item._id)}
                            className="group relative overflow-hidden px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-green-500 to-teal-500 text-white font-black shadow-xl hover:shadow-emerald-300/60 hover:scale-105 transition-all duration-300"
                          >
                            <span className="relative z-10">
                              📄 Download Receipt
                            </span>

                            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-700" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <p className="text-center text-xs text-slate-400 p-4">
                Mobile वर table horizontal scroll होईल.
              </p>
            </div>
          ) : (
            <div className="p-20 text-center">
              <div className="text-8xl mb-5">📭</div>
              <h2 className="text-3xl font-black text-slate-900">
                No Started Users Found
              </h2>
              <p className="text-slate-500 mt-2">
                अजून कोणत्याही user ने mess start केलेला नाही.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StartedMess;