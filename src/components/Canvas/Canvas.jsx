// src/Canvas.jsx
import { useRef, useEffect } from 'react';

const Canvas = ({ image, blur, brightness }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.src = image;
    img.onload = () => {
      // Clear the canvas before drawing
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Set filter: note that brightness is multiplied by 0.01 for the percentage
      ctx.filter = `blur(${blur}px) brightness(${brightness * 0.01})`;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  }, [image, blur, brightness]);

  return (
    <canvas ref={canvasRef} width={500} height={500}></canvas>
  );
};

export default Canvas;
