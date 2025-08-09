import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'




const SpecialityMenu = () => {
  return (
    <div id='speciality' className='flex flex-col items-center py-16 text-gray-900 gap-4'> 
      
    <h1 className='text-3xl font-medium '> Find Doctors By Speciality</h1>

    <p className='sm:w-1/3 text-center text-sm'> Browse our extensive list of Doctors and find doctors hassle free at your finger tips.</p>

    <div className='flex sm:justify-center gap-4 pt-5 w-full overflow-scroll'>

        {
            specialityData.map((item, index) => 
                    //scrollTo(0,0) is used to scroll to the top of the page when the user clicks on the speciality
                <Link onClick={()=> scrollTo(0,0)}  className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500 ' key={index} to={`/doctors/${item.speciality}`} >
                <img className='w-16 sm:w-24 mb-2' src={item.image} />
                
                <p>{item.speciality}</p>
                </Link>
            )
        }


    </div>


    </div>
  )
}

export default SpecialityMenu
