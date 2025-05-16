"use client";

import PayPalProviderWrapper from "@/components/PayPalProviderWrapper";
import PaymentPage from "@/components/PaymentPage";

export default function Payment() {
  return (
    <PayPalProviderWrapper>
      <PaymentPage />
    </PayPalProviderWrapper>
  );
}
