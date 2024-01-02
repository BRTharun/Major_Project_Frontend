import React from 'react';
import { Link } from 'react-router-dom';

const UserHome = () => {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/user/home">Home</Link></li>
          <li><Link to="/user/food">Suggested Food</Link></li>
          <li><Link to="/user/yoga">Suggested Yoga</Link></li>
          <li><Link to="/user/fooddata">Your Food Calories</Link></li>
          <li><Link to="/user/rasa">Get Rasa</Link></li>
          <li><Link to="/user/photo">Upload Food</Link></li>
          <li>
            <Link to="/user/profile">Profile</Link>
            <ul className="dropdown">
              <li><Link to="/user/see-profile">See Profile</Link></li>
              <li><Link to="/user/update-profile">Update Profile</Link></li>
              <li><Link to="/user/logout">Logout</Link></li>
            </ul>
          </li>
        </ul>
      </nav>
      <h1>Welcome, User!</h1>
      {/* Add your main content here */}
    </div>
  );
};

export default UserHome;
