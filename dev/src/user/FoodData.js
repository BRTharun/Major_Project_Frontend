// pages/UploadedDataPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UploadedDataCard from './UploadedDataCard';

const UploadedDataPage = () => {
  const [uploadedData, setUploadedData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUploadedData = async () => {
    try {
      const storedToken = localStorage.getItem('token');
      if (!storedToken) {
        console.error('No token found. User is not authenticated.');
        return;
      }

      // Fetch user ID
      const responseUserId = await axios.get('http://localhost:3000/user/profile', {
        headers: {
          'x-auth-token': storedToken,
        },
      });
      const userId = responseUserId.data.user.id;

      // Fetch uploaded data using the user ID
      const responseUploadedData = await axios.get(`http://localhost:3000/user/upload/${userId}`, {
        headers: {
          'x-auth-token': storedToken,
        },
      });

      setUploadedData(responseUploadedData.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching uploaded data', error);
    }
  };

  useEffect(() => {
    fetchUploadedData();
  }, []);

  return (
    <div className="uploaded-data-page">
      <h1>Uploaded Data Page</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        uploadedData.map((data) => <UploadedDataCard key={data._id} data={data} />)
      )}
    </div>
  );
};

export default UploadedDataPage;
