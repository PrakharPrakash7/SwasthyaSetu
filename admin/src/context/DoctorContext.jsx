import { set } from "mongoose";
import { useState } from "react";
import { createContext } from "react";

export const DoctorContext = createContext();

const DoctorContextProvider = (props)=> {

     const [dtoken , setDtoken] = useState(localStorage.getItem('dtoken')? localStorage.getItem('dtoken') :   '');
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

   


    const value = {

        backendUrl, dtoken , setDtoken

    }

    return (<DoctorContext.Provider value = {value}>
        {props.children}
    </DoctorContext.Provider>)  
}

export default DoctorContextProvider;
