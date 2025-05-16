"use client";

import React from "react";
import { Minus, Plus, ArrowLeft, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/cartUtils";
import { useRouter } from "next/navigation";

const CartPage: React.FC = () => {
  const router = useRouter();
  const { items, removeItem, updateQuantity, subtotal, tax, total } = useCart();
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex items-center mb-8">
          <button
            onClick={() => router.push("/")}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors mr-4"
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-2xl font-semibold text-primary-500 flex items-center">
            <ShoppingBag className="h-6 w-6 mr-2" />
            Your Order
          </h1>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-lg">
            <ShoppingBag className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <p className="text-xl text-gray-600 mb-6">Your cart is empty</p>
            <button
              onClick={() => router.push("/")}
              className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
            >
              Browse Menu
            </button>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <ul className="divide-y divide-gray-100">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-gray-900">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {item.description}
                          </p>
                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center border rounded-lg bg-gray-50">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="p-2 text-gray-600 hover:text-primary-500"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="px-4 py-2 text-gray-800">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="p-2 text-gray-600 hover:text-primary-500"
                                aria-label="Increase quantity"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="font-medium text-primary-500">
                                {formatCurrency(item.price * item.quantity)}
                              </span>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="text-sm font-medium text-red-600 hover:text-red-800"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (8%)</span>
                    <span>{formatCurrency(tax)}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span className="text-primary-500">
                        {formatCurrency(total)}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => router.push("/payment")}
                  className="w-full mt-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
