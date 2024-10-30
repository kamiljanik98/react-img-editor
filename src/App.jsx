import { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Dropzone from "./components/Dropzone/Dropzone";
import Canvas from "./components/Canvas/Canvas";
import FilterPanel from "./components/FilterPanel/FilterPanel";
import FilelistPanel from "./components/FilelistPanel/FilelistPanel";
import "./App.scss";

const App = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showFilelist, setShowFilelist] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [blurValue, setBlurValue] = useState(0);
  const [brightnessValue, setBrightnessValue] = useState(100);

  useEffect(() => {
    const storedFiles = JSON.parse(localStorage.getItem("uploadedFiles")) || [];
    setUploadedFiles(storedFiles);
  }, []);

  useEffect(() => {
    localStorage.setItem("uploadedFiles", JSON.stringify(uploadedFiles));
  }, [uploadedFiles]);

  const handleImageUpload = (src) => {
    const newFile = { name: src.split("/").pop(), src };
    setUploadedFiles((prevFiles) => [...prevFiles, newFile]);
    setCurrentImageIndex(uploadedFiles.length); // Update to the new image index
    setImageSrc(src);
  };

  const handleHomeClick = () => {
    setImageSrc(null);
  };

  const toggleFilters = () => {
    setShowFilters((prev) => !prev);
    setShowFilelist(false); // Ensure filelist is hidden
  };

  const toggleFilelist = () => {
    setShowFilelist((prev) => !prev);
    setShowFilters(false); // Ensure filters are hidden
  };

  const clearLocalStorage = () => {
    localStorage.removeItem("uploadedFiles");
    setUploadedFiles([]); // Clear the state as well
    setImageSrc(null); // Optionally reset the image source to null
  };

  const removeFile = (fileName) => {
    const updatedFiles = uploadedFiles.filter((file) => file.name !== fileName);
    setUploadedFiles(updatedFiles);

    if (updatedFiles.length === 0) {
      setImageSrc(null); // Go to initial screen
    } else {
      // Switch to the next image if one exists
      const nextIndex =
        currentImageIndex >= updatedFiles.length
          ? updatedFiles.length - 1
          : currentImageIndex;
      setCurrentImageIndex(nextIndex);
      setImageSrc(updatedFiles[nextIndex].src); // Update imageSrc to the next image
    }
  };

  return (
    <div className="app">
      {imageSrc ? (
        <>
          <Navbar
            onImageUpload={handleImageUpload}
            onHomeClick={handleHomeClick}
            onToggleFilelist={toggleFilelist}
            onToggleFilters={toggleFilters}
          />
          <Canvas
            imageSrc={imageSrc}
            blurValue={blurValue}
            brightnessValue={brightnessValue}
          />

          {showFilters && (
            <FilterPanel
              clearLocalStorage={clearLocalStorage} // Pass clearLocalStorage here
              blurValue={blurValue}
              setBlurValue={setBlurValue}
              brightnessValue={brightnessValue}
              setBrightnessValue={setBrightnessValue}
            />
          )}

          {showFilelist && (
            <FilelistPanel
              uploadedFiles={uploadedFiles.filter((file) => file && file.src)}
              setImageSrc={setImageSrc}
              onRemoveFile={removeFile}
              blurValue={blurValue}
              brightnessValue={brightnessValue}
              clearLocalStorage={clearLocalStorage} // Pass clearLocalStorage here
            />
          )}
        </>
      ) : (
        <Dropzone onImageUpload={handleImageUpload} />
      )}
    </div>
  );
};

export default App;
