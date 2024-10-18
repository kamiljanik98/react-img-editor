import { useState } from 'react';
import DropzoneComponent from './components/DropzoneComponent';
import ImageCanvas from './components/ImageCanvas';

const App = () => {
  const [imageSrc, setImageSrc] = useState(null); // State to store the image source
  const [filters, setFilters] = useState({
    blur: 0,
    brightness: 100,
    contrast: 100,
    saturation: 100,
  });

  // Handle slider change for blur value
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <div>
      <DropzoneComponent setImageSrc={setImageSrc} />

      {imageSrc && (
        <>
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

          {/* ImageCanvas receives the image and filters */}
          <ImageCanvas imageSrc={imageSrc} filters={filters} />
        </>
      )}
    </div>
  );
};

export default App;
