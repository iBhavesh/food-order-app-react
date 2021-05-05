import classes from "./CartItem.module.css";

type Props = {
  price: number;
  name: string;
  amount: number;
  onAdd: React.MouseEventHandler<HTMLButtonElement>;
  onRemove: React.MouseEventHandler<HTMLButtonElement>;
};

const CartItem = (props: Props) => {
  const price = `${props.price.toFixed(2)}`;

  return (
    <li className={classes["cart-item"]}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>&#8377;{price}</span>
          <span className={classes.amount}>x {props.amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onRemove}>−</button>
        <button onClick={props.onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
