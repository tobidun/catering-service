import { CartItem } from "../types";

export const calculateSubtotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const calculateTax = (subtotal: number): number => {
  return subtotal * 0.08; // 8% tax rate
};

export const calculateTotal = (subtotal: number, tax: number): number => {
  return subtotal + tax;
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(amount);
};
