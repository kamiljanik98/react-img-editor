import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './App.css';

function App() {
  const [image, setImage] = useState(null);
  const [grayscale, setGrayscale] = useState(0);
  const [sepia, setSepia] = useState(0);
  const [brightness, setBrightness] = useState(100);

  // Handle the file drop
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*', // Only accept images
    multiple: false,   // Accept only one image at a time
  });

  // Generate the filter CSS string based on slider values
  const filter = `grayscale(${grayscale}%) sepia(${sepia}%) brightness(${brightness}%)`;

  return (
    <div className="App">
      <h1>React Dropzone Image Filter App</h1>
      {/* Dropzone */}
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop an image here, or click to select one</p>
      </div>

      {/* Image canvas */}
      {image && (
        <div className="canvas-container">
          <canvas
            id="imageCanvas"
            style={{
              backgroundImage: `url(${image})`,
              filter: filter, // Apply dynamic filters from sliders
            }}
          ></canvas>
        </div>
      )}

      {/* Filter controls with sliders */}
      {image && (
        <div className="sliders">
          <div>
            <label>Grayscale: {grayscale}%</label>
            <input
              type="range"
              min="0"
              max="100"
              value={grayscale}
              onChange={(e) => setGrayscale(e.target.value)}
            />
          </div>
          <div>
            <label>Sepia: {sepia}%</label>
            <input
              type="range"
              min="0"
              max="100"
              value={sepia}
              onChange={(e) => setSepia(e.target.value)}
            />
          </div>
          <div>
            <label>Brightness: {brightness}%</label>
            <input
              type="range"
              min="50"
              max="200"
              value={brightness}
              onChange={(e) => setBrightness(e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
