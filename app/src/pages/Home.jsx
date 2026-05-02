import { Link } from "react-router-dom";

function Home() {

  return (

    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-black to-[#020617] text-white overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-indigo-600/20 blur-[140px] rounded-full pointer-events-none" />

      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-pink-600/20 blur-[140px] rounded-full pointer-events-none" />


      {/* HEADER */}
      <header className="relative z-10 flex items-center justify-between px-6 md:px-12 py-6 border-b border-white/10 backdrop-blur-md">

        {/* LOGO */}
        <div>
          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-indigo-300 to-pink-500 bg-clip-text text-transparent">
            REPAIRO
          </h1>

          <p className="text-gray-400 text-sm md:text-base">
            Smart Repair Management
          </p>
        </div>


        {/* BUTTONS */}
        <div className="flex items-center gap-4">

          <Link
            to="/login"
            className="px-5 py-2 rounded-xl border border-white/10 bg-white/10 hover:bg-white/20 transition-all"
          >
            Sign In
          </Link>

          <Link
            to="/signup"
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 hover:scale-105 transition-all"
          >
            Sign Up
          </Link>

        </div>

      </header>


      {/* HERO SECTION */}
      <section className="relative z-10 px-6 md:px-16 py-20 grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT */}
        <div>

          <h2 className="text-5xl md:text-7xl font-black leading-tight mb-8">
            Quick <span className="bg-gradient-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent">Repair</span> Service
          </h2>

          <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-xl">
            REPAIRO helps users connect with trusted repair shops and delivery agents for a smooth and professional repair experience.
            Track repairs in real time, approve service costs instantly, and manage everything from pickup to delivery in one place.
          </p>


          <div className="flex flex-wrap gap-4">

            <Link
              to="/signup"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-pink-500 text-lg font-semibold hover:scale-105 transition-all shadow-xl"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="px-8 py-4 rounded-2xl border border-white/10 bg-white/10 hover:bg-white/20 transition-all text-lg"
            >
              Login
            </Link>

          </div>

        </div>


        {/* RIGHT */}
        <div className="grid grid-cols-2 gap-5">

          <img
            src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=1200&auto=format&fit=crop"
            alt="repair"
            className="rounded-3xl h-[260px] w-full object-cover border border-white/10 shadow-2xl"
          />

          <img
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop"
            alt="electronics"
            className="rounded-3xl h-[260px] w-full object-cover border border-white/10 shadow-2xl mt-10"
          />

          <img
            src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1200&auto=format&fit=crop"
            alt="service"
            className="rounded-3xl h-[260px] w-full object-cover border border-white/10 shadow-2xl -mt-6"
          />

          <img
            src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=1200&auto=format&fit=crop"
            alt="laptop repair"
            className="rounded-3xl h-[260px] w-full object-cover border border-white/10 shadow-2xl"
          />

        </div>

      </section>


      {/* FEATURES */}
      <section className="relative z-10 px-6 md:px-16 pb-20">

        <div className="grid md:grid-cols-3 gap-8">

          <div className="p-8 rounded-3xl bg-white/[0.05] border border-white/10 backdrop-blur-xl">
            <h3 className="text-2xl font-bold mb-4 text-indigo-300">
              Fast Pickup
            </h3>

            <p className="text-gray-400 leading-relaxed">
              Assign delivery agents instantly and track pickup status live.
            </p>
          </div>


          <div className="p-8 rounded-3xl bg-white/[0.05] border border-white/10 backdrop-blur-xl">
            <h3 className="text-2xl font-bold mb-4 text-pink-300">
              Real Time Tracking
            </h3>

            <p className="text-gray-400 leading-relaxed">
              Users can monitor every stage of repair from diagnosis to completion.
            </p>
          </div>


          <div className="p-8 rounded-3xl bg-white/[0.05] border border-white/10 backdrop-blur-xl">
            <h3 className="text-2xl font-bold mb-4 text-green-300">
              Secure Workflow
            </h3>

            <p className="text-gray-400 leading-relaxed">
              Smooth coordination between users, shops, and agents without confusion.
            </p>
          </div>

        </div>

      </section>


      {/* CONTACT SECTION */}
      <footer className="relative z-10 border-t border-white/10 bg-black/30 backdrop-blur-xl px-6 md:px-16 py-20">

        <div className="grid lg:grid-cols-2 gap-16">

          {/* LEFT */}
          <div>

            <h2 className="text-4xl font-black mb-8 bg-gradient-to-r from-indigo-300 to-pink-500 bg-clip-text text-transparent">
              Contact Us
            </h2>

            <div className="space-y-6 text-gray-300 text-lg">

              <p>
                📞 7873235641
              </p>

              <p>
                📧 debadattamalla@hotmail.com <br /> <p className="ml-[1.5vw]">contact@repairo.com </p>
              </p>

              <p>
                📍 Jatani, Bhubaneswar
              </p>

            </div>

          </div>


          {/* RIGHT */}
          <div className="p-8 rounded-3xl bg-white/[0.05] border border-white/10 backdrop-blur-xl">

            <h3 className="text-3xl font-bold mb-8">
              Submit Your Query
            </h3>


            <form className="space-y-5">

              {/* NAME */}
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 outline-none text-white placeholder-gray-500 focus:border-indigo-500"
              />


              {/* EMAIL */}
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 outline-none text-white placeholder-gray-500 focus:border-indigo-500"
              />


              {/* DESCRIPTION */}
              <textarea
                rows="5"
                placeholder="Describe your issue or query"
                className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 outline-none text-white placeholder-gray-500 focus:border-indigo-500 resize-none"
              />


              {/* BUTTON */}
              <button
                type="button"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-pink-500 font-semibold text-lg hover:scale-[1.02] transition-all"
              >
                Submit Query
              </button>

            </form>

          </div>

        </div>


        {/* COPYRIGHT */}
        <div className="mt-20 border-t border-white/10 pt-8 text-center text-gray-500">
          © 2026 REPAIRO All Rights Reserved 
        </div>

      </footer>

    </div>
  );
}

export default Home;