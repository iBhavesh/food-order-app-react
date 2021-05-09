import { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal/Modal";
import CartItem from "./CartItem/CartItem";
import classes from "./Cart.module.css";
import cartItem from "../../model/cartItem";
import Checkout from "./Checkout/Checkout";

type Props = {
  onClose: () => void;
};
const Cart = (props: Props) => {
  const cartCtx = useContext(CartContext);
  const totalAmount = cartCtx!.totalAmount.toFixed(2);
  const hasItems = cartCtx!.items.length > 0;
  const [isCheckout, setIsCheckout] = useState(false);

  const cartItemRemoveHandler = (id: string) => {
    cartCtx?.removeItem(id);
  };

  const cartItemAddHandler = (item: cartItem) => {
    cartCtx?.addItem({ ...item, amount: 1 });
  };

  const orderButtonHandler: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    setIsCheckout(true);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx!.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button onClick={props.onClose} className={classes["button--alt"]}>
        Close
      </button>
      {hasItems && (
        <button onClick={orderButtonHandler} className={classes.button}>
          Order
        </button>
      )}
    </div>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>&#8377;{totalAmount}</span>
      </div>
      {isCheckout && <Checkout onCancel={props.onClose} />}
      {!isCheckout && modalActions}
    </Modal>
  );
};

export default Cart;
