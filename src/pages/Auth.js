import React, { useState } from 'react';
import LoginComponent from './Login'; 
import RegisterComponent from './Register'; 
import './Auth.css';

const AuthPage = () => {
  const [isLoginView, setIsLoginView] = useState(true);

  return (
    <div className="auth-container">
      <div className="toggle-links">
        <span 
          className={isLoginView ? 'active' : ''} 
          onClick={() => setIsLoginView(true)}
        >
          Login
        </span>
        <span 
          className={!isLoginView ? 'active' : ''} 
          onClick={() => setIsLoginView(false)}
        >
          Register
        </span>
      </div>
      <div className="form-container">
        {isLoginView ? <LoginComponent /> : <RegisterComponent />}
      </div>
    </div>
  );
};

export default AuthPage;
