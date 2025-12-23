// src/context/CartContext.tsx

import React, { useState, ReactNode } from 'react';
import { CartContext, CartItem, CartContextType } from './cart-config'; 

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Function to handle adding a product (unchanged)
  const addToCart: CartContextType['addToCart'] = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);

      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // 🚀 NEW: Remove item from cart
  const removeFromCart: CartContextType['removeFromCart'] = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  // 🚀 NEW: Update item quantity
  const updateQuantity: CartContextType['updateQuantity'] = (productId, newQuantity) => {
    setCart(prevCart => {
      // If the new quantity is 0 or less, remove the item
      if (newQuantity <= 0) {
        return prevCart.filter(item => item.id !== productId);
      }

      // Otherwise, update the quantity
      return prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};