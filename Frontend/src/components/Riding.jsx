import React, { useState, useEffect, useContext } from 'react';
import { RiMoneyRupeeCircleLine } from 'react-icons/ri';
import { FaHouse, FaStar, FaShieldHalved } from 'react-icons/fa6';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { SocketContext } from '../context/SocketContext';
import LiveTracking from './LiveTracking';

const Riding = () => {
  const location = useLocation();
  const { ride } = location.state || {};
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();
  const [userLocation, setUserLocation] = useState({ lng: 0, lat: 0 });

  useEffect(() => {
    if (!socket) return;

    socket.on('ride-ended', () => {
      navigate('/home');
    });

    socket.on('location-update', (loc) => {
      setUserLocation(loc);
    });

    return () => {
      socket.off('ride-ended');
      socket.off('location-update');
    };
  }, [socket, navigate]);

  const captain = ride?.captain;
  const captainName = captain?.fullName
    ? `${captain.fullName.firstName} ${captain.fullName.lastName || ''}`
    : 'Captain';

  return (
    <div className="h-screen w-screen relative overflow-hidden bg-gray-100 font-sans flex flex-col justify-between">
      {/* Top Floating Return Home Bar */}
      <div className="fixed top-0 left-0 right-0 z-20 p-4 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-white/50 flex items-center gap-2">
          <Link to="/" className="text-2xl font-extrabold tracking-tighter text-black">
            Uber
          </Link>
          <span className="text-[10px] bg-blue-500/10 text-blue-600 border border-blue-500/20 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
            En Route
          </span>
        </div>

        <Link
          to="/home"
          className="pointer-events-auto w-11 h-11 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/50 flex items-center justify-center text-gray-700 hover:text-black hover:bg-white active:scale-95 transition"
          title="Home"
        >
          <FaHouse className="text-lg" />
        </Link>
      </div>

      {/* Map Area */}
      <div className="h-[60%] w-full">
        <LiveTracking userLocation={userLocation} />
      </div>

      {/* Ride Details Bottom Sheet */}
      <div className="h-[40%] bg-white rounded-t-3xl shadow-2xl border-t border-gray-100 p-5 sm:p-6 flex flex-col justify-between max-w-xl mx-auto w-full z-10 space-y-3">
        {/* Driver & Vehicle Profile */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div className="flex items-center gap-3.5">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=250&auto=format&fit=crop"
              alt="Captain"
              className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-gray-900 text-base">{captainName}</h3>
                <span className="flex items-center gap-0.5 text-xs text-amber-500 font-bold">
                  <FaStar className="text-[9px]" /> 4.9
                </span>
              </div>
              <p className="text-xs text-gray-500 capitalize">
                {captain?.vehicle?.color || 'White'} {captain?.vehicle?.vehicleType || 'Car'}
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="bg-gray-100 text-gray-800 text-xs font-extrabold px-2.5 py-1 rounded-lg uppercase tracking-wider block">
              {captain?.vehicle?.plate || 'Active'}
            </span>
          </div>
        </div>

        {/* Route Details & Fare */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Dropping Off At</p>
            <h4 className="text-sm font-bold text-gray-900 line-clamp-1 max-w-[200px] sm:max-w-xs">
              {ride?.destination || 'Your destination'}
            </h4>
          </div>

          <div className="text-right">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Fare</p>
            <h3 className="text-xl font-black text-gray-900">₹{ride?.fare ?? '—'}</h3>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => {
            alert(`Payment of ₹${ride?.fare || 0} to be collected in cash upon arrival.`);
          }}
          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-4 rounded-2xl active:scale-[0.98] transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 text-sm"
        >
          <RiMoneyRupeeCircleLine className="text-lg" />
          <span>Pay ₹{ride?.fare ?? '—'} (Cash on Arrival)</span>
        </button>
      </div>
    </div>
  );
};

export default Riding;