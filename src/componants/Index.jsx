import React, { useCallback, useRef, useState } from 'react';
import { AiOutlineCloudUpload,
  AiOutlineDelete
 } from "react-icons/ai";
import preview from '../images/preview.jpg';
import Webcam from 'react-webcam';
import { FaCamera,  FaCircle } from 'react-icons/fa'; // React icons for camera, flash, and focus
import { useDispatch } from 'react-redux';
import { setCapturedImage } from '../redux/action';
import Gif from "../componants/gif"
const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: 'user', // For front camera
};

const App = () => {
  const [selectedImage, setSelectedImage] = useState(preview);
  const [gif, setGif] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  
  const generateGif = async () => {
    setLoading(true);
    const response = await fetch("", {
      method: "POST",
      body: JSON.stringify({ image }),
      headers: { "Content-Type": "application/json" },
    });
    const result = await response.blob();
    setGif(URL.createObjectURL(result));
    setLoading(false);
  };
  const handleImageCapture = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result;
        setSelectedImage(imageData);  // For local preview
        dispatch(setCapturedImage(imageData));  // Dispatch to Redux store
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to handle file input change
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));  // Create a preview URL for the image
    }
  };

  // Function to trigger file input when the icon is clicked
  const triggerFileInput = () => {
    document.getElementById('fileInput').click();  // Programmatically click the file input
  };

  // const [flashOn, setFlashOn] = useState(false);  // State to simulate flash control
  const [imageSrc, setImageSrc] = useState(preview); // State to store captured image
  const webcamRef = useRef(null);                 // Reference to the webcam component
  const [isFocusing, setIsFocusing] = useState(false);  // State to simulate focus

  // Function to capture image
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
  }, [webcamRef]);


  // Simulate focusing (this is just a UI effect, not an actual camera focus)
  const handleFocus = () => {
    setIsFocusing(true);
    setTimeout(() => setIsFocusing(false), 1000);  // Simulate focus time
  };
  

  return (
    <div > 
    <div className="min-h-screen  p-6">
        <h1 className="text-3xl font-semibold text-center mb-6">Real-Time GIF Generator</h1> 
        
        <div className="flex justify-between items-start">
      <div className=" shadow-lg rounded-lg p-4  w-full max-w-lg bg-gray-200 ">
        
        {/* Image Upload */}

        
        <div className="mb-4">
          <label className="block mb-2 text-lg font-medium">Face Image</label>
          <div className=' rounded-t-lg'>

          {imageSrc && (
        <div className="">
           {selectedImage && <img src={selectedImage} alt="Captured Preview" className="h-52 w-96 ml-7 mr-7object-cover rounded shadow-md"/>} 
        </div>
      )}
            {isFocusing && (
              <div className="inline-flex items-center ">
            <FaCircle size={100} className="text-white opacity-50" />  {/* Simulated focus icon */}
          </div>
        )}
        </div>

          <div className='bg-white ml-7 mr-16 py-4 rounded-b-lg'>
            <div className="cursor-pointer ml-32 mr-3 inline-flex relative "
           onClick={triggerFileInput}>

          <AiOutlineCloudUpload size={30}/>
            </div>
            <input
        type="file"
        id="fileInput"
        accept="image/*"
        onChange={handleImageCapture}
        style={{ display: 'none' }}  // Hide the input, we will trigger it with the icon
      />
      <div className='inline-flex items-center rounded-md text-white justify-center relative mt-5 bg-red-600 h-12 w-12'>

      <AiOutlineDelete size={30} />
      </div>
        <div className="inline-flex relative items-center ml-3">

      <button
          onClick={capture}
          className=" inline-flex relative items-center mt-2 p-4 bg-blue-600 text-white rounded-full hover:bg-blue-700"
          >
          <FaCamera size={24} />  {/* Camera icon */}
        </button>
        </div>
      <div>

      <div className="relative">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          className="rounded-md flex justify-center items-center h-10 w-10"
          onClick={handleFocus}  // Simulate focus when webcam is clicked
          />
      </div>

  
          </div>
          <p  className='text-blue-900 text-base  flex justify-center items-center cursor-pointer'>Click or Drag-n-Drop
          </p>
          <input 
            type="file" 
            accept="image/png, image/jpeg, image/gif" 
            className="hidden" 
            onChange={handleImageChange} 
            />
          <p className='text-gray-500 text-sm flex justify-center items-center mt-3'>PNG, JPG or GIF, Up-to 2048 x 2048 px</p>
        </div>

       
        {/* Submit Button */}
        <button className="w-full  text-black py-2  rounded-lg mt-5 flex justify-center items-center bg-white hover:bg-blue-800 border border-black border-solid">
          Generate
        </button>
            </div>
      </div>
      
      {/* Preview the selected image */}
            <div  className="w-1/2 p-4 mr-10">

      {selectedImage ? (
        <div className="mt-4 ">
          <h3 className="text-lg font-medium mb-2">Image Preview:</h3>
          <img
            src={selectedImage}
            alt="Selected"
            className="w-full h-auto object-cover rounded shadow-md"
          />
        </div>
      ): (<Gif/>)}
</div>
</div>
      </div>
      </div>
  );
};

export default App;
