import Meal from "../../../../model/meal";
import MealItemForm from "./MealItemForm/MealItemForm";
import classes from "./MealItem.module.css";

type Props = {
  meal: Meal;
};
const MealItem = (props: Props) => {
  const price = `${props.meal.price.toFixed(2)}`;
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.meal.name}</h3>
        <div className={classes.description}>{props.meal.description}</div>
        <div className={classes.price}>&#8377;{price}</div>
      </div>
      <div>
        <MealItemForm id={props.meal.id} />
      </div>
    </li>
  );
};

export default MealItem;
