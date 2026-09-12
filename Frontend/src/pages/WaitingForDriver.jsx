import React from 'react';
import { RiMoneyRupeeCircleLine } from 'react-icons/ri';
import { IoChevronDown } from 'react-icons/io5';
import { FaCircle, FaSquare, FaStar, FaPhone, FaShieldHalved } from 'react-icons/fa6';
import { IoChatbubbleEllipses } from 'react-icons/io5';

const WaitingForDriver = ({ ride, setWaitingForDriver }) => {
  const captain = ride?.captain;
  const captainName = captain?.fullName
    ? `${captain.fullName.firstName} ${captain.fullName.lastName || ''}`
    : 'Your Driver';

  return (
    <div className="space-y-4 max-w-lg mx-auto pb-4">
      {/* Top Header with OTP Box */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block">
            Driver on the way
          </span>
          <h3 className="text-xl font-bold text-gray-900 tracking-tight">Meet at pickup point</h3>
        </div>
        
        {ride?.otp && (
          <div className="bg-black text-white px-3.5 py-1.5 rounded-xl text-center shadow-md">
            <span className="text-[10px] uppercase tracking-wider text-gray-400 block font-medium">OTP</span>
            <span className="text-base font-extrabold tracking-widest">{ride.otp}</span>
          </div>
        )}
      </div>

      {/* Driver Profile & Vehicle Card */}
      <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=250&auto=format&fit=crop"
              alt="Driver Avatar"
              className="w-13 h-13 rounded-full object-cover border-2 border-white shadow"
            />
            <div className="absolute -bottom-1 -right-1 bg-amber-400 text-gray-950 font-bold text-[10px] px-1.5 py-0.5 rounded-full flex items-center gap-0.5 shadow-sm">
              <FaStar className="text-[8px]" />
              <span>4.9</span>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 text-base">{captainName}</h4>
            <p className="text-xs text-gray-500 capitalize">
              {captain?.vehicle?.color || 'White'} {captain?.vehicle?.vehicleType || 'Car'}
            </p>
            <span className="inline-block mt-1 bg-gray-200 text-gray-800 text-[11px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
              {captain?.vehicle?.plate || 'MH-01-AB-1234'}
            </span>
          </div>
        </div>

        {/* Quick Contact Actions */}
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-700 flex items-center justify-center hover:bg-gray-100 transition shadow-sm">
            <FaPhone className="text-sm" />
          </button>
          <button className="w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-700 flex items-center justify-center hover:bg-gray-100 transition shadow-sm">
            <IoChatbubbleEllipses className="text-base" />
          </button>
        </div>
      </div>

      {/* Route & Price Summary Box */}
      <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 space-y-3">
        <div className="flex items-start gap-3">
          <div className="mt-1 flex flex-col items-center">
            <FaCircle className="text-[10px] text-emerald-600" />
            <div className="w-0.5 h-7 bg-gray-300 my-0.5" />
            <FaSquare className="text-[10px] text-black" />
          </div>

          <div className="flex-1 space-y-2.5">
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Pickup</p>
              <h4 className="text-sm font-semibold text-gray-900 line-clamp-1">{ride?.pickup || 'Pickup location'}</h4>
            </div>

            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Dropoff</p>
              <h4 className="text-sm font-semibold text-gray-900 line-clamp-1">{ride?.destination || 'Destination'}</h4>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-gray-200/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-base">
              <RiMoneyRupeeCircleLine />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Payment Due</p>
              <p className="text-xs font-bold text-gray-800">Cash Payment</p>
            </div>
          </div>
          <span className="text-xl font-extrabold text-gray-900">
            ₹{ride?.fare ?? '—'}
          </span>
        </div>
      </div>

      {/* Safety Notice */}
      <div className="flex items-center gap-2.5 px-3 py-2 bg-blue-50 border border-blue-100 rounded-xl text-blue-800 text-xs font-medium">
        <FaShieldHalved className="text-sm text-blue-600 shrink-0" />
        <span>Share your trip details with friends and family for safety.</span>
      </div>
    </div>
  );
};

export default WaitingForDriver;