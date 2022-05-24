import React, {useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import './styles/App.css'
import Navbar from "./components/UI/Navbar/Navbar";
import AppRouter from "./components/AppRouter";
import {AuthContext} from "./context/context";

function App() {
    const [isAuth, setIsAuth] = useState(false)
    const [role, setRole] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        if(localStorage.getItem('auth') === 'true') {
            setIsAuth(true)
        }
        setIsLoading(false)
    }, [])
    useEffect(() => {
        if(localStorage.getItem('role') != null) {
            setRole(localStorage.getItem('role'))
        }
    }, [])
    return (
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth,
            role,
            setRole,
            isLoading
        }}>
            <BrowserRouter>
                <Navbar/>
                <AppRouter/>
            </BrowserRouter>
        </AuthContext.Provider>
    )
}

export default App;
