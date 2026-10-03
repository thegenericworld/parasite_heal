// app/sitemap-static.xml/route.ts
// import { type MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_CLIENT_URL || "https://ParasiteHeal.com";

const staticRoutes = [
  "",
  "about",
  "contact",
  "cancellation-policy",
  "communication-policy",
  "drug-policy",
  "faq",
  "how-to-order-medicines",
  "privacy-policy",
  "return-refund-policy",
  "terms-and-conditions",
  "24-7-service",
  "data-secured-with-aws",
  "lowest-price",
  "mcafee-protection",
  "original-product",
  "secure-packaging",
  "ssl-certified",
  "super-fast-delivery",
  "worldwide-shipping",
  "categories",
  "medicines",
  "mens-health",
  "reviews",
];

export async function GET(): Promise<Response> {
  const urls = staticRoutes.map(
    (route) => `
    <url>
      <loc>${BASE_URL}/${route}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
    </url>`
  );

  const body = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls.join("")}
  </urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
