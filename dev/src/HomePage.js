import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h2>Welcome to the Homepage</h2>
      <div>
        <h3>User Actions</h3>
        <Link to="/user/signup">
          <button>User Signup</button>
        </Link>
        <Link to="/user/signin">
          <button>User Signin</button>
        </Link>
      </div>
      <div>
        <h3>Dietitian Actions</h3>
        <Link to="/dietitian/signup">
          <button>Dietitian Signup</button>
        </Link>
        <Link to="/dietitian/signin">
          <button>Dietitian Signin</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
