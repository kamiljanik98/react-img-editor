// src/FilterPanel.jsx

const FilterPanel = ({ blurValue, setBlurValue, brightnessValue, setBrightnessValue }) => {
  return (
    <div className="filter-panel">
      <label>
        Blur:
        <input
          type="range"
          min="0"
          max="20"
          value={blurValue}
          onChange={(e) => setBlurValue(e.target.value)}
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
          onChange={(e) => setBrightnessValue(e.target.value)}
        />
        %
      </label>
    </div>
  );
};

export default FilterPanel;
