import { useContext } from "react";
import Meal from "../../../../model/meal";
import MealItemForm from "./MealItemForm/MealItemForm";
import classes from "./MealItem.module.css";
import CartContext from "../../../../store/cart-context";

type Props = {
  meal: Meal;
};
const MealItem = (props: Props) => {
  const price = `${props.meal.price.toFixed(2)}`;
  const cartCtx = useContext(CartContext);

  const addToCart = (amount: number) => {
    cartCtx?.addItem({
      id: props.meal.id,
      name: props.meal.name,
      amount: amount,
      price: props.meal.price,
    });
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.meal.name}</h3>
        <div className={classes.description}>{props.meal.description}</div>
        <div className={classes.price}>&#8377;{price}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCart} id={props.meal.id} />
      </div>
    </li>
  );
};

export default MealItem;
