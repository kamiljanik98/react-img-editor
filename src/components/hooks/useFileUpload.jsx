// src/hooks/useFileUpload.jsx
import { useState } from "react";
import { useDropzone } from "react-dropzone";

const useFileUpload = (initialFiles = []) => {
  const [acceptedFiles, setAcceptedFiles] = useState(initialFiles);
  const [imageSrc, setImageSrc] = useState(null);

  const onDrop = (files) => {
    const newFiles = files.filter(
      (file) =>
        !acceptedFiles.some(
          (existingFile) =>
            existingFile.name === file.name && existingFile.size === file.size,
        ),
    );

    if (newFiles.length === 0) {
      alert("No new files to add. Please check for duplicates.");
      return;
    }

    // Create object URLs for new files
    const filesWithSrc = newFiles.map((file) => ({
      name: file.name,
      src: URL.createObjectURL(file), // Create URL for the uploaded file
    }));

    setAcceptedFiles((prevFiles) => [...prevFiles, ...filesWithSrc]);

    if (filesWithSrc[0]) {
      setImageSrc(filesWithSrc[0].src); // Set the first uploaded file's URL as the image source
    }

    alert("Success!");
  };

  const onDropRejected = (rejectedFiles) => {
    rejectedFiles.forEach(({ file, errors }) => {
      errors.forEach((err) => {
        if (err.code === "file-invalid-type") {
          alert(
            `Error: File "${file.name}" is not a valid format. Please upload a .jpg or .png file.`,
          );
        }
      });
    });
  };

  const { getInputProps, getRootProps } = useDropzone({
    noKeyboard: true,
    multiple: true,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"], // Including both jpg and jpeg
      "image/gif": [".gif"],
      "image/bmp": [".bmp"],
      "image/tiff": [".tiff", ".tif"],
      "image/webp": [".webp"],
      "image/svg+xml": [".svg"],
    },
    onDropRejected,
    onDrop,
  });

  return {
    acceptedFiles,
    imageSrc,
    getInputProps,
    getRootProps,
  };
};

export default useFileUpload;
