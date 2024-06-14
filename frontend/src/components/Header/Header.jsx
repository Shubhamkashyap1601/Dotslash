import React, { useEffect, useState } from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';
import {useLoginContext} from '../../context/LoginContext.js';
import dotslashLogo from "../../assets/dotslashLogo.png";

const Header = () => {

  const {isLoggedIn,username,LogIn,LogOut} = useLoginContext();

  const logout = async()=>{
    try {
      const response = await fetch('/api/logout',{method:"POST"})
      if(!response.ok){
        console.error("Error occured while logging out :",response)
      }
      else{
        LogOut()
      }
    } catch (error) {
      console.error("Error occured while logging out :",error)
    }
  }

  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };
  return (
    <>
      <header className='navBar'>
        <div className='side-image-nav-bar'>
          <NavLink className="Logo" to="/">
            <img src={dotslashLogo} alt="logo" id='logo1'/>
          </NavLink>
        </div>
        <div className="navbar-toggle" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <nav className={`navGroup ${menuActive ? 'active' : ''}`}>
          <NavLink to="/" className={({ isActive }) => `${isActive ? "glow-text-nav-bar" : ""}`}>
            Home
          </NavLink>
          <NavLink to="/announcements" className={({ isActive }) => `${isActive ? "glow-text-nav-bar" : ""}`}>
            Announcements
          </NavLink>
          <NavLink to="/resources" className={({ isActive }) => `${isActive ? "glow-text-nav-bar" : ""}`}>
            Resources
          </NavLink>
          <NavLink to="/mentors" className={({ isActive }) => `${isActive ? "glow-text-nav-bar" : ""}`}>
            Mentors
          </NavLink>
          <NavLink to="/ratings" className={({ isActive }) => `${isActive ? "glow-text-nav-bar" : ""}`}>
            Ratings
          </NavLink>
          <NavLink to="/blogs" className={({ isActive }) => `${isActive ? "glow-text-nav-bar" : ""}`}>
            Blogs
          </NavLink>
          {
            !isLoggedIn ? (
              <NavLink to="/login" className={({ isActive }) => `${isActive ? "glow-text-nav-bar" : ""}`}> Login </NavLink>
            )
            :(
              <>
                <NavLink to={`/user/${username}`} className={({ isActive }) => `${isActive ? "glow-text-nav-bar" : ""}`}>{username}</NavLink>
                <NavLink to="#" onClick={logout}>Logout</NavLink>
              </>
            )
          }
        </nav>
      </header>
    </>
  );
};

export default Header;