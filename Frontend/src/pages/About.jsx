import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p className='font-medium'>ABOUT <span>US</span></p>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-12 '>
        <img className='rounded-lg w-full md:max-w-[360px]' src={assets.about_image}></img>
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
       <p>
        Welcome to our healthcare platform, where we are dedicated to providing you with the best medical care and support. Our team of experienced doctors and healthcare professionals is committed to ensuring your health and well-being. We offer a wide range of services, including online consultations, appointment scheduling, and access to medical resources. Your health is our priority, and we strive to make healthcare accessible and convenient for everyone. Thank you for choosing us for your healthcare needs.
       </p>
      </div>
      </div>
      
    </div>
  )
}

export default About
