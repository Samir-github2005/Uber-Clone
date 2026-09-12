import React, { useRef, useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { IoLogOutOutline } from 'react-icons/io5';
import { FaCircle } from 'react-icons/fa6';
import CaptainDetails from '../pages/CaptainDetails';
import RidePopUp from '../pages/RidePopUp';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ConfirmRidePopupPanel from '../pages/ConfirmRidePopupPanel';
import { SocketContext } from '../context/SocketContext';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';
import LiveTracking from './LiveTracking';

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const ridePopupPanelRef = useRef(null);
  const [ride, setRide] = useState(null);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const confirmRidePopupPanelRef = useRef(null);

  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);
  const [captainLocation, setCaptainLocation] = useState({ lng: 0, lat: 0 });

  useEffect(() => {
    if (!socket || !captain?._id) return;

    socket.emit('join', {
      userId: captain._id,
      userType: 'captain',
    });

    socket.on('new-ride', (data) => {
      setRide(data);
      setRidePopupPanel(true);
      console.log('Received new ride data:', data);
    });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const location = {
            ltd: position.coords.latitude,
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCaptainLocation({ lng: position.coords.longitude, lat: position.coords.latitude });
          socket.emit('update-location-captain', {
            userId: captain._id,
            location,
          });
        });
      }
    };

    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();

    return () => {
      clearInterval(locationInterval);
      socket.off('new-ride');
    };
  }, [socket, captain?._id]);

  async function confirmRide() {
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
        {
          rideId: ride._id,
          captainId: captain._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('captainToken')}`,
          },
        }
      );
      setRidePopupPanel(false);
      setConfirmRidePopupPanel(true);
    } catch (error) {
      console.error('Confirm ride error:', error);
    }
  }

  useGSAP(() => {
    if (ridePopupPanel) {
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(0%)',
        duration: 0.4,
        ease: 'power3.out',
      });
    } else {
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(100%)',
        duration: 0.3,
        ease: 'power3.in',
      });
    }
  }, [ridePopupPanel]);

  useGSAP(() => {
    if (confirmRidePopupPanel) {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: 'translateY(0%)',
        duration: 0.4,
        ease: 'power3.out',
      });
    } else {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: 'translateY(100%)',
        duration: 0.3,
        ease: 'power3.in',
      });
    }
  }, [confirmRidePopupPanel]);

  const captainDisplayName = captain?.fullName
    ? `${captain.fullName.firstName} ${captain.fullName.lastName || ''}`
    : 'Captain';

  return (
    <div className="h-screen w-screen relative overflow-hidden bg-gray-950 font-sans flex flex-col">
      {/* Top Floating Driver Bar */}
      <div className="fixed top-0 left-0 right-0 z-20 p-4 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto bg-gray-900/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-gray-800 flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Link to="/" className="text-2xl font-extrabold tracking-tighter text-white">
              Uber
            </Link>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
              Driver
            </span>
          </div>

          <div className="h-4 w-px bg-gray-700" />

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-200">{captainDisplayName}</span>
            <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
              <FaCircle className="text-[5px] text-emerald-400 animate-pulse" />
              <span>Online</span>
            </div>
          </div>
        </div>

        <Link
          to="/captain/logout"
          className="pointer-events-auto w-11 h-11 bg-gray-900/90 backdrop-blur-md rounded-2xl shadow-lg border border-gray-800 flex items-center justify-center text-gray-300 hover:text-red-400 hover:bg-gray-850 active:scale-95 transition"
          title="Logout"
        >
          <IoLogOutOutline className="text-xl" />
        </Link>
      </div>

      {/* Map Half */}
      <div className="h-[55%] w-full">
        <LiveTracking userLocation={captainLocation} />
      </div>

      {/* Dashboard Half */}
      <div className="h-[45%] w-full bg-gray-100 p-4 sm:p-5 flex flex-col justify-end">
        <CaptainDetails captain={captain} />
      </div>

      {/* Incoming Ride Request Sheet */}
      <div
        ref={ridePopupPanelRef}
        style={{ transform: 'translateY(100%)' }}
        className="fixed z-40 w-full bottom-0 bg-white rounded-t-3xl p-5 sm:p-6 shadow-2xl border-t border-gray-100 max-w-xl left-0 right-0 mx-auto"
      >
        <RidePopUp
          ride={ride}
          confirmRide={confirmRide}
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
        />
      </div>

      {/* Confirm OTP & Start Ride Sheet */}
      <div
        ref={confirmRidePopupPanelRef}
        style={{ transform: 'translateY(100%)' }}
        className="fixed z-40 w-full bottom-0 bg-white rounded-t-3xl p-5 sm:p-6 shadow-2xl border-t border-gray-100 max-w-xl left-0 right-0 mx-auto"
      >
        <ConfirmRidePopupPanel
          ride={ride}
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;