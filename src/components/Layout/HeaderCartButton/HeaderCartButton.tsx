import { useContext, useEffect, useState } from "react";
import CartContext from "../../../store/cart-context";
import CartIcon from "../../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

type Props = {
  onClick: () => void;
};

const HeaderCartButton = (props: Props) => {
  const cartCtx = useContext(CartContext);
  const [showAnimation, setShowAnimation] = useState(false);
  useEffect(() => {
    if (cartCtx?.items.length === 0) return;
    setShowAnimation(true);
    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [cartCtx?.items]);
  const buttonClasses = `${classes.button} ${showAnimation && classes.bump}`;
  const numberOfCartItems = cartCtx?.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  return (
    <button onClick={props.onClick} className={buttonClasses}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
