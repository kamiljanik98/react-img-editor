import { useDropzone } from 'react-dropzone';

const DropzoneComponent = ({ setImageSrc }) => {
  const {
    getRootProps,
    getInputProps,
  } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImageSrc(e.target.result); // Set the image source
        };
        reader.readAsDataURL(file); // Read the file as a data URL
      }
    },
  });

  return (
    <div {...getRootProps({ className: 'dropzone' })} style={{ border: '2px dashed #cccccc', padding: '20px' }}>
      <input {...getInputProps()} />
      <p>Drag and drop some files here, or click to select files</p>
    </div>
  );
};

export default DropzoneComponent;
