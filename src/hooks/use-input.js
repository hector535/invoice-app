import { useState, useCallback } from "react";

const execValidators = (data, validatorsFns) => {
  let isInvalid = false;
  let message = "";

  for (let i = 0; i < validatorsFns.length; i++) {
    [isInvalid, message] = validatorsFns[i](data);

    if (isInvalid) {
      break;
    }
  }

  return [!isInvalid, message];
};

const useInput = (initialValue, ...validatorsFns) => {
  const [enteredValue, setEnteredValue] = useState(initialValue);
  const [isTouched, setIsTouched] = useState(false);

  const [isEnteredValueValid, errorMessage] = execValidators(
    enteredValue,
    validatorsFns
  );
  // const [isEnteredValueValid, errorMessage] = validateValueFn(enteredValue);
  const inputFieldHasError = isTouched && !isEnteredValueValid;

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const blurHandler = useCallback(
    (event) => {
      setIsTouched(true);
    },
    [setIsTouched]
  );

  const resetField = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    isValueValid: isEnteredValueValid,
    inputFieldHasError,
    errorMessage: errorMessage,
    valueChangeHandler,
    blurHandler,
    resetField,
  };
};

export default useInput;
