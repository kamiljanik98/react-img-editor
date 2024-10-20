// src/components/FilelistPanel/FilelistPanel.jsx
import React from 'react';

const FilelistPanel = ({ uploadedFiles, setImageSrc, onRemoveFile, blurValue, brightnessValue }) => {
  const handleDownload = (file) => {
    // Create a new canvas to apply filters
    const img = new Image();
    img.src = file.src;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      // Set canvas dimensions
      canvas.width = img.width;
      canvas.height = img.height;

      // Apply filters
      context.filter = `blur(${blurValue}px) brightness(${brightnessValue}%)`;
      context.drawImage(img, 0, 0);

      // Convert canvas to a downloadable image
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png'); // Use PNG for better quality
      link.download = file.name; // Use the file name for the download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
  };

  return (
    <div className="filelist-panel">
      <h3>Uploaded Files</h3>
      <ul>
        {uploadedFiles.length > 0 ? (
          uploadedFiles.map((file, index) => (
            <li key={index}>
              <button onClick={() => setImageSrc(file.src)}>{file.name}</button>
              <button onClick={() => handleDownload(file)}>Download</button>
              <button onClick={() => onRemoveFile(file.name)}>Remove</button>
            </li>
          ))
        ) : (
          <li>No files uploaded.</li>
        )}
      </ul>
    </div>
  );
};

export default FilelistPanel;
