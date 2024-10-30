// src/Dropzone.jsx
import PropTypes from "prop-types";
import { useDropzone } from "react-dropzone"; // Using react-dropzone for simplicity
import styles from "./Dropzone.module.scss";

const Dropzone = ({ onImageUpload }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const src = URL.createObjectURL(file);
        onImageUpload(src);
      }
    },
    accept: {
      "image/*": [".jpg", ".png", ".bmp", ".tiff"], // Allowed formats
    },
  });

  return (
    <div
      {...getRootProps({
        className: `${styles.dropzone} ${isDragActive ? styles.active : ""}`,
      })}
    >
      <input {...getInputProps()} />
      <img src="/public/icons/app-icon.svg" alt="image icon" />
      <p>Drag & Drop your files...</p>
      <em>Available formats: .jpg, .png, .bmp, .tiff</em>
    </div>
  );
};

Dropzone.propTypes = {
  onImageUpload: PropTypes.func.isRequired,
};

export default Dropzone;
