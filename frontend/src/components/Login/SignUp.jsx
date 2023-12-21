import React from 'react';
import '../../App.css'; // Import your CSS file
import SideImage from './SideImage.jsx'
import AuthenticationCard from './AuthenticationCard.jsx';

const SignUp = () => {

    const Fields = [
        { name: 'name', type: 'text', placeholder: 'Full Name', required: true },
        { name: 'username', type: 'text', placeholder: 'User Name', required: true },
        { name: 'rollNo', type: 'text', placeholder: 'Roll Number', required: true },
        { name: 'email', type: 'email', placeholder: 'Email ID', required: true },
        { name: 'password', type: 'password', placeholder: 'Password', required: true },
        { name: 'confirmPassword', type: 'password', placeholder: 'Re Enter Password', required: true},
    ];

    const inputFields = {
        Fields: Fields,
        changePageText: "Already registered? Login in!",
        buttonText: "Sign up"
    }

    return (
        <>
            <div className="login-container">

                <SideImage />
                <AuthenticationCard headerTitle="Sign Up" inputFields={inputFields} />

            </div>
        </>
    );
};

export default SignUp;