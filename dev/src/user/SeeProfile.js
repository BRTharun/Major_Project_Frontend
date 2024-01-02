import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SeeProfile = () => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const storedToken = localStorage.getItem('token');
        console.log('Stored Token:', storedToken);
        if (!storedToken) {
          console.error('No token found. User is not authenticated.');
          return;
        }
    
        // Step 1: Get user ID
        const responseUserId = await axios.get('http://localhost:3000/user/profile', {
          headers: {
            'x-auth-token': storedToken,
          },
        });
    
        // Step 2: Use the obtained user ID to fetch the detailed profile
        const userId = responseUserId.data.user.id;
        const responseProfile = await axios.get(`http://localhost:3000/user/profile/${userId}`, {
          headers: {
            'x-auth-token': storedToken,
          },
        });
    
        setProfileData(responseProfile.data.user);
      } catch (error) {
        console.error('Error fetching user profile', error);
      }
    };
    
      

    fetchUserProfile();
  }, []);

  return (
    <div>
      <h2>See Profile</h2>
      {profileData ? (
  <div>
    <p>Name: {profileData.name}</p>
    <p>Age: {profileData.age}</p>
    <p>Sex: {profileData.sex}</p>
    <p>Height: {profileData.height}</p>
    <p>Weight: {profileData.weight}</p>
    <p>Diseases: {Array.isArray(profileData.diseases) ? profileData.diseases.join(', ') : 'No diseases'}</p>
    <p>Rasa State: {profileData.rasaState}</p>
  </div>
) : (
  <p>Loading...</p>
)}

    </div>
  );
};

export default SeeProfile;
