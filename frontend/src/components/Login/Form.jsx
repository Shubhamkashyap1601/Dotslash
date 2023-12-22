import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Form = ({ formType ,inputFields }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Here you can send the formData to your backend
    sendDataToBackend(formData);
  };

  const sendDataToBackend = async (data) => {
    if(formType === "Login"){
      fetch('/api/login', {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Response from backend:", data);
          // Handle the response as needed
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
        });
    }
    else
    {
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
          // Handle the response as needed
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
        });
    }
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
        <a href="#" className="forgot-password">
          Forgot Password?
        </a>
        <Link to={inputFields.toAddress || '/login'} className="forgot-password">
          {inputFields.changePageText}
        </Link>
        <button type="submit">{inputFields.buttonText}</button>
      </form>
    </>
  );
};

export default Form;
