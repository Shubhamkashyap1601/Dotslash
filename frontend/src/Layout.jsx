import React, { useState,useEffect } from 'react'
import Header from './components/Header/Header.jsx'
import { Outlet } from 'react-router-dom'
import {LoginContextProvider } from './context/LoginContext.js'

function Layout() {

    const [isLoggedIn,setIsUserLogged] = useState(() => {
        return ((JSON.parse(localStorage.getItem('isLoggedIn')))|| false);
      });
    const [username,setUsername] = useState(() => {
        return ((JSON.parse(localStorage.getItem('username')))|| "guest");
      });
    
    const LogIn = (name)=>{
        setIsUserLogged(true);
    }
    const LogOut = ()=>{
        setIsUserLogged(false);
        setUsername("guest");
    }
    useEffect(() => {
        localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
    }, [isLoggedIn]);
    useEffect(() => {
        localStorage.setItem('username', JSON.stringify(username));
    }, [username]);
    return (
        <LoginContextProvider value = {{isLoggedIn,LogIn,LogOut,username,setUsername}} >
            <Header />
            <Outlet />
        </LoginContextProvider>
    )
}

export default Layout