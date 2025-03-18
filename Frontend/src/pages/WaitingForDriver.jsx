import React from 'react'
import { ImCross } from "react-icons/im";
import { RiMoneyRupeeCircleLine } from "react-icons/ri"
import { HiOutlineLocationMarker } from "react-icons/hi";


const WaitingForDriver = (props) => {
    return (
        <div>
            <h5 onClick={() => props.waitingForDriver(false)} className='p-3 right-0 absolute w-[93%] top-0'><ImCross /></h5>
            <div>
                <div className="w-full max-w-sm mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
                    {/* Header */}
                    <div className="flex items-center gap-4 border-b pb-3 mb-3">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0dvpmpkBxRwzt84h3R46p43rK3mZWrhAvXw&s" // Replace with your car image URL
                            alt="Car"
                            className="w-12 h-12 object-cover rounded-full"
                        />
                        <div className="flex-1">
                            <h2 className="text-xl font-bold text-gray-800">{props.ride?.captain.fullName.firstName+" "+props.ride?.captain.fullName.lastName}</h2>
                            <p className="text-sm text-gray-600">Maruti Suzuki Alto</p>
                        </div>
                        <p className="text-sm font-semibold text-gray-500">{props.ride?.captain.vehicle.plate}</p>
                        <h1 className="text-sm font-semibold text-gray-500">OTP: {props.ride?.otp}</h1>
                    </div>

                    {/* Location Details */}
                    <div className="space-y-4">
                        {/* Pickup */}
                        <div className="flex items-start gap-3">
                            <HiOutlineLocationMarker className="text-green-600 text-xl" />
                            <div>
                                <h3 className="text-lg font-medium text-gray-800">562/11-A</h3>
                                <p className="text-sm text-gray-600">{props.ride?.pickup}</p>
                            </div>
                        </div>

                        {/* Drop */}
                        <div className="flex items-start gap-3">
                            <HiOutlineLocationMarker className="text-red-600 text-xl" />
                            <div>
                                <h3 className="text-lg font-medium text-gray-800">562/11-A</h3>
                                <p className="text-sm text-gray-600">{props.ride?.destination}</p>
                            </div>
                        </div>
                    </div>

                    {/* Fare */}
                    <div className="flex items-center justify-between mt-4">
                        <div className="flex items-start gap-3">
                            <RiMoneyRupeeCircleLine className="text-yellow-500 text-xl" />
                            <div>
                                <h3 className="text-lg font-medium text-gray-800">₹{props.ride?.fare}</h3>
                                <p className="text-sm text-gray-600">Cash</p>
                            </div>
                        </div>
                    </div>

                    {/* Confirm Button */}
                    <button className="w-full mt-5 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700">
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    )
}

export default WaitingForDriver