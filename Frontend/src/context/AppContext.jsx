import { createContext } from "react";
import { doctors } from "../assets/assets";
export const AppContext = createContext();
import axios from 'axios';

//It allows you to share the doctors data globally across your React app without prop drilling.
const AppContextProvider = (props) => {

    const currencySymbol = "₹";
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const value = {
        doctors,
        currencySymbol

    }

    const getDoctors = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/doctors`);
            if (data.success) {
                setDoctors(data.doctors);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );

}

export default AppContextProvider;