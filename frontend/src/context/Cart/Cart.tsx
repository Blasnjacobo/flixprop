/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactNode, useEffect, useState } from "react";
import CartContext from "./CartContext";
import useUser from '../Users/useUser';
import { CartItem } from '../../types/Cart';
import Carrito from "../../components/Cart/Carrito";

export default function CartProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const user = useUser()

  const totalQuantity = async (username: string) => {
    if (!username) {
      console.log('User not found');
      return 0;
    }

    try {
      const token = localStorage.getItem('jwtToken');
      const headers = {
        'authorization': `Bearer ${token}`
      };
      // const response = await fetch(`http://localhost:5000/cart/totalQuantity/${username}`, {
      const response = await fetch(`https://flixprop-production.up.railway.app/cart/totalQuantity/${username}`, {
        headers: headers
      });
      if (!response.ok) {
        throw new Error('Failed to fetch total quantity from server');
      }
      const total = await response.json();
      console.log(total)
      return total;
    } catch (error) {
      console.log('Error fetching total quantity', error);
      return 0;
    }
  };

  const [quantity, setQuantity] = useState<number>(0);

  const openCart = () => setIsOpen(true);

  const closeCart = () => setIsOpen(false);

  const cartItems = async (username: string): Promise<CartItem[]> => {
    try {
      if (!username) {
        console.log('User not found');
        return [];
      }
      const token = localStorage.getItem('jwtToken');
      const headers = {
        'authorization': `Bearer ${token}`
      };
      // const response = await fetch(`http://localhost:5000/cart/${username}`, {
      const response = await fetch(`https://flixprop-production.up.railway.app/cart/${username}`, {

      
        headers: headers
      });
      if (!response.ok) {
        throw new Error('Failed to fetch cart from server');
      }
      const cartItems = await response.json();
      return cartItems;
    } catch (error) {
      console.log('Error fetching carts items', error);
      throw error;
    }
  };

  const itemQuantity = async (codigo: string, username: string): Promise<number> => {
    try {
      if (!username) {
        console.log('User not found');
        return 0;
      }
      const token = localStorage.getItem('jwtToken');
      const headers = {
        'authorization': `Bearer ${token}`
      };

      // const response = await fetch(`http://localhost:5000/cart/itemQuantity/${username}/${codigo}`, {
      const response = await fetch(`https://flixprop-production.up.railway.app/cart/itemQuantity/${username}/${codigo}`, {
        headers: headers
      });
      if (!response.ok) {
        throw new Error('Failed to fetch item quantity from server');
      }
      const data = await response.json();
      return data.totalQuantity;
    } catch (error) {
      console.log('Error fetching item quantity', error);
      return 0;
    }
  };

  const increaseQuantity = async (codigo: string, username: string): Promise<void> => {
    try {
      if (!username) {
        console.log('User not found');
        return;
      }
      const token = localStorage.getItem('jwtToken');
      const headers = {
        'authorization': `Bearer ${token}`
      };

      // const response = await fetch(`http://localhost:5000/cart/increase/${codigo}/${username}`, {
      const response = await fetch(`https://flixprop-production.up.railway.app/cart/increase/${codigo}/${username}`, {
        method: 'POST',
        headers: headers
      });
      if (!response.ok) {
        throw new Error('Failed to increase quantity on server');
      }
      const data = await response.json();
      setQuantity(prevQuantity => prevQuantity + data);

      // Re-fetch the updated item quantity
      const updatedQuantity = await itemQuantity(codigo, username);
      setQuantity(updatedQuantity);

    } catch (error) {
      console.log('Error increasing quantity', error);
    }
  };

  const decreaseQuantity = async (codigo: string, username: string): Promise<void> => {
    try {
      if (!username) {
        console.log('User not found');
        return;
      }
      const token = localStorage.getItem('jwtToken');
      const headers = {
        'authorization': `Bearer ${token}`
      };

      // const response = await fetch(`http://localhost:5000/cart/decrease/${codigo}/${username}`, {
      const response = await fetch(`https://flixprop-production.up.railway.app/cart/decrease/${codigo}/${username}`, {
        method: 'POST',
        headers: headers
      });
      if (!response.ok) {
        throw new Error('Failed to decrease quantity on server');
      }
      const data = await response.json();
      setQuantity(prevQuantity => prevQuantity - data);

      // Re-fetch the updated item quantity
      const updatedQuantity = await itemQuantity(codigo, username);
      setQuantity(updatedQuantity);

    } catch (error) {
      console.log('Error decreasing quantity', error);
    }
  };

  const removeFromCart = async (codigo: string, username: string): Promise<void> => {
    try {
      if (!username) {
        console.log('User not found');
        return;
      }
      const token = localStorage.getItem('jwtToken');
      const headers = {
        'authorization': `Bearer ${token}`
      };

      // const response = await fetch(`http://localhost:5000/cart/delete/${codigo}/${username}`, {
      const response = await fetch(`https://flixprop-production.up.railway.app/cart/delete/${codigo}/${username}`, {
        method: 'DELETE',
        headers: headers
      });
      if (!response.ok) {
        throw new Error('Failed to remove item from cart on server');
      }
      const data = await response.json();
      setQuantity(prevQuantity => prevQuantity - data);

      // Re-fetch the updated item quantity
      const updatedQuantity = await itemQuantity(codigo, username);
      setQuantity(updatedQuantity);

    } catch (error) {
      console.log('Error removing item from cart', error);
    }
  };

  useEffect(() => {
    const fetchQuantity = async () => {
      if (user) {
        try {
          const userQuantity = await totalQuantity(user.username);
          setQuantity(userQuantity);
        } catch (error) {
          console.error('Error fetching quantity cart', error);
        }
      }
    };
    fetchQuantity();
  }, [user, increaseQuantity, decreaseQuantity, removeFromCart]);

  return (
    <CartContext.Provider
      value={{
        openCart,
        closeCart,
        itemQuantity,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        cartItems,
        quantity
      }}
    >
      {children}
      <Carrito isOpen={isOpen} />
    </CartContext.Provider>
  );
}
