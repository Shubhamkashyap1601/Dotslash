import React, { useEffect } from 'react';
import './user.css';

const User = () => {
    // useEffect(() => {
    //     const cursor = document.getElementById('cursor');

    //     document.addEventListener('mousemove', e => {
    //         cursor.setAttribute("style", "top: "+(e.pageY - 15)+"px; left: "+(e.pageX - 15)+"px;")
    //     })
    // }, []);

    return (
        <>
        <div id="cursor"></div>
        <div className='user-background'>
            <div className='user-info'>
                <div className='user-profile'>

                    <img src='..\..\src\assets\react.svg' alt="profile" className='user-img'/>
                        <h3>John Doe</h3>   
                        <h3>Full stack developer</h3>
                        <button>Message</button>
                    
                </div>
                
                <div className='user-links'>
                        <nav>Github</nav>
                        <nav>Linkedin</nav>
                        <nav>Codeforces</nav>
                        <nav>Codechef</nav>
                        <nav>X</nav>
                </div>
            </div>

            <div className='user-bio'>
                <div className='user-details'>
                    <h3>Name : John Doe</h3>
                    <h3>Email : John Doe</h3>
                    <h3>Phone : John Doe</h3>
                </div>

                <div className='user-works'>
                    <h3>Work Experience</h3>
                    <h3>Work Experience</h3>
                    <h3>Work Experience</h3>
                </div>
            </div>
        </div>
        </>
    );
};

export default User;
