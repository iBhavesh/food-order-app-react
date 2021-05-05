import { useRef, useState } from "react";
import classes from "./MealItemForm.module.css";
import Input from "../../../../UI/Input/Input";

type Props = {
  id: string;
  onAddToCart: (amount: number) => void;
};

const MealItemForm = (props: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [amountIsValid, setAmountIsValid] = useState(true);
  const submitHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const enteredAmount = inputRef.current!.value;
    if (enteredAmount.trim().length === 0) {
      setAmountIsValid(false);
      return;
    }
    const enteredAmountNumber = +enteredAmount;
    if (enteredAmountNumber < 1 || enteredAmountNumber > 10) {
      setAmountIsValid(false);
      return;
    }
    props.onAddToCart(enteredAmountNumber);
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <Input
        ref={inputRef}
        label="Amount"
        input={{
          id: "amount" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button type="submit">+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount(1-5)</p>}
    </form>
  );
};

export default MealItemForm;
