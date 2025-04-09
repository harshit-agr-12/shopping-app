import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
      return JSON.parse(localStorage.getItem('cart')) || [];
    });
  
    useEffect(() => {
      localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);
  
    const addToCart = (product) => {
      setCart(prev => {
        const existing = prev.find(item => item.id === product.id);
        if (existing) {
          return prev.map(item =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        }
        return [...prev, { ...product, quantity: 1 }];
      });
    };
  
    const updateQuantity = (id, quantity) => {
      setCart(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
    };
  
    const removeFromCart = (id) => {
      setCart(prev => prev.filter(item => item.id !== id));
    };
  
    const clearCart = () => setCart([]);
  
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  
    return (
      <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart, totalItems }}>
        {children}
      </CartContext.Provider>
    );
  };
  
  export const useCart = () => useContext(CartContext);