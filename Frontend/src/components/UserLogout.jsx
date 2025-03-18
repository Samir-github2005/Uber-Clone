import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserLogout = () => {
    const token = localStorage.getItem('token')
    const navigate= useNavigate()

    useEffect(() => {
      const logout = async () => {
        try {
          const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
        });
        
          if (res.status === 200) {
            localStorage.removeItem('token');
            navigate('/login');
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

export default UserLogout;