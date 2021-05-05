import { createContext } from "react";
import CartItem from "../model/cartItem";

type CartContextInterface = {
  items: CartItem[];
  totalAmount: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
};
const CartContext = createContext<CartContextInterface | null>(null);

export default CartContext;
