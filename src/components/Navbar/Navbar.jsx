// src/components/Navbar/Navbar.jsx
import PropTypes from "prop-types";
import { FiHome, FiUpload, FiSliders, FiList } from "react-icons/fi";
import useFileUpload from "../hooks/useFileUpload";
import styles from "./Navbar.module.scss";

const Navbar = ({
  onImageUpload,
  onHomeClick,
  onToggleFilters,
  onToggleFilelist,
}) => {
  const { getInputProps, getRootProps } = useFileUpload();

  return (
    <div className={styles.navbar}>
      <button onClick={onHomeClick} className={styles.navbarButton}>
        <FiHome size={24} />
      </button>
      <button onClick={onToggleFilters} className={styles.navbarButton}>
        <FiSliders size={24} />
      </button>
      <div {...getRootProps({ className: styles.navbarButton })}>
        <input
          {...getInputProps()}
          onChange={(e) => {
            if (e.target.files.length > 0) {
              const file = e.target.files[0]; // Get the uploaded file
              onImageUpload(file); // Pass the file directly to the parent
            }
          }}
        />
        <FiUpload size={24} />
      </div>
      <button onClick={onToggleFilelist} className={styles.navbarButton}>
        <FiList size={24} />
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
};

export default Navbar;
