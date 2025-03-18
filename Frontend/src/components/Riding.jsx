import React, { useState, useEffect } from 'react';
import { HiOutlineLocationMarker } from "react-icons/hi";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { FaHome } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';
import { SocketContext } from '../context/SocketContext';
import { useNavigate } from 'react-router-dom';
import LiveTracking from './LiveTracking';

const Riding = () => {
  const location = useLocation();
  const { ride } = location.state || {}; // Retrieve ride data from state
  const { socket } = React.useContext(SocketContext);
  const navigate = useNavigate();
  const [userLocation, setUserLocation] = useState({ lng: 0, lat: 0 });

  useEffect(() => {
    socket.on('ride-ended', () => {
      navigate('/home');
    });

    socket.on('location-update', (location) => {
      setUserLocation(location);
    });

    return () => {
      socket.off('ride-ended');
      socket.off('location-update');
    };
  }, [socket, navigate]);

  return (
    <div className='h-screen'>
      <Link to={'/home'} className='fixed right-2 top-2 h-10 bg-white flex items-center justify-center rounded-full'>
        <FaHome />
      </Link>
      <div className='h-1/2'>
        <LiveTracking userLocation={userLocation} />
      </div>
      <div className='h-1/2'>
        <div className="w-full max-w-sm mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
          {/* Header */}
          <div className="flex items-center gap-4 border-b pb-3 mb-3">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0dvpmpkBxRwzt84h3R46p43rK3mZWrhAvXw&s" // Replace with your car image URL
              alt="Car"
              className="w-12 h-12 object-cover rounded-full"
            />
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-800">{ride?.captain?.fullName?.firstName}</h2>
              <p className="text-sm text-gray-600">{ride?.captain?.vehicle?.model}</p>
            </div>
            <p className="text-sm font-semibold text-gray-500">{ride?.captain?.vehicle?.licensePlate}</p>
          </div>

          {/* Drop */}
          <div className="flex items-start gap-3">
            <HiOutlineLocationMarker className="text-red-600 text-xl" />
            <div>
              <h3 className="text-lg font-medium text-gray-800">{ride?.pickup}</h3>
              <p className="text-sm text-gray-600">{ride?.destination}</p>
            </div>
          </div>
        </div>

        {/* Fare */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-start gap-3">
            <RiMoneyRupeeCircleLine className="text-yellow-500 text-xl" />
            <div>
              <h3 className="text-lg font-medium text-gray-800">₹{ride?.fare}</h3>
              <p className="text-sm text-gray-600">Cash</p>
            </div>
          </div>
        </div>

        {/* Confirm Button */}
        <button className="w-full mt-14 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700">
          Make a Payment
        </button>
      </div>
    </div>
  )
}

export default Riding;