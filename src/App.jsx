import { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Dropzone from "./components/Dropzone/Dropzone";
import Canvas from "./components/Canvas/Canvas";
import FilterPanel from "./components/FilterPanel/FilterPanel";
import FilelistPanel from "./components/FilelistPanel/FilelistPanel";
import useFilters from "./components/hooks/useFilters";
import "./App.scss";

const App = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showFilelist, setShowFilelist] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { filterValues, setFilterValue } = useFilters();

  useEffect(() => {
    const storedFiles = JSON.parse(localStorage.getItem("uploadedFiles")) || [];
    setUploadedFiles(storedFiles);

    if (storedFiles.length > 0) {
      setImageSrc(storedFiles[0].src);
      setCurrentImageIndex(0);
    }
  }, []);

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
      const newFile = { name: file.name, src: reader.result };
      setUploadedFiles((prevFiles) => {
        const updatedFiles = [...prevFiles, newFile];
        setImageSrc(reader.result); 
        setCurrentImageIndex(updatedFiles.length - 1);
        return updatedFiles;
      });
    };
    reader.readAsDataURL(file);
  };

  const handleHomeClick = () => {
    setImageSrc(null);
  };

  const toggleFilters = () => {
    setShowFilters((prev) => !prev);
    setShowFilelist(false); 
  };

  const toggleFilelist = () => {
    setShowFilelist((prev) => !prev);
    setShowFilters(false); 
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
      setImageSrc(updatedFiles[nextIndex].src);
    }
  };


  const handleSelectImageFromList = (src, index) => {
    setImageSrc(src); 
    setCurrentImageIndex(index); 
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
            filterValues={filterValues} 
          />
          {showFilters && (
            <FilterPanel
              filterValues={filterValues} 
              setFilterValue={setFilterValue} 
            />
          )}
          {showFilelist && (
            <FilelistPanel
              uploadedFiles={uploadedFiles.filter((file) => file && file.src)}
              setImageSrc={setImageSrc}
              onRemoveFile={handleRemoveFile}
              filterValues={filterValues} 
              onSelectImage={handleSelectImageFromList} 
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
