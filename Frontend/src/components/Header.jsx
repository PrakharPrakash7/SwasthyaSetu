import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg-px-20'>
      

    <div className='md:w-1/2 flex flex-col justify-center items-start gap-4 m-auto py-10 md:py-[10vw] md:mb-[-30px]'>
        <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight'>Book Appointment <br/> With Trusted Doctors</p>
        <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light '>
            
            <p>Simply Browse through our extensive list of  doctors <br className='hidden sm:block'/> and schedule your appointment hassle free.</p>
        </div>


          {/* This will scroll to the speciality section when clicked */}
        <a href='#speciality' className='flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm font-medium hover:bg-gray-200 transition-all duration-300'>
            Book Appointment
        </a>
    </div>


    <div className='md:w-1/2 relative'>  
    <img className='w-full md:absolute bottom-0 h-auto rounded-lg ' src={assets.header_img}  />
    </div>



    </div>
  )
}

export default Header
