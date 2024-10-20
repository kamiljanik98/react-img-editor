// src/Canvas.jsx
import { useEffect, useRef, useState } from 'react';

const Canvas = ({ imageSrc, blurValue, brightnessValue }) => {
  const canvasRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const img = new Image();

    img.src = imageSrc;
    img.onload = () => {
      const aspectRatio = img.width / img.height;
      const maxWidth = window.innerWidth * 0.8;
      const maxHeight = window.innerHeight * 0.8;

      let newWidth = maxWidth;
      let newHeight = maxWidth / aspectRatio;

      if (newHeight > maxHeight) {
        newHeight = maxHeight;
        newWidth = maxHeight * aspectRatio;
      }

      setImageDimensions({ width: newWidth, height: newHeight });

      canvas.width = newWidth;
      canvas.height = newHeight;

      drawImage(context, img, newWidth, newHeight);
    };
  }, [imageSrc, blurValue, brightnessValue]);

  const drawImage = (context, img, width, height) => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.filter = `blur(${blurValue}px) brightness(${brightnessValue}%)`;
    
    // Apply the scale for zoom
    const scaledWidth = width * scale;
    const scaledHeight = height * scale;
    const x = (context.canvas.width - scaledWidth) / 2;
    const y = (context.canvas.height - scaledHeight) / 2;

    context.drawImage(img, x, y, scaledWidth, scaledHeight);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const img = new Image();
    
    img.src = imageSrc;
    img.onload = () => {
      drawImage(context, img, imageDimensions.width, imageDimensions.height);
    };
  }, [scale, blurValue, brightnessValue, imageSrc, imageDimensions]);

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.1, 3)); // Limit max scale to 3x
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.1, 0.5)); // Limit min scale to 0.5x

  return (
    <div className="canvas-container">
      <canvas ref={canvasRef} />
      <div className="zoom-controls">
        <button onClick={zoomIn}>Zoom In</button>
        <button onClick={zoomOut}>Zoom Out</button>
      </div>
      {!imageSrc && <p>No image uploaded.</p>}
    </div>
  );
};

export default Canvas;
