import { useReducer } from "react";
import CartItem from "../model/cartItem";
import CartContext from "./cart-context";

const initialState: { items: CartItem[]; totalAmount: number } = {
  items: [],
  totalAmount: 0,
};

type ACTIONTYPE =
  | { type: "ADD_ITEM"; item: CartItem }
  | { type: "REMOVE_ITEM"; id: string };

const cartReducer = (state: typeof initialState, action: ACTIONTYPE) => {
  switch (action.type) {
    case "ADD_ITEM": {
      const updatedtotalAmount =
        state.totalAmount + action.item.price * action.item.amount;

      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );

      let updatedItems;
      if (existingCartItemIndex !== -1) {
        const existingCartItem = state.items[existingCartItemIndex];
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.item.amount,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(action.item);
      }

      return { items: updatedItems, totalAmount: updatedtotalAmount };
    }
    case "REMOVE_ITEM": {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.id
      );
      const existingCartItem = state.items[existingCartItemIndex];
      const updatedtotalAmount = state.totalAmount - existingCartItem.price;
      let updatedItems;
      if (existingCartItem.amount === 1) {
        updatedItems = state.items.filter((item) => item.id !== action.id);
      } else {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount - 1,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      }
      return { items: updatedItems, totalAmount: updatedtotalAmount };
    }
    default:
      return initialState;
  }
};

const CartProvider: React.FC = (props) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, initialState);

  const addItemToCart = (item: CartItem) => {
    dispatchCartAction({ type: "ADD_ITEM", item: item });
  };

  const removeItemFromCart = (id: string) => {
    dispatchCartAction({ type: "REMOVE_ITEM", id: id });
  };

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
