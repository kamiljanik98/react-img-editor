// src/Navbar.jsx
import { FiHome, FiUpload, FiSliders, FiList, FiRotateCcw  } from "react-icons/fi";
import useFileUpload from "../hooks/useFileUpload";

const Navbar = ({ onImageUpload, onHomeClick, onToggleFilters, onToggleFilelist, onClearLocalStorage }) => {
  const { getInputProps, getRootProps } = useFileUpload();

  return (
    <div className="navbar">
      <button onClick={onHomeClick} className="home-button">
        <FiHome size={24}/>
      </button>
      <div {...getRootProps({ className: "dropzone-button" })}>
        <input
          {...getInputProps()}
          onChange={(e) => {
            if (e.target.files.length > 0) {
              onImageUpload(URL.createObjectURL(e.target.files[0]));
            }
          }}
        />
        <FiUpload size={24} />
      </div>
      <button onClick={onToggleFilters} className="filter-button">
        <FiSliders size={24} />
      </button>
      <button onClick={onToggleFilelist} className="filelist-button">
        <FiList size={24} />
      </button>
      <button onClick={onClearLocalStorage} className="clear-button">
          <FiRotateCcw  size={24}/>
      </button>
    </div>
  );
};

export default Navbar;
