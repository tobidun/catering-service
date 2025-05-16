"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem, MenuItem } from "@/types";
import {
  calculateSubtotal,
  calculateTax,
  calculateTotal,
} from "@/utils/cartUtils";

interface CartContextType {
  items: CartItem[];
  addItem: (item: MenuItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  tax: number;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newSubtotal = calculateSubtotal(items);
    const newTax = calculateTax(newSubtotal);
    const newTotal = calculateTotal(newSubtotal, newTax);

    setSubtotal(newSubtotal);
    setTax(newTax);
    setTotal(newTotal);
  }, [items]);

  const addItem = (item: MenuItem) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);

      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }

      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const removeItem = (itemId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    tax,
    total,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
