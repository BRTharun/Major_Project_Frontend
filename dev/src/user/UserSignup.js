import React, { useState } from 'react';
import axios from 'axios';
import SignupSuccess from './SignupSuccess';

const UserSignup = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    age: '',
    sex: '',
    height: '',
    weight: '',
    diseases: [],
  });
  const [signupSuccess, setSignupSuccess] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:3000/user/signup', formData);
      console.log(response.data); // Handle successful signup
      setSignupSuccess(true);
    } catch (error) {
      console.error('Signup failed', error);
    }
  };

  return (
    <div>
      {signupSuccess ? (
        <SignupSuccess />
      ) : (
        <div>
          <h2>User Signup</h2>
          <input type="text" name="username" placeholder="Username" onChange={handleInputChange} />
          <input type="password" name="password" placeholder="Password" onChange={handleInputChange} />
          <input type="text" name="name" placeholder="Name" onChange={handleInputChange} />
          <input type="text" name="age" placeholder="Age" onChange={handleInputChange} />
          <input type="text" name="sex" placeholder="Sex" onChange={handleInputChange} />
          <input type="text" name="height" placeholder="Height" onChange={handleInputChange} />
          <input type="text" name="weight" placeholder="Weight" onChange={handleInputChange} />
          <input type="text" name="diseases" placeholder="Diseases (comma-separated)" onChange={handleInputChange} />
          <button onClick={handleSignup}>Signup</button>
        </div>
      )}
    </div>
  );
};

export default UserSignup;
