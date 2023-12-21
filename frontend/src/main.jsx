import React from 'react'
import ReactDOM from 'react-dom/client'
import LoginPage from './components/Login/LoginPage.jsx'
import './index.css'
import SignUp from './components/Login/SignUp.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LoginPage />
    {/* <SignUp /> */}
  </React.StrictMode>,
)
