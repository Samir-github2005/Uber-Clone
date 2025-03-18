import React, { useState } from 'react'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { ImCross } from 'react-icons/im'
import { RiMoneyRupeeCircleLine } from 'react-icons/ri'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ConfirmRidePopupPanel = (props) => {
    const [otp, setOtp] = useState('')
    const navigate = useNavigate()

    const SubmitHandler = async (e) => {
        e.preventDefault()

        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
            params: {
                rideId: props.ride._id,
                otp: otp
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        if (res.status === 200) {
            props.setConfirmRidePopupPanel(false)
            props.setRidePopupPanel(false)
            navigate('/captain-riding', { state: { ride: props.ride } }) 
        }
    }

    return (
        <div className='h-screen'>
            <h5 onClick={() => {
                props.setRidePopupPanel(false)
            }} className='p-3 right-0 absolute w-[93%] top-0'><ImCross /></h5>
            <h3 className="text-lg font-medium mb-4">Confirm Your Ride To Start</h3>
            <div className='flex justify-between items-center p-3 bg-yellow-400 rounded-lg mt-4'>
                <div className='flex items-center gap-3'>
                    <img className='h-10 w-10 rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdiKSbjGVVpWnw_7BIaACHcmkxzXCs_dtAaA&s" alt="" />
                    <h2 className='text-lg font-medium'>{props.ride?.user.fullName.firstName}</h2>
                </div>
                <h5 className='text-lg font-semibold'>2.2KM</h5>
            </div>
            <div className='flex flex-col justify-between items-center'>
                <div className='w-full'>
                    <div className='flex gap-5 items-center'>
                        <HiOutlineLocationMarker />
                        <div>
                            <h3>562-A</h3>
                            <p>{props.ride?.pickup}</p>
                        </div>
                    </div>
                    <div>
                        <HiOutlineLocationMarker />
                        <div className='flex gap-5 items-center'>
                            <h3>562-A</h3>
                            <p>{props.ride?.destination}</p>
                        </div>
                    </div>
                    <div className='flex gap-5 items-center'>
                        <RiMoneyRupeeCircleLine />
                        <div>
                            <h3>₹{props.ride?.fare}</h3>
                        </div>
                    </div>
                </div>
                <div className='mt-6'>
                    <form onSubmit={(e) => {
                        SubmitHandler(e)
                    }}>
                        <input type="number" value={otp} onChange={(e) => {
                            setOtp(e.target.value)
                        }} placeholder='Enter OTP' className='bg-gray-200 w-full mt-5 px-4 py-3 text-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400' />
                        <button className='w-full font-semibold p-2 rounded-sm bg-green-600 text-white '>Confirm</button>
                        <button onClick={() => {
                            props.setConfirmRidePopupPanel(false)
                            props.setRidePopupPanel(false)
                        }} className='w-full font-semibold p-2 rounded-sm bg-red-600 text-white '>Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ConfirmRidePopupPanel