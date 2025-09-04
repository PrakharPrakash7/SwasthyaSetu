import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col md:flex-row items-center justify-between bg-primary rounded-3xl px-6 sm:px-10 md:px-14 lg:px-20 my-20 md:mx-10 overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
      
      {/* Decorative subtle blurred shapes */}
      <div className="absolute top-[-40px] left-[-40px] w-40 h-40 bg-gray-200 rounded-full blur-3xl opacity-40 animate-pulse"></div>
      <div className="absolute bottom-[-60px] right-[-60px] w-52 h-52 bg-gray-100 rounded-full blur-3xl opacity-50 animate-pulse"></div>

      {/* Left side */}
      <div className="flex-1 py-12 sm:py-14 md:py-20 lg:py-24 z-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-yellow-400 leading-tight tracking-tight">
          Book Appointment
        </h2>
    <p className="mt-4 text-gray-100 text-base md:text-lg leading-relaxed max-w-md">
          With the best doctors in your area. Hassle-free scheduling and trusted
          healthcare, right at your fingertips.
        </p>

        <button
          onClick={() => {
            navigate("/login");
            scrollTo(0, 0);
          }}
          className="mt-8 px-8 py-3 rounded-full bg-white text-primary text-sm sm:text-base font-medium shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-transform duration-300"
        >
          Create Account
        </button>
      </div>

      {/* Right side */}
      <div className="hidden md:flex md:w-1/3 lg:w-[280px] justify-end items-end relative z-10">
        <div className="p-3 rounded-2xl shadow-xl bg-white border border-gray-100 transform hover:scale-105 transition-transform duration-500">
          <img
            src={assets.appointment_img}
            alt="Doctor"
            className="w-full max-w-xs rounded-xl drop-shadow-md animate-float"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
