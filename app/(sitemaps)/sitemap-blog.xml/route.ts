// app/sitemap-blog.xml/route.ts
// import { type MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_CLIENT_URL || "https://ParasiteHeal.com";

const staticRoutes = [
  "blog",
  "blog/sexual-health-wellness",
  "blog/warning-signs-of-a-heart-attack",
  "blog/generic-for-vigamox-moxifloxacin",
  "blog/vitamin-gummies-effects",
  "blog/vitamin-d-and-cancer"
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
