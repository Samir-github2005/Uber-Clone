import React, { useRef, useState, useEffect, useContext } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { FaCircle, FaSquare, FaArrowDown, FaArrowRight } from 'react-icons/fa6';
import { IoLogOutOutline, IoPersonCircleOutline } from 'react-icons/io5';
import LocationSearchPanel from '../pages/LocationSearchPanel';
import VehiclePanel from '../pages/VehiclePanel';
import ConfirmedRide from '../pages/ConfirmedRide';
import LookingForDriver from '../pages/LookingForDriver';
import WaitingForDriver from '../pages/WaitingForDriver';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';
import { SocketContext } from '../context/SocketContext';
import { useNavigate, Link } from 'react-router-dom';
import LiveTracking from './LiveTracking';

const Home = () => {
  const [pickup, setpickup] = useState('');
  const [destination, setDestination] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmedRideRef = useRef(null);

  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [fare, setFare] = useState({});
  const [fareLoading, setFareLoading] = useState(false);
  const [vehicleType, setVehicleType] = useState(null);
  const [ride, setRide] = useState(null);
  const [userLocation, setUserLocation] = useState({ lng: 0, lat: 0 });

  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!socket || !user?._id) return;

    socket.emit('join', { userType: 'user', userId: user._id });

    socket.on('ride-confirmed', (ride) => {
      setWaitingForDriver(true);
      setVehicleFound(false);
      setRide(ride);
    });

    socket.on('ride-started', (ride) => {
      setWaitingForDriver(false);
      navigate('/riding', { state: { ride } });
    });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const location = {
            lng: position.coords.longitude,
            lat: position.coords.latitude,
          };
          setUserLocation(location);
          socket.emit('update-location-user', {
            userId: user._id,
            location,
          });
        });
      }
    };

    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();

    return () => {
      socket.off('ride-confirmed');
      socket.off('ride-started');
      clearInterval(locationInterval);
    };
  }, [socket, user?._id, navigate]);

  const fetchFare = async (p, d) => {
    setFareLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
        params: { pickup: p, destination: d },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      });
      setFare(res.data);
    } catch (err) {
      console.error('Error getting fare:', err);
    } finally {
      setFareLoading(false);
    }
  };

  const submitHandler = async (e) => {
    if (e) e.preventDefault();
    if (!pickup || !destination) return;

    setVehiclePanel(true);
    setPanelOpen(false);
    await fetchFare(pickup, destination);
  };

  const handleInputChange = async (value, field) => {
    if (field === 'pickup') {
      setpickup(value);
    } else {
      setDestination(value);
    }

    if (value.length >= 3) {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
          params: { input: value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        });
        setSuggestions(res.data || []);
        setPanelOpen(true);
        setActiveField(field);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionSelect = (suggestion) => {
    if (activeField === 'pickup') {
      setpickup(suggestion);
      setActiveField('destination');
      setSuggestions([]);
    } else {
      setDestination(suggestion);
      setPanelOpen(false);
      setSuggestions([]);
      if (pickup) {
        setVehiclePanel(true);
        fetchFare(pickup, suggestion);
      }
    }
  };

  const handleInputFocus = (field) => {
    setActiveField(field);
    setPanelOpen(true);
    const currVal = field === 'pickup' ? pickup : destination;
    if (currVal && currVal.length >= 3) {
      handleInputChange(currVal, field);
    }
  };

  async function createRide() {
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/create`,
        { pickup, destination, vehicleType },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        }
      );
    } catch (error) {
      console.error('Create ride error:', error);
    }
  }

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '60vh',
        opacity: 1,
        duration: 0.35,
        ease: 'power2.out',
      });
      gsap.to(panelCloseRef.current, {
        opacity: 1,
        display: 'flex',
        duration: 0.2,
      });
    } else {
      gsap.to(panelRef.current, {
        height: '0vh',
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
      });
      gsap.to(panelCloseRef.current, {
        opacity: 0,
        display: 'none',
        duration: 0.2,
      });
    }
  }, [panelOpen]);

  useGSAP(() => {
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(0%)',
        duration: 0.4,
        ease: 'power3.out',
      });
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(100%)',
        duration: 0.3,
        ease: 'power3.in',
      });
    }
  }, [vehiclePanel]);

  useGSAP(() => {
    if (confirmRidePanel) {
      gsap.to(confirmedRideRef.current, {
        transform: 'translateY(0%)',
        duration: 0.4,
        ease: 'power3.out',
      });
    } else {
      gsap.to(confirmedRideRef.current, {
        transform: 'translateY(100%)',
        duration: 0.3,
        ease: 'power3.in',
      });
    }
  }, [confirmRidePanel]);

  useGSAP(() => {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(0%)',
        duration: 0.4,
        ease: 'power3.out',
      });
    } else {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(100%)',
        duration: 0.3,
        ease: 'power3.in',
      });
    }
  }, [vehicleFound]);

  useGSAP(() => {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(0%)',
        duration: 0.4,
        ease: 'power3.out',
      });
    } else {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(100%)',
        duration: 0.3,
        ease: 'power3.in',
      });
    }
  }, [waitingForDriver]);

  return (
    <div className="h-screen w-screen relative overflow-hidden bg-gray-100 font-sans">
      {/* Top Floating Bar */}
      <div className="fixed top-0 left-0 right-0 z-20 p-4 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-white/50 flex items-center gap-3">
          <Link to="/" className="text-2xl font-extrabold tracking-tighter text-black">
            Uber
          </Link>
          <div className="h-4 w-px bg-gray-300" />
          <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-700">
            <IoPersonCircleOutline className="text-base text-gray-500" />
            <span>{user?.fullName?.firstName || 'Rider'}</span>
          </div>
        </div>

        <Link
          to="/user/logout"
          className="pointer-events-auto w-11 h-11 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/50 flex items-center justify-center text-gray-700 hover:text-red-600 hover:bg-white active:scale-95 transition"
          title="Logout"
        >
          <IoLogOutOutline className="text-xl" />
        </Link>
      </div>

      {/* Map Background Layer */}
      <div className="h-screen w-screen">
        <LiveTracking userLocation={userLocation} />
      </div>

      {/* Bottom Search Drawer */}
      <div className="fixed bottom-0 left-0 right-0 z-30 flex flex-col justify-end pointer-events-none">
        <div className="pointer-events-auto bg-white rounded-t-3xl shadow-2xl border-t border-gray-100 p-5 sm:p-6 transition-all duration-300 max-w-xl mx-auto w-full">
          {/* Header & Close Handle */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight">
              Where to?
            </h3>
            <button
              ref={panelCloseRef}
              type="button"
              onClick={() => setPanelOpen(false)}
              className="hidden w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 items-center justify-center transition"
            >
              <FaArrowDown className="text-xs" />
            </button>
          </div>

          {/* Location Inputs with Route Line */}
          <form onSubmit={submitHandler} className="relative space-y-3">
            {/* Visual Route Line */}
            <div className="absolute left-4 top-4.5 bottom-16 flex flex-col items-center pointer-events-none z-10">
              <FaCircle className="text-[9px] text-emerald-600" />
              <div className="w-0.5 flex-1 bg-gray-300 my-1 border-dashed" />
              <FaSquare className="text-[9px] text-black" />
            </div>

            <div className="relative">
              <input
                type="text"
                value={pickup}
                onChange={(e) => handleInputChange(e.target.value, 'pickup')}
                onFocus={() => handleInputFocus('pickup')}
                placeholder="Enter pickup location"
                className="w-full pl-10 pr-4 py-3.5 bg-gray-100 hover:bg-gray-150 focus:bg-white border border-transparent focus:border-black rounded-2xl text-sm font-medium text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-black transition shadow-inner"
              />
            </div>

            <div className="relative">
              <input
                type="text"
                value={destination}
                onChange={(e) => handleInputChange(e.target.value, 'destination')}
                onFocus={() => handleInputFocus('destination')}
                placeholder="Where to?"
                className="w-full pl-10 pr-4 py-3.5 bg-gray-100 hover:bg-gray-150 focus:bg-white border border-transparent focus:border-black rounded-2xl text-sm font-medium text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-black transition shadow-inner"
              />
            </div>

            <button
              type="submit"
              disabled={fareLoading}
              className="w-full mt-2 bg-black hover:bg-gray-900 text-white font-bold py-3.5 px-4 rounded-2xl active:scale-[0.98] transition flex items-center justify-center gap-2 shadow-lg disabled:opacity-70"
            >
              {fareLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Search Rides</span>
                  <FaArrowRight className="text-xs" />
                </>
              )}
            </button>
          </form>

          {/* Autocomplete Suggestions Panel */}
          <div
            ref={panelRef}
            className="h-0 opacity-0 overflow-hidden transition-all bg-white"
          >
            <LocationSearchPanel
              suggestions={suggestions}
              activeField={activeField}
              onSelect={handleSuggestionSelect}
            />
          </div>
        </div>
      </div>

      {/* Vehicle Selection Drawer */}
      <div
        ref={vehiclePanelRef}
        style={{ transform: 'translateY(100%)' }}
        className="fixed z-40 w-full bottom-0 bg-white rounded-t-3xl p-5 sm:p-6 shadow-2xl border-t border-gray-100 max-w-xl left-0 right-0 mx-auto"
      >
        <VehiclePanel
          setVehicleType={setVehicleType}
          fare={fare}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehiclePanel={setVehiclePanel}
        />
      </div>

      {/* Confirm Ride Drawer */}
      <div
        ref={confirmedRideRef}
        style={{ transform: 'translateY(100%)' }}
        className="fixed z-40 w-full bottom-0 bg-white rounded-t-3xl p-5 sm:p-6 shadow-2xl border-t border-gray-100 max-w-xl left-0 right-0 mx-auto"
      >
        <ConfirmedRide
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          createRide={createRide}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound}
        />
      </div>

      {/* Looking For Driver Drawer */}
      <div
        ref={vehicleFoundRef}
        style={{ transform: 'translateY(100%)' }}
        className="fixed z-40 w-full bottom-0 bg-white rounded-t-3xl p-5 sm:p-6 shadow-2xl border-t border-gray-100 max-w-xl left-0 right-0 mx-auto"
      >
        <LookingForDriver
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          setVehicleFound={setVehicleFound}
        />
      </div>

      {/* Waiting For Driver Drawer */}
      <div
        ref={waitingForDriverRef}
        style={{ transform: 'translateY(100%)' }}
        className="fixed z-40 w-full bottom-0 bg-white rounded-t-3xl p-5 sm:p-6 shadow-2xl border-t border-gray-100 max-w-xl left-0 right-0 mx-auto"
      >
        <WaitingForDriver
          ride={ride}
          setWaitingForDriver={setWaitingForDriver}
        />
      </div>
    </div>
  );
};

export default Home;