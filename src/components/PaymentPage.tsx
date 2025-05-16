"use client";

import React, { useEffect, useState } from "react";
import { ArrowLeft, Check, CreditCard } from "lucide-react";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/cartUtils";
import PaypalButton from "../components/PaypalButton";
import { useRouter } from "next/navigation";

const PaymentPage: React.FC = () => {
  const { items, total, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "paypal" | null>(
    null
  );
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [orderId, setOrderId] = useState("");

  const router = useRouter();

  const handleCashPayment = () => {
    setPaymentMethod("cash");
    setOrderId(`ORD-${Math.floor(100000 + Math.random() * 900000)}`);
    setPaymentComplete(true);
    clearCart();
  };

  const handlePaypalSuccess = (details: any) => {
    setPaymentMethod("paypal");
    setOrderId(
      details.id || `ORD-${Math.floor(100000 + Math.random() * 900000)}`
    );
    setPaymentComplete(true);
    clearCart();
  };

  useEffect(() => {
    if (items.length === 0 && !paymentComplete) {
      router.push("/cart");
    }
  }, [items.length, paymentComplete, router]);

  if (items.length === 0 && !paymentComplete) {
    // During SSR, render nothing or a loading fallback
    return null;
  }

  if (paymentComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 animate-scale-in">
          <div className="flex flex-col items-center">
            <div className="bg-green-100 rounded-full p-4 mb-6">
              <Check className="h-12 w-12 text-green-600" />
            </div>
            <h3 className="text-2xl font-semibold text-center mb-4">
              Order Confirmed!
            </h3>
            <p className="text-gray-600 text-center mb-6">
              {paymentMethod === "cash"
                ? "Please pay at the counter when you pick up your order."
                : "Your PayPal payment has been processed successfully."}
            </p>
            <div className="bg-gray-50 rounded-xl p-6 w-full mb-6 space-y-4">
              <div>
                <p className="text-sm text-gray-600">Order ID</p>
                <p className="font-semibold text-lg">{orderId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Amount Paid</p>
                <p className="font-semibold text-lg text-primary-500">
                  {formatCurrency(total)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Payment Method</p>
                <p className="font-semibold text-lg capitalize">
                  {paymentMethod}
                </p>
              </div>
            </div>
            <button
              onClick={() => router.push("/")}
              className="w-full py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
            >
              Return to Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-8">
          <button
            onClick={() => router.push("/cart")}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors mr-4"
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-2xl font-semibold text-primary-500 flex items-center">
            <CreditCard className="h-6 w-6 mr-2" />
            Complete Payment
          </h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div
            className="bg-white rounded-xl shadow-lg p-6 animate-scale-in"
            style={{ animationDelay: "0.1s" }}
          >
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-lg overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <span className="font-medium">
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t pt-4">
              <div className="text-2xl font-bold text-primary-500 mb-2">
                {formatCurrency(total)}
              </div>
              <p className="text-sm text-gray-500">Including 8% tax</p>
            </div>
          </div>

          <div
            className="space-y-6 animate-scale-in"
            style={{ animationDelay: "0.2s" }}
          >
            <button
              onClick={handleCashPayment}
              className="w-full p-6 bg-white border-2 border-primary-500 rounded-xl text-primary-500 hover:bg-primary-50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold text-lg">Pay at Counter</div>
                  <div className="text-sm text-gray-600">
                    Pay when you pick up your order
                  </div>
                </div>
                <span className="text-2xl">💵</span>
              </div>
            </button>

            <div className="relative">
              <div className="text-center my-4 font-medium text-gray-500">
                - OR -
              </div>
              <div className="w-full p-6 bg-white border-2 border-amber-500 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
                {/* <div className="font-semibold text-lg text-amber-700 mb-4">
                  Pay Online with PayPal
                </div> */}
                <PaypalButton amount={total} onSuccess={handlePaypalSuccess} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
