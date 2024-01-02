import React, { useState } from 'react';

import axios from 'axios';
import SignupSuccess from './SignupSuccess';

import { Navigate } from 'react-router-dom';

const DietitianSignup = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [token, setToken] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:3000/dietitian/signup', formData);
      console.log(response.data); // Handle successful signup
      setSignupSuccess(true);

      // Set the token in local storage
      localStorage.setItem('dietitianToken', response.data.token);
      console.log("dfjs", response.data.token)
      setToken(response.data.token);
      console.log("stored",token);
    } catch (error) {
      console.error('Signup failed', error);
    }
  };

  // Redirect if signup was successful
  if (signupSuccess) {
    return <SignupSuccess />;
  }

  // Redirect if token is present
  if (token) {
    return <Navigate to="/dietitian/home" />;
  }

  return (
    <div>
      <h2>Dietitian Signup</h2>
      <input type="text" name="username" placeholder="Username" onChange={handleInputChange} />
      <input type="password" name="password" placeholder="Password" onChange={handleInputChange} />
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
};

export default DietitianSignup;
