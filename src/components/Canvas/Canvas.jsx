import { useEffect, useRef, useState } from 'react';
import { FiZoomIn, FiZoomOut } from "react-icons/fi";

const Canvas = ({ imageSrc, blurValue, brightnessValue }) => {
  const canvasRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [canvasSize] = useState({ width: 800, height: 600 }); // Fixed canvas size

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const img = new Image();

    img.src = imageSrc;
    img.onload = () => {
      const aspectRatio = img.width / img.height;
      let newWidth = canvasSize.width;
      let newHeight = canvasSize.width / aspectRatio;

      // If the height exceeds the canvas height, adjust the width and height accordingly
      if (newHeight > canvasSize.height) {
        newHeight = canvasSize.height;
        newWidth = canvasSize.height * aspectRatio;
      }

      canvas.width = canvasSize.width;
      canvas.height = canvasSize.height;

      drawImage(context, img, newWidth, newHeight);
    };
  }, [imageSrc, blurValue, brightnessValue, canvasSize]);

  const drawImage = (context, img, width, height) => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    // context.filter = `blur(${blurValue}px) brightness(${brightnessValue}%)`;
    context.webkitFilter = `blur(${blurValue}px) brightness(${brightnessValue}%)`;

    // Apply the scale for zoom
    const scaledWidth = width * scale;
    const scaledHeight = height * scale;
    const x = (canvasSize.width - scaledWidth) / 2;
    const y = (canvasSize.height - scaledHeight) / 2;

    context.drawImage(img, x, y, scaledWidth, scaledHeight);
  };

  useEffect(() => {
    if (!imageSrc) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const img = new Image();

    img.src = imageSrc;
    img.onload = () => {
      const aspectRatio = img.width / img.height;
      let newWidth = canvasSize.width;
      let newHeight = canvasSize.width / aspectRatio;

      if (newHeight > canvasSize.height) {
        newHeight = canvasSize.height;
        newWidth = canvasSize.height * aspectRatio;
      }

      drawImage(context, img, newWidth, newHeight);
    };
  }, [scale, blurValue, brightnessValue, imageSrc, canvasSize]);

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.1, 3)); // Limit max scale to 3x
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.1, 0.5)); // Limit min scale to 0.5x

  return (
    <div className="canvas-container">
      <canvas ref={canvasRef}  />
      <div className="zoom-controls">
        <button onClick={zoomIn}><FiZoomIn size={16} /></button>
        <button onClick={zoomOut}><FiZoomOut size={16} /></button>
      </div>
      {!imageSrc && <p>No image uploaded.</p>}
    </div>
  );
};

export default Canvas;
