import { SyntheticEvent, useReducer } from "react";

interface InputStateType {
  value: string;
  isTouched: boolean;
}

type ActionType =
  | {
      type: "INPUT";
      value: string;
    }
  | {
      type: "BLUR" | "RESET";
    };

const initialInputState: InputStateType = {
  value: "",
  isTouched: false,
};

const inputStateReducer = (state: InputStateType, action: ActionType) => {
  if (action.type === "INPUT") {
    return { value: action.value, isTouched: state.isTouched };
  }
  if (action.type === "BLUR") {
    return { isTouched: true, value: state.value };
  }
  if (action.type === "RESET") {
    return { isTouched: false, value: "" };
  }
  return initialInputState;
};

const useInput = (validateValue: (val: string) => boolean) => {
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );

  const valueIsValid: boolean = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (event: SyntheticEvent) => {
    let target: HTMLInputElement = event.target as HTMLInputElement;
    dispatch({ type: "INPUT", value: target.value });
  };

  const inputBlurHandler = (event: SyntheticEvent) => {
    dispatch({ type: "BLUR" });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
