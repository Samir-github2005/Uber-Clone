import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import UserLogin from './components/UserLogin';
import UserSignup from './components/UserSignup';
import CaptainLogin from './components/CaptainLogin';
import CaptainSignup from './components/CaptainSignup';
import Start from './components/Start';
import UserProtectWrapper from './components/UserProtectWrapper';
import UserLogout from './components/UserLogout';
import CaptainHome from './components/CaptainHome';
import CaptainProtectWrapper from './components/CaptainProtectWrapper';
import CaptainLogout from './components/CaptainLogout';
import Riding from './components/Riding';
import CaptainRiding from './components/CaptainRiding';

function App() {
  return (
    <div className="min-h-screen bg-black text-gray-900 selection:bg-black selection:text-white">
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
        <Route
          path="/home"
          element={
            <UserProtectWrapper>
              <Home />
            </UserProtectWrapper>
          }
        />
        <Route
          path="/riding"
          element={
            <UserProtectWrapper>
              <Riding />
            </UserProtectWrapper>
          }
        />
        <Route
          path="/user/logout"
          element={
            <UserProtectWrapper>
              <UserLogout />
            </UserProtectWrapper>
          }
        />
        <Route
          path="/captain-home"
          element={
            <CaptainProtectWrapper>
              <CaptainHome />
            </CaptainProtectWrapper>
          }
        />
        <Route
          path="/captain-riding"
          element={
            <CaptainProtectWrapper>
              <CaptainRiding />
            </CaptainProtectWrapper>
          }
        />
        <Route
          path="/captain/logout"
          element={
            <CaptainProtectWrapper>
              <CaptainLogout />
            </CaptainProtectWrapper>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
