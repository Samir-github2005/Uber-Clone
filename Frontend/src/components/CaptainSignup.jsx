import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineUser } from 'react-icons/hi';
import { RiSteeringFill } from 'react-icons/ri';
import { FaCar, FaArrowRight } from 'react-icons/fa6';

const CaptainSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [plate, setPlate] = useState('');
  const [color, setColor] = useState('');
  const [capacity, setCapacity] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setCaptain } = useContext(CaptainDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    const captainData = {
      fullName: {
        firstName,
        lastName,
      },
      email,
      password,
      vehicle: {
        color,
        plate,
        capacity: Number(capacity),
        vehicleType,
      },
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData);
      if (response.status === 200 || response.status === 201) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem('captainToken', data.token);
        navigate('/captain-home');
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Captain registration failed. Please check your details.');
      console.error('Registration failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col justify-between p-6 sm:p-8">
      {/* Top Branding */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="text-3xl font-extrabold tracking-tighter text-white">Uber</Link>
          <span className="text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
            Driver
          </span>
        </div>
        <span className="text-xs bg-gray-900 border border-gray-800 text-gray-400 px-3 py-1.5 rounded-full font-medium">
          Driver Application
        </span>
      </div>

      {/* Main Form Card */}
      <div className="w-full max-w-lg mx-auto my-auto py-6">
        <div className="bg-gray-900/90 backdrop-blur-xl border border-gray-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Register to Drive
            </h2>
            <p className="text-sm text-gray-400">
              Complete your profile and vehicle details to get started
            </p>
          </div>

          {errorMessage && (
            <div className="p-3.5 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm flex items-center gap-2">
              <span>⚠️</span>
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={submitHandler} className="space-y-4">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider pb-1 border-b border-gray-800">
              Personal Information
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-300">First Name</label>
                <div className="relative">
                  <HiOutlineUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="John"
                    className="w-full pl-9 pr-3 py-2.5 bg-gray-800/80 border border-gray-700 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-emerald-500 transition"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-300">Last Name</label>
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Doe"
                  className="w-full px-3 py-2.5 bg-gray-800/80 border border-gray-700 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-emerald-500 transition"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-300">Email Address</label>
              <div className="relative">
                <HiOutlineMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="captain@example.com"
                  className="w-full pl-10 pr-3 py-2.5 bg-gray-800/80 border border-gray-700 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-emerald-500 transition"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-300">Password</label>
              <div className="relative">
                <HiOutlineLockClosed className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3 py-2.5 bg-gray-800/80 border border-gray-700 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-emerald-500 transition"
                />
              </div>
            </div>

            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider pt-2 pb-1 border-b border-gray-800">
              Vehicle Information
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-300">License Plate</label>
                <input
                  type="text"
                  required
                  value={plate}
                  onChange={(e) => setPlate(e.target.value)}
                  placeholder="MP-04-AB-1234"
                  className="w-full px-3 py-2.5 bg-gray-800/80 border border-gray-700 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-emerald-500 transition uppercase"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-300">Color</label>
                <input
                  type="text"
                  required
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  placeholder="White / Silver"
                  className="w-full px-3 py-2.5 bg-gray-800/80 border border-gray-700 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-emerald-500 transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-300">Vehicle Type</label>
                <select
                  required
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  className="w-full px-3 py-2.5 bg-gray-800/80 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500 transition"
                >
                  <option value="" disabled>Select Type</option>
                  <option value="car">Car (Uber Go / Premier)</option>
                  <option value="auto">Auto (Uber Auto)</option>
                  <option value="moto">Moto (Uber Moto)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-300">Passenger Capacity</label>
                <input
                  type="number"
                  min="1"
                  max="6"
                  required
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  placeholder="e.g. 4"
                  className="w-full px-3 py-2.5 bg-gray-800/80 border border-gray-700 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-emerald-500 transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-3 bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold py-3.5 px-4 rounded-2xl active:scale-[0.98] transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 disabled:opacity-70"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-gray-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Complete Driver Registration</span>
                  <FaArrowRight className="text-xs" />
                </>
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-400">
              Already a registered captain?{' '}
              <Link to="/captain-login" className="text-emerald-400 font-semibold hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaptainSignup;