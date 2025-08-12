import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
export const AdminContext = createContext();

const AdminContextProvider = (props)=> {

    const [atoken , setAtoken] = useState(localStorage.getItem('atoken')? localStorage.getItem('atoken') :   '');
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [doctors,setDoctors] = useState([]);
    const getAllDoctors = async ()=>{

        try{

            const {data} = await axios.post(`${backendUrl}/api/admin/all-doctors`,{} , {headers: {atoken}})
            if(data.success){
                setDoctors(data.doctors)
            }
            else{
                toast.error(data.message)
            }
        }
        catch(error){
            toast.error(error.message)
        }


    }
    const value = {
        atoken,setAtoken,
        backendUrl,doctors,getAllDoctors,
    }

    return (<AdminContext.Provider value = {value}>
        {props.children}
    </AdminContext.Provider>)  
}

export default AdminContextProvider;
