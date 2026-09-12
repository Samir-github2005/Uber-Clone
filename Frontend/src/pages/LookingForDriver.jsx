import React from 'react';
import { RiMoneyRupeeCircleLine, RiTaxiLine } from 'react-icons/ri';
import { IoChevronDown } from 'react-icons/io5';
import { FaCircle, FaSquare, FaCar, FaMotorcycle } from 'react-icons/fa6';

const LookingForDriver = ({
  pickup,
  destination,
  fare = {},
  vehicleType,
  setVehicleFound,
}) => {
  const vehicleIcons = {
    car: <FaCar className="text-3xl text-blue-600" />,
    motorcycle: <FaMotorcycle className="text-3xl text-amber-600" />,
    auto: <RiTaxiLine className="text-3xl text-emerald-600" />,
  };

  return (
    <div className="space-y-4 max-w-lg mx-auto pb-4">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-900 tracking-tight">Looking for nearby drivers</h3>
        <button
          onClick={() => setVehicleFound(false)}
          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition"
        >
          <IoChevronDown className="text-lg" />
        </button>
      </div>

      {/* Radar Search Animation */}
      <div className="relative flex flex-col items-center justify-center py-6">
        <div className="relative flex items-center justify-center w-24 h-24">
          <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping" />
          <div className="absolute inset-2 rounded-full bg-blue-500/30 animate-pulse" />
          <div className="relative z-10 w-14 h-14 bg-white rounded-2xl shadow-md border border-gray-100 flex items-center justify-center">
            {vehicleIcons[vehicleType] || vehicleIcons.car}
          </div>
        </div>
        <p className="text-xs font-semibold text-blue-600 mt-4 tracking-wide uppercase animate-pulse">
          Connecting to captains near you...
        </p>
      </div>

      {/* Route & Price Summary Box */}
      <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 space-y-4">
        <div className="flex items-start gap-3">
          <div className="mt-1 flex flex-col items-center">
            <FaCircle className="text-[10px] text-emerald-600" />
            <div className="w-0.5 h-7 bg-gray-300 my-0.5" />
            <FaSquare className="text-[10px] text-black" />
          </div>

          <div className="flex-1 space-y-3">
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Pickup</p>
              <h4 className="text-sm font-semibold text-gray-900 line-clamp-1">{pickup || 'Pickup location'}</h4>
            </div>

            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Dropoff</p>
              <h4 className="text-sm font-semibold text-gray-900 line-clamp-1">{destination || 'Destination'}</h4>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-gray-200/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-base">
              <RiMoneyRupeeCircleLine />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Estimated Price</p>
              <p className="text-xs font-bold text-gray-800">Cash on arrival</p>
            </div>
          </div>
          <span className="text-xl font-extrabold text-gray-900">
            ₹{fare[vehicleType] ?? '—'}
          </span>
        </div>
      </div>

      {/* Cancel Search Button */}
      <button
        onClick={() => setVehicleFound(false)}
        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3.5 px-4 rounded-2xl transition text-sm"
      >
        Cancel Search
      </button>
    </div>
  );
};

export default LookingForDriver;