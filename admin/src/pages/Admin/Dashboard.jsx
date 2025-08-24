import React from 'react'
import { useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { assets } from '../../assets/assets';

const Dashboard = () => {

  const {atoken , cancelAppointment, dashData, getDashData} = useContext(AdminContext);

  React.useEffect(()=>{
    if(atoken) {
      getDashData();
    }
  },[atoken])

  return dashData && (
    <div className='m-5'>
      <div className='flex flex-wrap gap-3'>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-200 cursor-pointer hover:scale-105 transition-all'>
          <img src={assets.doctor_icon}/>
          <div>
            <p>{dashData.doctors}</p>
            <p>Doctors</p>
          </div>
        </div>

        <div 
          <img src={assets.appointments_icon}/>
          <div>
            <p>{dashData.appointments}</p>
            <p>Appointments</p>
          </div>
        </div>

        <div>
          <img src={assets.patients_icon}/>
          <div>
            <p>{dashData.patients}</p>
            <p>Patients</p>
          </div>
        </div>


      </div>
    </div>
  )
}

export default Dashboard
