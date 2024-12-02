import PropTypes from "prop-types";
import styles from "./FilelistPanel.module.scss";
import { FiDownloadCloud, FiTrash2 } from "react-icons/fi";

const FilelistPanel = ({
  uploadedFiles,
  setImageSrc,
  onRemoveFile,
  filterValues, 
}) => {
  const handleDownloadFile = (file, filterValues) => {
    const img = new Image();
    img.src = file.src; 

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      canvas.width = img.width;
      canvas.height = img.height;

    
      context.filter = `blur(${filterValues.blurValue}px)
                        brightness(${filterValues.brightnessValue}%)
                        contrast(${filterValues.contrastValue}%)
                        saturate(${filterValues.saturationValue}%)
                        hue-rotate(${filterValues.hueRotationValue}deg)
                        grayscale(${filterValues.grayscaleValue}%)`;

      context.drawImage(img, 0, 0);

      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = file.name; 

    
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
  };

  const handleRemoveFile = (fileName) => {
    onRemoveFile(fileName); 
  };

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
              <button>{truncateFileName(file.name, 20)}</button> 
              <div className={styles.filelistActions}>
                <button
                  className={styles.downloadButton}
                  onClick={() => handleDownloadFile(file, filterValues)} 
                >
                  <FiDownloadCloud size={20} />
                </button>
                <button
                  className={styles.removeButton}
                  onClick={() => handleRemoveFile(file.name)} 
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
  }).isRequired,
};

export default FilelistPanel;
