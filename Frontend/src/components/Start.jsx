import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaCar } from 'react-icons/fa6';
import { RiSteeringFill } from 'react-icons/ri';

const Start = () => {
  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between bg-black text-white overflow-hidden">
      {/* Background with modern overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1557404763-69708cd8b9ce?q=80&w=1964&auto=format&fit=crop)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
      </div>

      {/* Top Header */}
      <div className="relative z-10 pt-8 px-6 flex items-center justify-between">
        <h1 className="text-3xl font-extrabold tracking-tighter text-white">Uber</h1>
        <span className="text-xs uppercase tracking-widest bg-white/15 backdrop-blur-md px-3 py-1 rounded-full text-white/90 font-medium">
          Fast & Reliable
        </span>
      </div>

      {/* Bottom Hero Card */}
      <div className="relative z-10 p-6 pb-8 max-w-md w-full mx-auto">
        <div className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Get moving with Uber
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Always the ride you want. Request a ride, hop in, and go anywhere with ease and safety.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <Link
              to="/login"
              className="flex items-center justify-between w-full bg-white text-black font-semibold text-base py-4 px-6 rounded-2xl shadow-lg hover:bg-gray-100 active:scale-[0.98] transition duration-200"
            >
              <div className="flex items-center gap-3">
                <FaCar className="text-xl" />
                <span>Get a Ride</span>
              </div>
              <FaArrowRight className="text-sm" />
            </Link>

            <Link
              to="/captain-login"
              className="flex items-center justify-between w-full bg-white/10 hover:bg-white/20 text-white font-medium text-base py-4 px-6 rounded-2xl border border-white/20 active:scale-[0.98] transition duration-200"
            >
              <div className="flex items-center gap-3">
                <RiSteeringFill className="text-xl text-emerald-400" />
                <span>Drive with Uber</span>
              </div>
              <FaArrowRight className="text-sm text-gray-400" />
            </Link>
          </div>

          <p className="text-center text-[11px] text-gray-400 pt-2">
            By proceeding, you consent to get calls, WhatsApp or SMS messages from Uber.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Start;