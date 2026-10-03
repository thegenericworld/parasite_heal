// app/sitemap.xml/route.ts
// import { type MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_CLIENT_URL || "https://ParasiteHeal.com";

export async function GET(): Promise<Response> {
  const sitemaps = [
    "/sitemap-static.xml",
    "/sitemap-blog.xml",
    "/sitemap-categories.xml",
    "/sitemap-products-1.xml",
    "/sitemap-products-2.xml",
    "/sitemap-products-3.xml"
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${sitemaps
      .map(
        (url) => `
      <sitemap>
        <loc>${BASE_URL}${url}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </sitemap>`
      )
      .join("")}
  </sitemapindex>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
