import React from 'react'
import Header from './components/Header/Header.jsx'
import { Outlet } from 'react-router-dom'

function Layout() {
    return (
        <>
            <Header />
            <div className='OUTLET'>
                <Outlet />
            </div>
        </>
    )
}

export default Layout