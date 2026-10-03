// app/sitemap-products-1.xml/route.ts
import { getProductSlugs } from "@/lib/getProductSlugs";

const BASE_URL = process.env.NEXT_PUBLIC_CLIENT_URL || "https://ParasiteHeal.com";

export async function GET(): Promise<Response> {
  const allSlugs = await getProductSlugs();
  const chunk = allSlugs.slice(0, 2000); 

  const urls = chunk.map(
    (slug) => `
    <url>
      <loc>${BASE_URL}/medicines/${slug}</loc>
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
