import React from 'react'
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 mt-40 text-sm  my-10'>

            {/* left side */}
            <div>
                <img className='mb-5 w-40 ' src={assets.logo}></img>
                <p className='w-full md:w-2/3 text-gray-600 leading-6'>SwasthyaSetu helps you book doctor appointments easily, anytime. Connect with trusted professionals, manage health records, and get expert advice—all in one place. Your health, our priority. Be on the Site and take control of your well-being today.</p>
            </div>

            {/* Center Section */}
            <div>

                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>Home </li>
                    <li>About Us</li>
                    <li>Contact Us</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>

            {/* Right side */}
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>

                <ul className='flex flex-col gap-2 text-gray-600'>

                    <li>6207580540</li>
                    <li>morpher631@gmail.com</li>
                </ul>
            </div>

            
        </div>
        <div>
            {/* Copyright Text */}
            <hr />
            <p className='py-5 text-sm text-center'>Copyright 2025 All Rights Reserved</p>
        </div>
    </div>
  )
}

export default Footer;
