import React from 'react';
import { FaUser } from 'react-icons/fa';
import { IoChevronDown } from 'react-icons/io5';
import { FaCar, FaMotorcycle } from 'react-icons/fa6';
import { RiTaxiLine } from 'react-icons/ri';

const VehiclePanel = ({ fare = {}, setConfirmRidePanel, setVehiclePanel, setVehicleType }) => {
  const vehicleOptions = [
    {
      id: 'car',
      name: 'Uber Go',
      capacity: 4,
      eta: '2 mins away',
      desc: 'Affordable, compact rides',
      price: fare.car,
      icon: <FaCar className="text-2xl text-gray-800" />,
      bg: 'bg-blue-50 text-blue-600',
    },
    {
      id: 'motorcycle',
      name: 'Uber Moto',
      capacity: 1,
      eta: '3 mins away',
      desc: 'Affordable, speedy motorcycle rides',
      price: fare.motorcycle,
      icon: <FaMotorcycle className="text-2xl text-gray-800" />,
      bg: 'bg-amber-50 text-amber-600',
    },
    {
      id: 'auto',
      name: 'Uber Auto',
      capacity: 3,
      eta: '4 mins away',
      desc: 'No bargaining, doorstep pickup',
      price: fare.auto,
      icon: <RiTaxiLine className="text-2xl text-gray-800" />,
      bg: 'bg-emerald-50 text-emerald-600',
    },
  ];

  return (
    <div className="space-y-4 max-w-lg mx-auto pb-4">
      {/* Drag handle / Close header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900 tracking-tight">Choose a ride</h3>
          <p className="text-xs text-gray-500">Select your preferred vehicle type</p>
        </div>
        <button
          onClick={() => setVehiclePanel(false)}
          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition"
        >
          <IoChevronDown className="text-lg" />
        </button>
      </div>

      {/* Vehicle List */}
      <div className="space-y-2.5">
        {vehicleOptions.map((vehicle) => (
          <div
            key={vehicle.id}
            onClick={() => {
              setVehicleType(vehicle.id);
              setVehiclePanel(false);
              setConfirmRidePanel(true);
            }}
            className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl border-2 border-gray-100 hover:border-black active:scale-[0.99] cursor-pointer bg-white transition group shadow-sm hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl ${vehicle.bg} flex items-center justify-center shrink-0 border border-black/5 group-hover:scale-105 transition`}>
                {vehicle.icon}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-gray-900 text-base">{vehicle.name}</h4>
                  <span className="inline-flex items-center gap-1 text-xs text-gray-600 font-medium bg-gray-100 px-2 py-0.5 rounded-full">
                    <FaUser className="text-[10px]" />
                    {vehicle.capacity}
                  </span>
                </div>
                <p className="text-xs text-emerald-600 font-semibold mt-0.5">{vehicle.eta}</p>
                <p className="text-xs text-gray-500 line-clamp-1">{vehicle.desc}</p>
              </div>
            </div>

            <div className="text-right shrink-0 pl-2">
              <h2 className="text-lg sm:text-xl font-extrabold text-gray-900">
                ₹{vehicle.price ?? '—'}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehiclePanel;