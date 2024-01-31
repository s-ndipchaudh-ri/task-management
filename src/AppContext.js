import React, { createContext, useState } from 'react';
import axios from 'axios';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Authentication state and functions
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  const login = async (credentials) => {
    try {
      const response = await axios.post('http://localhost:8001/user/login', credentials, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.status === 200 && response.data.data.accessToken) {
        localStorage.setItem('accessToken', response.data.data.accessToken);
        // Set the user information as well
        setUser(response.data.data);
        return true
      } else {
        // throw new Error('Login failed');
        return false
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        // When the error response contains a custom message
        setError(error.response.data.message);
      } else {
        // For other kinds of errors
        setError(error.message || 'An error occurred during login');
      }
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post('http://localhost:8001/user', userData, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.status === 200 && response.data.data.accessToken) {
        localStorage.setItem('accessToken', response.data.data.accessToken);
           // Handle successful registration
        setUser(response.data.data);

           console.log('Registration successful:', response.data);
           return true; // Indicate success

      } else {
        // throw new Error('Registration failed');
        return false
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred during registration');
      }
    }
  };

  const logout = () => {
    setUser(null);
  };

  // Task CRUD state and functions
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <AppContext.Provider value={{ user, login, register, logout, tasks, addTask, updateTask, deleteTask,error }}>
      {children}
    </AppContext.Provider>
  );
};
