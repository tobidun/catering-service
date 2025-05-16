"use client";

import { PayPalButtons } from "@paypal/react-paypal-js";
import { useCart } from "@/context/CartContext";

interface PaypalButtonProps {
  amount: number;
  onSuccess: (details: any) => void;
}

const PaypalButton: React.FC<PaypalButtonProps> = ({ amount, onSuccess }) => {
  const { items } = useCart();

  const createOrder = async (
    data: Record<string, unknown>,
    actions: any
  ): Promise<string> => {
    try {
      const response = await fetch("/api/paypal/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, total: amount }),
      });

      const order = await response.json();

      if (!response.ok || !order.id) {
        throw new Error("Failed to create PayPal order");
      }

      return order.id;
    } catch (error) {
      console.error("Error creating PayPal order:", error);
      throw error;
    }
  };

  const onApprove = async (
    data: { orderID: string },
    actions: any
  ): Promise<void> => {
    try {
      const response = await fetch("/api/paypal/capture-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderID: data.orderID }),
      });

      const orderData = await response.json();

      if (!response.ok || orderData.status !== "COMPLETED") {
        throw new Error("PayPal payment not completed");
      }

      onSuccess(orderData);
    } catch (error) {
      console.error("Error capturing PayPal payment:", error);
      throw error;
    }
  };

  return (
    <div style={{ cursor: "pointer" }}>
      <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
        style={{
          layout: "horizontal",
          color: "gold",
          shape: "rect",
          label: "pay",
        }}
      />
    </div>
  );
};

export default PaypalButton;
