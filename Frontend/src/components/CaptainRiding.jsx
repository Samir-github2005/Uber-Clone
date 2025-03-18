import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { IoLogOut } from "react-icons/io5";
import { IoArrowUpOutline } from "react-icons/io5";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import FinishRide from './FinishRide';

const CaptainRiding = () => {
    const location = useLocation();
    const rideData = location.state?.ride || {}; // Retrieve ride data from state
    const [finishRidePanel, setFinishRidePanel] = useState(false)
    const finishRidePanelRef = useRef(null)

    useGSAP(function () {
        if (finishRidePanel) {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [finishRidePanel])

    return (
        <div className='h-screen'>
            <div className='fixed p-3 top-0 flex items-center justify-between w-screen'>
                <img className="w-16"
                    src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"
                    alt="Uber Logo" />
                <Link to={'/captain-login'} className='h-10 bg-white flex items-center justify-center rounded-full'>
                    <IoLogOut />
                </Link>
            </div>
            <div className='h-4/5'>
                <img className="h-full w-full object-cover"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAnC7KgawuNmngUVzXsPzW7zAFMP2Jgjor4A&s"
                    alt="Background" />
            </div>
            <div className='h-1/5 p-6 flex items-center justify-between bg-yellow-400 relative pt-10'
                onClick={() => {
                    setFinishRidePanel(true)
                }}>
                <h5 onClick={() => {

                }} className='p-1 text-center absolute w-[90%] top-0'><IoArrowUpOutline /></h5>
                <h4 className='text-lg font-semibold'>{rideData.distance ? `${rideData.distance} KM Away` : 'Distance not available'}</h4>
                <button className='w-full font-semibold p-2 rounded-lg bg-green-600 text-white' >Complete Ride</button>
            </div>
            <div ref={finishRidePanelRef} className="fixed translate-y-full z-10 w-full bottom-0 bg-white p-6 shadow-lg">
                <FinishRide rideData={rideData} setFinishRidePanel={setFinishRidePanel} />
            </div>
        </div>
    )
}

export default CaptainRiding;