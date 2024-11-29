import React, { useState, useEffect, createContext, ReactNode } from "react";

type CartItem = {
  id: string;
  title: string;
  price: number;
  image: string;
  amount: number;
};

type CartContextType = {
  cart: CartItem[];
  total: number;
  addToCart: (book: Omit<CartItem, "amount">) => void;
  increaseAmount: (id: string) => void;
  decreaseAmount: (id: string, amount: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartProviderProps = {
  children: ReactNode;
};

const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const total = cart.reduce((sum, { amount, price }) => {
      return sum + amount * price;
    }, 0);
    setTotal(parseFloat(total.toFixed(2)));
  }, [cart]);

  const increaseAmount = (id: string) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, amount: item.amount + 1 } : item
    );
    setCart(updatedCart);
  };

  const decreaseAmount = (id: string, amount: number) => {
    let updatedCart: CartItem[] = [];
    if (amount === 1) {
      updatedCart = cart.filter((item) => item.id !== id);
    } else {
      updatedCart = cart.map((item) =>
        item.id === id ? { ...item, amount: item.amount - 1 } : item
      );
    }
    setCart(updatedCart);
  };

  const addToCart = (book: Omit<CartItem, "amount">) => {
    const { id, title, price, image } = book;
    const cartItem = cart.find((item) => item.id === id);
    if (cartItem) {
      increaseAmount(id);
    } else {
      const cartItems = [...cart, { id, title, image, price, amount: 1 }];
      setCart(cartItems);
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, total, addToCart, increaseAmount, decreaseAmount, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, CartContext };
