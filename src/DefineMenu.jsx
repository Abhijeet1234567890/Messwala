import React, { useMemo, useState } from "react";

function DefineMenu() {
  const [day, setDay] = useState("");
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [discription, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [selectedMenu, setSelectedMenu] = useState(null);
  const [menuLoading, setMenuLoading] = useState(false);
  const [menuNotFound, setMenuNotFound] = useState(false);

  const [toast, setToast] = useState({ message: "", type: "" });
  const messId = localStorage.getItem("token");

   const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const days = [
    { short: "Mon", full: "Monday" },
    { short: "Tue", full: "Tuesday" },
    { short: "Wed", full: "Wednesday" },
    { short: "Thu", full: "Thursday" },
    { short: "Fri", full: "Friday" },
    { short: "Sat", full: "Saturday" },
    { short: "Sun", full: "Sunday" },
  ];

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "" }), 3000);
  };

  const previewImage = useMemo(() => {
    if (!file) return null;
    return URL.createObjectURL(file);
  }, [file]);

  const checkMenuByDay = async (selectedDay) => {
    setDay(selectedDay);
    setSelectedMenu(null);
    setMenuNotFound(false);

    try {
      setMenuLoading(true);

      const res = await fetch(`${BASE_URL}/checkmenu`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          menu: selectedDay,
          messid: messId,
        }),
      });

      const data = await res.json();

      if (res.ok && data.result && data.result.length > 0) {
        setSelectedMenu(data.result[0]);
        setMenuNotFound(false);
      } else {
        setSelectedMenu(null);
        setMenuNotFound(true);
      }
    } catch (error) {
      console.log(error);
      setSelectedMenu(null);
      setMenuNotFound(true);
    } finally {
      setMenuLoading(false);
    }
  };

  async function DefineMessMenu(e) {
    e.preventDefault();

    if (!name || !file || !day || !discription) {
      return showToast("All fields are required", "error");
    }

    try {
      setIsLoading(true);

      const formdata = new FormData();
      formdata.append("name", name);
      formdata.append("file", file);
      formdata.append("discription", discription);
      formdata.append("day", day);
      formdata.append("messid", messId);

      const res = await fetch(`${BASE_URL}/definemenu`, {
        method: "POST",
        body: formdata,
      });

      const result = await res.json();

      if (!res.ok) {
        return showToast(result.message || "Menu add failed", "error");
      }

      showToast(result.message || "Menu Added Successfully", "success");

      await checkMenuByDay(day);

      setName("");
      setFile(null);
      setDescription("");
    } catch (error) {
      console.log(error);
      showToast("Something went wrong", "error");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 px-4 py-8 relative overflow-hidden">
      {toast.message && (
        <div
          className={`fixed top-5 right-5 z-[9999] px-6 py-4 rounded-2xl shadow-2xl font-black border ${
            toast.type === "success"
              ? "bg-green-50 text-green-700 border-green-200"
              : "bg-red-50 text-red-700 border-red-200"
          }`}
        >
          {toast.type === "success" ? "✅ " : "❌ "}
          {toast.message}
        </div>
      )}

      <div className="absolute -top-32 -left-32 w-96 h-96 bg-orange-300 rounded-full blur-[130px] opacity-40"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-yellow-300 rounded-full blur-[130px] opacity-40"></div>

      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 items-start">
        <div className="bg-white/80 backdrop-blur-xl rounded-[35px] shadow-2xl p-8 border border-orange-100">
          <span className="inline-block px-4 py-2 rounded-full bg-orange-100 text-orange-600 text-sm font-bold mb-4">
            🍽️ Mess Admin Panel
          </span>

          <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
            Define Your <span className="text-orange-500">Mess Menu</span>
          </h1>

          <p className="mt-5 text-gray-600 text-lg leading-relaxed">
            Day select करा. जर menu define असेल तर खाली card मध्ये दिसेल, नसेल
            तर Not Defined card दिसेल.
          </p>

          <div className="mt-10 grid sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-orange-50 border border-orange-100">
              <h3 className="font-bold text-gray-800">📸 Food Images</h3>
              <p className="text-sm text-gray-500 mt-2">
                Upload attractive food photos.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-yellow-50 border border-yellow-100">
              <h3 className="font-bold text-gray-800">📅 Daily Menu</h3>
              <p className="text-sm text-gray-500 mt-2">
                Create menu for every day.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[35px] shadow-2xl border border-gray-100 p-6 md:p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-r from-orange-500 to-yellow-500 mx-auto flex items-center justify-center text-4xl shadow-xl">
              🍲
            </div>

            <h2 className="text-3xl font-black text-gray-900 mt-5">
              Create Mess Menu
            </h2>

            <p className="text-gray-500 mt-2">
              Select day, check menu, then add/update menu details.
            </p>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 mb-6">
            {days.map((item) => (
              <button
                key={item.short}
                type="button"
                onClick={() => checkMenuByDay(item.short)}
                className={`py-3 rounded-xl font-bold transition-all ${
                  day === item.short
                    ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg scale-105"
                    : "bg-gray-100 text-gray-600 hover:bg-orange-100 hover:text-orange-600"
                }`}
              >
                {item.short}
              </button>
            ))}
          </div>

          {day && (
            <div className="mb-6">
              {menuLoading ? (
                <div className="rounded-3xl bg-orange-50 border border-orange-100 p-8 text-center shadow-lg">
                  <div className="text-5xl animate-bounce">🍱</div>
                  <h2 className="text-2xl font-black text-orange-600 mt-3">
                    Checking Menu...
                  </h2>
                </div>
              ) : selectedMenu ? (
                <div className="rounded-[30px] bg-gradient-to-br from-orange-50 to-yellow-50 border border-orange-100 p-5 shadow-xl">
                  <div className="flex flex-col sm:flex-row gap-5 items-center">
                    {selectedMenu.file ? (
                      <img
                        src={`${BASE_URL}/Upload/${selectedMenu.file}`}
                        alt={selectedMenu.name}
                        className="w-full sm:w-40 h-44 object-cover rounded-3xl shadow-lg border-4 border-white"
                      />
                    ) : (
                      <div className="w-full sm:w-40 h-44 rounded-3xl bg-white flex items-center justify-center text-6xl shadow-lg">
                        🍛
                      </div>
                    )}

                    <div className="flex-1 text-center sm:text-left">
                      <span className="inline-flex px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-black mb-3">
                        ✅ Menu Defined
                      </span>

                      <h2 className="text-3xl font-black text-gray-900">
                        {selectedMenu.name || "Food Name"}
                      </h2>

                      <p className="text-gray-600 font-semibold mt-2">
                        {selectedMenu.discription ||
                          selectedMenu.description ||
                          selectedMenu.desciption ||
                          "No description"}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2 justify-center sm:justify-start">
                        <span className="px-4 py-2 rounded-full bg-orange-100 text-orange-600 font-black">
                          📅 {selectedMenu.day || day}
                        </span>

                        <span className="px-4 py-2 rounded-full bg-white text-gray-600 font-black border border-orange-100">
                          Mess Menu Active
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : menuNotFound ? (
                <div className="rounded-[30px] bg-gradient-to-br from-red-50 to-orange-50 border border-red-100 p-8 text-center shadow-xl">
                  <div className="text-7xl mb-3">😕</div>
                  <h2 className="text-3xl font-black text-red-600">
                    Menu Not Defined
                  </h2>
                  <p className="text-red-400 font-semibold mt-2">
                    {day} साठी अजून menu define केलेला नाही.
                  </p>
                </div>
              ) : null}
            </div>
          )}

          {day ? (
            <form onSubmit={DefineMessMenu} className="space-y-5">
              <input
                type="text"
                value={name}
                placeholder="Food Name"
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-orange-100"
              />

              <input
                type="text"
                value={day}
                readOnly
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl bg-gray-50"
              />

              <input
                type="file"
                id="food-image"
                hidden
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
              />

              <label
                htmlFor="food-image"
                className="w-full min-h-28 border-2 border-dashed border-orange-200 bg-orange-50 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:bg-orange-100 transition"
              >
                <span className="text-4xl">📸</span>
                <span className="font-bold text-orange-600 mt-2">
                  {file ? file.name : "Click To Upload"}
                </span>
              </label>

              {previewImage && (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-full h-64 object-cover rounded-3xl shadow-lg"
                />
              )}

              <textarea
                value={discription}
                maxLength={250}
                placeholder="Food description..."
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-orange-100 min-h-32 resize-none"
              ></textarea>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-extrabold shadow-xl hover:scale-[1.02] transition disabled:opacity-60"
              >
                {isLoading ? "Submitting..." : "🚀 Submit Menu"}
              </button>
            </form>
          ) : (
            <div className="p-10 text-center rounded-3xl bg-gray-50 border border-dashed border-gray-300">
              <div className="text-5xl">📅</div>
              <p className="text-gray-500 font-semibold mt-4">
                Please select a day to define menu
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DefineMenu;
