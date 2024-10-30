import PropTypes from "prop-types";
import styles from "./FilelistPanel.module.scss";
import { FiDownloadCloud, FiTrash2, FiRotateCcw } from "react-icons/fi";

const FilelistPanel = ({
  uploadedFiles,
  setImageSrc,
  onRemoveFile,
  blurValue,
  brightnessValue,
  clearLocalStorage,
}) => {
  const handleDownload = (file) => {
    const img = new Image();
    img.src = file.src;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      // Set canvas dimensions
      canvas.width = img.width;
      canvas.height = img.height;

      // Apply filters
      context.filter = `blur(${blurValue}px) brightness(${brightnessValue}%)`;
      context.drawImage(img, 0, 0);

      // Convert canvas to a downloadable image
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png"); // Use PNG for better quality
      link.download = file.name; // Use the file name for the download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
  };

  return (
    <div className={styles.filelistPanel}>
      <div>
        <h1>Browse your files</h1>
        <p>Please select an image...</p>
      </div>
      <ul>
        {uploadedFiles.length > 0 ? (
          uploadedFiles.map((file, index) => (
            <div className={styles.filelistItem} key={index}>
              <button
                className={styles.filelistItem}
                onClick={() => setImageSrc(file.src)}
              >
                {file.name}
              </button>
              <div className={styles.fiellistActions}>
                <button
                  className={styles.downloadButton}
                  onClick={() => handleDownload(file)}
                >
                  <FiDownloadCloud size={20} />
                </button>
                <button
                  className={styles.removeButton}
                  onClick={() => onRemoveFile(file.name)}
                >
                  <FiTrash2 size={20} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <li>No files uploaded.</li>
        )}
      </ul>
      <button className={styles.clearStorageButton} onClick={clearLocalStorage}>
        Clear Storage <FiRotateCcw size={20} />
      </button>
    </div>
  );
};

// Define PropTypes for the component
FilelistPanel.propTypes = {
  uploadedFiles: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
    }),
  ).isRequired,
  setImageSrc: PropTypes.func.isRequired,
  onRemoveFile: PropTypes.func.isRequired,
  blurValue: PropTypes.number.isRequired,
  brightnessValue: PropTypes.number.isRequired,
  clearLocalStorage: PropTypes.func.isRequired, // Include clearLocalStorage in PropTypes
};

export default FilelistPanel;
