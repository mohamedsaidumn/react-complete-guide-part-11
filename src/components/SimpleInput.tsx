import { useEffect, useState, FormEvent, SyntheticEvent } from "react";
import classes from "./Tasks.module.css";

interface SimpleInputProps {}

const SimpleInput = (props: SimpleInputProps) => {
  const [enteredName, setEnteredName] = useState<string>("");
  const [enteredNameIsValid, setEnteredNameIsValid] = useState<boolean>(false);
  const [enteredNameTouched, setEnteredNameTouched] = useState<boolean>(false);

  useEffect(() => {
    if (enteredNameIsValid) {
      console.log("Name Input is valid!");
    }
  }, [enteredNameIsValid]);

  const nameInputChangeHandler = (event: SyntheticEvent) => {
    let target: HTMLInputElement = event.target as HTMLInputElement;
    setEnteredName(target.value);

    if (target.value !== "") {
      setEnteredNameIsValid(true);
      return;
    }
  };

  const nameInputBlurHandler = (event: SyntheticEvent) => {
    setEnteredNameTouched(true); //if the input got blurred it was once touched

    if (enteredName.trim() === "") {
      setEnteredNameIsValid(false);
      return;
    }
  };

  const formSubmissionHandler = (event: FormEvent) => {
    event.preventDefault();

    setEnteredNameTouched(true);

    if (enteredName.trim() === "") {
      setEnteredNameIsValid(false);
      return;
    }

    setEnteredNameIsValid(true);

    //nameInputRef.current.value = ""; //=> NOT IDEAL, DON'T DIRECTLY MANIPULATE THE DOM, LET REACT DO THAT FOR YOU
    setEnteredName("");
  };

  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

  const nameInputClasses = nameInputIsInvalid
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
          value={enteredName}
        />
        {nameInputIsInvalid && (
          <p className="error-text">Name must not be empty.</p>
        )}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
