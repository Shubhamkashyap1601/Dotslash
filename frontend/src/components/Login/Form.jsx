import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Form = ({ formType, inputFields }) => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const sendDataToBackend = async (data) => {
    if (formType === "Login") {
      fetch('/api/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      .then((response) => {
          if (response.ok) navigate('/');
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
      });
    }
  };
  
  const handleSubmit = (e) => {
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
