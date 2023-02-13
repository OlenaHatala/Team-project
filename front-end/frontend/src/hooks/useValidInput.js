import { useState } from "react";

const useValidInput = (initial, validateValue) => {
  const [enteredValue, setEnteredValue] = useState(initial);
  const [isTouched, setIsTouched] = useState(false);

  const isValid = validateValue(enteredValue);
  const hasError = !isValid && isTouched;

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue(initial);
    setIsTouched(false);
  }

  const checkErr = () => {
    setIsTouched(true);
  }

  const hideErr = () => {
    setIsTouched(false);
  }

  return {
    value: enteredValue,
    isValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
    checkErr,
    hideErr
  };
};

export default useValidInput;
