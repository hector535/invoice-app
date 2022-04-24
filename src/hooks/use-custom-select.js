import { useState, useCallback } from "react";

const useCustomSelect = (initialValue = null) => {
  const [selectedValue, setSelectedValue] = useState(initialValue);
  const [isTouched, setIsTouched] = useState(false);

  const valueWasSelected = selectedValue !== null;
  const fieldHasError = isTouched && !valueWasSelected;

  const onChangeHandler = useCallback(
    (value) => {
      setSelectedValue(value);
    },
    [setSelectedValue]
  );

  const onBlurHandler = () => {
    setIsTouched(true);
  };

  const resetField = () => {
    setSelectedValue(null);
    setIsTouched(false);
  };

  return {
    value: selectedValue,
    isValid: valueWasSelected,
    fieldHasError: fieldHasError,
    errorMessage: "Option can't be empty",
    onChangeHandler,
    onBlurHandler,
    resetField,
  };
};

export default useCustomSelect;
