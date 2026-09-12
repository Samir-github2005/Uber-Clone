import React, { useState } from 'react';
import { RiMoneyRupeeCircleLine } from 'react-icons/ri';
import { IoChevronDown } from 'react-icons/io5';
import { FaCircle, FaSquare, FaKey, FaArrowRight } from 'react-icons/fa6';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ConfirmRidePopupPanel = ({ ride, setConfirmRidePopupPanel, setRidePopupPanel }) => {
  const [otp, setOtp] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const riderName = ride?.user?.fullName
    ? `${ride.user.fullName.firstName} ${ride.user.fullName.lastName || ''}`
    : 'Rider';

  const SubmitHandler = async (e) => {
    e.preventDefault();
    if (!otp) {
      setErrorMsg('Please enter the 4-digit OTP provided by rider.');
      return;
    }
    setErrorMsg('');
    setLoading(true);

    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
        params: {
          rideId: ride._id,
          otp: otp,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('captainToken')}`,
        },
      });

      if (res.status === 200) {
        setConfirmRidePopupPanel(false);
        setRidePopupPanel(false);
        navigate('/captain-riding', { state: { ride } });
      }
    } catch (error) {
      setErrorMsg(error.response?.data?.message || 'Invalid OTP. Please check with the rider.');
      console.error('Start ride error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 max-w-lg mx-auto pb-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block">
            Ride Accepted
          </span>
          <h3 className="text-xl font-bold text-gray-900 tracking-tight">Enter OTP to Start</h3>
        </div>
        <button
          onClick={() => {
            setConfirmRidePopupPanel(false);
            setRidePopupPanel(false);
          }}
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
            <p className="text-xs text-gray-500">Cash Payment on Arrival</p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs text-gray-400 block">Fare</span>
          <span className="text-xl font-black text-gray-900">₹{ride?.fare ?? '—'}</span>
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
              <h4 className="text-sm font-semibold text-gray-900 line-clamp-1">{ride?.pickup || 'Pickup Location'}</h4>
            </div>

            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Dropoff</p>
              <h4 className="text-sm font-semibold text-gray-900 line-clamp-1">{ride?.destination || 'Destination'}</h4>
            </div>
          </div>
        </div>
      </div>

      {errorMsg && (
        <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-xs font-semibold flex items-center gap-2">
          <span>⚠️</span>
          <span>{errorMsg}</span>
        </div>
      )}

      {/* OTP Input Form */}
      <form onSubmit={SubmitHandler} className="space-y-3">
        <div className="relative">
          <FaKey className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="number"
            required
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter 4-digit OTP from Rider"
            className="w-full pl-11 pr-4 py-3.5 bg-gray-100 focus:bg-white border border-gray-200 focus:border-emerald-500 rounded-2xl text-center text-lg font-bold tracking-widest text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition"
          />
        </div>

        <div className="grid grid-cols-2 gap-3 pt-1">
          <button
            type="button"
            onClick={() => {
              setConfirmRidePopupPanel(false);
              setRidePopupPanel(false);
            }}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3.5 px-4 rounded-2xl transition text-sm active:scale-[0.98]"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-extrabold py-3.5 px-4 rounded-2xl transition text-sm active:scale-[0.98] shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-1.5 disabled:opacity-70"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-gray-950 border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Start Ride</span>
                <FaArrowRight className="text-xs" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ConfirmRidePopupPanel;