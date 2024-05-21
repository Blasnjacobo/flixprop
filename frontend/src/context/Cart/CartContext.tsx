import { createContext } from "react";
import { CartItem } from '../../types/Cart';

type CartContextType = {
  itemQuantity: (_id: string, username: string) => Promise<number>;
  increaseQuantity: (_id: string, username: string) => Promise<void>;
  decreaseQuantity: (_id: string, username: string) => Promise<void>;
  removeFromCart: (_id: string, username: string) => Promise<void>;
  cartItems: (username: string) => Promise<CartItem[]>;
  quantity: number;
};

const CartContext = createContext<CartContextType>({} as CartContextType);
export default CartContext;
