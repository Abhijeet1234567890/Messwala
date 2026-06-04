import React, { useMemo, useState } from "react";

function AddInstanceFood() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
  });

  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");
  const messid = token ? JSON.parse(token) : null;

  const imagePreview = useMemo(() => {
    if (!file) return null;
    return URL.createObjectURL(file);
  }, [file]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("image/")) {
      setMessage("✗ Please upload only image file");
      return;
    }

    setFile(selectedFile);
    setMessage("");
  };

  const handleAddFood = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!formData.name || !formData.price || !formData.description || !file) {
      return setMessage("✗ All fields are required");
    }

    if (Number(formData.price) <= 0) {
      return setMessage("✗ Price must be greater than 0");
    }

    try {
      setIsLoading(true);

      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("file", file);
      formDataToSend.append("messid", messid);

      const result = await fetch("http://localhost:2000/addinstance", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await result.json();

      if (!result.ok) {
        throw new Error(data.message || "Failed to add food item");
      }

      setMessage("✓ Food item added successfully!");
      setFormData({ name: "", price: "", description: "" });
      setFile(null);
    } catch (error) {
      console.error("Error:", error);
      setMessage(`✗ ${error.message || "Failed to add food item. Try again."}`);
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 bg-white/90 border border-orange-100 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition shadow-sm";

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 px-4 py-8">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-start">
        
        {/* Left Premium Info Section */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-orange-100 p-8">
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-orange-100 text-orange-600 text-sm font-bold">
            🍽️ Instant Food Management
          </span>

          <h1 className="mt-5 text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Add Instant <span className="text-orange-500">Food Items</span>
          </h1>

          <p className="mt-4 text-gray-600 text-lg">
            Add quick food items with price, image and description. These items can be shown instantly to customers or students.
          </p>

          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-orange-50 border border-orange-100">
              <h3 className="font-bold text-gray-800">📸 Food Image</h3>
              <p className="text-sm text-gray-500 mt-1">
                Upload clear and attractive food photo.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-yellow-50 border border-yellow-100">
              <h3 className="font-bold text-gray-800">₹ Price</h3>
              <p className="text-sm text-gray-500 mt-1">
                Add correct price for instant order.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-green-50 border border-green-100">
              <h3 className="font-bold text-gray-800">📝 Description</h3>
              <p className="text-sm text-gray-500 mt-1">
                Mention ingredients, quantity or special taste.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-blue-50 border border-blue-100">
              <h3 className="font-bold text-gray-800">⚡ Quick Add</h3>
              <p className="text-sm text-gray-500 mt-1">
                Add food item fast with premium UI.
              </p>
            </div>
          </div>

          <div className="mt-8 p-5 rounded-2xl bg-gray-900 text-white">
            <h3 className="font-bold text-lg">Best Practice</h3>
            <p className="text-sm text-gray-300 mt-2">
              Food name short ठेवा, image clear ठेवा आणि description मध्ये quantity + special item लिहा.
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 md:p-8">
          <div className="text-center mb-7">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r from-orange-500 to-yellow-500 flex items-center justify-center text-3xl shadow-lg">
              🍲
            </div>

            <h2 className="mt-4 text-3xl font-extrabold text-gray-900">
              Add Food Item
            </h2>

            <p className="text-gray-500 mt-1">
              Fill details and upload food image
            </p>
          </div>

          <form onSubmit={handleAddFood} className="space-y-5">
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Food Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Example: Paneer Roll"
                value={formData.name}
                onChange={handleInputChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Price
              </label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-gray-500 font-bold">
                  ₹
                </span>
                <input
                  type="number"
                  name="price"
                  placeholder="Enter price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className={`${inputClass} pl-9`}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Food Description
              </label>
              <textarea
                name="description"
                placeholder="Example: Fresh paneer roll with spicy chutney and salad."
                value={formData.description}
                onChange={handleInputChange}
                maxLength={250}
                rows="4"
                className={`${inputClass} resize-none`}
              ></textarea>

              <p className="text-right text-sm text-gray-400 mt-1">
                {formData.description.length}/250
              </p>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Upload Image
              </label>

              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="food-image"
                accept="image/*"
              />

              <label
                htmlFor="food-image"
                className="w-full min-h-28 px-4 py-5 bg-orange-50 border-2 border-dashed border-orange-200 rounded-2xl text-orange-600 cursor-pointer hover:bg-orange-100 transition flex flex-col items-center justify-center gap-2"
              >
                <span className="text-3xl">📸</span>
                <span className="font-bold">
                  {file ? file.name : "Click to upload food image"}
                </span>
                <span className="text-xs text-orange-400">
                  PNG, JPG, JPEG supported
                </span>
              </label>
            </div>

            {imagePreview && (
              <div className="rounded-3xl overflow-hidden border border-orange-100 shadow-lg">
                <img
                  src={imagePreview}
                  alt="Food Preview"
                  className="w-full h-64 object-cover"
                />

                <div className="p-4 bg-white">
                  <h3 className="font-bold text-gray-900">
                    {formData.name || "Food Name"}
                  </h3>

                  <p className="text-orange-600 font-bold">
                    ₹{formData.price || "0"}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    {formData.description || "Food description will appear here."}
                  </p>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-extrabold shadow-lg hover:shadow-orange-300 hover:scale-[1.01] transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? "Adding Food..." : "Add Food Item"}
            </button>
          </form>

          {message && (
            <div
              className={`mt-6 p-4 rounded-2xl text-center font-bold ${
                message.includes("✓")
                  ? "bg-green-50 border border-green-200 text-green-600"
                  : "bg-red-50 border border-red-200 text-red-600"
              }`}
            >
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddInstanceFood;