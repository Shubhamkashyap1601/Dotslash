import React from 'react';
import Form from './Form.jsx';

const AuthenticationCard = ({headerTitle, inputFields}) => {
    return (
        <>
            <div className="authentication-page">
                <h2 className="login-title">{headerTitle}</h2>
                <Form formType={headerTitle} inputFields={inputFields} />
            </div>
        </>
    );
}

export default AuthenticationCard  
