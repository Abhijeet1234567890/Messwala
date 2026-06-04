import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function MesswalaRegister() {

  const [price,setprice]=useState("")
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    pass: "",
    city: "",
    village: "",
    gender: "",
    type: "",
    id: "",
    price:""
  });

  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [toast, setToast] = useState({
    show: false,
    type: "",
    message: "",
  });

  const navigate = useNavigate();

  const showToast = (type, message) => {
    setToast({ show: true, type, message });

    setTimeout(() => {
      setToast({ show: false, type: "", message: "" });
    }, 2500);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileUpload = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formDataToSend = new FormData();

    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    files.forEach((file) => {
      formDataToSend.append("files", file);
    });

    try {
      const result = await fetch("http://localhost:2000/messregister", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await result.json();

      if (result.ok && data) {
        showToast("success", "Registration successful! Please login now.");

        setFormData({
          name: "",
          surname: "",
          email: "",
          pass: "",
          city: "",
          village: "",
          gender: "",
          type: "",
          id: "",
          price:""
        });

        setFiles([]);

        setTimeout(() => {
          navigate("/messlogin");
        }, 1200);
      } else {
        showToast("error", "Registration failed. Please check details.");
      }
    } catch (error) {
      console.log(error);
      showToast("error", "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass =
    "w-full px-5 py-4 rounded-2xl bg-[#fff8f3] border border-orange-100 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-300 transition";

  return (
    <div className="min-h-screen bg-[#fff8f3] overflow-hidden py-12 px-4 relative">

      {/* Premium Toast */}
      {toast.show && (
        <div className="fixed top-6 right-6 z-[9999] animate-[slideIn_0.3s_ease-out]">
          <div
            className={`flex items-center gap-4 px-6 py-4 rounded-2xl shadow-2xl border backdrop-blur-xl ${
              toast.type === "success"
                ? "bg-green-50/95 border-green-200 text-green-700"
                : "bg-red-50/95 border-red-200 text-red-700"
            }`}
          >
            <div
              className={`w-11 h-11 rounded-2xl flex items-center justify-center text-2xl ${
                toast.type === "success" ? "bg-green-100" : "bg-red-100"
              }`}
            >
              {toast.type === "success" ? "✅" : "❌"}
            </div>

            <div>
              <h3 className="font-black text-base">
                {toast.type === "success" ? "Success" : "Error"}
              </h3>
              <p className="text-sm font-medium">{toast.message}</p>
            </div>
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateX(40px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}
      </style>

      <div className="absolute top-0 left-0 w-72 h-72 bg-orange-300 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-300 rounded-full blur-3xl opacity-30"></div>

      <div className="relative max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center">

        {/* LEFT DESIGN */}
        <div className="hidden lg:block">
          <span className="inline-block px-5 py-2 rounded-full bg-orange-100 text-orange-600 font-bold mb-6">
            MESS OWNER REGISTER
          </span>

          <h1 className="text-6xl font-black text-gray-900 leading-tight mb-6">
            Grow Your{" "}
            <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              Mess Business
            </span>
          </h1>

          <p className="text-gray-600 text-xl leading-relaxed mb-8">
            Register your mess on MessFinder and reach students, bachelors and
            working professionals near your location.
          </p>

          <div className="space-y-5">
            {[
              {
                icon: "🍱",
                title: "Show Your Mess",
                text: "Upload mess images and details easily.",
              },
              {
                icon: "📍",
                title: "Reach Local Users",
                text: "Customers can find you by city and area.",
              },
              {
                icon: "🚀",
                title: "Grow Fast",
                text: "Start getting more visibility online.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-5 shadow-xl border border-orange-100 flex gap-4 items-start"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center text-2xl">
                  {item.icon}
                </div>

                <div>
                  <h3 className="text-xl font-black text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-gray-500">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FORM CARD */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-400 rounded-[45px] blur-3xl opacity-25"></div>

          <div className="relative bg-white rounded-[45px] p-6 sm:p-8 md:p-10 shadow-2xl border border-orange-100">

            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center text-4xl shadow-xl mb-5">
                🍱
              </div>

              <h1 className="text-4xl font-black text-gray-900">
                Mess Register
              </h1>

              <p className="text-gray-500 mt-2">
                Create your mess account and start serving users
              </p>

              <div className="w-24 h-2 bg-gradient-to-r from-orange-500 to-pink-500 mx-auto mt-5 rounded-full"></div>
            </div>

            <form onSubmit={handleRegister} className="space-y-5">

              <div className="grid md:grid-cols-2 gap-5">
                <input
                  type="text"
                  name="id"
                  placeholder="Mess ID"
                  value={formData.id}
                  onChange={handleInputChange}
                  required
                  className={inputClass}
                />

                <input
                  type="text"
                  name="name"
                  placeholder="First Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className={inputClass}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <input
                  type="text"
                  name="surname"
                  placeholder="Last Name"
                  value={formData.surname}
                  onChange={handleInputChange}
                  required
                  className={inputClass}
                />



                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className={inputClass}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <input
                  type="password"
                  name="pass"
                  placeholder="Password"
                  value={formData.pass}
                  onChange={handleInputChange}
                  required
                  className={inputClass}
                />

                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className={inputClass}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <input
                  type="text"
                  name="village"
                  placeholder="Village Optional"
                  value={formData.village}
                  onChange={handleInputChange}
                  className={inputClass}
                />

                <input type="text" placeholder=" Enter Montholy Price Of Mess" onChange={(e)=>setprice(e.target.value)} />

                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                  className={inputClass}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                  className={inputClass}
                >
                  <option value="">Veg / Non-Veg</option>
                  <option value="veg">Veg</option>
                  <option value="nonveg">Non-Veg</option>
                  <option value="both">Both</option>
                </select>

                <div>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    required
                    className="hidden"
                    id="file-input"
                  />

                  <label
                    htmlFor="file-input"
                    className="w-full px-5 py-4 rounded-2xl bg-gradient-to-r from-orange-50 to-pink-50 border border-orange-200 text-gray-700 font-bold cursor-pointer hover:ring-2 hover:ring-orange-300 transition flex items-center justify-center gap-2"
                  >
                    📁{" "}
                    {files.length > 0
                      ? `${files.length} files selected`
                      : "Upload Images"}
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 text-white font-black text-lg shadow-xl hover:scale-105 transition duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? "Registering..." : "Register Now 🚀"}
              </button>

            </form>

            <p className="text-center text-gray-500 mt-7">
              Already registered?{" "}
              <Link
                to="/messlogin"
                className="text-orange-500 hover:text-pink-500 font-black"
              >
                Login here
              </Link>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}

export default MesswalaRegister;