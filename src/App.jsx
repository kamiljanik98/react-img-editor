import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './App.css';

function App() {
  const [image, setImage] = useState(null);
  const [filter, setFilter] = useState('none');

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
              filter: filter, // Apply selected filter
            }}
          ></canvas>
        </div>
      )}

      {/* Filter controls */}
      <div className="filters">
        <button onClick={() => setFilter('none')}>None</button>
        <button onClick={() => setFilter('grayscale(100%)')}>Grayscale</button>
        <button onClick={() => setFilter('sepia(100%)')}>Sepia</button>
        <button onClick={() => setFilter('brightness(150%)')}>Brightness</button>
      </div>
    </div>
  );
}

export default App;
