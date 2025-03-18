import React from 'react'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { ImCross } from 'react-icons/im'
import { RiMoneyRupeeCircleLine } from 'react-icons/ri'

const RidePopUp = (props) => {
    return (
        <div>
            <h5 onClick={() =>{
                props.setRidePopupPanel(false)
            }} className='p-3 right-0 absolute w-[93%] top-0'><ImCross /></h5>
            <h3 className="text-lg font-medium mb-4">A Ride for you</h3>
            <div className='flex justify-between items-center p-3 bg-yellow-400 rounded-lg mt-4'>
                <div className='flex items-center gap-3'>
                    <img className='h-10 w-10 rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdiKSbjGVVpWnw_7BIaACHcmkxzXCs_dtAaA&s" alt="" />
                    <h2 className='text-lg font-medium'>{props.ride?.user.fullName.firstName+" "+props.ride?.user.fullName.lastName}</h2>
                </div>
                <h5 className='text-lg font-semibold'>2.2KM</h5>
            </div>
            <div className='flex flex-col justify-between items-center'>
                <div className='w-full'>
                    <div className='flex gap-5 items-center'>
                        <HiOutlineLocationMarker />
                        <div>
                            <h3>{props.ride?.pickup}</h3>
                        </div>
                    </div>
                    <div>
                        <HiOutlineLocationMarker />
                        <div className='flex gap-5 items-center'>
                            <h3>{props.ride?.destination}</h3>
                        </div>
                    </div>
                    <div className='flex gap-5 items-center'>
                        <RiMoneyRupeeCircleLine />
                        <div>
                            <h3>{props.ride?.fare}</h3>
                            
                        </div>
                    </div>
                </div>
                <button onClick={() => {
                    props.setConfirmRidePopupPanel(true)
                    props.confirmRide()
                }} className='w-full font-semibold p-2 rounded-sm bg-green-600 text-white '>Accept</button>

                <button onClick={() => {
                    props.setRidePopupPanel(false)
                }} className='w-full font-semibold p-2 rounded-sm bg-gray-600 text-white '>Ignore</button>
            </div>
        </div>
    )
}

export default RidePopUp