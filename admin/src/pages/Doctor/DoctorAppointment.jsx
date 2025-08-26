import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext';

const DoctorAppointment = () => {

  const {dtoken, appointments , getAppointments} = useContext(DoctorContext);

  useEffect(() => {
    if(dtoken)
    getAppointments();
  }, [dtoken]);

  return (
    <div>
      <p>All Appointments</p>

      <div>

        <div>
        <p>#</p>
        <p>Patient Details</p>
        <p>Payment Status</p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>

        
          
        </div>
      </div>
    </div>
  )
}

export default DoctorAppointment
