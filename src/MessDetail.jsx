import React, { useState } from "react";
import SmallCalendar from "./Calender";
import { jwtDecode } from "jwt-decode";

function MessDetail() {
  const [showCal, setShowCal] = useState(false);
  const [showPayBox, setShowPayBox] = useState(false);
  const [showLiveBox, setShowLiveBox] = useState(false);
  const [isLive, setIsLive] = useState(false);

  const [date, setDate] = useState("");
  const [menu, setMenu] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [definemenu, setDefineMenu] = useState([]);
  const [menunotdefine, setMenuNotDefine] = useState(false);
  const [subscriptionMonth, setSubscriptionMonth] = useState(1);
  const [toast, setToast] = useState({ show: false, type: "", message: "" });

  const token = localStorage.getItem("teffintoken");
  const MessId = localStorage.getItem("messId");

  const monthlyPrice = 2500;
  const totalAmount = monthlyPrice * subscriptionMonth;

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  let email = "";
  let userid = "";

  if (token) {
    try {
      const decoded = jwtDecode(token);
      email = decoded.email;
      userid = decoded.user_id;
    } catch {
      console.log("Invalid Token");
    }
  }

  const selectedMenu = definemenu[0];

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => setToast({ show: false, type: "", message: "" }), 2500);
  };

  const handleDateSelect = (selectedDate) => {
    const formatted = selectedDate.toISOString().split("T")[0];
    setDate(formatted);
    setShowCal(false);
  };

  const LiveMess = async () => {
    if (!MessId) return showToast("error", "Mess not selected.");

    try {
      const res = await fetch(`${BASE_URL}/livemess`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messId: MessId }),
      });

      const data = await res.json();

      if (!res.ok) {
        return showToast("error", data.message || "Unable to live mess.");
      }

      setIsLive(true);
      setShowLiveBox(false);
      showToast("success", "Mess is live now!");
    } catch (error) {
      console.log(error);
      showToast("error", "Server error.");
    }
  };

  const openPayBox = () => {
    if (!date) return showToast("error", "Please select joining date.");
    if (!MessId) return showToast("error", "Mess not selected.");
    if (!email) return showToast("error", "User not logged in.");
    setShowPayBox(true);
  };

  const CheckMenu = async (e) => {
    e.preventDefault();

    if (!menu) return showToast("error", "Please select menu day.");
    if (!MessId) return showToast("error", "Mess not selected.");

    try {
      let result = await fetch(`${BASE_URL}/checkmenu`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ menu, messid: MessId }),
      });

      result = await result.json();

      const menuData = result.result || result.data || [];

      if (menuData.length > 0) {
        setDefineMenu(menuData);
        setMenuNotDefine(false);
        showToast("success", "Menu loaded successfully!");
      } else {
        setDefineMenu([]);
        setMenuNotDefine(true);
        showToast("error", "Menu not defined for this day.");
      }
    } catch (error) {
      console.log(error);
      showToast("error", "Unable to load menu.");
    }
  };

  console.log("Messmenue",definemenu)

  const SaveSubscriptionAfterPayment = async (paymentData) => {
    try {
      const response = await fetch(`${BASE_URL}/messstart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({
          messId: MessId,
          date,
          email,
          subscriptionMonth,
          monthlyPrice,
          amount: totalAmount,
          payment_status: "Paid",
          order_status: "Active",
          razorpay_payment_id: paymentData.razorpay_payment_id,
          razorpay_order_id: paymentData.razorpay_order_id,
          razorpay_signature: paymentData.razorpay_signature,
        }),
      });

      const result = await response.json();

      if (response.status === 409) {
        setShowPayBox(false);
        return showToast("error", "You already joined this mess.");
      }

      if (!response.ok) {
        return showToast("error", result.message || "Subscription failed.");
      }

      setShowPayBox(false);
      showToast("success", "Subscription payment successful!");
    } catch (error) {
      console.log(error);
      showToast("error", "Server error. Please try again.");
    }
  };

  const HandleRazorpayPayment = async () => {
    if (!window.Razorpay) {
      return showToast("error", "Razorpay SDK not loaded.");
    }

    try {
      const orderRes = await fetch(`${BASE_URL}/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: totalAmount,
          messId: MessId,
          email,
          subscriptionMonth,
        }),
      });

      const orderData = await orderRes.json();

      if (!orderRes.ok || !orderData.order) {
        return showToast("error", orderData.message || "Order create failed.");
      }

      const options = {
        key: "rzp_test_SxvHG5ettHbV6s",
        amount: orderData.order.amount,
        currency: "INR",
        name: "Tiffin Dashboard",
        description: `${subscriptionMonth} Month Mess Subscription`,
        order_id: orderData.order.id,
        handler: function (response) {
          SaveSubscriptionAfterPayment(response);
        },
        prefill: { email },
        theme: { color: "#f97316" },
        modal: {
          ondismiss: function () {
            showToast("error", "Payment cancelled.");
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.log(error);
      showToast("error", "Payment failed. Try again.");
    }
  };

  const CustomizeMessage = async () => {
    if (!selectedMenu) return showToast("error", "Please view menu first.");

    if (!customMessage.trim()) {
      return showToast("error", "Please write custom message.");
    }

    try {
      const res = await fetch(`${BASE_URL}/getcustomization`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          definemenu,
          customMessage,
          userid,
        }),
      });

      const data = await res.json();

      console.log("CustomData:",data);
      if (!res.ok) {
        return showToast("error", data.message || "Unable to save message.");
      }

      showToast("success", "Custom message saved successfully!");
    } catch (error) {
      console.log(error);
      showToast("error", "Unable to save custom message.");
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-pink-50 px-4 py-10">
      {toast.show && (
        <div className="fixed top-6 right-6 z-[999999]">
          <div
            className={`flex items-center gap-4 px-6 py-4 rounded-2xl shadow-2xl border ${
              toast.type === "success"
                ? "bg-green-50 border-green-200 text-green-700"
                : "bg-red-50 border-red-200 text-red-700"
            }`}
          >
            <div className="text-2xl">
              {toast.type === "success" ? "✅" : "❌"}
            </div>
            <div>
              <h3 className="font-black">
                {toast.type === "success" ? "Success" : "Error"}
              </h3>
              <p className="text-sm font-medium">{toast.message}</p>
            </div>
          </div>
        </div>
      )}

      <div className="absolute -top-28 -left-28 w-96 h-96 bg-orange-300 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute top-20 -right-28 w-96 h-96 bg-pink-300 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-yellow-200 rounded-full blur-3xl opacity-30"></div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div className="flex justify-center gap-3 flex-wrap">
            {isLive ? (
              <span className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-green-100 text-green-700 font-black shadow-sm border border-green-200">
                🟢 Live Mess
              </span>
            ) : (
              <button
                type="button"
                onClick={() => setShowLiveBox(true)}
                className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-red-100 text-red-600 font-black shadow-sm border border-red-200 hover:bg-red-200 transition"
              >
                🔴 Go Live
              </button>
            )}

            <span className="inline-flex px-6 py-2 rounded-full bg-orange-100 text-orange-600 font-black shadow-sm">
              🍛 MESS DETAILS
            </span>
          </div>

          <h1 className="mt-6 text-4xl md:text-7xl font-black text-slate-900">
            Join Your{" "}
            <span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
              Favourite Mess
            </span>
          </h1>

          <p className="mt-5 text-slate-500 text-lg">
            Join date आणि menu दोन्ही वेगळे आहेत. Date वरून subscription pay कर,
            menu फक्त view कर.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white/90 backdrop-blur-xl rounded-[35px] p-7 md:p-9 shadow-[0_30px_80px_rgba(15,23,42,0.12)] border border-white">
            <div className="flex gap-4 items-center mb-7">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-orange-500 to-pink-500 text-white flex items-center justify-center text-3xl shadow-xl">
                📅
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900">
                  Join Date & Subscription
                </h2>
                <p className="text-slate-500">Date select करून payment कर</p>
              </div>
            </div>

            <div className="relative">
              <input
                type="text"
                value={date}
                readOnly
                placeholder="Select Join Date"
                className="w-full px-5 py-5 rounded-2xl bg-orange-50/60 border border-orange-100 text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />

              <button
                type="button"
                onClick={() => setShowCal(!showCal)}
                className="absolute right-3 top-3 px-5 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 text-white font-black shadow-lg"
              >
                📅
              </button>
            </div>

            {showCal && (
              <div className="mt-6 bg-orange-50 p-5 rounded-3xl flex justify-center border border-orange-100">
                <SmallCalendar onSelect={handleDateSelect} />
              </div>
            )}

            {date && (
              <div className="mt-5 bg-green-50 border border-green-200 text-green-700 p-4 rounded-2xl text-center font-black">
                ✅ Selected Date : {date}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 mt-5">
              <div className="bg-slate-50 rounded-2xl p-4">
                <p className="text-xl">🔒</p>
                <h4 className="font-black text-slate-900">Secure & Safe</h4>
                <p className="text-xs text-slate-500">100% Protected</p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4">
                <p className="text-xl">⚡</p>
                <h4 className="font-black text-slate-900">Instant Active</h4>
                <p className="text-xs text-slate-500">Start subscription</p>
              </div>
            </div>

            <button
              type="button"
              onClick={openPayBox}
              className="w-full mt-7 py-5 rounded-3xl bg-gradient-to-r from-orange-500 via-rose-500 to-pink-500 text-white font-black text-xl shadow-[0_20px_45px_rgba(249,115,22,0.35)] hover:scale-[1.02] active:scale-[0.98] transition"
            >
              💳 Pay Subscription →
            </button>

            <p className="text-center text-xs text-slate-400 mt-3">
              Secure payment via Razorpay
            </p>
          </div>

          <form
            onSubmit={CheckMenu}
            className="bg-white/90 backdrop-blur-xl rounded-[35px] p-7 md:p-9 shadow-[0_30px_80px_rgba(15,23,42,0.12)] border border-white"
          >
            <div className="flex gap-4 items-center mb-7">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-yellow-400 to-orange-500 text-white flex items-center justify-center text-3xl shadow-xl">
                🍽️
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900">
                  Mess Menu
                </h2>
                <p className="text-slate-500">Menu पाहण्यासाठी day select कर</p>
              </div>
            </div>

            <select
              value={menu}
              onChange={(e) => setMenu(e.target.value)}
              className="w-full px-5 py-5 rounded-2xl bg-orange-50/60 border border-orange-100 text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="">Select Menu Day</option>
              <option value="Mon">Monday</option>
              <option value="Tue">Tuesday</option>
              <option value="Wed">Wednesday</option>
              <option value="Thu">Thursday</option>
              <option value="Fri">Friday</option>
              <option value="Sat">Saturday</option>
              <option value="Sun">Sunday</option>
            </select>

            {menu && (
              <div className="mt-5 bg-yellow-50 border border-yellow-200 text-yellow-700 p-4 rounded-2xl text-center font-black">
                🍴 Selected Menu : {menu}
              </div>
            )}

            <button
              type="submit"
              className="w-full mt-7 py-5 rounded-3xl bg-gradient-to-r from-amber-400 via-orange-500 to-orange-600 text-white font-black text-xl shadow-[0_20px_45px_rgba(249,115,22,0.30)] hover:scale-[1.02] active:scale-[0.98] transition"
            >
              👀 View Mess Menu →
            </button>
          </form>
        </div>

        <div className="mt-10 bg-white/90 backdrop-blur-xl rounded-[35px] p-6 md:p-8 shadow-[0_30px_80px_rgba(15,23,42,0.10)] border border-white">
          <div className="text-center mb-7">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900">
              👑 Today&apos;s Special Menu
            </h2>
            <p className="text-slate-500">
              Fresh, delicious and specially prepared for you
            </p>
          </div>

          {selectedMenu ? (
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="relative rounded-[28px] overflow-hidden h-[330px] shadow-xl">
                <img
                  src={`${BASE_URL}/Upload/${selectedMenu.file}`}
                  alt={selectedMenu.name}
                  className="w-full h-full object-cover hover:scale-110 duration-700"
                />

                <span className="absolute bottom-5 left-5 bg-pink-500 text-white px-5 py-3 rounded-2xl font-black shadow-xl">
                  {menu} Special
                </span>
              </div>

              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="text-4xl font-black text-slate-900">
                    {selectedMenu.name}
                  </h3>

                  <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full font-black text-sm">
                    Premium
                  </span>
                </div>

                <p className="mt-5 text-slate-500 text-lg leading-relaxed">
                  {selectedMenu.desciption ||
                    selectedMenu.discription ||
                    selectedMenu.description ||
                    "Fresh, hygienic and tasty homemade food prepared specially for students."}
                </p>

                <div className="mt-7 bg-orange-50/70 border border-orange-100 rounded-3xl p-5">
                  <h4 className="font-black text-slate-900 mb-2">
                    💬 Daily Custom Message
                  </h4>

                  <textarea
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    rows="3"
                    placeholder="Write your custom food message..."
                    className="w-full rounded-2xl border border-orange-100 px-5 py-4 outline-none resize-none"
                  />

                  <button
                    type="button"
                    onClick={CustomizeMessage}
                    className="mt-4 w-full py-4 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-700 text-white font-black shadow-xl hover:scale-[1.01] transition"
                  >
                    Send Custom Message
                  </button>
                </div>
              </div>
            </div>
          ) : menunotdefine ? (
            <div className="text-center py-16">
              <div className="text-7xl mb-4">😕</div>
              <h2 className="text-4xl font-black text-red-500">
                Menu Not Defined
              </h2>
              <p className="text-slate-500 mt-3">
                Selected day साठी menu upload केलेला नाही.
              </p>
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-7xl mb-4">🍱</div>
              <h2 className="text-4xl font-black text-slate-900">
                Mess Menu Select Kar
              </h2>
              <p className="text-slate-500 mt-3">
                Day select करून View Mess Menu button click कर.
              </p>
            </div>
          )}
        </div>
      </div>

      {showLiveBox && (
        <div className="fixed inset-0 z-[999999] bg-black/60 backdrop-blur-md flex items-center justify-center px-4">
          <div className="bg-white w-full max-w-md rounded-[35px] shadow-2xl overflow-hidden border border-white">
            <div className="bg-gradient-to-r from-red-500 via-orange-500 to-pink-500 p-7 text-center text-white">
              <div className="w-20 h-20 mx-auto rounded-full bg-white/20 flex items-center justify-center text-5xl shadow-xl">
                🔴
              </div>

              <h2 className="mt-4 text-3xl font-black">Go Live Mess?</h2>

              <p className="mt-2 text-white/90 text-sm">
                Your mess will be visible as live for tiffin users.
              </p>
            </div>

            <div className="p-7">
              <div className="bg-orange-50 border border-orange-100 rounded-3xl p-5 text-center">
                <h3 className="font-black text-slate-900 text-xl">
                  Confirm Live Status
                </h3>

                <p className="text-slate-500 mt-2 text-sm leading-relaxed">
                  एकदा confirm केल्यावर हा mess live होईल आणि users ला active
                  दिसेल.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowLiveBox(false)}
                  className="py-4 rounded-2xl border border-slate-300 font-black text-slate-700 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={LiveMess}
                  className="py-4 rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-black shadow-xl hover:scale-[1.03] active:scale-[0.98] transition"
                >
                  Yes, Go Live
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showPayBox && (
        <div className="fixed inset-0 z-[99999] bg-black/60 backdrop-blur-md flex items-center justify-center px-4">
          <div className="bg-white w-full max-w-5xl rounded-[35px] shadow-2xl overflow-hidden max-h-[95vh] overflow-y-auto">
            <div className="px-6 md:px-8 py-6 border-b border-slate-100 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setShowPayBox(false)}
                className="w-11 h-11 rounded-full border text-2xl hover:bg-slate-50"
              >
                ×
              </button>

              <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-black text-slate-900">
                  Pay Mess Subscription 🛡️
                </h2>
                <p className="text-slate-500">
                  Select plan and confirm subscription
                </p>
              </div>

              <div className="hidden sm:block bg-green-50 text-green-700 border border-green-200 px-4 py-2 rounded-2xl font-black text-sm">
                🛡️ 100% Secure
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="bg-orange-50 border border-orange-100 rounded-3xl p-5 mb-7">
                <p className="text-orange-600 font-black text-sm">
                  Start Date
                </p>
                <h3 className="font-black text-slate-900">{date}</h3>
              </div>

              <div className="grid md:grid-cols-3 gap-5 mb-7">
                {[1, 2, 3].map((month) => (
                  <div
                    key={month}
                    onClick={() => setSubscriptionMonth(month)}
                    className={`cursor-pointer rounded-3xl p-7 text-center border-2 transition ${
                      subscriptionMonth === month
                        ? "border-orange-500 bg-orange-50 shadow-xl scale-[1.02]"
                        : "border-slate-200 bg-white hover:shadow-lg"
                    }`}
                  >
                    <div className="text-5xl">📅</div>

                    <h4 className="text-xl font-black mt-4">
                      {month} Month{month > 1 ? "s" : ""}
                    </h4>

                    <p className="text-3xl font-black text-orange-600 mt-2">
                      ₹{(monthlyPrice * month).toLocaleString("en-IN")}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border border-slate-200 rounded-3xl p-6 mb-5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Joining Date</span>
                  <b>{date}</b>
                </div>

                <div className="flex justify-between mt-3">
                  <span className="text-slate-500">Duration</span>
                  <b>{subscriptionMonth} Month</b>
                </div>

                <div className="border-t border-dashed mt-5 pt-5 flex justify-between items-center">
                  <span className="font-black text-slate-900">
                    Total Amount
                  </span>
                  <b className="text-4xl text-orange-600">
                    ₹{totalAmount.toLocaleString("en-IN")}
                  </b>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setShowPayBox(false)}
                  className="py-5 rounded-2xl border border-slate-300 font-black text-lg hover:bg-slate-50"
                >
                  ← Cancel
                </button>

                <button
                  type="button"
                  onClick={HandleRazorpayPayment}
                  className="py-5 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 text-white font-black text-lg shadow-xl hover:scale-[1.02] transition"
                >
                  🔒 Pay ₹{totalAmount.toLocaleString("en-IN")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MessDetail;
