import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom';

const RelatedDoctors = ({docId,speciality}) => {

    const {doctors} = useContext(AppContext);
    const navigate = useNavigate();
    const[relDoc, setRelDoc] = useState([]);

    useEffect(()=>{

        if(doctors.length  && speciality){
            const doctorsData = doctors.filter(doc => doc.speciality.toLowerCase() === speciality.toLowerCase() && doc._id !== docId); 
            setRelDoc(doctorsData);
        }

    }, [docId, speciality , doctors]);
  return (
     <div className='flex flex-col items-center my-16 text-gray-800 md:mx-10 gap-4'>
      <h1 className='text-3xl font-medium'>Related Doctors</h1>
      <p className='sm:w-1/3 text-center text-sm'>Here are the top related Doctors </p>
      <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
        {relDoc.slice(0,5).map((item,index)=>(
        <div className='    border border-purple-300 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
            <img onClick={()=> {navigate(`/appointment/${item._id}`); scrollTo(0,0);}}  className='bg-purple-50'  src={item.image} alt={item.name}  />
            <div className='p-4'>
                <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-600' : 'text-red-600'}`}>
                    <p className={`w-2 h-2 ${item.available ? 'bg-green-600' : 'bg-red-600'} rounded-full`}></p><p>{item.available ? 'Available' : 'Unavailable'}</p>
                </div>
                <p className='text-gray-900 text-lg font-medium '>{item.name}</p>
                <p className='text-gray-600 text-sm'>{item.speciality}</p>
            </div>
        </div>
      ))}
      </div>
      

      <button className='bg-purple-50 text-gray-600 px-12 py-3 rounded-full mt-10 ' onClick={()=>{ navigate('/doctors');  scrollTo(0,0)}}   >more</button> 
    </div>
  )
}

export default RelatedDoctors
