// src/components/FilterPanel/FilterPanel.jsx
import styles from "./FilterPanel.module.scss"; // Import the CSS module
import PropTypes from "prop-types";

const FilterPanel = ({ filterValues, setFilterValue }) => {
  return (
    <div className={styles.filterPanel}>
      <div>
        <h1>CSS Filters</h1>
        <p>Use sliders below to edit your image...</p>
      </div>
      <label>
        <div className={styles.filterHeader}>
          Blur: <span>{filterValues.blurValue}</span>
        </div>
        <input
          type="range"
          min="0"
          max="20"
          value={filterValues.blurValue}
          onChange={(e) => setFilterValue("blurValue", Number(e.target.value))}
        />
      </label>

      <label>
        <div className={styles.filterHeader}>
          Brightness: <span>{filterValues.brightnessValue}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="200"
          value={filterValues.brightnessValue}
          onChange={(e) =>
            setFilterValue("brightnessValue", Number(e.target.value))
          }
        />
      </label>

      <label>
        <div className={styles.filterHeader}>
          Contrast: <span>{filterValues.contrastValue}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="200"
          value={filterValues.contrastValue}
          onChange={(e) =>
            setFilterValue("contrastValue", Number(e.target.value))
          }
        />
      </label>

      <label>
        <div className={styles.filterHeader}>
          Saturation: <span>{filterValues.saturationValue}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="200"
          value={filterValues.saturationValue}
          onChange={(e) =>
            setFilterValue("saturationValue", Number(e.target.value))
          }
        />
      </label>

      <label>
        <div className={styles.filterHeader}>
          Hue Rotation: <span>{filterValues.hueRotationValue}°</span>
        </div>
        <input
          type="range"
          min="0"
          max="360"
          value={filterValues.hueRotationValue}
          onChange={(e) =>
            setFilterValue("hueRotationValue", Number(e.target.value))
          }
        />
      </label>

      <label>
        <div className={styles.filterHeader}>
          Grayscale: <span>{filterValues.grayscaleValue}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={filterValues.grayscaleValue}
          onChange={(e) =>
            setFilterValue("grayscaleValue", Number(e.target.value))
          }
        />
      </label>
    </div>
  );
};

FilterPanel.propTypes = {
  filterValues: PropTypes.shape({
    blurValue: PropTypes.number.isRequired,
    brightnessValue: PropTypes.number.isRequired,
    contrastValue: PropTypes.number.isRequired,
    saturationValue: PropTypes.number.isRequired,
    hueRotationValue: PropTypes.number.isRequired,
    grayscaleValue: PropTypes.number.isRequired,
  }).isRequired,
  setFilterValue: PropTypes.func.isRequired,
};

export default FilterPanel;
