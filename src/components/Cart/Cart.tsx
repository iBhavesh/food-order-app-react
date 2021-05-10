import { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal/Modal";
import CartItem from "./CartItem/CartItem";
import classes from "./Cart.module.css";
import cartItem from "../../model/cartItem";
import Checkout from "./Checkout/Checkout";
import UserData from "../../model/userData";
import useHttp from "../../hooks/useHttp";

type Props = {
  onClose: () => void;
};
const Cart = (props: Props) => {
  const cartCtx = useContext(CartContext);
  const totalAmount = cartCtx!.totalAmount.toFixed(2);
  const hasItems = cartCtx!.items.length > 0;
  const [isCheckout, setIsCheckout] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const { httpError, isLoading, sendRequest } = useHttp();

  const cartItemRemoveHandler = (id: string) => {
    cartCtx?.removeItem(id);
  };

  const cartItemAddHandler = (item: cartItem) => {
    cartCtx?.addItem({ ...item, amount: 1 });
  };

  const closeModal = () => {
    props.onClose();
  };

  const orderButtonHandler: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData: UserData) => {
    const postRequest = (data: any) => {
      cartCtx!.clearCart();
      setOrderPlaced(true);
    };

    sendRequest(
      process.env.REACT_APP_FIREBASE_URL! + "orders.json",
      {
        body: JSON.stringify({
          userData: userData,
          orderItems: cartCtx!.items,
        }),
        method: "POST",
      },
      postRequest
    );
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
      <button onClick={closeModal} className={classes["button--alt"]}>
        Close
      </button>
      {hasItems && (
        <button onClick={orderButtonHandler} className={classes.button}>
          Order
        </button>
      )}
    </div>
  );

  if (orderPlaced) {
    return (
      <Modal onClose={closeModal}>
        <h2>Order placed!</h2>
        <div className={classes.actions}>
          <button onClick={closeModal} className={classes["button--alt"]}>
            Close
          </button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal onClose={closeModal}>
      {!isCheckout && cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>&#8377;{totalAmount}</span>
      </div>
      {isCheckout && !isLoading && (
        <Checkout
          httpError={httpError}
          isLoading={isLoading}
          onConfirm={submitOrderHandler}
          onCancel={closeModal}
        />
      )}
      {!isCheckout && modalActions}
      {isLoading && <h2>Placing Order....</h2>}
    </Modal>
  );
};

export default Cart;
