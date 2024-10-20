// src/Canvas.jsx
import React, { useRef, useEffect } from 'react';

const Canvas = ({ image, blur, brightness }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
  
    img.src = image;
  
    const drawImage = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.filter = `blur(${blur}px) brightness(${brightness * 0.01})`;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  
    img.onload = () => {
      requestAnimationFrame(drawImage);
      setTimeout(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.filter = `blur(${blur}px) brightness(${brightness * 0.01})`;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      }, 10);
    };
  
    return () => {
      img.src = '';
    };
  }, [image, blur, brightness]);
  

  return (
<canvas ref={canvasRef} width={window.innerWidth * 0.8} height={window.innerWidth * 0.8}></canvas>
  );
};

export default Canvas;
