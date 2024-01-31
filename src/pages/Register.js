import React, { useState, useContext } from 'react';
import { AppContext } from '../AppContext';
import './Register.css';
import ErrorAlert from './Error';
import { useNavigate } from 'react-router-dom';


const RegisterComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { register, error } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const success = await register({ username, password });
    if (success) {
      navigate('/tasks');
    }
  };

  return (
    <div>
      <ErrorAlert errorMessage={error} />

      <form onSubmit={handleSubmit} className="register-form">
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>

    </div>
  );
};

export default RegisterComponent;
