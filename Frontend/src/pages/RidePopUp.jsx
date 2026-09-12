import React from 'react';
import { RiMoneyRupeeCircleLine } from 'react-icons/ri';
import { IoChevronDown } from 'react-icons/io5';
import { FaCircle, FaSquare, FaStar, FaArrowRight } from 'react-icons/fa6';

const RidePopUp = ({ ride, confirmRide, setRidePopupPanel, setConfirmRidePopupPanel }) => {
  const riderName = ride?.user?.fullName
    ? `${ride.user.fullName.firstName} ${ride.user.fullName.lastName || ''}`
    : 'Rider';

  return (
    <div className="space-y-4 max-w-lg mx-auto pb-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <h3 className="text-xl font-bold text-gray-900 tracking-tight">New Ride Request</h3>
        </div>
        <button
          onClick={() => setRidePopupPanel(false)}
          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition"
        >
          <IoChevronDown className="text-lg" />
        </button>
      </div>

      {/* Rider Info Card */}
      <div className="bg-amber-400/20 border border-amber-300 rounded-2xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            className="h-12 w-12 rounded-full object-cover border-2 border-white shadow-sm"
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=250&auto=format&fit=crop"
            alt="Rider"
          />
          <div>
            <h4 className="text-base font-bold text-gray-900">{riderName}</h4>
            <div className="flex items-center gap-1 text-xs text-amber-700 font-semibold">
              <FaStar className="text-[10px]" /> 4.8 Rider Rating
            </div>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs text-gray-600 font-medium block">Pickup</span>
          <span className="text-base font-extrabold text-gray-950">2.2 KM Away</span>
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
              <h4 className="text-sm font-semibold text-gray-900 line-clamp-1">{ride?.pickup || 'Pickup Location'}</h4>
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
              <p className="text-xs text-gray-500 font-medium">Earnings</p>
              <p className="text-xs font-bold text-gray-800">Cash Payment</p>
            </div>
          </div>
          <span className="text-2xl font-black text-emerald-600">
            ₹{ride?.fare ?? '—'}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3 pt-1">
        <button
          onClick={() => setRidePopupPanel(false)}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3.5 px-4 rounded-2xl transition text-sm active:scale-[0.98]"
        >
          Ignore
        </button>

        <button
          onClick={() => {
            setConfirmRidePopupPanel(true);
            confirmRide();
          }}
          className="w-full bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-extrabold py-3.5 px-4 rounded-2xl transition text-sm active:scale-[0.98] shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-1.5"
        >
          <span>Accept Ride</span>
          <FaArrowRight className="text-xs" />
        </button>
      </div>
    </div>
  );
};

export default RidePopUp;