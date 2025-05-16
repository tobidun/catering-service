import type { Metadata } from "next";
import { CartProvider } from "@/context/CartContext";
import PayPalProviderWrapper from "@/components/PayPalProviderWrapper";
import "./globals.css";

export const metadata: Metadata = {
  title: "University Catering Service",
  description: "Fresh & Delicious food delivery service",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <PayPalProviderWrapper>
          <CartProvider>{children}</CartProvider>
        </PayPalProviderWrapper>
      </body>
    </html>
  );
}
