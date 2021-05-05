import { useContext } from "react";
import CartContext from "../../../store/cart-context";
import CartIcon from "../../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

type Props = {
  onClick: () => void;
};

const HeaderCartButton = (props: Props) => {
  const cartCtx = useContext(CartContext);

  return (
    <button onClick={props.onClick} className={classes.button}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{cartCtx?.items.length}</span>
    </button>
  );
};

export default HeaderCartButton;
