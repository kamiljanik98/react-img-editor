// src/Dropzone.jsx
import useFileUpload from '../hooks/useFileUpload'; // Adjust the path as necessary
import styles from "./Dropzone.module.scss";

const Dropzone = ({ onImageUpload }) => {
  const { getInputProps, getRootProps } = useFileUpload();

  const handleUpload = (src) => {
    onImageUpload(src);
  };

  return (
    <div className={styles.dropzone}>
      <div {...getRootProps({ className: "dropzone-button" })}>
        <input {...getInputProps()} onChange={(e) => {
          if (e.target.files.length > 0) {
            handleUpload(URL.createObjectURL(e.target.files[0]));
          }
        }} />
        <p>Drag n drop some files here, or click to select files</p>
      </div>
    </div>
  );
};

export default Dropzone;
