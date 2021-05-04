import { createContext } from "react";

type CartContextInterface = {
  items: any[];
  totalAmount: number;
  addItem: (item: any) => void;
  removeItem: (id: string) => void;
};
const CartContext = createContext<CartContextInterface | null>(null);

export default CartContext;
