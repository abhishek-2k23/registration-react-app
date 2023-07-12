import React,{ createContext, useState} from "react";

export const RegistrationContext = createContext();

export function RegistrationProvider({children}){
    const [loading, setLoading] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [User,setUser] = useState('');
    const [emailforPSD,setEmail] = useState('');

    const value = {
        loading,setLoading,
        loggedIn, setLoggedIn,
        User,setUser,
        emailforPSD,setEmail
    };

    return <RegistrationContext.Provider value={value}>
        {children}  
    </RegistrationContext.Provider>
}
