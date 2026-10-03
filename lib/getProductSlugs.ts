// lib/getProductSlugs.ts
export async function getProductSlugs(): Promise<string[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/slugs`, {
    next: { revalidate: 86400 },
  });

  if (!res.ok) {
    console.error("Failed to fetch product slugs");
    return [];
  }

  const slugs = await res.json();
  return slugs.map((item: { slug: string }) => item.slug);
}
