import React from 'react'
import { ImCross } from "react-icons/im";
import { RiMoneyRupeeCircleLine } from "react-icons/ri"
import { HiOutlineLocationMarker } from "react-icons/hi";


const LookingForDriver = (props) => {
    return (
        <div>
            <h5 onClick={() => props.setVehicleFound(false)} className='p-3 right-0 absolute w-[93%] top-0'><ImCross /></h5>
            <h3 className="text-lg font-medium mb-4">Looking for a Driver</h3>

            <div className='flex flex-col justify-between items-center'>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0dvpmpkBxRwzt84h3R46p43rK3mZWrhAvXw&s" alt="" />
                <div className='w-full'>
                    <div className='flex gap-5 items-center'>
                        <HiOutlineLocationMarker />
                        <div>
                            <h3>562-A</h3>
                            <p>{props.pickup}</p>
                        </div>
                    </div>
                    <div>
                        <HiOutlineLocationMarker />
                        <div className='flex gap-5 items-center'>
                            <h3>562-A</h3>
                            <p>{props.destination}</p>
                        </div>
                    </div>
                    <div className='flex gap-5 items-center'>
                        <RiMoneyRupeeCircleLine />
                        <div>
                            <h3>₹{props.fare[props.vehicleType]}</h3>
                            <p>Kankariya, Bhopal</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LookingForDriver