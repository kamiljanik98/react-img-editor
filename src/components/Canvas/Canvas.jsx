import PropTypes from "prop-types";
import { useEffect, useRef, useState, useCallback } from "react";
import { FiZoomIn, FiZoomOut } from "react-icons/fi";
import styles from "./Canvas.module.scss";

const Canvas = ({ imageSrc, blurValue, brightnessValue }) => {
  const canvasRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [canvasSize] = useState({ width: 1200, height: 900 }); // Initial size

  // Define drawImage function with useCallback
  const drawImage = useCallback(
    (context, img, width, height) => {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      context.filter = `blur(${blurValue}px) brightness(${brightnessValue}%)`;
      const scaledWidth = width * scale;
      const scaledHeight = height * scale;
      const x = (canvasSize.width - scaledWidth) / 2;
      const y = (canvasSize.height - scaledHeight) / 2;

      context.drawImage(img, x, y, scaledWidth, scaledHeight);
    },
    [blurValue, brightnessValue, scale, canvasSize],
  );

  // Effect to handle canvas drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
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
  }, [imageSrc, drawImage, canvasSize]); // Including drawImage in the dependencies

  // Zoom functions
  const zoomIn = () => setScale((prev) => Math.min(prev + 0.1, 3)); // Limit max scale to 3x
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.1, 0.5)); // Limit min scale to 0.5x

  return (
    <div className={styles.canvasContainer}>
      <div className={styles.zoomControls}>
        <button onClick={zoomIn}>
          <FiZoomIn size={16} />
        </button>
        <button onClick={zoomOut}>
          <FiZoomOut size={16} />
        </button>
      </div>
      <canvas ref={canvasRef} />
      {!imageSrc && <p>No image uploaded.</p>}
    </div>
  );
};

Canvas.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  brightnessValue: PropTypes.number.isRequired,
  blurValue: PropTypes.number.isRequired,
};
export default Canvas;
