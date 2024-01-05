import React, { useState,useEffect } from 'react'
import Header from './components/Header/Header.jsx'
import { Outlet } from 'react-router-dom'
import { LoginContextProvider } from './context/LoginContext.js';

function Layout() {
        
    const [isLoggedIn, setIsUserLogged] = useState(false);
    const [username, setUsername] = useState("Guest");

    const LogIn = () => {
    setIsUserLogged(true);
    }
    const LogOut = () => {
    setIsUserLogged(false);
    setUsername("guest");
    }

    let data = null;
    const isAuthorized = async() => {
    fetch('/api/authorized', 
        {
        method: 'GET',
        }
    )
    .then(async(response) => {
        if(response.ok){
        data = await response.json();
        LogIn();
        setUsername(data.data);
        } 
        else {
        LogOut();
        }
    })
    }
    useEffect(
    () => {
        console.log("hi");
        isAuthorized();
    }
    , [])
    return (
        <>
        <LoginContextProvider value={{ isLoggedIn, LogIn, LogOut, username, setUsername }} >
            <Header />
            <Outlet />
        </LoginContextProvider>
        </>
    )
}

export default Layout