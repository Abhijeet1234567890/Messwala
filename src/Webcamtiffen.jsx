import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

function Webcamtiffen() {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState("");
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const captureImage = useCallback(() => {
    const screenshot = webcamRef.current?.getScreenshot();
    if (screenshot) {
      setImage(screenshot);
      setMessage("");
    }
  }, []);

  const sendImage = async (e) => {
    e.preventDefault();

    if (!image) {
      setMessage("Please capture photo first.");
      return;
    }

    try {
      setIsUploading(true);
      setMessage("");

      const formdata = new FormData();
      formdata.append("image", image);

      const result = await fetch(`${BASE_URL}/webcam`, {
        method: "POST",
        body: formdata,
      });

      if (!result.ok) {
        setMessage("Image upload failed.");
        return;
      }

      setMessage("Image uploaded successfully.");
    } catch (error) {
      console.log(error);
      setMessage("Server error.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fff8f3] px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <span className="inline-block px-5 py-2 rounded-full bg-orange-100 text-orange-600 font-black mb-4">
            Tiffin Camera
          </span>

          <h1 className="text-4xl md:text-5xl font-black text-gray-900">
            Capture Profile Photo
          </h1>
        </div>

        <form
          onSubmit={sendImage}
          className="bg-white rounded-[30px] p-5 md:p-7 shadow-2xl border border-orange-100"
        >
          <div className="grid md:grid-cols-2 gap-6 items-start">
            <div className="overflow-hidden rounded-3xl bg-gray-100 border border-orange-100">
              <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/jpeg"
                videoConstraints={{ facingMode: "user" }}
                className="w-full aspect-square object-cover"
              />
            </div>

            <div>
              <div className="overflow-hidden rounded-3xl bg-orange-50 border border-orange-100 aspect-square flex items-center justify-center">
                {image ? (
                  <img
                    src={image}
                    alt="Captured"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <p className="text-gray-500 font-bold">No photo captured</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 mt-5">
                <button
                  type="button"
                  onClick={captureImage}
                  className="py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 text-white font-black shadow-lg hover:scale-[1.02] transition"
                >
                  Capture
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setImage(null);
                    setMessage("");
                  }}
                  className="py-4 rounded-2xl bg-gray-100 text-gray-700 font-black border border-gray-200 hover:bg-gray-200 transition"
                >
                  Clear
                </button>
              </div>

              <button
                type="submit"
                disabled={!image || isUploading}
                className="w-full mt-3 py-4 rounded-2xl bg-slate-900 text-white font-black shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading ? "Uploading..." : "Send Photo"}
              </button>

              {message && (
                <p className="mt-3 text-center text-sm font-bold text-gray-600">
                  {message}
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Webcamtiffen;
