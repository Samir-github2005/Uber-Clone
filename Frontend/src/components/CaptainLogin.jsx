import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setCaptain } = React.useContext(CaptainDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const captain = {
      email: email,
      password: password
    };  

    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain);      
      if (res.status === 200) {
        setCaptain(res.data.captain);
        localStorage.setItem('token', res.data.token);
        navigate('/captain-home');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }

    setEmail('');
    setPassword('');
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded shadow-md w-full max-w-md'>
        <img className='w-20 mx-auto mb-4' src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png" alt="Uber Logo" />
        <form onSubmit={(e)=>{
          submitHandler(e)
        }}>
          <h3 className='text-2xl font-semibold mb-4'>Login as Captain</h3>
          <input className='bg-gray-200 rounded px-4 py-2 border mb-4 w-full text-lg placeholder-gray-500' required value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
          <input className='bg-gray-200 rounded px-4 py-2 border mb-4 w-full text-lg placeholder-gray-500' required value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
          <button className='bg-black text-white font-semibold rounded px-4 py-2 w-full' type="submit">Login</button>
          <Link to={'/captain-signup'} className='block text-center mt-4 text-gray-600'>Create new Account</Link>
        </form>
        <Link to={'/login'} className='block text-center mt-4 bg-green-500 text-white font-semibold rounded px-4 py-2'>Sign in as User</Link>
      </div>
    </div>
  );
};

export default CaptainLogin;