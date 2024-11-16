import PropTypes from "prop-types";
import { useDropzone } from "react-dropzone";
import styles from "./Dropzone.module.scss";
import appIcon from '/icons/app-icon.svg';

const Dropzone = ({ onImageUpload }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      console.log("Accepted Files:", acceptedFiles); 
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        console.log("Selected File:", file); 

       
        if (file instanceof Blob) {
         
          onImageUpload(file);
        } else {
          console.error("File is not a Blob."); 
        }
      }
    },
    accept: {
      "image/*": [".jpg", ".png", ".bmp", ".tiff"], 
    },
  });

  return (
    <div
      {...getRootProps({
        className: `${styles.dropzone} ${isDragActive ? styles.active : ""}`,
      })}
    >
      <input {...getInputProps()} />
      <img src={appIcon} alt="image icon" />
      <p>Drag & Drop your files...</p>
      <em>Available formats: .jpg, .png, .bmp, .tiff</em>
    </div>
  );
};

Dropzone.propTypes = {
  onImageUpload: PropTypes.func.isRequired,
};

export default Dropzone;
