import React, { useRef, useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoLogOutOutline } from 'react-icons/io5';
import { FaLocationDot, FaArrowRight } from 'react-icons/fa6';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import FinishRide from './FinishRide';
import LiveTracking from './LiveTracking';
import { SocketContext } from '../context/SocketContext';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainRiding = () => {
  const location = useLocation();
  const rideData = location.state?.ride || {};
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const finishRidePanelRef = useRef(null);

  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);
  const [captainLocation, setCaptainLocation] = useState({ lng: 77.8880, lat: 29.8543 });

  useEffect(() => {
    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const loc = {
            ltd: position.coords.latitude,
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCaptainLocation({ lng: position.coords.longitude, lat: position.coords.latitude });
          if (socket && captain?._id) {
            socket.emit('update-location-captain', {
              userId: captain._id,
              location: loc,
            });
          }
        });
      }
    };

    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();

    return () => {
      clearInterval(locationInterval);
    };
  }, [socket, captain?._id]);

  useGSAP(() => {
    if (finishRidePanel) {
      gsap.to(finishRidePanelRef.current, {
        yPercent: 0,
        duration: 0.4,
        ease: 'power3.out',
      });
    } else {
      gsap.to(finishRidePanelRef.current, {
        yPercent: 100,
        duration: 0.3,
        ease: 'power3.in',
      });
    }
  }, [finishRidePanel]);

  return (
    <div className="h-screen w-screen relative overflow-hidden bg-gray-950 font-sans flex flex-col justify-between">
      {/* Top Floating Bar */}
      <div className="fixed top-0 left-0 right-0 z-20 p-4 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto bg-gray-900/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-gray-800 flex items-center gap-2">
          <Link to="/" className="text-2xl font-extrabold tracking-tighter text-white">
            Uber
          </Link>
          <span className="text-[10px] bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
            Ride in Progress
          </span>
        </div>

        <Link
          to="/captain/logout"
          className="pointer-events-auto w-11 h-11 bg-gray-900/90 backdrop-blur-md rounded-2xl shadow-lg border border-gray-800 flex items-center justify-center text-gray-300 hover:text-red-400 hover:bg-gray-850 active:scale-95 transition"
          title="Logout"
        >
          <IoLogOutOutline className="text-xl" />
        </Link>
      </div>

      {/* Live Map Area */}
      <div className="h-[75%] w-full">
        <LiveTracking userLocation={captainLocation} />
      </div>

      {/* Bottom Floating Navigation Card */}
      <div className="h-[25%] p-4 sm:p-5 bg-white rounded-t-3xl shadow-2xl border-t border-gray-100 flex flex-col justify-between max-w-xl mx-auto w-full z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
              <FaLocationDot className="text-base" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Navigating to</p>
              <h4 className="text-sm font-bold text-gray-900 line-clamp-1">
                {rideData.destination || 'Passenger Destination'}
              </h4>
            </div>
          </div>

          <span className="text-sm font-extrabold bg-gray-100 text-gray-800 px-3 py-1 rounded-xl">
            {rideData.distance ? `${rideData.distance} KM` : 'On Route'}
          </span>
        </div>

        <button
          onClick={() => setFinishRidePanel(true)}
          className="w-full bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-extrabold py-3.5 px-4 rounded-2xl active:scale-[0.98] transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 text-base"
        >
          <span>Complete Ride</span>
          <FaArrowRight className="text-xs" />
        </button>
      </div>

      {/* Finish Ride Drawer */}
      <div
        ref={finishRidePanelRef}
        style={{ transform: 'translateY(100%)' }}
        className="fixed z-40 w-full bottom-0 bg-white rounded-t-3xl p-5 sm:p-6 shadow-2xl border-t border-gray-100 max-w-xl left-0 right-0 mx-auto"
      >
        <FinishRide rideData={rideData} setFinishRidePanel={setFinishRidePanel} />
      </div>
    </div>
  );
};

export default CaptainRiding;