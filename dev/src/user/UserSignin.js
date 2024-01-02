import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const UserSignin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [signinSuccess, setSigninSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignin = async () => {
    try {
      setLoading(true);
  
      const response = await axios.post('http://localhost:3000/user/signin', formData);
      console.log(response.data); // Handle successful signin
      
      // Set the token in local storage
      localStorage.setItem('token', response.data.token);
  
      setSigninSuccess(true);
    } catch (error) {
      console.error('Signin failed', error);
      setError('Invalid credentials. Please check your username and password.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div>
      {signinSuccess ? (
        <Navigate to="/user/home" />
      ) : (
        <div>
          <h2>User Signin</h2>
          <input type="text" name="username" placeholder="Username" onChange={handleInputChange} />
          <input type="password" name="password" placeholder="Password" onChange={handleInputChange} />
          <button onClick={handleSignin} disabled={loading}>
            {loading ? 'Signing in...' : 'Signin'}
          </button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      )}
    </div>
  );
};

export default UserSignin;
