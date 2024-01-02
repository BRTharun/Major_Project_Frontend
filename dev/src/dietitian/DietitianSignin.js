import React, { useState } from 'react';

import axios from 'axios';
import DietitianHome from './DietitianHome';
import { Navigate } from 'react-router-dom';

const DietitianSignin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [signinSuccess, setSigninSuccess] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/dietitian/signin', formData);
      console.log(response.data); // Handle successful signin

      localStorage.setItem('dietitianToken', response.data.token);
      console.log("sent",response.data.token)
      setSigninSuccess(true);
    } catch (error) {
      console.error('Signin failed', error);
    }
  };

  return (
    <div>
      {signinSuccess ? (
        <Navigate to="/dietitian/home" />
      ) : (
        <div>
          <h2>Dietitian Signin</h2>
          <input type="text" name="username" placeholder="Username" onChange={handleInputChange} />
          <input type="password" name="password" placeholder="Password" onChange={handleInputChange} />
          <button onClick={handleSignin}>Signin</button>
        </div>
      )}
    </div>
  );
};

export default DietitianSignin;
