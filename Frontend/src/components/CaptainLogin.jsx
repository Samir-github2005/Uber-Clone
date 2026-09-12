import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CaptainDataContext } from '../context/CaptainContext';
import { HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi';
import { RiSteeringFill } from 'react-icons/ri';
import { FaCar, FaArrowRight } from 'react-icons/fa6';

const CaptainLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const { setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    const captain = {
      email: email,
      password: password,
    };

    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain);
      if (res.status === 200) {
        setCaptain(res.data.captain);
        localStorage.setItem('captainToken', res.data.token);
        navigate('/captain-home');
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Login failed. Invalid captain credentials.');
      console.error('Login failed:', error);
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
          Captain Portal
        </span>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-md mx-auto my-auto py-8">
        <div className="bg-gray-900/90 backdrop-blur-xl border border-gray-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="space-y-1">
            <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-400 text-2xl mb-4">
              <RiSteeringFill />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Captain Sign In
            </h2>
            <p className="text-sm text-gray-400">
              Drive, accept rides, and track your daily earnings
            </p>
          </div>

          {errorMessage && (
            <div className="p-3.5 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm flex items-center gap-2">
              <span>⚠️</span>
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={submitHandler} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
                Captain Email
              </label>
              <div className="relative">
                <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="captain@example.com"
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-800/80 border border-gray-700/80 rounded-2xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-800/80 border border-gray-700/80 rounded-2xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold py-3.5 px-4 rounded-2xl active:scale-[0.98] transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 disabled:opacity-70"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-gray-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In as Captain</span>
                  <FaArrowRight className="text-xs" />
                </>
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-400">
              Want to drive with Uber?{' '}
              <Link to="/captain-signup" className="text-emerald-400 font-semibold hover:underline">
                Register as Captain
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* User Switch Footer */}
      <div className="max-w-md w-full mx-auto">
        <Link
          to="/login"
          className="flex items-center justify-center gap-2 w-full bg-gray-900 hover:bg-gray-850 text-gray-300 border border-gray-800 py-3.5 px-4 rounded-2xl font-medium text-sm transition"
        >
          <FaCar className="text-lg text-gray-400" />
          <span>Sign in as a Rider</span>
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;