"use client";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";

export default function PayPalProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PayPalScriptProvider
      options={{
        clientId:
          "AbtSt71jXUTzBs4JxiUzs80U7OqNURaGjzJ7BURqJPoJ3F-GZpwLDkb7Ww2JVu52YdpDwVpTxiattig4",
        currency: "USD",
      }}
    >
      {children}
    </PayPalScriptProvider>
  );
}
