import PropTypes from "prop-types";
import styles from "./FilelistPanel.module.scss";
import { FiDownloadCloud, FiTrash2 } from "react-icons/fi";

const FilelistPanel = ({
  uploadedFiles,
  setImageSrc,
  onRemoveFile,
  blurValue,
  brightnessValue,
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
      link.href = canvas.toDataURL("image/png");
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
  };

  const handleRemoveFile = (fileName) => {
    onRemoveFile(fileName); // Call the parent's remove function
    // Check if there are any remaining files
    if (uploadedFiles.length === 1) {
      // Reload the page if this was the last file
      window.location.reload();
    } else {
      // Optionally set the image source for the next file
      const remainingFiles = uploadedFiles.filter(file => file.name !== fileName);
      setImageSrc(remainingFiles[0].src); // Set the image to the first remaining file
    }
  };

  // Function to truncate file names
  const truncateFileName = (fileName, maxLength) => {
    if (fileName.length > maxLength) {
      return fileName.substring(0, maxLength) + "...";
    }
    return fileName;
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
            <div
              onClick={() => setImageSrc(file.src)}
              className={styles.filelistItem}
              key={index}
            >
              <button>{truncateFileName(file.name, 20)}</button> {/* Truncate to 20 characters */}
              <div className={styles.filelistActions}>
                <button
                  className={styles.downloadButton}
                  onClick={() => handleDownload(file)}
                >
                  <FiDownloadCloud size={20} />
                </button>
                <button
                  className={styles.removeButton}
                  onClick={() => handleRemoveFile(file.name)} // Use the new handler
                >
                  <FiTrash2 size={20} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No files uploaded... 👀</p>
        )}
      </ul>
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
};

export default FilelistPanel;
