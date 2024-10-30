import { useState } from "react";

const useFilters = () => {
  const [filterValues, setFilterValues] = useState({
    blurValue: 0,
    brightnessValue: 100,
    contrastValue: 100,
    saturationValue: 100,
    hueRotationValue: 0,
    grayscaleValue: 0,
  });

  const setFilterValue = (key, value) => {
    setFilterValues((prev) => ({ ...prev, [key]: value }));
  };

  return { filterValues, setFilterValue };
};

export default useFilters;
