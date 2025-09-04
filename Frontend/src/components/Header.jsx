import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
  return (
    <section className="relative flex flex-col items-center justify-center text-center px-6 md:px-12 lg:px-20 py-16 md:py-24 bg-gradient-to-b from-primary/90 to-blue-700/90 rounded-3xl overflow-hidden shadow-xl">

      {/* Decorative blobs */}
      <div className="absolute top-[-80px] left-[-80px] w-72 h-72 bg-blue-400/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

      {/* Text Section */}
      <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-white drop-shadow-lg">
        Your Health, <br />
        <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
          Our Priority
        </span>
      </h1>

      <p className="mt-6 max-w-2xl text-base md:text-lg text-white/80 leading-relaxed">
        Book appointments with trusted doctors from the comfort of your home.
        Hassle-free scheduling, verified specialists, and quality care at your fingertips.
      </p>

      {/* Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <a
          href="#speciality"
          className="px-8 py-3 rounded-full bg-white text-gray-800 font-medium text-sm md:text-base shadow-md hover:shadow-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 active:scale-95"
        >
          Book Appointment
        </a>
       
      </div>

      {/* Doctor Image */}
      <div className="mt-12 relative">
        <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl shadow-2xl">
          <img
            src={assets.header_img}
            alt="Doctor"
            className="w-full max-w-md rounded-2xl drop-shadow-lg animate-float"
          />
        </div>
      </div>
    </section>
  );
};

export default Header;
