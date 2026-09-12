import React, { useState } from 'react';
import { RiMoneyRupeeCircleLine } from 'react-icons/ri';
import { IoChevronDown } from 'react-icons/io5';
import { FaCircle, FaSquare, FaArrowRight, FaCheck } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FinishRide = ({ rideData, setFinishRidePanel }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const riderName = rideData?.user?.fullName
    ? `${rideData.user.fullName.firstName} ${rideData.user.fullName.lastName || ''}`
    : 'Rider';

  async function endRide() {
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/end-ride`,
        {
          rideId: rideData._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('captainToken')}`,
          },
        }
      );
      if (response.status === 200) {
        navigate('/captain-home');
      }
    } catch (error) {
      console.error('End ride error:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4 max-w-lg mx-auto pb-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block">
            Destination Reached
          </span>
          <h3 className="text-xl font-bold text-gray-900 tracking-tight">Finish & Collect Cash</h3>
        </div>
        <button
          onClick={() => setFinishRidePanel(false)}
          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition"
        >
          <IoChevronDown className="text-lg" />
        </button>
      </div>

      {/* Rider Info Card */}
      <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            className="h-11 w-11 rounded-full object-cover border-2 border-white shadow-sm"
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=250&auto=format&fit=crop"
            alt="Rider"
          />
          <div>
            <h4 className="text-base font-bold text-gray-900">{riderName}</h4>
            <p className="text-xs text-gray-500">Trip Completed</p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs text-gray-400 block">Collect Cash</span>
          <span className="text-2xl font-black text-emerald-600">₹{rideData?.fare ?? '—'}</span>
        </div>
      </div>

      {/* Route Breakdown */}
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
              <h4 className="text-sm font-semibold text-gray-900 line-clamp-1">{rideData?.pickup || 'Pickup'}</h4>
            </div>

            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Dropoff</p>
              <h4 className="text-sm font-semibold text-gray-900 line-clamp-1">{rideData?.destination || 'Destination'}</h4>
            </div>
          </div>
        </div>
      </div>

      {/* Cash Collection Alert */}
      <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-xs font-semibold flex items-center gap-2">
        <RiMoneyRupeeCircleLine className="text-base text-amber-600 shrink-0" />
        <span>Please collect ₹{rideData?.fare ?? '—'} in cash from the passenger before ending the ride.</span>
      </div>

      {/* Complete Ride CTA */}
      <button
        onClick={endRide}
        disabled={loading}
        className="w-full bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-extrabold py-4 px-6 rounded-2xl active:scale-[0.98] transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 text-base disabled:opacity-70"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-gray-950 border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            <FaCheck className="text-sm" />
            <span>Complete & Finish Ride</span>
          </>
        )}
      </button>
    </div>
  );
};

export default FinishRide;