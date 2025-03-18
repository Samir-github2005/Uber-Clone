import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';

const CaptainSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [plate, setPlate] = useState('');
  const [color, setColor] = useState('');
  const [capacity, setCapacity] = useState('');
  const [vehicleType, setVehicleType] = useState('');

  const navigate = useNavigate();
  const { setCaptain } = useContext(CaptainDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const captainData = {
      fullName: {
        firstName: firstName,
        lastName: lastName
      },
      email: email,
      password: password,
      vehicle: {
        color: color,
        plate: plate,
        capacity: capacity,
        vehicleType: vehicleType
      }
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData);
      if (response.status === 200) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem('token', data.token);
        navigate('/captain-home');
      }
    } catch (error) {
      console.error('Registration failed:', error);
    }

    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
    setCapacity('');
    setPlate('');
    setColor('');
    setVehicleType('');
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded shadow-md w-full max-w-md'>
        <img className='w-20 mx-auto mb-4' src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png" alt="Uber Logo" />
        <form onSubmit={submitHandler}>
          <h3 className='text-2xl font-semibold mb-4'>Sign Up as Captain</h3>
          <div className='flex gap-4'>
            <input className='bg-gray-200 w-1/2 rounded px-4 py-2 border mb-4 text-lg placeholder-gray-500' required value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" placeholder="First Name" />
            <input className='bg-gray-200 w-1/2 rounded px-4 py-2 border mb-4 text-lg placeholder-gray-500' required value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" placeholder="Last Name" />
          </div>
          <input className='bg-gray-200 rounded px-4 py-2 border mb-4 w-full text-lg placeholder-gray-500' required value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
          <input className='bg-gray-200 rounded px-4 py-2 border mb-4 w-full text-lg placeholder-gray-500' required value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
          <input className='bg-gray-200 rounded px-4 py-2 border mb-4 w-full text-lg placeholder-gray-500' required value={plate} onChange={(e) => setPlate(e.target.value)} type="text" placeholder="Vehicle Plate" />
          <input className='bg-gray-200 rounded px-4 py-2 border mb-4 w-full text-lg placeholder-gray-500' required value={color} onChange={(e) => setColor(e.target.value)} type="text" placeholder="Vehicle Color" />
          <input className='bg-gray-200 rounded px-4 py-2 border mb-4 w-full text-lg placeholder-gray-500' required value={capacity} onChange={(e) => setCapacity(e.target.value)} type="number" placeholder="Vehicle Capacity" />
          <select className='bg-gray-200 rounded px-4 py-2 border mb-4 w-full text-lg placeholder-gray-500' required value={vehicleType} onChange={(e) => setVehicleType(e.target.value)}>
            <option value="" disabled>Select vehicle type</option>
            <option value="car">Car</option>
            <option value="auto">Auto</option>
            <option value="moto">Moto</option>
          </select>
          <button className='bg-black text-white font-semibold rounded px-4 py-2 w-full' type="submit">Sign Up</button>
          <Link to={'/captain-login'} className='block text-center mt-4 text-gray-600'>Already have an account? Login</Link>
        </form>
      </div>
    </div>
  );
};

export default CaptainSignup;