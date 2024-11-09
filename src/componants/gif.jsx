// src/components/DisplayImage.js
import React from 'react';
import { useSelector } from 'react-redux';

const DisplayImage = () => {
  const capturedImage = useSelector((state) => state.capturedImage);

  return (
    <div className='inline-flex relative justify-center items-center'>
      {capturedImage ? (
        <img src={capturedImage} alt="Captured" />
      ) : (
        <p>No image captured yet.</p>
      )}
    </div>
  );
};

export default DisplayImage;
