import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CaptainLogout = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true 
        });
        if (res.status === 200) {
          localStorage.removeItem('token');
          navigate('/captain-login');
        }
      } catch (error) {
        console.error('Logout failed:', error);
      }
    };

    logout();
  }, [navigate, token]);

  return (
    <div>
      Logging out...
    </div>
  );
};

export default CaptainLogout;