import React from 'react';
import '../../App.css'; // Import your CSS file
import SideImage from './SideImage.jsx'
import AuthenticationCard from './AuthenticationCard.jsx';
const LoginPage = () => {

  const Fields = [
    { name: 'email',id:'email', type: 'email', placeholder: 'Email ID', required: true,key:1},
    { name: 'password',id:'password', type: 'password', placeholder: 'Password', required: true,key:2},
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
