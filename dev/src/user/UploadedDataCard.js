// components/UploadedDataCard.js
import React from 'react';

const UploadedDataCard = ({ data }) => {
  return (
    <div className="uploaded-data-card">
      <h3>Uploaded Data</h3>
      <div>
        <p>Image:</p>
        <img src={`http://localhost:3000/path/to/your/images/${data.pic}`} alt={data.pic} />
      </div>
      <p>Quantity: {data.quantity} grams</p>
      <p>Date: {new Date(data.date).toLocaleDateString()}</p>
      <p>Time: {data.time}</p>
      <p>Prediction: {data.Prediction}</p>
      <p>Protein (g): {data['Protein (g)']}</p>
      <p>Carbohydrates (g): {data['Carbohydrates (g)']}</p>
      <p>Fat (g): {data['Fat (g)']}</p>
      <p>Total Calories: {data['Total_Calories']}</p>
      <p>Rasa: {data.Rasa}</p>
      <p>Guna: {data.Guna}</p>
      <p>Virya: {data.Virya}</p>
      {/* Add other data fields as needed */}
    </div>
  );
};

export default UploadedDataCard;
