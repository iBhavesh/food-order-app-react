import { useReducer } from "react";
import CartContext from "./cart-context";

const initialState: { items: any[]; totalAmount: number } = {
  items: [],
  totalAmount: 0,
};

type ACTIONTYPE =
  | { type: "ADD_ITEM"; payload: any[] }
  | { type: "decrement"; payload: string };

const cartReducer = (state: typeof initialState, action: ACTIONTYPE) => {
  switch (action.type) {
    case "ADD_ITEM":
      const updatedItems = state.items.concat(action.payload);
      const updatedtotalAmount =
        state.totalAmount + action.payload.price * action.payload.amount;
      return { items: updatedItems, totalAmount: updatedtotalAmount };

    default:
      return initialState;
  }
};

const CartProvider: React.FC = (props) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, initialState);

  const addItemToCart = (item: any) => {
    dispatchCartAction({ type: "ADD_ITEM", payload: item });
  };

  const removeItemFromCart = (id: string) => {};

  const cartContextHelper = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCart,
    removeItem: removeItemFromCart,
  };

  return (
    <CartContext.Provider value={cartContextHelper}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
