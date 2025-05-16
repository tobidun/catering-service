import React from "react";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/cartUtils";
import { useRouter } from "next/navigation";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { items, removeItem, updateQuantity, subtotal, tax, total } = useCart();
  const router = useRouter();
  if (!isOpen) return null;

  const handleCheckout = () => {
    onClose();
    router.push("/payment");
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="fixed inset-0 bg-black/50" onClick={onClose}></div>
      <div className="relative w-full max-w-md bg-white h-full overflow-auto shadow-xl z-10 animate-slide-in-right">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold text-primary-500 flex items-center">
            <ShoppingBag className="h-5 w-5 mr-2" />
            Your Order
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-200 rounded-full transition-colors"
            aria-label="Close cart"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-4 flex-1 overflow-auto">
          {items.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">Your cart is empty</p>
              <button
                onClick={onClose}
                className="mt-4 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-md transition-colors"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <ul className="divide-y">
              {items.map((item) => (
                <li key={item.id} className="py-4 flex">
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="ml-4 flex flex-1 flex-col">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>{item.name}</h3>
                      <p className="ml-4">
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border rounded-md">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="p-1 text-gray-600 hover:text-primary-500"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-2 py-1 text-gray-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="p-1 text-gray-600 hover:text-primary-500"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-sm font-medium text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t p-4">
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Tax (8%)</span>
              <span className="font-medium">{formatCurrency(tax)}</span>
            </div>
            <div className="flex justify-between py-2 text-lg font-semibold">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full mt-4 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-md transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
