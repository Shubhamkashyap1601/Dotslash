import React from 'react';
import '../../App.css';

const Header = () => {
  return (
    <>
      <header className='navBar'>
        <div className='side-image-nav-bar'>
            <img src='./src/assets/dotslashLogo.png' alt="logo" id='logo1' />
            <img src='./src/assets/dotslashName.png' alt="logo" id='logo2' />
        </div>
        <nav className='navGroup'>
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Services</a>
          <a href="#">Contact</a>
        </nav>
      </header>
    </>
  );
};

export default Header;