import React,{useContext} from 'react'
import { IoIosSpeedometer, IoIosTimer } from "react-icons/io";
import { TbNotes } from "react-icons/tb";
import {CaptainDataContext} from '../context/CaptainContext'

const CaptainDetails = () => {
    const {captain}=useContext(CaptainDataContext)
    return (
    <div>
        <div className='flex items-center justify-between'>
            <div className='flex items-center justify-between gap-2'>
                <img className='h-10 w-10 rounded-full object-cover' src="https://imgs.search.brave.com/qrwSPw-CPO3heER4ZLrbgQ0snsd2r2N8a0MO134iIQU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzQ3LzM0/Lzg5LzQ3MzQ4OWY3/YjE1NGM4OWZkODFm/NWU0YmM1NDIxNDI1/LmpwZw" alt="" />
                <h4 className='text-lg font-medium'>{captain.fullName.firstName} {captain.fullName.lastName}</h4>
            </div>
            <div>
                <h4 className='text-lg font-semibold'>87348</h4>
                <p>earned</p>
            </div>
        </div>
        <div className='flex justify-center gap-5 items-start'>
            <div className='text-center'>
                <IoIosTimer />
                <h5 className='text-lg font-medium'>10</h5>
                <p className='text-sm text-gray-500'>Hours online</p>
            </div>
            <div className='text-center'>
                <IoIosSpeedometer />
                <h5 className='text-lg font-medium'>10</h5>
                <p className='text-sm text-gray-500'>Hours online</p>
            </div>
            <div className='text-center'>
                <TbNotes />
                <h5 className='text-lg font-medium'>10</h5>
                <p className='text-sm text-gray-500'>Hours online</p>
            </div>
        </div>
    </div>
    );
}

export default CaptainDetails