import React from 'react';
import Form from './Form.jsx';

const AuthenticationCard = ({headerTitle, inputFields}) => {
    return (
        <>
            <div className="authentication-page">
                <h2 className="login-title">{headerTitle}</h2>
                <Form inputFields={inputFields} />
            </div>
        </>
    );
}

export default AuthenticationCard  
// {/* <form action="#" method="post">
//     <input type="email" id="email" name="email" placeholder="Email ID" required />
//     <input type="password" id="password" name="password" placeholder="Password" required />

//     <a href="#" className="forgot-password">Forgot Password?</a>
//     <a href="registration.html" className="forgot-password">{changePageText}</a>

//     <button type="submit" className="button">{buttonText}</button>
// </form> */}