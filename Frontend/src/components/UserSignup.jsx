import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext.jsx';
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineUser } from 'react-icons/hi';
import { FaArrowRight } from 'react-icons/fa6';

const UserSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setuser } = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    const newUser = {
      email,
      password,
      fullName: {
        firstName,
        lastName,
      },
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);
      if (response.status === 200 || response.status === 201) {
        const data = response.data;
        setuser(data.user);
        localStorage.setItem('userToken', data.token);
        navigate('/home');
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Registration failed. Please check your details.');
      console.error('Registration failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col justify-between p-6 sm:p-8">
      {/* Top Branding */}
      <div className="flex items-center justify-between">
        <Link to="/" className="text-3xl font-extrabold tracking-tighter text-white">Uber</Link>
        <span className="text-xs bg-gray-900 border border-gray-800 text-gray-400 px-3 py-1.5 rounded-full font-medium">
          Rider Registration
        </span>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-md mx-auto my-auto py-6">
        <div className="bg-gray-900/90 backdrop-blur-xl border border-gray-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Create rider account
            </h2>
            <p className="text-sm text-gray-400">
              Enter your information to get started
            </p>
          </div>

          {errorMessage && (
            <div className="p-3.5 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm flex items-center gap-2">
              <span>⚠️</span>
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={submitHandler} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  First Name
                </label>
                <div className="relative">
                  <HiOutlineUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-base" />
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="John"
                    className="w-full pl-9 pr-3 py-3 bg-gray-800/80 border border-gray-700/80 rounded-2xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Last Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Doe"
                    className="w-full px-3.5 py-3 bg-gray-800/80 border border-gray-700/80 rounded-2xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-800/80 border border-gray-700/80 rounded-2xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition"
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
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-800/80 border border-gray-700/80 rounded-2xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-white text-black font-semibold py-3.5 px-4 rounded-2xl hover:bg-gray-100 active:scale-[0.98] transition flex items-center justify-center gap-2 shadow-lg disabled:opacity-70"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Create Account</span>
                  <FaArrowRight className="text-xs" />
                </>
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-white font-semibold hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-md w-full mx-auto text-center text-xs text-gray-500">
        By signing up, you agree to Uber's Terms of Service and Privacy Policy.
      </div>
    </div>
  );
};

export default UserSignup;