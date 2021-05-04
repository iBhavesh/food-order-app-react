import Modal from "../UI/Modal/Modal";
import classes from "./Cart.module.css";

type Props = {
  onClose: () => void;
};
const Cart = (props: Props) => {
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {[{ id: "e1", name: "Sushi", price: 9.99, amount: 2 }].map((item) => (
        <li>{item.name}</li>
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>35.62</span>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onClose} className={classes["button--alt"]}>
          Close
        </button>
        <button className={classes.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;
