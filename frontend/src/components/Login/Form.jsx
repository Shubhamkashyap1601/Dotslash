import React, { useState } from 'react';

const Form = ({inputFields}) => {
    return (
        <>
            <form>
                {inputFields.Fields.map((field) => (
                    <input
                        type={field.type || 'text'}
                        name={field.name || ''}
                        placeholder={field.placeholder || ''}
                        // onChange={handleChange}
                        required={field.required}
                    />
                ))}
                <a href="#" className="forgot-password">Forgot Password?</a>
                <a href="#" className="forgot-password">{inputFields.changePageText}</a>
                <button type="submit">{inputFields.buttonText}</button>
            </form>
        </>
    );
};

export default Form;
