import React, { useContext } from 'react'
import { AppContext } from '../context/Appcontext';
import { toast } from 'react-toastify';
import {useNavigate } from 'react-router-dom';

import { useState ,useEffect } from 'react';

import axios from 'axios';
const MyAppointments = () => {

  const {backendUrl , token , getDoctorsData} = useContext(AppContext);

  const [appointments, setAppointments] = useState([]);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const navigate = useNavigate();
  const slotDateFormat = (slotDate)=>{

    const dateArray = slotDate.split('-')
    return dateArray[0]+' '+months[Number(dateArray[1])-1]+' '+dateArray[2];
  }
  const getUserAppointments = async ()=>{

    try{

      const {data}  = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: {
          token
        }
      });

      if(data.success){
        setAppointments(data.appointments.reverse());
        
      }

    }catch(error){
      console.error("Error fetching appointments:", error);
      toast.error(error.message)
    }
  }

  const cancelAppointment = async (appointmentId) => {
      try{
      const {data}  = await axios.post(`${backendUrl}/api/user/cancel-appointment`, {appointmentId}, {
        headers: {
          token
        }
      });

      if(data.success){
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      }else{
        toast.error(data.message);
      }
    }
      catch(error){
      console.error("Error fetching appointments:", error);
      toast.error(error.message)
    }
  }


  const initPay = (order)=>{
    const options = {
      key : import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: "INR",
      name: "SwasthyaSetu",
      description: `Appointment Payment`,
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        // Handle payment success
        console.log("Payment successful:", response);

        try{

          const {data} = await axios.post(`${backendUrl}/api/user/verify-razorpay`, response, {
            headers: {
              token
            }
          });

          if(data.success){
            getUserAppointments();
            navigate("/my-appointments");
          }else{
            toast.error(data.message);
          }
        }catch(error){
          console.error("Error verifying payment:", error);
          toast.error(error.message);
        }

      },
      prefill: {
        name: "John Doe",
        email: "john.doe@example.com",
        contact: "1234567890"
      },
      notes: {
        address: "Razorpay Corporate Office"
      },
      theme: {
        color: "#3399cc"
      }
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  }

  const appointmentRazorpay  = async (appointmentId) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/payment-razorpay`, { appointmentId }, {
        headers: {
          token
        }
      });

      if (data.success) {
        // Handle successful payment
        initPay(data.order);
       
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if(token){
      getUserAppointments();
    }
  }, [token]);

  return (
    <div>
     <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'> My Appointments</p>

     <div>
     {appointments.map((item,index)=>(
      <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
      <div>
        <img className='w-32 bg-purple-50' src={item.docData.image}/> 
      </div>

  <div className='flex-1 text-sm text-zinc-600'>
        <p className='text-neutral-800 font-semibold '>{item.docData.name}</p>
        <p >{item.docData.speciality}</p>
        <p className='text-zinc-700 font-medium mt-1'>Address:</p>
        <p className='text-xs'>{item.docData.address.address1}</p>
         <p className='text-xs'>{item.docData.address.address2}</p>
        <p  className='text-sm mt'><span className='text-sm text-neutral-700 font-medium '>Date & Time :</span> {slotDateFormat(item.slotDate)} | {item.slotTime}</p>
        </div>
        <div></div>
        <div className='flex flex-col gap-2 justify-end'>
    {!item.cancelled && !item.payment && <p className=' sm:min-w-48 px-12 py-2 text-sm text-zinc-700  font-medium'>Fees : ₹{item.amount}</p>}

        {!item.cancelled && item.payment && <button className='sm:min-w-48 py-1 border rounded-md  bg-primary text-white bg-green-500   '>Paid</button>}
          {!item.cancelled && !item.payment &&  <button onClick={() => appointmentRazorpay(item._id)} className='text-sm rounded-md text-stone-500  text-center sm:min-w-48 py-2 border hover:bg-green-600 hover:text-white transition-all duration-300 '>Pay Online</button>}
         {!item.cancelled && <button onClick={() => cancelAppointment(item._id)} className='text-sm rounded-md text-stone-500 border   text-center sm:min-w-48 py-2   hover:bg-red-600  hover:text-white transition-all duration-300 '>Cancel Appointment</button>}
        {item.cancelled && <button className='sm:min-w-48 py-1 border border-red-500 bg-red-50 rounded-md   text-red-500'>Appintment Cancelled</button>}
        </div>
     
      </div>
     ))}

     </div>
    </div>
  )
}

export default MyAppointments
