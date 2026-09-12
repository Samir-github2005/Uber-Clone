import React from 'react';
import { RiMoneyRupeeCircleLine, RiTaxiLine } from 'react-icons/ri';
import { IoChevronDown } from 'react-icons/io5';
import { FaCircle, FaSquare, FaCar, FaMotorcycle } from 'react-icons/fa6';

const ConfirmedRide = ({
  pickup,
  destination,
  fare = {},
  vehicleType,
  createRide,
  setConfirmRidePanel,
  setVehicleFound,
}) => {
  const vehicleIcons = {
    car: <FaCar className="text-4xl text-blue-600" />,
    motorcycle: <FaMotorcycle className="text-4xl text-amber-600" />,
    auto: <RiTaxiLine className="text-4xl text-emerald-600" />,
  };

  const vehicleTitles = {
    car: 'Uber Go',
    motorcycle: 'Uber Moto',
    auto: 'Uber Auto',
  };

  return (
    <div className="space-y-4 max-w-lg mx-auto pb-4">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-900 tracking-tight">Confirm your ride</h3>
        <button
          onClick={() => setConfirmRidePanel(false)}
          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition"
        >
          <IoChevronDown className="text-lg" />
        </button>
      </div>

      {/* Vehicle Hero Graphic */}
      <div className="flex items-center justify-center py-4 bg-gray-50 rounded-2xl border border-gray-100">
        <div className="flex flex-col items-center gap-1.5">
          {vehicleIcons[vehicleType] || vehicleIcons.car}
          <span className="text-xs font-bold text-gray-700">{vehicleTitles[vehicleType] || 'Ride'}</span>
        </div>
      </div>

      {/* Route & Price Summary Box */}
      <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 space-y-4">
        {/* Pickup Location */}
        <div className="flex items-start gap-3">
          <div className="mt-1 flex flex-col items-center">
            <FaCircle className="text-[10px] text-emerald-600" />
            <div className="w-0.5 h-7 bg-gray-300 my-0.5" />
            <FaSquare className="text-[10px] text-black" />
          </div>

          <div className="flex-1 space-y-3">
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Pickup Location</p>
              <h4 className="text-sm font-semibold text-gray-900 line-clamp-1">{pickup || 'Current location'}</h4>
            </div>

            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Destination</p>
              <h4 className="text-sm font-semibold text-gray-900 line-clamp-1">{destination || 'Selected destination'}</h4>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-gray-200/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-base">
              <RiMoneyRupeeCircleLine />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Payment</p>
              <p className="text-xs font-bold text-gray-800">Cash Payment</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs text-gray-400 block">Total Fare</span>
            <span className="text-xl font-extrabold text-gray-900">
              ₹{fare[vehicleType] ?? '—'}
            </span>
          </div>
        </div>
      </div>

      {/* Confirm Button */}
      <button
        onClick={() => {
          setVehicleFound(true);
          setConfirmRidePanel(false);
          createRide();
        }}
        className="w-full bg-black hover:bg-gray-900 text-white font-bold py-4 px-6 rounded-2xl shadow-xl active:scale-[0.98] transition flex items-center justify-center gap-2 text-base"
      >
        <span>Confirm {vehicleTitles[vehicleType] || 'Ride'}</span>
      </button>
    </div>
  );
};

export default ConfirmedRide;