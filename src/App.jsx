// src/App.jsx
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Canvas from './components/Canvas/Canvas';

const App = () => {
  const [image, setImage] = useState(null);
  const [blur, setBlur] = useState(0);
  const [brightness, setBrightness] = useState(100);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const imgUrl = URL.createObjectURL(file);
    setImage(imgUrl);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Image Filter App</h1>
      <div {...getRootProps()} style={{ border: '2px dashed #aaa', padding: '20px', cursor: 'pointer', marginBottom: '20px' }}>
        <input {...getInputProps()} />
        <p>Drag n drop an image here, or click to select one</p>
      </div>
      {image && (
        <>
          <Canvas image={image} blur={blur} brightness={brightness} />
          <div>
            <label>
              Blur:
              <input type="range" min="0" max="20" value={blur} onChange={(e) => setBlur(e.target.value)} />
            </label>
            <label>
              Brightness:
              <input type="range" min="0" max="200" value={brightness} onChange={(e) => setBrightness(e.target.value)} />
            </label>

          </div>
        </>
      )}
    </div>
  );
};

export default App;
