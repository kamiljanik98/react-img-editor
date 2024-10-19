import { useState, useRef } from "react";
import { useDropzone } from "react-dropzone";
import "./App.css";

function App() {
  const [image, setImage] = useState(null);
  const [filters, setFilters] = useState({
    brightness: 100,
    contrast: 100,
    saturate: 100,
    sepia: 0,
    grayscale: 0,
  });

  const canvasRef = useRef(null);

  // Handle file drop
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
      applyFilters(reader.result); // Apply filters when the image is loaded
    };
    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  const applyFilters = (imageSrc) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = imageSrc || image; // Use either the new image or the already loaded one
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.filter = `
        brightness(${filters.brightness}%)
        contrast(${filters.contrast}%)
        saturate(${filters.saturate}%)
        sepia(${filters.sepia}%)
        grayscale(${filters.grayscale}%)
      `;
      ctx.drawImage(img, 0, 0);
    };
  };

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    applyFilters();
  };

  return (
    <div className="editor-container">
      {/* Dropzone always visible */}
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag n drop an image here, or click to select one from your device</p>
      </div>

      {/* Conditionally render the canvas and controls only if an image is uploaded */}
      {image && (
        <>
          <canvas ref={canvasRef} className="image-canvas" />

          <div className="controls">
            <label>
              Brightness
              <input
                type="range"
                name="brightness"
                min="0"
                max="200"
                value={filters.brightness}
                onChange={handleChange}
              />
            </label>
            <label>
              Contrast
              <input
                type="range"
                name="contrast"
                min="0"
                max="200"
                value={filters.contrast}
                onChange={handleChange}
              />
            </label>
            <label>
              Saturate
              <input
                type="range"
                name="saturate"
                min="0"
                max="200"
                value={filters.saturate}
                onChange={handleChange}
              />
            </label>
            <label>
              Sepia
              <input
                type="range"
                name="sepia"
                min="0"
                max="100"
                value={filters.sepia}
                onChange={handleChange}
              />
            </label>
            <label>
              Grayscale
              <input
                type="range"
                name="grayscale"
                min="0"
                max="100"
                value={filters.grayscale}
                onChange={handleChange}
              />
            </label>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
