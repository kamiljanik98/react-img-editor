import { useDropzone } from 'react-dropzone';
import { useRef, useState, useEffect } from 'react';

const App = () => {
  const [acceptedFiles, setAcceptedFiles] = useState([]);
  const [,setRejectedFiles] = useState([]);
  const [imageSrc, setImageSrc] = useState(null); // State to store the image source
  const [filters, setFilters] = useState({
    blur: 0,
    brightness: 100,
    contrast: 100,
    saturation: 100,
  });
  const canvasRef = useRef(null);

  // Dropzone setup
  const {
    getRootProps,
    getInputProps,
  } = useDropzone({
    maxFiles: 2,
    accept: { 'image/*': ['.jpeg', '.png'] },
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {

        const reader = new FileReader();
        reader.onload = (e) => {
          setImageSrc(e.target.result); // Set the image source
        };
        reader.readAsDataURL(file); // Read the file as a data URL
      }
      setAcceptedFiles(acceptedFiles);
    },
    onDropRejected: (fileRejections) => {
      setRejectedFiles(fileRejections);
      // Trigger alert for each rejected file
      fileRejections.forEach(({ file, errors }) => {
        alert(`File Rejected: ${file.path}. Reason: ${errors.map(e => e.message).join(', ')}`);
        console.log(`File Rejected: ${file.path}`);
      });
      
    }
  });

  useEffect(() => {
    if (imageSrc) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      const image = new Image();
      image.onload = () => {
        // Clear the canvas before drawing the new image
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.filter = `blur(${filters.blur}px) brightness(${filters.brightness}%) contrast(${filters.contrast}%) saturate(${filters.saturation}%)`;        // Draw the uploaded image on the canvas
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
      };

      image.src = imageSrc;
    }
  }, [imageSrc, filters]);

  // Mapping accepted files inside file browser display
  const acceptedFileItems = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  // Handle slider change for blur value
  const handleFilterChange = (e) => {
    const {name, value} = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value
    }))
  };

  // // Mapping rejected files for display
  // const rejectedFileItems = rejectedFiles.map(({ file, errors }) => (
  //   <li key={file.path}>
  //     {file.path} - {file.size} bytes
  //     <ul>
  //       {errors.map(e => <li key={e.code}>{e.message}</li>)}
  //     </ul>
  //   </li>
  // ));

  return (
    <>
    <section className="container">
      <div {...getRootProps({ className: 'dropzone' })} style={{ border: '2px dashed #cccccc', padding: '20px' }}>
        <input {...getInputProps()} />
        <p>Drag and drop some files here, or click to select files</p>
        <em>(2 files are the maximum number of files you can drop here)</em>
      </div>
      {acceptedFileItems}
      <aside>
        <h4>Adjust Filters</h4>

        {/* Sliders for each filter */}
        <div>
          <label>Blur: {filters.blur}px</label>
          <input
            type="range"
            min="0"
            max="10"
            name="blur"
            value={filters.blur}
            onChange={handleFilterChange}
          />
        </div>
        <div>
          <label>Brightness: {filters.brightness}%</label>
          <input
            type="range"
            min="0"
            max="200"
            name="brightness"
            value={filters.brightness}
            onChange={handleFilterChange}
          />
        </div>
        <div>
          <label>Contrast: {filters.contrast}%</label>
          <input
            type="range"
            min="0"
            max="200"
            name="contrast"
            value={filters.contrast}
            onChange={handleFilterChange}
          />
        </div>
        <div>
          <label>Saturation: {filters.saturation}%</label>
          <input
            type="range"
            min="0"
            max="200"
            name="saturation"
            value={filters.saturation}
            onChange={handleFilterChange}
          />
        </div>

        <h4>Accepted files</h4>
        <ul>
          {acceptedFiles.map(file => (
            <li key={file.path}>
              {file.path} - {file.size} bytes
            </li>
          ))}
        </ul>
      </aside>
    </section>
    <canvas ref={canvasRef} width={400} height={400} style={{ border: '1px solid black' }} />
    </>

  );
};

export default App;
