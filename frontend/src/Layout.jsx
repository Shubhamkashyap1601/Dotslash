import React, { useState,useEffect } from 'react'
import Header from './components/Header/Header.jsx'
import { Outlet } from 'react-router-dom'
import { LoginContextProvider } from './context/LoginContext.js';
import {toast,ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"

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
   try {
     fetch('/api/authorized', 
         {
         method: 'GET',
         credentials: 'include',
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
         toast.warning("Please Login to view restricted content",{
             position: toast.POSITION.BOTTOM_LEFT
         })
         }
     })
   } catch (error) {
    console.error(error);
   }
    }
    useEffect(
    () => {
        isAuthorized();
    }
    , [])
    return (
        <>
        <LoginContextProvider value={{ isLoggedIn, LogIn, LogOut, username, setUsername }} >
            <Header />
            <Outlet />
            <ToastContainer/>
        </LoginContextProvider>
        </>
    )
}

export default Layout