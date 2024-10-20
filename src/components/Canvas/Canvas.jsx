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
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      // Force canvas redraw on iOS by slightly adjusting the canvas size
      canvas.style.display = 'none'; 
      canvas.offsetHeight;  // Trigger reflow
      canvas.style.display = 'block';
  
      ctx.filter = `blur(${blur}px) brightness(${brightness * 0.01})`;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
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
