import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
     <div>
          <div className='text-center text-2xl pt-10 text-gray-500'>
            <p className='font-medium'>CONTACT <span>US</span></p>
          </div>
    
          <div className='my-10 flex flex-col md:flex-row gap-12 '>
            <img className='rounded-lg w-full md:max-w-[360px]' src={assets.contact_image}></img>
            <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
           <p>
            Please feel free to reach out to us through the Contact Us page. We’re here to assist you with any questions or concerns. Your feedback is important, and our team will respond promptly to ensure your satisfaction.
           </p>
           <br></br>
           <p className='text-2xl font-medium text-gray-700'>FOR ENQUIRY</p>
           <p>Email id : morpher631@gmail.com
           
            </p>
          </div>
          </div>
          
        </div>
  )
}

export default Contact
