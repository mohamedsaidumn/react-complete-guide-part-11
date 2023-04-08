import { SyntheticEvent, useState } from "react";

const useInput = (validateValue: (val: string) => boolean) => {
  const [enteredValue, setEnteredValue] = useState<string>("");
  const [isTouched, setIsTouched] = useState<boolean>(false);

  const valueIsValid: boolean = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (event: SyntheticEvent) => {
    let target: HTMLInputElement = event.target as HTMLInputElement;
    setEnteredValue(target.value);
  };

  const inputBlurHandler = (event: SyntheticEvent) => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
