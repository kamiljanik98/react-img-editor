// src/hooks/useFileUpload.jsx
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

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

    setAcceptedFiles((prevFiles) => [...prevFiles, ...newFiles]);

    if (newFiles[0]) {
      setImageSrc(URL.createObjectURL(newFiles[0]));
    }

    alert("Success!");
  };

  const onDropRejected = (rejectedFiles) => {
    rejectedFiles.forEach(({ file, errors }) => {
      errors.forEach((err) => {
        if (err.code === "file-invalid-type") {
          alert(
            `Error: File "${file.name}" is not a valid format. Please upload a .jpg or .png file.`
          );
        }
      });
    });
  };

  const { getInputProps, getRootProps } = useDropzone({
    noKeyboard: true,
    multiple: true,
    accept: { "image/png": [".png"], "image/jpg": [".jpg"] },
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
