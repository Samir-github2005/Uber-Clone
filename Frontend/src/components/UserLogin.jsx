import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext.jsx';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { setuser } = React.useContext(UserDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const user = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, user);
      if (response.status === 200) {
        const data = response.data;
        setuser(data.user);
        localStorage.setItem('token', data.token);
        navigate('/home');
      }
    } catch (error) {
      setErrorMessage('Login failed: Invalid email or password.');
      console.error('Login failed:', error);
    }

    setEmail('');
    setPassword('');
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded shadow-md w-full max-w-md'>
        <img className='w-20 mx-auto mb-4' src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png" alt="Uber Logo" />
        <form onSubmit={submitHandler}>
          <h3 className='text-2xl font-semibold mb-4'>Login</h3>
          <input className='bg-gray-200 rounded px-4 py-2 border mb-4 w-full text-lg placeholder-gray-500' required value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
          <input className='bg-gray-200 rounded px-4 py-2 border mb-4 w-full text-lg placeholder-gray-500' required value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
          {errorMessage && <p className='text-red-500 mb-4'>{errorMessage}</p>}
          <button className='bg-black text-white font-semibold rounded px-4 py-2 w-full' type="submit">Login</button>
          <Link to={'/signup'} className='block text-center mt-4 text-gray-600'>Don't have an account? Sign Up</Link>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
