import React from 'react';
import '../../App.css';
import { NavLink } from 'react-router-dom';

const home = ()=>{
    
}
const Header = () => {
  return (
    <>
      <header className='navBar'>
        <div className='side-image-nav-bar'>
          <nav>
            <NavLink to ="/">
              <img src='./src/assets/dotslashLogo.png' alt="logo" id='logo1' onClick={home}/>
            </NavLink>
          </nav>
          {/* <img src='./src/assets/dotslashName.png' alt="logo" id='logo2' /> */}
        </div>
        <nav className='navGroup'>
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
          <NavLink to="/discussions" className={({ isActive }) => `${isActive ? "glow-text-nav-bar" : ""}`}>
            Discussions
          </NavLink>
          <NavLink to="/blogs" className={({ isActive }) => `${isActive ? "glow-text-nav-bar" : ""}`}>
            Blogs
          </NavLink>
          <NavLink to="/login" className={({ isActive }) => `${isActive ? "glow-text-nav-bar" : ""}`}>
            Login
          </NavLink>
        </nav>
      </header>
    </>
  );
};

export default Header;