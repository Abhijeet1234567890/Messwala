import React, { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#fff8f3] overflow-hidden">

      {/* HERO SECTION */}
      <section className="relative px-4 py-20">

        <div className="absolute top-0 left-0 w-72 h-72 bg-orange-300 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute top-20 right-0 w-72 h-72 bg-pink-300 rounded-full blur-3xl opacity-30"></div>

        <div className="relative max-w-7xl mx-auto text-center">

          <span className="inline-block px-5 py-2 rounded-full bg-orange-100 text-orange-600 font-bold text-sm mb-6">
            CONTACT US
          </span>

          <h1 className="text-4xl md:text-7xl font-black text-gray-900 mb-6">
            Get In{" "}
            <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              Touch
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-gray-600 text-lg md:text-xl leading-relaxed">
            Have a question about MessFinder? Send us a message and we will
            contact you soon.
          </p>

        </div>

      </section>

      {/* INFO CARDS */}
      <section className="max-w-7xl mx-auto px-4 pb-12">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white rounded-[30px] p-8 shadow-xl border border-orange-100 text-center hover:-translate-y-2 transition duration-300">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-orange-100 flex items-center justify-center text-3xl mb-5">
              📍
            </div>

            <h3 className="text-2xl font-black text-gray-900 mb-2">
              Location
            </h3>

            <p className="text-gray-500 font-medium">
              Multiple Cities Across India
            </p>
          </div>

          <div className="bg-white rounded-[30px] p-8 shadow-xl border border-pink-100 text-center hover:-translate-y-2 transition duration-300">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-pink-100 flex items-center justify-center text-3xl mb-5">
              📧
            </div>

            <h3 className="text-2xl font-black text-gray-900 mb-2">
              Email
            </h3>

            <p className="text-gray-500 font-medium">
              gajadhanetathaget@gmail.com
            </p>
          </div>

          <div className="bg-white rounded-[30px] p-8 shadow-xl border border-yellow-100 text-center hover:-translate-y-2 transition duration-300">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-yellow-100 flex items-center justify-center text-3xl mb-5">
              📞
            </div>

            <h3 className="text-2xl font-black text-gray-900 mb-2">
              Phone
            </h3>

            <p className="text-gray-500 font-medium">
              +91 9422647642
            </p>
          </div>

        </div>

      </section>

      {/* CONTACT FORM SECTION */}
      <section className="max-w-7xl mx-auto px-4 pb-24">

        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* LEFT CONTENT */}
          <div className="relative">

            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-400 rounded-[45px] blur-3xl opacity-25"></div>

            <div className="relative bg-white rounded-[45px] p-8 md:p-10 shadow-2xl border border-orange-100">

              <h2 className="text-4xl font-black text-gray-900 mb-5">
                Let’s Talk About Food 🍱
              </h2>

              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Whether you are a student looking for daily meals or a mess
                owner wanting to grow your business, MessFinder is here to help.
              </p>

              <div className="space-y-5">

                <div className="flex items-start gap-4 bg-[#fff8f3] rounded-2xl p-5 border border-orange-100">
                  <div className="text-3xl">✅</div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Quick Support
                    </h3>
                    <p className="text-gray-500">
                      We reply to your query as soon as possible.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-[#fff8f3] rounded-2xl p-5 border border-orange-100">
                  <div className="text-3xl">🚀</div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Grow Your Business
                    </h3>
                    <p className="text-gray-500">
                      Mess and tiffin providers can reach more customers.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-[#fff8f3] rounded-2xl p-5 border border-orange-100">
                  <div className="text-3xl">🍽️</div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Find Better Meals
                    </h3>
                    <p className="text-gray-500">
                      Users can discover trusted food services nearby.
                    </p>
                  </div>
                </div>

              </div>

            </div>

          </div>

          {/* RIGHT FORM */}
          <div className="bg-white rounded-[45px] p-8 md:p-10 shadow-2xl border border-orange-100">

            <h2 className="text-3xl font-black text-gray-900 mb-2">
              Send Message
            </h2>

            <p className="text-gray-500 mb-8">
              Fill the form below and we will contact you.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">

              <div className="grid md:grid-cols-2 gap-5">

                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 rounded-2xl bg-[#fff8f3] border border-orange-100 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 rounded-2xl bg-[#fff8f3] border border-orange-100 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />

              </div>

              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-5 py-4 rounded-2xl bg-[#fff8f3] border border-orange-100 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />

              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                className="w-full px-5 py-4 rounded-2xl bg-[#fff8f3] border border-orange-100 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
              ></textarea>

              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 text-white font-black text-lg shadow-xl hover:scale-105 transition duration-300"
              >
                Send Message 🚀
              </button>

            </form>

            {submitted && (
              <div className="mt-6 p-4 rounded-2xl bg-green-50 border border-green-200 text-green-600 text-center font-bold">
                ✓ Message sent successfully! We'll get back to you soon.
              </div>
            )}

          </div>

        </div>

      </section>

    </div>
  );
}

export default Contact;