import React, { useContext } from 'react';
import { IoIosTimer, IoIosSpeedometer } from 'react-icons/io';
import { TbNotes } from 'react-icons/tb';
import { FaStar, FaCircle, FaCar, FaIdCard } from 'react-icons/fa6';
import { HiOutlineMail } from 'react-icons/hi';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainDetails = ({ captain: propCaptain }) => {
  const context = useContext(CaptainDataContext);
  const captain = propCaptain || context?.captain;

  const captainName = captain?.fullName
    ? `${captain.fullName.firstName} ${captain.fullName.lastName || ''}`
    : 'Captain Driver';

  const vehicleTypeMap = {
    car: 'Uber Go (Car)',
    auto: 'Uber Auto',
    moto: 'Uber Moto',
    motorcycle: 'Uber Moto',
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-2xl border border-gray-100 space-y-4 max-w-xl mx-auto w-full overflow-y-auto max-h-[42vh]">
      {/* Driver Header */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-3.5">
        <div className="flex items-center gap-3.5">
          <div className="relative">
            <img
              className="h-14 w-14 rounded-2xl object-cover border-2 border-emerald-500/30 shadow-sm"
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=250&auto=format&fit=crop"
              alt="Captain"
            />
            <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-1 shadow">
              <FaCircle className="text-[5px] text-white animate-pulse" />
              <span>Active</span>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-extrabold text-gray-950 tracking-tight">{captainName}</h4>
            <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
              <span className="flex items-center gap-1 text-amber-500 font-bold">
                <FaStar className="text-[10px]" /> 4.95
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-gray-600">
                <HiOutlineMail className="text-sm" />
                <span>{captain?.email || 'driver@uber.com'}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Today's Earnings */}
        <div className="text-right">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Today's Earnings</span>
          <h3 className="text-2xl font-black text-gray-950 tracking-tight">₹1,840</h3>
        </div>
      </div>

      {/* Vehicle Info Badge Row */}
      <div className="bg-gray-50 border border-gray-100 rounded-2xl p-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-lg shrink-0">
            <FaCar />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-900">
              {vehicleTypeMap[captain?.vehicle?.vehicleType] || captain?.vehicle?.vehicleType || 'Uber Vehicle'}
            </p>
            <p className="text-xs text-gray-500 capitalize">
              Color: <span className="font-semibold text-gray-700">{captain?.vehicle?.color || 'White'}</span> • Capacity: <span className="font-semibold text-gray-700">{captain?.vehicle?.capacity || 4} Seats</span>
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Plate Number</span>
          <span className="bg-gray-200 text-gray-900 text-xs font-black px-2.5 py-1 rounded-lg uppercase tracking-wider inline-block mt-0.5">
            {captain?.vehicle?.plate || 'Active Vehicle'}
          </span>
        </div>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-3 text-center">
          <div className="w-7 h-7 mx-auto rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-sm mb-1">
            <IoIosTimer />
          </div>
          <h5 className="text-base font-bold text-gray-900">8.2</h5>
          <p className="text-[10px] text-gray-500 font-medium">Hours Online</p>
        </div>

        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-3 text-center">
          <div className="w-7 h-7 mx-auto rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm mb-1">
            <IoIosSpeedometer />
          </div>
          <h5 className="text-base font-bold text-gray-900">64.5</h5>
          <p className="text-[10px] text-gray-500 font-medium">KM Driven</p>
        </div>

        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-3 text-center">
          <div className="w-7 h-7 mx-auto rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center text-sm mb-1">
            <TbNotes />
          </div>
          <h5 className="text-base font-bold text-gray-900">12</h5>
          <p className="text-[10px] text-gray-500 font-medium">Trips Done</p>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails;