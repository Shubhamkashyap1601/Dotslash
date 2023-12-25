import React from 'react';
import '../../App.css'; // Import your CSS file
import SideImage from './SideImage.jsx'
import AuthenticationCard from './AuthenticationCard.jsx';

const SignUp = () => {

    const Fields = [
        { name: 'name', id: 'name', type: 'text', placeholder: 'Full Name', required: true, key: 1 },
        { name: 'username', id: 'username', type: 'text', placeholder: 'User Name', required: true, key: 2 },
        { name: 'rollNo', id: 'rollNo', type: 'text', placeholder: 'Roll Number', required: true, key: 3 },
        { name: 'email', id: 'email', type: 'email', placeholder: 'Email ID', required: true, key: 4 },
        { name: 'password', id: 'password', type: 'password', placeholder: 'Password', required: true, key: 5 },
        { name: 'confirmPassword', id: 'confirmPassword', type: 'password', placeholder: 'Re Enter Password', required: true, key: 6 },
    ];

    const inputFields = {
        Fields: Fields,
        changePageText: "Already registered? Login!",
        buttonText: "Sign up",
        toAddress: '/login'
    }

    return (
        <>
            <div className='cover-for-popup'>
                <div className="login-container">

                    <SideImage />
                    <AuthenticationCard headerTitle="Sign Up" inputFields={inputFields} />

                </div>
            </div>
        </>
    );
};

export default SignUp;