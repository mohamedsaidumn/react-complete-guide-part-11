import { useRef, useState, FormEvent, SyntheticEvent } from "react";
import classes from "./Tasks.module.css";

interface SimpleInputProps {}

const SimpleInput = (props: SimpleInputProps) => {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const [enteredName, setEnteredName] = useState<string>("");
  const [enteredNameIsValid, setEnteredNameIsValid] = useState<boolean>(false);
  const [enteredNameTouched, setEnteredNameTouched] = useState<boolean>(false);

  const nameInputChangeHandler = (event: SyntheticEvent) => {
    let target: HTMLInputElement = event.target as HTMLInputElement;
    setEnteredName(target.value);
  };

  const formSubmissionHandler = (event: FormEvent) => {
    event.preventDefault();

    setEnteredNameTouched(true);

    if (nameInputRef === null || nameInputRef.current === null) {
      return;
    }

    if (enteredName.trim() === "") {
      setEnteredNameIsValid(false);
      return;
    }

    setEnteredNameIsValid(true);

    const enteredValue = nameInputRef.current.value;
    console.log(enteredValue);

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
          ref={nameInputRef}
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
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
