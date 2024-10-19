import { useState } from 'react';
import ImageCanvas from './components/ImageCanvas';
import DropzoneComponent from './components/DropzoneComponent';

function App() {
  const [imageSrc, setImageSrc] = useState(null);
  const [filters, setFilters] = useState({
    blur: 0,
    brightness: 100,
    contrast: 100,
    saturation: 100,
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  return (
    <div className="App">
      <DropzoneComponent setImageSrc={setImageSrc} />
      
      {imageSrc && (
        <>
          <ImageCanvas imageSrc={imageSrc} filters={filters} />

          <div className="controls">
            <label>
              Blur: 
              <input 
                type="range" 
                name="blur" 
                min="0" 
                max="10" 
                value={filters.blur} 
                onChange={handleFilterChange} 
              />
            </label>

            <label>
              Brightness: 
              <input 
                type="range" 
                name="brightness" 
                min="0" 
                max="200" 
                value={filters.brightness} 
                onChange={handleFilterChange} 
              />
            </label>

            <label>
              Contrast: 
              <input 
                type="range" 
                name="contrast" 
                min="0" 
                max="200" 
                value={filters.contrast} 
                onChange={handleFilterChange} 
              />
            </label>

            <label>
              Saturation: 
              <input 
                type="range" 
                name="saturation" 
                min="0" 
                max="200" 
                value={filters.saturation} 
                onChange={handleFilterChange} 
              />
            </label>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
