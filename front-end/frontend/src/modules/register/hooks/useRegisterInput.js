import { useState } from "react";

const useRegisterInput = (validate, initValue) => {
  const [value, setValue] = useState(initValue || "");
  const [valid, setValid] = useState(false);
  const [focused, setFocused] = useState(false);
  const [errors, setErrors] = useState([]);

  const onValueChange = (newValue) => {
    setValue(newValue);
    const validationStatus = validate(newValue);
    if (validationStatus === "ok") {
      setValid(true);
    } else {
      setValid(false);
      setErrors(validationStatus.split("+"));
    }
  };
  const onFocus = () => {
    setFocused(true);
  };
  const onBlur = () => {
    setFocused(false);
  };

  const showErrors = focused && value && !valid;

  return {
    value,
    valid,
    focused,
    errors,
    showErrors,
    onValueChange,
    onFocus,
    onBlur,
  };
};

export default useRegisterInput;
