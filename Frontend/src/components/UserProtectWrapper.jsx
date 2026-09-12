import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext.jsx';

const UserProtectWrapper = ({ children }) => {
  const navigate = useNavigate();
  const { user, setuser } = React.useContext(UserDataContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (!token) {
      navigate('/login');
      return;
    }

    axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      if (res.status === 200) {
        setuser(res.data);
        setIsLoading(false);
      }
    }).catch(err => {
      console.log(err);
      localStorage.removeItem('userToken');
      navigate('/login');
    });
  }, [navigate, setuser]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {children}
    </>
  );
};

export default UserProtectWrapper;