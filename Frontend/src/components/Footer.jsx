import React from 'react'
import { assets } from '../assets/assets'


const Footer = () => {
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm '>
            {/* left section */}
            <div>
                <img className='mb-5 w-12' src={assets.UrbanEcho_logo} alt="" />
                <p className='w-full md:w-2/3 text-gray-600 leading-6'>The Complaint Management System is helpful as it provides a centralized platform where users can easily raise concerns without needing to visit offices or make calls. It ensures transparency by letting users track the status of their complaints in real time. Authorities can prioritize and manage issues more effectively, reducing delays and confusion.</p>
            </div>

            {/* center section */}
            <div>
                <p className='text-xl font-medium mb-5'>UrbanEcho</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Contact us</li>
                    <li>Privacy policy</li>
                </ul>
            </div>

            {/* right section */}
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>+1-212-456-7890</li>
                    <li>info.urbanecho@gmail.com</li>
                </ul>
            </div>
        </div>

        {/* copy-right */}
        <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright © 2025 UrbanEcho - All Right Reserved.</p>
        </div>
    </div>
  )
}

export default Footer