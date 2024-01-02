import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [image, setImage] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [result, setResult] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const imageUrl = encodeURIComponent(image.name); // Encode the image name to be part of the URL

    try {
      // Send image to the server for prediction
      const predictionResponse = await axios.post(`http://localhost:8000/food-predict/?image_path=${imageUrl}&quantity=${quantity}`);
      const predictionResult = predictionResponse.data;

      // Store the result in the state
      setResult(predictionResult);

      // Send the data to the server for storage

      const fetchUserProfile = async () => {
        try {
          const storedToken = localStorage.getItem('token');
          console.log('Stored Token:', storedToken);
          if (!storedToken) {
            console.error('No token found. User is not authenticated.');
            return;
          }
      
          const responseUserId = await axios.get('http://localhost:3000/user/profile', {
            headers: {
              'x-auth-token': storedToken,
            },
          });
      
          console.log('User ID Response:', responseUserId.data);
      
          const userId = responseUserId.data.user.id;
          console.log('User ID:', userId);
      
          const responseProfile = await axios.get(`http://localhost:3000/user/profile/${userId}`, {
            headers: {
              'x-auth-token': storedToken,
            },
          });
      
          return responseUserId.data.user.id;
        } catch (error) {
          console.error('Error fetching user profile', error);
          throw error;
        }
      };

      const userId =await fetchUserProfile();
  
      const uploadResponse = await axios.post(
        `http://localhost:3000/user/upload/${userId}`,
        {
          pic: imageUrl,
          quantity,
          date: new Date(),
          time: new Date().toLocaleTimeString(),
          Prediction: predictionResult.Prediction,
          'Protein (g)': predictionResult['Protein (g)'],
          'Carbohydrates (g)': predictionResult['Carbohydrates (g)'],
          'Fat (g)': predictionResult['Fat (g)'],
          'Total_Calories': predictionResult['Total_Calories'],
          Rasa: predictionResult.Rasa,
          Guna: predictionResult.Guna,
          Virya: predictionResult.Virya,
        },
        {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
          },
        }
      );

      console.log('Upload Successful:', uploadResponse.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="App">
      <h1>Food Calorie Calculator</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="image">Upload Image:</label>
          <input type="file" accept="image/*" id="image" onChange={handleImageChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity (grams):</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <button type="submit">Calculate</button>
      </form>
      {result && (
        <div className="result">
          <h2>Result</h2>
          <p>Prediction: {result.Prediction}</p>
          <p>Quantity: {result.Quantity} grams</p>
          <p>Protein (g): {result['Protein (g)']}</p>
          <p>Carbohydrates (g): {result['Carbohydrates (g)']}</p>
          <p>Fat (g): {result['Fat (g)']}</p>
          <p>Total Calories: {result['Total_Calories']}</p>
          <p>Rasa: {result.Rasa}</p>
          <p>Guna: {result.Guna}</p>
          <p>Virya: {result.Virya}</p>
        </div>
      )}
    </div>
  );
}

export default App;
