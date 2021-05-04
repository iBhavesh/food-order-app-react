import classes from "./MealItemForm.module.css";
import Input from "../../../../UI/Input/Input";

const MealItemForm = (props: { id: string }) => {
  return (
    <form className={classes.form}>
      <Input
        label="Amount"
        input={{
          id: "amount" + props.id,
          type: "number",
          min: 1,
          max: 10,
          step: "1",
          defaultValue: "1",
        }}
      />
      <button type="submit">+ Add</button>
    </form>
  );
};

export default MealItemForm;
