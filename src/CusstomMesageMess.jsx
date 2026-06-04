import React, { useEffect, useState } from "react";

function CustomMessageMess() {
  const [messages, setMessages] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [openReplyId, setOpenReplyId] = useState(null);
  const [replyData, setReplyData] = useState({});
  const [toast, setToast] = useState({ show: false, type: "", message: "" });

  const messId = localStorage.getItem("token");

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => {
      setToast({ show: false, type: "", message: "" });
    }, 2500);
  };

  const fetchUserDetails = async (userId) => {
    try {
      const res = await fetch("http://localhost:2000/getuserdetails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      const data = await res.json();

      if (res.ok) {
        setUserDetails((prev) => ({
          ...prev,
          [userId]: data.data,
        }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchMessages = async () => {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:2000/custommessagemess", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messId }),
      });

      const data = await res.json();

      if (!res.ok) {
        return showToast("error", data.message || "Messages not found");
      }

      setMessages(data.data || []);

      data.data?.forEach((item) => {
        if (item.userId) fetchUserDetails(item.userId);
      });
    } catch (err) {
      console.log(err);
      showToast("error", "Server error");
    } finally {
      setLoading(false);
    }
  };

  const submitStatus = async (id, status) => {
    const response = replyData[id] || "";

    if (status === "Accepted" && !response.trim()) {
      return showToast("error", "Accept करण्यापूर्वी reply लिहा");
    }

    try {
      const res = await fetch(`http://localhost:2000/replycustommessage/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status,
          response,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        return showToast("error", data.message || "Status update failed");
      }

      showToast("success", `Request ${status}`);
      setOpenReplyId(null);
      setReplyData((prev) => ({ ...prev, [id]: "" }));
      fetchMessages();
    } catch (err) {
      console.log(err);
      showToast("error", "Server error");
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50 p-4 md:p-8 relative overflow-hidden">
      {toast.show && (
        <div className="fixed top-5 right-5 z-50">
          <div
            className={`px-5 py-3 rounded-2xl shadow-xl font-black border ${
              toast.type === "success"
                ? "bg-green-50 text-green-700 border-green-200"
                : "bg-red-50 text-red-700 border-red-200"
            }`}
          >
            {toast.type === "success" ? "✅ " : "❌ "}
            {toast.message}
          </div>
        </div>
      )}

      <div className="absolute -top-32 -left-32 w-96 h-96 bg-orange-300 blur-[130px] opacity-50 rounded-full"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-pink-300 blur-[130px] opacity-50 rounded-full"></div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <span className="inline-flex px-6 py-2 rounded-full bg-white shadow-lg text-orange-600 font-black border border-orange-100">
            🍱 Mess Request Panel
          </span>

          <h1 className="mt-5 text-4xl md:text-6xl font-black text-slate-900">
            Custom Food{" "}
            <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              Requests
            </span>
          </h1>

          <p className="text-slate-500 mt-3 font-medium">
            User details, food image, message आणि reply एकाच table मध्ये manage करा.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-7">
          <div className="bg-white rounded-3xl p-5 shadow-xl border border-orange-100">
            <p className="text-slate-500 font-bold">Total</p>
            <h2 className="text-4xl font-black">{messages.length}</h2>
          </div>

          <div className="bg-white rounded-3xl p-5 shadow-xl border border-green-100">
            <p className="text-slate-500 font-bold">Accepted</p>
            <h2 className="text-4xl font-black text-green-600">
              {messages.filter((m) => m.status === "Accepted").length}
            </h2>
          </div>

          <div className="bg-white rounded-3xl p-5 shadow-xl border border-red-100">
            <p className="text-slate-500 font-bold">Rejected</p>
            <h2 className="text-4xl font-black text-red-500">
              {messages.filter((m) => m.status === "Rejected").length}
            </h2>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-xl rounded-[32px] shadow-2xl border border-white overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between gap-4 p-6 border-b border-orange-100">
            <div>
              <h2 className="text-2xl font-black text-slate-900">
                Latest Customer Requests
              </h2>
              <p className="text-sm text-slate-500">
                Accept केल्यावर reply box open होईल.
              </p>
            </div>

            <button
              onClick={fetchMessages}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 text-white font-black shadow-lg hover:scale-105 transition"
            >
              🔄 Refresh
            </button>
          </div>

          {loading ? (
            <div className="p-16 text-center">
              <div className="text-7xl animate-bounce mb-4">🍱</div>
              <h2 className="text-3xl font-black">Loading Requests...</h2>
            </div>
          ) : messages.length === 0 ? (
            <div className="p-16 text-center">
              <div className="text-8xl mb-4">📭</div>
              <h2 className="text-3xl font-black">No Requests Found</h2>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1100px]">
                <thead>
                  <tr className="bg-gradient-to-r from-orange-500 via-rose-500 to-pink-500 text-white">
                    <th className="p-4 text-left">User Details</th>
                    <th className="p-4 text-left">Food</th>
                    <th className="p-4 text-left">Custom Message</th>
                    <th className="p-4 text-center">Status</th>
                    <th className="p-4 text-center">Action / Reply</th>
                  </tr>
                </thead>

                <tbody>
                  {messages.map((item) => {
                    const user = userDetails[item.userId];

                    return (
                      <tr
                        key={item._id}
                        className="border-b border-orange-100 hover:bg-orange-50/70 transition"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-pink-500 text-white flex items-center justify-center text-xl shadow-lg">
                              👤
                            </div>

                            <div>
                              <h3 className="font-black text-slate-900">
                                {user?.name || "User Name Not Found"}
                              </h3>
                              <p className="text-sm text-slate-500 font-semibold">
                                {user?.email || "Email Not Found"}
                              </p>
                              <p className="text-sm text-slate-500 font-semibold">
                                {user?.contact || user?.mobile || "Phone Not Found"}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            {item.file ? (
                              <img
                                src={`http://localhost:2000/Upload/${item.file}`}
                                alt={item.name}
                                className="w-20 h-20 rounded-2xl object-cover shadow-lg border"
                              />
                            ) : (
                              <div className="w-20 h-20 rounded-2xl bg-orange-100 flex items-center justify-center text-4xl">
                                🍛
                              </div>
                            )}

                            <div>
                              <h3 className="font-black text-slate-900">
                                {item.name || item.menuName || "Food Name"}
                              </h3>
                              <p className="text-sm text-slate-500 max-w-[180px] line-clamp-2">
                                {item.description ||
                                  item.discription ||
                                  item.desciption ||
                                  "No description"}
                              </p>
                              <p className="text-xs mt-1 font-black text-orange-600">
                                {item.menu || item.day || "Menu"}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="p-4">
                          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 text-yellow-800 font-bold max-w-[260px]">
                            “{item.userMessage || item.customMessage || "No Message"}”
                          </div>
                        </td>

                        <td className="p-4 text-center">
                          <span
                            className={`px-4 py-2 rounded-full text-xs font-black ${
                              item.status === "Accepted"
                                ? "bg-green-100 text-green-700"
                                : item.status === "Rejected"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {item.status || "Pending"}
                          </span>
                        </td>

                        <td className="p-4">
                          {openReplyId === item._id ? (
                            <div className="min-w-[260px] space-y-3">
                              <textarea
                                rows="3"
                                value={replyData[item._id] || ""}
                                onChange={(e) =>
                                  setReplyData((prev) => ({
                                    ...prev,
                                    [item._id]: e.target.value,
                                  }))
                                }
                                placeholder="Customer साठी reply लिहा..."
                                className="w-full rounded-2xl border border-orange-200 px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400 resize-none"
                              />

                              <div className="flex gap-2">
                                <button
                                  onClick={() => submitStatus(item._id, "Accepted")}
                                  className="flex-1 py-2 rounded-xl bg-green-500 text-white font-black hover:bg-green-600 transition"
                                >
                                  Send
                                </button>

                                <button
                                  onClick={() => setOpenReplyId(null)}
                                  className="flex-1 py-2 rounded-xl bg-slate-200 text-slate-700 font-black hover:bg-slate-300 transition"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex gap-2 justify-center min-w-[220px]">
                              <button
                                onClick={() => setOpenReplyId(item._id)}
                                className="px-4 py-3 rounded-2xl bg-green-500 text-white font-black shadow-lg hover:bg-green-600 hover:scale-105 transition"
                              >
                                ✅ Accept
                              </button>

                              <button
                                onClick={() => submitStatus(item._id, "Rejected")}
                                className="px-4 py-3 rounded-2xl bg-red-500 text-white font-black shadow-lg hover:bg-red-600 hover:scale-105 transition"
                              >
                                ❌ Reject
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <p className="text-center text-xs text-slate-400 mt-5">
          Mobile वर table horizontal scroll होईल, त्यामुळे design break होणार नाही.
        </p>
      </div>
    </div>
  );
}

export default CustomMessageMess;