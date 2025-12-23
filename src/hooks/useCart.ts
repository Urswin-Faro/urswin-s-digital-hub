// src/hooks/useCart.ts

import { useContext } from 'react';
// MUST use the correct path/alias to the context configuration file
import { CartContext } from '../context/cart-config'; // Use relative path if alias fails

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    // This is the check that ensures the hook is used inside the provider
    throw new Error('useCart must be used within a CartProvider');
  }
  // This is where TypeScript learns the return type (CartContextType)
  return context;
};