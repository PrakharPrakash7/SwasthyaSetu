import { createContext } from "react";
import { doctors } from "../assets/assets";
export const AppContext = createContext();


//It allows you to share the doctors data globally across your React app without prop drilling.
const AppContextProvider = (props) => {

    const currencySymbol = "₹";

    const value = {
        doctors,
        currencySymbol

    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );

}

export default AppContextProvider;