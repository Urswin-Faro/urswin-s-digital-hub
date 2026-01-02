// src/context/cart-config.ts

import { createContext } from 'react';

// Define the shape of a cart item
export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;        // 🚀 NEW: Required to show images in the cart/checkout
  description?: string; // 🚀 NEW: Optional, useful for the "Review Project" page
}

// Define the shape of the context object
export interface CartContextType {
  cart: CartItem[];
  // 🚀 UPDATED: addToCart now accepts the image URL
  addToCart: (product: { 
    id: number; 
    name: string; 
    price: number; 
    image: string; 
    description?: string 
  }) => void;
  
  // Function to remove an item completely
  removeFromCart: (productId: number) => void;
  
  // Function to change the quantity of an item
  updateQuantity: (productId: number, newQuantity: number) => void;
}

// Export the Context object
export const CartContext = createContext<CartContextType | undefined>(undefined);