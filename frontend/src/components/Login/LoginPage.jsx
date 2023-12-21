import React from 'react';
import '../../App.css'; // Import your CSS file
import SideImage from './SideImage.jsx'
import AuthenticationCard from './AuthenticationCard.jsx';
const LoginPage = () => {

  const Fields = [
    { name: 'email', type: 'email', placeholder: 'Email ID', required: true },
    { name: 'password', type: 'password', placeholder: 'Password', required: true },
  ];

  const inputFields = {
    Fields: Fields,
    changePageText: "Not Registered? Sign up!",
    buttonText: "Login"
  }

  return (
    <>
      <div className="login-container">

        <SideImage />
        <AuthenticationCard headerTitle="Login" inputFields={inputFields} />

      </div>
    </>
  );
};

export default LoginPage;
        // {/* <div className="authentication-page">
        //   <h2 className="login-title">Login</h2>
        //   <form action="#" method="post">
        //     <input type="email" id="email" name="email" placeholder="Email ID" required />
        //     <input type="password" id="password" name="password" placeholder="Password" required />

        //     <a href="#" className="forgot-password">Forgot Password?</a>
        //     <a href="registration.html" className="forgot-password">Not registered? Sign up!</a>

        //     <button type="submit">Login</button>
        //   </form>
        // </div> */}
