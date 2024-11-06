import { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Dropzone from "./components/Dropzone/Dropzone";
import Canvas from "./components/Canvas/Canvas";
import FilterPanel from "./components/FilterPanel/FilterPanel";
import FilelistPanel from "./components/FilelistPanel/FilelistPanel";
import useFilters from "./components/hooks/useFilters"; // Import custom hook
import "./App.scss";

const App = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showFilelist, setShowFilelist] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { filterValues, setFilterValue } = useFilters(); // Use the custom hook

  useEffect(() => {
    const storedFiles = JSON.parse(localStorage.getItem("uploadedFiles")) || [];
    console.log("Loaded Files from Local Storage:", storedFiles);
    setUploadedFiles(storedFiles);

    if (storedFiles.length > 0) {
      console.log("Setting image source to:", storedFiles[0].src);
      setImageSrc(storedFiles[0].src);
      setCurrentImageIndex(0);
    }
  }, []);

  // Update local storage when uploadedFiles changes
  useEffect(() => {
    localStorage.setItem("uploadedFiles", JSON.stringify(uploadedFiles));
  }, [uploadedFiles]);

  const handleImageUpload = (file) => {
    if (!(file instanceof Blob)) {
      console.error("Uploaded file is not a valid Blob.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const newFile = { name: file.name, src: reader.result }; // Save as Base64
      setUploadedFiles((prevFiles) => {
        const updatedFiles = [...prevFiles, newFile];
        setImageSrc(reader.result); // Use Base64 as the image source
        setCurrentImageIndex(updatedFiles.length - 1);
        return updatedFiles;
      });
    };
    reader.readAsDataURL(file); // Read the file as a data URL (Base64)
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

  const handleRemoveFile = (fileName) => {
    const updatedFiles = uploadedFiles.filter((file) => file.name !== fileName);
    setUploadedFiles(updatedFiles);
    
    if (updatedFiles.length === 0) {
      window.location.reload();
      setImageSrc(null);
      setCurrentImageIndex(0);
    } else {
      const nextIndex =
        currentImageIndex >= updatedFiles.length
          ? updatedFiles.length - 1
          : currentImageIndex;
      setCurrentImageIndex(nextIndex);
      setImageSrc(updatedFiles[nextIndex].src); // Ensure this line runs correctly
    }
  };

  console.log("Current Image Src:", imageSrc);

  // Function to handle selecting an image from the file list
  const handleSelectImageFromList = (src, index) => {
    setImageSrc(src); // Set the selected image source
    setCurrentImageIndex(index); // Set the current image index
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
            filterValues={filterValues} // Pass filterValues
          />
          {showFilters && (
            <FilterPanel
              filterValues={filterValues} // Pass filterValues
              setFilterValue={setFilterValue} // Pass setFilterValue function
            />
          )}
          {showFilelist && (
            <FilelistPanel
              uploadedFiles={uploadedFiles.filter((file) => file && file.src)}
              setImageSrc={setImageSrc}
              onRemoveFile={handleRemoveFile}
              filterValues={filterValues} // Pass filterValues
              onSelectImage={handleSelectImageFromList} // Pass image selection handler
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
