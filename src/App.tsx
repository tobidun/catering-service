// pages/_app.tsx
import type { AppProps } from "next/app";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import "../styles/globals.css"; // your global styles

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Header />
      <Component {...pageProps} />
    </CartProvider>
  );
}
