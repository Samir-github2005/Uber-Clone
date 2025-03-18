import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext.jsx';

const UserSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const navigate = useNavigate();
  const { setuser } = React.useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      email: email,
      password: password,
      fullName: {
        firstName: firstName,
        lastName: lastName
      }
    };

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);
    if (response.status === 200) {
      const data = response.data;
      setuser(data.user);
      localStorage.setItem('token', data.token);
      navigate('/home');
    }

    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded shadow-md w-full max-w-md'>
        <img className='w-20 mx-auto mb-4' src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png" alt="Uber Logo" />
        <form onSubmit={submitHandler}>
          <h3 className='text-2xl font-semibold mb-4'>Sign Up</h3>
          <div className='flex gap-4'>
            <input className='bg-gray-200 w-1/2 rounded px-4 py-2 border mb-4 text-lg placeholder-gray-500' required value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" placeholder="First Name" />
            <input className='bg-gray-200 w-1/2 rounded px-4 py-2 border mb-4 text-lg placeholder-gray-500' required value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" placeholder="Last Name" />
          </div>
          <input className='bg-gray-200 rounded px-4 py-2 border mb-4 w-full text-lg placeholder-gray-500' required value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
          <input className='bg-gray-200 rounded px-4 py-2 border mb-4 w-full text-lg placeholder-gray-500' required value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
          <button className='bg-black text-white font-semibold rounded px-4 py-2 w-full' type="submit">Sign Up</button>
          <Link to={'/login'} className='block text-center mt-4 text-gray-600'>Already have an account? Login</Link>
        </form>
      </div>
    </div>
  );
};

export default UserSignup;