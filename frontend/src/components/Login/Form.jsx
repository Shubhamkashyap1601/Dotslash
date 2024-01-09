import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginContext } from '../../context/LoginContext.js';
import {toast} from 'react-toastify'

const Form = ({ formType, inputFields }) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const {isLoggedIn,LogIn,LogOut,username,setUsername} = useLoginContext();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const sendDataToBackend = async (data) => {
    setIsDisabled(true);
    if (formType === "Login") {
      fetch('/api/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      .then(async(response) => {
          if (response.ok)
          {
            const data = await response.json();
            setUsername(data.data.user.username)
            LogIn();
            navigate('/');
          }
          else{
            toast.error("Wrong username or password",{
              position:toast.POSITION.BOTTOM_LEFT
            })
          }
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
        });
      }
      else {
      fetch('/api/register', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response from backend:", data);
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      })
      .finally(() => {setIsDisabled(false)});
    }
  };
  
  const handleSubmit = (e) => {
    if(isDisabled) return;
    e.preventDefault();
    sendDataToBackend(formData);
  };

  return (
    <>
    
      <form onSubmit={handleSubmit}>
        {inputFields.Fields.map((field) => (
          <input
            key={field.name}
            type={field.type || 'text'}
            name={field.name || ''}
            placeholder={field.placeholder || ''}
            onChange={handleChange}
            required={field.required} 
          />
        ))}
        <button type="submit">{inputFields.buttonText}</button>
        <Link to={inputFields.toAddress || '/login'} className="forgot-password">
          {inputFields.changePageText}
        </Link>
        <a href="#" className="forgot-password">
          Forgot Password?
        </a>
      </form>
    </>
  );
};

export default Form;
