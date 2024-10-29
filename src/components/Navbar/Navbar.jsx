import PropTypes from 'prop-types';
import { FiHome, FiUpload, FiSliders, FiList, FiRotateCcw } from "react-icons/fi";
import useFileUpload from "../hooks/useFileUpload";
import styles from "./Navbar.module.scss";

const Navbar = ({ onImageUpload, onHomeClick, onToggleFilters, onToggleFilelist, onClearLocalStorage }) => {
  const { getInputProps, getRootProps } = useFileUpload();

  return (
    <div className={styles.navbar}>
      <button onClick={onHomeClick} className="home-button">
        <FiHome size={24} />
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
      <button onClick={onToggleFilters} className={styles.filterButton}>
        <FiSliders size={24} />
      </button>
      <button onClick={onToggleFilelist} className={styles.filelistButton}>
        <FiList size={24} />
      </button>
      <button onClick={onClearLocalStorage} className={styles.clearStorageButton}>
        <FiRotateCcw size={24} />
      </button>
    </div>
  );
};

// Define PropTypes for the Navbar component
Navbar.propTypes = {
  onImageUpload: PropTypes.func.isRequired,
  onHomeClick: PropTypes.func.isRequired,
  onToggleFilters: PropTypes.func.isRequired,
  onToggleFilelist: PropTypes.func.isRequired,
  onClearLocalStorage: PropTypes.func.isRequired,
};

export default Navbar;
