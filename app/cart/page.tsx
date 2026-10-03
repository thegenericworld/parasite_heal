// app/cart/page.tsx (Server Component)

import CartClient from "./CartClient";
import { Metadata } from "next";

// 👇 Add this: Generate <meta name="robots"> for SEO
export async function generateMetadata(): Promise<Metadata> {
  return {
    robots: "noindex, nofollow",
  };
}


export default async function CartPage() {

  return <CartClient />;
}