// app/sitemap-categories.xml/route.ts
const BASE_URL = process.env.NEXT_PUBLIC_CLIENT_URL || "https://ParasiteHeal.com";

export async function GET(): Promise<Response> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/categories`);
  const categories = await res.json();

  const urls = categories.map(
    (cat: { slug: string }) => `
    <url>
      <loc>${BASE_URL}/categories/${cat.slug}</loc>
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
