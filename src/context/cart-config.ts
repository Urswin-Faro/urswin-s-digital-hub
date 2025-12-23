// src/context/cart-config.ts

import { createContext } from 'react';

// Define the shape of a cart item
export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

// Define the shape of the context object
export interface CartContextType {
  cart: CartItem[];
  addToCart: (product: { id: number; name: string; price: number }) => void;
  // 🚀 NEW: Function to remove an item completely
  removeFromCart: (productId: number) => void;
  // 🚀 NEW: Function to change the quantity of an item
  updateQuantity: (productId: number, newQuantity: number) => void;
}

// Export the Context object
export const CartContext = createContext<CartContextType | undefined>(undefined);