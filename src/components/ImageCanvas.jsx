import { useRef, useEffect } from 'react';

const ImageCanvas = ({ imageSrc, filters }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (imageSrc) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      const image = new Image();
      image.onload = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.filter = `blur(${filters.blur}px) brightness(${filters.brightness}%) contrast(${filters.contrast}%) saturate(${filters.saturation}%)`;
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
      };
      image.src = imageSrc;
    }
  }, [imageSrc, filters]);

  return <canvas ref={canvasRef} width={400} height={400} style={{ border: '1px solid black' }} />;
};

export default ImageCanvas;
