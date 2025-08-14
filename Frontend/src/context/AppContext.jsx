import { createContext } from "react";
export const AppContext = createContext();
import axios from 'axios';
import { useState } from "react";
import { useEffect } from "react";
import {toast} from 'react-toastify';

//It allows you to share the doctors data globally across your React app without prop drilling.
const AppContextProvider = (props) => {

    const currencySymbol = "₹";
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [doctors, setDoctors] = useState([])
    const value = {
        doctors,
        currencySymbol

    }

    const getDoctorsData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/doctor/list`);
            if (data.success) {
                setDoctors(data.doctors);
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    }


    useEffect(() => {
        getDoctorsData();
    }, []);

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );

}

export default AppContextProvider;