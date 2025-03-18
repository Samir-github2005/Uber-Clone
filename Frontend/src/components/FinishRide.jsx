import React from 'react'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { ImCross } from 'react-icons/im'
import { RiMoneyRupeeCircleLine } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const FinishRide = (props) => {
    const navigate = useNavigate()

    async function endRide() {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {
                rideId: props.rideData._id
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        if (response.status === 200) {
            navigate('/captain-home')
        }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <h5 onClick={() => {
                props.setFinishRidePanel(false)
            }} className='p-3 right-0 absolute w-[93%] top-0'><ImCross /></h5>
            <h3 className="text-lg font-medium mb-4">Finish this Ride</h3>
            <div className='flex justify-between items-center p-3 bg-yellow-400 rounded-lg mt-4'>
                <div className='flex items-center gap-3'>
                    <img className='h-10 w-10 rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdiKSbjGVVpWnw_7BIaACHcmkxzXCs_dtAaA&s" alt="" />
                    <h2 className='text-lg font-medium'>{props.rideData?.user.fullName.firstName}</h2>
                </div>
                <h5 className='text-lg font-semibold'>2.2KM</h5>
            </div>
            <div className='flex flex-col justify-between items-center'>
                <div className='w-full'>
                    <div className='flex gap-5 items-center'>
                        <HiOutlineLocationMarker />
                        <div>
                            <h3>562-A</h3>
                            <p>{props.rideData?.pickup}</p>
                        </div>
                    </div>
                    <div>
                        <HiOutlineLocationMarker />
                        <div className='flex gap-5 items-center'>
                            <h3>562-A</h3>
                            <p>{props.rideData?.destination}</p>
                        </div>
                    </div>
                    <div className='flex gap-5 items-center'>
                        <RiMoneyRupeeCircleLine />
                        <div>
                            <h3>₹{props.rideData?.fare}</h3>
                            <p>Kankariya, Bhopal</p>
                        </div>
                    </div>
                </div>
                <div className='mt-6'>
                    <button
                    onClick={endRide} className='w-full font-semibold p-2 rounded-sm bg-green-600 text-white '>Finish Ride</button>
                </div>
            </div>
        </div>
    )
}

export default FinishRide