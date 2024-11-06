import PropTypes from "prop-types";
import styles from "./FilelistPanel.module.scss";
import { FiDownloadCloud, FiTrash2 } from "react-icons/fi";

const FilelistPanel = ({
  uploadedFiles,
  setImageSrc,
  onRemoveFile,
  filterValues, // Accept filter values
}) => {
  // Function to handle downloading the file with applied filters
  const handleDownloadFile = (file, filterValues) => {
    const img = new Image();
    img.src = file.src; // Use file.src from uploadedFiles

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      // Set canvas dimensions to match the image
      canvas.width = img.width;
      canvas.height = img.height;

      // Apply filters from filterValues
      context.filter = `blur(${filterValues.blurValue}px)
                        brightness(${filterValues.brightnessValue}%)
                        contrast(${filterValues.contrastValue}%)
                        saturate(${filterValues.saturationValue}%)
                        hue-rotate(${filterValues.hueRotationValue}deg)
                        grayscale(${filterValues.grayscaleValue}%)`;

      // Draw the image with the applied filters
      context.drawImage(img, 0, 0);

      // Create a download link for the processed image
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png"); // Get PNG data URL
      link.download = file.name; // Use the file name from the file object

      // Trigger the download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
  };

  // Function to handle file removal
  const handleRemoveFile = (fileName) => {
    onRemoveFile(fileName); // Trigger the parent's remove logic
  };

  // Function to truncate file names for display
  const truncateFileName = (fileName, maxLength) => {
    if (fileName.length > maxLength) {
      return fileName.substring(0, maxLength) + "..."; // Truncate if too long
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
              onClick={() => setImageSrc(file.src)} // Set the clicked file as the image source
              className={styles.filelistItem}
              key={index}
            >
              <button>{truncateFileName(file.name, 20)}</button> {/* Truncate to 20 characters */}
              <div className={styles.filelistActions}>
                <button
                  className={styles.downloadButton}
                  onClick={() => handleDownloadFile(file, filterValues)} // Trigger file download with filters
                >
                  <FiDownloadCloud size={20} />
                </button>
                <button
                  className={styles.removeButton}
                  onClick={() => handleRemoveFile(file.name)} // Remove file from list
                >
                  <FiTrash2 size={20} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No files uploaded... 👀</p> // Display message if no files are uploaded
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
    })
  ).isRequired,
  setImageSrc: PropTypes.func.isRequired,
  onRemoveFile: PropTypes.func.isRequired,
  filterValues: PropTypes.shape({
    blurValue: PropTypes.number.isRequired,
    brightnessValue: PropTypes.number.isRequired,
    contrastValue: PropTypes.number.isRequired,
    saturationValue: PropTypes.number.isRequired,
    hueRotationValue: PropTypes.number.isRequired,
    grayscaleValue: PropTypes.number.isRequired,
  }).isRequired, // Accept filterValues as a prop
};

export default FilelistPanel;
