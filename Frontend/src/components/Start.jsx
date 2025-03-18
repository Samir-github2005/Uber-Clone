import React from 'react';
import { Link } from 'react-router-dom';

const Start = () => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center px-6 py-4"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1538563188159-070c4db2bc65?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
      }}
    >
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm">
        <img
          className="w-24 mx-auto mb-6"
          src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"
          alt="Uber Logo"
        />
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
          Get Started with Uber
        </h2>
        <Link
          to={"/login"}
          className="block text-center bg-black text-white font-medium rounded-lg px-4 py-3 hover:bg-gray-800 transition"
        >
          Continue
        </Link>
      </div>
    </div>
  );
  
};

export default Start;