import PropTypes from "prop-types";
import { useEffect, useRef, useState, useCallback } from "react";
import { FiZoomIn, FiZoomOut } from "react-icons/fi";
import styles from "./Canvas.module.scss";

const Canvas = ({ imageSrc, filterValues }) => {
  const {
    blurValue,
    brightnessValue,
    contrastValue,
    saturationValue,
    hueRotationValue,
    grayscaleValue,
  } = filterValues;

  const canvasRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [canvasSize] = useState({ width: 1200, height: 900 }); // Initial size

  const drawImage = useCallback(
    (context, img, width, height) => {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      context.filter = `
        blur(${blurValue}px)
        brightness(${brightnessValue}%)
        contrast(${contrastValue}%)
        saturate(${saturationValue}%)
        hue-rotate(${hueRotationValue}deg)
        grayscale(${grayscaleValue}%)
      `;

      const scaledWidth = width * scale;
      const scaledHeight = height * scale;
      const x = (canvasSize.width - scaledWidth) / 2;
      const y = (canvasSize.height - scaledHeight) / 2;

      context.drawImage(img, x, y, scaledWidth, scaledHeight);
    },
    [blurValue, brightnessValue, contrastValue, saturationValue, hueRotationValue, grayscaleValue, scale, canvasSize]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (!imageSrc) {
      // Clear the canvas if there's no image
      context.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

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

      canvas.width = canvasSize.width;
      canvas.height = canvasSize.height;

      drawImage(context, img, newWidth, newHeight);
    };
  }, [imageSrc, drawImage, canvasSize]);

  // Effect to redraw the image when filter values or scale changes
  useEffect(() => {
    if (!imageSrc) return; // Skip if there's no image source

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
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
  }, [filterValues, scale, drawImage, imageSrc, canvasSize]);

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.1, 3)); // Limit max scale to 3x
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.1, 0.5)); // Limit min scale to 0.5x

  return (
    <div className={styles.canvasContainer}>
      <div className={styles.zoomControls}>
        <button aria-label="Zoom-in Button" onClick={zoomIn}>
          <FiZoomIn size={16} />
        </button>
        <button aria-label="Zoom-out Button" onClick={zoomOut}>
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
  filterValues: PropTypes.shape({
    blurValue: PropTypes.number.isRequired,
    brightnessValue: PropTypes.number.isRequired,
    contrastValue: PropTypes.number.isRequired,
    saturationValue: PropTypes.number.isRequired,
    hueRotationValue: PropTypes.number.isRequired,
    grayscaleValue: PropTypes.number.isRequired,
  }).isRequired,
};

export default Canvas;
