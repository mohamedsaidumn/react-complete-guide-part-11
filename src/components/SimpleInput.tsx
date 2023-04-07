import { useRef, useState, FormEvent, SyntheticEvent } from "react";

interface SimpleInputProps {}

const SimpleInput = (props: SimpleInputProps) => {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const [enteredName, setEnteredName] = useState<string>("");

  const nameInputChangeHandler = (event: SyntheticEvent) => {
    let target: HTMLInputElement = event.target as HTMLInputElement;
    setEnteredName(target.value);
  };

  const formSubmissionHandler = (event: FormEvent) => {
    event.preventDefault();

    console.log(enteredName);

    if (nameInputRef === null || nameInputRef.current === null) {
      return;
    }

    const enteredValue = nameInputRef.current.value;
    console.log(enteredValue);

    //nameInputRef.current.value = ""; //=> NOT IDEAL, DON'T DIRECTLY MANIPULATE THE DOM, LET REACT DO THAT FOR YOU
    setEnteredName("");
  };

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className="form-control">
        <label htmlFor="name">Your Name</label>
        <input
          ref={nameInputRef}
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          value={enteredName}
        />
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
