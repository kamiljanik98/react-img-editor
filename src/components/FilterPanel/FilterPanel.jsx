import styles from "./FilterPanel.module.scss"; // Import the CSS module
import PropTypes from "prop-types";

const FilterPanel = ({
  blurValue,
  setBlurValue,
  brightnessValue,
  setBrightnessValue,
}) => {
  return (
    <div className={styles.filterPanel}>
      <label>
        Blur:
        <input
          type="range"
          min="0"
          max="20"
          value={blurValue}
          onChange={(e) => setBlurValue(Number(e.target.value))}
        />
        {blurValue}
      </label>
      <label>
        Brightness:
        <input
          type="number"
          min="0"
          max="200"
          value={brightnessValue}
          onChange={(e) =>
            setBrightnessValue(
              Math.min(200, Math.max(0, Number(e.target.value))),
            )
          }
        />
        %
      </label>
    </div>
  );
};

FilterPanel.propTypes = {
  setBlurValue: PropTypes.func.isRequired,
  setBrightnessValue: PropTypes.func.isRequired,

  blurValue: PropTypes.number.isRequired, // New prop type for blurValue
  brightnessValue: PropTypes.number.isRequired, // New prop type for brightnessValue
};

export default FilterPanel;
