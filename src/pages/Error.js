import React from 'react';
import './Error.css'; 

const ErrorAlert = ({ errorMessage }) => {
  if (!errorMessage) return null;

  return (
    <div className="error-alert">
      <p>{errorMessage}</p>
    </div>
  );
};

export default ErrorAlert;
