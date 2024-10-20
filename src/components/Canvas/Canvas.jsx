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
      ctx.filter = `blur(${blur}px) brightness(${brightness}%)`;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  }, [image, blur, brightness]);

  return (
    <canvas ref={canvasRef} width={500} height={500}></canvas>
  );
};

export default Canvas;
