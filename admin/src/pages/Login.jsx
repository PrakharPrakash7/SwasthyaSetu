import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

    const [state, setState] = useState('Admin');
    const {setAtoken,backendUrl} = useContext(AdminContext);
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const onSubmitHandler = async (event)=> {
        event.preventDefault();

        try{

            //admin state

            if(state === 'Admin'){

                const {data} = await axios.post(`${backendUrl}/api/admin/login`, {email, password});
                
                if(data.success){
                    //storing token in local storage so that if admin refresh he will be login
                    localStorage.setItem('atoken', data.token);
                    console.log(data.token);
                    setAtoken(data.token);

                }else{
                    toast.error(data.message);
                }

            }else{
                //Doctor State

            }

        }
            catch(error){
                // toast.error(error.response?.data?.message || "Login failed");

        }

    }

    return (
        <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
            <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-gray-700 text-sm shadow-lg'>
                <p className='text-2xl font-semibold m-auto'>
                    <span className='text-primary'>{state}</span> Login</p>
                <div className='w-full'>
                    <p>Email</p>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} className='border border-[#DADADA] rounded-md p-2 w-full mt-1' type='email' required />
                </div>
                <div className='w-full'>
                    <p>Password</p>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} className='border border-[#DADADA] rounded-md p-2 w-full mt-1' type='password' required />
                </div>
                <button className='bg-primary text-white text-base rounded-md py-2 w-full mt-4'>
                    Login
                </button>
                {
                    state === 'Admin'
                    ? <p>Doctor Login <span className='text-primary underline cursor-pointer' onClick={()=> setState('Doctor')}>Click Here</span> </p>
                    : <p>Admin Login <span className='text-primary underline cursor-pointer' onClick={()=> setState('Admin')}>Click Here</span> </p>
                }
            </div>

        </form>
    )
}

export default Login
